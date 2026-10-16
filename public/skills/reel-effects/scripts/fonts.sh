#!/usr/bin/env bash
# fonts.sh — put the theme's fonts into a project and write assets/fonts.css.
#
#   bash fonts.sh <project-dir>
#
# The skill's fonts/ folder (or $REEL_FONTS) holds three files, any of .woff2/.woff/.otf/.ttf:
#   display-700.*   captions, pills          display-900.*   titles, cover words, accents
#   mono.*          numbers, the keyword, the handle
# Bring your own brand fonts by dropping files with those names in. An empty folder is
# filled once with Inter (700/900) + JetBrains Mono from Google Fonts (both OFL).
# assemble.mjs inlines assets/fonts.css into index.html (HyperFrames' lint wants the
# @font-face in the file).
set -euo pipefail
PROJ="${1:?usage: fonts.sh <project-dir>}"
SKILL="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FONTS="${REEL_FONTS:-$SKILL/fonts}"
mkdir -p "$FONTS" "$PROJ/assets"

if ! ls "$FONTS"/display-900.* >/dev/null 2>&1; then
  echo "[fonts] $FONTS is empty — fetching Inter + JetBrains Mono (OFL) once"
  python3 - "$FONTS" <<'PY'
import re, sys, urllib.request
out = sys.argv[1]
ua = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"}
url = "https://fonts.googleapis.com/css2?family=Inter:wght@700;900&family=JetBrains+Mono:wght@700&display=swap"
css = urllib.request.urlopen(urllib.request.Request(url, headers=ua)).read().decode()
want = {("Inter", "700"): "display-700.woff2", ("Inter", "900"): "display-900.woff2", ("JetBrains Mono", "700"): "mono.woff2"}
for sub, block in re.findall(r"/\* ([\w-]+) \*/\s*@font-face \{([^}]*)\}", css):
    if sub != "latin":
        continue
    fam = re.search(r"font-family: '([^']+)'", block).group(1)
    weight = re.search(r"font-weight: (\d+)", block).group(1)
    src = re.search(r"url\((https://[^)]+)\)", block).group(1)
    if (fam, weight) in want:
        with urllib.request.urlopen(urllib.request.Request(src, headers=ua)) as r, open(f"{out}/{want[(fam, weight)]}", "wb") as f:
            f.write(r.read())
        print("  ", want[(fam, weight)])
PY
fi

python3 - "$FONTS" "$PROJ/assets" <<'PY'
import glob, os, shutil, sys
src, dst = sys.argv[1], sys.argv[2]
fmt = {".woff2": "woff2", ".woff": "woff", ".otf": "opentype", ".ttf": "truetype"}
rules, used = [], []
for name, family, weight in [("display-700", "Display", "700"), ("display-900", "Display", "900"), ("mono", "Mono", "400 700")]:
    hits = sorted(h for h in glob.glob(f"{src}/{name}.*") if os.path.splitext(h)[1].lower() in fmt)
    if not hits:
        sys.exit(f"[fonts] missing {name}.(woff2|woff|otf|ttf) in {src}")
    ext = os.path.splitext(hits[0])[1].lower()
    shutil.copy(hits[0], f"{dst}/{name}{ext}")
    rules.append(f'@font-face {{ font-family: "{family}"; src: url("assets/{name}{ext}") format("{fmt[ext]}"); font-weight: {weight}; }}')
    used.append(os.path.basename(hits[0]))
open(f"{dst}/fonts.css", "w").write("\n".join(rules) + "\n")
print("[fonts]", ", ".join(used), "→ assets/fonts.css")
PY
