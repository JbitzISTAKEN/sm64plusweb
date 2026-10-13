#!/usr/bin/env node
// SM64Plus Launcher, ported to the web.
//
// The original is a GameMaker app that shells out to MSYS2/mingw to build the game and
// then launches the resulting binary. Browsers can't do that, so this server does it
// locally and the browser just draws the menu. Same options, same ini files, same ROM.

import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { Ini } from "./public/shared/ini.js";
import { builds } from "./lib/build.js";
import {
  HOME, REPO_DIR, BUILD_DIR, LAUNCHER_DIR, SAVE, SETTINGS_INI, LAUNCHER_SETTINGS_INI,
  LAUNCHER_CONFIG_INI, PRESETS_DIR, INPUT_PRESETS_DIR, EXTERNAL_GFX_DIR, ROM_FILE,
  exePath, ensureDirs, GAME_EXE, GAME_EXE_OLD, isWindows
} from "./lib/paths.js";
import {
  LAUNCHER_VERSION, parseJsonConstants, filterForPlatform, categoryRanges
} from "./public/shared/options.js";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(ROOT, "public");
const CACHE_DIR = path.join(HOME, "cache");
const GITHUB_RAW = "https://raw.githubusercontent.com/MorsGames/sm64plus/master/launcher";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

ensureDirs();

// ---------------------------------------------------------------- helpers

function json(res, status, body) {
  const data = JSON.stringify(body);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(data) });
  res.end(data);
}

function readBody(req, limit = 64 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function readJsonBody(req) {
  const body = await readBody(req, 4 * 1024 * 1024);
  if (!body.length) return {};
  return JSON.parse(body.toString("utf8"));
}

function exists(p) {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

function readTextOr(p, fallback = "") {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return fallback;
  }
}

async function fetchUpstreamText(name) {
  const cacheFile = path.join(CACHE_DIR, name);
  const cached = await fsp.readFile(cacheFile, "utf8").catch(() => null);
  if (cached) return cached;

  const res = await fetch(`${GITHUB_RAW}/${name}`);
  if (!res.ok) throw new Error(`Could not download ${name} (${res.status})`);
  const text = await res.text();
  await fsp.mkdir(CACHE_DIR, { recursive: true });
  await fsp.writeFile(cacheFile, text);
  return text;
}

// categories.json / launcher_settings.json come from the game repository when it has
// been cloned, otherwise they are pulled straight from GitHub so the settings menu
// still works before the first build. Both files use constants that have to be
// replaced before parsing (replace_json_constants in the original).
async function loadCategoriesText() {
  const local = path.join(LAUNCHER_DIR, "categories.json");
  if (exists(local)) return readTextOr(local, "[]");
  return fetchUpstreamText("categories.json");
}

async function loadLauncherCategoryText() {
  const local = path.join(LAUNCHER_DIR, "launcher_settings.json");
  if (exists(local)) return readTextOr(local, "{}");
  return fetchUpstreamText("launcher_settings.json");
}

function categoriesError(message) {
  return { error: message, categories: [], launcherCategory: null };
}

function launcherConfig() {
  const ini = new Ini(readTextOr(LAUNCHER_CONFIG_INI));
  return {
    version: ini.readString("LAUNCHER", "version", LAUNCHER_VERSION),
    customTextures: ini.readReal("GAME", "custom_textures", 1) > 0
  };
}

function gameVersion() {
  const local = readTextOr(path.join(REPO_DIR, "VERSION")).trim();
  return local || null;
}

function toolStatus() {
  const probe = (command, args) => !spawnSync(command, args, { stdio: "ignore" }).error;
  return [
    { name: "git", ok: probe("git", ["--version"]), hint: "clones and updates the game repository" },
    { name: "make", ok: probe("make", ["--version"]), hint: "builds the game" },
    { name: "cc", ok: probe("cc", ["--version"]), hint: "C compiler used by the build" },
    { name: "python3", ok: probe("python3", ["--version"]), hint: "asset extraction during the build" }
  ].map((tool) => ({ ...tool, needed: tool.name === "git" || tool.name === "make" }));
}

function listPresets(dir, internalDir) {
  const results = [];
  for (const [folder, internal] of [[internalDir, true], [dir, false]]) {
    let entries = [];
    try {
      entries = fs.readdirSync(folder);
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.toLowerCase().endsWith(".ini")) continue;
      const full = path.join(folder, entry);
      const ini = new Ini(readTextOr(full));
      results.push({
        name: entry.replace(/\.ini$/i, ""),
        file: entry,
        path: full,
        description: ini.readString("INFO", "description", ""),
        internal
      });
    }
  }
  // "Default" always first, like the original does for input presets.
  results.sort((a, b) => (a.name === "Default" ? -1 : b.name === "Default" ? 1 : a.name.localeCompare(b.name)));
  return results;
}

// obj_background/Create_0.gml builds its list out of the game's own textures and
// falls back to spr_placeholder for the ones that aren't there yet. The browser
// gets the same list, with the file it should load for each entry.
const BACKGROUNDS = [
  { name: "skyboxes/water", file: "textures/skyboxes/water.png" },
  { name: "skyboxes/cloud_floor", file: "textures/skyboxes/cloud_floor.png" },
  { name: "skyboxes/ccm", file: "textures/skyboxes/ccm.png" },
  { name: "skyboxes/ssl", file: "textures/skyboxes/ssl.png" },
  { name: "skyboxes/wdw", file: "textures/skyboxes/wdw.png" },
  { name: "skyboxes/bidw", file: "textures/skyboxes/bidw.png" },
  { name: "skyboxes/bitfs", file: "textures/skyboxes/bitfs.png" },
  { name: "skyboxes/bits", file: "textures/skyboxes/bits.png" },
  { name: "spr_void", sprite: true },
  { name: "spr_void", sprite: true },
  { name: "skyboxes/inside_castle_textures.03000.rgba16", file: "textures/inside/inside_castle_textures.03000.rgba16.png" }
];

function backgroundList() {
  // GFX_PATH is <repo>/textures/, where the build leaves the extracted assets
  return BACKGROUNDS.map((entry) => {
    if (entry.sprite) return entry.name;
    const file = path.join(REPO_DIR, entry.file);
    // url is what the page fetches, name is what it calls the sprite
    const url = exists(file) ? `gfx/${entry.file.replace(/^textures\//, "")}` : null;
    return url ? { name: entry.name, url, void: false } : { name: "spr_placeholder", url: null, void: false };
  });
}

// scr_text_rendering.gml: load_letters() pulls the game's own alphabet out of segment2,
// one 16x16 texture per letter, and falls back to texel 5000 when one is missing.
function letterList() {
  const folder = path.join(REPO_DIR, "textures", "segment2");
  const texture = (offset) => {
    const hex = offset.toString(16).toUpperCase().padStart(4, "0");
    const name = `segment2.0${hex}.rgba16.png`;
    return exists(path.join(folder, name)) ? { name, url: `gfx/segment2/${name}` } : null;
  };
  const fallback = texture(0x5000);
  return Array.from({ length: 26 }, (unused, i) => texture((10 + i) * 512) || fallback);
}

async function currentState() {
  const exe = exePath();
  const config = launcherConfig();
  const builtVersion = config.version;
  return {
    platform: process.platform,
    launcherVersion: LAUNCHER_VERSION,
    builtVersion,
    updatePending: !!exe && builtVersion !== LAUNCHER_VERSION,
    sprites: backgroundList(),
    letters: letterList(),
    gameVersion: gameVersion(),
    repoPresent: exists(path.join(REPO_DIR, ".git")),
    gameBuilt: !!exe,
    builtExe: exe ? path.basename(exe) : null,
    romPresent: exists(ROM_FILE),
    romPath: ROM_FILE,
    customTextures: config.customTextures,
    build: builds.status(),
    paths: { home: HOME, repo: REPO_DIR, build: BUILD_DIR, save: SAVE, presets: PRESETS_DIR, inputPresets: INPUT_PRESETS_DIR }
  };
}

async function bootstrap() {
  const state = await currentState();
  let categories;
  let launcherCategory;
  try {
    categories = filterForPlatform(parseJsonConstants(await loadCategoriesText()), process.platform);
    launcherCategory = filterForPlatform([parseJsonConstants(await loadLauncherCategoryText())], process.platform)[0];
  } catch (err) {
    return { ...categoriesError(err.message), state, tools: toolStatus() };
  }

  const ranges = categoryRanges(categories.length);
  return {
    state,
    categories,
    ranges,
    launcherCategory,
    presets: listPresets(PRESETS_DIR, path.join(LAUNCHER_DIR, "presets")),
    inputPresets: listPresets(INPUT_PRESETS_DIR, path.join(LAUNCHER_DIR, "input_presets")),
    ini: {
      settings: readTextOr(SETTINGS_INI),
      launcherSettings: readTextOr(LAUNCHER_SETTINGS_INI),
      launcherConfig: readTextOr(LAUNCHER_CONFIG_INI)
    },
    recommended: readTextOr(path.join(LAUNCHER_DIR, "presets", "Recommended.ini")) || null,
    recommendedInput: readTextOr(path.join(LAUNCHER_DIR, "input_presets", "Default.ini")) || null,
    tools: toolStatus(),
    exes: [GAME_EXE, GAME_EXE_OLD]
  };
}

function launchGame({ copyGfx = true } = {}) {
  // Mirrors launch_game(): copy the built gfx folder into the save dir, then start the game.
  const sourceGfx = path.join(BUILD_DIR, "gfx");
  if (copyGfx && exists(sourceGfx)) {
    try {
      fs.cpSync(sourceGfx, EXTERNAL_GFX_DIR, { recursive: true, force: true });
    } catch (err) {
      builds.log(`! Could not copy the gfx folder: ${err.message}`);
    }
  }
  const exe = exePath();
  if (!exe) return { launched: false, reason: "The game has not been built yet." };
  try {
    const child = spawn(exe, [], { cwd: BUILD_DIR, detached: true, stdio: "ignore" });
    child.on("error", (err) => console.error(`Could not start ${exe}: ${err.message}`));
    child.unref();
  } catch (err) {
    return { launched: false, reason: `Could not start ${exe}: ${err.message}` };
  }
  return { launched: true, exe };
}

function copyDir(from, to) {
  if (!exists(from)) return false;
  fs.cpSync(from, to, { recursive: true, force: true });
  return true;
}

// ---------------------------------------------------------------- routes

async function handleApi(req, res, url) {
  const route = `${req.method} ${url.pathname}`;

  if (route === "GET /api/bootstrap") return json(res, 200, await bootstrap());

  if (route === "GET /api/state") return json(res, 200, await currentState());

  if (route === "GET /api/tools") return json(res, 200, { tools: toolStatus(), cpus: os.cpus().length });

  if (route === "GET /api/launcher-updates") {
    const response = await fetch("https://api.github.com/repos/MorsGames/sm64plus-launcher/commits?per_page=1", {
      headers: { "User-Agent": "sm64plus-launcher-web" }
    }).catch(() => null);
    if (!response || !response.ok) return json(res, 502, { error: "Could not reach GitHub." });
    const [commit] = await response.json();
    return json(res, 200, {
      sha: commit.sha.slice(0, 8),
      date: commit.commit.author.date,
      message: commit.commit.message.split("\n")[0],
      url: commit.html_url
    });
  }

  if (route === "POST /api/rom") {
    const body = await readBody(req);
    if (!body.length) return json(res, 400, { error: "No file received." });
    const header = String(req.headers["x-file-name"] || "");
    if (header && !header.toLowerCase().endsWith(".z64")) {
      return json(res, 400, { error: "The ROM has to be in Z64 (big endian) format." });
    }
    fs.mkdirSync(path.dirname(ROM_FILE), { recursive: true });
    await fsp.writeFile(ROM_FILE, body);
    return json(res, 200, { saved: true, path: ROM_FILE, bytes: body.length });
  }

  if (route === "POST /api/build") {
    const { action = "build", customTextures = true } = await readJsonBody(req);
    if (builds.running) return json(res, 409, { started: false, reason: "A build is already running." });
    // Fire and forget: the browser follows along through /api/build/log.
    builds.start(action, { customTextures }).catch(() => {});
    return json(res, 202, { started: true, action });
  }

  if (route === "GET /api/build/log") {
    return json(res, 200, { ...builds.status(), logs: builds.logs });
  }

  if (route === "POST /api/build/cancel") {
    builds.cancel();
    return json(res, 200, { cancelled: true });
  }

  if (route === "POST /api/launch") {
    const body = await readJsonBody(req).catch(() => ({}));
    return json(res, 200, launchGame(body));
  }

  if (route === "POST /api/gfx/reset") {
    // The original hides this behind Left+Right+Backspace on the title screen.
    fs.rmSync(EXTERNAL_GFX_DIR, { recursive: true, force: true });
    return json(res, 200, { cleared: true, path: EXTERNAL_GFX_DIR });
  }

  if (route === "GET /api/skyboxes") {
    // textures/skyboxes only exist after the game has been built
    const folder = path.join(REPO_DIR, "textures", "skyboxes");
    const wanted = ["water", "cloud_floor", "ccm", "ssl", "wdw", "bidw", "bitfs", "bits"];
    const found = [];
    for (const name of wanted) {
      if (fs.existsSync(path.join(folder, `${name}.png`))) found.push(`skybox_${name}`);
    }
    return json(res, 200, { skyboxes: found });
  }

  if (route === "GET /api/presets") {
    const kind = url.searchParams.get("kind") === "input" ? "input" : "game";
    if (kind === "input") {
      return json(res, 200, { presets: listPresets(INPUT_PRESETS_DIR, path.join(LAUNCHER_DIR, "input_presets")) });
    }
    return json(res, 200, { presets: listPresets(PRESETS_DIR, path.join(LAUNCHER_DIR, "presets")) });
  }

  if (route === "POST /api/preset-file") {
    const { kind = "game", name, internal = false } = await readJsonBody(req);
    if (!name || name.includes("/") || name.includes("\\")) return json(res, 400, { error: "Invalid preset name." });
    const dir = internal
      ? path.join(LAUNCHER_DIR, kind === "input" ? "input_presets" : "presets")
      : (kind === "input" ? INPUT_PRESETS_DIR : PRESETS_DIR);
    const file = path.join(dir, name);
    return json(res, 200, { text: readTextOr(file), path: file });
  }

  if (route === "POST /api/presets") {
    const { kind = "game", name, description = "", text = "" } = await readJsonBody(req);
    if (!name || /[/\\]/.test(name)) return json(res, 400, { error: "Invalid preset name." });
    const dir = kind === "input" ? INPUT_PRESETS_DIR : PRESETS_DIR;
    await fsp.mkdir(dir, { recursive: true });
    const ini = new Ini(text);
    if (description) ini.writeString("INFO", "description", description);
    const file = path.join(dir, `${name}.ini`);
    await fsp.writeFile(file, ini.toString());
    return json(res, 200, { saved: true, path: file });
  }

  if (route === "DELETE /api/presets") {
    const { kind = "game", name } = await readJsonBody(req).catch(() => ({}));
    const dir = kind === "input" ? INPUT_PRESETS_DIR : PRESETS_DIR;
    if (!name) return json(res, 400, { error: "No preset name given." });
    const file = path.join(dir, `${name}.ini`);
    if (file.includes(path.join(LAUNCHER_DIR, "presets")) || file.includes(path.join(LAUNCHER_DIR, "input_presets"))) {
      return json(res, 400, { error: "Built-in presets cannot be deleted." });
    }
    await fsp.rm(file, { force: true });
    return json(res, 200, { deleted: true });
  }

  if (route === "GET /api/ini") {
    const name = url.searchParams.get("name") || "settings";
    const file = { settings: SETTINGS_INI, launcherSettings: LAUNCHER_SETTINGS_INI, launcherConfig: LAUNCHER_CONFIG_INI }[name];
    if (!file) return json(res, 400, { error: "Unknown ini file." });
    return json(res, 200, { name, path: file, text: readTextOr(file) });
  }

  if (route === "PUT /api/ini") {
    const { name = "settings", text = "" } = await readJsonBody(req);
    const file = { settings: SETTINGS_INI, launcherSettings: LAUNCHER_SETTINGS_INI, launcherConfig: LAUNCHER_CONFIG_INI }[name];
    if (!file) return json(res, 400, { error: "Unknown ini file." });
    await fsp.mkdir(path.dirname(file), { recursive: true });
    await fsp.writeFile(file, text);
    return json(res, 200, { saved: true, path: file });
  }

  if (route === "POST /api/gfx/copy") {
    const ok = copyDir(path.join(BUILD_DIR, "gfx"), EXTERNAL_GFX_DIR);
    return json(res, 200, { copied: ok, path: EXTERNAL_GFX_DIR });
  }

  return json(res, 404, { error: `Unknown endpoint ${route}` });
}

// ---------------------------------------------------------------- static

async function serveFile(res, filePath) {
  try {
    const data = await fsp.readFile(filePath);
    res.writeHead(200, { "Content-Type": "image/png", "Cache-Control": "no-cache" });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
  }
}

async function serveStatic(req, res, url) {
  let filePath = path.join(PUBLIC_DIR, decodeURIComponent(url.pathname));
  if (url.pathname === "/" || url.pathname === "") filePath = path.join(PUBLIC_DIR, "index.html");
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  try {
    const data = await fsp.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
  }
}

// ---------------------------------------------------------------- server

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  try {
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
    } else if (url.pathname.startsWith("/gfx/")) {
      // the game's own textures (GFX_PATH in the original), one folder deep
      const parts = url.pathname.replace("/gfx/", "").split("/").filter(Boolean);
      const folder = path.join(REPO_DIR, "textures", ...parts.slice(0, -1));
      await serveFile(res, path.join(folder, path.basename(parts[parts.length - 1])));
    } else if (url.pathname.startsWith("/skyboxes/")) {
      await serveFile(res, path.join(BUILD_DIR, "textures", "skyboxes", path.basename(url.pathname)));
    } else {
      await serveStatic(req, res, url);
    }
  } catch (err) {
    json(res, 500, { error: err.message });
  }
});

// A finished build means the game is up to date: same as the launcher writing its version.
builds.on("done", (code) => {
  if (code !== 0) return;
  try {
    const ini = new Ini(readTextOr(LAUNCHER_CONFIG_INI));
    ini.writeString("LAUNCHER", "version", LAUNCHER_VERSION);
    fs.mkdirSync(path.dirname(LAUNCHER_CONFIG_INI), { recursive: true });
    fs.writeFileSync(LAUNCHER_CONFIG_INI, ini.toString());
  } catch {
    /* nothing to do */
  }
});

function parsePort() {
  const flag = process.argv.indexOf("--port");
  if (flag >= 0 && process.argv[flag + 1]) return Number(process.argv[flag + 1]);
  return Number(process.env.PORT || 7357);
}

server.listen(parsePort(), () => {
  const { port } = server.address();
  const version = gameVersion() || "unknown";
  console.log(`\n  SM64Plus Launcher (web port) — http://localhost:${port}\n`);
  console.log(`  Launcher version : ${LAUNCHER_VERSION}`);
  console.log(`  Game version     : ${version}`);
  console.log(`  Repository       : ${REPO_DIR}`);
  console.log(`  Builds           : ${BUILD_DIR}`);
  console.log(`  Settings         : ${SAVE}`);
  console.log(`  Game built       : ${exePath() ? "yes" : "no"}\n`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n  Port is already in use. Start with: PORT=7358 node server.js\n`);
  } else {
    console.error(err);
  }
  process.exit(1);
});