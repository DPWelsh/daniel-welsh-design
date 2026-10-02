/* ── /higgsfield-vs-fal — follow-along runbook ────────────────────────
   One AI video, made twice: once in a creator UI on subscription credits
   (Higgsfield), once through a developer API billed per second (fal.ai).
   The point is not which platform is "best" — it is which billing model
   and workflow fits the way you actually produce.

   Verified 6 August 2026:
   - Seedance 2.0 on fal: price, params and model ids read off the live
     model page (standard $0.3024/s, fast $0.2419/s at 720p, durations
     4–15s, audio included).
   - fal client quickstart (npm i @fal-ai/client, FAL_KEY, fal.subscribe)
     confirmed against the docs.
   - Higgsfield's pricing page is a JS app that hides numbers from
     crawlers; the plan figures below are what third-party price trackers
     list this month, and step 02 makes you confirm them on the live page
     before paying. Both platforms reprice often — step 07 re-verifies. */

import type { RunbookContent, RunbookStep } from "@/components/runbook/types";

const VERIFIED_ON = "6 August 2026";

const LEDE =
  "The same shot, made twice: once in Higgsfield's creator UI on subscription credits, once through fal.ai's API at cents per second. Most comparisons review the demo reels. This one makes you produce one finished clip in each lane and price it per finished second, retakes included, because retakes, not demos, are where AI video costs live.";

const TIME_TOTAL = "45–90 min · one finished shot in each lane";

const STEPS: RunbookStep[] = [
  {
    id: "gate",
    n: "00",
    title: "Decide which lane you are in, or that you need neither",
    why: "The platforms are not rivals; they sell to different people. Picking by output quality alone answers the wrong question.",
    time: "5 min",
    notes: [
      "**Higgsfield is a creator product**: a UI, motion presets, a subscription with a monthly credit pool. You pay whether or not you generate, and iteration speed inside the UI is the product.",
      "**fal.ai is an inference API**: hundreds of hosted video models behind one client library, billed per second of output with no monthly minimum. The product is that it slots into code, pipelines and batch jobs.",
      "**Neither, sometimes.** If you need one clip for one post, the free tiers of half a dozen tools cover it. If your shot is of a real product or a real person doing a real thing, a phone on a $20 tripod still beats both lanes on trust per dollar.",
    ],
    warn:
      "If you cannot describe the one video you are about to make (subject, camera move, duration), do step 01 before you give either platform money. A subscription bought before the shot is defined is how credits expire unused.",
    checks: [
      "I can say in one sentence whether I am buying a tool for my hands or an API for my code",
      "I have a budget ceiling per finished second, even a rough one",
      "I checked that filming the real thing is not cheaper and more convincing",
    ],
  },
  {
    id: "shot",
    n: "01",
    title: "Define one shot, and freeze it",
    why: "A fair comparison needs the identical brief in both lanes. The shot card is the control variable.",
    time: "10 min",
    notes: [
      "One reference image, one camera move, one beat of action, 5–10 seconds. That is a shot. \"A video about my product\" is not.",
      "Write it once and paste it into both lanes verbatim, typos and all. The moment you tailor the prompt per platform, you are comparing your prompting, not the platforms.",
      "Pick a reference image you have rights to and host it at a public URL: the fal lane needs `image_url` to be fetchable.",
    ],
    tip:
      "Image-to-video is the honest test. Text-to-video lets each model invent a different scene and makes the outputs incomparable; starting both lanes from the same frame forces them to compete on motion, not on luck.",
    checks: [
      "My shot card fits on one screen and names subject, move and duration",
      "The reference image is at a public URL I control",
      "I committed to judging with the card, not with vibes",
    ],
    blocks: [
      {
        filename: "shot-card.md",
        body: `# Shot card: paste into both lanes unchanged

SUBJECT   one sentence, concrete
          e.g. "A ceramic pour-over coffee maker on a timber bench, morning side-light"

MOVE      one camera instruction
          e.g. "slow push-in, ~10% zoom over the clip, no cuts"

ACTION    one beat only
          e.g. "steam rises; a hand enters frame and lifts the kettle"

DURATION  8 seconds
FRAME     16:9, 720p is fine for judging
AUDIO     on if the lane includes it at no extra cost, else silent

REFERENCE https://<your-host>/<your-frame>.jpg`,
      },
    ],
  },
  {
    id: "higgsfield",
    n: "02",
    title: "Lane one: Higgsfield, on the free daily credits first",
    why: "The UI lane. The thing being measured is credits burned per finished take, and you can measure it without subscribing.",
    time: "15–25 min",
    notes: [
      "Higgsfield runs a **free tier with a small daily credit drip** and paid plans with monthly credit pools. As third-party price trackers list them this month: Starter around **$15/mo**, mid and top tiers to around **$49–129/mo**, pools on the order of hundreds to a few thousand credits, top-ups near **$5 per 100 credits** with expiry. Treat these as directions, not gospel: the live pricing page is the source of truth and the next check makes you read it.",
      "Generate from your reference image with the motion preset closest to your MOVE line. Note the **credit cost of a single take** before you run it: it varies by model and resolution, and it is the number the whole lane's economics hang off.",
      "Run the same shot at least three times. The retake rate is the real product review: a lane that needs six takes at high credit cost loses to a lane that needs two, whatever the demo reel says.",
    ],
    warn:
      "Credit pools expire on cycle and top-ups expire faster. A subscription sized to a heavy month bleeds on the quiet ones: size to your median month, and buy top-ups for spikes.",
    checks: [
      "I read the live pricing page and wrote down today's actual plan and credit numbers",
      "I know the credit cost of one take for my chosen model and resolution",
      "I produced at least one take I would publish, and counted the takes it took",
    ],
  },
  {
    id: "fal",
    n: "03",
    title: "Lane two: fal.ai, one script, billed per second",
    why: "The API lane. Same shot card, but the meter runs per second of output and only when you generate.",
    time: "15–25 min",
    notes: [
      "fal hosts hundreds of video models behind one client. Verified today on the live model page: **Seedance 2.0 image-to-video at $0.3024/s standard or $0.2419/s fast** (720p, durations 4–15s, audio included, model ids `bytedance/seedance-2.0/image-to-video` and `.../fast/image-to-video`).",
      "The same catalogue runs far cheaper models: the explore page lists image-to-video options down to a few cents per second (Kling and Wan class models around **$0.03–0.05/s** this month). The honest workflow is drafts on a cheap model, finals on a good one; the script below takes the model id as an argument for exactly that reason.",
      "Auth is one env var (`FAL_KEY`). `fal.subscribe` queues the job and polls for you, so a one-shot script feels synchronous.",
    ],
    tip:
      "An 8-second draft on a $0.05/s model is forty cents. Burn drafts there until the prompt is right, then pay the premium model once. This two-model loop is the whole cost advantage of the API lane.",
    checks: [
      "The script ran end to end and printed a video URL I could open",
      "I know my model's exact $/s and my clip's exact seconds, so I can price a take without guessing",
      "I ran the same shot card on a cheap model and a premium one and kept both files",
    ],
    blocks: [
      {
        filename: "fal-one-shot.mjs",
        body: `// npm i @fal-ai/client && export FAL_KEY=...   (key from fal.ai dashboard)
// usage: node fal-one-shot.mjs [modelId]
//   default is Seedance 2.0 standard; pass a cheaper id for drafts.
import { fal } from "@fal-ai/client";

const model = process.argv[2] ?? "bytedance/seedance-2.0/image-to-video";

if (!process.env.FAL_KEY) {
  console.error("FAL_KEY is not set; create a key in the fal dashboard first.");
  process.exit(1);
}

const result = await fal.subscribe(model, {
  input: {
    // paste the SHOT CARD lines here, unchanged from lane one
    prompt:
      "Slow push-in on a ceramic pour-over coffee maker on a timber bench, " +
      "morning side-light; steam rises; a hand enters frame and lifts the kettle.",
    image_url: "https://<your-host>/<your-frame>.jpg",
    resolution: "720p",
    duration: 8,
  },
  logs: true,
  onQueueUpdate: (u) => {
    if (u.status === "IN_PROGRESS")
      u.logs?.map((l) => l.message).forEach((m) => console.log("·", m));
  },
});

console.log("video:", result.data.video.url);`,
      },
    ],
  },
  {
    id: "cost",
    n: "04",
    title: "Price the finished second, retakes included",
    why: "Sticker prices compare subscriptions to meters, which is apples to fruit salad. Cost per published second is the only number that transfers.",
    time: "10 min",
    notes: [
      "**The formula is the same in both lanes:** (money the batch cost) ÷ (seconds of the take you kept). Retakes are in the numerator; only the keeper is in the denominator.",
      "**Credits lane:** dollars per credit is plan price ÷ monthly pool, but only if you use the pool. At half-used, your effective rate doubles. Price your real utilisation, not the brochure's.",
      "**Meter lane:** every take bills, kept or not. Four takes of 8s on Seedance standard is 32 metered seconds for 8 published ones, a 4× multiplier on the sticker $/s.",
    ],
    checks: [
      "I computed cost per finished second for my Higgsfield keeper",
      "I computed it for my fal keeper, drafts and retakes included",
      "I wrote both numbers on the shot card next to the take counts",
    ],
    blocks: [
      {
        filename: "cost-per-finished-second.txt",
        body: `worked example: 8s keeper, judged August 2026 prices

fal, two-model loop
  3 drafts  x 8s x $0.05/s  (cheap model)   = $1.20
  2 finals  x 8s x $0.3024/s (Seedance std) = $4.84
  total $6.04 for 8 published seconds       = $0.75 / finished second

fal, premium-only
  5 takes x 8s x $0.3024/s                  = $12.10
                                            = $1.51 / finished second

higgsfield (plug in YOUR numbers)
  ($ plan / credits in pool) x credits per take x takes / 8s
  the pool only counts if you use it: at 50% utilisation,
  double the per-credit price before comparing.`,
      },
    ],
  },
  {
    id: "judge",
    n: "05",
    title: "Judge both keepers with the same card",
    why: "Whichever lane you ran second always looks better: you got better at the prompt. The card corrects for that.",
    time: "10 min",
    notes: [
      "Score each keeper against the shot card only: subject fidelity to the reference frame, the MOVE actually performed, the one beat of ACTION present, no melted hands or morphing text, audio usable if generated.",
      "Watch each clip once at full size and once at the size it will actually ship (a phone, a feed). Most artifacting that kills a clip on a monitor is invisible at feed size, and paying premium rates for invisible quality is the classic overspend.",
      "If neither keeper passes the card, that is a finding, not a failure: your shot needs either a different reference frame or a real camera.",
    ],
    checks: [
      "Both keepers scored against the card, not against each other",
      "I checked at ship size, not just full screen",
      "I know which single failure mode (motion, faces, text, audio) decides my use case",
    ],
  },
  {
    id: "verdict",
    n: "06",
    title: "Pick your lane like a producer, not a fan",
    why: "The right answer is a workflow, and it is allowed to use both.",
    time: "5 min",
    notes: [
      "**Higgsfield wins** when the operator is a creator iterating by eye, volume is a few clips a week, and the presets land close to your look: the subscription is buying taste and speed-of-iteration, not seconds.",
      "**fal wins** when video generation sits inside a product or a pipeline, volume is spiky or batch, and you want to pick a different model per job: the meter is buying flexibility and a zero floor.",
      "**The hybrid is legitimate:** explore looks in a UI, then productionise the winning recipe through the API where the unit economics are visible. Plenty of teams land exactly there.",
    ],
    checks: [
      "I picked a lane (or the hybrid) and can defend it with my own cost-per-finished-second numbers",
      "I set a review date to re-run this when volume or prices change",
    ],
  },
  {
    id: "reverify",
    n: "07",
    title: "Re-verify before you trust any of this",
    why: "Video model pricing moves monthly and both platforms reprice without ceremony. This runbook has a shelf life: do not trust the date, check it.",
    time: "5 min",
    notes: [
      "The block below re-checks every load-bearing claim on this page against what is live today. Paste it into a fresh Claude session and make it cite the pages it read.",
    ],
    checks: [
      "I ran the re-verify prompt and updated my numbers where they drifted",
    ],
    blocks: [
      {
        filename: "paste into a fresh Claude session",
        body: `I'm following a runbook dated 6 Aug 2026 comparing Higgsfield and
fal.ai for producing one AI video. Re-check these against what's
current today and tell me specifically what has changed:

1. Higgsfield pricing: current plan names, monthly prices, credit
   pools, free daily credits, top-up price and expiry. Read the live
   pricing page, not blog posts.

2. fal.ai: is bytedance/seedance-2.0/image-to-video still live, and
   what is its current $/s for standard and fast at 720p? What are
   the cheapest credible image-to-video models on fal right now and
   their $/s?

3. Does @fal-ai/client still authenticate via the FAL_KEY env var,
   and is fal.subscribe still the blocking convenience method over
   the queue?

4. Any new lane that obsoletes this comparison, e.g. either
   platform adding the other's billing model, or a major model
   (Sora, Veo, Kling) shipping a direct API cheaper than fal's
   hosted price.

Cite the exact pages you checked and flag anything you could not
verify first-hand.`,
      },
    ],
  },
];

const CLOSING =
  "The lane matters less than the loop: freeze one shot, make it in both worlds, and price the finished second with retakes included. Whichever platform survives your own arithmetic is the right one, this month.";

export const CONTENT: RunbookContent = {
  slug: "higgsfield-vs-fal",
  number: "004",
  verifiedOn: VERIFIED_ON,
  title: "One AI video, two lanes:",
  titleAccent: "Higgsfield vs fal.ai.",
  lede: LEDE,
  timeTotal: TIME_TOTAL,
  closing: CLOSING,
  steps: STEPS,
};
