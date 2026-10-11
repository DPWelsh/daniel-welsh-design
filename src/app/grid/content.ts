/* /grid. Payload for the "IG grid overhaul" reel (11 Oct 2026). Comment GRID.
 *
 * The reel shows the before and after of Daniel's reels tab and names the
 * steps. This page gives each step, the prompt for it, and the mistakes that
 * cost time, so the next person can skip them.
 *
 * Only what actually happened is stated: 21 covers, every still from his own
 * raw footage, titles from each reel's own caption, stickers from real lines.
 * The prompts are the ones he used, tidied up so they work for anyone.
 *
 * Copy rules: no em dashes, one idea per sentence. */

export const LEDE =
  "I had 21 reels and no plan behind any of the covers. Claude redid every one, in the same order, and none of the old ones stayed. Here is each step and the prompt for it.";

export const WHY_YOU =
  "You need Claude Code on a Mac, the original video files, and screenshots of your reels tab. No design tool. I tried one and did not need it.";

export type Step = {
  n: string;
  name: string;
  short: string;
  what: string;
  tips: string[];
  prompt: string;
};

export const STEPS: Step[] = [
  {
    n: "01",
    name: "Pick a look to copy",
    short: "Screenshot 3 grids you love",
    what:
      "Find two or three creators whose grids you would want. Screenshot their reels tab. You are not copying their content. You are copying what makes the grid feel like one thing.",
    tips: [
      "Look for the same shot on every tile. That does most of the work.",
      "One short headline per cover beats three lines of text.",
      "Do this first. I made 96 options before I found the look, and the look decided it in one message.",
    ],
    prompt:
      "Here are screenshots of three Instagram grids I love. Tell me what makes each one look consistent: the shot, the framing, the text, the colours. Then write me one cover style that does the same thing for my account.",
  },
  {
    n: "02",
    name: "Give it your brand kit",
    short: "Your fonts, colours and rules",
    what:
      "Without a brand kit, Claude designs like everyone else. Give it your fonts, your colours and the rules you care about, and it designs like you.",
    tips: [
      "Name the font files on your Mac so it can use them.",
      "Write the rules down, even small ones. Mine: never colour a single headline word, and no em dashes.",
    ],
    prompt:
      "This is my brand kit: [your fonts], [your colours], and these rules: [your rules]. Use it for every cover. If a design choice is not covered by the kit, ask me before you invent one.",
  },
  {
    n: "03",
    name: "A still from every reel",
    short: "From your raw footage, not Instagram",
    what:
      "Claude never touched my Instagram. It worked from the original video files on my Mac. It matched each reel on my grid to the clip it came from, then picked the sharpest frame with my eyes open.",
    tips: [
      "Use the raw clips, before captions went on. Screenshots of the posted reel have text burned in.",
      "Keep your face the same size and in the same spot on every tile. This is why a grid looks planned.",
      "Ask for three options per reel on one contact sheet. Picking takes seconds.",
    ],
    prompt:
      "Here are screenshots of my reels tab, top to bottom. List every tile in order. My original videos are in [folder]. Match each reel to the clip it came from, and skip trial reels. For each one, use the Mac's built-in face detection to find the sharpest frame where my face is centred and my eyes are open. Show me three options per reel on a contact sheet. Then scale the chosen frames so my face is the same size and in the same spot on every cover.",
  },
  {
    n: "04",
    name: "A title from the transcript",
    short: "What the video says. No bait.",
    what:
      "Each cover says what that video actually covers, in plain words. If the video does not say it, the cover does not either.",
    tips: [
      "Two short lines. Big enough to read on the grid.",
      "Read it back as a stranger. Would they know what the video is about?",
      "My first pass drifted into clickbait. I made Claude redo every title from the caption.",
    ],
    prompt:
      "Read each reel's caption and transcript. Write a two-line cover title for each one, in plain words a small business owner would use. It must say what the video actually covers. No bait, and no claims the video does not make.",
  },
  {
    n: "05",
    name: "Stickers from the video",
    short: "Real tools, lines and numbers",
    what:
      "A small sticker or two makes a cover feel alive. Every one of mine is something real from that video: a tool I named, a line I said, a number I showed, a command I used.",
    tips: [
      "Mix the sizes. One small badge and one medium card works.",
      "Sticker text needs to be readable on a phone. About 34px on a 1080px cover.",
      "No made-up screens or sample data. It looks alive but it is not real, and people can tell.",
    ],
    prompt:
      "For each cover, add one to three small stickers using only real things from that video: a tool I named, a line I said, a number I showed, or a command I used. Mix the sizes, keep them off my face, and make the text big enough to read on a phone.",
  },
  {
    n: "06",
    name: "Mock the grid, then swap",
    short: "See all of it before you change one",
    what:
      "Judge the covers together, not one at a time. A cover that looks fine alone can break the grid. Once the mock looks right, the swap takes minutes.",
    tips: [
      "Number the files in grid order, with 01 as the newest reel.",
      "AirDrop them to your phone, then Edit cover, Add from camera roll, one reel at a time.",
      "Screen record the before and after. That is your next reel.",
    ],
    prompt:
      "Render every cover at 1080 by 1920, numbered in grid order with 01 as the newest. Then mock up my reels tab on a phone with all of them in place, so I can see the whole grid before I change anything. Save the covers to a folder I can AirDrop.",
  },
];

/* Getting your reels out of Instagram. Claude never logs in to Instagram for
   any of this; both routes hand it files. */
export const PULLS_LEDE =
  "Claude needs two things from Instagram: the list of your reels with their captions, and the videos if you no longer have the originals. There are two ways to get them. Neither one gives Claude your login.";

export const PULLS: { name: string; who: string; gets: string; how: string; watch: string }[] = [
  {
    name: "Apify",
    who: "Any public account",
    gets: "Every post's caption, link, date and view count, plus a direct download link for each video.",
    how: "Make a free Apify account and run the Instagram Post Scraper with your username. Download the results as JSON and give the file to Claude. Claude can download each video from its link.",
    watch: "It reads public data only and charges a little per result. Posted videos have your captions burned in, so ask Claude for frames before the text appears.",
  },
  {
    name: "Instagram's own API",
    who: "Creator or Business accounts",
    gets: "Your reels with captions, links, dates and thumbnails, straight from Meta.",
    how: "Connect your account to a Meta developer app once, then ask Claude to pull your media list with the token. Slower to set up, free to run.",
    watch: "It gives you thumbnails, not the original footage. If you still have your raw clips, use those for the stills. They have no text on them.",
  },
];

export const PULLS_PROMPT =
  "Here is a JSON export of my Instagram posts. List every reel in grid order, newest first, with its caption. For any reel where I don't have the original video in [folder], download the video from its link so you can pull a still from it.";

export const MISTAKES: { name: string; line: string }[] = [
  { name: "Going wide first", line: "I asked for 100 options before I had a reference. The reference decided it in one message. Find it first." },
  { name: "A design tool on a free plan", line: "I set one up and it capped out after 8 covers. Claude Code rendered all 21 on my Mac without it." },
  { name: "Bait titles", line: "The first rewrite sounded good and said things the video did not. Every title now comes from the caption." },
  { name: "Fake proof", line: "Sample business names and made-up tables looked alive. They were not real, so they came out." },
  { name: "Unreadable stickers", line: "First they were too big. Then the text was too small to read on a phone. Check at phone size." },
  { name: "Someone else's draft", line: "I started from covers another AI had made in lime green. Start from your brand kit and the reference instead." },
];

export const CLOSING =
  "The covers are the easy part. The work is deciding the look once, and then saying exactly what each video is about.";
