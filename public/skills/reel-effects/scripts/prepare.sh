#!/usr/bin/env bash
# prepare.sh — turn a talking-head take into a HyperFrames effects project.
#
#   bash prepare.sh <take.mp4|mov> <project-dir> [start-s=0] [dur-s=whole take]
#
# Writes into <project-dir>:
#   source.mp4       h264, CFR 30, yuv420p (Chrome decodes it; HEVC from the iPhone it may not)
#   fg.webm          the person cut-out, transparent VP9 (hyperframes remove-background)
#   transcript.json  word timings [{text,start,end}] — from the take's Romotiq words.json
#                    when there is one, else `hyperframes transcribe` (local Whisper)
#   subject.json     the person's box on a middle frame, in 1080×1920 px, for placing things
#   assets/          the theme fonts + fonts.css (scripts/fonts.sh: your fonts/ folder, else Inter)
#   index.html       the empty depth sandwich, ready for effect snippets
set -euo pipefail

TAKE="${1:?usage: prepare.sh <take> <project-dir> [start-s] [dur-s]}"
PROJ="${2:?usage: prepare.sh <take> <project-dir> [start-s] [dur-s]}"
START="${3:-0}"
DUR="${4:-}"
SKILL="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HF="npx -y hyperframes@0.8.163"

mkdir -p "$PROJ/assets"
PROJ="$(cd "$PROJ" && pwd)"

# 1. Normalise the clip. iPhone takes are HEVC/VFR; the cut-out engine trusts CFR.
DUR_ARGS=()
[[ -n "$DUR" ]] && DUR_ARGS=(-t "$DUR")
ffmpeg -nostdin -loglevel error -y -ss "$START" "${DUR_ARGS[@]}" -i "$TAKE" \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" \
  -c:v libx264 -crf 16 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k "$PROJ/source.mp4"
LEN="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$PROJ/source.mp4")"
echo "[prepare] source.mp4 ${LEN}s"

# 2. The cut-out. CPU only: HyperFrames found CoreML corrupts face alpha.
#    ~2–3 min per 10 s of 1080p. First run downloads the model (~168 MB).
if [[ ! -s "$PROJ/fg.webm" ]]; then
  echo "[prepare] cutting out the person (CPU, a few minutes)…"
  (cd "$PROJ" && $HF remove-background source.mp4 -o fg.webm --device cpu --quality best)
fi

# 3. Word timings.
WORDS="$(dirname "$TAKE")/words.json"
if [[ -f "$WORDS" ]]; then
  python3 - "$WORDS" "$START" "$LEN" "$PROJ/transcript.json" <<'PY'
import json, sys
src, start, length, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
words = json.load(open(src))
res = [{"text": w["w"], "start": round(w["t"] - start, 3), "end": round(w["end"] - start, 3)}
       for w in words if start <= w["t"] < start + length]
json.dump(res, open(out, "w"), indent=1)
print(f"[prepare] transcript.json from Romotiq words.json ({len(res)} words)")
PY
else
  (cd "$PROJ" && $HF transcribe source.mp4 --dir . ) || echo "[prepare] transcribe failed; add transcript.json by hand"
fi

# 4. Where is the person? Alpha bbox on the middle frame (libvpx decoder keeps alpha).
MID="$(python3 -c "print(round($LEN/2,2))")"
ffmpeg -nostdin -loglevel error -c:v libvpx-vp9 -ss "$MID" -i "$PROJ/fg.webm" -frames:v 1 \
  -vf "alphaextract,scale=108:192" -f rawvideo -pix_fmt gray - | python3 -c "
import sys, json
b = sys.stdin.buffer.read(); W, H = 108, 192
pts = [(i % W, i // W) for i, v in enumerate(b) if v > 128]
if not pts: print('[prepare] WARN: no person found in the cut-out'); sys.exit(0)
xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
box = {'x0': min(xs)*10, 'x1': (max(xs)+1)*10, 'y0': min(ys)*10, 'y1': (max(ys)+1)*10}
# head: the top 30% of the person's height, centred on the topmost rows
top = [p[0] for p in pts if p[1] <= box['y0']/10 + 6]
box['head_cx'] = round(sum(top)/len(top)*10)
box['head_top'] = box['y0']
json.dump(box, open('$PROJ/subject.json', 'w'))
print('[prepare] subject.json', box)
"

# 5. Fonts + the empty sandwich.
bash "$SKILL/scripts/fonts.sh" "$PROJ"
if [[ ! -f "$PROJ/index.html" ]]; then
  sed "s/__DUR__/$(python3 -c "print(round($LEN,3))")/g" "$SKILL/templates/sandwich.html" > "$PROJ/index.html"
fi
echo "[prepare] done → $PROJ"
echo "[prepare] next: write $PROJ/effects.json, then: node $SKILL/scripts/assemble.mjs $PROJ && (cd $PROJ && $HF lint)"
