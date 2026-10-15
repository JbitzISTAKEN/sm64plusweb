// SM64Plus Launcher — web port.
//
// This is a direct port of the GameMaker objects, screen by screen:
//   obj_background     -> drawBackground()  (Draw_0 / Draw_73)
//   obj_init           -> boot object       (Create_0 / Step_0 / Draw_0)
//   obj_title_menu     -> title menu        (Create_0 / Step_0 / Draw_0)
//   obj_settings_menu  -> settings menu     (Create_0 / Step_0 / Draw_0)
//   obj_menu_parent    -> shared menu state (Create_0)
// The node server (server.js) does what the original's lib64Plus extension did on Windows:
// clone the repository, run make, save the ini files, start the game.

import {
  Renderer, COLOR, BASE_WIDTH, BASE_HEIGHT, MIN_WIDTH, MIN_HEIGHT,
  lerp, clamp, sign, easeInCubic, easeOutCubic, easeOutSine, easeOutQuint, easeOutElastic, loadImage,
  easeOutQuart, easeOutBack,
  mergeColor, colorStateHex
} from "./render.js";
import { Ini } from "./shared/ini.js";
import {
  TYPE, LAUNCHER_VERSION, parseJsonConstants, filterForPlatform, categoryRanges,
  optionText, defaultState, readItem, writeItem, itemExistsInIni, isEnabled, stepItem,
  optionLimit, LIMIT, CONTROLLER_BUTTONS
} from "./shared/options.js";
import { KEYCODE_TO_DIK, dikName } from "./shared/dik.js";

const VERSION = LAUNCHER_VERSION;

// scr_wtimer.gml: true for one frame every `duration` frames. The menus use it to
// slow down the auto repeat while a direction is held down.
const wait = (duration, offset = 0) => (stepFrames + offset) % duration < 1;

// --- api ---------------------------------------------------------------------

const api = {
  async get(route) {
    const res = await fetch(route, { cache: "no-store" });
    if (!res.ok) throw new Error(`${route} -> ${res.status}`);
    return res.json();
  },
  async send(route, body, method = "POST") {
    const res = await fetch(route, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {})
    });
    return { ok: res.ok, status: res.status, data: await res.json().catch(() => ({})) };
  }
};

// --- input (scr_input.gml) ----------------------------------------------------

const ACTIONS = ["left", "right", "up", "down", "select", "select2", "back", "del", "any", "page_left", "page_right"];
const KEY_ACTIONS = {
  ArrowLeft: "left", KeyA: "left",
  ArrowRight: "right", KeyD: "right",
  ArrowUp: "up", KeyW: "up",
  ArrowDown: "down", KeyS: "down",
  Space: "select", Enter: "select2",
  Escape: "back", Backspace: "back",
  Delete: "del"
};

// some environments deliver the key without a code, so fall back to key names
const KEY_ACTIONS_BY_KEY = {
  ArrowLeft: "left", a: "left",
  ArrowRight: "right", d: "right",
  ArrowUp: "up", w: "up",
  ArrowDown: "down", s: "down",
  " ": "select", Spacebar: "select", Enter: "select2",
  Escape: "back", Backspace: "back",
  Delete: "del"
};

function actionFor(event) {
  return KEY_ACTIONS[event.code] || KEY_ACTIONS_BY_KEY[event.key] || null;
}

const typing = { text: "" };

const input = {
  pressed: {},
  held: {},
  long: {},
  typing: null,
  anyKey: false,

  reset() {
    for (const action of ACTIONS) { this.pressed[action] = false; this.long[action] = false; }
    this.anyKey = false;
  },

  check(action) { return !!this.pressed[action]; },
  checkLong(action) { return !!this.long[action]; },
  holdTime(action) { return this.held[action] || 0; },
  checkAny() { return this.anyKey; },

  down: {},
  lastDown: {},

  // A key press counts once: repeats and duplicate keydown events within 60ms are
  // ignored. A key that never gets its keyup (lost focus, odd environment) is
  // released automatically after a second.
  keyDown(action, repeat = false) {
    const now = performance.now();
    if (!repeat && this.lastDown[action] && now - this.lastDown[action] < 60) return;
    this.lastDown[action] = now;
    this.down[action] = now;
    this.pressed[action] = true;
    this.held[action] = 0;
    this.anyKey = true;
  },

  keyUp(action) {
    this.down[action] = 0;
    this.held[action] = 0;
  },

  releaseAll() {
    for (const action of ACTIONS) { this.down[action] = 0; this.held[action] = 0; }
  },

  tick() {
    // hold time only advances while the key is down, so long-presses need a real hold
    for (const action of ACTIONS) {
      if (!this.down[action]) { this.held[action] = 0; continue; }
      this.held[action] = (this.held[action] || 0) + 1;
      this.long[action] = this.held[action] > 20;
    }
  }
};

// --- audio (scr_audio.gml) ----------------------------------------------------

const SOUND_FILES = {
  select: "assets/sounds/snd_select.m4a",
  select1: "assets/sounds/snd_select1.m4a",
  select2: "assets/sounds/snd_select2.m4a",
  cancel: "assets/sounds/snd_cancel.m4a",
  page: "assets/sounds/snd_page.m4a",
  option: "assets/sounds/snd_option.m4a",
  denied: "assets/sounds/snd_denied.m4a",
  start: "assets/sounds/snd_start.m4a",
  move: "assets/sounds/snd_move.m4a",
  music: "assets/sounds/snd_music.m4a"
};

const audio = { clips: {}, music: null, unlocked: false };

function loadAudio() {
  for (const [name, file] of Object.entries(SOUND_FILES)) audio.clips[name] = new Audio(file);
  audio.music = audio.clips.music;
  audio.music.loop = true;
}

function sfxPlay(name) {
  const volume = app.launcher?.sfx_volume ?? 1;
  const clip = audio.clips[name];
  if (volume <= 0 || !clip) return;
  clip.pause();                      // audio_stop_sound(): only ever one instance
  clip.currentTime = 0;
  clip.volume = Math.min(1, volume) * 0.6;
  clip.play().catch(() => {});
}

function musicPlay(on) {
  if (!audio.music) return;
  const volume = app.launcher?.music_volume ?? 1;
  audio.music.volume = Math.min(1, volume);
  if (on && volume > 0 && audio.unlocked) audio.music.play().catch(() => {});
  else audio.music.pause();
}

// --- shared state -------------------------------------------------------------

const canvas = document.getElementById("screen");
const renderer = new Renderer(canvas);
const romInput = document.getElementById("rom-input");

const app = {
  ready: false,
  screen: "boot",          // rm_init | rm_menu
  data: null,
  launcher: { sfx_volume: 1, music_volume: 1, fullscreen: false, quick_launch: false, scaling_mode: 1 },
  categories: [],
  launcherCategory: null,
  ranges: { system: [0, 1], gameConfig: [], input: [] },
  presets: [],
  inputPresets: [],
  customTextures: true,
  saveTimer: null,
  saving: false
};

// obj_background
const background = {
  count: 11,          // array_length(backgrounds)
  no: 8,              // backgrounds_no, what change_background wraps around
  index: 0,
  last: 0,
  alpha: 1,
  change(newIndex) {
    this.last = this.index;
    this.index = newIndex < 0
      ? clamp(this.no - newIndex - 1, 0, this.count - 1)
      : newIndex % this.no;
    if (this.index !== this.last) this.alpha = 0;
  },
  messageText: "",
  messageTimer: 0,
  messagePosition: 0,
  messageMove: false,
  topTextDelay: 30,
  textTransition: 0,
  fade: 1,

  displayMessage(msg) {
    this.messageText = msg;
    this.messageTimer = 120;
    this.messageMove = true;
  },

  step() {
    if (this.alpha < 1) this.alpha += 0.125;
    if (this.messageTimer > 0) this.messageTimer--;
    if (this.fade > 0) this.fade -= 0.0625;
    if (this.messageMove) {
      if (this.messagePosition < 1) this.messagePosition += 0.0625;
      if (this.messageTimer <= 0) this.messageMove = false;
    } else if (this.messagePosition > 0) {
      this.messagePosition -= 0.015625;
    }
    if (this.topTextDelay > 0) this.topTextDelay--;
    else if (this.textTransition < 1) this.textTransition = Math.min(1, this.data === null ? 0 : this.textTransition + 0.025);
  }
};

// obj_init
const boot = {
  state: 0,
  progress: 0,
  slideOut: 0,
  externalEnabled: false,
  update: false,
  str: "",
  startFileChecks: null,
  pollTimer: null,
  guideOpened: false,

  create() {
    this.str = "- DISCLAIMER -\n\nThis is a non-profit fan project, and NOT an official Nintendo product. "
      + "If you like what you're seeing here, please show your support to Nintendo directly!\n\nPress any key to continue.";

    const state = app.data.state;
    // No native build is needed any more: the WebAssembly build is served from /game/
    // and needs no MSYS2, no ROM upload and no make. So the "Hello there! Before
    // starting, we first need to build the game" branch (obj_init/Step_0.gml state 1,
    // and the ROM picker in state 2) is never entered - the disclaimer slides straight
    // out into the menu, whatever check_file() reports.
    this.state = 0;
    this.skipBuild = true;
    if (state.updatePending) {
      this.update = true;
      this.str = "- A LAUNCHER UPDATE HAS BEEN DETECTED -\n\nThe launcher will now update the game files.\n\n"
        + "Press any key to update.\nPress <Delete> to skip.\n\n"
        + "PS: You can later do this manually by choosing \"Update\" from the main menu.";
    }
  },

  step() {
    if (this.slideOut) {
      if (this.progress > 0) this.progress -= 1 / 64;
      else if (app.screen === "boot") enterMenu();
      return;
    }

    if (this.progress < 1) this.progress += 0.03125;

    if (this.state === 0) {
      if (input.checkAny()) {
        this.externalEnabled = !input.check("del");
        // No build step in the browser port: acknowledge the disclaimer and slide out
        // into the menu rather than walking the MSYS2/ROM states.
        if (this.skipBuild) {
          this.slideOut = 1;
          return;
        }
        this.state++;
        if (checkFile(false)) {
          this.str = app.data.state.platform === "win32"
            ? "Hello there! Before starting, we first need to build the game. Don't worry, the process is extremely simple!\n\n"
              + "First, we need to download MSYS2. Press <SPACE> to head to the download page.\n\nOnce downloaded, run "
              + "the installer, and click \"Next\" until the installation is complete. If you want to change the installation "
              + "folder, keep in mind that installing it to any drive other than C might cause issues.\n\n"
              + (this.externalEnabled ? "Once you're done, press <ENTER> to continue." : "Press <ENTER> to continue.\n\n= Custom texture support has been disabled! =")
            : "Hello there! Before starting, we first need to build the game.\n\n"
              + "The process here involves a bit of terminal usage, so I hope you're comfortable with that.\n"
              + "It is not very hard though, all you need is git, make and a C compiler.\n\n"
              + "Press <ENTER> to continue.";
        }
      }
      return;
    }

    if (this.state === 1) {
      // The original opens the manual and quits on any key here (that is what the
      // non-Windows branch of obj_init/Step_0.gml does); a page can't quit, so the
      // guide opens in a new tab and the flow carries on.
      if (app.data.state.platform !== "win32" && input.checkAny() && !this.guideOpened) {
        this.guideOpened = true;
        window.open("https://github.com/MorsGames/sm64plus/wiki/Manual-Building-Guide", "_blank", "noopener");
      }
      if (input.check("select2") || input.check("select")) {
        if (app.data.state.romPresent) { this.state = 3; startBuilding(); }
        else {
          this.state = 2;
          this.str = "Next you will be asked to choose a US Super Mario 64 ROM.\n\n"
            + "The ROM should be in Z64 (Big Endian) format.\n\n"
            + "After that, the necessary files will get downloaded and the building process will start.\n\n"
            + "Press <ENTER> to choose the file.";
        }
      }
      return;
    }

    if (this.state === 2) {
      if (input.check("select2") || input.check("select")) romInput.click();
    }
  },

  draw() {
    renderer.smoothing = false;
    renderer.drawRect(0, 0, renderer.roomWidth, renderer.roomHeight, COLOR.black);
    const alpha = this.slideOut ? 1 : this.progress;
    drawBootText(alpha);
    if (this.slideOut) {
      renderer.drawRect(0, 0, renderer.roomWidth, renderer.roomHeight, COLOR.black,
        easeOutSine(1, 0, clamp(this.progress * 2 - 1, 0, 1)));
    }
  }
};

function drawBootText(alpha) {
  const roomWidth = renderer.roomWidth;
  const roomHeight = renderer.roomHeight;
  const scale = 2;
  const lines = wrapLines(boot.str, roomWidth / 2 - 32, 2);
  const lineHeight = 12 * scale;
  const totalHeight = lines.length * lineHeight;
  let y = Math.round(roomHeight / 2 - 1 - totalHeight / 2);

  for (const line of lines) {
    const x = Math.round(roomWidth / 2 - (line.length * 5 * scale) / 2);
    renderer.drawTextLine(x + scale, y + scale, line, scale, COLOR.black, alpha);
    renderer.drawTextLine(x, y, line, scale, COLOR.white, alpha);
    y += lineHeight;
  }
}

function wrapLines(text, widthUnits, scale = 1) {
  const out = [];
  for (const paragraph of String(text).split("\n")) {
    if (!paragraph) { out.push(""); continue; }
    let line = "";
    for (const word of paragraph.split(" ")) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && candidate.length * 5 * scale > widthUnits * scale) { out.push(line); line = word; }
      else line = candidate;
    }
    out.push(line);
  }
  return out;
}

function checkFile() {
  return app.data.state.gameBuilt ? 0 : 1;
}

async function startBuilding() {
  if (app.bootTimer) clearInterval(app.bootTimer);
  const { data } = await api.send("/api/build", { action: "build", customTextures: boot.externalEnabled });
  if (data.error || data.reason) {
    boot.str = "It seems like an error has occured. Try restarting the launcher and building again.";
    return;
  }
  boot.str = "Building is in progress. Please wait...\n\nIf the other window gets closed, and you get stuck here, "
    + "try restarting the launcher.\n\nPress <ENTER> to see the build log.";
  app.screen = "build";
  pollBuild();
}

async function pollBuild() {
  const log = await api.get("/api/build/log").catch(() => null);
  if (!log) return;
  app.buildLog = log.logs || [];
  if (log.running) {
    setTimeout(pollBuild, 700);
  } else {
    const state = await api.get("/api/state").catch(() => null);
    if (state) app.data.state = state;
    if (log.exitCode === 0) {
      app.data.state.gameBuilt = true;
      boot.slideOut = 1;
      boot.progress = 1;
    } else {
      boot.str = "The build failed. Press <ENTER> to read the log, <ESCAPE> to try again.";
    }
    app.screen = "boot";
  }
}

// obj_title_menu
const titleMenu = {
  scale: -0.25,
  pressAnyKeyMode: true,
  transitionCounter: 0,
  transitionSpeed: 0.02,
  options: ["Start Game", "Settings", "Update", "Quit"],
  options2: ["Update Launcher", "Pull & Rebuild", "Pull, Clean & Rebuild", "Back"],
  options3: ["Yes", "No"],
  options4: ["System Settings", "Game Config", "Input Mapping", "Back"],
  page: 0,
  boxSize: 96,
  boxHeight: 96,
  yOffset: 0,
  move: 1,
  selectY: 0,
  selectedOption: 0,
  scrollOffset: [0, 0, 0, 0],
  scrollOffsetView: [0, 0, 0, 0],

  create() {
    this.scale = -0.25;
    this.pressAnyKeyMode = true;
    this.transitionCounter = 0;
    this.yOffset = renderer.roomHeight;
    this.move = 1;
    this.page = 0;
    this.selectY = 0;
    this.selectedOption = 0;
    this.scrollOffset = [0, 0, 0, 0];
    this.scrollOffsetView = [0, 0, 0, 0];
    musicPlay(true);
    this.startBopping();
  },

  // obj_title_menu/Create_0.gml: the logo bops to the music at 130 BPM.
  startBopping() {
    if (this.bopTimer) { clearTimeout(this.bopTimer); clearInterval(this.bopInterval); }
    this.bopTimer = setTimeout(() => {
      this.bopping = true;
      this.bopInterval = setInterval(() => {
        if (app.launcher.music_volume > 0) this.scale = 0.5;
      }, 60000 / 130);
    }, 1500);
  },

  optionsForPage() {
    return [this.options, this.options2, this.options3, this.options4][this.page];
  },

  // obj_title_menu/Step_0.gml, in the same order
  step() {
    if (this.pressAnyKeyMode) {
      if (this.transitionCounter > 0) this.transitionCounter = Math.max(0, this.transitionCounter - this.transitionSpeed);
    } else if (this.transitionCounter < 1) {
      this.transitionCounter = Math.min(1, this.transitionCounter + this.transitionSpeed);
    }

    if (this.pressAnyKeyMode) {
      if (this.transitionCounter === 0) {
        if (input.checkAny()) this.pressAnyKeyMode = false;
        if (input.check("back")) {
          this.pressAnyKeyMode = false;
          this.page = 2;
          this.selectedOption = 1;
          this.selectY = 40;
          sfxPlay("cancel");
        }
      }
    } else if (this.transitionCounter >= 1 && this.move === 0) {
      if (input.check("back")) {
        if (this.page === 0) { this.pressAnyKeyMode = true; sfxPlay("cancel"); }
        else {
          const previous = this.page;
          this.page = 0;
          this.selectedOption = previous === 3 ? 1 : previous === 2 ? 3 : 2;
          sfxPlay("cancel");
        }
      }
    }

    if (this.move === 2) {
      this.yOffset = lerp(this.yOffset, -renderer.roomHeight, 0.25);
      if (Math.round(this.yOffset) <= -renderer.roomHeight) activateTitleMenu();
      return;
    }
    if (this.move === 1) {
      this.yOffset = lerp(this.yOffset, 0, 0.25);
      if (Math.round(this.yOffset) <= 0) { this.yOffset = 0; this.move = 0; }
      return;
    }

    if (input.check("select") || input.check("select2")) {
      let played = false;
      if (this.page === 0 && this.selectedOption === 1) { this.page = 3; this.selectedOption = 0; }
      else if (this.page === 0 && this.selectedOption === 2) { this.page = 1; this.selectedOption = 0; }
      else if (this.page === 0 && this.selectedOption === 3) { this.page = 2; this.selectedOption = 1; }
      else if (this.page === 1 && this.selectedOption === 3) { this.page = 0; this.selectedOption = 2; sfxPlay("cancel"); played = true; }
      else if (this.page === 2) {
        if (this.selectedOption === 0) quit();
        else { this.page = 0; this.selectedOption = 3; sfxPlay("cancel"); played = true; }
      } else if (this.page === 3) {
        if (this.selectedOption === 3) { this.page = 0; this.selectedOption = 1; sfxPlay("cancel"); played = true; }
        else { settingsSection = this.selectedOption; this.move = 2; }
      } else {
        this.move = 2;
      }
      if (!played) sfxPlay(this.selectedOption === 3 ? "cancel" : "select");
    }

    if (this.page === 1 && (this.selectedOption === 1 || this.selectedOption === 2) && input.check("del")) {
      setCustomTextures(!app.customTextures);
      background.displayMessage(`Custom textures: ${app.customTextures ? "enabled" : "disabled"}`);
    }

    if (input.checkLong("left") && input.checkLong("right") && input.checkLong("del")) {
      background.displayMessage("Cleared the copied gfx folder.");
    }

    if (this.scale < 1) this.scale += 0.015625;
    const targetSize = this.page === 1 ? 112 : this.page === 2 ? 144 : 96;
    this.boxSize = lerp(this.boxSize, targetSize, 0.25);
    this.boxHeight = lerp(this.boxHeight, this.page === 2 ? 77 : 96, 0.25);

    const totalOptions = this.page === 2 ? 2 : 4;
    changeSelectedOption(this, totalOptions, totalOptions, true, this.page, this.page === 2 ? -1 : 0);
  },

  draw() {
    const roomWidth = renderer.roomWidth;
    const roomHeight = renderer.roomHeight;
    renderer.translate(0, this.yOffset);
    const progress = this.pressAnyKeyMode
      ? easeInCubic(0, 1, this.transitionCounter)
      : easeOutCubic(0, 1, this.transitionCounter);

    renderer.smoothing = true;
    const logoScale = easeOutElastic(0, 1, Math.max(0, this.scale));
    const screenScale = (roomHeight - 120) / (BASE_HEIGHT - 120);
    const additionalScale = lerp(0.5625, 0.5, progress);
    const actualScale = Math.min(screenScale, roomWidth / 400) * logoScale * additionalScale;
    const logoCenterY = roomHeight / 2;
    const logoNormalY = 120 * screenScale;
    const logoY = lerp(logoCenterY, logoNormalY, progress);
    renderer.drawSprite("spr_logo", roomWidth / 2, logoY, actualScale, actualScale, "#FFFFFF", 1);
    renderer.smoothing = false;

    if (progress <= 0) { renderer.untranslate(); return; }

    const menuY = roomHeight - 120;
    const boxLeft = roomWidth / 2 - this.boxSize;
    const boxRight = roomWidth / 2 + this.boxSize;
    const menuOffset = (1 - progress) * 200;

    renderer.drawRect(boxLeft, menuY + menuOffset, boxRight - 1, menuY + this.boxHeight + menuOffset,
      COLOR.black, 0.625);

    renderer.drawRect(boxLeft + 8, menuY + 10 + this.selectY + menuOffset, boxRight - 9,
      menuY + 26 + this.selectY + menuOffset, COLOR.yellow, Math.sin(renderer.frames / 16) / 24 + 0.625);

    const options = this.optionsForPage();
    if (this.page === 2) {
      renderer.drawOption(roomWidth / 2, menuY + 8 + menuOffset, "Are you sure you want to quit?", 1.5);
      for (let i = 0; i < options.length; i++) {
        renderer.drawOption(roomWidth / 2, menuY + 8 + (i + 1) * 20 + menuOffset, options[i], 1.5);
      }
    } else {
      for (let i = 0; i < options.length; i++) {
        renderer.drawOption(roomWidth / 2, menuY + 8 + i * 20 + menuOffset, options[i], 1.5);
      }
    }
    renderer.untranslate();
  }
};

async function activateTitleMenu() {
  const page = titleMenu.page;
  const selected = titleMenu.selectedOption;

  switch (page) {
    case 0:
      if (selected === 0) await runGame();
      break;
    case 1:
      if (selected === 0) await checkLauncherUpdates();
      else if (selected === 1) await startAction("rebuild");
      else if (selected === 2) await startAction("rebuild_clean");
      break;
    case 3:
      openSettings(selected);
      return;
    default:
      break;
  }

  // slide back in, like the original does after every action
  titleMenu.move = 1;
  titleMenu.yOffset = renderer.roomHeight;
}

async function startAction(action) {
  const { data } = await api.send("/api/build", { action, customTextures: app.customTextures });
  if (data.reason || data.error) {
    background.displayMessage(data.reason || data.error);
    titleMenu.move = 1;
    titleMenu.yOffset = renderer.roomHeight;
    return;
  }
  boot.externalEnabled = app.customTextures;
  boot.str = action === "build" ? "Building is in progress. Please wait..." : "Updating is in progress. Please wait...";
  boot.slideOut = 0;
  boot.progress = 0;
  app.screen = "build";
  pollBuild();
}

// obj_start_game, all three of its events. The original wipes the screen to white over
// ease_out_sine(0, 1, progress), slides "Launching game..." up from the bottom edge on
// ease_out_quart(room_height, 0, progress), then on the way out plays the same text back
// down on ease_out_back(-room_height, 0, progress) while progress decays.
const startGame = {
  progress: 0,
  slideOut: 0,
  running: 0,
  target: null,
  // The WebAssembly build has to fetch 8.9 MB of wasm plus 3.7 MB of asset data
  // after the page hands over, so the screen is held for a few seconds instead of
  // flashing past and leaving the browser on a black canvas. Not part of the
  // original: it spawned a process that was already loaded.
  holdFrames: 300,
  // obj_start_game/Create_0.gml: timer(go_windowed, 45); timer(launch_game, 60).
  // GameMaker's timer() counts FRAMES, so the executable is started on frame 60 -
  // long after progress has reached 1 on frame 32 and the white wipe is opaque.
  // Firing this on a 60ms setTimeout instead ran it on frame ~4, with progress still
  // near 0, which left the wipe at ease_out_sine(0, 1, 0.1) and the room showing through.
  launchFrame: 60,

  create() {
    this.progress = 0;
    this.slideOut = 0;
    this.running = 0;
    this.target = null;
    this.hold = 0;
    this.frame = 0;
    app.screen = "start";
    musicPlay(false);
    sfxPlay("start");
  },

  async finish() {
    if (this.running) return;
    this.running = 1;
    try {
      // The settings have to reach the server before it snapshots them for the
      // handoff, otherwise the game boots with whatever was last written.
      // scheduleSave() is debounced, so the pending timer is cancelled and the
      // write is awaited directly.
      clearTimeout(app.saveTimer);
      await saveSettings();
      const { data } = await api.send("/api/launch", {});
      if (data && data.launched === false) {
        this.running = 0;
        background.displayMessage(data.reason || "Couldn't start the game.");
        this.slideOut = 1;
        return;
      }
      // The WebAssembly build is served from this same origin, so the launcher stays
      // on its own URL and the game is loaded into a frame laid over the canvas. That
      // keeps /?menu=1 in the address bar instead of navigating to /game/, and a
      // refresh brings the launcher straight back.
      if (data && data.mode === "wasm" && data.url) {
        this.target = data.url;
      }
      // Either way the screen now plays out (slide_out in obj_start_game/Step_0.gml)
      // and the navigation happens during it, a few frames in.
      this.slideOut = 1;
    } catch {
      this.running = 0;
      background.displayMessage("Couldn't start the game.");
      this.slideOut = 1;
    }
  },

  step() {
    // obj_start_game/Step_0.gml, in order: progress counts up (or back down once
    // slide_out is set), and the game is launched from its own 60 frame timer.
    if (this.slideOut) {
      // Hold the wipe and the text for the full delay so the load is not a flash of
      // white into a blank canvas, then bring the game up in place. The URL never
      // changes: this document stays the launcher.
      if (this.target) {
        if (this.hold < this.holdFrames) { this.hold++; return; }
        mountGameFrame(this.target);
        return;
      }
      if (this.progress > 0) this.progress -= 0.03125;
      else if (app.screen === "start") app.screen = "menu";
      return;
    }
    if (this.progress < 1) this.progress += 0.03125;
    this.frame++;
    if (this.frame >= this.launchFrame) this.finish();
  },

  draw() {
    const roomHeight = renderer.roomHeight;
    // obj_start_game/Draw_0.gml, in order: the white wipe at
    // ease_out_sine(0, 1, progress), then the inverted text. progress stays at 1
    // for the whole hold, so the wipe is opaque without needing a special case.
    renderer.drawRect(0, 0, renderer.roomWidth, roomHeight, COLOR.white,
      easeOutSine(0, 1, this.progress));
    const offset = this.slideOut
      ? easeOutBack(-roomHeight, 0, this.progress)
      : easeOutQuart(roomHeight, 0, this.progress);
    renderer.drawTextCustomInverted(renderer.roomWidth / 2, roomHeight / 2 + offset,
      "Launching game...", 2);
  }
};

async function runGame() {
  startGame.create();
}

// The game runs in a frame on top of the launcher canvas, so the address bar keeps
// showing the launcher's own URL. The frame is only created once the launch screen
// has played out, and the launcher's main loop stops while it is up so the two do
// not both fight for the keyboard.
function mountGameFrame(url) {
  if (app.gameFrame) return;
  app.gameFrame = document.createElement("iframe");
  app.gameFrame.src = url;
  app.gameFrame.title = "SM64Plus";
  app.gameFrame.allow = "autoplay; fullscreen; gamepad";
  app.gameFrame.setAttribute("tabindex", "0");
  Object.assign(app.gameFrame.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    border: "0",
    background: "#000",
    zIndex: "10"
  });
  document.body.appendChild(app.gameFrame);
  app.runningGame = true;
  // The game owns the keyboard from here on; the launcher's step/draw loops stand down.
  app.gameFrame.focus();
}

async function checkLauncherUpdates() {
  background.displayMessage("Checking GitHub for launcher updates...");
  try {
    const update = await api.get("/api/launcher-updates");
    background.displayMessage(`Launcher ${update.sha} (${new Date(update.date).toDateString()}): ${update.message}`);
  } catch {
    background.displayMessage("Couldn't reach GitHub.");
  }
}

function quit() {
  background.displayMessage("The launcher server is still running. Close this tab or press Ctrl+C in the terminal to stop it.");
  titleMenu.pressAnyKeyMode = false;
}

function changeSelectedOption(menu, totalOptions, itemsPerPage, canBeChanged, pageId, indicatorOffset = 0) {
  const vertical = canBeChanged ? (input.check("down") ? 1 : 0) - (input.check("up") ? 1 : 0) : 0;
  // holding a direction repeats it every three frames, like wait(3) in the original
  const longVertical = (wait(3) && canBeChanged)
    ? (input.checkLong("down") ? 1 : 0) - (input.checkLong("up") ? 1 : 0) : 0;
  const movement = vertical + longVertical;
  const original = menu.selectedOption;
  if (totalOptions <= 0) return 0;
  menu.selectedOption = ((menu.selectedOption + movement) % totalOptions + totalOptions) % totalOptions;

  if (movement !== 0 && menu.selectedOption !== original) sfxPlay("move");

  const pageIndex = pageId + 2;
  let target = menu.scrollOffset[pageIndex] ?? 0;
  const maxTarget = Math.max(0, totalOptions - itemsPerPage - 2);
  const cap = Math.max(0, itemsPerPage - 1);
  const topMargin = Math.min(2, cap);
  const bottomMargin = Math.min(0, cap);
  const bottomTrigger = target + (itemsPerPage - 1) - bottomMargin;
  const topTrigger = target + topMargin;
  if (menu.selectedOption > bottomTrigger && target < maxTarget) target += 1;
  if (menu.selectedOption < topTrigger && target > 0) target -= 1;
  target = clamp(target, 0, maxTarget);
  menu.scrollOffset[pageIndex] = target;

  let view = menu.scrollOffsetView[pageIndex] ?? 0;
  view += clamp(lerp(view, target, 0.375) - view, -2, 2);
  menu.scrollOffsetView[pageIndex] = view;

  menu.selectY += clamp(lerp(menu.selectY, (menu.selectedOption - view - indicatorOffset) * 20, 0.375) - menu.selectY, -32, 32);
  return movement;
}

// obj_settings_menu
let settingsSection = 0;
const settings = {
  sectionCategoryIndices: [],
  tabCount: 0,
  selectedTab: 0,
  selectedOption: 0,
  selected: false,
  oldState: null,
  scrollOffset: [],
  scrollOffsetView: [],
  selectY: 0,
  xGo: 0,
  arrowFrames: 0,
  titleHShake: 0,
  shake: 0,
  hShake: 0,
  selectedHighlightColor: "#FFEF00",
  selectedHighlightAlpha: 1,
  yOffset: 0,
  move: 1,
  keyboardString: "",
  paletteEditing: null,

  open(section) {
    settingsSection = section;
    this.sectionCategoryIndices = section === 0 ? [0, 1, -3]
      : section === 1 ? [-1, ...app.ranges.gameConfig]
        : [-2, ...app.ranges.input];
    this.tabCount = this.sectionCategoryIndices.length;
    this.selectedTab = 0;
    this.selectedOption = 0;
    this.selected = false;
    this.scrollOffset = new Array(this.tabCount).fill(0);
    this.scrollOffsetView = new Array(this.tabCount).fill(0);
    this.xGo = 0;
    this.yOffset = renderer.roomHeight;
    this.move = 1;
    this.selectY = 0;
    // obj_background.change_background(selected_category), so the background follows
    // the category id and not the tab number: -1 and -2 land on the void, -3 on the
    // inside castle, 0..7 on the matching skybox.
    background.change(this.sectionCategoryIndices[this.selectedTab]);
    app.screen = "settings";
    musicPlay(true);
  },

  selectedCategory() {
    return this.sectionCategoryIndices[this.selectedTab];
  },

  items() {
    const id = this.selectedCategory();
    if (id === -3) return app.launcherCategory?.items || [];
    if (id < 0) return null;
    return app.categories[id]?.items || [];
  },

  optionsPerPage() {
    return Math.floor((renderer.roomHeight - 180) / 20);
  },

  step() {
    if (this.move === 2) {
      this.yOffset = lerp(this.yOffset, -renderer.roomHeight, 0.25);
      if (Math.round(this.yOffset) <= -renderer.roomHeight) {
        app.screen = "menu";
        titleMenu.page = 3;
        titleMenu.selectedOption = settingsSection;
        titleMenu.selectY = settingsSection * 20;
        titleMenu.pressAnyKeyMode = false;
        titleMenu.transitionCounter = 1;
        titleMenu.move = 0;
        titleMenu.yOffset = 0;
        musicPlay(true);
      }
      return;
    }
    if (this.move === 1) {
      this.yOffset = lerp(this.yOffset, 0, 0.25);
      if (Math.round(this.yOffset) <= 0) { this.yOffset = 0; this.move = 0; }
      return;
    }

    this.xGo = lerp(this.xGo, this.selectedTab, 0.375);
    const id = this.selectedCategory();
    if (id === -1) this.presetsPage("game");
    else if (id === -2) this.presetsPage("input");
    else this.settingsPage(id === -3);
    this.goBack();

    for (let i = 0; i < this.tabCount; i++) {
      if (Math.abs(i - this.xGo) >= 1) { this.scrollOffset[i] = 0; this.scrollOffsetView[i] = 0; }
    }
    if (this.titleHShake > 0) this.titleHShake -= 0.0625;
    else this.titleHShake = 0;
  },

  goBack() {
    if (!input.check("back")) return;
    if (this.selected) {
      this.revertChanges();
      this.selected = false;
      sfxPlay("cancel");
    } else {
      this.move = 2;
      sfxPlay("cancel");
    }
  },

  changeCategory() {
    const horizontal = (input.check("right") ? 1 : 0) - (input.check("left") ? 1 : 0)
      + (input.check("page_right") ? 1 : 0) - (input.check("page_left") ? 1 : 0);
    const longHorizontal = (input.checkLong("right") ? 1 : 0) - (input.checkLong("left") ? 1 : 0);
    const repeat = wait(8) ? longHorizontal : 0;
    const original = this.selectedTab;
    this.selectedTab = clamp(this.selectedTab + horizontal + repeat, 0, this.tabCount - 1);
    if (this.selectedTab !== original) {
      this.scrollOffsetView[this.selectedTab] = this.scrollOffset[this.selectedTab];
      this.selectedOption = 0;
      this.shake = 0;
      background.change(this.sectionCategoryIndices[this.selectedTab]);
      sfxPlay("page");
    } else if (repeat !== 0 || horizontal !== 0) {
      sfxPlay("denied");
      this.titleHShake = 1;
    }
    this.arrowFrames++;
  },

  settingsPage(launcherSettings) {
    const items = this.items();
    const total = items.length;
    if (total === 0) { this.changeCategory(); return; }
    const option = items[Math.min(this.selectedOption, total - 1)];

    if (input.check("select") || input.check("select2")) {
      if (option.type === TYPE.BOOL) {
        option.state = !option.state;
        sfxPlay(option.state ? "select" : "cancel");
        this.shake = 1;
        scheduleSave();
      } else if (option.type === TYPE.CONTROLLER_BUTTON) {
        this.selected = !this.selected;
        if (this.selected) this.oldState = option.state;
        sfxPlay(this.selected ? "select" : "cancel");
        this.shake = 1;
      } else {
        this.selected = !this.selected;
        if (this.selected) this.oldState = option.state;
        sfxPlay(this.selected ? "select1" : "select2");
        this.keyboardString = "";
      }
    }

    if (this.selected) {
      const horizontal = (input.check("right") ? 1 : 0) - (input.check("left") ? 1 : 0);
      const longHorizontal = (input.checkLong("right") ? 1 : 0) - (input.checkLong("left") ? 1 : 0);
      const oldState = option.state;
      changeOptionState(option, horizontal, longHorizontal, launcherSettings);
      if (horizontal !== 0 || (longHorizontal !== 0 && wait(4))) {
        sfxPlay(option.state === oldState ? "denied" : "option");
      }
    } else {
      changeSelectedOption(this, total, this.optionsPerPage() - 2, Math.round(this.xGo) === this.selectedTab, this.selectedTab - 2);
      this.changeCategory();
    }
  },

  presetsPage(kind) {
    const list = kind === "input" ? app.inputPresets : app.presets;
    const total = list.length + 1;

    if (this.selected) {
      if (input.check("select2")) {
        if (!this.keyboardString) {
          this.keyboardString = kind === "input"
            ? `Input Preset${String(total).padStart(2, "0")}`
            : `Preset${String(total).padStart(2, "0")}`;
        }
        savePreset(kind, this.keyboardString);
        this.selected = false;
        this.selectedOption = list.length;
        this.shake = 1;
      }
      this.keyboardString += typing.text;
      typing.text = "";
      return;
    }

    if (input.check("select") || input.check("select2")) {
      if (this.selectedOption === total - 1) {
        this.selected = true;
        this.keyboardString = "";
      } else {
        loadPreset(kind, list[this.selectedOption]);
      }
    }
    // Only presets_page (the game PRESETS tab) has a hold-select action, and it
    // widens the load to the system categories as well:
    //   if (input_check_hold_time(input.select) == 120) { ... }
    // input_presets_page has no such branch - an input preset only ever covers the
    // input categories. Hold times are in frames (scr_input.gml:188).
    if (kind === "game" && input.holdTime("select") === 120 && this.selectedOption < list.length) {
      loadPreset(kind, list[this.selectedOption], true);
    }
    if (input.holdTime("del") === 60 && this.selectedOption < list.length) {
      deletePreset(kind, list[this.selectedOption]);
    }
    changeSelectedOption(this, total, this.optionsPerPage() - 2, Math.round(this.xGo) === this.selectedTab, this.selectedTab - 2);
    this.changeCategory();
  },

  revertChanges() {
    const id = this.selectedCategory();
    const category = id === -3 ? app.launcherCategory : app.categories[id];
    if (!category?.items) return;
    const option = category.items[Math.min(this.selectedOption, category.items.length - 1)];
    if (!option) return;
    option.state = this.oldState;
    scheduleSave();
  },

  draw() {
    const roomWidth = renderer.roomWidth;
    const roomHeight = renderer.roomHeight;
    const boxSpacing = clamp(112 - 640 + roomWidth, 8, 112);
    const optionsPerPage = this.optionsPerPage();

    renderer.translate(0, this.yOffset);

    // obj_settings_menu/Draw_0.gml draws both boxes before anything else, so the
    // text sits on top of them rather than under a 62.5% black sheet.
    renderer.drawRect(boxSpacing, 64, roomWidth - boxSpacing - 1, roomHeight - 92, COLOR.black, 0.625);
    renderer.drawRect(8, roomHeight - 83, roomWidth - 8 - 1, roomHeight - 8 - 1, COLOR.black, 0.625);

    for (let tabIndex = 0; tabIndex < this.tabCount; tabIndex++) {
      const id = this.sectionCategoryIndices[tabIndex];
      const offset = tabIndex - this.xGo;
      const xOffset = offset * roomWidth;
      if (Math.round(xOffset + roomWidth / 2) < roomWidth && Math.round(xOffset + roomWidth / 2) > -roomWidth) {
        const alpha = 1 - Math.abs(xOffset) / roomWidth;
        const titleX = xOffset + roomWidth / 2 + (this.titleHShake > 0 ? Math.sin(renderer.frames) * this.titleHShake : 0);
        let totalOptions;
        const title = id === -1 ? "PRESETS" : id === -2 ? "INPUT PRESETS"
          : (id === -3 ? app.launcherCategory?.title : app.categories[id]?.title) || "";
        if (id === -1) totalOptions = app.presets.length + 1;
        else if (id === -2) totalOptions = app.inputPresets.length + 1;
        else totalOptions = this.items()?.length || 0;

        renderer.drawLetters(titleX, 30, title, 1.5);

        if (tabIndex !== 0) {
          renderer.drawOption(titleX - 160 - Math.abs(Math.sin(this.arrowFrames / 32)) * 8, 24, "<", 1.5);
        }
        if (tabIndex !== this.tabCount - 1) {
          renderer.drawOption(titleX + 160 + Math.abs(Math.sin(this.arrowFrames / 32)) * 8, 24, ">", 1.5);
        }

        if (totalOptions > 0) {
          const selectedId = this.selectedCategory();
          const category = selectedId === -3 ? app.launcherCategory : app.categories[selectedId];
          const n = category?.items?.length || 0;
          const selectedItem = category?.items?.[Math.min(this.selectedOption, n - 1)];
          // A colour option paints the highlight in its own colour, at full strength
          // unless it is being edited; everything else gets the pulsing yellow.
          const isColorOption = !!selectedItem && selectedItem.type === TYPE.COLOR;
          const targetColor = isColorOption ? colorStateHex(selectedItem.state) : COLOR.yellow;
          this.selectedHighlightColor = mergeColor(this.selectedHighlightColor, targetColor, 0.25);
          const targetAlpha = isColorOption
            ? (this.selected ? 0.5 : 1)
            : (this.selected ? 1 / 3 : Math.sin(renderer.frames / 16) / 16 + 0.5625);
          this.selectedHighlightAlpha = lerp(this.selectedHighlightAlpha, targetAlpha, 0.5);
          renderer.drawRect(boxSpacing + 8, clamp(74 + this.selectY, 72, roomHeight - 100),
            roomWidth - boxSpacing - 9, clamp(90 + this.selectY, 72, roomHeight - 100),
            this.selectedHighlightColor, this.selectedHighlightAlpha);

          const pageIdx = tabIndex;
          const view = this.scrollOffsetView[pageIdx] ?? 0;
          const listTop = 72 - 20;
          const listBottom = 72 + optionsPerPage * 20;
          const fadeBand = 20;

          for (let i = Math.floor(view); i < Math.min(totalOptions, Math.ceil(view) + optionsPerPage); i++) {
            const hovered = i === this.selectedOption;
            const shakeOffset = hovered ? Math.sin(renderer.frames) * (this.hShake || 0) : 0;
            const shakeY = hovered ? Math.sin(renderer.frames) * (this.shake || 0) : 0;
            // Deliberate deviation from Draw_0.gml: the option rows there are drawn at a
            // bare room_width/2 with no _x_offset, while the title gets
            // _x_offset+room_width/2. While x_go lerps between two tabs both are inside
            // the +/-room_width window, so the two lists land on top of each other.
            // Offsetting by xOffset makes the rows slide with their tab, like the title.
            const xPos = roomWidth / 2 + xOffset + shakeOffset;
            const yPos = 72 + (i - view) * 20 + shakeY;
            const absY = 72 + (i - view) * 20;
            const topA = clamp((absY - listTop) / fadeBand, 0, 1);
            const botA = clamp((listBottom - absY) / fadeBand, 0, 1);
            const edgeAlpha = Math.min(topA, botA) * alpha;

            let text;
            let enabled = true;
            if (id === -1 || id === -2) {
              const list = id === -1 ? app.presets : app.inputPresets;
              if (i === totalOptions - 1) {
                text = this.selected ? this.keyboardString + ((renderer.frames / 32) % 2 ? "_" : " ")
                  : "✔[Add New Preset] ";
              } else {
                const preset = list[i];
                text = preset.internal ? preset.name : "❓" + preset.name + " ";
              }
            } else {
              const option = category.items[i];
              text = optionText(option);
              if (this.selected && hovered && option.type !== TYPE.COLOR && option.type !== TYPE.CONTROLLER_BUTTON) {
                text = editText(option, text);
              }
              enabled = isEnabled(category.items, i);
            }
            renderer.drawOption(xPos, yPos, text, 1.5, enabled, edgeAlpha);
          }

          if (totalOptions - Math.round(view) > optionsPerPage) {
            renderer.drawOption(roomWidth / 2 + xOffset,
              72 + optionsPerPage * 20 - 4 + Math.sin(this.arrowFrames / 16), "\u007F", 1.5);
          }

          // Description
          let description = "";
          if (id === -1 || id === -2) {
            const list = id === -1 ? app.presets : app.inputPresets;
            if (this.selectedOption < list.length) description = list[this.selectedOption].description || "";
            if (!description) {
              description = id === -1 ? "Here you can save or load your settings as presets."
                : "Here you can save or load your input mappings as presets.";
            }
          } else if (category) {
            const option = category.items[Math.min(this.selectedOption, totalOptions - 1)];
            description = option?.description || "";
          }
          const scale = wrapLines(description, roomWidth / 1.5 - 32).length * 12 > 36 ? 1 : 1.5;
          // Same deviation as the rows above: the description is drawn at a bare
          // room_width/2 in the original, so two tabs mid-slide stack their text.
          renderer.drawTextCustom(roomWidth / 2 + xOffset,
            roomHeight - (scale === 1 ? 71 : 75), description, scale, "center");
        }
      }
    }

    renderer.untranslate();
  }
};

function editText(option, text) {
  const limit = optionLimit(option);
  switch (limit) {
    case LIMIT.BOTH: return "⬛<⬜" + text + "⬛> ";
    case LIMIT.LEFT: return "⬛<⬜" + text + "   ";
    case LIMIT.RIGHT: return "   " + text + "⬛> ";
    default: return text;
  }
}

function changeOptionState(option, horizontal, longHorizontal) {
  // wait() gates the auto repeat: some options repeat every four frames, the numeric
  // ones use the raw long movement instead.
  const repeat = wait(4) ? longHorizontal : 0;
  switch (option.type) {
    case TYPE.UINT:
      option.state = Math.max(0, option.state + horizontal + longHorizontal * 2);
      break;
    case TYPE.FLOAT:
      option.state += (horizontal + longHorizontal * 2) / 10;
      break;
    case TYPE.KEY:
      option.state = clamp(option.state + horizontal + repeat, 1, 336);
      break;
    case TYPE.MULTIPLIER:
      option.state = Math.max(0.1, option.state + (horizontal + longHorizontal * 2) / 10);
      break;
    case TYPE.PERCENTAGE:
      option.state = clamp(option.state + (horizontal + (wait(2) ? longHorizontal : 0)) / 20, 0, 1);
      break;
    case TYPE.TEXTURE_FILTERING:
      option.state = clamp(option.state + horizontal + repeat, -1, 1);
      break;
    case TYPE.DRAW_DISTANCE:
      option.state = Math.max(0, option.state + (horizontal + repeat * 2) / 2);
      break;
    case TYPE.INTERNAL_RESOLUTION:
      option.state = Math.max(0, option.state + (horizontal + longHorizontal * 2) / 2);
      break;
    case TYPE.ANTIALIASING: {
      const steps = [0, 2, 4, 8];
      option.state = steps[Math.max(0, steps.indexOf(option.state) + horizontal + repeat)] ?? 0;
      break;
    }
    case TYPE.ANISOTROPIC: {
      const steps = [0, 2, 4, 8, 16];
      option.state = steps[Math.max(0, steps.indexOf(option.state) + horizontal + repeat)] ?? 0;
      break;
    }
    case TYPE.MOUSE_BUTTON:
      option.state = clamp(option.state + horizontal + repeat, 0, 10);
      break;
    case TYPE.FIXES:
    case TYPE.ENCORE_MODE:
    case TYPE.BLJ_EVERYWHERE:
    case TYPE.GREEN_DEMON_MODE:
    case TYPE.STAR_MESSAGE:
      option.state = clamp(option.state + horizontal + repeat, 0, 3);
      break;
    case TYPE.CAMERA_MODE:
    case TYPE.NOISE_TYPE:
    case TYPE.HUD_LAYOUT:
    case TYPE.LIVES_MODE:
    case TYPE.MOON_JUMP:
    case TYPE.LOD:
    case TYPE.ASPECT_RATIO:
      option.state = clamp(option.state + horizontal + repeat, 0, 2);
      break;
    case TYPE.MONITOR:
      option.state = clamp(option.state + horizontal + repeat, 1, 10);
      break;
    case TYPE.FRAME_RATE:
      option.state = clamp(option.state + horizontal + repeat, 0, 1);
      break;
    case TYPE.PALETTE:
      option.state = clamp(option.state + horizontal + repeat, 0, 12);
      break;
    case TYPE.WINDOW_SIZE:
      option.state = Math.max(1, option.state + horizontal + longHorizontal * 3);
      break;
    case TYPE.LAUNCHER_WIDTH:
      option.state = Math.max(MIN_WIDTH, option.state + horizontal + longHorizontal * 3);
      break;
    case TYPE.LAUNCHER_HEIGHT:
      option.state = Math.max(MIN_HEIGHT, option.state + horizontal + longHorizontal * 3);
      break;
    case TYPE.DISPLAY_MODE:
      option.state = clamp(option.state + horizontal, 0, 0);
      break;
    default:
      option.state = stepItem(option, horizontal + longHorizontal, false);
      break;
  }
  if (option.internal_name === "music_volume") app.launcher.music_volume = option.state;
  if (option.internal_name === "sound_volume") app.launcher.sfx_volume = option.state;
  if (option.internal_name === "fullscreen") setFullscreen(!!option.state);
  if (["scaling_mode", "window_width", "window_height", "fullscreen"].includes(option.internal_name)) applyLauncherWindow();
  scheduleSave();
}

// --- presets ------------------------------------------------------------------

async function savePreset(kind, name) {
  const indexes = kind === "input" ? app.ranges.input : app.ranges.gameConfig;
  const ini = buildIni(indexes);
  const { data } = await api.send("/api/presets", { kind, name, description: "", text: ini.toString() });
  if (data.error) return background.displayMessage(data.error);
  await refreshPresets(kind);
  background.displayMessage("Saved the preset!");
  sfxPlay("select");
}

async function loadPreset(kind, preset, all = false) {
  if (!preset) return;
  try {
    const { data } = await api.send("/api/preset-file", { kind, name: preset.file, internal: preset.internal });
    if (data.error) throw new Error(data.error);
    const ini = new Ini(data.text);

    // Which categories the preset applies to, per the original:
    //
    //   input_presets_page (Create_0.gml:263)
    //     load_settings_range(_option, category_count - 3, category_count - 1, true)
    //   presets_page (Create_0.gml:190/199)
    //     load_settings_range(_option, 2, category_count - 4, true)        tap
    //     load_settings_range(_option, 0, category_count - 4, false)       hold select
    //
    // So an input preset is read against the last three categories - the three input
    // mapping ones - and never against the game settings. Holding select on the game
    // PRESETS tab additionally covers the system categories (0 and 1).
    const indexes = kind === "input"
      ? app.ranges.input
      : all
        ? [...app.ranges.system, ...app.ranges.gameConfig]
        : app.ranges.gameConfig;

    for (const index of indexes) {
      const category = app.categories[index];
      if (!category) continue;
      category.items.forEach((item) => {
        if (itemExistsInIni(item, category.title, ini)) readItem(item, category.title, ini);
      });
    }
    scheduleSave();
    background.displayMessage(kind === "input"
      ? "Loaded the input settings!"
      : all ? "Loaded all the settings!" : "Loaded the settings!");
    sfxPlay(kind === "input" ? "select" : all ? "start" : "select");
  } catch {
    background.displayMessage("Couldn't read that preset.");
  }
}

async function deletePreset(kind, preset) {
  if (!preset || preset.internal) return;
  const { data } = await api.send("/api/presets", { kind, name: preset.file }, "DELETE");
  if (data.error) return background.displayMessage(data.error);
  await refreshPresets(kind);
  background.displayMessage("Deleted the preset!");
  sfxPlay("cancel");
  settings.selectedOption = Math.max(0, settings.selectedOption - 1);
}

async function refreshPresets(kind) {
  const { presets } = await api.get(`/api/presets?kind=${kind}`);
  if (kind === "input") app.inputPresets = presets;
  else app.presets = presets;
}

// --- ini ----------------------------------------------------------------------

function buildIni(indexes, baseText = "") {
  const ini = new Ini(baseText);
  for (const index of indexes) {
    const category = app.categories[index];
    if (!category) continue;
    category.items.forEach((item) => writeItem(item, category.title, ini));
  }
  return ini;
}

function allCategoryIndexes() {
  return [...app.ranges.system, ...app.ranges.gameConfig, ...app.ranges.input];
}

function loadItemStates() {
  const count = app.categories.length;
  const recommended = app.data.recommended ? new Ini(app.data.recommended) : null;
  const recommendedInput = app.data.recommendedInput ? new Ini(app.data.recommendedInput) : null;
  const settingsIni = new Ini(app.data.ini?.settings || "");
  const launcherIni = new Ini(app.data.ini?.launcherSettings || "");

  app.categories.forEach((category) => category.items.forEach((item) => { item.state = defaultState(item); }));

  if (recommended) {
    for (let i = 0; i < count; i++) loadFromIni(app.categories[i], recommended);
  }
  if (recommendedInput) {
    for (let i = Math.max(0, count - 3); i < count; i++) loadFromIni(app.categories[i], recommendedInput);
  }
  for (let i = 0; i < count; i++) {
    const category = app.categories[i];
    category.items.forEach((item) => {
      if (itemExistsInIni(item, category.title, settingsIni)) readItem(item, category.title, settingsIni);
    });
  }

  const launcher = app.launcherCategory;
  if (launcher?.items) {
    launcher.items.forEach((item) => {
      item.state = defaultState(item);
      if (itemExistsInIni(item, launcher.title, launcherIni)) readItem(item, launcher.title, launcherIni);
    });
    for (const item of launcher.items) {
      if (item.internal_name === "music_volume") app.launcher.music_volume = item.state;
      if (item.internal_name === "sound_volume") app.launcher.sfx_volume = item.state;
      if (item.internal_name === "scaling_mode") app.launcher.scaling_mode = item.state;
      if (item.internal_name === "window_width") app.launcher.window_width = item.state;
      if (item.internal_name === "window_height") app.launcher.window_height = item.state;
      if (item.internal_name === "fullscreen") app.launcher.fullscreen = item.state;
      if (item.internal_name === "quick_launch") app.launcher.quick_launch = item.state;
    }
  }
  app.customTextures = app.data.state.customTextures ?? true;
}

function loadFromIni(category, ini) {
  if (!category?.items) return;
  category.items.forEach((item) => {
    if (itemExistsInIni(item, category.title, ini)) readItem(item, category.title, ini);
  });
}

function scheduleSave() {
  clearTimeout(app.saveTimer);
  app.saveTimer = setTimeout(saveSettings, 250);
}

async function saveSettings() {
  app.saving = true;
  const gameIni = buildIni(allCategoryIndexes(), app.data.ini?.settings || "");
  await api.send("/api/ini", { name: "settings", text: gameIni.toString() }, "PUT");
  if (app.launcherCategory?.items?.length) {
    const ini = new Ini(app.data.ini?.launcherSettings || "");
    app.launcherCategory.items.forEach((item) => writeItem(item, app.launcherCategory.title, ini));
    await api.send("/api/ini", { name: "launcherSettings", text: ini.toString() }, "PUT");
  }
  app.saving = false;
}

function setCustomTextures(value) {
  app.customTextures = value;
  const ini = new Ini(app.data.ini?.launcherConfig || "");
  ini.writeString("LAUNCHER", "version", VERSION);
  ini.writeReal("GAME", "custom_textures", value ? 1 : 0);
  app.data.ini.launcherConfig = ini.toString();
  api.send("/api/ini", { name: "launcherConfig", text: ini.toString() }, "PUT");
}

// --- background + screen drawing ---------------------------------------------

function drawBackground() {
  const spriteName = (entry) => (typeof entry === "string" ? entry : entry.name);
  renderer.drawBackground({
    last: spriteName(app.data.sprites[background.last]),
    current: spriteName(app.data.sprites[background.index]),
    // the outgoing background is drawn at full alpha underneath the fading one
    lastAlpha: background.alpha < 1 ? 1 : 0,
    currentAlpha: background.alpha,
    frames: renderer.frames,
    viewWidth: renderer.viewWidth,
    viewHeight: renderer.viewHeight
  });
}

function drawOverlayText() {
  const roomWidth = renderer.roomWidth;
  const roomHeight = renderer.roomHeight;

  if (app.screen === "settings") {
    const yOffset = Math.abs(settings.yOffset);
    renderer.drawTextCustom(8, 4 + yOffset, "<Escape>: Save & Return", 1.5, "left");
    renderer.drawTextCustom(roomWidth - 8, 4 + yOffset, "<Space>: Select", 1.5, "right");
  } else if (app.screen === "menu") {
    let menuProgress = 1;
    if (titleMenu.pressAnyKeyMode) menuProgress = easeInCubic(0, 1, titleMenu.transitionCounter);
    else menuProgress = easeOutCubic(0, 1, titleMenu.transitionCounter);
    const textProgress = easeOutCubic(0, 1, background.textTransition);
    const topOffset = (1 - textProgress) * -50;
    renderer.drawTextCustom(8, 4 + topOffset, "By Mors & Friends", 1.5, "left");
    renderer.drawTextCustom(roomWidth - 8, 4 + topOffset,
      `Game: ${app.data.state.gameVersion || "?"}\nLauncher: ${VERSION}`, 1.5, "right");

    const messageSlide = easeOutCubic(0, 50, background.messagePosition);
    const promptOffset = (1 - textProgress) * 50 + menuProgress * 50;
    // these two sit on the bottom edge, so the original switches to fa_bottom first
    renderer.drawTextCustom(8, roomHeight - 6 + promptOffset + messageSlide, "<Escape>: Quit", 1.5, "left", 1, "bottom");
    renderer.drawTextCustom(roomWidth - 8, roomHeight - 6 + promptOffset, "Press any key to start!", 1.5, "right", 1, "bottom");

    const controlsOffset = (1 - menuProgress) * 50;
    renderer.drawTextCustom(8, roomHeight - 6 + controlsOffset + messageSlide, "<Escape>: Back", 1.5, "left", 1, "bottom");
    renderer.drawTextCustom(roomWidth - 8, roomHeight - 6 + controlsOffset, "<Space>: Select", 1.5, "right", 1, "bottom");
  }

  if (background.messagePosition > 0) {
    renderer.drawTextCustom(easeOutQuint(-roomWidth / 2, 8, background.messagePosition), roomHeight - 6,
      background.messageText, 1.5, "left", 1, "bottom");
  }

  if (background.fade > 0) renderer.drawRect(0, 0, roomWidth, roomHeight, COLOR.white, background.fade);
}

function drawBuildScreen() {
  const roomWidth = renderer.roomWidth;
  const roomHeight = renderer.roomHeight;
  const status = app.buildStatus || {};
  renderer.drawRect(0, 0, roomWidth, roomHeight, COLOR.black, 0.72);
  renderer.drawLetters(roomWidth / 2, 40, "BUILDING", 1.5);

  const lines = (app.buildLog || []).slice(-24);
  let y = 80;
  for (const entry of lines) {
    const color = entry.line.startsWith("!") ? COLOR.red : entry.line.startsWith("=") ? COLOR.yellow : COLOR.white;
    renderer.drawTextLine(16, y, entry.line.slice(0, 120), 1, color);
    y += 12;
  }
  renderer.drawTextCustom(roomWidth / 2, roomHeight - 40,
    status.running ? `Working: ${status.step || "..."}` : status.exitCode === 0 ? "Build finished."
      : `Build failed (exit ${status.exitCode}).`, 1.5, "center");
  renderer.drawTextCustom(roomWidth / 2, roomHeight - 20,
    "Press <ESCAPE> to return", 1.5, "center");
}

function draw() {
  // Once the game frame is up it owns the screen and the input; keep drawing behind
  // it only so the canvas is still current if the frame is ever torn down.
  if (app.runningGame) return;

  renderer.begin(COLOR.black);
  drawBackground();

  if (app.screen === "boot") boot.draw();
  else if (app.screen === "start") startGame.draw();
  else if (app.screen === "menu") titleMenu.draw();
  else if (app.screen === "settings") settings.draw();
  else if (app.screen === "build") drawBuildScreen();

  if (app.screen !== "start") drawOverlayText();
}

// --- main loop ----------------------------------------------------------------

let last = performance.now();
let accumulator = 0;
const STEP = 1000 / 60;

function frame(now) {
  const delta = Math.min(100, now - last);
  last = now;

  // The game runs in its own frame with its own animation loop, so the launcher stops
  // stepping and drawing here. renderer.frames is advanced inside the branch below
  // rather than in tick(), so it does not creep while the game is in front.
  if (!app.runningGame) {
    accumulator += delta;
    while (accumulator >= STEP) {
      accumulator -= STEP;
      tick();
    }
    draw();
  } else {
    last = now;
    accumulator = 0;
  }
  requestAnimationFrame(frame);
}

// current_frames in the original: it counts steps, not draw calls, and the wait()
// gates and the animations are all built on top of it.
let stepFrames = 0;

function tick() {
  stepFrames++;
  renderer.frames = stepFrames;
  // Key events belong to the game once its frame is up, so the launcher's own
  // input layer stops consuming them.
  if (app.runningGame) return;
  input.tick();
  background.step();
  // input_check_pressed() is per step: hold counters advance here, presses are cleared at the end

  if (app.screen === "boot") boot.step();
  else if (app.screen === "start") startGame.step();
  else if (app.screen === "menu") titleMenu.step();
  else if (app.screen === "settings") settings.step();
  else if (app.screen === "build" && app.buildStatus?.running) {
    // the log is polled on an interval
  }

  // a frame can run more than one step, so the presses only last a single step
  input.reset();
}

setInterval(async () => {
  if (app.screen !== "build") return;
  const log = await api.get("/api/build/log").catch(() => null);
  if (!log) return;
  app.buildLog = log.logs || [];
  app.buildStatus = log;
  if (!log.running) {
    const state = await api.get("/api/state").catch(() => null);
    if (state) app.data.state = state;
  }
}, 500);

// --- input events -------------------------------------------------------------

// Alt+Enter. obj_persistent/Step_1.gml:11-27 toggles the window, plays snd_select,
// persists it and pushes the value back into the launcher's fullscreen option so
// the menu never disagrees with the actual window.
function toggleFullscreenHotkey() {
  const next = !app.launcher.fullscreen;
  setFullscreen(next);
  sfxPlay("select");
  const item = app.launcherCategory?.items?.find((i) => i.internal_name === "fullscreen");
  if (item) item.state = next;
  scheduleSave();
  applyLauncherWindow();
}

window.addEventListener("keydown", (event) => {
  if (!app.ready) return;
  if (event.code === "F5") return;
  if (event.code === "PageUp" || event.key === "PageUp") { pressAction("page_left"); event.preventDefault(); return; }
  if (event.code === "PageDown" || event.key === "PageDown") { pressAction("page_right"); event.preventDefault(); return; }

  // Hotkeys. obj_persistent/Step_1.gml:2 ignores the whole input system while Alt
  // is held and hands the key to these instead:
  //
  //   if (!keyboard_check(vk_alt)) input_system_update()
  //   else { if (keyboard_check_pressed(vk_enter)) { set_fullscreen(!global.fullscreen); ... } }
  //
  // Enter then sets fullscreen, plays snd_select, writes LAUNCHER/fullscreen and
  // pushes the new value back into the launcher's own option.
  if (event.altKey) {
    if (event.code === "Enter" || event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      toggleFullscreenHotkey();
      return;
    }
    return; // Alt swallows the input system for this key
  }

  const action = actionFor(event);
  if (!action) {
    // typing a preset name, or just "press any key"
    if (settings.selected && settings.keyboardString !== undefined) {
      if (event.key === "Backspace") settings.keyboardString = settings.keyboardString.slice(0, -1);
      else if (event.key.length === 1) settings.keyboardString += event.key;
    } else {
      input.anyKey = true;
    }
    return;
  }

  event.preventDefault();
  input.keyDown(action, event.repeat);

  // key binding capture for TYPE_KEY options
  const item = settings.selected ? settings.items()?.[settings.selectedOption] : null;
  if (item && item.type === TYPE.KEY) {
    const code = KEYCODE_TO_DIK[event.code] ?? KEYCODE_TO_DIK[keyToCode(event.key)];
    if (code) {
      item.state = code;
      settings.selected = false;
      scheduleSave();
      background.displayMessage(`${item.name}: ${dikName(code)}`);
    }
  }
});

window.addEventListener("keyup", (event) => {
  const action = actionFor(event);
  if (action) input.keyUp(action);
});

function keyToCode(key) {
  const map = {
    " ": "Space", Enter: "Enter", Escape: "Escape", Backspace: "Backspace", Delete: "Delete",
    ArrowLeft: "ArrowLeft", ArrowRight: "ArrowRight", ArrowUp: "ArrowUp", ArrowDown: "ArrowDown"
  };
  if (map[key]) return map[key];
  return `Key${key.toUpperCase()}`;
}

window.addEventListener("pointerdown", () => {
  audio.unlocked = true;
  musicPlay(app.screen === "menu" || app.screen === "settings");
});

window.addEventListener("resize", applyLauncherWindow);
window.addEventListener("blur", () => input.releaseAll());

romInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  const res = await fetch("/api/rom", {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream", "X-File-Name": file.name },
    body: file
  });
  if (!res.ok) {
    background.displayMessage("The ROM has to be in Z64 (big endian) format.");
    return;
  }
  const state = await api.get("/api/state");
  app.data.state = state;
  background.displayMessage(`Saved ${file.name} (${(file.size / 1048576).toFixed(1)} MB). Starting the build...`);
  boot.state = 3;
  startBuilding();
});

async function enterMenu() {
  app.bootTimer = null;
  const state = await api.get("/api/state").catch(() => null);
  if (state) app.data.state = state;
  titleMenu.create();
  app.screen = "menu";
  // check_file() (obj_init/Create_0.gml:48):
  //
  //   if (global.quick_launch && !input_check_pressed(input.del)) {
  //       instance_create_depth(0, 0, depth-1, obj_start_game);
  //   } else {
  //       slide_out = 1;
  //   }
  //
  // So holding Delete skips the quick launch and lands on the menu instead. That is
  // the same expression the original evaluates on the frame the key went down, and
  // boot.externalEnabled is where Step_0.gml:20 already stored it:
  //
  //   external_enabled = !input_check_pressed(input.del);
  //
  // It has to be read from there rather than from the input state now, because by the
  // time the slide-out finishes the key has usually been released again.
  if (app.launcher.quick_launch && boot.externalEnabled && state?.gameBuilt) {
    background.displayMessage("Quick launch is on, starting the game...");
    setTimeout(runGame, 400);
  }
}

function openSettings(section) {
  settings.open(section);
}

// window_set_size() from the original: the launcher's own window size drives the room.
// set_fullscreen() (scr_categories_and_options.gml:308):
//
//   function set_fullscreen(fullscreen) {
//       global.fullscreen = fullscreen;
//       window_set_fullscreen(global.fullscreen)
//       window_set_cursor(global.fullscreen ? cr_none : cr_default);
//   }
//
// So the option does two things: it puts the window in fullscreen and it hides the
// cursor. Both are wanted here. The browser only grants requestFullscreen() from
// inside a user gesture, so the call at startup (gml line 415, which applies the
// stored setting) cannot take effect on load - the option still reads back the way
// the player set it, and the first keypress or click inside the page will do it.
async function setFullscreen(state) {
  app.launcher.fullscreen = state;
  // window_set_cursor(fullscreen ? cr_none : cr_default)
  document.body.classList.toggle("fullscreen", state);
  try {
    if (state && !document.fullscreenElement) await document.documentElement.requestFullscreen();
    else if (!state && document.fullscreenElement) await document.exitFullscreen();
  } catch {
    // Blocked without a gesture, or the user dismissed the browser's own prompt.
    // Nothing to do about it here; fullscreenchange below keeps the two in sync.
  }
}

// Leaving fullscreen with Escape does not go through the settings menu, so the
// option has to be corrected from the event instead. obj_persistent/Step_1.gml does
// the same job when Alt+Enter toggles the window behind the menu's back.
document.addEventListener("fullscreenchange", () => {
  const on = !!document.fullscreenElement;
  if (app.launcher.fullscreen === on) return;
  app.launcher.fullscreen = on;
  document.body.classList.toggle("fullscreen", on);
  const item = app.launcherCategory?.items?.find((i) => i.internal_name === "fullscreen");
  if (item) item.state = on;
  scheduleSave();
  applyLauncherWindow();
});

function applyLauncherWindow() {
  // obj_persistent/Step_1.gml:72 takes the view size from the display while
  // fullscreen, and from the launcher window otherwise.
  const fullscreen = app.launcher.fullscreen && document.fullscreenElement;
  const width = fullscreen ? window.innerWidth : (app.launcher.window_width || 1280);
  const height = fullscreen ? window.innerHeight : (app.launcher.window_height || 720);
  renderer.resize(app.launcher.scaling_mode, width, height);
}

// --- start --------------------------------------------------------------------

(async function start() {
  loadAudio();
  await renderer.loadAssets();
  renderer.resize(1, 1280, 720);

  try {
    app.data = await api.get("/api/bootstrap");
  } catch (error) {
    document.title = "SM64Plus Launcher - server unreachable";
    return;
  }

  if (app.data.error) {
    console.error(app.data.error);
  }

  app.categories = app.data.categories || [];
  app.launcherCategory = app.data.launcherCategory;
  app.ranges = app.data.ranges || categoryRanges(app.categories.length);
  app.presets = app.data.presets || [];
  app.inputPresets = app.data.inputPresets || [];
  // obj_background/Create_0.gml: eight skyboxes, the void twice, then the inside texture
  const placeholder = () => ({ name: "spr_placeholder", url: null });
  app.data.sprites = app.data.state.sprites
    || [placeholder(), placeholder(), placeholder(), placeholder(), placeholder(), placeholder(),
      placeholder(), placeholder(), "spr_void", "spr_void", placeholder()];

  loadItemStates();
  // scr_categories_and_options.gml:415 applies the stored setting on load:
  //
  //   set_fullscreen(launcher_get_item_state("fullscreen", false));
  //
  // A browser will not grant requestFullscreen() outside a user gesture, so this
  // cannot take effect on load. The cursor half still does, and the first keypress
  // or click in the page completes it.
  if (app.launcher.fullscreen) setFullscreen(true);
  applyLauncherWindow();

  // The game's own textures, if it has been built already.
  for (const sprite of app.data.sprites) {
    if (sprite.url) await renderer.addBackground(sprite.name, sprite.url);
  }
  await renderer.addLetters(app.data.state.letters);

  boot.create();
  app.screen = "boot";
  // ?menu=1 no longer skips rm_init. The disclaimer still plays; it is the first
  // thing the real launcher shows, and it is the room that hands over to the menu.
  app.ready = true;
  // handy for poking at the state from the console
  window.__launcher = { app, boot, titleMenu, settings, background, renderer, input };
  requestAnimationFrame((now) => { last = now; frame(now); });
})();