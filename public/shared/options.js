// Port of scr_types.gml / scr_categories_and_options.gml from the original GameMaker launcher.
// Shared between the node server and the browser UI so both agree on formatting and ini layout.

import { keyText, dikName } from "./dik.js";

export const LAUNCHER_VERSION = "v4.0.0";

export const MIN_WIDTH = 512;
export const MIN_HEIGHT = 240;

export const OS_ANY = 0;
export const OS_WINDOWS = 1;
export const OS_LINUX = 2;

export const TYPE = {
  BOOL: 0,
  UINT: 1,
  FLOAT: 2,
  KEY: 3,
  STAR_MESSAGE: 4,
  NOISE_TYPE: 5,
  HUD_LAYOUT: 6,
  MOUSE_BUTTON: 7,
  MULTIPLIER: 8,
  PERCENTAGE: 9,
  CAMERA_MODE: 10,
  BACKEND_WINDOWS: 11,
  BACKEND_LINUX: 12,
  LIVES_MODE: 13,
  ENCORE_MODE: 14,
  TEXTURE_FILTERING: 15,
  MOON_JUMP: 16,
  MONITOR: 17,
  GREEN_DEMON_MODE: 18,
  COLOR: 19,
  BLJ_EVERYWHERE: 20,
  LOD: 21,
  FRAME_RATE: 22,
  PALETTE: 23,
  FIXES: 24,
  DRAW_DISTANCE: 25,
  CONTROLLER_BUTTON: 26,
  WINDOW_SIZE: 27,
  LAUNCHER_WIDTH: 28,
  LAUNCHER_HEIGHT: 29,
  INTERNAL_RESOLUTION: 30,
  ANTIALIASING: 31,
  ANISOTROPIC: 32,
  ASPECT_RATIO: 33,
  DISPLAY_MODE: 34
};

// String constants used by categories.json / launcher_settings.json, replaced before parsing.
const CONSTANTS = {
  OS_ANY, OS_WINDOWS, OS_LINUX,
  TYPE_BOOL: 0, TYPE_UINT: 1, TYPE_FLOAT: 2, TYPE_KEY: 3, TYPE_STAR_MESSAGE: 4,
  TYPE_NOISE_TYPE: 5, TYPE_HUD_LAYOUT: 6, TYPE_MOUSE_BUTTON: 7, TYPE_MULTIPLIER: 8,
  TYPE_PERCENTAGE: 9, TYPE_CAMERA_MODE: 10, TYPE_BACKEND_WINDOWS: 11, TYPE_BACKEND_LINUX: 12,
  TYPE_LIVES_MODE: 13, TYPE_ENCORE_MODE: 14, TYPE_TEXTURE_FILTERING: 15, TYPE_MOON_JUMP: 16,
  TYPE_MONITOR: 17, TYPE_GREEN_DEMON_MODE: 18, TYPE_COLOR: 19, TYPE_BLJ_EVERYWHERE: 20,
  TYPE_LOD: 21, TYPE_FRAME_RATE: 22, TYPE_PALETTE: 23, TYPE_FIXES: 24, TYPE_DRAW_DISTANCE: 25,
  TYPE_CONTROLLER_BUTTON: 26, TYPE_WINDOW_SIZE: 27, TYPE_LAUNCHER_WIDTH: 28,
  TYPE_LAUNCHER_HEIGHT: 29, TYPE_INTERNAL_RESOLUTION: 30, TYPE_ANTIALIASING: 31,
  TYPE_ANISOTROPIC: 32, TYPE_ASPECT_RATIO: 33, TYPE_DISPLAY_MODE: 34
};

export function replaceJsonConstants(contents) {
  let out = contents;
  for (const [name, value] of Object.entries(CONSTANTS)) {
    out = out.replaceAll(name, String(value));
  }
  return out;
}

// GameMaker's json_parse keeps these enum constants as strings ("9"), so they are
// coerced back to numbers here, otherwise every switch on option type would miss.
const NUMERIC_FIELDS = ["type", "os", "enabled_by", "disabled_by"];

function normalise(entry) {
  for (const field of NUMERIC_FIELDS) {
    if (typeof entry[field] === "string" && entry[field] !== "" && !Number.isNaN(Number(entry[field]))) {
      entry[field] = Number(entry[field]);
    }
  }
  if (Array.isArray(entry.items)) entry.items = entry.items.map(normalise);
  return entry;
}

export function parseJsonConstants(contents) {
  const parsed = JSON.parse(replaceJsonConstants(contents));
  return Array.isArray(parsed) ? parsed.map(normalise) : normalise(parsed);
}

// N64 buttons, in enum order (scr_categories_and_options.gml).
export const N64_BUTTONS = ["None", "A (Jump)", "B (Punch)", "Start (Pause)", "L (Center Camera)",
  "R (Change Camera)", "Z (Crouch)", "C-Up (Zoom In)", "C-Down (Zoom Out)",
  "C-Left (Rotate Left)", "C-Right (Rotate Right)"];

export const N64_BUTTON_VALUES = [0, 0x8000, 0x4000, 0x1000, 0x0020, 0x0010, 0x2000, 0x0008,
  0x0004, 0x0002, 0x0001];

// SDL controller buttons, as a bitmask (TYPE_CONTROLLER_BUTTON).
export const CONTROLLER_BUTTONS = [
  { value: 2, name: "A" }, { value: 4, name: "B" }, { value: 8, name: "X" },
  { value: 16, name: "Y" }, { value: 32, name: "Select" }, { value: 64, name: "Guide" },
  { value: 128, name: "Start" }, { value: 256, name: "Left Stick" }, { value: 512, name: "Right Stick" },
  { value: 1024, name: "L" }, { value: 2048, name: "R" },
  { value: 4096, name: "DPad Up" }, { value: 8192, name: "DPad Down" },
  { value: 16384, name: "DPad Left" }, { value: 32768, name: "DPad Right" },
  { value: 4194304, name: "ZL" }, { value: 8388608, name: "ZR" }
];

const MARK_ON = "✔";      // default / enabled
const MARK_SET = "❓";    // explicitly set
const MARK_OFF = "❌";    // off / none

// Per type metadata used to build the right editor in the browser.
export const TYPE_INFO = {
  [TYPE.BOOL]: { kind: "bool" },
  [TYPE.UINT]: { kind: "int", step: 1, min: 0 },
  [TYPE.FLOAT]: { kind: "float", step: 0.1 },
  [TYPE.KEY]: { kind: "key", min: 1, max: 336 },
  [TYPE.STAR_MESSAGE]: { kind: "enum", values: ["Nah", "Always Ask", "Yep", "Legacy"], min: 0, max: 3 },
  [TYPE.NOISE_TYPE]: { kind: "enum", values: ["Chunky", "High-Res", "Transparency"], min: 0, max: 2 },
  [TYPE.HUD_LAYOUT]: { kind: "enum", values: ["Default", "Enhanced", "Modern"], min: 0, max: 2 },
  [TYPE.MOUSE_BUTTON]: { kind: "enum", values: N64_BUTTONS, min: 0, max: N64_BUTTONS.length - 1 },
  [TYPE.MULTIPLIER]: { kind: "float", step: 0.1, min: 0.1, suffix: "x" },
  [TYPE.PERCENTAGE]: { kind: "percent", step: 0.05, min: 0, max: 1 },
  [TYPE.CAMERA_MODE]: { kind: "enum", values: ["Lakitu Cam", "Mario Cam", "Custom Cam"], min: 0, max: 2 },
  [TYPE.BACKEND_WINDOWS]: { kind: "enum", values: ["Direct3D 11", "Direct3D 12", "OpenGL"], min: 0, max: 2 },
  [TYPE.BACKEND_LINUX]: { kind: "enum", values: ["OpenGL"], min: 0, max: 0 },
  [TYPE.LIVES_MODE]: { kind: "enum", values: ["Off", "On", "On w/ Death Counter"], min: 0, max: 2 },
  [TYPE.ENCORE_MODE]: { kind: "enum", values: ["Off", "On", "Palette Only", "Mirroring Only"], min: 0, max: 3 },
  [TYPE.TEXTURE_FILTERING]: { kind: "enum", values: ["Nearest Neighbor", "3 Point", "Bilinear"], min: -1, max: 1, labelsShifted: true },
  [TYPE.MOON_JUMP]: { kind: "enum", values: ["Off", "Classic", "Fixed"], min: 0, max: 2 },
  [TYPE.MONITOR]: { kind: "int", step: 1, min: 1, max: 10 },
  [TYPE.GREEN_DEMON_MODE]: { kind: "enum", values: ["Off", "On", "Constant Chase!", "Unfair Chase!!!"], min: 0, max: 3 },
  [TYPE.COLOR]: { kind: "color" },
  [TYPE.BLJ_EVERYWHERE]: { kind: "enum", values: ["Off", "On", "Grounded Longer", "Rapidfire Mode"], min: 0, max: 3 },
  [TYPE.LOD]: { kind: "enum", values: ["Auto", "Low", "High"], min: 0, max: 2 },
  [TYPE.FRAME_RATE]: { kind: "enum", values: ["30 FPS", "60 FPS"], min: 0, max: 1 },
  [TYPE.PALETTE]: {
    kind: "enum",
    values: ["Custom", "Default Mario", "Mario Tweaked", "Fire Mario", "Classic Mario", "SMW Mario",
      "Luigi", "Fire Luigi", "Classic Luigi", "SMW Luigi", "Wario", "Waluigi", "Hernesto"],
    min: 0, max: 11, clampMax: 12
  },
  [TYPE.FIXES]: { kind: "enum", values: ["None", "Only Simple Ones", "Including Collisions", "Including Exploits"], min: 0, max: 3 },
  [TYPE.DRAW_DISTANCE]: { kind: "float", step: 0.5, min: 0, suffix: "x" },
  [TYPE.CONTROLLER_BUTTON]: { kind: "buttons" },
  [TYPE.WINDOW_SIZE]: { kind: "int", step: 1, min: 1 },
  [TYPE.LAUNCHER_WIDTH]: { kind: "int", step: 1, min: MIN_WIDTH },
  [TYPE.LAUNCHER_HEIGHT]: { kind: "int", step: 1, min: MIN_HEIGHT },
  [TYPE.INTERNAL_RESOLUTION]: { kind: "float", step: 0.5, min: 0, suffix: "x" },
  [TYPE.ANTIALIASING]: { kind: "enum", values: ["Disabled", "2x", "4x", "8x"], valuesByState: { 0: "Disabled", 2: "2x", 4: "4x", 8: "8x" }, min: 0, max: 8, clampMax: 8 },
  [TYPE.ANISOTROPIC]: { kind: "enum", values: ["Off", "2x", "4x", "8x", "16x"], valuesByState: { 0: "Off", 2: "2x", 4: "4x", 8: "8x", 16: "16x" }, min: 0, max: 16, clampMax: 16 },
  [TYPE.ASPECT_RATIO]: { kind: "enum", values: ["Auto", "Force 4:3", "Force 16:9"], min: 0, max: 2 },
  [TYPE.DISPLAY_MODE]: { kind: "enum", values: ["Native"], min: 0, max: 0, webUnsupported: true }
};

export function typeInfo(item) {
  return TYPE_INFO[item.type] || { kind: "int", step: 1, min: 0 };
}

function clampNum(value, min, max) {
  let v = Number(value);
  if (!Number.isFinite(v)) v = min ?? 0;
  if (min !== undefined && v < min) v = min;
  if (max !== undefined && v > max) v = max;
  return v;
}

export function enumLabel(item) {
  const info = typeInfo(item);
  if (!info.values) return String(item.state);
  const state = Math.floor(Number(item.state));
  if (info.valuesByState) return info.valuesByState[state] ?? "Off";
  if (info.labelsShifted) return info.values[state + 1] ?? String(state);
  return info.values[state] ?? String(state);
}

// One marker per possible state, exactly like the original hardcoded per type.
const MARKS = {
  [TYPE.STAR_MESSAGE]: [MARK_OFF, MARK_SET, MARK_ON, MARK_SET],
  [TYPE.NOISE_TYPE]: [MARK_SET, MARK_SET, MARK_SET],
  [TYPE.HUD_LAYOUT]: [MARK_OFF, MARK_SET, MARK_ON],
  [TYPE.MOUSE_BUTTON]: [MARK_OFF, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET],
  [TYPE.CAMERA_MODE]: [MARK_ON, MARK_ON, MARK_SET],
  [TYPE.BACKEND_WINDOWS]: [MARK_ON, MARK_SET, MARK_SET],
  [TYPE.BACKEND_LINUX]: [MARK_ON],
  [TYPE.LIVES_MODE]: [MARK_OFF, MARK_ON, MARK_SET],
  [TYPE.ENCORE_MODE]: [MARK_OFF, MARK_ON, MARK_SET, MARK_SET],
  [TYPE.TEXTURE_FILTERING]: [MARK_SET, MARK_OFF, MARK_SET],
  [TYPE.MOON_JUMP]: [MARK_OFF, MARK_SET, MARK_ON],
  [TYPE.MONITOR]: [MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET, MARK_SET],
  [TYPE.GREEN_DEMON_MODE]: [MARK_OFF, MARK_ON, MARK_SET, MARK_OFF],
  [TYPE.BLJ_EVERYWHERE]: [MARK_OFF, MARK_ON, MARK_SET, MARK_SET],
  [TYPE.LOD]: [MARK_SET, MARK_OFF, MARK_ON],
  [TYPE.FRAME_RATE]: [MARK_OFF, MARK_ON],
  [TYPE.PALETTE]: Array(13).fill(MARK_SET),
  [TYPE.ANTIALIASING]: [MARK_OFF, MARK_OFF, MARK_ON, MARK_OFF, MARK_ON, MARK_OFF, MARK_OFF, MARK_OFF, MARK_ON],
  [TYPE.ANISOTROPIC]: Array(17).fill(null).map((_, i) => (i === 0 ? MARK_OFF : MARK_ON)),
  [TYPE.ASPECT_RATIO]: [MARK_ON, MARK_SET, MARK_SET],
  [TYPE.INTERNAL_RESOLUTION]: [MARK_ON],
  [TYPE.DISPLAY_MODE]: [MARK_ON]
};

function markFor(item) {
  const marks = MARKS[item.type];
  if (!marks) return MARK_SET;
  const state = Math.floor(Number(item.state));
  if (item.type === TYPE.TEXTURE_FILTERING) return state > 0 ? MARK_SET : MARK_OFF;
  if (item.type === TYPE.INTERNAL_RESOLUTION) return state <= 0 ? MARK_ON : MARK_SET;
  return marks[state] ?? MARK_SET;
}

// Port of get_option_text().
export function optionText(item) {
  const name = item.name;
  const info = typeInfo(item);
  const mark = markFor(item);

  switch (item.type) {
    case TYPE.BOOL:
      return `${name}:${item.state ? MARK_ON : MARK_OFF}${item.state ? "On" : "Off"}`;
    case TYPE.PERCENTAGE:
      return `${name}:${item.state >= 1 ? MARK_ON : item.state <= 0 ? MARK_OFF : MARK_SET}${Math.round(item.state * 100)}%`;
    case TYPE.KEY:
      return `${name}:${item.state ? MARK_SET : MARK_OFF}${keyText(item.state)} [${item.state}]`;
    case TYPE.MULTIPLIER:
      return `${name}:${MARK_SET}${item.state}x`;
    case TYPE.COLOR:
      return `${name}:${MARK_SET}#${item.state?.hex || "000000"}`;
    case TYPE.FIXES:
      return item.state <= 0 ? `${name}:${MARK_OFF}None`
        : item.state === 1 ? `${name}:${MARK_ON}Only Simple Ones`
          : item.state === 2 ? `${name}:${MARK_ON}Including Collisions`
            : `${name}:${MARK_SET}Including Exploits`;
    case TYPE.DRAW_DISTANCE:
      return item.state <= 0 ? `${name}:${MARK_ON}Infinite` : `${name}:${MARK_SET}${trimNum(item.state)}x`;
    case TYPE.INTERNAL_RESOLUTION:
      return item.state <= 0 ? `${name}:${MARK_ON}Display Resolution`
        : `${name}:${mark}${trimNum(item.state)}x`;
    case TYPE.ANTIALIASING:
    case TYPE.ANISOTROPIC:
      return item.state <= 0
        ? `${name}:${MARK_OFF}${item.type === TYPE.ANTIALIASING ? "Disabled" : "Off"}`
        : `${name}:${MARK_ON}${item.state}x`;
    case TYPE.CONTROLLER_BUTTON: {
      const pressed = CONTROLLER_BUTTONS.filter((b) => (Number(item.state) & b.value) === b.value).map((b) => b.name);
      return pressed.length ? `${name}:${MARK_SET}(${pressed.join(") or (")})` : `${name}:${MARK_OFF}None`;
    }
    case TYPE.DISPLAY_MODE:
      return Number(item.state) === 0 ? `${name}:${MARK_ON}Native` : `${name}:${MARK_SET}${item.state}`;
    default:
      break;
  }

  if (info.kind === "enum") return `${name}:${mark}${enumLabel(item)}`;
  return `${name}:${MARK_SET}${item.state}`;
}

function trimNum(value) {
  const num = Number(value);
  return Number.isInteger(num) ? String(num) : String(Math.round(num * 100) / 100);
}

export function defaultState(item) {
  switch (item.type) {
    case TYPE.BOOL: return false;
    case TYPE.KEY: return 0;
    case TYPE.LAUNCHER_WIDTH: return 1280;
    case TYPE.LAUNCHER_HEIGHT: return 720;
    case TYPE.MULTIPLIER: return 1;
    case TYPE.COLOR: return { r: 0, g: 0, b: 0, hex: "000000" };
    case TYPE.PERCENTAGE:
      // Launcher audio defaults to full volume (load_launcher_settings), the game reads the presets.
      return item.internal_name === "music_volume" || item.internal_name === "sound_volume" ? 1 : 0;
    default: return 0;
  }
}

// ini_load_item()
export function readItem(item, section, ini) {
  switch (item.type) {
    case TYPE.BOOL:
      item.state = ini.readString(section, item.internal_name, "false") === "true";
      break;
    case TYPE.MOUSE_BUTTON: {
      const value = ini.readReal(section, item.internal_name, 0);
      item.state = Math.max(0, N64_BUTTON_VALUES.indexOf(value));
      break;
    }
    case TYPE.COLOR: {
      const r = clampNum(ini.readReal(section, item.internal_name + "_r", 0), 0, 255);
      const g = clampNum(ini.readReal(section, item.internal_name + "_g", 0), 0, 255);
      const b = clampNum(ini.readReal(section, item.internal_name + "_b", 0), 0, 255);
      item.state = { r, g, b, hex: hex(r, g, b) };
      break;
    }
    case TYPE.LAUNCHER_WIDTH:
      item.state = ini.readReal(section, item.internal_name, 1280);
      break;
    case TYPE.LAUNCHER_HEIGHT:
      item.state = ini.readReal(section, item.internal_name, 720);
      break;
    default:
      item.state = ini.readReal(section, item.internal_name, defaultState(item) || 0);
      break;
  }
  return item;
}

function hex(r, g, b) {
  return [r, g, b].map((c) => clampNum(Math.round(c), 0, 255).toString(16).padStart(2, "0")).join("").toUpperCase();
}

export function colorToHex(r, g, b) {
  return hex(r, g, b);
}

// ini_save_item()
export function writeItem(item, section, ini) {
  const name = item.internal_name;
  switch (item.type) {
    case TYPE.BOOL:
      ini.writeString(section, name, item.state ? "true" : "false");
      break;
    case TYPE.MOUSE_BUTTON:
      ini.writeString(section, name, String(Math.floor(N64_BUTTON_VALUES[item.state] ?? 0)));
      break;
    case TYPE.COLOR:
      ini.writeReal(section, name + "_r", item.state.r);
      ini.writeReal(section, name + "_g", item.state.g);
      ini.writeReal(section, name + "_b", item.state.b);
      break;
    case TYPE.FLOAT:
    case TYPE.PERCENTAGE:
    case TYPE.DRAW_DISTANCE:
    case TYPE.INTERNAL_RESOLUTION:
      ini.writeReal(section, name, Number(item.state));
      break;
    case TYPE.ANTIALIASING:
    case TYPE.ANISOTROPIC:
    case TYPE.ASPECT_RATIO:
    case TYPE.DISPLAY_MODE:
      ini.writeString(section, name, String(Math.floor(Number(item.state))));
      break;
    default:
      ini.writeString(section, name, String(Math.floor(Number(item.state))));
      break;
  }
}

// ini_key_exists() for a single item.
export function itemExistsInIni(item, section, ini) {
  if (item.type === TYPE.COLOR) {
    return ini.has(section, item.internal_name + "_r") && ini.has(section, item.internal_name + "_g")
      && ini.has(section, item.internal_name + "_b");
  }
  return ini.has(section, item.internal_name);
}

export function itemDefaults(item) {
  if (item.state === undefined) item.state = defaultState(item);
  return item;
}

// is_enabled() from scr_categories_and_options.gml (enabled_by / disabled_by are item indices).
export function isEnabled(items, index) {
  const item = items[index];
  if (!item) return false;
  const enabledBy = item.enabled_by ?? -1;
  const disabledBy = item.disabled_by ?? -1;
  const enabledOk = enabledBy < 0 || !Number.isFinite(items[enabledBy]?.state) || items[enabledBy].state > 0;
  const disabledOk = disabledBy < 0 || !Number.isFinite(items[disabledBy]?.state) || items[disabledBy].state <= 0;
  return enabledOk && disabledOk;
}

// change_option_state() -> returns the next state for a left/right move.
export function stepItem(item, direction, coarse = false) {
  const info = typeInfo(item);
  let state = item.state;

  switch (item.type) {
    case TYPE.BOOL:
      return !state;
    case TYPE.UINT:
      return Math.max(0, Number(state) + direction * (coarse ? 2 : 1));
    case TYPE.FLOAT:
      return Number(state) + direction * (coarse ? 2 : 1) / 10;
    case TYPE.KEY:
      return clampNum(Number(state) + direction * (coarse ? 2 : 1), 1, 336);
    case TYPE.MULTIPLIER:
      return Math.max(0.1, Number(state) + direction * (coarse ? 2 : 1) / 10);
    case TYPE.PERCENTAGE:
      return clampNum(Number(state) + direction * (coarse ? 2 : 1) / 20, 0, 1);
    case TYPE.TEXTURE_FILTERING:
      return clampNum(state + direction, -1, 1);
    case TYPE.DRAW_DISTANCE:
      return Math.max(0, Number(state) + direction * (coarse ? 2 : 1) / 2);
    case TYPE.INTERNAL_RESOLUTION:
      return Math.max(0, Number(state) + direction * (coarse ? 2 : 1) / 2);
    case TYPE.ANTIALIASING: {
      const steps = [0, 2, 4, 8];
      return steps[Math.max(0, steps.indexOf(Number(state)) + direction)] ?? 0;
    }
    case TYPE.ANISOTROPIC: {
      const steps = [0, 2, 4, 8, 16];
      return steps[Math.max(0, steps.indexOf(Number(state)) + direction)] ?? 0;
    }
    case TYPE.MOUSE_BUTTON:
      return clampNum(state + direction, 0, N64_BUTTONS.length - 1);
    default:
      if (info.kind === "enum") return clampNum(state + direction, info.min, info.clampMax ?? info.max);
      if (info.kind === "int") return clampNum(state + direction * (coarse ? 3 : 1), info.min ?? 0);
      return clampNum(Number(state) + direction, info.min, info.max);
  }
}

// Filters out categories/items that don't belong on this OS (delete_categories()).
export function filterForPlatform(categories, platform) {
  const isWindows = platform === "win32";
  const keep = (entry) => !(entry.os === OS_WINDOWS && !isWindows) && !(entry.os === OS_LINUX && isWindows);

  // Note: categories flagged "hidden" are kept, because the original launcher never
  // reads that flag and the section ranges depend on the raw category order.
  return categories
    .filter(keep)
    .map((category) => ({ ...category, items: (category.items || []).filter(keep) }));
}

// Section index ranges, as computed by calculate_category_ranges().
export function categoryRanges(categoryCount) {
  return {
    system: [0, 1],
    gameConfig: Array.from({ length: Math.max(0, categoryCount - 5) }, (_, i) => i + 2),
    input: Array.from({ length: 3 }, (_, i) => categoryCount - 3 + i)
  };
}

export function keyName(code) {
  return dikName(code);
}

// option_limit from scr_types.gml: which directions an option can still move in.
export const LIMIT = { NONE: "none", LEFT: "left", RIGHT: "right", BOTH: "both" };

export function optionLimit(item) {
  const info = typeInfo(item);
  const state = Number(item.state);
  switch (item.type) {
    case TYPE.UINT:
    case TYPE.DRAW_DISTANCE:
    case TYPE.INTERNAL_RESOLUTION:
      return state <= 0 ? LIMIT.RIGHT : LIMIT.BOTH;
    case TYPE.FLOAT:
    case TYPE.MULTIPLIER:
      return LIMIT.BOTH;
    case TYPE.KEY:
      return state <= 1 ? LIMIT.RIGHT : state >= 336 ? LIMIT.LEFT : LIMIT.BOTH;
    case TYPE.FIXES:
    case TYPE.ENCORE_MODE:
    case TYPE.BLJ_EVERYWHERE:
    case TYPE.GREEN_DEMON_MODE:
    case TYPE.STAR_MESSAGE:
      return state <= 0 ? LIMIT.RIGHT : state >= 3 ? LIMIT.LEFT : LIMIT.BOTH;
    case TYPE.CAMERA_MODE:
    case TYPE.NOISE_TYPE:
    case TYPE.HUD_LAYOUT:
    case TYPE.LIVES_MODE:
    case TYPE.MOON_JUMP:
    case TYPE.LOD:
    case TYPE.ASPECT_RATIO:
      return state <= 0 ? LIMIT.RIGHT : state >= 2 ? LIMIT.LEFT : LIMIT.BOTH;
    case TYPE.TEXTURE_FILTERING:
      return state <= -1 ? LIMIT.RIGHT : state >= 1 ? LIMIT.LEFT : LIMIT.BOTH;
    case TYPE.BACKEND_WINDOWS:
    case TYPE.BACKEND_LINUX:
      return LIMIT.NONE;
    case TYPE.MOUSE_BUTTON:
      return state <= 0.1 ? LIMIT.RIGHT : LIMIT.BOTH;
    case TYPE.PERCENTAGE:
    case TYPE.MONITOR:
    case TYPE.FRAME_RATE:
    case TYPE.PALETTE:
      return state <= (item.type === TYPE.MONITOR ? 1 : 0) ? LIMIT.RIGHT
        : state >= (info.clampMax ?? info.max) ? LIMIT.LEFT : LIMIT.BOTH;
    case TYPE.WINDOW_SIZE:
      return state <= 1 ? LIMIT.RIGHT : LIMIT.BOTH;
    case TYPE.LAUNCHER_WIDTH:
      return state <= MIN_WIDTH ? LIMIT.RIGHT : LIMIT.BOTH;
    case TYPE.LAUNCHER_HEIGHT:
      return state <= MIN_HEIGHT ? LIMIT.RIGHT : LIMIT.BOTH;
    case TYPE.ANTIALIASING:
      return state <= 0 ? LIMIT.RIGHT : state >= 8 ? LIMIT.LEFT : LIMIT.BOTH;
    case TYPE.ANISOTROPIC:
      return state <= 1 ? LIMIT.RIGHT : state >= 16 ? LIMIT.LEFT : LIMIT.BOTH;
    default:
      return LIMIT.BOTH;
  }
}
