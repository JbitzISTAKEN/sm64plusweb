// Where everything lives. Mirrors the #macro paths in scr_constants_and_globals.gml:
// the game lives next to the launcher, saves go to GameMaker's game_save_id folder.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const home = os.homedir();

export const HOME = process.env.SM64PLUS_HOME || path.join(home, ".sm64plus-launcher-web");
export const REPO_DIR = process.env.SM64PLUS_REPO_DIR || path.join(HOME, "sm64plus");
export const BUILD_DIR = path.join(REPO_DIR, "build", "us_pc");
export const LAUNCHER_DIR = path.join(REPO_DIR, "launcher");

export function saveDir() {
  if (process.env.SM64PLUS_SAVE_DIR) return process.env.SM64PLUS_SAVE_DIR;
  switch (process.platform) {
    case "darwin":
      return path.join(home, "Library", "Application Support", "SM64Plus");
    case "win32":
      return path.join(process.env.LOCALAPPDATA || path.join(home, "AppData", "Local"), "SM64Plus");
    default:
      return path.join(process.env.XDG_DATA_HOME || path.join(home, ".local", "share"), "SM64Plus");
  }
}

export const SAVE = saveDir();
export const SETTINGS_INI = path.join(SAVE, "settings.ini");
export const LAUNCHER_SETTINGS_INI = path.join(SAVE, "launcher_settings.ini");
export const LAUNCHER_CONFIG_INI = path.join(SAVE, "launcher_config.ini");
export const PRESETS_DIR = path.join(SAVE, "presets");
export const INPUT_PRESETS_DIR = path.join(SAVE, "input_presets");
export const EXTERNAL_GFX_DIR = path.join(SAVE, "gfx");
export const ROM_FILE = path.join(REPO_DIR, "baserom.us.z64");

export const GAME_EXE = process.platform === "win32" ? "sm64.us.exe" : "sm64.us";
export const GAME_EXE_OLD = process.platform === "win32" ? "sm64.us.f3dex2e.exe" : "sm64.us.f3dex2e";

export function exePath() {
  for (const name of [GAME_EXE, GAME_EXE_OLD]) {
    const full = path.join(BUILD_DIR, name);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

export function ensureDirs() {
  fs.mkdirSync(HOME, { recursive: true });
  fs.mkdirSync(SAVE, { recursive: true });
}

export const isWindows = process.platform === "win32";
export const gameExeName = GAME_EXE;
export const homeDir = home;