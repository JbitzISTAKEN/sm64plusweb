// Minimal INI reader/writer with the same semantics the game and the launcher expect.
// The game writes `name = "value"`, so values are quoted the same way here; its parser
// skips whitespace, `=` and quotes, which this parser mirrors.

export class Ini {
  constructor(text = "") {
    this.sections = new Map();
    if (text) this.parse(text);
  }

  parse(text) {
    let current = null;
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith(";") || line.startsWith("#")) continue;
      const sectionMatch = /^\[(.+)\]$/.exec(line);
      if (sectionMatch) {
        current = sectionMatch[1];
        if (!this.sections.has(current)) this.sections.set(current, new Map());
        continue;
      }
      if (!current) continue;
      const eq = line.indexOf("=");
      if (eq < 0) continue;
      const key = line.slice(0, eq).trim();
      const value = line.slice(eq + 1).trim();
      if (!this.sections.has(current)) this.sections.set(current, new Map());
      this.sections.get(current).set(key, value);
    }
    return this;
  }

  sectionNames() {
    return [...this.sections.keys()];
  }

  has(section, key) {
    const s = this.sections.get(section);
    return !!s && s.has(key);
  }

  raw(section, key) {
    return this.sections.get(section)?.get(key);
  }

  keys(section) {
    return [...(this.sections.get(section)?.keys() || [])];
  }

  readString(section, key, fallback) {
    const value = this.raw(section, key);
    if (value === undefined) return fallback;
    const match = /^"(.*)"$/.exec(value);
    return match ? match[1] : value;
  }

  readReal(section, key, fallback) {
    const value = this.raw(section, key);
    if (value === undefined) return fallback;
    const num = parseFloat(this.readString(section, key, ""));
    return Number.isFinite(num) ? num : fallback;
  }

  writeString(section, key, value) {
    if (!this.sections.has(section)) this.sections.set(section, new Map());
    this.sections.get(section).set(key, value);
  }

  writeReal(section, key, value) {
    const num = Number(value);
    this.writeString(section, key, Number.isFinite(num) ? formatReal(num) : "0");
  }

  remove(section, key) {
    this.sections.get(section)?.delete(key);
  }

  toString() {
    const lines = [];
    for (const [section, entries] of this.sections) {
      if (!entries.size) continue;
      lines.push("[" + section + "]");
      for (const [key, value] of entries) {
        const text = String(value);
        const quoted = !text.includes('"') && !/[\r\n]/.test(text);
        lines.push(key + " = " + (quoted ? '"' + text + '"' : text));
      }
      lines.push("");
    }
    return lines.join("\n");
  }
}

export function formatReal(num) {
  if (Number.isInteger(num)) return String(num);
  return String(Math.round(num * 1000000) / 1000000);
}