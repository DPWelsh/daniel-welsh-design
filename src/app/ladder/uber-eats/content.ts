/* ── /ladder/uber-eats, rung 6 reference ─────────────────────────────
   A technical reference for building an order → payment → dispatch app,
   not an essay. Someone landing here should be able to lift the component
   list, the state machines, the invariants and the build order straight
   into their own project.

   NO NARRATIVE. Earlier versions opened with "you are starving, watching a
   little car on a map" and told the story of how the schema evolved. Both
   are gone. Every section is now a spec: what the thing is, what it must
   guarantee, what breaks if it does not.

   AUTHORITY FRAMING (same rule as /ship): name the trap and the fix, never
   how many times we got it wrong.

   ANONYMITY, non-negotiable: the client app is never named, and its
   payments provider / delivery partner / POS are never named individually
   OR together, together they identify the company. Never quote migration
   filenames; several contain a partner's name. */

export const LEDE =
  "Reference architecture for an app that takes an order, charges a card and dispatches a driver. The components, the state machines, the invariants that stop it double-charging or double-dispatching, the order to build them in, and what it costs to build and to run.";

/* The difficulty stamp. Same four dimensions on every rung sheet so they
   can be read side by side, that comparison is the point of the ladder. */
export const DIFFICULTY = {
  rung: 6,
  of: 7,
  time: "a year before you trust it",
  /** The headline number. Shown large on the stamp. */
  cost: "$750",
  costNote: "a year in platform costs, before people.",
  blastRadius: "a real person's evening, and a merchant's revenue",
  reversible: "No. The card is charged and the driver is moving.",
  floor: "~US$750/yr in platform costs. People and per-transaction fees are the real bill.",
};

export const SCOPE =
  "Applies to any app where software acts on a customer's behalf after payment: food delivery, courier, on-demand services, marketplace fulfilment. The pattern is the same. What changes is who the driver is.";

/* ── architecture ─────────────────────────────────────────────────── */

export type Component = { name: string; tech: string; owns: string };

export const COMPONENTS: Component[] = [
  {
    name: "Customer app, iOS",
    tech: "Native. Swift + SwiftUI.",
    owns: "Browse, cart, checkout, order tracking. Holds no business logic that matters, it can be wrong or out of date at any time.",
  },
  {
    name: "Customer app, Android",
    tech: "Native. Kotlin + Jetpack Compose.",
    owns: "Same surface as iOS. Budget it as a second build, not a port: separate toolchain, separate store review, separate release cadence.",
  },
  {
    name: "Operator dashboard",
    tech: "Next.js + React, server-side auth.",
    owns: "Order queue, menu and stock overrides, refunds, manual intervention. Required before launch, someone must be able to run the business.",
  },
  {
    name: "Database",
    tech: "Postgres, with row-level security.",
    owns: "The single source of truth. All three clients read and write here and nowhere else.",
  },
  {
    name: "Server-side functions",
    tech: "Serverless, TypeScript. ~12 of them.",
    owns: "Everything involving money, external providers, or acting on the customer's behalf. None of it is callable from a client.",
  },
  {
    name: "Realtime channel",
    tech: "Postgres change feed over websockets.",
    owns: "Live order status to the customer app and the dashboard. Replaces polling; roughly a one-line subscription per client.",
  },
];

/* ── data model ───────────────────────────────────────────────────── */

export const ORDER_STATES = [
  "draft",
  "received",
  "preparing",
  "ready",
  "out_for_delivery",
  "completed",
  "cancelled",
  "failed",
];

export const PAYMENT_STATES = [
  "pending",
  "paid",
  "failed",
  "expired",
  "refunded",
  "voided",
];

export const STATE_NOTE =
  "Two independent state machines on the same order. They are not a single status field and must never be collapsed into one. Legal combinations include payment=refunded with order=out_for_delivery, the customer has been refunded and a driver is still en route. Your dashboard, your notifications and your reconciliation all need an answer for it.";

export const STATE_RULES = [
  "Store transitions, not just current state. Append-only, with a timestamp and the actor. Support and dispute resolution are impossible without it.",
  "Terminal states (completed, cancelled, failed) must be terminal. Guard the transition in the database, not the application.",
  "draft exists so an abandoned cart is not an order. Do not let a client create anything past draft.",
];

/* ── server functions ─────────────────────────────────────────────── */

export type Fn = { name: string; job: string; trust: string };

export const FUNCTIONS: Fn[] = [
  { name: "create-payment", job: "Creates the payment intent with the provider and returns the client secret or redirect.", trust: "Client-callable, authenticated, amount computed server-side from the cart. Never trust a price sent by a phone." },
  { name: "payment-webhook", job: "Receives paid / failed / expired / refunded from the payment provider.", trust: "Public endpoint. Verify the signature, then treat it as untrusted input." },
  { name: "delivery-quote", job: "Asks the delivery provider what a job will cost before checkout.", trust: "Client-callable. Cache it; quotes are rate-limited and cost money." },
  { name: "dispatcher", job: "Books the delivery job. The only thing permitted to create a driver task.", trust: "Service role only. Never client-callable, under any circumstance." },
  { name: "delivery-webhook", job: "Receives driver assigned / picked up / delivered / cancelled.", trust: "Public endpoint, signature-verified, idempotent." },
  { name: "delivery-status", job: "Read-through for the tracking UI.", trust: "Client-callable, scoped to the caller's own orders by RLS." },
  { name: "menu-sync", job: "Pulls catalogue, prices and availability from the merchant's POS.", trust: "Scheduled. Must survive the POS being down without corrupting the local catalogue." },
  { name: "order-push", job: "Pushes the paid order into the merchant's POS so it prints in the kitchen.", trust: "Service role, retried, idempotent on the POS side too." },
  { name: "send-push", job: "Fans out status-change notifications to devices.", trust: "Service role. Triggered by a status transition, not by the client." },
  { name: "delete-account", job: "Deletes the user and records that deletion was requested.", trust: "Client-callable. Mandatory for both app stores if you have accounts." },
];

/* ── invariants ───────────────────────────────────────────────────── */

export type Invariant = { rule: string; how: string; breaks: string };

export const INVARIANTS: Invariant[] = [
  {
    rule: "One payment per order.",
    how: "A unique constraint on payment_intents(order_id). Enforced by the database, not by application checks.",
    breaks: "Payment providers retry webhooks. A duplicate delivery double-charges the customer or double-credits the order.",
  },
  {
    rule: "Dispatch fires once, on the payment transition, server-side only.",
    how: "Trigger dispatch off the transition into paid, not off the current status. Service-role only, never exposed to a client.",
    breaks: "Retries or a replayed webhook send two drivers to one address, and you pay both.",
  },
  {
    rule: "Every external write is idempotent.",
    how: "Pass an idempotency key to the provider, and key your own writes on the provider's event id so replays are no-ops.",
    breaks: "Networks time out mid-call. Without keys you cannot safely retry, and not retrying loses orders.",
  },
  {
    rule: "Every external call checks a runtime flag first.",
    how: "A config row read at request time, not an environment variable and not a build constant.",
    breaks: "A provider outage becomes an app-store release. Review latency is ~24h; a dinner service is ~90 minutes.",
  },
  {
    rule: "Prices and totals are computed server-side.",
    how: "The client sends item ids and quantities. Nothing else.",
    breaks: "A client-supplied total is a free-money bug.",
  },
];

/* ── integrations ─────────────────────────────────────────────────── */

export type Integration = { name: string; direction: string; notes: string[] };

export const INTEGRATIONS: Integration[] = [
  {
    name: "Payments",
    direction: "Outbound intent, inbound webhook.",
    notes: [
      "Webhooks arrive more than once, out of order, and occasionally for orders you have already terminated.",
      "Handle refunded and voided as first-class states, not error branches.",
      "Reconcile daily against the provider. Your database and their ledger will drift.",
    ],
  },
  {
    name: "Delivery",
    direction: "Quote, dispatch, status webhook.",
    notes: [
      "Put it behind the runtime flag from day one, with a mock provider implementing the same interface.",
      "The mock lets you build and ship the whole order path before commercial terms are signed.",
      "Quote at checkout and re-resolve at dispatch. The fee can move between the two.",
    ],
  },
  {
    name: "Merchant POS",
    direction: "Menu in, order out.",
    notes: [
      "You do not own the catalogue. Sync it, and treat every sync as potentially partial.",
      "Never delete local items on a failed sync. Mark unavailable instead.",
      "Their outage is your outage as far as the customer is concerned.",
    ],
  },
  {
    name: "Push notifications",
    direction: "Outbound, per device token.",
    notes: [
      "Requires a signing key per platform. Keep it out of the repository.",
      "Token churn is constant. Store per-device and prune on rejection.",
    ],
  },
];

/* ── observability ────────────────────────────────────────────────── */

export const OBSERVABILITY = [
  "Product analytics and error tracking are different tools and you need both. Analytics shows a checkout abandoned; error tracking shows whether the app crashed doing it. The two look identical from the outside and need opposite responses.",
  "Log every state transition with a correlation id that spans client, function and provider. Support questions are always 'what happened to order X'.",
  "Alert on the transition that did not happen: paid with no dispatch inside N seconds. Absence is the failure mode on this rung, and nothing throws an exception when work simply never starts.",
];

/* ── build order ──────────────────────────────────────────────────── */

export const ORDER: string[] = [
  "Schema and state machines. Orders, items, both status enums, the transition log, RLS. Nothing renders until this is settled.",
  "Payment path in test mode, including duplicate webhooks, refunds and pay-after-close. Least fun, most expensive to retrofit.",
  "Dispatch behind the runtime flag, against a mock provider. Real provider becomes a config change later, not a rewrite.",
  "POS sync, in both directions, with partial-failure handling.",
  "Operator dashboard. The business must be operable before a customer touches it.",
  "Customer apps. Last, because they change most once the four above are real.",
];

/* ── cost ─────────────────────────────────────────────────────────── */

/* All USD, list price, checked Aug 2026. Vendors change these, re-check
   before quoting. Payment and delivery rates are deliberately absent: they
   are negotiated per merchant and per market, and a made-up percentage is
   worse than none. */

export const COST_BUILD_NOTE =
  "Close to zero in platform spend. Free tiers cover the entire build, and the only unavoidable line items are the developer accounts you need before you can test on real hardware. The build cost of a rung-six app is time, not infrastructure, which is why infrastructure is the wrong thing to be comparing when you scope one.";

export type CostLine = { item: string; cost: string; note: string };

export const COST_BUILD: CostLine[] = [
  { item: "Apple Developer Program", cost: "US$99/yr", note: "Required before TestFlight or any on-device testing. Starts the day you enrol, not the day you launch." },
  { item: "Google Play", cost: "US$25 once", note: "One-off, for the life of the account." },
  { item: "Domain", cost: "~US$15/yr", note: "For the dashboard and your deep links." },
  { item: "Supabase (Postgres, auth, realtime, storage, functions)", cost: "$0", note: "Free tier: 500 MB database, 5 GB egress, 50k monthly active users, 500k function calls, 2M realtime messages, 200 concurrent connections." },
  { item: "Vercel (dashboard hosting)", cost: "$0", note: "Hobby tier covers a build. Read the terms before launch, it is non-commercial." },
  { item: "PostHog (analytics, replay, flags, error tracking)", cost: "$0", note: "Free monthly: 1M events, 5k session replays, 1M feature-flag requests, 100k exceptions. No platform fee at any tier." },
  { item: "Push (APNs / FCM)", cost: "$0", note: "Both free. The cost is the signing key handling, not the service." },
  { item: "Google Maps / Places", cost: "usage", note: "Address autocomplete and place details. The old US$200/mo blanket credit ended 28 Feb 2025, so this bills from the first request now, budget it rather than assuming it is free." },
  { item: "Payments and delivery sandboxes", cost: "$0", note: "Test modes are free. You will live in them for weeks." },
];

export const COST_BUILD_TOTAL = "~US$140 in the first year. The rest of the build cost is time.";

export const COST_RUN_NOTE =
  "Three layers, and they behave differently. The floor is fixed and small. The usage layer steps up as activity grows. The per-transaction layer scales linearly with revenue and never stops. Most people budget the first and are surprised by the third.";

export const COST_RUN_FLOOR: CostLine[] = [
  { item: "Apple Developer Program", cost: "US$99/yr", note: "Lapses and the app is delisted." },
  { item: "Google Play", cost: "$0", note: "Already paid. No renewal." },
  { item: "Domain", cost: "~US$15/yr", note: "The only line that can kill the whole thing if you forget it." },
  { item: "Supabase Pro", cost: "US$25/mo", note: "8 GB database, 250 GB egress, 100k monthly active users, 2M function calls, 5M realtime messages, 500 concurrent connections. Team tier is US$599/mo and you will know when you need it." },
  { item: "Vercel Pro", cost: "US$20/mo", note: "The tier whose terms permit commercial use. Per seat, so it grows with the team not the traffic." },
  { item: "PostHog", cost: "$0", note: "No platform fee. You stay at zero until you exceed the free monthly allowances." },
  { item: "Push, APNs / FCM", cost: "$0", note: "Free at any volume." },
];

export const COST_RUN_FLOOR_TOTAL =
  "≈ US$45/mo plus US$114/yr, so roughly US$650–750 a year all-in before a single order is placed. For an app that takes money and dispatches drivers, the infrastructure floor is genuinely small, which is exactly why it is the wrong number to focus on.";

export const COST_RUN_USAGE: CostLine[] = [
  { item: "Database beyond 8 GB", cost: "US$0.125/GB", note: "Order history and transition logs grow forever unless you archive." },
  { item: "Egress beyond 250 GB", cost: "US$0.09/GB", note: "Menu photography is the driver. Compress and cache before you scale." },
  { item: "Function calls beyond 2M", cost: "US$2 per 1M", note: "Webhooks and status reads dominate. Cheap, and rarely the problem." },
  { item: "Realtime messages beyond 5M", cost: "US$2.50 per 1M", note: "Every status change fans out to every subscribed client." },
  { item: "Concurrent connections beyond 500", cost: "US$10 per 1,000", note: "The one that bites. See below." },
  { item: "Monthly active users beyond 100k", cost: "US$0.00325 each", note: "Only counts authenticated users, so it lags order volume." },
  { item: "Analytics events beyond 1M/mo", cost: "from US$0.00005 each", note: "Rate drops with volume. Instrument deliberately or an order becomes 40 events." },
  { item: "Session replays beyond 5k/mo", cost: "from US$0.005 each", note: "The most expensive per unit. Sample it, do not record everyone." },
  { item: "Exceptions beyond 100k/mo", cost: "from US$0.00037 each", note: "Error tracking lives here too, so it is one bill rather than a separate vendor." },
  { item: "Google Maps / Places", cost: "per request", note: "Autocomplete keystrokes are free, but the place-details call that resolves the chosen address is billed, once per checkout. Scales with orders, not with users." },
];

export const CONNECTIONS_TRAP =
  "Concurrent realtime connections are the capacity number to plan against, not database size. A live tracking screen holds a connection open for the whole delivery, so peak connections is roughly peak simultaneous orders in flight, plus every dashboard someone left open in the kitchen. The 500 included on a production tier is therefore a real operational ceiling: about 500 orders being watched at once. Know that number before a Friday night finds it for you, and cap it by closing the subscription when an order reaches a terminal state.";

export const COST_RUN_TRANSACTION = [
  "Payment processing: a percentage plus a fixed fee on every order. Rates vary by provider, market and volume, and are negotiable once you have volume.",
  "Delivery: charged per job, whether the job succeeds or is cancelled at the door.",
  "These two are the entire cost model at scale. At meaningful order volume they dwarf every line above, and no amount of infrastructure tuning touches them.",
];

export const COST_PEOPLE =
  "The line nobody puts in the spreadsheet is a person who can be reached during service. Something will fail while orders are live, and the response is to flip a flag or refund a customer, not to write code. Below rung five that is an inbox you read on Monday. Here it is a roster, and it is the single largest running cost of a rung-six app.";

export const NOT_COVERED = [
  "Running your own courier fleet. Riders, routing, and driver payouts is a separate business, and rung seven.",
  "Multi-merchant marketplace mechanics: commissions, payouts, and settlement across many sellers.",
  "Anything identifying the client build this is drawn from.",
];

export const CLOSING =
  "The difficulty on this rung is not code volume. It is that the system acts unattended, so every failure mode is a real-world side effect that no deploy reverses. The invariants above are the whole job.";
