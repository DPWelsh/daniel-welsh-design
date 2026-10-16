/* /effects. Payload for the "I binned my video editor" reel (Oct 2026). Comment EFFECTS.
 *
 * The reel says the editor app is dead because Claude writes the effects as code and a
 * free engine renders them. This page hands over the skill that does it: what it is,
 * how to install it, how to use it, and what to fix before filming.
 *
 * Only what actually happened is stated:
 * - Romotiq: 42 days, 1,106 commits, 109 releases, zero paying customers (Stripe).
 * - The skill: 11 effects rendered and checked on real takes (16 Oct 2026); 11 more
 *   are recipes, said so plainly. The demo up top is the actual reel, edited by the skill.
 * - The source: @tenfoldmarc's "17 video effects claude can create" (276K plays, 15 Oct),
 *   taken apart frame by frame.
 * The production numbers are his edited reels, measured.
 *
 * Copy rules: no em dashes, one idea per sentence. */

export const LEDE =
  "I built a video editor for 42 days. It had 109 releases and zero paying customers. Then I put it in the bin, because Claude can write the effects as code and a free engine renders them. This is the skill I use instead.";

export const WHY_YOU =
  "You need Claude Code, a Mac or Linux machine with Node 22 and ffmpeg, and a talking-head clip. Everything else is free and open source.";

export const INSTALL =
  "mkdir -p ~/.claude/skills && curl -fsSL https://danielwelsh.design/skills/reel-effects.tar.gz | tar -xz -C ~/.claude/skills";

export const FIRST_PROMPT = `Use the reel-effects skill on ~/Movies/my-take.mov.
Prepare the first 20 seconds, read the transcript, and suggest 4 effects on the words that carry a number, a name or a turn.
Show me the snapshot sheet before you render.`;

/* The depth sandwich, top to bottom. */
export const LAYERS: { z: string; name: string; what: string }[] = [
  { z: "hud", name: "Screen", what: "Captions, the title, label pills, the comment bar. They ignore camera moves." },
  { z: "z3", name: "In front of you", what: "The near half of an orbit, a spotlight, doodles." },
  { z: "z2", name: "You", what: "Your cut-out. HyperFrames makes it from the clip, on your own machine." },
  { z: "z1", name: "Behind you", what: "A word behind your head, the far orbit cards, a darker room, a chalk line." },
  { z: "z0", name: "The room", what: "Your original clip." },
];

export type Effect = { id: string; name: string; what: string; ready: boolean };

export const EFFECTS: Effect[] = [
  { id: "00", name: "Captions", what: "Word by word, one to three at a time, each blurs in over three frames.", ready: true },
  { id: "00", name: "Frame-0 title", what: "A short promise on screen from the very first frame.", ready: true },
  { id: "00", name: "Label pill", what: "Names the section, top centre, pops in on the cut.", ready: true },
  { id: "00", name: "Room dim", what: "The room goes darker. You don't.", ready: true },
  { id: "01", name: "Orbit", what: "Cards burst out of your hands and spin round your head, passing behind you.", ready: true },
  { id: "05", name: "Digital zoom", what: "A punch-in on the key word, a slow creep, a snap back out.", ready: true },
  { id: "14", name: "Doodle boil", what: "A wobbly chalk line traces you while doodles draw themselves on.", ready: true },
  { id: "16", name: "Cover story", what: "A magazine word behind your head.", ready: true },
  { id: "x1", name: "Spotlight", what: "Kill the lights. One soft pool stays on your face.", ready: true },
  { id: "x4", name: "Comment CTA", what: "A comment bar types your keyword, posts it, and the reply lands with the link.", ready: true },
  { id: "02", name: "Couch wall", what: "Your thumbnails tile the wall behind you.", ready: false },
  { id: "03", name: "UI world", what: "The wall becomes an app you are sitting inside.", ready: false },
  { id: "04", name: "Frame break", what: "The shot shrinks to a card and your head sticks out of it.", ready: false },
  { id: "06", name: "Phone mockup", what: "A phone swings in behind your shoulder and a button gets tapped.", ready: false },
  { id: "07", name: "Checklist", what: "Items type in as you say them and tick on the last word.", ready: false },
  { id: "08", name: "Headline wall", what: "Real numbers slam onto the wall behind you while the room goes dark.", ready: true },
  { id: "09", name: "Zoom-through cut", what: "Fly into the frame and out of the next shot.", ready: false },
  { id: "10", name: "Chart grow", what: "A line chart draws itself behind your head.", ready: false },
  { id: "11", name: "Pull-back reveal", what: "The whole video shrinks into the app that made it.", ready: false },
  { id: "12", name: "Green screen", what: "The room is gone and you are in a studio.", ready: false },
  { id: "13", name: "Paper cut", what: "You become a sticker on a stop-motion collage.", ready: false },
  { id: "15", name: "Vertigo", what: "The room stretches while you stay the same size.", ready: false },
  { id: "17", name: "Glass type", what: "Clear acrylic letters on the wall behind you.", ready: false },
  { id: "x2", name: "Freeze and label", what: "The picture freezes and callouts point at you.", ready: false },
  { id: "x3", name: "Before and after", what: "A slider wipes from the raw clip to the edit.", ready: false },
];

/* The reel up top, beat by beat. Times are where each effect starts in the video. */
export const BEATS: { t: string; effect: string; on: string }[] = [
  { t: "0:00", effect: "Frame-0 title", on: "on screen before a word is said" },
  { t: "0:03", effect: "Headline wall", on: "\"blowing up on socials\"" },
  { t: "0:07", effect: "Cover story + label pill", on: "\"Claude killed the app\"" },
  { t: "0:10", effect: "Spotlight", on: "\"I can't make any money\"" },
  { t: "0:12", effect: "Doodle boil + room dim", on: "\"for free\"" },
  { t: "0:15", effect: "Digital zoom", on: "\"Wait\"" },
  { t: "0:18", effect: "Label pills, one per step", on: "\"drop it into Claude\"" },
  { t: "0:22", effect: "Comment CTA", on: "\"Comment for the skill\"" },
];

export const DEMO_NOTE =
  "That is the reel this page came from. I filmed it on my phone and Claude edited it with the skill below. Captions run the whole way.";

export type Step = { n: string; name: string; what: string; prompt: string };

export const STEPS: Step[] = [
  {
    n: "01",
    name: "Prepare the clip",
    what: "The skill trims the clip, cuts you out of it, and gets word timings. The cut-out takes about 40 seconds of computer time per second of video, so start with 15 to 20 seconds.",
    prompt: "Use reel-effects to prepare ~/Movies/my-take.mov from 0 to 18 seconds into ~/reels/take-01. Tell me where it found my head.",
  },
  {
    n: "02",
    name: "Pick the beats",
    what: "One effect per beat, on a word you say. The visual starts about a quarter of a second before the word. That lead is what makes an edit feel tight.",
    prompt: "Read take-01/transcript.json. Pick four words that carry a number, a name or a turn, and suggest one effect for each from the reel-effects index. Keep captions on the whole way.",
  },
  {
    n: "03",
    name: "Look before you render",
    what: "Claude assembles the page and takes snapshots at each effect. You look at one contact sheet instead of waiting for a render.",
    prompt: "Write effects.json for those four, assemble it, lint it, and snapshot the middle of each effect. Fix anything covering my face before showing me.",
  },
  {
    n: "04",
    name: "Render",
    what: "Eight seconds takes about two minutes on a laptop. The file comes out at 1080 by 1920 with your audio untouched.",
    prompt: "Render take-01 to out.mp4, then make a frame sheet at 2 fps so I can check it.",
  },
];

/* Measured on the source creator's edited reels. The order is impact for effort. */
export const BEFORE_FILMING: { name: string; line: string }[] = [
  { name: "Clip the mic to your chest", line: "Never hold it at your chin. He does in zero of twelve reels." },
  { name: "Stay full frame", line: "Put graphics over your chest, not in a split screen. He is full frame the whole time." },
  { name: "Say the keyword out loud", line: "Then show it typed in a comment bar. His keyword reels get 20 comments per thousand plays. The rest get 1." },
  { name: "Title on frame zero", line: "Three to eight words, over a sharp frame of your face. No blur intro." },
  { name: "Sit further back", line: "Eyes at about a third of the way down. It leaves room beside your head for the effects." },
  { name: "Shoot two seconds of empty room", line: "Before you sit down. Vertigo needs it, and it costs nothing." },
];

export const MISTAKES: { name: string; line: string }[] = [
  { name: "Cards across the face", line: "My first orbit sent the near cards straight through my face. Close takes need a taller ring, so the front pass lands under the chin." },
  { name: "White on white", line: "White captions vanished when a white card passed behind them. A dark halo round the letters fixed it." },
  { name: "A word too wide", line: "A seven-letter word at a fixed size ran off both edges. Fit it to the frame instead." },
  { name: "The fast cut-out setting", line: "The GPU option is known to damage faces. Run the cut-out on the CPU and wait." },
  { name: "Splitting the cut-out", line: "I ran it in three parallel pieces to go faster. Each piece ran three times slower. Start it and go make a coffee." },
  { name: "Effects as the fix", line: "Polish does not predict plays. His biggest reels are selfies. Fix the mic, the hook and the keyword first." },
];

export const CREDIT =
  "The effects come from taking @tenfoldmarc's \"17 video effects claude can create\" apart frame by frame, then rebuilding each one from scratch on HyperFrames, HeyGen's open-source renderer. Go and follow him.";

export const CLOSING =
  "The editor took me 42 days. The skill took an afternoon. Claude writes the effects, a free engine renders them, and your taste is the only part that cannot be downloaded.";
