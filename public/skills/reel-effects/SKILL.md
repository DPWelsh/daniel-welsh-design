---
name: reel-effects
description: Use when someone wants a talking-head reel or short to look produced — effects, word-by-word captions, label pills, a comment-keyword CTA, "orbit cards around me", "put the word behind my head", "cover story", "frame break", "doodle boil", "digital zoom", "spotlight", "vertigo", "headline wall", "checklist", "phone mockup", "paper cut", "glass type", "before and after", "make it look like tenfoldmarc", or "which effect for this beat". Builds on HyperFrames (free, open-source) with a person cut-out so graphics can sit behind the speaker.
---

# Reel effects

Production for a talking-head reel: 21 effects plus the house moves (captions, a frame-0
title, label pills, room dim, a comment CTA). They were distilled frame by frame from
@tenfoldmarc's edited reels (his "17 video effects claude can create" did 276K plays and 10.2K
comments on its first day, 15 Oct 2026), then rebuilt from scratch on **HyperFrames**
(HeyGen, Apache-2.0, free). No editor app is involved: Claude writes the HTML, and HyperFrames
renders it.

**If `LOCAL.md` exists next to this file, read it first.** It holds the owner's brand, framing
and paths.

**The one idea is a depth sandwich.** The person cut-out sits between two layers of
graphics, so things can go behind them and in front of them:

```
hud     captions, title, label pills, CTA    (outside #cam: ignores camera moves)
z3      front   near half of an orbit, spotlight, doodles
z2      fg      the person cut-out            (fg.webm, transparent VP9)
z1      behind  cover word, far orbit cards, room dim, chalk line
z0      plate   the original take
#cam    wraps z0–z3 so a zoom moves the room and the person together
```

## Needs

A Mac or Linux box with Node 22+, ffmpeg and Chrome. HyperFrames runs through `npx`, so
nothing else needs installing. You also need a talking-head clip, ideally shot on a phone that
doesn't move, and Claude Code to drive it.

## Pipeline

```bash
SK=~/.claude/skills/reel-effects
bash $SK/scripts/prepare.sh <take.mp4> <proj> [start-s] [dur-s]
#  → source.mp4 (h264 CFR 30) · fg.webm (the cut-out: ~40 s of CPU per 1 s of 1080p)
#    transcript.json (word timings) · subject.json (person box, head_cx, head_top)
#    assets/ (theme fonts + fonts.css) · index.html (the empty sandwich)
#  write <proj>/effects.json (below), then:
node $SK/scripts/assemble.mjs <proj>                        # sandwich + snippets → index.html
cd <proj> && npx -y hyperframes@0.8.163 lint                # 0 errors
npx -y hyperframes@0.8.163 snapshot --at 1.2,3.4,5.6 --no-end   # LOOK at contact-sheet.jpg
npx -y hyperframes@0.8.163 render -o out.mp4                 # ~2 min per 8 s
```

`effects.json` has one entry per snippet (each snippet once per project). `"@file.json"` values
are inlined from the project:

```json
{ "duration": 8,
  "effects": [
    { "use": "00-title",       "params": { "TEXT": "How Woolies keeps 10M Aussies coming back", "UNTIL": 1.3 } },
    { "use": "00-room-dim",    "params": { "WINDOWS": [[3.5, 5.1, 0.6]] } },
    { "use": "16-cover-story", "params": { "WORD": "WOOLIES", "T": 0.0, "HOLD": 1.2, "TOP": 470 } },
    { "use": "01-orbit",       "params": { "T": 1.35, "DUR": 1.9, "CX": 540, "CY": 1000, "RY": 330 } },
    { "use": "14-doodle-boil", "params": { "T": 3.55, "DUR": 1.55 } },
    { "use": "x1-spotlight",   "params": { "T": 5.85, "HOLD": 1.95, "CY": 880 } },
    { "use": "05-digital-zoom","params": { "T_PUNCH": 5.98, "T_OUT": null, "PUNCH": 1.22 } },
    { "use": "00-label-pill",  "params": { "ITEMS": [{ "t": 5.85, "until": 8, "num": "#1", "text": "The genius move" }] } },
    { "use": "00-captions",    "params": { "WORDS": "@transcript.json", "ACCENT": ["woolies", "genius"], "Y": 1300 } }
  ] }
```

That file rendered the reference test, an 8 s close take, on 16 Oct 2026.

## The theme

- **Colours:** the five CSS variables at the top of `templates/sandwich.html`. Swap them for your brand.
- **Fonts:** three files in the skill's `fonts/` folder, any format: `display-700.*` for captions and pills, `display-900.*` for titles and cover words, and `mono.*` for numbers, the keyword and the handle. An empty folder fills itself once with Inter and JetBrains Mono (both OFL).

## How to pick and place

1. **One effect per beat, on a word.** Read `transcript.json`. **Start the visual 0.1–0.45 s
   (≈ 0.25 s) BEFORE the word.** That lead was measured on every effect in the source reels, and
   it's what makes an edit feel tight. Entrances run ≤ 0.25 s. Exits are mostly hard cuts.
2. **Density:** a showcase can run one effect every 1–1.5 s. A real reel needs a visual change
   at least every 2 s; the captions supply most of it. Put 3–5 effects on the beats that carry
   a number, a name or a turn.
3. **Place from `subject.json`.** Orbit CX = head_cx. Cover-story TOP so the letters straddle
   head_top. Zoom ORIGIN on the face. Front-layer things stay out of the face box.
4. **Check the cut-out before putting anything behind the person.** Pull 2–3 frames of
   `fg.webm`. Held mics and phones can drop out of the matte.
5. **Snapshot, look, fix, then render.** Nobody should see a render Claude hasn't checked.

## Rules

- **Emphasis is weight, not colour.** The payload word goes display-900 at 1.12×.
- **Ink behind the person matches the wall.** Dark ink on a light wall, light on a dark one.
- **Captions carry a dark halo,** or light words vanish when a light card passes behind them.
- **Seek-safe only.** Everything is a pure function of timeline time: GSAP tweens on the paused
  `tl`, or an `onUpdate` that recomputes from the time. No `Math.random`, no clocks, no
  free-running CSS animation. Boil seeds step from `floor(t × fps)`.
- **Real receipts only.** Headlines, charts and screenshots inside effects must be real.
- **A second `fg.webm` (doodle boil) triggers a `duplicate_media_discovery_risk` lint warning.** It renders correctly; leave it.

## Effect index

Cards with measurements and build notes: `references/effects.md`.

| # | Effect | Status | Needs matte | Snippet / start from |
|---|---|---|---|---|
| 00 | frame-0 title | ✅ | — | `00-title` |
| 00 | captions | ✅ | — | `00-captions` |
| 00 | label pill | ✅ | — | `00-label-pill` |
| 00 | room dim | ✅ | yes | `00-room-dim` |
| 01 | orbit | ✅ | yes (behind) | `01-orbit` |
| 02 | couch wall | 📝 | yes + furniture mask | — |
| 03 | ui world | 📝 | yes (clean hair) | registry `claude-exchange`, `typed-prompt` |
| 04 | frame break | 📝 | yes | — (plate 0.75 inside a 48% card) |
| 05 | digital zoom | ✅ | no | `05-digital-zoom` |
| 06 | phone mockup | 📝 | standing: yes | registry `device-frame-stage`, `vfx-iphone-device` |
| 07 | checklist | 📝 | no | registry `marker-checklist-card` + captions engine |
| 08 | headline wall | 📝 | yes (dim) | `00-room-dim` + slam cards |
| 09 | zoom-through cut | 📝 | no | registry `zoom-through-transition` |
| 10 | chart grow | 📝 | yes (behind) | `00-room-dim` + registry `chart-story` |
| 11 | pull-back reveal | 📝 | no | registry `pull-back-reveal` |
| 12 | green screen | 📝 | yes (is the effect) | — |
| 13 | paper cut | 📝 | yes | doodle-boil filter (filled), registry `paper-collage-reveal`, `stop-motion-cadence` |
| 14 | doodle boil | ✅ | yes | `14-doodle-boil` |
| 15 | vertigo | 📝 | yes + clean plate | registry `camera-dolly-zoom` |
| 16 | cover story | ✅ | yes (behind) | `16-cover-story` |
| 17 | glass type | 📝 | yes (behind) | registry `glass-hero` |
| x1 | spotlight | ✅ | no | `x1-spotlight` |
| x2 | freeze and label | 📝 | yes | registry `vox-annotate` |
| x3 | before and after | 📝 | no | registry `before-after-wipe` |
| x4 | comment CTA | ✅ | no | `x4-comment-cta` |

Registry items install with `npx -y hyperframes@0.8.163 add <name>`. Read the item's HTML and
restyle it to the theme before using it. **When you build a 📝 effect for a reel, save it as
`snippets/<id>.html` in the same three-part shape (style · markup · IIFE ending `})();`), render
it, and flip it to ✅ here.**

## Production checklist

Measured on the source creator's edited reels. **Edit pace is rarely the gap:** his cut rate
(~1.4 per 10 s) is ordinary, and his biggest reels are lo-fi selfies. Effects make a reel look
made. They don't replace the hook and the CTA. Do these first:

| Do this | Check |
|---|---|
| **Clip the mic to mid-chest.** Never hold it at the chin | no mic above the collarbone |
| **No split-screen.** Graphics go inside the shot, over the chest at y 45–75%, ≤ 45% wide | full-frame for ≥ 80% of the runtime |
| **Say the keyword AND show it** in the last 4–6 s (`x4-comment-cta`); test the DM first | his keyword reels: 20 comments per 1k plays vs 1 without |
| **Record the mic's own file at 48 kHz.** No voice-enhance, noise-cancel or Bluetooth hop | no sharp roll-off above ~3.5 kHz; gaps ≥ 28 dB under speech |
| **A 3–8-word promise title on frame 0**, over a sharp frame (no blur or glitch intro) | frame 0 reads as a still with a title |
| **Frame wider:** eyes at y 28–35%, face ~10–13% of the height, camera ~2 m back | room beside the head for cards and orbits |
| **Captions ~74 px, centred at y 55–65%,** never below 75% (that's Instagram's UI zone) | measure 3 frames |
| **Name the tool that made the reel**, and have the keyword deliver it | said aloud + on screen |
| **Punch in 1.2–1.35× on section changes** (`05-digital-zoom`) | ≥ 1 face-scale change per 10 s |
| **Low-key light:** one practical lamp in frame, about 1 stop under | skin luma ~85–100 |

## On the day of the shoot

- **Lock the phone off.** Vertigo, couch wall and green screen all assume a still camera.
- **Shoot 2 s of the empty room before you sit down.** That's the clean plate vertigo needs.
- **Leave headroom.** Top of the head at about 25–30% of frame height gives cover story, glass type and orbit room above it.
- **Close takes shrink everything.** Face at ~30% of the frame height means halving the zoom moves, raising the orbit's RY, and the CTA's close-take values (`Y 1420, RISE 185`).
