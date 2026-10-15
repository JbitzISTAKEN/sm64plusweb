// DirectInput scan codes, exactly as used by src/game/settings.c in the game.
// These are the values stored for TYPE_KEY options.
//
// The names run out at 236 because SDL splits the space in two: everything below
// 256 is a Windows DIK code, everything from 256 up is an SDL-specific extension.
// The shipped launcher/input_presets/Default.ini binds the four C buttons to 328,
// 331, 333 and 336, which are the arrow keys in that upper range, so without the
// second table those four rows render as "Unknown" even though they are bound
// correctly. The codes and names below are the ones the game itself uses, taken
// from src/pc/controller/controller_emscripten_keyboard.c.
export const SDL_EXTENDED_NAMES = {
  284: "NUMPADENTER", 285: "RCONTROL", 309: "NUMPDIVIDE", 312: "RALT",
  327: "HOME", 328: "UP", 329: "PAGEUP", 331: "LEFT", 333: "RIGHT", 335: "END",
  336: "DOWN", 337: "PAGEDOWN", 338: "INSERT", 339: "DELETE",
  347: "LWIN", 348: "RWIN", 349: "APPS", 541: "PAUSE"
};

export const DIK_NAMES = {
  1: "ESCAPE", 2: "1", 3: "2", 4: "3", 5: "4", 6: "5", 7: "6", 8: "7", 9: "8", 10: "9",
  11: "0", 12: "MINUS", 13: "EQUALS", 14: "BACK", 15: "TAB",
  16: "Q", 17: "W", 18: "E", 19: "R", 20: "T", 21: "Y", 22: "U", 23: "I", 24: "O", 25: "P",
  26: "LBRACKET", 27: "RBRACKET", 28: "RETURN", 29: "LCONTROL",
  30: "A", 31: "S", 32: "D", 33: "F", 34: "G", 35: "H", 36: "J", 37: "K", 38: "L",
  39: "SEMICOLON", 40: "APOSTROPHE", 41: "GRAVE", 42: "LSHIFT", 43: "BACKSLASH",
  44: "Z", 45: "X", 46: "C", 47: "V", 48: "B", 49: "N", 50: "M",
  51: "COMMA", 52: "PERIOD", 53: "SLASH", 54: "RSHIFT", 55: "MULTIPLY", 56: "LMENU", 57: "SPACE",
  58: "CAPITAL",
  59: "F1", 60: "F2", 61: "F3", 62: "F4", 63: "F5", 64: "F6", 65: "F7", 66: "F8", 67: "F9", 68: "F10",
  69: "NUMLOCK", 70: "SCROLL",
  71: "NUMPAD7", 72: "NUMPAD8", 73: "NUMPAD9", 74: "SUBTRACT",
  75: "NUMPAD4", 76: "NUMPAD5", 77: "NUMPAD6", 78: "ADD",
  79: "NUMPAD1", 80: "NUMPAD2", 81: "NUMPAD3", 82: "NUMPAD0", 83: "DECIMAL",
  86: "OEM_102", 87: "F11", 88: "F12",
  100: "F13", 101: "F14", 102: "F15",
  112: "KANA", 115: "ABNT_C1", 121: "CONVERT", 123: "NOCONVERT", 125: "YEN", 126: "ABNT_C2",
  141: "NUMPADEQUALS", 144: "PREVTRACK", 145: "AT", 146: "COLON", 147: "UNDERLINE",
  148: "KANJI", 149: "STOP", 150: "AX", 151: "UNLABELED", 153: "NEXTTRACK",
  156: "NUMPADENTER", 157: "RCONTROL",
  160: "MUTE", 161: "CALCULATOR", 162: "PLAYPAUSE", 164: "MEDIASTOP",
  174: "VOLUMEDOWN", 176: "VOLUMEUP", 178: "WEBHOME", 179: "NUMPADCOMMA", 181: "DIVIDE",
  183: "SYSRQ", 184: "RMENU",
  197: "PAUSE", 199: "HOME", 200: "UP", 201: "PRIOR", 203: "LEFT", 205: "RIGHT",
  207: "END", 208: "DOWN", 209: "NEXT", 210: "INSERT", 211: "DELETE",
  219: "LWIN", 220: "RWIN", 221: "APPS", 222: "POWER", 223: "SLEEP", 227: "WAKE",
  229: "WEBSEARCH", 230: "WEBFAVORITES", 231: "WEBREFRESH", 232: "WEBSTOP",
  233: "WEBFORWARD", 234: "WEBBACK", 235: "MYCOMPUTER", 236: "MAIL"
};

// Browser KeyboardEvent.code -> DirectInput scan code.
// The standard block follows the USB HID usage table, which DirectInput mirrors.
export const KEYCODE_TO_DIK = {
  Escape: 1,
  Digit1: 2, Digit2: 3, Digit3: 4, Digit4: 5, Digit5: 6, Digit6: 7, Digit7: 8, Digit8: 9, Digit9: 10, Digit0: 11,
  Minus: 12, Equal: 13, Backspace: 14, Tab: 15,
  KeyQ: 16, KeyW: 17, KeyE: 18, KeyR: 19, KeyT: 20, KeyY: 21, KeyU: 22, KeyI: 23, KeyO: 24, KeyP: 25,
  BracketLeft: 26, BracketRight: 27, Enter: 28, ControlLeft: 29,
  KeyA: 30, KeyS: 31, KeyD: 32, KeyF: 33, KeyG: 34, KeyH: 35, KeyJ: 36, KeyK: 37, KeyL: 38,
  Semicolon: 39, Quote: 40, Backquote: 41, ShiftLeft: 42, Backslash: 43,
  KeyZ: 44, KeyX: 45, KeyC: 46, KeyV: 47, KeyB: 48, KeyN: 49, KeyM: 50,
  Comma: 51, Period: 52, Slash: 53, ShiftRight: 54,
  NumpadMultiply: 55, AltLeft: 56, Space: 57, CapsLock: 58,
  F1: 59, F2: 60, F3: 61, F4: 62, F5: 63, F6: 64, F7: 65, F8: 66, F9: 67, F10: 68,
  NumLock: 69, ScrollLock: 70,
  Numpad7: 71, Numpad8: 72, Numpad9: 73, NumpadSubtract: 74,
  Numpad4: 75, Numpad5: 76, Numpad6: 77, NumpadAdd: 78,
  Numpad1: 79, Numpad2: 80, Numpad3: 81, Numpad0: 82, NumpadDecimal: 83,
  IntlBackslash: 86, F11: 87, F12: 88, F13: 100, F14: 101, F15: 102,
  Convert: 121, NonConvert: 123, KanaMode: 112, NumpadEnter: 156, ControlRight: 157,
  NumpadEqual: 141, ContextMenu: 221, Power: 222,
  NumpadComma: 179, NumpadDivide: 181, AltRight: 184,
  PrintScreen: 183, Pause: 197,
  Home: 199, ArrowUp: 200, PageUp: 201, ArrowLeft: 203, ArrowRight: 205,
  End: 207, ArrowDown: 208, PageDown: 209, Insert: 210, Delete: 211,
  MetaLeft: 219, MetaRight: 220,
  BrowserBack: 234, BrowserForward: 233, BrowserRefresh: 231, BrowserStop: 232, BrowserSearch: 229, BrowserFavorites: 230, BrowserHome: 178
};

// Pretty names, so the web UI doesn't just say "LSHIFT".
const DISPLAY_NAMES = {
  ESCAPE: "Escape", BACK: "Backspace", RETURN: "Enter", TAB: "Tab", SPACE: "Space",
  LCONTROL: "Left Ctrl", RCONTROL: "Right Ctrl", LSHIFT: "Left Shift", RSHIFT: "Right Shift",
  LMENU: "Left Alt", RMENU: "Right Alt", CAPITAL: "Caps Lock", NUMLOCK: "Num Lock", SCROLL: "Scroll Lock",
  OEM_102: "OEM 102", MINUS: "-", EQUALS: "=", LBRACKET: "[", RBRACKET: "]", SEMICOLON: ";",
  APOSTROPHE: "'", GRAVE: "`", BACKSLASH: "\\", COMMA: ",", PERIOD: ".", SLASH: "/",
  SUBTRACT: "Numpad -", ADD: "Numpad +", MULTIPLY: "Numpad *", DIVIDE: "Numpad /",
  DECIMAL: "Numpad .", NUMPADENTER: "Numpad Enter", NUMPADEQUALS: "Numpad =", NUMPADCOMMA: "Numpad ,",
  SYSRQ: "Print Screen", PAUSE: "Pause", PRIOR: "Page Up", NEXT: "Page Down",
  UP: "Up", DOWN: "Down", LEFT: "Left", RIGHT: "Right",
  HOME: "Home", END: "End", INSERT: "Insert", DELETE: "Delete",
  LWIN: "Left Win", RWIN: "Right Win", APPS: "Menu", POWER: "Power",
  KANA: "Kana", CONVERT: "Convert", NOCONVERT: "No Convert", YEN: "Yen",
  PREVTRACK: "Prev Track", NEXTTRACK: "Next Track", MUTE: "Mute", VOLUMEDOWN: "Vol Down", VOLUMEUP: "Vol Up",
  CALCULATOR: "Calculator", PLAYPAUSE: "Play/Pause", MEDIASTOP: "Media Stop", SLEEP: "Sleep", WAKE: "Wake"
};

export function dikName(code) {
  const name = DIK_NAMES[Number(code)] || SDL_EXTENDED_NAMES[Number(code)];
  if (!name) return "None";
  if (DISPLAY_NAMES[name]) return DISPLAY_NAMES[name];
  if (/^[A-Z0-9]$/.test(name)) return name;
  return name.charAt(0) + name.slice(1).toLowerCase().replace(/_/g, " ");
}

// GameMaker's keyboard_get_scan_name() equivalents, used by the original launcher text.
// Looks in the DIK table first, then the SDL extended range, so a C button bound to
// an arrow key (328, 331, 333, 336) reads as a name instead of "Unknown".
export function keyText(code) {
  const num = Number(code);
  if (!num) return "None";
  const name = DIK_NAMES[num] || SDL_EXTENDED_NAMES[num];
  if (!name) return "Unknown";
  return dikName(num);
}