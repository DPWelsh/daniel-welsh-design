/* ── /fast · Field Guide № 006 ────────────────────────────────────────
   Payload for the FAST keyword (Build Like a Pro 02, "3 things that make
   your app fast").

   Deliberately its own page rather than a section on /launch. /launch is
   the pre-launch list, before anyone has seen the thing. This is the
   opposite situation: it is live and it is slow. Different job, different
   moment, and /launch is already 34k characters.

   PROSE RULES (same as /launch and /easy):
   no em dashes, one idea per sentence, instruction first and reason
   second. Written for someone who built an app with AI help and is not a
   performance engineer.

   CLAIMS: Core Web Vitals thresholds verified against Google 2026-08-16
   (LCP under 2.5s, INP under 200ms, CLS under 0.1, assessed at the 75th
   percentile). Anything version-sensitive tells the reader to look at the
   tool rather than trust this page. */

export const LEDE =
  "Your app is slow and it is almost always the images. These three fixes are free, none of them need a rewrite, and the third one is the only way to know whether the first two worked. Do them in order.";

export const BEFORE = {
  h: "Before you change anything",
  lines: [
    "Measure first. If you start optimising before you have a number, you will not know what helped, and you will keep doing the thing that did nothing.",
    "You do not need to be technical. Two of these three are file conversions and a checkbox. Where something genuinely needs a developer, this page says so.",
    "Do it on the live site, not localhost. Your machine is faster than your users' phones and it will lie to you.",
  ],
};

/* ── the numbers that matter ─────────────────────────────────────────── */

export interface Vital {
  code: string;
  name: string;
  good: string;
  means: string;
}

export const VITALS: Vital[] = [
  {
    code: "LCP",
    name: "Largest Contentful Paint",
    good: "under 2.5 seconds",
    means: "How long until the biggest thing on screen has actually loaded. This is the one images wreck, and the one you will fix today.",
  },
  {
    code: "INP",
    name: "Interaction to Next Paint",
    good: "under 200 milliseconds",
    means: "How long the page takes to respond when someone taps something. Usually a JavaScript problem rather than an image one.",
  },
  {
    code: "CLS",
    name: "Cumulative Layout Shift",
    good: "under 0.1",
    means: "How much the page jumps around while loading. Almost always images and ads without a declared height.",
  },
];

export const VITALS_NOTE =
  "These are Google's own thresholds, checked August 2026. One detail people miss: your score is taken at the 75th percentile of real visits, so it is not about your fastest load, it is about your slower quarter. That is why testing on your laptop tells you nothing useful.";

/* ── the three ──────────────────────────────────────────────────────── */

export interface Step {
  n: string;
  body: string;
}

export interface ClaudeWay {
  setup: string;
  prompt: string;
  after: string;
}

export interface Alt {
  name: string;
  score: string;
  note: string;
  url: string;
}

/** Tutorials are YouTube SEARCHES, not video links. A named video rots the
 *  month its uploader renames it; a search stays correct. */
export interface Watch {
  label: string;
  q: string;
}

export interface Fix {
  n: string;
  id: string;
  title: string;
  time: string;
  what: string;
  claude: ClaudeWay;
  alts: Alt[];
  watch: Watch;
  steps: Step[];
  done: string;
  stuck: string;
  warn?: { h: string; body: string[] };
}

export const FIXES: Fix[] = [
  {
    n: "01",
    id: "images",
    title: "The images",
    time: "20 minutes",
    what: "This is nearly always the whole problem. A PNG straight out of Figma can be ten times bigger than it needs to be, and WebP does the same job at a fraction of the size. Nobody can see the difference. Your loading time can halve.",
    claude: {
      setup:
        "Claude can tell you which images are hurting you before you touch anything. Paste your URL and let it read the page.",
      prompt: `Look at this page: [paste your URL]

List the images that are slowing it down.
For each one tell me:
- the file size and the format
- what it should be instead
- roughly how much I would save

Then tell me which single image is costing me
the most, so I can start there.

I am not technical. Skip anything that needs
me to edit code unless there is no other way.`,
      after:
        "Now you have a list ordered by what actually matters, instead of converting forty files and hoping.",
    },
    alts: [
      {
        name: "Squoosh",
        score: "Free · made by Google · nothing to install",
        note: "Drag an image in, pick WebP, drag it back out. It shows you both versions side by side with a slider, so you can see exactly how far you can push it before quality drops. Start here.",
        url: "https://squoosh.app/",
      },
      {
        name: "TinyPNG",
        score: "Free tier · batch upload",
        note: "Better when you have twenty files rather than two. Handles PNG, JPEG and WebP in bulk.",
        url: "https://tinypng.com/",
      },
      {
        name: "Next.js Image component",
        score: "Free · already in your project",
        note: "If your app is Next.js, swapping the img tag for the Image component converts and resizes on the fly, forever, without you doing this again. This is the one that stops the problem coming back.",
        url: "https://nextjs.org/docs/app/api-reference/components/image",
      },
    ],
    watch: { label: "Watch someone convert a batch", q: "convert png to webp squoosh tutorial" },
    steps: [
      {
        n: "1",
        body: "Open your site, right click the biggest image on the page, and choose Inspect. The panel that opens shows the file size. If it is over 200KB for a normal photo, that is your problem sitting right there.",
      },
      {
        n: "2",
        body: "Go to squoosh.app and drag that image onto the page. Nothing uploads to a server, it converts in your browser.",
      },
      {
        n: "3",
        body: "On the right hand side there is a dropdown that probably says MozJPEG or PNG. Change it to WebP. Watch the file size number underneath change, usually to something between a quarter and a tenth of what it was.",
      },
      {
        n: "4",
        body: "Drag the slider in the middle of the picture left and right. That is a before and after. If you cannot see a difference, and you almost certainly cannot, click the download arrow at the bottom right.",
      },
      {
        n: "5",
        body: "Replace the old file with the new one wherever your images live, then do the same for the next five biggest. Five is enough to feel it. You are not trying to finish today.",
      },
    ],
    done: "Reload your live site and check that biggest image again in Inspect. The number should be a fraction of what it was, and the page should feel different before you have measured anything.",
    stuck: "If your images come out of a CMS or are uploaded by users, converting them by hand will not hold, because the next upload undoes it. That is the case for the Next.js Image component or an equivalent on your platform, which does the conversion automatically every time. Worth twenty minutes of a developer's time once.",
  },
  {
    n: "02",
    id: "loading",
    title: "Things loading that nobody needs",
    time: "30 minutes, and this one may need help",
    what: "Most slow apps are downloading code and fonts for pages the visitor is not looking at. A font you tried once and abandoned, an animation library used on one screen, an analytics tag from a tool you stopped paying for. It all still ships.",
    claude: {
      setup:
        "This one is genuinely hard to eyeball, so let the report do the finding and Claude do the reading.",
      prompt: `I ran PageSpeed Insights on my site and it
says I have unused JavaScript and unused CSS.

Here is what it listed:
[paste the file names and sizes from the report]

For each one tell me in plain English:
- what it probably is
- whether it is safe to remove
- how I remove it, step by step

My app is built with [say what you used, e.g.
Next.js, or Claude built it and I am not sure].`,
      after:
        "The report tells you what is heavy. Claude tells you what it is and whether losing it will break anything. Do not delete anything you cannot name.",
    },
    alts: [
      {
        name: "Chrome DevTools Coverage",
        score: "Free · already in your browser",
        note: "Shows you line by line how much of each file actually ran. Open DevTools, press Escape, choose Coverage from the panel that appears. Red is code that downloaded and never executed.",
        url: "https://developer.chrome.com/docs/devtools/coverage",
      },
      {
        name: "Google Fonts, self hosted",
        score: "Free",
        note: "Fonts are the quiet one. Every weight you load is a separate download, and most sites load six and use two. Cutting the ones you do not use is the easiest win in this whole section.",
        url: "https://fonts.google.com/",
      },
    ],
    watch: { label: "Watch someone read a coverage report", q: "chrome devtools coverage unused javascript tutorial" },
    steps: [
      {
        n: "1",
        body: "Run your site through pagespeed.web.dev first. Scroll to the section called Diagnostics and look for Reduce unused JavaScript and Reduce unused CSS. It lists the actual files and how much of each is wasted.",
      },
      {
        n: "2",
        body: "Start with your fonts, because it is the easiest and safest cut. Find where fonts load in your project and count the weights. If you are loading Light, Regular, Medium, Bold and Black but your site only ever uses two of them, delete the rest.",
      },
      {
        n: "3",
        body: "Now look at the list for anything you recognise as a tool you no longer use. An old analytics script, a chat widget you removed the button for, a library from a feature you cut. Those are safe deletions.",
      },
      {
        n: "4",
        body: "Anything you do not recognise, leave alone and ask Claude with the prompt above. Deleting something you cannot name is how you break a working app to save 40KB.",
      },
    ],
    done: "Run PageSpeed Insights again. The unused JavaScript and unused CSS numbers should both be smaller, and your score should have moved.",
    stuck: "If the report lists files with names like chunk-4f8a2b.js and nothing recognisable, that is bundled code and you cannot pick it apart by hand. That is a genuine developer job. Do items 01 and 03 instead, they will give you most of the win anyway.",
  },
  {
    n: "03",
    id: "measure",
    title: "Stop guessing",
    time: "5 minutes",
    what: "This is last on the list and it is the one that makes the other two mean anything. Without a number before and after, you are redecorating in the dark. It is also free and takes about thirty seconds to run.",
    claude: {
      setup:
        "Run the test first, then have Claude translate it. PageSpeed reports are written for developers and most of it is noise for your purposes.",
      prompt: `Here is my PageSpeed Insights result:
[paste the whole thing, or the scores and
the top few Opportunities]

Tell me:
- what is actually wrong, in plain English
- the ONE thing to fix first for the biggest gain
- roughly how much faster that will make it
- whether I can do it myself or need a developer

Ignore anything that would save less than
half a second. I do not want a list of twenty
things, I want the one that matters.`,
      after:
        "Asking for one thing rather than the whole list is the trick. The report gives you twenty. Nineteen of them are not worth your afternoon.",
    },
    alts: [
      {
        name: "PageSpeed Insights",
        score: "Free · no account · nothing to install",
        note: "The one to use. Paste your URL, get a score out of 100 for mobile and desktop, plus a list of what to fix in order of impact. Where the score comes from real visitors it is showing you what people actually experience, not a simulation.",
        url: "https://pagespeed.web.dev/",
      },
      {
        name: "Lighthouse, in Chrome",
        score: "Free · already in your browser",
        note: "Same engine, run locally. Useful because you can test a page behind a login, which PageSpeed Insights cannot reach. Open DevTools and pick the Lighthouse tab.",
        url: "https://developer.chrome.com/docs/lighthouse/overview",
      },
    ],
    watch: { label: "Watch someone read a report", q: "pagespeed insights how to read report beginners" },
    steps: [
      {
        n: "1",
        body: "Go to pagespeed.web.dev, paste your live URL, press Analyze. Wait about thirty seconds.",
      },
      {
        n: "2",
        body: "Screenshot the result before you change anything. This is your before. Without it you will genuinely not remember whether it was 41 or 61 last week.",
      },
      {
        n: "3",
        body: "Look at Mobile first, not Desktop. Almost everyone visiting you is on a phone on ordinary data, and the mobile score is usually much worse and much more honest.",
      },
      {
        n: "4",
        body: "Scroll to Opportunities. It is already sorted by how much time each fix saves. Do the top one. Ignore the rest for now.",
      },
      {
        n: "5",
        body: "Make that one change, wait a few minutes, and run it again. If the number moved, you learned something real. If it did not, you just saved yourself from doing nineteen more things that would also not have worked.",
      },
    ],
    done: "You have a before screenshot and an after screenshot, and the number went up. That is the whole job.",
    stuck: "If your score bounces around by ten points between runs, that is normal. The lab test simulates a slower device and there is variance. Run it three times and take the middle one, or trust the real-visitor section instead, which is averaged over 28 days.",
    warn: {
      h: "A score is not the point",
      body: [
        "Chasing 100 out of 100 is a good way to lose a weekend. The score is a proxy. What matters is whether the page feels fast to someone on a phone, and the thresholds are the honest version of that: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1.",
        "Get into the green and stop. The difference between 92 and 100 is invisible to every human being who will ever use your app.",
      ],
    },
  },
];

/* ── limits ─────────────────────────────────────────────────────────── */

export const NOT_COVERED = [
  "Server speed and hosting. Everything here is what your app sends to the browser. If your database queries take four seconds, no amount of image compression saves you, and that is a different guide.",
  "SEO. Speed is one input among many. A fast page about nothing still ranks for nothing.",
  "Native apps. This is the web list. App store performance is a different set of tools entirely.",
];

export const CLOSING =
  "Almost every slow app I have been sent is slow for the same reason, and it is the images. Fix those first, measure it, and stop. The other ninety things on the report can wait until they are the actual problem.";
