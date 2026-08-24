import type { Metadata } from "next";
import Link from "next/link";
import { GuideNav } from "@/components/guide-nav";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import {
  CLOSING,
  COMPONENTS,
  CONNECTIONS_TRAP,
  COST_BUILD,
  COST_BUILD_NOTE,
  COST_BUILD_TOTAL,
  COST_PEOPLE,
  COST_RUN_FLOOR,
  COST_RUN_FLOOR_TOTAL,
  COST_RUN_NOTE,
  COST_RUN_TRANSACTION,
  COST_RUN_USAGE,
  DIFFICULTY,
  FUNCTIONS,
  INTEGRATIONS,
  INVARIANTS,
  LEDE,
  NOT_COVERED,
  OBSERVABILITY,
  ORDER,
  ORDER_STATES,
  PAYMENT_STATES,
  SCOPE,
  STATE_NOTE,
  STATE_RULES,
} from "./content";
import {
  DIM,
  ENERGY,
  FAINT,
  GRAIN,
  INDIGO,
  Kicker,
  PAPER,
  PROMPT,
  RULE,
  RULE_SOFT,
  SectionHead,
  mono,
  serif,
} from "../../scratch/ui";

/**
 * /ladder/uber-eats, rung 6 reference.
 *
 * A spec, not an essay. Reference-shaped: dense, scannable, monospace for
 * anything that appears in code. Someone should be able to lift the
 * component list, state machines, invariants and build order into their
 * own project without reading prose.
 *
 * See content.ts for the three standing rules: no narrative, authority
 * framing, and the anonymity constraint on the client build.
 */

export const metadata: Metadata = {
  title: "Order → Payment → Dispatch: A Reference Architecture",
  description:
    "Components, state machines, server functions, and the invariants that stop an order-and-dispatch app double-charging or double-dispatching. Rung six of the ladder.",
  alternates: { canonical: "/ladder/uber-eats" },
  openGraph: {
    title: "Order → Payment → Dispatch: A Reference Architecture",
    description:
      "What to build, in what order, and the five invariants that matter when software acts on a customer's behalf.",
    url: "https://danielwelsh.design/ladder/uber-eats",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

const CHIP = `${mono} rounded border px-2 py-1 text-[11px]`;

export default function UberEatsBuildPage() {
  return (
    <main
      className="relative min-h-screen overflow-x-clip antialiased selection:bg-[#7ba2e0] selection:text-[#161613]"
      style={{ background: "#161613", color: PAPER }}
    >
      <GuideNav />
      <style>{`
        @keyframes sc-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .sc-rise { animation: sc-rise 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .sc-rise { animation: none; } }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: "Order → Payment → Dispatch: A Reference Architecture",
            author: { "@type": "Person", name: "Daniel Welsh" },
            publisher: { "@type": "Person", name: "Daniel Welsh" },
            url: "https://danielwelsh.design/ladder/uber-eats",
          }),
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px]"
        style={{ background: `radial-gradient(60% 100% at 50% 0%, ${INDIGO}88, transparent 70%)` }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        {/* ── Masthead ─────────────────────────────────────────── */}
        <header className="pt-10">
          <div
            className={`${mono} sc-rise flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b pb-3 text-[10px] uppercase tracking-[0.25em]`}
            style={{ borderColor: RULE, color: FAINT }}
          >
            <Link href="/ladder" className="transition-colors hover:text-[#7ba2e0]">
              ← The ladder
            </Link>
            <span>Rung 06 · reference</span>
          </div>

          <div className="pt-12 sm:pt-16">
            <Kicker>Reference architecture</Kicker>
            <h1
              className={`${serif} sc-rise mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl`}
              style={{ animationDelay: "0.08s" }}
            >
              Order <span style={{ color: PROMPT }}>→</span> payment{" "}
              <span style={{ color: PROMPT }}>→</span> dispatch
            </h1>
            <p
              className="sc-rise mt-6 max-w-2xl text-[16px] leading-relaxed"
              style={{ color: DIM, animationDelay: "0.16s" }}
            >
              {LEDE}
            </p>
            <p
              className={`${mono} sc-rise mt-5 max-w-2xl border-l-2 py-1 pl-4 text-[13px] leading-relaxed`}
              style={{ borderColor: PROMPT, color: FAINT, animationDelay: "0.2s" }}
            >
              {SCOPE}
            </p>
          </div>

          {/* difficulty stamp, same four dimensions on every rung sheet */}
          <div
            className="sc-rise mt-10 border-2 p-5 sm:p-6"
            style={{ borderColor: ENERGY, animationDelay: "0.28s" }}
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <span
                className={`${mono} text-[11px] font-bold uppercase tracking-[0.25em]`}
                style={{ color: ENERGY }}
              >
                Difficulty
              </span>
              <span className="flex gap-1" aria-hidden>
                {Array.from({ length: DIFFICULTY.of }, (_, i) => (
                  <span
                    key={i}
                    className="block h-3 w-6"
                    style={{
                      background: i < DIFFICULTY.rung ? ENERGY : "transparent",
                      border: `1px solid ${i < DIFFICULTY.rung ? ENERGY : RULE}`,
                    }}
                  />
                ))}
              </span>
              <span className={`${mono} text-[13px] font-bold`} style={{ color: PAPER }}>
                rung {DIFFICULTY.rung} of {DIFFICULTY.of}
              </span>
              <span className="ml-auto flex items-baseline gap-2">
                <span className={`${serif} text-3xl font-black leading-none sm:text-4xl`} style={{ color: ENERGY }}>
                  {DIFFICULTY.cost}
                </span>
                <span className={`${mono} max-w-[11rem] text-[10px] leading-tight`} style={{ color: FAINT }}>
                  {DIFFICULTY.costNote}
                </span>
              </span>
            </div>

            <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {[
                ["Time to trust it", DIFFICULTY.time],
                ["Blast radius", DIFFICULTY.blastRadius],
                ["Reversible", DIFFICULTY.reversible],
                ["Platform floor", DIFFICULTY.floor],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt
                    className={`${mono} text-[10px] uppercase tracking-[0.25em]`}
                    style={{ color: FAINT }}
                  >
                    {k}
                  </dt>
                  <dd className="mt-1 text-[14px] leading-relaxed" style={{ color: PAPER }}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* ── 1. Components ────────────────────────────────────── */}
        <section id="components" className="scroll-mt-8 pt-20">
          <SectionHead part="01" title="Components" />
          <ul className="mt-8 space-y-px">
            {COMPONENTS.map((c) => (
              <li key={c.name} className="border-t py-5" style={{ borderColor: RULE_SOFT }}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[17px] font-semibold" style={{ color: PAPER }}>
                    {c.name}
                  </h3>
                  <span className={`${mono} text-[12px]`} style={{ color: PROMPT }}>
                    {c.tech}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                  {c.owns}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 2. State ─────────────────────────────────────────── */}
        <section id="state" className="scroll-mt-8 pt-20">
          <SectionHead part="02" title="State machines" />

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {[
              { label: "order_status", values: ORDER_STATES },
              { label: "payment_status", values: PAYMENT_STATES },
            ].map((m) => (
              <div key={m.label}>
                <span
                  className={`${mono} text-[11px] uppercase tracking-[0.2em]`}
                  style={{ color: PROMPT }}
                >
                  {m.label}
                </span>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {m.values.map((v) => (
                    <li
                      key={v}
                      className={CHIP}
                      style={{ borderColor: RULE, color: PAPER }}
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p
            className="mt-8 max-w-2xl border-l-2 py-1 pl-4 text-[15px] leading-relaxed"
            style={{ borderColor: `${ENERGY}88`, color: PAPER }}
          >
            {STATE_NOTE}
          </p>

          <ul className="mt-6 space-y-2.5">
            {STATE_RULES.map((r, i) => (
              <li key={i} className="flex gap-3.5 text-[15px] leading-relaxed" style={{ color: DIM }}>
                <span className={`${mono} shrink-0 pt-0.5 text-[11px]`} style={{ color: FAINT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 3. Functions ─────────────────────────────────────── */}
        <section id="functions" className="scroll-mt-8 pt-20">
          <SectionHead
            part="03"
            title="Server-side functions"
            lede="Everything touching money, an external provider, or acting for the customer. The trust column is the part that matters."
          />
          <ul className="mt-8 space-y-px">
            {FUNCTIONS.map((f) => (
              <li key={f.name} className="border-t py-4" style={{ borderColor: RULE_SOFT }}>
                <code className={`${mono} text-[13px] font-bold`} style={{ color: PROMPT }}>
                  {f.name}
                </code>
                <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed" style={{ color: PAPER }}>
                  {f.job}
                </p>
                <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed" style={{ color: FAINT }}>
                  {f.trust}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 4. Invariants ────────────────────────────────────── */}
        <section id="invariants" className="scroll-mt-8 pt-20">
          <SectionHead
            part="04"
            title="Invariants"
            lede="Enforce these in the database or the platform, not in application code. They are the difference between a demo and a system."
            color={ENERGY}
          />
          <div className="mt-8 space-y-px">
            {INVARIANTS.map((inv, i) => (
              <article key={i} className="border-t py-6" style={{ borderColor: RULE_SOFT }}>
                <h3 className={`${serif} text-xl font-black sm:text-2xl`} style={{ color: PAPER }}>
                  {inv.rule}
                </h3>
                <dl className="mt-4 space-y-3">
                  <div className="grid gap-x-5 gap-y-1 sm:grid-cols-[7rem_1fr]">
                    <dt
                      className={`${mono} text-[10px] uppercase tracking-[0.25em]`}
                      style={{ color: PROMPT }}
                    >
                      Enforce
                    </dt>
                    <dd className="text-[15px] leading-relaxed" style={{ color: PAPER }}>
                      {inv.how}
                    </dd>
                  </div>
                  <div className="grid gap-x-5 gap-y-1 sm:grid-cols-[7rem_1fr]">
                    <dt
                      className={`${mono} text-[10px] uppercase tracking-[0.25em]`}
                      style={{ color: ENERGY }}
                    >
                      Or else
                    </dt>
                    <dd className="text-[15px] leading-relaxed" style={{ color: DIM }}>
                      {inv.breaks}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* ── 5. Integrations ──────────────────────────────────── */}
        <section id="integrations" className="scroll-mt-8 pt-20">
          <SectionHead part="05" title="Integration contracts" />
          <div className="mt-8 space-y-px">
            {INTEGRATIONS.map((it) => (
              <article key={it.name} className="border-t py-5" style={{ borderColor: RULE_SOFT }}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[17px] font-semibold" style={{ color: PAPER }}>
                    {it.name}
                  </h3>
                  <span className={`${mono} text-[12px]`} style={{ color: FAINT }}>
                    {it.direction}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {it.notes.map((n, i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed" style={{ color: DIM }}>
                      <span style={{ color: FAINT }}>, </span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── 6. Observability ─────────────────────────────────── */}
        <section id="observability" className="scroll-mt-8 pt-20">
          <SectionHead part="06" title="Observability" />
          <ul className="mt-8 space-y-4">
            {OBSERVABILITY.map((o, i) => (
              <li key={i} className="border-t pt-4 text-[15px] leading-relaxed" style={{ borderColor: RULE_SOFT, color: PAPER }}>
                {o}
              </li>
            ))}
          </ul>
        </section>

        {/* ── 7. Build order ───────────────────────────────────── */}
        <section id="order" className="scroll-mt-8 pt-20">
          <SectionHead
            part="07"
            title="Build order"
            lede="Most projects invert this and build the customer apps first. That is the most expensive decision available on this rung."
          />
          <ol className="mt-8 space-y-px">
            {ORDER.map((o, i) => (
              <li
                key={i}
                className="grid grid-cols-[2rem_1fr] items-baseline gap-x-4 border-t py-4"
                style={{ borderColor: RULE_SOFT }}
              >
                <span className={`${mono} text-[13px] font-bold`} style={{ color: PROMPT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-relaxed" style={{ color: PAPER }}>
                  {o}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 8. Cost ──────────────────────────────────────────── */}
        <section id="cost" className="scroll-mt-8 pt-20">
          <SectionHead
            part="08"
            title="Cost to build, cost to run"
            lede="List prices in USD, checked August 2026. Payment and delivery rates are deliberately absent, they are negotiated per merchant and market, and a made-up percentage is worse than none."
            color={ENERGY}
          />

          {/* build */}
          <h3 className={`${serif} mt-10 text-2xl font-black`} style={{ color: PAPER }}>
            Cost to build
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            {COST_BUILD_NOTE}
          </p>
          <ul className="mt-6 space-y-px">
            {COST_BUILD.map((c) => (
              <li
                key={c.item}
                className="grid gap-x-5 gap-y-1 border-t py-3.5 sm:grid-cols-[1fr_auto]"
                style={{ borderColor: RULE_SOFT }}
              >
                <span className="text-[15px] font-semibold" style={{ color: PAPER }}>
                  {c.item}
                </span>
                <span className={`${mono} text-[13px] sm:text-right`} style={{ color: PROMPT }}>
                  {c.cost}
                </span>
                <span className="text-[13px] leading-relaxed sm:col-span-2" style={{ color: FAINT }}>
                  {c.note}
                </span>
              </li>
            ))}
          </ul>
          <p
            className="mt-5 border-l-2 py-1 pl-4 text-[15px] leading-relaxed"
            style={{ borderColor: PROMPT, color: PAPER }}
          >
            {COST_BUILD_TOTAL}
          </p>

          {/* run */}
          <h3 className={`${serif} mt-14 text-2xl font-black`} style={{ color: PAPER }}>
            Cost to run
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            {COST_RUN_NOTE}
          </p>

          {[
            { label: "Layer 1, fixed floor", rows: COST_RUN_FLOOR },
            { label: "Layer 2, usage, scales with activity", rows: COST_RUN_USAGE },
          ].map((group) => (
            <div key={group.label} className="mt-8">
              <span
                className={`${mono} text-[11px] uppercase tracking-[0.2em]`}
                style={{ color: PROMPT }}
              >
                {group.label}
              </span>
              <ul className="mt-3 space-y-px">
                {group.rows.map((c) => (
                  <li
                    key={c.item}
                    className="grid gap-x-5 gap-y-1 border-t py-3.5 sm:grid-cols-[1fr_auto]"
                    style={{ borderColor: RULE_SOFT }}
                  >
                    <span className="text-[15px] font-semibold" style={{ color: PAPER }}>
                      {c.item}
                    </span>
                    <span className={`${mono} text-[13px] sm:text-right`} style={{ color: PROMPT }}>
                      {c.cost}
                    </span>
                    <span
                      className="text-[13px] leading-relaxed sm:col-span-2"
                      style={{ color: FAINT }}
                    >
                      {c.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p
            className="mt-5 border-l-2 py-1 pl-4 text-[15px] leading-relaxed"
            style={{ borderColor: PROMPT, color: PAPER }}
          >
            {COST_RUN_FLOOR_TOTAL}
          </p>

          <div
            className="mt-8 border-2 p-5"
            style={{ borderColor: `${ENERGY}88` }}
          >
            <Kicker color={ENERGY}>The capacity number that bites</Kicker>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: PAPER }}>
              {CONNECTIONS_TRAP}
            </p>
          </div>

          <div className="mt-8">
            <span
              className={`${mono} text-[11px] uppercase tracking-[0.2em]`}
              style={{ color: PROMPT }}
            >
              Layer 3, per transaction, scales with revenue
            </span>
            <ul className="mt-3 space-y-2.5">
              {COST_RUN_TRANSACTION.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[15px] leading-relaxed"
                  style={{ color: PAPER }}
                >
                  <span style={{ color: FAINT }}>, </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <p
            className="mt-8 max-w-2xl border-l-2 py-1 pl-4 text-[15px] leading-relaxed"
            style={{ borderColor: ENERGY, color: PAPER }}
          >
            {COST_PEOPLE}
          </p>

          <div className="mt-12 border-t pt-6" style={{ borderColor: RULE }}>
            <Kicker color={FAINT}>Out of scope</Kicker>
            <ul className="mt-4 space-y-2">
              {NOT_COVERED.map((n, i) => (
                <li key={i} className="text-[14px] leading-relaxed" style={{ color: FAINT }}>
                 , {n}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────────── */}
        <section className="pt-20">
          <div className="border-t pt-10" style={{ borderColor: RULE }}>
            <p className="max-w-3xl text-[17px] leading-relaxed" style={{ color: PAPER }}>
              {CLOSING}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/ladder"
                className={`${mono} inline-block border-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7ba2e0] transition-colors hover:bg-[#7ba2e0] hover:text-[#161613]`}
                style={{ borderColor: PROMPT }}
              >
                ← All seven rungs
              </Link>
              <Link
                href="/ladder/taylor-swift"
                className={`${mono} text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-[#7ba2e0]`}
                style={{ color: FAINT }}
              >
                Rung one, for contrast →
              </Link>
            </div>
            <div className="mt-10 max-w-md">
              <ScratchSubscribe source="ladder" cta="send the next rung" done="You're in." />
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer
          className={`${mono} mt-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-6 text-[10px] uppercase tracking-[0.25em]`}
          style={{ borderColor: RULE, color: FAINT }}
        >
          <span>Field Guide № 004 · rung 06</span>
          <span className="flex flex-wrap gap-5">
            <Link href="/scratch" className="transition-colors hover:text-[#7ba2e0]">
              № 001 Scratch
            </Link>
            <Link href="/ship" className="transition-colors hover:text-[#7ba2e0]">
              № 002 Ship
            </Link>
            <Link href="/scale" className="transition-colors hover:text-[#7ba2e0]">
              № 003 Scale
            </Link>
          </span>
        </footer>
      </div>
    </main>
  );
}
