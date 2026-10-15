// Immediate mode renderer that mirrors what the GameMaker launcher draws.
// draw_option / draw_text_custom / draw_letters are ports of scr_text_rendering.gml,
// the room scaling follows obj_persistent/Step_0.gml and the easings come from scr_wease.gml.

export const COLOR = {
  black: "#09070b",      // COLOR_BLACK  $0B0709 (BGR)
  white: "#FFFFFF",      // COLOR_WHITE  c_white
  yellow: "#FFEF00",     // COLOR_YELLOW $00EFFF (BGR)
  lime: "#00FF00",       // c_lime
  red: "#FF0000",        // c_red
  aqua: "#00FFFF",       // c_aqua
  dkgray: "#404040",     // c_dkgray
  ltgray: "#C0C0C0",     // c_ltgray
  gray: "#808080"        // c_gray
};

export const BASE_WIDTH = 640;
export const BASE_HEIGHT = 360;
export const MIN_WIDTH = 512;
export const MIN_HEIGHT = 240;

// merge_color(): blends two "#rrggbb" strings channel by channel.
export function mergeColor(a, b, amount) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const channel = (shift) => Math.round((((pa >> shift) & 255) * (1 - amount)) + (((pb >> shift) & 255) * amount));
  return `#${((channel(16) << 16) | (channel(8) << 8) | channel(0)).toString(16).padStart(6, "0")}`;
}

// An option_type.color state, which the menus hand to merge_color()/draw_set_color
// as a colour value.
export function colorStateHex(state) {
  return `#${String(state?.hex ?? "000000").padStart(6, "0")}`;
}

// --- scr_wease.gml ------------------------------------------------------------

export const lerp = (a, b, t) => a + (b - a) * t;
export function easeInCubic(a, b, amount) {
  const c = b - a;
  return c * amount ** 3 + a;
}

export function easeOutCubic(a, b, amount) {
  const c = b - a;
  return c * ((amount - 1) ** 3 + 1) + a;
}

export function easeOutSine(a, b, amount) {
  const c = b - a;
  return c * Math.sin(amount * (Math.PI / 2)) + a;
}

export function easeOutQuart(a, b, amount) {
  const c = b - a;
  return -c * ((amount - 1) ** 4 - 1) + a;
}

// ease_out_back(a, b, amount, overshoot = 1.70158)
export function easeOutBack(a, b, amount, overshoot = 1.70158) {
  const c = b - a;
  const t = amount - 1;
  return c * (t ** 2 * ((overshoot + 1) * t + overshoot) + 1) + a;
}

export function easeOutQuint(a, b, amount) {
  const c = b - a;
  return c * ((amount - 1) ** 5 + 1) + a;
}

export function easeOutElastic(a, b, amount) {
  const c = b - a;
  if (amount === 0 || c === 0) return a;
  if (amount === 1) return a + c;
  const amplitude = c;
  const period = 0.3;
  const s = period * 0.25;
  return amplitude * 2 ** (-10 * amount) * Math.sin((amount - s) * (2 * Math.PI) / period) + c + a;
}

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export const sign = (value) => (value > 0 ? 1 : value < 0 ? -1 : 0);

// --- renderer -----------------------------------------------------------------

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.ctx.imageSmoothingEnabled = false;
    this.frames = 0;
    this.roomWidth = BASE_WIDTH;
    this.roomHeight = BASE_HEIGHT;
    this.scale = 2;
    this.smoothing = false;
    this.atlas = null;
    this.atlasMap = new Map();
    this.glyphWidth = 5;
    this.glyphHeight = 8;
    this.sprites = new Map();
    this._patternCache = new Map();
    this._offsetX = 0;
    this._offsetY = 0;
  }

  async loadAssets(base = "assets") {
    const [atlas, map, logo, voidA, voidB, placeholder] = await Promise.all([
      loadImage(`${base}/font-atlas.png`),
      fetch(`${base}/font-atlas.json`).then((res) => res.json()),
      loadImage(`${base}/logo.png`),
      loadImage(`${base}/bg-1.png`),
      loadImage(`${base}/bg-2.png`),
      loadImage(`${base}/placeholder.png`)
    ]);
    this.atlas = atlas;
    this.atlasMap = new Map(Object.entries(map.map).map(([char, index]) => [char, index]));
    this.glyphWidth = map.glyphWidth;
    this.glyphHeight = map.glyphHeight;
    this.sprites.set("spr_logo", logo);
    this.sprites.set("spr_void", voidA);
    this.sprites.set("spr_void_1", voidB);
    this.sprites.set("spr_placeholder", placeholder);
  }

  // Backgrounds that come from the game build (textures/skyboxes), if it exists yet.
  async addBackground(name, url) {
    try {
      this.sprites.set(name, await loadImage(url));
    } catch {
      /* falls back to spr_void, like the original's _add() */
    }
  }

  // load_letters(): the game's own alphabet, one 16x16 segment2 texture per letter.
  async addLetters(list) {
    this.letters = [];
    this._letterShadows = [];
    for (const letter of list || []) {
      const image = letter?.url ? await loadImage(letter.url) : this.sprites.get("spr_placeholder");
      this.letters.push(image || this.sprites.get("spr_placeholder"));
    }
  }

  _blackCopy(image) {
    if (!this._blackCache) this._blackCache = new Map();
    const cached = this._blackCache.get(image);
    if (cached) return cached;
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this._blackCache.set(image, canvas);
    return canvas;
  }

  // obj_persistent/Step_0.gml: the launcher window is a 640x360 room times an integer
  // factor. A browser has no window to resize, so the emulated window (from the launcher
  // settings, 1280x720 by default) is letterboxed into the page instead.
  resize(scalingMode = 1, windowWidth = 1280, windowHeight = 720) {
    const canvasWidth = this.canvas.clientWidth || window.innerWidth;
    const canvasHeight = this.canvas.clientHeight || window.innerHeight;

    let scale;
    if (scalingMode > 0) {
      scale = Math.max(1, Math.min(
        Math.floor(windowWidth / BASE_WIDTH / scalingMode) * scalingMode,
        Math.floor(windowHeight / BASE_HEIGHT / scalingMode) * scalingMode
      ));
    } else {
      scale = Math.max(1, Math.min(windowWidth / BASE_WIDTH, windowHeight / BASE_HEIGHT));
    }

    this.roomWidth = windowWidth / scale;
    this.roomHeight = windowHeight / scale;
    this.scale = scale;
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    // view_wport / view_hport, the size of the surface the background is drawn into
    this.viewWidth = windowWidth;
    this.viewHeight = windowHeight;

    // fit the emulated window into the page, keeping the aspect ratio
    const fit = Math.min(canvasWidth / windowWidth, canvasHeight / windowHeight);
    this.fit = fit;
    this.pixelScale = scale * fit;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.dpr = dpr;
    this.canvas.width = Math.round(canvasWidth * dpr);
    this.canvas.height = Math.round(canvasHeight * dpr);
    this._offsetX = (canvasWidth - this.roomWidth * this.pixelScale) / 2;
    this._offsetY = (canvasHeight - this.roomHeight * this.pixelScale) / 2;
    this._patternCache.clear();
  }

  begin(clearColor = COLOR.black) {
    const ctx = this.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = clearColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setTransform(this.pixelScale * this.dpr, 0, 0, this.pixelScale * this.dpr,
      (this._offsetX * this.dpr), (this._offsetY * this.dpr));
    ctx.imageSmoothingEnabled = this.smoothing;
    this._patternCache.clear();
  }

  drawRect(x0, y0, x1, y1, color, alpha = 1) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0));
    ctx.restore();
  }

  // draw_sprite_ext: centre based, like GameMaker.
  drawSprite(name, x, y, scaleX, scaleY, color = "#FFFFFF", alpha = 1) {
    const image = this.sprites.get(name);
    if (!image) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    const previous = ctx.imageSmoothingEnabled;
    ctx.imageSmoothingEnabled = this.smoothing;
    ctx.drawImage(image, x - (image.width * scaleX) / 2, y - (image.height * scaleY) / 2,
      image.width * scaleX, image.height * scaleY);
    ctx.imageSmoothingEnabled = previous;
    ctx.restore();
  }

  // obj_background/Draw_0.gml, the whole thing:
  //
  //   gpu_set_tex_filter(1)
  //   surface_set_target(surf)                       // surf is view_wport x view_hport
  //   _size = 1.125*view_hport[0]/720
  //   _x = -current_frames*0.75*_size
  //   _y = (sin(current_frames/1024*pi)*16+8)*_size*1.75
  //   draw_sprite_tiled_ext(bg, 0, _x, _y, 4*_size, 3*_size, c_white, alpha)
  //   ... frame 1 of spr_void as a second, brighter layer at _x*1.5 / _y*1.5
  //   two subtract blended gradients on the outer thirds        (Windows only)
  //   shader_set(shd_curve); draw_surface_stretched(surf, 0, 0, room_width, room_height)
  //
  // draw_sprite_tiled_ext repeats the sprite over the whole view with the given tile
  // size, so the 18x24 void sprite covers everything in 4.5x3.375 pixel tiles.
  drawBackground({ last, current, lastAlpha, currentAlpha, frames, viewWidth, viewHeight }) {
    // The distortion pass is the expensive one and the background only creeps along
    // (0.42 room pixels a frame), so it is redone every other step.
    const step = Math.round(frames / 2);
    const key = `${step}|${last}|${current}|${Math.round(lastAlpha * 64)}|${Math.round(currentAlpha * 64)}`;
    if (key !== this._backgroundKey) {
      this._backgroundKey = key;
      this._drawBackground({ last, current, lastAlpha, currentAlpha, frames: step * 2, viewWidth, viewHeight });
    }
    const ctx = this.ctx;
    ctx.drawImage(this.curveCanvas, 0, 0);
  }

  _drawBackground({ last, current, lastAlpha, currentAlpha, frames, viewWidth, viewHeight }) {
    const size = 1.125 * viewHeight / 720;
    const x = -frames * 0.75 * size;
    const y = (Math.sin(frames / 1024 * Math.PI) * 16 + 8) * size * 1.75;

    this._surface(viewWidth, viewHeight);
    const sctx = this.surfaceCtx;
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.clearRect(0, 0, viewWidth, viewHeight);
    sctx.globalCompositeOperation = "source-over";
    sctx.globalAlpha = 1;

    const voidLast = last === "spr_void";
    const voidCurrent = current === "spr_void";

    if (lastAlpha < 1) {
      this._tileLayer(sctx, last, x, y, 1, viewWidth, viewHeight, voidLast);
      if (voidLast) {
        this._tileLayer(sctx, "spr_void_1", x * 1.5, y * 1.5, 0.5, viewWidth, viewHeight, true);
      }
    }
    if (currentAlpha > 0) {
      this._tileLayer(sctx, current, x, y, currentAlpha, viewWidth, viewHeight, voidCurrent);
      if (voidCurrent) {
        this._tileLayer(sctx, "spr_void_1", x * 1.5, y * 1.5, currentAlpha * 0.5,
          viewWidth, viewHeight, true);
      }
    }

    // the gradients are part of the surface, they are applied with the rest of it
    this._stretch(viewWidth, viewHeight);
    // shader_set(shd_curve)
    this._curve();
  }

  _surface(width, height) {
    if (!this.surfaceCanvas || this.surfaceCanvas.width !== width || this.surfaceCanvas.height !== height) {
      this.surfaceCanvas = document.createElement("canvas");
      this.surfaceCanvas.width = width;
      this.surfaceCanvas.height = height;
      this.surfaceCtx = this.surfaceCanvas.getContext("2d");
    }
  }

  // gpu_set_tex_filter(0) while spr_void is drawn, (1) for the game's skyboxes.
  //
  // The list mixes two kinds of sprite. The skyboxes are 248x248 pictures, and are laid
  // over the surface edge to edge the same way draw_surface_stretched lays that surface
  // over the room: whole, centred by construction, nothing cut off. A four pixel tile
  // can only hold the average of an entire skybox, which repeats every three pixels.
  //
  // spr_void and inside_castle are textures, repeated over the whole surface with the
  // drift _x/_y. They repeat at their own size, which is the size their artwork is
  // drawn for - spr_void's two frames are a 2x2 checker of 9x12 quadrants and a one
  // pixel green grid along the top and left, and at 4*_size x 3*_size tiles neither
  // survives: the samples land on texels 2, 6, 10, 14 across and 3, 10, 17 down, never
  // on texel 0, so the grid draws nothing at all and the checker turns into stripes.
  // At one to one there is no minification to fake, so the pattern is the sprite.
  _tileLayer(sctx, name, x, y, alpha, width, height, nearest = false) {
    const image = this.sprites.get(name);
    if (!image || alpha <= 0) return;

    // Everything goes through the same repeat, so every background slides at the
    // same _x and _y and loops the same way.
    //
    // The period is what decides whether the wrap is visible. A tile hides it because
    // advancing by exactly one period brings up an identical copy - that is why
    // spr_void's 18x24 period is invisible. A skybox drawn one-to-one has no period
    // at all, so the drift would tear a seam across it. Giving it the surface itself
    // as the period fixes that without changing how it looks: one skybox still covers
    // the screen exactly once, but the copies either side are the same picture, so
    // sliding forever is seamless. It is the original's tiling at the only scale a
    // stretched skybox can loop at.
    const periodX = image.width > 64 ? width : image.width;
    const periodY = image.width > 64 ? height : image.height;

    const pattern = sctx.createPattern(image, "repeat");
    // The drift is folded into the tile so it keeps sliding forever without the
    // translation growing without bound, which is what _x and _y do in the original.
    const driftX = (((x % periodX) + periodX) % periodX);
    const driftY = (((y % periodY) + periodY) % periodY);
    pattern.setTransform(new DOMMatrix([
      periodX / image.width, 0, 0, periodY / image.height, driftX, driftY
    ]));
    sctx.save();
    sctx.imageSmoothingEnabled = !nearest;
    sctx.globalAlpha = alpha;
    sctx.fillStyle = pattern;
    sctx.fillRect(0, 0, width, height);
    sctx.restore();
    sctx.globalAlpha = 1;
  }

  // The two bm_subtract gradients live on the outer thirds of the surface. Subtraction
  // is per channel and clamps at zero, so it is applied in the distortion pass.
  _sideGradient(width, height) {
    if (!this._gradient || this._gradient.length !== width) {
      const band = width / 3;
      const column = new Float32Array(width);
      for (let x = 0; x < width; x++) {
        let amount = 0;
        if (x < band) amount = 1 - x / band;
        else if (x > width - band) amount = (x - (width - band)) / band;
        column[x] = amount * 0x40;           // c_dkgray is $404040
      }
      this._gradient = column;
    }
    return this._gradient;
  }

  // draw_surface_stretched(surf, 0, 0, room_width, room_height) with the linear
  // filter the code turned back on before stretching.
  _stretch(viewWidth, viewHeight) {
    const width = Math.round(this.roomWidth);
    const height = Math.round(this.roomHeight);
    if (!this.stretchCanvas || this.stretchCanvas.width !== width || this.stretchCanvas.height !== height) {
      this.stretchCanvas = document.createElement("canvas");
      this.stretchCanvas.width = width;
      this.stretchCanvas.height = height;
      this.stretchCtx = this.stretchCanvas.getContext("2d", { willReadFrequently: true });
    }
    const ctx = this.stretchCtx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(this.surfaceCanvas, 0, 0, viewWidth, viewHeight, 0, 0, width, height);
  }

  // shaders/shd_curve/shd_curve.fsh: every colour channel is sampled from a slightly
  // different place, and both are pushed through a barrel distortion.
  _curve() {
    const width = this.stretchCanvas.width;
    const height = this.stretchCanvas.height;
    if (!this.curveCanvas || this.curveCanvas.width !== width || this.curveCanvas.height !== height) {
      this.curveCanvas = document.createElement("canvas");
      this.curveCanvas.width = width;
      this.curveCanvas.height = height;
      this.curveCtx = this.curveCanvas.getContext("2d");
      this.curveImage = this.curveCtx.createImageData(width, height);
      this._curveSource = null;
    }

    const source = this.stretchCtx.getImageData(0, 0, width, height);
    if (this._curveSource?.data.length === source.data.length) this._curveSource.data.set(source.data);
    else this._curveSource = source;

    const src = this._curveSource.data;
    const dst = this.curveImage.data;
    const K1 = 0.15625;
    const uStep = 2 / width;
    const vStep = 2 / height;
    const lastX = width - 1;
    const lastY = height - 1;
    const gradient = this._sideGradient(width, height);

    for (let y = 0; y < height; y++) {
      const v = (y + 0.5) * vStep - 1;
      const dy0 = -0.015625 - v;
      const dy1 = 0.015625 - v;
      const d0y = dy0 * dy0;
      const d1y = dy1 * dy1;
      const d2y = v * v;
      let index = y * width * 4;
      for (let x = 0; x < width; x++, index += 4) {
        const u = (x + 0.5) * uStep - 1;
        const uu = u * u;
        const shade = gradient[x];
        {
          const f = 1 / (1 + K1 * (uu + d0y));
          let px = u * f * 0.5 + 0.5;
          px = px * width;
          px = px < 0 ? 0 : px > lastX ? lastX : px;
          let py = v * f * 0.5 + 0.5;
          py = py * height;
          py = py < 0 ? 0 : py > lastY ? lastY : py;
          const x0 = px | 0;
          const y0 = py | 0;
          const step = (x0 < lastX ? 1 : 0) * 4;
          const rowStep = (y0 < lastY ? width * 4 : 0);
          const top = y0 * width * 4 + x0 * 4 + 0;
          const fx = px - x0;
          const fy = py - y0;
          const a = src[top] + (src[top + step] - src[top]) * fx;
          const b = src[top + rowStep] + (src[top + rowStep + step] - src[top + rowStep]) * fx;
          const value0 = a + (b - a) * fy;
          dst[index + 0] = shade === 0 ? value0 : (value0 > shade ? value0 - shade : 0);
        }
        {
          const f = 1 / (1 + K1 * (uu + d1y));
          let px = u * f * 0.5 + 0.5;
          px = px * width;
          px = px < 0 ? 0 : px > lastX ? lastX : px;
          let py = v * f * 0.5 + 0.5;
          py = py * height;
          py = py < 0 ? 0 : py > lastY ? lastY : py;
          const x0 = px | 0;
          const y0 = py | 0;
          const step = (x0 < lastX ? 1 : 0) * 4;
          const rowStep = (y0 < lastY ? width * 4 : 0);
          const top = y0 * width * 4 + x0 * 4 + 1;
          const fx = px - x0;
          const fy = py - y0;
          const a = src[top] + (src[top + step] - src[top]) * fx;
          const b = src[top + rowStep] + (src[top + rowStep + step] - src[top + rowStep]) * fx;
          const value1 = a + (b - a) * fy;
          dst[index + 1] = shade === 0 ? value1 : (value1 > shade ? value1 - shade : 0);
        }
        {
          const f = 1 / (1 + K1 * (uu + d2y));
          let px = u * f * 0.5 + 0.5;
          px = px * width;
          px = px < 0 ? 0 : px > lastX ? lastX : px;
          let py = v * f * 0.5 + 0.5;
          py = py * height;
          py = py < 0 ? 0 : py > lastY ? lastY : py;
          const x0 = px | 0;
          const y0 = py | 0;
          const step = (x0 < lastX ? 1 : 0) * 4;
          const rowStep = (y0 < lastY ? width * 4 : 0);
          const top = y0 * width * 4 + x0 * 4 + 2;
          const fx = px - x0;
          const fy = py - y0;
          const a = src[top] + (src[top + step] - src[top]) * fx;
          const b = src[top + rowStep] + (src[top + rowStep + step] - src[top + rowStep]) * fx;
          const value2 = a + (b - a) * fy;
          dst[index + 2] = shade === 0 ? value2 : (value2 > shade ? value2 - shade : 0);
        }
        dst[index + 3] = 255;
      }
    }
    this.curveCtx.putImageData(this.curveImage, 0, 0);
  }

  // One glyph. The sprite font is 5x9 with an empty bottom row; each colour gets a
  // cached tinted copy of the atlas so per-character colouring stays cheap.
  drawChar(char, x, y, scale, color, alpha = 1) {
    const index = this.atlasMap.get(char);
    if (index === undefined || !this.atlas) return;
    const source = color === "#FFFFFF" ? this.atlas : this._tinted(color);
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(source, index * this.glyphWidth, 0, this.glyphWidth, this.glyphHeight,
      x, y, this.glyphWidth * scale, this.glyphHeight * scale);
    ctx.restore();
  }

  _tinted(color) {
    let tinted = this._tintCache?.get(color);
    if (tinted) return tinted;
    if (!this._tintCache) this._tintCache = new Map();
    const scratch = document.createElement("canvas");
    scratch.width = this.atlas.width;
    scratch.height = this.atlas.height;
    const sctx = scratch.getContext("2d");
    sctx.drawImage(this.atlas, 0, 0);
    sctx.globalCompositeOperation = "source-in";
    sctx.fillStyle = color;
    sctx.fillRect(0, 0, scratch.width, scratch.height);
    this._tintCache.set(color, scratch);
    return scratch;
  }

  // draw_option(): per character, black shadow, colour changes for the symbols.
  // The font is ha_center, so every glyph sits centred on its own slot.
  drawOption(x, y, str, scale, enabled = true, alpha = 1) {
    const length = str.length;
    const half = (this.glyphWidth * scale) / 2;
    let color = COLOR.white;
    for (let i = 0; i < length; i++) {
      const char = str[i];
      if (char === "✔") { color = COLOR.lime; continue; }
      if (char === "❌") { color = COLOR.red; continue; }
      if (char === "❓") { color = COLOR.aqua; continue; }
      if (char === "⬜") { color = COLOR.white; continue; }
      if (char === "⬛") { color = COLOR.ltgray; continue; }
      if (char === " ") continue;

      let xx = x + (i - (length - 1) / 2) * 6 * scale;
      if (char === ">") xx += Math.abs(Math.sin(this.frames / 32)) * 8;
      if (char === "<") xx -= Math.abs(Math.sin(this.frames / 32)) * 8;
      xx -= half;

      const color2 = enabled ? color : COLOR.gray;
      this.drawChar(char, xx + scale, y + scale, scale, COLOR.black, alpha);
      this.drawChar(char, xx, y, scale, color2, alpha);
    }
  }

  // draw_text_transformed() for a single line.
  drawTextLine(x, y, str, scale, color = COLOR.white, alpha = 1) {
    for (let i = 0; i < str.length; i++) {
      this.drawChar(str[i], x + i * this.glyphWidth * scale, y, scale, color, alpha);
    }
  }

  // draw_text_ext_transformed(): wrapped, 12px line separation, black shadow.
  drawTextExt(x, y, str, separation, wrapWidth, scale, color = COLOR.white, alpha = 1) {
    const lines = wrapText(str, wrapWidth, scale);
    let offsetY = 0;
    for (const line of lines) {
      this.drawTextLine(x + scale, y + offsetY + scale, line, scale, COLOR.black, alpha);
      this.drawTextLine(x, y + offsetY, line, scale, color, alpha);
      offsetY += separation * scale;
    }
    return lines.length * separation * scale;
  }

  // draw_text_custom(): wrapped white text with a shadow. `align` and `valign` are
  // GameMaker's draw_set_halign / draw_set_valign.
  //
  // The alignment is applied here rather than by the GML's draw_text_ext_transformed,
  // because the port's primitive is drawTextLine, which lays glyphs out from x
  // rightward and has no alignment of its own. fa_left is x, fa_right is x - width
  // and fa_center is x - width/2. Dropping that offset draws every centred line
  // starting at the centre instead of on it.
  drawTextCustom(x, y, str, scale, align = "left", alpha = 1, valign = "top") {
    const lines = wrapText(str, (this.roomWidth / scale) - 32, scale);
    const lineHeight = 12 * scale;
    let offsetY = 0;
    if (valign === "bottom") offsetY = -(lines.length - 1) * lineHeight;
    for (const line of lines) {
      const width = line.length * this.glyphWidth * scale;
      const lineX = align === "right" ? x - width : align === "center" ? x - width / 2 : x;
      this.drawTextLine(lineX + scale, y + offsetY + scale, line, scale, COLOR.black, alpha);
      this.drawTextLine(lineX, y + offsetY, line, scale, COLOR.white, alpha);
      offsetY += lineHeight;
    }
    return lines.length * lineHeight;
  }

  // draw_text_custom_inverted(): the same two calls as draw_text_custom with the
  // colours swapped - white at the +scale shadow offset, black on the face. The
  // offset is down and right in both, so nothing moves; only the draw order differs.
  //
  // obj_start_game sets fa_center and fa_middle before calling it, so the block is
  // centred on both axes: the first line is pulled up by half the block and each line
  // is offset from the anchor by half its own width.
  drawTextCustomInverted(x, y, str, scale, alpha = 1) {
    const lines = wrapText(str, (this.roomWidth / scale) - 32, scale);
    const lineHeight = 12 * scale;
    let offsetY = -(lines.length * lineHeight) / 2;
    for (const line of lines) {
      const width = line.length * this.glyphWidth * scale;
      const lineX = x - width / 2;
      this.drawTextLine(lineX + scale, y + offsetY + scale, line, scale, COLOR.white, alpha);
      this.drawTextLine(lineX, y + offsetY, line, scale, COLOR.black, alpha);
      offsetY += lineHeight;
    }
    return lines.length * lineHeight;
  }

  // draw_letters(): the tab titles, drawn with the game's own 16x16 letter textures
  // (with the black drop shadow underneath), 13 pixels apart at scale 1.
  drawLetters(x, y, str, scale) {
    const text = str.replace(/V/g, "U");
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === " ") continue;
      const value = char.charCodeAt(0) - 65;
      const xx = x + (i - text.length / 2) * 13 * scale;
      this.drawLetter(value, xx, y + scale * 2 - 8, scale, 0.75, "#000000");
      this.drawLetter(value, xx, y - 8, scale, 1);
    }
  }

  drawLetter(value, x, y, scale, alpha, color = "#FFFFFF") {
    let image = this.letters?.[value] || this.sprites.get("spr_placeholder");
    if (!image) return;
    if (color !== "#FFFFFF") image = this._blackCopy(image);
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    // sprite_add(..., 0, 0, 0, 0, 0), so the origin is the top left corner
    ctx.drawImage(image, x, y, 16 * scale, 16 * scale);
    ctx.restore();
  }

  translate(x, y) {
    this.ctx.save();
    this.ctx.translate(x, y);
  }

  untranslate() {
    this.ctx.restore();
  }

  textWidth(str, scale) {
    return str.length * this.glyphWidth * scale;
  }
}

const this_glyphWidth = () => 5;

function wrapText(str, width, scale) {
  // `width` is in unscaled text units, exactly like draw_text_ext_transformed's argument.
  const lines = [];
  for (const paragraph of String(str).split("\n")) {
    if (paragraph === "") { lines.push(""); continue; }
    let line = "";
    for (const word of paragraph.split(" ")) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && candidate.length * this_glyphWidth() > width) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    lines.push(line);
  }
  return lines;
}

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${url}`));
    image.src = url;
  });
}