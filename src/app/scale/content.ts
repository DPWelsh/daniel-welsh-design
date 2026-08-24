/* ── /scale — Field Guide № 003 ───────────────────────────────────────
   Payload for the SCALE keyword. The reel names the nine swaps in eight
   seconds; the comment prompt asks what actually TRIGGERS each one, so
   every entry here leads with the signal to watch rather than the vendor.

   Deliberately no invented pricing. Published per-unit rates move, and a
   made-up number is the fastest way to lose someone who checks. Triggers
   are observable states — a line item you can point at, a limit you have
   already hit — which stay true regardless of this quarter's price sheet.

   Same nine rows, same three refusals, as the overlay in
   content/Routiq Stack Series/Animations/finals/tenk-rail.html. Change
   both or neither. */

export const LEDE =
  "Nine jobs. The same nine you started with. At 10,000 users six of them change hands and three do not move at all — and the three that stay are the more interesting half of the list.";

export type Swap = {
  no: string;
  from: string;
  to: string;
  tag: string;
  job: string;
  trigger: string;
  why: string;
  cost: string;
};

export const SWAPS: Swap[] = [
  {
    no: "01",
    from: "Supabase",
    to: "Neon",
    tag: "limits",
    job: "your database",
    trigger:
      "When connections, not rows, become the thing you manage. Serverless functions each hold one open, the pooler saturates long before storage does, and every preview environment wants its own copy of the data.",
    why: "Branching is the actual feature — a database branch per pull request, and the idle ones scale to zero instead of quietly billing.",
    cost: "You are walking away from the all-in-one. Auth, storage, realtime and row-level security were bundled; on Neon you wire those yourself.",
  },
  {
    no: "03",
    from: "Vercel",
    to: "Cloudflare",
    tag: "bandwidth",
    job: "your front end",
    trigger:
      "When egress shows up as a line item you can point at. It arrives with images, video and file-heavy pages — the bill starts tracking your traffic rather than your team.",
    why: "Bandwidth is the thing Cloudflare does not meter the way a platform host does, and at 10,000 users bandwidth is the number that moved.",
    cost: "You give up the Next.js-native ergonomics. Some of it is drop-in and some of it is a weekend you did not plan for — check your rendering model before you commit.",
  },
  {
    no: "04",
    from: "Railway",
    to: "AWS",
    tag: "the bill",
    job: "your back end",
    trigger:
      "When the convenience premium costs more than the engineer-hours it saves — or when you need something a convenience host structurally cannot give you: a VPC, a compliance boundary, a pinned region.",
    why: "This is the one people put off longest, because it is the only swap on the list that costs you real time rather than a config change.",
    cost: "Render is a lateral move. If you jump to another convenience host you will pay the migration twice and solve none of it. Go once, or stay put.",
  },
  {
    no: "07",
    from: "Twilio",
    to: "Telnyx",
    tag: "per minute",
    job: "your phone lines",
    trigger:
      "When per-minute and per-message costs stop being rounding errors. This one is pure arithmetic: same job, and at volume the rate difference is the whole argument.",
    why: "Nothing about the integration is exotic. It is the closest thing on this list to a like-for-like swap.",
    cost: "You are trading ecosystem depth and support surface for price. Worth it at volume, rarely worth it before.",
  },
  {
    no: "08",
    from: "Sentry",
    to: "Datadog",
    tag: "volume",
    job: "catch those bugs",
    trigger:
      "When you are paying three vendors to answer one question. Errors in one tool, logs in another, traces in a third, and an incident means opening all three.",
    why: "Consolidation, not savings. One dashboard eats logs, traces, metrics and errors, and the time you get back is the actual return.",
    cost: "Be honest about this one — Datadog's bill is famous for getting away from people. Set the ingest controls on day one, not after the first invoice.",
  },
  {
    no: "09",
    from: "PostHog",
    to: "Amplitude",
    tag: "volume",
    job: "session replay",
    trigger:
      "When event volume clears the free tier and the question changes. At 100 users you watch sessions. At 10,000 you cannot, so you need cohorts and retention curves instead.",
    why: "Different tool for a different question. Watching one person use your app and measuring what ten thousand do are not the same job.",
    cost: "You lose the replay you were relying on. Plenty of teams keep both and pay for it deliberately.",
  },
];

export type Stay = { name: string; job: string; why: string };

export const STAYS: Stay[] = [
  {
    name: "Claude",
    job: "for coding",
    why: "Nothing about 10,000 users changes what writes your code. This cost scales with how much you build, not with how many people use it — the two numbers are unrelated, which is why it never appears on a scaling list.",
  },
  {
    name: "Stripe",
    job: "to get paid",
    why: "The one place on the list where a migration has no upside. Rates come down at volume by asking, and the failure mode of moving payments is losing money in a way you cannot undo.",
  },
  {
    name: "ElevenLabs",
    job: "your voice AI",
    why: "Quality is the product here, not a feature of it. Cheaper voice at 10,000 users costs more in churn than the line item ever saves.",
  },
];

export const RULE_HEADLINE = "None of it was wrong at 100 users.";

export const RULE_BODY = [
  "This is the part people get backwards. They read a list like this and conclude they picked wrong on day one — so they start on the 10,000-user stack, pay for infrastructure nobody is using, and spend the first six months managing it instead of finding out whether anyone wants the thing.",
  "You are not picking the stack that survives 10,000 users. You are picking the one that gets you to your first hundred, and every tool in the left column is genuinely better at that job than its replacement.",
  "The swap is not a correction. It is a bill arriving, or a limit you hit. Wait for the signal, then move once.",
];

export const NOT_COVERED = [
  "Exact prices. They move, and a stale number is worse than none — every trigger above is a state you can observe instead.",
  "Auth. It sits underneath most of these and deserves its own guide rather than a line.",
  "The database migration itself, which is the one genuinely hard move on the list and is not a paragraph.",
];

export const CLOSING =
  "Six change, three stay, and the reason each one moves is a number you can already see on a bill or a limits page. If you cannot point at the signal yet, you are not there — and that is the good news.";
