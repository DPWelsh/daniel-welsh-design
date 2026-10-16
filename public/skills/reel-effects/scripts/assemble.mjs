#!/usr/bin/env node
// assemble.mjs — build a project's index.html from the sandwich + effect snippets.
//
//   node assemble.mjs <project-dir>
//
// Reads <project-dir>/effects.json:
//   { "duration": 8,
//     "effects": [
//       { "use": "16-cover-story", "params": { "WORD": "WOOLIES", "T": 0.25 } },
//       { "use": "01-orbit",       "params": { "T": 2.75, "CX": 540 } } ] }
//
// Each snippet in ../snippets/<use>.html has three parts: <style>, markup, <script>
// whose IIFE ends `})();`. Params are passed by rewriting that to `})(<params>);`.
// Markup lands by class: "front" → after #fg, "hud" → outside #cam, else behind (before #fg).
// One use per snippet per project (ids are fixed).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const proj = path.resolve(process.argv[2] || ".");
const spec = JSON.parse(fs.readFileSync(path.join(proj, "effects.json"), "utf8"));
let html = fs.readFileSync(path.join(SKILL, "templates/sandwich.html"), "utf8");
// "@file.json" param values are inlined from the project (e.g. WORDS: "@transcript.json")
const inline = (v) => typeof v === "string" && v.startsWith("@")
  ? JSON.parse(fs.readFileSync(path.join(proj, v.slice(1)), "utf8"))
  : Array.isArray(v) ? v.map(inline) : v;

const css = [], behind = [], front = [], hud = [], js = [];
const seen = new Set();
for (const fx of spec.effects) {
  if (seen.has(fx.use)) throw new Error(`${fx.use} used twice — ids would collide`);
  seen.add(fx.use);
  // strip the header comment first: it may mention "<style>" in prose
  const src = fs.readFileSync(path.join(SKILL, "snippets", `${fx.use}.html`), "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const style = src.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
  const script = src.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";
  const markup = src
    .replace(/<style>[\s\S]*?<\/style>/g, "")
    .replace(/<script>[\s\S]*?<\/script>/g, "")
    .trim();
  css.push(`/* ${fx.use} */\n${style.trim()}`);
  if (markup) {
    const slot = /class="[^"]*\bfront\b/.test(markup) ? front : /class="[^"]*\bhud\b/.test(markup) ? hud : behind;
    slot.push(`<!-- ${fx.use} -->\n${markup}`);
  }
  if (script.trim()) {
    const call = script.trim().replace(/\}\)\(\);\s*$/, `})(${JSON.stringify(Object.fromEntries(Object.entries(fx.params || {}).map(([k, v]) => [k, inline(v)])))});`);
    if (call === script.trim()) throw new Error(`${fx.use}: script must end with an IIFE "})();"`);
    js.push(`// ${fx.use}\n${call}`);
  }
}

const fontsCss = path.join(proj, "assets/fonts.css");
if (!fs.existsSync(fontsCss)) throw new Error(`no ${fontsCss} — run scripts/fonts.sh ${proj} (prepare.sh does)`);
html = html.replace("/* ── fonts: assets/fonts.css, inlined by assemble.mjs ── */", fs.readFileSync(fontsCss, "utf8").trim().split("\n").join("\n      "));

const indent = (s, n) => s.split("\n").map((l) => " ".repeat(n) + l).join("\n");
html = html
  .replace("/* ── effect styles go here ── */", indent(css.join("\n\n"), 6).trimStart())
  .replace("<!-- ── behind-layer effect markup goes here (class=\"behind\") ── -->", indent(behind.join("\n"), 8).trimStart())
  .replace("<!-- ── front-layer effect markup goes here (class=\"front\") ── -->", indent(front.join("\n"), 8).trimStart())
  .replace("<!-- ── screen-space UI (class=\"hud\"): captions, label pills, CTA ── -->", indent(hud.join("\n"), 6).trimStart())
  .replace("// ── effect timelines go here. Start each on a word from transcript.json. ──", indent(js.join("\n\n"), 6).trimStart());

html = html.replaceAll("__DUR__", String(spec.duration));     // template + snippet markup
fs.writeFileSync(path.join(proj, "index.html"), html);
console.log(`[assemble] ${spec.effects.length} effects → ${path.join(proj, "index.html")}`);
