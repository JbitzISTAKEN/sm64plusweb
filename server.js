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
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".data": "application/octet-stream",
  ".m4a": "audio/mp4"
};

// Where the WebAssembly build lives. SM64PLUS_WASM_DIR overrides it; otherwise the
// copy that ships next to the launcher is used.
const WASM_DIR = process.env.SM64PLUS_WASM_DIR || path.join(ROOT, "wasm");

// The settings.ini the launcher had at the moment Start Game was pressed. The
// browser fetches it over /api/launch-handoff and writes it into the module's
// filesystem in preRun, before the game's main() reads it. Keeping it server side
// means the file never has to make a round trip through localStorage, and it is
// consumed once.
let pendingLaunch = null;

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

  // The WebAssembly build runs in the browser, so it is served from /game/ rather
  // than spawned. It reads the very settings.ini the launcher has been writing all
  // along, which is handed over through the session map below.
  const wasmEntry = path.join(WASM_DIR, "index.html");
  if (exists(wasmEntry)) {
    const handoff = { at: Date.now(), ini: readTextOr(SETTINGS_INI) || "" };
    pendingLaunch = handoff;
    // /game/ rather than /game/index.html: the page is served at that path, so the
    // query string survives and the emscripten loader's relative URLs still resolve.
    return { launched: true, mode: "wasm", url: "/game/" };
  }

  const exe = exePath();
  if (!exe) {
    return {
      launched: false,
      reason: "No game build found. Either build sm64plus natively, or point "
        + "SM64PLUS_WASM_DIR at a WebAssembly build."
    };
  }
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

// ---------------------------------------------------------------- skyboxes
//
// The .data shipped with this WebAssembly build is missing four whole skyboxes:
// bidw, bitfs, bits and cake - 225 of the 32x32 tiles between them. Every level
// that uses one of them renders with a blank sky, because import_texture_custom()
// gets a NULL back from stbi_load() and substitutes the missing-texture swatch.
//
// The tiles are not in the .data because they are produced at build time by
// tools/skyconv --write-tiles from textures/skyboxes/*.png (and levels/ending/cake.png
// for the ending), and the build that produced this .wasm only packed seven of the
// eleven. The source PNGs are all present in the repo, and skyconv is the same tool
// upstream uses, so the missing tiles are regenerated here with the upstream tool
// rather than hand-made.
//
// The result is cached in SKYBOX_CACHE_DIR. Regenerating is a no-op once the cache
// is populated.
const SKYBOX_CACHE_DIR = path.join(HOME, "skybox_tiles");
const SKYBOX_SOURCES = [
  { name: "bidw", type: "sky", png: "textures/skyboxes/bidw.png" },
  { name: "bitfs", type: "sky", png: "textures/skyboxes/bitfs.png" },
  { name: "bits", type: "sky", png: "textures/skyboxes/bits.png" },
  { name: "cake", type: "cake", png: "levels/ending/cake.png" },
];

// The skyboxes that are already packed in the .data, so nothing is generated twice.
const SKYBOX_PACKED = ["bbh", "ccm", "cloud_floor", "clouds", "ssl", "water", "wdw"];

let skyboxCache = null;

function generateSkyboxTiles() {
  if (skyboxCache) return skyboxCache;

  skyboxCache = { tiles: {}, missing: [] };

  const skyconv = path.join(REPO_DIR, "tools", "skyconv");
  if (!exists(skyconv)) {
    skyboxCache.missing.push("tools/skyconv is not built (run: make -C tools skyconv)");
    return skyboxCache;
  }

  const wanted = SKYBOX_SOURCES.filter((s) => !SKYBOX_PACKED.includes(s.name));
  const outDir = path.join(SKYBOX_CACHE_DIR, "tiles");
  const binDir = path.join(SKYBOX_CACHE_DIR, "bin");

  for (const src of wanted) {
    const png = path.join(REPO_DIR, src.png);
    if (!exists(png)) {
      skyboxCache.missing.push(`${src.name}: ${src.png} not found`);
      continue;
    }
    // --split writes <outdir>/<name>_skybox.c, so `bin` has to exist first.
    fs.mkdirSync(outDir, { recursive: true });
    fs.mkdirSync(binDir, { recursive: true });
    const result = spawnSync(skyconv, [
      "--type", src.type,
      "--split", png, binDir,
      "--store-names",
      "--write-tiles", outDir,
    ], { cwd: REPO_DIR, encoding: "utf8" });
    if (result.status !== 0) {
      skyboxCache.missing.push(`${src.name}: skyconv failed (${(result.stderr || "").trim()})`);
    }
  }

  if (!exists(outDir)) return skyboxCache;

  for (const file of fs.readdirSync(outDir)) {
    if (!file.endsWith(".rgba16.png")) continue;
    // The game asks for gfx/<name>.png, which is where Makefile puts skybox_tiles.
    skyboxCache.tiles[`gfx/textures/skybox_tiles/${file}`] = path.join(outDir, file);
  }

  return skyboxCache;
}

// obj_start_game hands the game the settings.ini the launcher has been writing, and
// configfile_load() stores whatever it reads. So a bind the launcher never assigned,
// written as 0, does not mean "unset" - it means "bound to button 0".
//
// The real defaults live in the game's own launcher/input_presets/Default.ini
// (button_a = 2, key_a = 38, ...). Any row sitting at 0 is one the player never
// touched, so it is replaced from that preset rather than dropped: the player still
// gets their own binds wherever they set one, and everything else keeps the shipped
// defaults. Rows that are 0 in Default.ini too (button_cleft, for instance) stay 0,
// which is genuinely unbound.
//
// Only CONTROLLER MAPPING, KEYBOARD MAPPING and MOUSE are touched. Everything else
// is passed through byte for byte.
function fillUnsetBindings(ini) {
  const defaults = readTextOr(path.join(LAUNCHER_DIR, "input_presets", "Default.ini"));
  if (!ini || !defaults) return ini || "";

  const readDefaults = (wanted) => {
    const out = new Map();
    let section = "";
    for (const line of defaults.split(/\r?\n/)) {
      const header = line.match(/^\s*\[(.+?)\]\s*$/);
      if (header) { section = header[1]; continue; }
      const kv = line.match(/^\s*(\w+)\s*=\s*"?([^"]*)"?\s*$/);
      if (kv && section === wanted && kv[2] !== "0") out.set(kv[1], kv[2]);
    }
    return out;
  };

  const wanted = new Set(["CONTROLLER MAPPING", "KEYBOARD MAPPING", "MOUSE"]);
  const cache = new Map();
  const out = [];
  let section = "";
  for (const line of ini.split(/\r?\n/)) {
    const header = line.match(/^\s*\[(.+?)\]\s*$/);
    if (header) {
      section = header[1];
      out.push(line);
      continue;
    }
    const kv = line.match(/^(\s*)(\w+)(\s*=\s*)"?([^"]*)"?(\s*)$/);
    if (kv && wanted.has(section)) {
      const [, indent, key, eq, value, tail] = kv;
      if (value === "0") {
        if (!cache.has(section)) cache.set(section, readDefaults(section));
        const fallback = cache.get(section).get(key);
        if (fallback !== undefined) {
          out.push(`${indent}${key}${eq}"${fallback}"${tail}`);
          continue;
        }
      }
    }
    out.push(line);
  }
  return out.join("\n");
}

// ---------------------------------------------------------------- routes

async function handleApi(req, res, url) {
  const route = `${req.method} ${url.pathname}`;

  if (route === "GET /api/bootstrap") return json(res, 200, await bootstrap());

  if (route === "GET /api/state") return json(res, 200, await currentState());

  // Consumed once: the game page asks for the settings.ini that was current when
  // Start Game was pressed, so the options the user just set are the ones the game
  // boots with.
  if (route === "GET /api/launch-handoff") {
    const payload = pendingLaunch || { at: 0, ini: readTextOr(SETTINGS_INI) || "" };
    pendingLaunch = null;
    return json(res, 200, { at: payload.at, ini: fillUnsetBindings(payload.ini) });
  }

  // The four skyboxes missing from the .data, regenerated with tools/skyconv and
  // handed to the game page as base64 so it can write them into its filesystem
  // before the game boots. 225 tiles, ~900 KB, fetched once per launch.
  if (route === "GET /api/skyboxes") {
    const cache = generateSkyboxTiles();
    const files = {};
    for (const [name, file] of Object.entries(cache.tiles)) {
      files[name] = fs.readFileSync(file).toString("base64");
    }
    return json(res, 200, { files, missing: cache.missing, count: Object.keys(files).length });
  }

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

// One file out of the WebAssembly build directory, with the path traversal guard
// and the caching policy: the 3.5 MB .data and the 8.9 MB .wasm are worth keeping
// for an hour, everything else has to reflect a rebuild immediately.
async function sendWasmFile(res, rest) {
  const filePath = path.join(WASM_DIR, decodeURIComponent(rest));
  if (!filePath.startsWith(WASM_DIR)) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  try {
    const data = await fsp.readFile(filePath);
    const heavy = rest.endsWith(".data") || rest.endsWith(".wasm");
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": heavy ? "public, max-age=3600" : "no-cache"
    });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" })
      .end(`Not found: ${rest}\nExpected the WebAssembly build in ${WASM_DIR}`);
  }
}

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
  // Inside the try, deliberately. A request target like "//" is a protocol-relative
  // URL with an empty host, which makes new URL() throw, and a throw from here would
  // reject the async handler and take the whole process down with it. The browser
  // does send these (a favicon resolved against a path with a trailing slash), so a
  // bad URL is a 400, not a dead server.
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
    } else if (url.pathname === "/game" || url.pathname === "/game/") {
      // /game/ serves the page itself rather than redirecting to /game/index.html,
      // so the launcher's query string (?menu=1 and friends) survives the handoff
      // and the game runs at /game/?menu=1. Relative asset URLs still resolve,
      // because the document's base directory is /game/ either way.
      await sendWasmFile(res, "index.html");
    } else if (url.pathname.startsWith("/game/")) {
      // The WebAssembly build.
      await sendWasmFile(res, url.pathname.slice("/game/".length));
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
    // ERR_INVALID_URL means the request target itself was unparseable, which is a
    // client error rather than a server fault.
    const code = err && err.code === "ERR_INVALID_URL" ? 400 : 500;
    try {
      json(res, code, { error: err.message });
    } catch {
      // Headers already sent, or the socket is gone. Nothing useful left to do, and
      // throwing here would be the thing that actually kills the server.
      try { res.end(); } catch { /* already gone */ }
    }
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