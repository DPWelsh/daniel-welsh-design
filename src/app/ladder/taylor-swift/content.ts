/* ── /ladder/taylor-swift, rung 1 ────────────────────────────────────
   This page WAS the build sheet: eleven steps, eleven prompts to paste,
   a stepper console to keep your place in. All of that is now one
   skill, public/skills/remake-a-site, because a page you paste out of
   is a worse version of a thing that can just run.

   What a page is still better at, and what is left here:
     - being found, and being linkable
     - the decision BEFORE you install anything: is this for me, what
       does it cost, what will I actually learn
     - the ladder's cost comparison, which only works read side by side

   The skill is a GUIDE, not an autopilot. It runs five mechanical
   steps silently (auth, repo, crawl, deploy, domain) and hard-stops six
   times to make you decide. That split is deliberate: if it did all
   eleven you would learn nothing, and a site builder would be the
   better tool. The six stops ARE the product.

   Source: docs/LADDER-FULL-REWRITE.md, rewritten after the 11 Aug
   filmed run. */

export const LEDE =
  "One of the most visited pages on earth. Tour dates, a merch link, and that is it. Nothing to type, nothing gets saved, nothing changes when you visit, which is exactly why this is rung one. You learn its layout, then fill that layout with words and pictures that are yours.";

export const SKILL_INSTALL =
  "mkdir -p ~/.claude/skills/remake-a-site && curl -fsSL https://danielwelsh.design/skills/remake-a-site/SKILL.md -o ~/.claude/skills/remake-a-site/SKILL.md";

export const SKILL_SAY = "remake taylorswift.com as my artist site";

/* The difficulty stamp. Same four dimensions on every rung sheet so they
   can be read side by side, that comparison is the point of the ladder.
   Rung 6 for contrast: no, not reversible, and ~US$750/yr floor. */
export const DIFFICULTY = {
  rung: 1,
  of: 7,
  time: "about an hour, most of it waiting",
  /** The headline number. Shown large on the stamp. */
  cost: "$35",
  costNote: "to start, plus assets. ~$15/yr to keep.",
  blastRadius: "nobody notices until somebody cannot find the tour dates",
  reversible: "Yes. Push a fix and it is live in about a minute.",
  floor: "~US$15/yr. A domain renewal, and genuinely nothing else.",
};

export const PREREQ =
  "You need Claude Code, and a machine with Homebrew, Git and Node on it. That is Day Zero, it takes about an hour, and you only ever do it once. You do not need a code editor for this rung, and you do not need to know how to code. Every file gets written for you.";

/* ── who this is for ──────────────────────────────────────────────────
   Said plainly and early, because the honest answer sends some people
   somewhere else, and that is the correct outcome. */

export const HONEST_FILTER = {
  title: "Use a site builder instead if",
  body: "you want the URL and nothing else. Squarespace will be faster and it will look fine. This is an hour, and most of that hour is spent understanding what the tool is doing, which is only worth it if that is the thing you came for.",
};

/* ── the four tools ───────────────────────────────────────────────────
   The skill RUNS these silently, which is right, nobody learns anything
   from typing gh auth setup-git. But running a tool and understanding
   one are different things, and understanding is the reason anybody is
   on this page rather than using a site builder.

   So: what each one actually does, why it is in the stack at all, and
   the thing about it that catches people out. Every gotcha below cost
   real time on the filmed run. */

export type Tool = {
  name: string;
  /** Its one job, in plain words. */
  job: string;
  what: string;
  /** Why it exists in THIS stack, not a general description. */
  why: string;
  /** The bit that surprises people, and what it cost. */
  gotcha: string;
};

export const TOOLS_TITLE = "What you actually learn";

export const TOOLS_LEDE =
  "Five tools, one job each: build it, read the site, remember the code, publish the result, make the pictures. That is the real stack behind almost every website, and knowing which does what is the thing you keep. You will not type a single command at any of them, but you will finish knowing what each one was doing on your behalf, and the one way each of them catches people out.";

export const TOOLS: Tool[] = [
  {
    name: "Claude Code",
    job: "builds",
    what: "Writes every file, and drives the other four. You talk to it in plain English and it does the typing.",
    why: "It is the only thing on this list you actually interact with. That is what separates this from a site builder: you are not dragging blocks around someone's editor, you are writing a brief and getting a site built to it.",
    gotcha:
      "It builds exactly what the brief says, so a vague brief gets you a vague site. And every question it has to stop and ask you is a full stop in the middle of a build. On the first run it halted three times on things the brief simply had not answered, which is why the brief now answers them up front.",
  },
  {
    name: "Firecrawl",
    job: "reads",
    what: "Takes a URL and hands back the page as structured text, plus its stylesheets and its media, in a form a machine can work with.",
    why: "It is what turns a site you admire into a design brief. Without it you are reading view-source and copying hex values by eye.",
    gotcha:
      "What you get depends entirely on which format you ask for. Ask for markdown and every tag is stripped, including the <video> that makes the hero move, so a moving hero comes back as a still and you build the wrong thing. Ask for HTML as well and it is right there. That single distinction cost about an hour.",
  },
  {
    name: "GitHub",
    job: "remembers",
    what: "Keeps a copy of your code that is not on your laptop, plus every version of it you have ever saved.",
    why: "Not for backup. Vercel WATCHES it, so pushing to GitHub is the thing that triggers a deploy. That is why the repo gets created before a single line of code exists.",
    gotcha:
      "History is one-way. Anything you commit stays in it forever, even after you delete the file, so 24 MB of images on the first run are still in that history now. It is why .gitignore gets written into an empty folder, and why media never goes in.",
  },
  {
    name: "Vercel",
    job: "publishes",
    what: "Turns your folder into a URL anyone on earth can load, and does it again automatically every time you push.",
    why: "It is the entire distance between 'works on my machine' and a real website. Once it is linked you never think about deploying again.",
    gotcha:
      "Two different things share the name. The deployment is your code, which should be tiny. Blob storage is a separate bucket for your big files, served from a CDN. Keeping images out of the repo is what keeps clones instant and lets you swap an asset without touching git at all.",
  },
  {
    name: "Higgsfield",
    job: "makes the pictures",
    what: "Generates images and video from a written description, and can train on a face so the same person shows up in all of them.",
    why: "It is what makes the site yours. You can learn layout from anyone, but the photography has to be your own, and this is how you get photography without a photographer.",
    gotcha:
      "Quality is not the hard part, consistency is. Any tool will make you one good image. Twelve images with the same recognisable person across a hero, three product shots and eight tiles is a different problem, and solving it is the entire reason the face gets trained before anything else is generated.",
  },
];

/* ── the six stops ────────────────────────────────────────────────────
   The whole pitch. Everything else is plumbing that runs itself, and
   these are the moments where a person has to decide something. */

export type Stop = { n: string; title: string; ask: string };

export const STOPS: Stop[] = [
  {
    n: "01",
    title: "Which site, and what did you notice",
    ask: "You open it and scroll it once. Does the hero move? Do the carousels loop? How many different layouts can you count? Thirty seconds that saves an hour, and the first time you look at a website as a structure rather than a picture.",
  },
  {
    n: "02",
    title: "Which colour does which job",
    ask: "The crawl reads the real hex values off the CSS and measures every pairing. You say which is text, which is background, which is accent. If the site you admire runs body copy below 4.5:1, you find out now rather than inheriting it.",
  },
  {
    n: "03",
    title: "What to spend, and whose face",
    ask: "You see the price before anything is generated, and you approve it. Then you approve the trained face, because a hero, three product shots and eight tiles all key off it, and getting it wrong means regenerating twelve things.",
  },
  {
    n: "04",
    title: "Your actual words",
    ask: "Six questions, one at a time. This is the part no tool can do for you, and the part people lose the most time pretending otherwise. The banned-words list is what stops the output sounding like every other site.",
  },
  {
    n: "05",
    title: "Read the brief before it runs",
    ask: "You see exactly what is about to be built and get to change it. Then it runs start to finish without stopping, which is the only way a build stays fast.",
  },
  {
    n: "06",
    title: "Look at it yourself",
    ask: "On a phone, before it ships. You decide what looks wrong, not the tool. The last cheap moment to change anything.",
  },
];

/* ── what runs itself ─────────────────────────────────────────────────
   Named explicitly so the automation reads as deliberate rather than as
   a thing that was skipped. */

export const AUTOMATED = [
  "Authenticating GitHub, Vercel and Higgsfield, and catching the one nobody remembers, gh auth setup-git.",
  "The folder, the repo and the .gitignore, written before anything else exists rather than after.",
  "The crawl. One page of every template, the palette read off real CSS, and the video hero that markdown makes invisible.",
  "Uploading media to blob storage, so nothing binary ever reaches git.",
  "The push, the deploy, and the domain records.",
];

/* ── the traps, kept because they are the reason to read the page ─────
   Each one cost time on the filmed run. They are what the skill knows
   that a fresh session does not. */

export const TRAPS = [
  {
    trap: "A screenshot cannot tell you a hero is a video",
    cost: "Markdown strips tags. Read the page as text or pixels and a video hero comes back as an image, so you build the wrong thing and it looks almost right.",
  },
  {
    trap: "A page limit drops the about page silently",
    cost: "Crawlers default to a handful of pages and the ones they drop are the dull ones at the bottom of the nav: about, contact, privacy, terms. You find out when the footer links point at nothing.",
  },
  {
    trap: "Set up git last and you spend commits undoing commits",
    cost: "Writing .gitignore into a folder that is already full produced three commits whose only purpose was undoing earlier ones, plus commits stamped with the wrong email.",
  },
  {
    trap: "Committing media puts it in history forever",
    cost: "The first run put 24 MB of binaries into git. Deleting the files later does not remove them. Blob storage before the first push, or a history rewrite after.",
  },
  {
    trap: "Generate the poster separately and the video jumps",
    cost: "The still has to be frame one of the video, pulled with ffmpeg, or you see a visible jump the moment it starts playing.",
  },
];

export const AFTER =
  "Nothing on that list needs feeding. No database bill, nothing to patch, nothing that pages you at 2am. The site could sit untouched for five years and still work. That is rung one, and it is the last rung where that sentence is true.";

/* ── how long, measured ───────────────────────────────────────────────
   The filmed run was 64:39. Almost all of the gap between that and the
   number below was unauthenticated CLIs and git set up last. Both now
   run silently inside the skill, which is most of the point. */

export const HOW_LONG =
  "About an hour, of which 20 minutes is waiting for the build and 15 is waiting for assets to generate. Your hands are on it for maybe ten minutes of that, across six questions.";

export const HOW_LONG_WARNING =
  "Not 'a couple of minutes'. People told minutes, who then spend an hour, quit.";

/* ── cost ─────────────────────────────────────────────────────────────
   USD list price, checked August 2026. Build/run split so it reads
   against the rung-6 sheet, which is the comparison the ladder exists
   to make. The build column sums to the stated total. Keep it that way. */

export const COST_NOTE =
  "USD list price, checked August 2026. The two columns are what you pay ONCE to get it live, and what you pay every year to keep it there. They add up to the totals at the bottom, so you can check the arithmetic rather than take the headline on trust.";

export type CostRow = { piece: string; build: string; run: string; note: string };

export const COSTS: CostRow[] = [
  {
    piece: "Claude",
    build: "~$20",
    run: "$0",
    note: "One month of Pro, if you do not already pay for Claude. Cancel after. A full run used about 2% of a Max 5-hour window, so an existing plan makes this $0 and the total $15.",
  },
  {
    piece: "Domain",
    build: "~$15",
    run: "~$15/yr",
    note: "About $12/yr for a .com. The only bill that can actually kill the site.",
  },
  {
    piece: "Firecrawl",
    build: "$0",
    run: "$0",
    note: "Free credits cover the crawl. Keep it and it is $20/mo, but nothing here needs it again once the crawl is done.",
  },
  {
    piece: "Vercel",
    build: "$0",
    run: "$0",
    note: "Hobby is free and enough, including blob storage at this size. For a paying client, read the non-commercial clause.",
  },
  {
    piece: "Higgsfield",
    build: "not counted",
    run: "$0",
    note: "Per model, and it is the one number here I will not invent. The skill prices your run and waits for a yes before generating anything. Budget for it on top of the total below.",
  },
];

export const COST_TOTAL = { build: "~$35", run: "~$15/yr" };

export const COST_LESSON =
  "That $35 is one month of Claude plus a domain, and $15 of it is the only thing that recurs. If you already pay for Claude it is $15 to start. Asset generation sits on top of both numbers, which is why it is the one line above without a figure.";

/* ── the line ─────────────────────────────────────────────────────────
   This page names a real artist. That obliges the section below, and it
   is the reason the skill generates assets rather than downloading them. */

export const STRAIGHT_TALK = {
  title: "One thing to be straight about",
  body: [
    "Learning layout from a site you admire is normal practice. Copying its photography, wordmarks and written copy onto a public URL is not, and the line is not blurry.",
    "This generates your own assets for exactly that reason. The layout lesson is identical. The difference is you end up with something you can put your name on.",
  ],
};

export const NOT_COVERED = [
  "Anything dynamic. Real carts, real mailing lists, real payments. The moment something gets typed and saved you are on rung two, and the shape of the work changes.",
  "A CMS, or editing the content without touching code.",
  "Analytics, and SEO beyond a title and a social card.",
  "Putting someone else's images on a public site. Do not.",
];
