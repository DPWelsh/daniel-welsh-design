/* ── Supabase vs Neon ─────────────────────────────────────────────────
   The comparison people ask for, and the reason it's usually the wrong
   question. These two are not the same category: one is a backend, the
   other is a database. Most "should I move to Neon" questions are really
   "do I still need the bundle", and that has a different answer.

   The row counts in STILL_HERE are real, pulled from the production
   Supabase behind labs and the clinic apps on 5 Aug 2026. Deliberately no
   pricing anywhere on this page — it changes quarterly and would date the
   whole thing. Architecture doesn't. */

export const RULE =
  "You don't leave Supabase because Neon is faster. You leave when you stop needing the bundle and start needing the database.";

export const CATEGORY = {
  supabase:
    "A backend. Postgres, plus auth, storage, realtime, edge functions and row level security, wired together so a lot of apps need no server of their own at all.",
  neon:
    "A database. Postgres, with storage and compute pulled apart so it can branch, autoscale and sleep. No auth, no storage, no realtime. It does one thing.",
};

export interface Row {
  n: number;
  dim: string;
  supabase: string;
  neon: string;
  /** Who this actually favours, and why. No hedging. */
  note: string;
}

export const ROWS: Row[] = [
  { n: 1, dim: "What you get", supabase: "Postgres + auth + storage + realtime", neon: "Postgres",
    note: "The whole comparison in one line. If you use two or more of the extras, this is not a database decision." },
  { n: 2, dim: "Auth", supabase: "Built in, tied to RLS", neon: "Bring your own",
    note: "The single biggest lock-in, and the one people forget when they estimate the move." },
  { n: 3, dim: "Authorisation", supabase: "Row level security on the table", neon: "In your application code",
    note: "RLS is genuinely hard to give up once your policies encode real rules. Rewriting them as app code is the migration." },
  { n: 4, dim: "Branching", supabase: "Preview branches, heavier", neon: "Copy on write, near instant",
    note: "Neon's actual party trick. A real database per pull request, with production-shaped data, that costs almost nothing." },
  { n: 5, dim: "Idle cost", supabase: "Instance stays up", neon: "Scales to zero",
    note: "Neon wins clearly for spiky, bursty or many-small-databases workloads. Irrelevant if you serve steady traffic." },
  { n: 6, dim: "Scaling compute", supabase: "Resize the instance", neon: "Autoscales, storage separate from compute",
    note: "The architectural difference underneath everything else on this list." },
  { n: 7, dim: "Storage / files", supabase: "Included", neon: "Not its job",
    note: "You'd add S3 or R2. Fine, but it is another service and another set of credentials." },
  { n: 8, dim: "Realtime", supabase: "Included", neon: "Not its job",
    note: "If you're pushing live updates to a UI, leaving Supabase means building or buying this." },
  { n: 9, dim: "The data itself", supabase: "Postgres", neon: "Postgres",
    note: "This is why people think the move is easy. The data is the easy part. It was never the data." },
];

export const MOVE_YES = [
  "You already run your own auth, so the bundle is not doing anything for you.",
  "You want a real database branch per preview deploy, with production-shaped data.",
  "Your traffic is spiky or mostly idle, and paying for a sleeping instance annoys you.",
  "You need many databases, one per tenant, and want them to cost nothing when quiet.",
  "Your bottleneck is genuinely the database, and you have the query plans to prove it.",
];

export const MOVE_NO = [
  "You use Supabase auth. This is the whole migration, and it is not a database task.",
  "Your authorisation lives in RLS policies. Moving means rewriting them as application code, in a system where a mistake exposes other people's data.",
  "You use storage or realtime. Those become two more services to run.",
  "You are moving because of a benchmark you read rather than a query plan you have.",
  "Nothing is broken. This is the most common reason, and it is not a reason.",
];

/** The honest counter-example: real production numbers, still on Supabase. */
export const STILL_HERE = {
  lede:
    "The reason to move has not arrived here yet, and this is not a toy. These are live numbers from the Postgres behind the clinic apps, pulled the day this page was written.",
  stats: [
    { n: "147,458", l: "patients" },
    { n: "558,959", l: "appointments" },
    { n: "746,155", l: "rows across the main tables" },
  ],
  kicker:
    "Real clinics, real bookings, patient messages going out every day. Still Supabase, because auth and RLS are doing more work here than a faster Postgres would. The day that stops being true is the day it is worth moving, and not before.",
};

export const MIGRATION_TRUTH = [
  { t: "The data moves in an afternoon", d: "Both are Postgres. It is a dump and a restore. This is the part everyone plans for." },
  { t: "The auth does not", d: "Users, sessions, providers, password hashes, and every place your code assumed a Supabase session. This is the project." },
  { t: "The policies do not", d: "Every RLS policy becomes application code. Each one is now a place you can leak another tenant's data by forgetting a where clause." },
  { t: "The client libraries do not", d: "Every `supabase.from(...)` call becomes a query. Mechanical, tedious, and the exact kind of change that hides one bad filter." },
];
