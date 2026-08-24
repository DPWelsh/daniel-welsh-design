/* ── The stacks ───────────────────────────────────────────────────────
   Nine jobs, three answers. The nine never change: what changes is which
   tool you rent, own or outgrow.

   COLUMN ORDER IS PART ORDER. Starter is Part 1, at-10,000 is Part 2,
   self hosted is Part 3, matching the reels people arrive from. Somebody
   who watched Part 2 should find Part 2 in the second slot. Do not
   re-sort these into "logical" order — the reels are the index.

   Sources: the starter nine are Post 02's, the self-hosted column is
   researched with the fact-check block in Reels/Post 06b, the scale
   column is graded against the Post 02 comment section (Cloudflare,
   Neon, Render, Codex were all demanded by name). Anything a real clinic
   or commenter contradicted has already been changed. */

export interface StackRow {
  /** 1-9, the job number that never gets renumbered. */
  n: number;
  job: string;
  /** Part 1. */
  starter: string;
  /** Part 2. */
  scale: string;
  /** Part 3. Null when the honest answer is "don't". */
  selfHosted: string | null;
  /** Why it moves, or why it doesn't. One line, no hedging. */
  note: string;
}

export const STACK_ROWS: StackRow[] = [
  { n: 1, job: "Database", starter: "Supabase", scale: "Neon", selfHosted: "Supabase, self hosted",
    note: "It's open source, so owning it is a Docker command. Four people told me Neon at scale and they were right." },
  { n: 2, job: "Coding", starter: "Claude", scale: "Claude stays", selfHosted: "Ollama + an open model",
    note: "Open models are free, private and close enough now. At scale nothing beats it, whatever the comments say about Codex." },
  { n: 3, job: "Front end", starter: "Vercel", scale: "Cloudflare", selfHosted: "Coolify on a $10 box",
    note: "The one swap everybody agrees on. Seven people asked for Cloudflare by name." },
  { n: 4, job: "Back end", starter: "Railway", scale: "AWS", selfHosted: "The same box",
    note: "Self hosted, two subscriptions collapse into one server. At scale you don't swap it for Render, you swap it for a bill." },
  { n: 5, job: "Getting paid", starter: "Stripe", scale: "Stripe stays", selfHosted: null,
    note: "Nobody self hosts card processing. You'll IPO before you outgrow it." },
  { n: 6, job: "Voice AI", starter: "ElevenLabs", scale: "ElevenLabs stays", selfHosted: "Kokoro",
    note: "Kokoro is 82M params, Apache 2.0, runs on a CPU. It's also the only tool nobody argued with." },
  { n: 7, job: "Phone lines", starter: "Twilio", scale: "Telnyx", selfHosted: "Asterisk",
    note: "You can self host it. You probably won't. At volume Telnyx is the same job for roughly half." },
  { n: 8, job: "Bugs", starter: "Sentry", scale: "Datadog", selfHosted: "GlitchTip",
    note: "GlitchTip is Sentry compatible, so you just swap the DSN. At scale one dashboard eats the whole monitoring stack." },
  { n: 9, job: "Session replay", starter: "PostHog", scale: "Amplitude", selfHosted: "OpenReplay",
    note: "PostHog themselves say the self hosting maths rarely works. Believe them." },
];

export interface StackGuide {
  /** Matches the reel it came from, so Part 2 here is Part 2 there. */
  part: string;
  title: string;
  when: string;
  cost: string;
  catch: string;
}

export const STACK_GUIDES: StackGuide[] = [
  {
    part: "Part 1",
    title: "The starter stack",
    when: "You have shipped something and it has users you can count.",
    cost: "Mostly free tiers",
    catch: "Nothing. Stay here far longer than you think. Every swap below is something you do because you were forced to, not because it is better.",
  },
  {
    part: "Part 2",
    title: "At 10,000 users",
    when: "A limit or an invoice forced your hand. Not before.",
    cost: "Whatever the invoice says",
    catch: "Six of the nine move and three do not. Migrating early costs you the thing you were trying to save.",
  },
  {
    part: "Part 3",
    title: "Self hosted",
    when: "One bill has started to sting, or the data cannot leave your box.",
    cost: "About $15 a month",
    catch: "You just became your own DevOps team. Nine services are yours to patch, back up and restore at 2am. Self host one or two, not nine.",
  },
];

/* ── Should you self host? ────────────────────────────────────────────
   This is the payload the Instagram keyword promises ("comment STACKS"),
   so it has to actually answer the question rather than gesture at a
   table. Written as signals rather than a score: if any NO applies, the
   YES list does not matter.

   The rule underneath all of it: self host where the bill hurts and the
   blast radius is small. Rent anything that touches money, deliverability
   or your on-call. */

export const SELF_HOST_RULE =
  "Self host the ones where the bill hurts and the blast radius is small. Rent anything that touches money, deliverability, or a pager you do not carry.";

export const SELF_HOST_YES: string[] = [
  "One line item is now costing more per month than a server would.",
  "The data legally cannot sit on someone else's infrastructure. Health, government, EU residency.",
  "You already run a box and you have actually restored a backup, not just taken one.",
  "The tool is open source AND ships a maintained Docker image. Both, not either.",
  "Your usage is steady. Self hosting punishes spiky traffic, which is exactly what managed autoscaling is for.",
  "You are moving one or two services. Not nine.",
];

export const SELF_HOST_NO: string[] = [
  "You have not shipped yet. Nothing here matters until people are using it.",
  "You have never restored a backup. Taking one is not the same skill.",
  "The saving is under about fifty dollars a month. Your evening is worth more.",
  "It is payments. Never. Not once. Not ever.",
  "It is email deliverability. Your domain reputation is not worth the experiment.",
  "It is on your critical path and nobody is on call at 2am. That includes you, asleep.",
];
