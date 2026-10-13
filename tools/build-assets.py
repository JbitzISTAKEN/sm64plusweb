#!/usr/bin/env python3
"""Turn the original GameMaker launcher's assets into web assets.

Reads the MorsGames/sm64plus-launcher project and writes:
  public/assets/font.ttf   - built from the spr_font sprite font (5x9 glyphs)
  public/assets/logo.png   - spr_logo
  public/assets/bg-1.png   - spr_void frame 0 (tiled grid)
  public/assets/bg-2.png   - spr_void frame 1 (sparse highlights, drawn at 50% on top)
  public/assets/sounds/*   - the launcher's music and sound effects

Usage:  python3 tools/build-assets.py [--project /path/to/sm64plus-launcher]
Needs:  fonttools + pillow (pip install fonttools pillow), afconvert for the sounds.
"""

import argparse
import json
import re
import subprocess
from pathlib import Path

from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from PIL import Image

GLYPH_W, GLYPH_H = 5, 9          # source glyph size
UNITS_PER_EM = 1000
PX = 100                          # font units per source pixel
ADVANCE = GLYPH_W * PX            # 500 = monospace, no letter spacing
ASCENT = GLYPH_H * PX             # 900
DESCENT = 100

# Glyphs the original's sprite font does not have (GameMaker renders them blank),
# redrawn here so the option text keeps its :check / :question / :cross markers.
EXTRA_GLYPHS = {
    0x2714: [  # check mark
        ".....",
        "....#",
        "...##",
        "#..##",
        "##.##",
        ".####",
        "..##.",
        ".....",
    ],
    0x2753: [  # question mark
        ".###.",
        "#...#",
        "#..##",
        "...##",
        "..##.",
        ".....",
        "..##.",
        ".....",
    ],
    0x274C: [  # cross
        ".....",
        "#...#",
        ".#.#.",
        "..#..",
        ".#.#.",
        "#...#",
        ".....",
        ".....",
    ],
    0x2B1B: [  # black large square (dim marker in the editing hints)
        "#####",
        "#####",
        "#####",
        "#####",
        "#####",
        "#####",
        "#####",
        ".....",
    ],
    0x2B1C: [  # white large square
        "#####",
        "#...#",
        "#...#",
        "#...#",
        "#...#",
        "#...#",
        "#####",
        ".....",
    ],
}

# glyphs the canvas renderer draws through draw_option()
ATLAS_EXTRA = [0x2714, 0x2753, 0x274C, 0x2B1B, 0x2B1C]


def frames_of(sprite_dir: Path) -> list[str]:
    """Frame names in sprite order, taken from the .yy file."""
    yy = next(sprite_dir.glob("*.yy"))
    names = re.findall(r'"%Name":"([0-9a-f-]+)"', yy.read_text())
    if not names:
        raise SystemExit(f"no frames found in {yy}")
    return names


def glyph_bitmap(path: Path) -> list[str]:
    """Read a glyph PNG into rows of '#'/'.' based on alpha."""
    image = Image.open(path).convert("RGBA")
    alpha = image.split()[3]
    rows = []
    for y in range(GLYPH_H):
        row = ""
        for x in range(GLYPH_W):
            lit = x < image.width and y < image.height and alpha.getpixel((x, y)) > 128
            row += "#" if lit else "."
        rows.append(row)
    return rows


def rows_to_glyph(rows: list[str]):
    """One square contour per horizontal run of lit pixels."""
    pen = TTGlyphPen(None)
    for y, row in enumerate(rows):
        top = (GLYPH_H - y) * PX          # y = 0 is the top row
        x = 0
        while x < len(row):
            if row[x] != "#":
                x += 1
                continue
            start = x
            while x < len(row) and row[x] == "#":
                x += 1
            pen.moveTo((start * PX, top - PX))
            pen.lineTo((x * PX, top - PX))
            pen.lineTo((x * PX, top))
            pen.lineTo((start * PX, top))
            pen.closePath()
    return pen.glyph()


def build_font(sprite_dir: Path, out: Path) -> None:
    characters = {}
    for index, name in enumerate(frames_of(sprite_dir)):
        code = 32 + index
        if code > 126:
            break
        png = sprite_dir / f"{name}.png"
        if png.exists():
            characters[code] = glyph_bitmap(png)

    # Frame 0 is a solid block in the project file; make it a real space.
    characters[32] = ["." * GLYPH_W for _ in range(GLYPH_H - 1)]
    characters.update(EXTRA_GLYPHS)

    glyph_order = [".notdef"] + [f"uni{code:04X}" for code in sorted(characters)]
    glyphs = {".notdef": TTGlyphPen(None).glyph()}
    for code, rows in characters.items():
        glyphs[f"uni{code:04X}"] = rows_to_glyph(rows)

    builder = FontBuilder(UNITS_PER_EM, isTTF=True)
    builder.setupGlyphOrder(glyph_order)
    builder.setupCharacterMap({code: f"uni{code:04X}" for code in characters})
    builder.setupGlyf(glyphs)
    builder.setupHorizontalMetrics({name: (ADVANCE, 0) for name in glyph_order})
    builder.setupHorizontalHeader(ascent=ASCENT, descent=DESCENT, lineGap=0)
    builder.setupNameTable({
        "familyName": "SM64Plus Launcher",
        "styleName": "Regular",
        "psName": "SM64PlusLauncher",
        "fullName": "SM64Plus Launcher",
        "version": "1.0",
    })
    builder.setupOS2(sTypoAscender=ASCENT, sTypoDescender=-DESCENT, usWinAscent=ASCENT, usWinDescent=DESCENT)
    builder.setupPost(isFixedPitch=1)
    out.parent.mkdir(parents=True, exist_ok=True)
    builder.save(str(out))


def main() -> None:
    parser = argparse.ArgumentParser()
    here = Path(__file__).resolve().parent.parent
    parser.add_argument("--project", default=str(here.parent / "sm64plus-launcher"))
    parser.add_argument("--out", default=str(here / "public" / "assets"))
    args = parser.parse_args()

    project = Path(args.project)
    out = Path(args.out)
    if not project.exists():
        raise SystemExit(f"launcher project not found at {project}")
    out.mkdir(parents=True, exist_ok=True)

    print(f"font     <- {project}/sprites/spr_font")
    build_font(project / "sprites" / "spr_font", out / "font.ttf")

    # glyph atlas + map, so the canvas renderer can draw the same font the game uses
    characters = {}
    for index, name in enumerate(frames_of(project / "sprites" / "spr_font")):
        code = 32 + index
        if code > 126:
            break
        png = project / "sprites" / "spr_font" / f"{name}.png"
        if png.exists():
            characters[code] = glyph_bitmap(png)
    characters[32] = ["." * GLYPH_W for _ in range(GLYPH_H - 1)]
    characters.update(EXTRA_GLYPHS)

    order = sorted(characters)
    strip = Image.new("RGBA", (GLYPH_W * len(order), GLYPH_H), (255, 255, 255, 0))
    for index, code in enumerate(order):
        rows = characters[code]
        for y, row in enumerate(rows):
            for x, lit in enumerate(row):
                if lit == "#":
                    strip.putpixel((index * GLYPH_W + x, y), (255, 255, 255, 255))
    strip.save(out / "font-atlas.png")
    (out / "font-atlas.json").write_text(json.dumps(
        {"glyphWidth": GLYPH_W, "glyphHeight": GLYPH_H - 1, "map": {chr(code): index for index, code in enumerate(order)}},
        ensure_ascii=False))
    print(f"font-atlas <- {len(order)} glyphs")

    for sprite, target, frame in [("spr_logo", "logo.png", 0), ("spr_void", "bg-1.png", 0),
                                  ("spr_void", "bg-2.png", 1), ("spr_placeholder", "placeholder.png", 0)]:
        folder = project / "sprites" / sprite
        name = frames_of(folder)[frame]
        image = Image.open(folder / f"{name}.png").convert("RGBA")
        image.save(out / target)
        print(f"{target:<13} <- {sprite}/{name} {image.size}")

    sounds_out = out / "sounds"
    sounds_out.mkdir(exist_ok=True)
    manifest_sounds = []
    for folder in sorted((project / "sounds").iterdir()):
        wav = folder / f"{folder.name}.wav"
        if not wav.exists():
            continue
        target = sounds_out / f"{folder.name}.m4a"
        subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", "96000", str(wav), str(target)],
                       check=True, capture_output=True)
        manifest_sounds.append({"name": folder.name, "file": f"sounds/{folder.name}.m4a", "bytes": target.stat().st_size})
        print(f"sound    <- {folder.name} ({target.stat().st_size // 1024} KB)")

    manifest = {
        "font": "font.ttf",
        "atlas": "font-atlas.png",
        "atlasMap": "font-atlas.json",
        "logo": "logo.png",
        "background": ["bg-1.png", "bg-2.png"],
        "placeholder": "placeholder.png",
        "sounds": manifest_sounds,
    }
    (out / "manifest.json").write_text(json.dumps(manifest, indent=2))
    print(f"\nwrote {out}")


if __name__ == "__main__":
    main()