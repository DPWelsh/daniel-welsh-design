import type { Metadata } from "next";
import Link from "next/link";
import { GuideNav } from "@/components/guide-nav";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import {
  CLOSING,
  LEDE,
  NOT_COVERED,
  RULE_BODY,
  RULE_HEADLINE,
  STAYS,
  SWAPS,
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
} from "../scratch/ui";

/**
 * /scale. Field Guide № 003, payload for the SCALE keyword.
 *
 * The reel names nine swaps in eight seconds. The comment prompt asks what
 * TRIGGERS each one, so this page is signals — the line item or limit that
 * tells you it is time — rather than a restatement of the list.
 *
 * The three that stay get equal billing with the six that change. That is
 * the argument, not a footnote: a scaling list that only shows churn reads
 * as "you chose wrong", which is the thing the page exists to correct.
 */

export const metadata: Metadata = {
  title: "The Stack at 10,000 Users. Six of Nine Change",
  description:
    "The same nine jobs you started with. Six change hands at 10,000 users, three never move — and the signal that triggers each swap, so you move once instead of early.",
  alternates: { canonical: "/scale" },
  openGraph: {
    title: "The Stack at 10,000 Users. Six of Nine Change",
    description:
      "Six swaps, three that stay, and the bill or limit that triggers each one. None of it was wrong at 100 users.",
    url: "https://danielwelsh.design/scale",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

export default function ScalePage() {
  const anchors = [
    ["glance", "The nine at a glance"],
    ["swaps", "The six that change"],
    ["stays", "The three that stay"],
    ["rule", "The rule"],
  ];

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
            "@type": "Article",
            headline: "The Stack at 10,000 Users. Six of Nine Change",
            author: { "@type": "Person", name: "Daniel Welsh" },
            publisher: { "@type": "Person", name: "Daniel Welsh" },
            url: "https://danielwelsh.design/scale",
          }),
        }}
      />

      {/* print grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px]"
        style={{
          background: `radial-gradient(60% 100% at 50% 0%, ${INDIGO}88, transparent 70%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        {/* ── Masthead ─────────────────────────────────────────── */}
        <header className="pt-10">
          <div
            className={`${mono} sc-rise flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b pb-3 text-[10px] uppercase tracking-[0.25em]`}
            style={{ borderColor: RULE, color: FAINT }}
          >
            <span>Daniel Welsh · Field Guide № 003</span>
            <span>Nine jobs · six change · three don&rsquo;t</span>
          </div>

          <div className="relative pt-12 sm:pt-16">
            <span
              className={`${mono} sc-rise absolute right-0 top-8 hidden rotate-[7deg] border-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] sm:top-12 sm:block`}
              style={{ borderColor: PROMPT, color: PROMPT, animationDelay: "0.35s" }}
            >
              Scale · request received
            </span>

            <Kicker>You commented. Here is the swap list.</Kicker>
            <h1
              className={`${serif} sc-rise mt-4 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-7xl`}
              style={{ animationDelay: "0.08s" }}
            >
              Need to scale to 10,000 users?{" "}
              <em className="not-italic" style={{ color: PROMPT }}>
                Six of nine change.
              </em>
            </h1>
            <p
              className="sc-rise mt-6 max-w-2xl text-[17px] leading-relaxed"
              style={{ color: DIM, animationDelay: "0.16s" }}
            >
              {LEDE}
            </p>
          </div>

          <nav
            className={`${mono} mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t pt-5 text-[11px] uppercase tracking-[0.2em]`}
            style={{ borderColor: RULE, color: FAINT }}
          >
            {anchors.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="transition-colors hover:text-[#7ba2e0]">
                {label}
              </a>
            ))}
          </nav>
        </header>

        {/* ── The nine at a glance ─────────────────────────────── */}
        <section id="glance" className="scroll-mt-8 pt-20">
          <SectionHead
            part="Part one"
            title="The nine at a glance"
            lede="Same jobs, same order as the reel. The right-hand column is the reason it moved, never the vendor's pitch."
          />

          <ul className="mt-8 space-y-px">
            {NINE.map((row) => (
              <li
                key={row.no}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-t py-4 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6"
                style={{ borderColor: RULE_SOFT }}
              >
                <span className={`${mono} text-[11px] tracking-[0.2em]`} style={{ color: FAINT }}>
                  {row.no}
                </span>
                <span className="min-w-0">
                  <span className={`${serif} text-xl font-black sm:text-2xl`}>
                    {row.stays ? (
                      <span style={{ color: PAPER }}>{row.from}</span>
                    ) : (
                      <>
                        <span style={{ color: FAINT }}>{row.from}</span>
                        <span style={{ color: FAINT }} className="px-2 text-base">
                          →
                        </span>
                        <span style={{ color: PAPER }}>{row.to}</span>
                      </>
                    )}
                  </span>
                  <span
                    className={`${mono} mt-1 block text-[11px] uppercase tracking-[0.2em]`}
                    style={{ color: FAINT }}
                  >
                    {row.job}
                  </span>
                </span>
                <span
                  className={`${mono} col-start-2 mt-2 justify-self-start rounded border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] sm:col-start-3 sm:mt-0`}
                  style={
                    row.stays
                      ? { borderColor: PROMPT, color: PROMPT }
                      : { borderColor: `${ENERGY}66`, color: ENERGY }
                  }
                >
                  {row.stays ? "stays" : row.tag}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── The six that change ──────────────────────────────── */}
        <section id="swaps" className="scroll-mt-8 pt-20">
          <SectionHead
            part="Part two"
            title="The six that change"
            lede="Each one leads with the signal, because the signal is the only part that tells you when. If you cannot point at it yet, you are not there."
            color={ENERGY}
          />

          <div className="mt-8 space-y-px">
            {SWAPS.map((s) => (
              <article key={s.no} className="border-t py-8" style={{ borderColor: RULE_SOFT }}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className={`${mono} text-[11px] tracking-[0.2em]`} style={{ color: FAINT }}>
                    № {s.no}
                  </span>
                  <h3 className={`${serif} text-3xl font-black sm:text-4xl`}>
                    <span style={{ color: FAINT }}>{s.from}</span>
                    <span style={{ color: FAINT }} className="px-2 text-2xl">
                      →
                    </span>
                    <span style={{ color: PAPER }}>{s.to}</span>
                  </h3>
                  <span
                    className={`${mono} rounded border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]`}
                    style={{ borderColor: `${ENERGY}66`, color: ENERGY }}
                  >
                    {s.tag}
                  </span>
                </div>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt
                      className={`${mono} text-[10px] font-bold uppercase tracking-[0.25em]`}
                      style={{ color: PROMPT }}
                    >
                      The signal
                    </dt>
                    <dd className="mt-2 text-[15px] leading-relaxed" style={{ color: PAPER }}>
                      {s.trigger}
                    </dd>
                  </div>
                  <div>
                    <dt
                      className={`${mono} text-[10px] font-bold uppercase tracking-[0.25em]`}
                      style={{ color: FAINT }}
                    >
                      Why this one
                    </dt>
                    <dd className="mt-2 text-[15px] leading-relaxed" style={{ color: DIM }}>
                      {s.why}
                    </dd>
                  </div>
                  <div>
                    <dt
                      className={`${mono} text-[10px] font-bold uppercase tracking-[0.25em]`}
                      style={{ color: FAINT }}
                    >
                      What it costs you
                    </dt>
                    <dd className="mt-2 text-[15px] leading-relaxed" style={{ color: DIM }}>
                      {s.cost}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* ── The three that stay ──────────────────────────────── */}
        <section id="stays" className="scroll-mt-8 pt-20">
          <SectionHead
            part="Part three"
            title="The three that stay"
            lede="The more interesting half of the list. Two of these get swapped by people optimising the wrong number."
          />

          <div className="mt-8 grid gap-px sm:grid-cols-3">
            {STAYS.map((s) => (
              <article
                key={s.name}
                className="border-t pt-6"
                style={{ borderColor: `${PROMPT}55` }}
              >
                <span
                  className={`${mono} rounded border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]`}
                  style={{ borderColor: PROMPT, color: PROMPT }}
                >
                  stays
                </span>
                <h3 className={`${serif} mt-4 text-2xl font-black`} style={{ color: PAPER }}>
                  {s.name}
                </h3>
                <p
                  className={`${mono} mt-1 text-[11px] uppercase tracking-[0.2em]`}
                  style={{ color: FAINT }}
                >
                  {s.job}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: DIM }}>
                  {s.why}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── The rule ─────────────────────────────────────────── */}
        <section id="rule" className="scroll-mt-8 pt-20">
          <SectionHead part="Part four" title="The rule" color={ENERGY} />

          <h3
            className={`${serif} mt-8 max-w-3xl text-4xl font-black leading-[1.05] sm:text-5xl`}
            style={{ color: PAPER }}
          >
            {RULE_HEADLINE}
          </h3>
          <div className="mt-6 max-w-2xl space-y-5">
            {RULE_BODY.map((p, i) => (
              <p key={i} className="text-[16px] leading-relaxed" style={{ color: DIM }}>
                {p}
              </p>
            ))}
          </div>

          <div
            className="mt-10 border-l-2 pl-5"
            style={{ borderColor: PROMPT }}
          >
            <p className="text-[16px] leading-relaxed" style={{ color: PAPER }}>
              {CLOSING}
            </p>
          </div>

          <div className="mt-12 border-t pt-6" style={{ borderColor: RULE }}>
            <Kicker color={FAINT}>Not covered here</Kicker>
            <ul className="mt-4 space-y-2">
              {NOT_COVERED.map((n, i) => (
                <li key={i} className="text-[14px] leading-relaxed" style={{ color: FAINT }}>
                  — {n}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Subscribe ────────────────────────────────────────── */}
        <section className="pt-20">
          <div
            className="border-t pt-10"
            style={{ borderColor: RULE }}
          >
            <Kicker>The next one</Kicker>
            <h2
              className={`${serif} mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-4xl`}
              style={{ color: PAPER }}
            >
              One field guide at a time, when there is something worth sending.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              No schedule, no drip. The same rule as the stack: it goes out when there
              is a reason, not when the calendar says so.
            </p>
            <div className="mt-6 max-w-md">
              <ScratchSubscribe source="scale" cta="send it" done="You're in." />
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer
          className={`${mono} mt-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-6 text-[10px] uppercase tracking-[0.25em]`}
          style={{ borderColor: RULE, color: FAINT }}
        >
          <span>Field Guide № 003 · the stack at 10,000</span>
          <span className="flex gap-5">
            <Link href="/scratch" className="transition-colors hover:text-[#7ba2e0]">
              № 001 Scratch
            </Link>
            <Link href="/ship" className="transition-colors hover:text-[#7ba2e0]">
              № 002 Ship
            </Link>
          </span>
        </footer>
      </div>
    </main>
  );
}

/* The at-a-glance rail. Kept next to the page rather than in content.ts
   because it is a rendering of SWAPS + STAYS in the reel's row order —
   the order is the thing, and it only means anything here. */
const NINE = [
  { no: "01", from: "Supabase", to: "Neon", job: "your database", tag: "limits" },
  { no: "02", from: "Claude", to: "", job: "for coding", tag: "", stays: true },
  { no: "03", from: "Vercel", to: "Cloudflare", job: "your front end", tag: "bandwidth" },
  { no: "04", from: "Railway", to: "AWS", job: "your back end", tag: "the bill" },
  { no: "05", from: "Stripe", to: "", job: "to get paid", tag: "", stays: true },
  { no: "06", from: "ElevenLabs", to: "", job: "your voice AI", tag: "", stays: true },
  { no: "07", from: "Twilio", to: "Telnyx", job: "your phone lines", tag: "per minute" },
  { no: "08", from: "Sentry", to: "Datadog", job: "catch those bugs", tag: "volume" },
  { no: "09", from: "PostHog", to: "Amplitude", job: "session replay", tag: "volume" },
];
