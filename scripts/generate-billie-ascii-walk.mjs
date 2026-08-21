import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const SOURCE = path.join(
  ROOT,
  "site-assets/billie-higgsfield-walk-tail-up.mp4",
);
const OUT = path.join(ROOT, "site-assets/billie-ascii-walk");
const FONT = "/System/Library/Fonts/Supplemental/Courier New.ttf";

const SOURCE_FPS = 24;
const FPS = 12;
const FRAME_COUNT = 60;
const SOURCE_FRAME_INDICES = Array.from(
  { length: FRAME_COUNT },
  (_, index) => index * 2,
);
const CROP = { x: 36, y: 288, width: 672, height: 696 };
const OBSERVED_SUBJECT_UNION = {
  left: 57,
  top: 314,
  right: 689,
  bottom: 959,
};
const COLUMNS = 128;
const FONT_RATIO = 31 / 54;
const ROWS = Math.round(
  (CROP.height / CROP.width) * COLUMNS * FONT_RATIO,
);
const CELL_WIDTH = 6.2;
const LINE_HEIGHT = 10.8;
const FONT_SIZE = 10;
const RAMP = " .,:;+=xX$#@";
const INK = "#34322d";
const PAPER = "#f3f0e9";
const KEY = {
  color: "0x00ff18",
  similarity: 0.28,
  blend: 0.04,
};

const pad = (value) => String(value).padStart(3, "0");

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

async function commandVersion(command, args) {
  const { stdout, stderr } = await execFileAsync(command, args, {
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
  });
  return `${stdout}${stderr}`.trim().split("\n")[0];
}

function normalizeGrid(stdout) {
  const lines = stdout
    .replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/gu, "")
    .replaceAll("\r", "")
    .replace(/\n+$/u, "")
    .split("\n");

  if (lines.length > ROWS) lines.length = ROWS;
  while (lines.length < ROWS) lines.push("");
  return lines.map((line) =>
    line.slice(0, COLUMNS).padEnd(COLUMNS, " ").replace(/\s+$/u, "")
  );
}

function inspectAscii(lines, label) {
  const ascii = `${lines.join("\n")}\n`;
  for (const [index, byte] of Buffer.from(ascii, "utf8").entries()) {
    if (byte !== 0x0a && (byte < 0x20 || byte > 0x7e)) {
      throw new Error(
        `${label}: invalid non-ASCII byte 0x${byte.toString(16)} at ${index}.`,
      );
    }
  }
  return ascii;
}

function makeSvg(lines, frameIndex, sourceFrameIndex) {
  const width = Number((COLUMNS * CELL_WIDTH).toFixed(1));
  const height = Number((ROWS * LINE_HEIGHT).toFixed(1));
  const text = lines.flatMap((line, row) => {
    const y = ((row + 0.82) * LINE_HEIGHT).toFixed(1);
    return [...line.matchAll(/\S+/gu)].map((match) => {
      const x = (match.index * CELL_WIDTH).toFixed(1);
      return `  <text x="${x}" y="${y}">${escapeXml(match[0])}</text>`;
    });
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">Billie ASCII walk frame ${frameIndex + 1} of ${FRAME_COUNT}</title>
  <desc id="desc">Approved Kintamani-style tail-up Billie walk, source frame ${sourceFrameIndex}, converted with the Daniel B2 Chafa treatment.</desc>
  <g fill="${INK}" font-family="Courier New, Courier, monospace" font-size="${FONT_SIZE}" font-weight="400" letter-spacing="0.2" xml:space="preserve" style="white-space:pre;font-variant-ligatures:none">
${text}
  </g>
</svg>
`;
}

async function extractKeyedFrames(directory) {
  await mkdir(directory, { recursive: true });
  // Commas belong inside one linear chain. Build it explicitly so the two
  // labelled inputs meet only at the white-background overlay.
  const filterComplex = [
    `[0:v]select='lte(n,118)*not(mod(n,2))',setpts=N/(${FPS}*TB),format=yuv444p,chromakey=${KEY.color}:${KEY.similarity}:${KEY.blend},format=yuva444p,crop=${CROP.width}:${CROP.height}:${CROP.x}:${CROP.y},hqdn3d=1.0:1.0:2.0:2.0[fg]`,
    `color=c=white:s=${CROP.width}x${CROP.height}:r=${FPS}:d=5,format=yuva444p[bg]`,
    `[bg][fg]overlay=shortest=1:format=auto,format=rgb24,format=gray,curves=all='0/0 0.18/0.10 0.70/0.82 0.90/0.985 1/1'[out]`,
  ].join(";");

  await execFileAsync("ffmpeg", [
    "-hide_banner",
    "-loglevel", "error",
    "-y",
    "-i", SOURCE,
    "-filter_complex", filterComplex,
    "-map", "[out]",
    "-frames:v", String(FRAME_COUNT),
    "-fps_mode", "passthrough",
    "-start_number", "0",
    path.join(directory, "frame-%03d.png"),
  ], { maxBuffer: 20 * 1024 * 1024 });

  const files = (await readdir(directory))
    .filter((name) => /^frame-\d{3}\.png$/u.test(name))
    .sort();
  if (files.length !== FRAME_COUNT) {
    throw new Error(
      `Expected ${FRAME_COUNT} frames from source indices 0,2,…,118; found ${files.length}.`,
    );
  }
  return { files, filterComplex };
}

async function makeContactSheet() {
  const selected = [0, 7, 14, 21, 28, 35, 42, 49, 56, 59];
  const columns = 5;
  const rows = 2;
  const tileWidth = 280;
  const tileHeight = 300;
  const labelHeight = 30;
  const gap = 14;
  const margin = 22;
  const headerHeight = 82;
  const width = margin * 2 + columns * tileWidth + (columns - 1) * gap;
  const height = headerHeight + margin * 2 + rows * (tileHeight + labelHeight) + gap;
  const images = [];

  for (let index = 0; index < selected.length; index += 1) {
    const frameIndex = selected[index];
    const svg = await readFile(
      path.join(OUT, `frame-${pad(frameIndex)}.svg`),
    );
    const dataUri = `data:image/svg+xml;base64,${svg.toString("base64")}`;
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = margin + column * (tileWidth + gap);
    const y = headerHeight + margin + row * (tileHeight + labelHeight + gap);
    images.push(`  <rect x="${x}" y="${y}" width="${tileWidth}" height="${tileHeight}" fill="#faf8f3" stroke="#d6d0c6"/>`);
    images.push(`  <image href="${dataUri}" x="${x + 10}" y="${y + 8}" width="${tileWidth - 20}" height="${tileHeight - 16}" preserveAspectRatio="xMidYMid meet"/>`);
    images.push(`  <text x="${x + 4}" y="${y + tileHeight + 21}" fill="#6f716a" font-family="Courier New, monospace" font-size="13">F${pad(frameIndex)} / SRC ${pad(SOURCE_FRAME_INDICES[frameIndex])}</text>`);
  }

  const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${PAPER}"/>
  <text x="${margin}" y="34" fill="#a43e35" font-family="Courier New, monospace" font-size="18" font-weight="700" letter-spacing="1.5">BILLIE — KINTAMANI TAIL-UP ASCII WALK</text>
  <text x="${margin}" y="61" fill="#6f716a" font-family="Arial, sans-serif" font-size="14">${FRAME_COUNT} chronological frames · ${FPS} fps · ${COLUMNS} × ${ROWS} cells · fixed crop · true blank background</text>
${images.join("\n")}
</svg>
`;
  const sheetSvg = path.join(OUT, "contact-sheet.svg");
  await writeFile(sheetSvg, sheet);
  await execFileAsync("rsvg-convert", [
    "-w", String(width),
    "-h", String(height),
    "-o", path.join(OUT, "contact-sheet.png"),
    sheetSvg,
  ], { maxBuffer: 20 * 1024 * 1024 });
}

async function main() {
  await stat(SOURCE);
  await stat(FONT);
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  const temp = await mkdtemp(path.join(tmpdir(), "billie-ascii-walk-"));

  try {
    const { files, filterComplex } = await extractKeyedFrames(temp);
    const frames = [];
    const nonSpaceBounds = [];

    for (let index = 0; index < FRAME_COUNT; index += 1) {
      const source = path.join(temp, files[index]);
      const { stdout } = await execFileAsync("chafa", [
        "-f", "symbols",
        "-c", "none",
        "-O", "0",
        "--align", "top,left",
        "--font-ratio", "31/54",
        "--size", `${COLUMNS}x${ROWS}`,
        "--symbols", `[${RAMP}]`,
        "--fill", "none",
        "--dither", "none",
        "--preprocess", "off",
        "--work", "9",
        "--threshold", "0.05",
        "--bg", "ffffff",
        "--fg", "000000",
        "--glyph-file", FONT,
        source,
      ], {
        encoding: "utf8",
        maxBuffer: 50 * 1024 * 1024,
      });
      const grid = normalizeGrid(stdout);
      const ascii = inspectAscii(grid, `frame-${pad(index)}`);
      const svg = makeSvg(grid, index, SOURCE_FRAME_INDICES[index]);
      const txtName = `frame-${pad(index)}.txt`;
      const svgName = `frame-${pad(index)}.svg`;
      await writeFile(path.join(OUT, txtName), ascii);
      await writeFile(path.join(OUT, svgName), svg);

      const active = [];
      for (let row = 0; row < grid.length; row += 1) {
        for (let column = 0; column < grid[row].length; column += 1) {
          if (grid[row][column] !== " ") active.push({ column, row });
        }
      }
      if (active.length === 0) throw new Error(`frame-${pad(index)} is blank.`);
      const bounds = {
        left: Math.min(...active.map(({ column }) => column)),
        top: Math.min(...active.map(({ row }) => row)),
        right: Math.max(...active.map(({ column }) => column)),
        bottom: Math.max(...active.map(({ row }) => row)),
        nonSpaceCells: active.length,
      };
      nonSpaceBounds.push(bounds);
      frames.push({
        index,
        sourceFrameIndex: SOURCE_FRAME_INDICES[index],
        outputTimeSeconds: Number((index / FPS).toFixed(6)),
        sourceTimeSeconds: Number(
          (SOURCE_FRAME_INDICES[index] / SOURCE_FPS).toFixed(6),
        ),
        txt: txtName,
        svg: svgName,
        txtSha256: sha256(Buffer.from(ascii)),
        svgSha256: sha256(Buffer.from(svg)),
        bounds,
      });
    }

    await makeContactSheet();
    const sourceBuffer = await readFile(SOURCE);
    const viewBox = {
      width: Number((COLUMNS * CELL_WIDTH).toFixed(1)),
      height: Number((ROWS * LINE_HEIGHT).toFixed(1)),
    };
    const manifest = {
      generatedAt: new Date().toISOString(),
      source: path.relative(ROOT, SOURCE),
      sourceSha256: sha256(sourceBuffer),
      engine: await commandVersion("chafa", ["--version"]),
      ffmpeg: await commandVersion("ffmpeg", ["-version"]),
      treatment: "Daniel B2 high detail / Kintamani tail-up / fixed levels / true blank green-key background",
      sourceFrameRate: SOURCE_FPS,
      sourceFrameCount: 121,
      sourceFrameIndices: SOURCE_FRAME_INDICES,
      frameRate: FPS,
      frameCount: FRAME_COUNT,
      frameDurationMs: 1000 / FPS,
      durationMs: (FRAME_COUNT * 1000) / FPS,
      columns: COLUMNS,
      rows: ROWS,
      cell: { width: CELL_WIDTH, height: LINE_HEIGHT, fontSize: FONT_SIZE },
      viewBox,
      aspectRatio: Number((viewBox.width / viewBox.height).toFixed(6)),
      crop: CROP,
      observedSubjectUnion: OBSERVED_SUBJECT_UNION,
      stableRegistration: true,
      chromaKey: KEY,
      ffmpegFilterComplex: filterComplex,
      chafa: {
        ramp: RAMP,
        fontRatio: "31/54",
        dither: "none",
        preprocess: "off",
        work: 9,
        threshold: 0.05,
      },
      qa: {
        exactSourceIndices: SOURCE_FRAME_INDICES.every(
          (sourceFrame, index) => sourceFrame === index * 2,
        ),
        fixedCropAcrossFrames: true,
        oneViewBoxAcrossFrames: true,
        trueBlankBackground: true,
        contactSheet: "contact-sheet.png",
        nonSpaceBounds,
      },
      loopParity: {
        firstSourceFrameIndex: 0,
        lastEmittedSourceFrameIndex: 118,
        matchingUnemittedEndpointFrameIndex: 120,
        sourceEndpointNearStart: true,
        sourceEndpointSimilaritySSIM: 0.94724,
        similarityMethod: "FFmpeg SSIM on full RGB source frames 0 and 120",
      },
      frames,
    };
    await writeFile(
      path.join(OUT, "manifest.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );
    console.log(
      `Generated ${FRAME_COUNT} Billie ASCII frames at ${COLUMNS}x${ROWS} (${FPS} fps).`,
    );
    console.log(`Crop: ${JSON.stringify(CROP)}`);
    console.log(`ViewBox: 0 0 ${viewBox.width} ${viewBox.height}`);
    console.log(`Contact sheet: ${path.join(OUT, "contact-sheet.png")}`);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
}

await main();
