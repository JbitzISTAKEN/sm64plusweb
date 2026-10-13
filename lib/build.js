// Port of datafiles/build.sh, rebuild.sh and rebuild_clean.sh.
// Same steps, same argument (CUSTOM_TEXTURES=0|1), but streamed to the browser instead of a console window.

import { EventEmitter } from "node:events";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn, spawnSync } from "node:child_process";
import { REPO_DIR, BUILD_DIR, ROM_FILE, isWindows, HOME } from "./paths.js";

const MAX_LOG_LINES = 2000;

function findMsysBash() {
  const candidates = [
    process.env.MSYS2_BASH,
    "C:\\msys64\\usr\\bin\\bash.exe",
    "C:\\msys64\\mingw64.exe",
    "C:\\msys64\\usr\\bin\\bash"
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

export class BuildManager extends EventEmitter {
  constructor() {
    super();
    this.running = false;
    this.action = null;
    this.logs = [];
    this.exitCode = null;
    this.startedAt = null;
    this.child = null;
    this.step = "";
  }

  status() {
    return {
      running: this.running,
      action: this.action,
      step: this.step,
      exitCode: this.exitCode,
      startedAt: this.startedAt,
      lines: this.logs.length
    };
  }

  log(line) {
    const entry = { t: Date.now(), line: String(line).replace(/\s+$/, "") };
    this.logs.push(entry);
    if (this.logs.length > MAX_LOG_LINES) this.logs.splice(0, this.logs.length - MAX_LOG_LINES);
    this.emit("log", entry);
  }

  hasCommand(command) {
    const probe = spawnSync(command, ["--version"], { stdio: "ignore", shell: false });
    return !probe.error;
  }

  // Runs a command line through MSYS2 bash on Windows (matching the original launcher),
  // or natively everywhere else.
  run(command, args, { env = {}, cwd = REPO_DIR } = {}) {
    return new Promise((resolve) => {
      let proc;
      const fullEnv = { ...process.env, ...env };
      if (isWindows && !args.some((a) => a.includes("/"))) {
        const bash = findMsysBash();
        if (bash && !fs.existsSync(path.join(cwd, command))) {
          const line = [command, ...args].join(" ").replace(/(["\\])/g, "\\$1");
          proc = spawn(bash, ["-lc", `cd "${cwd}" && ${line}`], { cwd, env: fullEnv, shell: false });
        }
      }
      if (!proc) {
        proc = spawn(command, args, { cwd, env: fullEnv, shell: false });
      }
      this.child = proc;
      proc.stdout.on("data", (chunk) => String(chunk).split(/\r?\n/).filter(Boolean).forEach((l) => this.log(l)));
      proc.stderr.on("data", (chunk) => String(chunk).split(/\r?\n/).filter(Boolean).forEach((l) => this.log(l)));
      proc.on("error", (err) => {
        this.log(`! ${err.message}`);
        resolve(1);
      });
      proc.on("close", (code) => {
        this.child = null;
        resolve(code ?? 0);
      });
    });
  }

  async start(action, { customTextures = true } = {}) {
    if (this.running) return { started: false, reason: "A build is already running." };

    this.running = true;
    this.action = action;
    this.exitCode = null;
    this.startedAt = Date.now();
    this.logs = [];
    this.emit("reset");

    const textures = customTextures ? 1 : 0;
    this.log(`= SM64Plus ${action.replace("_", " ")} =`);
    this.log(`Repository: ${REPO_DIR}`);
    this.log(`Custom textures: ${textures ? "enabled" : "disabled"}`);
    this.log("");

    let code = 0;
    try {
      if (action === "build") {
        code = await this.build(textures);
      } else if (action === "rebuild") {
        code = await this.rebuild(textures, false);
      } else if (action === "rebuild_clean") {
        code = await this.rebuild(textures, true);
      } else {
        this.log(`! Unknown action "${action}".`);
        code = 1;
      }
    } catch (err) {
      this.log(`! ${err.message}`);
      code = 1;
    }

    this.running = false;
    this.exitCode = code;
    this.child = null;
    this.emit("done", code);
    this.log("");
    this.log(code === 0
      ? "= Build finished. You can start the game now. ="
      : "= Build failed. Read the log above for details. =");
    return { started: true, exitCode: code };
  }

  async clone() {
    this.step = "Cloning the game repository";
    this.log("Downloading the game files from the repository...");
    // git refuses to clone into a folder that already has files in it, and the ROM is
    // usually dropped into that same folder before the first build. Move whatever is
    // there aside and put it back afterwards.
    let stash = null;
    if (fs.existsSync(REPO_DIR)) {
      const entries = fs.readdirSync(REPO_DIR);
      if (entries.length > 0) {
        stash = `${REPO_DIR}.staged`;
        fs.rmSync(stash, { recursive: true, force: true });
        fs.renameSync(REPO_DIR, stash);
      } else {
        fs.rmSync(REPO_DIR, { recursive: true, force: true });
      }
    }
    const code = await this.run("git", ["clone", "--depth", "1", "https://github.com/MorsGames/sm64plus.git", REPO_DIR], { cwd: HOME });
    if (stash) {
      fs.mkdirSync(REPO_DIR, { recursive: true });
      for (const entry of fs.readdirSync(stash)) {
        fs.renameSync(path.join(stash, entry), path.join(REPO_DIR, entry));
      }
      fs.rmSync(stash, { recursive: true, force: true });
    }
    return code;
  }

  async pull() {
    this.step = "Pulling the game repository";
    const code = await this.run("git", ["pull", "--ff-only"], { cwd: REPO_DIR });
    if (code !== 0) {
      // Not fatal: the original just warns about locally modified files.
      this.log("! Pulling failed. This is normal if you have modified the files locally.");
    }
    return 0;
  }

  async make(args) {
    this.step = args[0] === "clean" ? "Cleaning" : "Building";
    const cores = Math.max(1, os.cpus().length - 1);
    this.log(`Running: make ${args.join(" ")}`);
    return this.run("make", [`-j${cores}`, ...args], { cwd: REPO_DIR });
  }

  async build(textures) {
    if (!fs.existsSync(path.join(REPO_DIR, ".git"))) {
      const code = await this.clone();
      if (code !== 0) {
        this.log("! Couldn't download the game files from the repository.");
        return code;
      }
    } else {
      this.log("The sm64plus folder already exists. Skipping cloning the repository.");
    }

    if (!fs.existsSync(ROM_FILE)) {
      this.log("! baserom.us.z64 is missing from the repository folder.");
      this.log("! Upload a US Super Mario 64 ROM (Z64, big endian) and try again.");
      return 1;
    }

    return this.make([`CUSTOM_TEXTURES=${textures}`]);
  }

  async rebuild(textures, clean) {
    if (!fs.existsSync(path.join(REPO_DIR, ".git"))) return this.build(textures);
    await this.pull();
    if (clean) {
      const code = await this.make(["clean"]);
      if (code !== 0) {
        this.log("! An error has occurred during the cleanup process.");
        return code;
      }
    }
    return this.make([`CUSTOM_TEXTURES=${textures}`]);
  }

  cancel() {
    if (this.child) {
      this.log("! Cancelling...");
      this.child.kill();
    }
  }
}

export const builds = new BuildManager();