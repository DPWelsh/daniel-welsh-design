---
name: site-crawl
description: Use when someone wants to learn a website's layout before building their own. Triggers include "crawl this site", "scrape this site for layout", "capture this site as a reference", "I want a site like this one", "get me the design brief from this URL", or "site crawl". Captures every page template, the real palette and fonts from CSS, and all media including video, into a reference/ folder. Does NOT build anything and does NOT copy anyone's content.
---

# Site crawl. Turn a site you admire into a design brief.

You are capturing **structure**, not content. Section order, layout
rhythm, which templates exist, the real hex values. The user's words and
images come later and are their own.

## Why this is a skill and not a prompt

The crawler below is fixed and known-good. Write it out **verbatim**. Do
not improve it, shorten it, or rewrite it from memory. Every rule in it
is there because its absence broke a real build:

| Rule | What happens without it |
|---|---|
| `html` in the formats | markdown strips tags, so a `<video>` hero is invisible |
| srcset dedupe | 463 image references instead of 77 real images |
| second pass over the CSS | a page with 6 assets yields 1 |
| follow assets to other hosts | media on a CDN is never found at all |
| palette read from CSS | you guess hex off a screenshot and they are wrong |
| one page per template | you build a homepage, and every nav link 404s |

**A screenshot cannot tell you a hero is a video.** That single
distinction separates a build that looks right from one that looks almost
right.

## Run it

### 1. Check the key

```bash
test -n "$FIRECRAWL_API_KEY" && echo ok || echo "add FIRECRAWL_API_KEY to .env.local"
```

If it is missing, stop and ask. A free Firecrawl account covers this.

### 2. Write `scripts/crawl.mjs`

Write the file in the appendix below, exactly as it is.

```bash
npm i @mendable/firecrawl-js
```

### 3. Run it

```bash
node --env-file-if-exists=.env.local scripts/crawl.mjs <url>
```

It discovers every URL first, groups them by template, then scrapes one
page from **every** group plus any utility pages it recognises.

### 4. Read the coverage report out loud

The script prints a template table and a utility-page check. Do not skip
past it. Tell the user plainly:

- how many templates the site has, and which ones you captured
- **which of about / contact / privacy / terms are missing**, if any

That last line is the one that matters. Those pages sit at the bottom of
the nav, a fixed page limit drops them silently, and nobody notices until
the footer links point at nothing. If any are missing, say so now and
tell the user they will be writing those pages from scratch, in their own
words. Never copy another site's policy text. It is somebody's actual
legal document.

### 5. Hand over the brief

Summarise in five lines or fewer:

- the section order of the homepage, top to bottom
- how many templates, and what each is for
- **whether the hero is a video**, checked in `reference/html/`, not guessed
- the top 3 colours and 2 font families from `reference/brand.json`, and
  **any pairing the site uses for body text that measures below 4.5:1**.
  `brand.json` has the measured ratios, do not eyeball them
- anything that 403'd. Commercial webfonts are domain-locked, this is
  normal, say so rather than retrying. Name the font so a free
  substitute can be picked later

Then stop. Building is a separate step with a separate brief.

## What you end up with

```
reference/
  sitemap.json     every URL found
  templates.json   URLs grouped by template, and what got picked
  pages/           markdown, one per template
  html/            HTML, where the <video> tags survive
  screenshots/
  css/             every stylesheet, downloaded
  brand.json       real hex values and font names, by frequency
  media/           images, video, fonts
  manifest.json    every file, mapped to its source URL
```

## Do not

- Build the site. This skill ends at the brief.
- Copy any text, policy, photograph or wordmark into the user's project.
- Retry a 403 on a webfont. It is domain-locked on purpose.
- Trust the markdown about media. Check `reference/html/`.

---

## Appendix. `scripts/crawl.mjs`, write this verbatim

```js
/**
 * Site capture. Crawl every template + full media harvest.
 *
 * Usage: node --env-file-if-exists=.env.local scripts/crawl.mjs <url> [maxPages]
 */

import Firecrawl from '@mendable/firecrawl-js';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const SITE = process.argv[2];
const MAX = Number(process.argv[3] || 25);
const OUT = 'reference';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0 Safari/537.36';

const slug = (u) => {
  const p = new URL(u).pathname.replace(/^\/|\/$/g, '');
  return p ? p.replace(/[^a-z0-9]+/gi, '-').toLowerCase() : 'home';
};

// ------------------------------------------------------------- templates

/**
 * Path SHAPE, not path. /store/vinyl-x and /store/cd-y are one template.
 * Keeping the first segment and collapsing the rest is crude and is right
 * far more often than it is wrong.
 */
export function templateOf(u) {
  const segs = new URL(u).pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  if (!segs.length) return '/';
  return '/' + segs.map((s, i) => (i === 0 ? s.toLowerCase() : ':slug')).join('/');
}

/** The pages that live at the bottom of the nav and get dropped silently. */
const UTILITY = {
  about: /\b(about|bio|story)\b/i,
  contact: /\bcontact\b/i,
  privacy: /\bprivacy\b/i,
  terms: /\b(terms|tos|conditions)\b/i,
  accessibility: /\baccessib/i,
};

/**
 * One URL per template, shortest first because that is usually the index,
 * plus every utility page regardless of how many templates that adds.
 */
export function pickTargets(urls, max) {
  const groups = new Map();
  for (const u of urls) {
    const t = templateOf(u);
    if (!groups.has(t)) groups.set(t, []);
    groups.get(t).push(u);
  }
  for (const list of groups.values()) list.sort((a, b) => a.length - b.length);

  const utility = {};
  for (const [name, re] of Object.entries(UTILITY)) {
    const hit = urls.find((u) => re.test(new URL(u).pathname));
    if (hit) utility[name] = hit;
  }

  const picked = [];
  for (const [t, list] of groups) picked.push({ template: t, url: list[0], of: list.length });

  // Utility pages jump the queue, they are the ones the limit usually eats.
  const utilityUrls = new Set(Object.values(utility));
  picked.sort((a, b) => (utilityUrls.has(b.url) ? 1 : 0) - (utilityUrls.has(a.url) ? 1 : 0));

  return { groups, utility, picked: picked.slice(0, max), dropped: Math.max(0, picked.length - max) };
}

// ------------------------------------------------------------ extraction

/** Every media reference in the HTML, including the ones markdown drops. */
export function extractAssets(html, pageUrl) {
  const abs = (u) => {
    if (!u) return null;
    u = u.trim();
    if (u.startsWith('//')) return 'https:' + u;
    if (u.startsWith('http')) return u;
    try { return new URL(u, pageUrl).href; } catch { return null; }
  };

  const images = new Set();
  const videos = new Set();
  const styles = new Set();
  const fonts = new Set();

  for (const re of [
    /<img[^>]+(?:src|data-src|data-lazy)=["']([^"']+)/gi,
    /url\(["']?([^)"']+\.(?:jpe?g|png|webp|gif|svg))/gi,
  ]) {
    for (const m of html.matchAll(re)) { const u = abs(m[1]); if (u) images.add(u); }
  }

  for (const m of html.matchAll(/srcset=["']([^"']+)/gi)) {
    for (const part of m[1].split(',')) {
      const u = abs(part.trim().split(/\s+/)[0]);
      if (u && /\.(jpe?g|png|webp|gif)/i.test(u)) images.add(u);
    }
  }

  // THE ONE THAT MATTERS. <video>, <source> and poster frames.
  for (const re of [
    /<source[^>]+src=["']([^"']+\.(?:mp4|webm|mov))/gi,
    /<video[^>]+src=["']([^"']+)/gi,
    /<video[^>]+poster=["']([^"']+)/gi,
  ]) {
    for (const m of html.matchAll(re)) {
      const u = abs(m[1]);
      if (!u) continue;
      (/\.(mp4|webm|mov)/i.test(u) ? videos : images).add(u);
    }
  }

  for (const re of [
    /<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)/gi,
    /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']stylesheet/gi,
  ]) {
    for (const m of html.matchAll(re)) {
      const u = abs(m[1].replace(/&#0?38;/g, '&'));
      if (u) styles.add(u);
    }
  }
  for (const m of html.matchAll(/url\(["']?([^)"']+\.(?:woff2?|ttf|otf|eot))/gi)) {
    const u = abs(m[1]); if (u) fonts.add(u);
  }

  return { images: [...images], videos: [...videos], styles: [...styles], fonts: [...fonts] };
}

/** Collapse WordPress -800x600 srcset variants to the largest of each image. */
export function dedupeVariants(urls) {
  const groups = new Map();
  for (const u of urls) {
    const base = u.replace(/-\d+x\d+(?=\.\w+(?:$|\?))/, '');
    const m = u.match(/-(\d+)x(\d+)\.\w+(?:$|\?)/);
    const area = m ? Number(m[1]) * Number(m[2]) : Number.MAX_SAFE_INTEGER;
    const prev = groups.get(base);
    if (!prev || area > prev.area) groups.set(base, { area, url: u });
  }
  return [...groups.values()].map((g) => g.url);
}

/** WCAG relative luminance, then the ratio. Arithmetic, not opinion. */
const luminance = (hex) =>
  [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((acc, v, i) => acc + [0.2126, 0.7152, 0.0722][i] * v, 0);

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

/** Real hex values and font names, read from CSS rather than guessed. */
export function readBrand(css) {
  const hex = {};
  for (const m of css.matchAll(/#([0-9a-f]{6})\b/gi)) {
    const k = '#' + m[1].toLowerCase();
    hex[k] = (hex[k] || 0) + 1;
  }
  const fams = {};
  for (const m of css.matchAll(/font-family:\s*([^;}]+)/gi)) {
    const k = m[1].split(',')[0].replace(/["']|!important/g, '').trim();
    if (k && !/^(inherit|initial|unset)$/i.test(k)) fams[k] = (fams[k] || 0) + 1;
  }
  const sort = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]);
  const colours = sort(hex).slice(0, 15);

  // Every pairing of the top 6, measured. The reference site on the first
  // run set its accent as body text at 3.94:1, below AA, and copying the
  // palette without measuring inherits the bug.
  const pairs = [];
  const top = colours.slice(0, 6).map(([c]) => c);
  for (let i = 0; i < top.length; i++) {
    for (let j = i + 1; j < top.length; j++) {
      const ratio = contrast(top[i], top[j]);
      pairs.push({
        pair: [top[i], top[j]],
        ratio,
        bodyTextAA: ratio >= 4.5,
        largeTextAA: ratio >= 3,
      });
    }
  }

  return {
    colours,
    contrast: pairs.sort((a, b) => b.ratio - a.ratio),
    fonts: sort(fams).slice(0, 15),
    webfonts: [...css.matchAll(/@font-face\{[^}]*?font-family:\s*([^;]+)[^}]*?url\(([^)]+)/gi)]
      .map((m) => ({ family: m[1].replace(/["']/g, '').trim(), src: m[2].replace(/["']/g, '') })),
  };
}

// ---------------------------------------------------------------- runner

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: SITE } });
  if (!res.ok) throw new Error(`${res.status}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  return (await readFile(dest)).length;
}

async function main() {
  if (!SITE) {
    console.error('usage: node scripts/crawl.mjs <url> [maxPages]');
    process.exit(1);
  }
  if (!process.env.FIRECRAWL_API_KEY) {
    console.error('FIRECRAWL_API_KEY is not set. Add it to .env.local and re-run.');
    process.exit(1);
  }

  for (const d of ['pages', 'html', 'screenshots', 'css', 'media']) {
    await mkdir(path.join(OUT, d), { recursive: true });
  }

  const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

  // DISCOVER FIRST. A bare limit is a guess: pick 6 and you silently miss
  // everything past the sixth page, with no signal that you did.
  let discovered = [];
  try {
    const map = await firecrawl.map(SITE, { sitemap: 'include', ignoreQueryParameters: true });
    discovered = (map.links || []).map((l) => (typeof l === 'string' ? l : l.url)).filter(Boolean);
    await writeFile(`${OUT}/sitemap.json`, JSON.stringify(discovered, null, 1));
  } catch (e) {
    console.warn(`map failed (${e.message}); falling back to the start URL only`);
  }
  if (!discovered.length) discovered = [SITE];
  console.log(`map: ${discovered.length} pages found\n`);

  // GROUP BY TEMPLATE, then take one of each. This is what stops the crawl
  // from returning six product pages and no about page.
  const { groups, utility, picked, dropped } = pickTargets(discovered, MAX);

  console.log(`templates: ${groups.size}`);
  for (const { template, url, of } of picked) {
    console.log(`  ${template.padEnd(28)} ${String(of).padStart(4)} page(s)  ->  ${url}`);
  }
  if (dropped) console.log(`  NOTE: ${dropped} template(s) dropped by maxPages=${MAX}. Raise it.`);

  console.log('\nutility pages:');
  for (const name of Object.keys(UTILITY)) {
    console.log(`  ${name.padEnd(14)} ${utility[name] || 'NOT FOUND, the user writes this one themselves'}`);
  }

  await writeFile(
    `${OUT}/templates.json`,
    JSON.stringify({ templates: [...groups].map(([t, u]) => ({ template: t, urls: u })), utility, picked }, null, 1),
  );

  // html is not optional. Without it a <video> hero is invisible.
  console.log(`\nscraping ${picked.length} pages`);
  const manifest = { site: SITE, pages: [], media: [], css: [] };
  const allAssets = { images: [], videos: [], styles: [], fonts: [] };

  for (const { url, template } of picked) {
    let doc;
    try {
      doc = await firecrawl.scrape(url, { formats: ['markdown', 'html', 'screenshot'] });
    } catch (e) {
      console.warn(`  ${url}: ${e.message}`);
      continue;
    }
    const name = slug(url);
    if (doc.markdown) await writeFile(`${OUT}/pages/${name}.md`, doc.markdown);
    if (doc.html) await writeFile(`${OUT}/html/${name}.html`, doc.html);
    if (doc.screenshot) {
      try { await download(doc.screenshot, `${OUT}/screenshots/${name}.png`); }
      catch { /* screenshot URLs expire, not fatal */ }
    }
    if (doc.html) {
      const a = extractAssets(doc.html, url);
      for (const k of Object.keys(allAssets)) allAssets[k].push(...a[k]);
      console.log(`  ${name}: ${a.images.length} img, ${a.videos.length} video, ${a.styles.length} css`);
    }
    manifest.pages.push({ url, slug: name, template });
  }

  const images = dedupeVariants([...new Set(allAssets.images)]);
  const videos = [...new Set(allAssets.videos)];
  const styles = [...new Set(allAssets.styles)].filter((u) => !/fonts\.googleapis/.test(u));

  console.log(`\n${allAssets.images.length} image refs -> ${images.length} unique`);
  console.log(`${videos.length} videos, ${styles.length} stylesheets`);

  // Stylesheets first, they hold the real palette and font names.
  let allCss = '';
  for (const [i, u] of styles.entries()) {
    const dest = `${OUT}/css/sheet-${i + 1}.css`;
    try {
      await download(u, dest);
      allCss += await readFile(dest, 'utf8');
      manifest.css.push({ url: u, file: dest });
    } catch (e) { console.warn(`  css failed ${u}: ${e.message}`); }
  }

  if (allCss) {
    await writeFile(`${OUT}/brand.json`, JSON.stringify(readBrand(allCss), null, 1));
    console.log('brand.json written from real CSS');

    // SECOND PASS. Background images, textures and webfonts are declared in
    // the stylesheet, not the markup, so they are invisible until the CSS is
    // in hand. That is the difference between finding one asset and six.
    const fromCss = extractAssets(allCss, styles[0] || SITE);
    const extraImages = dedupeVariants(fromCss.images).filter((u) => !images.includes(u));
    const extraFonts = [...new Set([...fromCss.fonts, ...allAssets.fonts])];
    images.push(...extraImages);
    console.log(`second pass over CSS: +${extraImages.length} images, ${extraFonts.length} fonts`);

    for (const [i, u] of extraFonts.entries()) {
      const dest = `${OUT}/media/font-${i + 1}-${path.basename(u.split('?')[0])}`;
      try {
        const bytes = await download(u, dest);
        manifest.media.push({ url: u, file: dest, bytes, kind: 'font' });
      } catch { /* commercial fonts are domain-locked and will 403, expected */ }
    }
  }

  // Videos before images, they are the ones a naive crawl misses.
  let ok = 0;
  for (const [i, u] of [...videos, ...images].entries()) {
    const ext = (u.split('?')[0].match(/\.\w+$/) || ['.bin'])[0];
    const dest = `${OUT}/media/${String(i + 1).padStart(3, '0')}-${path.basename(u.split('?')[0]) || 'asset' + ext}`;
    try {
      const bytes = await download(u, dest);
      manifest.media.push({ url: u, file: dest, bytes, kind: /\.(mp4|webm|mov)$/i.test(u) ? 'video' : 'image' });
      ok++;
    } catch (e) { manifest.media.push({ url: u, error: e.message }); }
  }

  await writeFile(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 1));
  console.log(`\ndownloaded ${ok}/${videos.length + images.length} assets`);
  console.log(`manifest: ${OUT}/manifest.json`);

  const missing = Object.keys(UTILITY).filter((k) => !utility[k]);
  if (missing.length) {
    console.log(`\nMISSING, you write these yourself: ${missing.join(', ')}`);
  }
}

// Guarded so the pure functions above can be imported and tested without
// firing a crawl.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
```

Full build sheet this belongs to: danielwelsh.design/ladder/taylor-swift
