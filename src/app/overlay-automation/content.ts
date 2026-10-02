/* ── /overlay-automation — Runbook № 005 ──────────────────────────────
   Cue-locked chroma-key overlays for vertical talking-head video.

   Written after comparing our pipeline against the Claude Design method
   (Futurepedia, "Claude Design Just Unlocked AI Motion Graphics", 4 Aug
   2026). Both are HTML/CSS/JS animation driven by an SRT — the same
   substrate from opposite ends. The differences that matter are baked
   into step 00 rather than hidden:

     · his export is a flat MP4, so the face becomes an inset on the
       graphic. Ours keys over full-frame footage, which is the right way
       round when the face is the content.
     · he reserves the face zone by ASKING ("leave the right third free")
       and his own walkthrough catches it getting that wrong. Steps 01–02
       measure it instead.
     · neither approach proves a cue fired. Step 07 does.

   Anything the reader could take as gospel and be burned by is stated
   with the failure attached. */

import type { RunbookContent, RunbookStep } from "@/components/runbook/types";

const VERIFIED_ON = "7 August 2026";

const LEDE =
  "Graphics that appear on the exact word you say them, sit above your face instead of shrinking it into a corner, and can be proven right before you publish. The pipeline is HTML rendered to a magenta-key MP4 — the same substrate the AI motion-graphics tools use, with the two steps they skip.";

const TIME_TOTAL = "20 min for a first overlay · 1–2 hrs for a reusable style";

const CLOSING =
  "The animation is the easy half. The half that decides whether it looks professional is knowing exactly where your face is, and proving every cue fired before anyone sees it.";

const STEPS: RunbookStep[] = [
  {
    id: "gate",
    n: "00",
    title: "Check this is the right tool",
    why: "Chroma overlays are the right answer for a specific shape of video and the wrong answer for several others.",
    time: "5 min",
    notes: [
      "**Use this when** the video is vertical, the face fills the frame, and the graphics are typographic — a list, a comparison, a number, a punchline. The graphic sits *above* the face and the face stays full size.",
      "**Do not use this when** you need illustration, icons or animated charts. Every overlay this pipeline makes is a card with type in it. Building a chart by hand takes an hour; a generator does it in minutes.",
      "**Do not use this for 16:9 explainers.** If the face is a small inset in a corner, you want the graphic as a full-frame bed and the face composited on top. That is a different pipeline and the AI design tools do it better.",
      "The honest test: **does the face need to stay full size?** Yes → this. No → generate a full-frame background instead and put yourself on it.",
    ],
    warn:
      "The two approaches are not rivals, they are different composite directions. Picking the wrong one means fighting your editor with manual scale and position keyframes on every section, forever.",
    checks: [
      "The video is vertical and the face carries it",
      "The graphics are type, not illustration",
      "I know which composite direction I need",
    ],
  },

  {
    id: "shoot",
    n: "01",
    title: "Shoot so overlays are possible",
    why: "Almost every overlay problem is created at the shoot and discovered in the edit, when it is expensive.",
    time: "0 min, but do it before the take",
    notes: [
      "**Leave a band.** Decide before you press record whether the graphics live above your head or below your chest, and keep that band empty for the whole take. It is free at shoot time and impossible afterwards.",
      "**Do not drift toward the camera.** Moving closer mid-take raises your head in frame, which shrinks the safe band to its worst moment. One take measured here swung from a head-top at y840 down to y640 — the overlay has to clear the y640, so a third of the available space was lost to a lean-in.",
      "**Know where your captions burn in.** If you caption in CapCut and export flat, those captions are pixels in the footage. They are not a layer you can move later, and they will sit right where you wanted the graphic.",
      "**Frame wider than feels right.** A tight frame looks good alone and leaves nowhere for the graphic to go.",
    ],
    tip:
      "The cheapest version of all of this: shoot one throwaway take, run step 02 on it, and see what the numbers say before you shoot the real one.",
    tipLabel: "The cheap version",
    checks: [
      "Picked a band (above the head, or below the chest) and kept it clear",
      "Held roughly the same distance from camera for the whole take",
      "Know whether captions will be burned in, and roughly where",
    ],
  },

  {
    id: "read",
    n: "02",
    title: "Measure the take, do not guess it",
    why: "This is the step both the manual and the AI-generated approaches skip, and it is the one that stops graphics landing on your face.",
    time: "5 min",
    notes: [
      "The AI design tools handle this by being **asked** — \"leave the right third free.\" That works until it does not, and you only find out by watching the render. Measuring takes five minutes and cannot drift.",
      "**Two obstacles to find.** The subject (you), and burned-in captions if you have them. The graphic has to clear both, at their worst frame across the whole take, not at a frame you happened to look at.",
      "**The subject** is easiest to find by eye: pull frames from several points in the take, crop the band where the head might intrude, stack them, and read off the highest head-top. Automating this is harder than it sounds — frame-difference motion detection does not separate you from the background on a handheld take, because the whole frame moves.",
      "**Burned-in captions** are findable automatically: they are the only thing that is both bright and changing. Threshold to near-white first, then difference, then average each row. A static bright background (a lit ceiling) drops out; the caption band spikes.",
    ],
    warn:
      "Measure across the WHOLE take, not one frame. The number you need is the worst case, and the worst case is usually a lean-in you have forgotten about.",
    checks: [
      "Have a number for the highest the subject reaches",
      "Have a number for the caption band, or confirmed there is none",
      "Subtracted a margin (20px is enough) and written the safe zone down",
    ],
    blocks: [
      {
        filename: "eyeball the subject — stack the band across the take",
        body: `# crop the band where the head might intrude, at 11 points in the
# take, and stack them. The highest head-top you can see is your floor.
M="take.mov"
mkdir -p band
i=0; for t in 2 6 10 14 18 22 26 30 34 38 42; do
  ffmpeg -v error -ss $t -i "$M" -frames:v 1 \\
    -vf "crop=1080:500:0:400,scale=540:250" -y "band/b$(printf %02d $i).png"
  i=$((i+1))
done
ffmpeg -v error -pattern_type glob -i "band/b*.png" \\
  -filter_complex "tile=1x11:margin=3:padding=3:color=red" -y band/stack.png

# each strip covers source y400-y900. Read the highest hair-line across
# all eleven. That number, minus a margin, is where graphics must stop.`,
      },
      {
        filename: "find the burned-in caption band automatically",
        body: `// Bright AND changing = captions. Bright and static = the room.
// Each output frame is 1xBANDS grayscale: one byte per row band.
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const SRC = "take.mov", BANDS = 120, H = 1920;

execFileSync("ffmpeg", ["-v","error","-i",SRC,
  "-vf", \`lut=y='if(gt(val,225),255,0)',tblend=all_mode=difference,\` +
         \`scale=1:\${BANDS}:flags=area,format=gray\`,
  "-f","rawvideo","-pix_fmt","gray","-y","/tmp/p.gray"]);

const buf = fs.readFileSync("/tmp/p.gray");
const frames = Math.floor(buf.length / BANDS);
const rows = Array.from({ length: BANDS }, (_, b) => {
  let s = 0; for (let f = 0; f < frames; f++) s += buf[f * BANDS + b];
  return s / frames;
});

const peak = Math.max(...rows);
rows.forEach((v, b) => {
  if (v >= peak * 0.95) {
    console.log(\`caption band ~y\${Math.round(b * H / BANDS)}\`);
  }
});`,
      },
    ],
  },

  {
    id: "cues",
    n: "03",
    title: "Take the cues from the delivered take",
    why: "The script you wrote and the words you said are different. Only one of them is what the graphic has to match.",
    time: "5 min",
    notes: [
      "**The SRT is ground truth.** If you caption in CapCut you already have one, generated from the audio you actually delivered. That is better than re-transcribing, and free.",
      "**Use the block START times.** Each SRT block's start is the moment that phrase begins. Those are your cue times, to the millisecond.",
      "**Land the graphic slightly early.** A card that appears on the word feels late, because it needs a beat to arrive. A lead-in of about 0.3s means it is settled as the word lands.",
      "**Expect the take to differ from the script**, and follow the take. One reel here kept a piece of jargon on camera that the written script had deliberately removed — so the card kept the jargon and the subline did the translating. A graphic that contradicts the audio reads as a mistake.",
    ],
    checks: [
      "Have the SRT from the delivered take, not the script",
      "Pulled the block start times for each beat that needs a graphic",
      "Built in a lead-in of ~0.3s",
      "Re-read the transcript and noted anything said differently from the script",
    ],
    blocks: [
      {
        filename: "cues.sh",
        body: `# exact duration — the render needs it in milliseconds
ffprobe -v error -show_entries format=duration \\
  -of default=nw=1:nk=1 take.mp3

# every block start, as seconds, with its line
awk '/-->/ {split($1,a,":"); split(a[3],s,",");
     t=a[1]*3600+a[2]*60+s[1]+s[2]/1000; printf "%7.2f  ", t; getline; print}' take.srt`,
      },
    ],
  },

  {
    id: "options",
    n: "04",
    title: "Generate options, then pick",
    why: "Iterating on one design converges on one look. Generating several and choosing keeps a feed from going flat.",
    time: "15 min",
    notes: [
      "**Ask for five, not one.** The AI design tools default to producing a single animation you then refine conversationally. That is a better editing loop, but every video ends up looking the same. Generating five distinct styles and picking one per post is the difference between a body of work and a template.",
      "**Say what NOT to do.** Negative instructions carry more weight than positive ones here. Without them these tools default to near-full captions on screen, which fights the burned-in captions you already have.",
      "**Give it the safe zone as a number**, from step 02. \"Leave the top third free\" is a hope. \"Everything must sit between y0 and y620 of a 1080×1920 frame\" is a constraint.",
      "**Keep a house chassis.** Once a style works, the next overlay is a copy with new copy in it. The variety should be across styles you have already proven, not a fresh invention every time.",
    ],
    checks: [
      "Generated several distinct options rather than refining one",
      "Passed the measured safe zone as pixel numbers",
      "Told it explicitly to keep on-screen text minimal",
      "Saved the winner as a reusable chassis, not a one-off",
    ],
    blocks: [
      {
        filename: "the brief",
        body: `Five distinct overlay styles for a vertical talking-head reel.
1080x1920. Output HTML/CSS/JS, one self-contained file each.

HARD CONSTRAINTS
- Background is solid #FF00FF. Nothing else may be magenta.
- Every element must sit within y0-y620. Below that is the face.
- Text minimal: a label, a headline, one short subline. This is an
  overlay, not a caption track — the video already has captions.
- Brand: Playfair Display 900 headlines, JetBrains Mono labels,
  #ededeb on #1a1c12, #7ba2e0 accent, #c96b66 for the one warning.

DO NOT
- Do not use gradients, blur, or soft drop shadows. Hard offset
  shadows only.
- Do not hold an element at partial opacity. It blends with the key.
- Do not fill the frame with text.
- Do not use random values anywhere. A re-render must be identical.

Timing comes from an SRT I will paste. Land each card ~0.3s before
the phrase it belongs to.`,
      },
    ],
  },

  {
    id: "contract",
    n: "05",
    title: "Build to the page contract",
    why: "Four rules that exist because breaking them produces a render that looks fine in the browser and wrong in the edit.",
    time: "20 min",
    notes: [
      "**Magenta, not green.** `#FF00FF`. Green collides with brand greens — Supabase's, a traffic-light dot — and the keyer punches holes in your own graphics.",
      "**Preview modes.** `?static=1` for the held end state, `?sec=N` to freeze at a beat, `?offset=` to nudge everything. Without these you are re-rendering to check a colour.",
      "**A restart hook.** Real time passes while the page loads and fonts arrive, before the render clock starts. Every cue has to be re-armed at render time, not trusted from page load — otherwise the first second is already gone.",
      "**Entrances must be transitions, not keyframes.** The reset disables `animation`, so anything that animates in via `@keyframes` will be invisible in the frozen preview modes. Base state plus an `.in` class instead.",
      "**Nothing translucent over the key.** A blurred or half-opacity element blends with magenta and fringes. Blur inside a solid card is fine; blur over raw key is not.",
      "**No randomness.** Hard-code rotations and phases. A re-render must be frame-identical or step 07 cannot verify anything.",
    ],
    warn:
      "The restart hook must return early in the frozen modes. Miss that and the hold render restarts mid-state, which produces a still frame of a half-finished animation.",
    checks: [
      "Background is #FF00FF and nothing else is",
      "?static=1 and ?sec=N both render sensible frames",
      "Entrances are transition-based, not @keyframes",
      "No blur, gradient or held partial opacity over the key",
      "No Math.random anywhere",
    ],
    blocks: [
      {
        filename: "the contract, as code",
        body: `const Q = new URLSearchParams(location.search);
const STATIC = Q.get("static") === "1";
const SEC = Number(Q.get("sec") || 0);
const OFFSET = Number(Q.get("offset") || 0);
const LEAD_IN = 0.30;              // land the card before the word

let timers = [];
const ms = (s) => Math.max(0, (s + OFFSET - LEAD_IN) * 1000);

function schedule() {
  CUES.forEach((c, i) =>
    timers.push(setTimeout(() => show(i), ms(c.at))));
}

if (STATIC) freeze(CUES.length);
else if (SEC > 0) freeze(SEC);
else schedule();

/* Real time burns during page load and webfont fetch before the render
   clock pauses, so every cue is re-armed here rather than trusted from
   load. Returns early for the frozen modes or the hold render restarts
   mid-state. The single forced reflow is deliberate: it flushes the
   reset so the re-armed transitions actually replay. */
window.__vtStart = () => {
  if (STATIC || SEC > 0) return;
  timers.forEach(clearTimeout); timers = [];
  document.body.classList.add("noanim");
  reset();
  void document.body.offsetHeight;
  document.body.classList.remove("noanim");
  schedule();
};`,
      },
      {
        filename: "the CSS rules that matter",
        body: `/* .noanim kills animation, so an entrance built on @keyframes
   disappears in the frozen preview modes. Transition instead. */
.noanim * { transition: none !important; animation: none !important; }

.card {
  background: var(--core);                    /* solid, never translucent */
  box-shadow: 8px 8px 0 rgba(26,28,18,.32);   /* hard offset, no blur */
  opacity: 0;
  transform: translateY(20px);
  /* opacity steps in one frame so it never sits mid-alpha over the key */
  transition: opacity .01s linear,
              transform .3s cubic-bezier(.22,.9,.28,1);
}
.card.in { opacity: 1; transform: none; }`,
      },
    ],
  },

  {
    id: "qa",
    n: "06",
    title: "Composite over the real footage before you render",
    why: "The overlay always looks fine on its own. It only has to look fine on top of you.",
    time: "5 min",
    notes: [
      "Snapshot each frozen state, key it over a real frame from the moment it appears, and look at it. This is where the failures live: the card that clears the face at second 3 and covers it at second 22.",
      "**Check against the worst frame, not a convenient one.** Use the frame at the moment you lean in.",
      "Measure, do not squint. A script that reports the lowest pixel any visible element reaches will catch a collision your eye forgives.",
      "Also worth catching here: text that wraps to an orphan word, a label that overflows its box, and any element whose bottom edge crosses the caption band.",
    ],
    checks: [
      "Composited every state over a real frame from its own moment",
      "The worst-case frame still clears",
      "No orphaned words or overflowing labels",
    ],
    blocks: [
      {
        filename: "composite one state over its own moment",
        body: `# snapshot the frozen state (headless, at full 1080x1920), then key
# it over the real frame from the second it appears
ffmpeg -v error -ss 22 -i take.mov -frames:v 1 -y bg.png
ffmpeg -v error -i bg.png -i state.png \\
  -filter_complex "[1:v]colorkey=0xFF00FF:0.30:0.0[ov];[0:v][ov]overlay=0:0" \\
  -y check.png

# then LOOK at check.png. Every time this step got skipped here, the
# thing it would have caught showed up in the final render.`,
      },
    ],
  },

  {
    id: "render",
    n: "07",
    title: "Render, then prove the cues fired",
    why: "A render that looks right in the browser can still be a second out. Only the MP4 is evidence.",
    time: "5 min",
    notes: [
      "Render frame-by-frame under a virtual clock rather than in real time, so a slow machine and a fast one produce the same file. That determinism is what makes the next part possible.",
      "**Sample either side of every cue.** At cue minus 0.5s the previous state must still be showing; at cue plus 0.15s the new one must be. Anything else is a timing bug you would otherwise ship.",
      "Remember the lead-in when you pick sample points. Sampling at cue minus 0.2s with a 0.3s lead-in shows the *new* state and looks like a bug that is not there.",
      "Two outputs: the timed overlay, and a held still of the end state for the last beat.",
    ],
    tip:
      "Contact-sheet the before/after pairs into one image and read them in a single glance. Eight cues, sixteen frames, one look.",
    tipLabel: "The fast way to read it",
    checks: [
      "Rendered at the exact audio duration plus a short tail",
      "Sampled before and after every cue and confirmed the state changed",
      "The final frame holds what it should",
    ],
    blocks: [
      {
        filename: "render.sh",
        body: `# duration in ms comes from the audio, not from a guess
npx tsx scripts/render-final.ts \\
  --page my-overlay \\
  --audio 44069 \\
  --tail 750`,
      },
      {
        filename: "verify-cues.sh",
        body: `# before = cue - 0.55s (outside the lead-in, so the OLD state)
# after  = cue + 0.15s (the new one has landed)
i=0
for p in 3.40:x 12.27:x 19.90:x 21.90:x; do
  cue=\${p%%:*}
  b=$(echo "$cue - 0.55" | bc)
  a=$(echo "$cue + 0.15" | bc)
  ffmpeg -v error -ss $b -i preview.mp4 -frames:v 1 \\
    -vf "crop=1080:620:0:0,scale=330:190" -y "v/b$i.png"
  ffmpeg -v error -ss $a -i preview.mp4 -frames:v 1 \\
    -vf "crop=1080:620:0:0,scale=330:190" -y "v/a$i.png"
  i=$((i+1))
done
# stack the pairs and read them in one glance
ffmpeg -v error -i v/b0.png -i v/a0.png -i v/b1.png -i v/a1.png \\
  -filter_complex "[0][1]hstack[r1];[2][3]hstack[r2];[r1][r2]vstack" \\
  -y v/cues.png`,
      },
    ],
  },

  {
    id: "composite",
    n: "08",
    title: "Key it over the footage",
    why: "One effect, no keyframes. This is the payoff for shooting and rendering the way the earlier steps insisted on.",
    time: "5 min",
    notes: [
      "In an editor: drop the overlay on the track above the footage and apply a chroma/colour key on `#FF00FF`. That is the whole composite. No scale keyframes, no position keyframes, no masks.",
      "**This is the part the flat-export tools cannot do.** With no alpha, the graphic has to be the bed and the face an inset on top of it, which means manual scale and position keyframes on every section. One creator built a Premiere plugin specifically to survive that.",
      "Keep the key tolerance tight. Loose tolerance eats the blue accent.",
      "For a quick review copy before you open an editor, key it in one ffmpeg command and watch it.",
    ],
    checks: [
      "Keyed over the footage with no magenta fringing",
      "The accent colour survived the key",
      "Watched it once, end to end, with sound",
    ],
    blocks: [
      {
        filename: "review copy, one command",
        body: `ffmpeg -i take.mov -i overlay.mp4 -filter_complex \\
  "[1:v]colorkey=0xFF00FF:0.30:0.0[ov];[0:v][ov]overlay=0:0:shortest=1[v]" \\
  -map "[v]" -map 0:a -c:v libx264 -crf 18 -pix_fmt yuv420p \\
  -c:a aac -y preview.mp4

# 0.30 similarity / 0.0 blend is the tight setting. Raising similarity
# to eat stray fringing will start eating the blue accent too.`,
      },
    ],
  },

  {
    id: "reuse",
    n: "09",
    title: "Make the next one take ten minutes",
    why: "The first overlay is a build. Every one after it should be a copy with new words in it.",
    time: "10 min",
    notes: [
      "**Keep the chassis, change the copy.** Once a style renders clean, the next overlay in that style is the same file with a different array of strings and different cue times.",
      "**Put the copy in a data array, not in the markup.** If changing the words means editing HTML, you will not reuse it.",
      "**Keep a shared stylesheet** with the brand tokens and the stage, so a colour change happens once rather than in every overlay.",
      "**Write the header comment for the person who forgot.** The measured zone, the cue times, the render command. That is you in three weeks.",
      "**Build a small library of styles**, not one flexible template. Five proven looks you pick between beats one template you keep bending.",
    ],
    checks: [
      "Copy lives in a data array, separate from the markup",
      "Brand tokens are in a shared stylesheet",
      "Header comment records the safe zone, the cues and the render command",
      "The style is saved somewhere the next post can find it",
    ],
  },
];

export const CONTENT: RunbookContent = {
  slug: "overlay-automation",
  number: "005",
  verifiedOn: VERIFIED_ON,
  title: "Overlays that land on the word,",
  titleAccent: "and never on your face.",
  lede: LEDE,
  timeTotal: TIME_TOTAL,
  closing: CLOSING,
  steps: STEPS,
};
