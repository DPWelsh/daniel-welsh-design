import type { Metadata } from "next";
import Link from "next/link";
import { GuideNav } from "@/components/guide-nav";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import { CLOSING, LEDE, RUNGS, RUNGS_CLOSER, THESIS, WHATS_IN_ONE } from "./content";
import { GUIDES, GUIDES_LEDE } from "@/lib/guides";
import {
  DIM,
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
 * /ladder. Field Guide № 004, the HUB, payload for the LADDER keyword.
 *
 * A menu, not a build. Each rung links to its own sheet at
 * /ladder/<slug>; rungs without one are inert rather than hidden, because
 * seeing "you don't finish it, you staff it" sitting at the bottom of the
 * list is what makes rung one's "an afternoon" mean anything.
 *
 * Shipping rung two = add the route, set href + live. Nothing here moves.
 */

export const metadata: Metadata = {
  title: "The Ladder. Seven Apps, Seven Build Sheets",
  description:
    "How hard an app is has nothing to do with how famous it is, it is about how bad it is when it goes wrong. Seven world-famous apps, one per rung, each with its own build sheet.",
  alternates: { canonical: "/ladder" },
  openGraph: {
    title: "The Ladder. Seven Apps, Seven Build Sheets",
    description:
      "From a page that just sits there to one you don't finish, you staff. Start at rung one.",
    url: "https://danielwelsh.design/ladder",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

export default function LadderHubPage() {
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
        .rung-live:hover .rung-app { color: #7ba2e0; }
        .rung-live:hover .rung-go { opacity: 1; transform: none; }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "The Ladder. Seven Apps, Seven Build Sheets",
            author: { "@type": "Person", name: "Daniel Welsh" },
            publisher: { "@type": "Person", name: "Daniel Welsh" },
            url: "https://danielwelsh.design/ladder",
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
            <span>Daniel Welsh · Field Guide № 004</span>
            <span>Seven rungs · one build sheet each</span>
          </div>

          <div className="pt-12 sm:pt-16">

            <Kicker>You commented. Pick a rung.</Kicker>
            <h1
              className={`${serif} sc-rise mt-4 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-7xl`}
              style={{ animationDelay: "0.08s" }}
            >
              Seven apps.{" "}
              <em className="not-italic" style={{ color: PROMPT }}>
                One is an afternoon. One you never finish.
              </em>
            </h1>
            <p
              className="sc-rise mt-6 max-w-2xl text-[17px] leading-relaxed"
              style={{ color: DIM, animationDelay: "0.16s" }}
            >
              {LEDE}
            </p>
            <p
              className={`${serif} sc-rise mt-8 max-w-3xl text-2xl font-black leading-snug sm:text-3xl`}
              style={{ color: PAPER, animationDelay: "0.24s" }}
            >
              &ldquo;{THESIS}&rdquo;
            </p>
          </div>
        </header>

        {/* ── The rungs (the menu) ─────────────────────────────── */}
        <section id="rungs" className="scroll-mt-8 pt-16">
          <ul className="space-y-px">
            {RUNGS.map((r) => {
              const inner = (
                <div
                  className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-4 py-6 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6"
                  style={{ opacity: r.live ? 1 : 0.55 }}
                >
                  <span
                    className={`${mono} text-[13px] font-bold tracking-[0.2em]`}
                    style={{ color: r.live ? PROMPT : FAINT }}
                  >
                    {r.n}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`${serif} rung-app block text-2xl font-black transition-colors sm:text-3xl`}
                      style={{ color: r.live ? PAPER : DIM }}
                    >
                      {r.app}
                    </span>
                    <span
                      className={`${mono} mt-1.5 block text-[11px] uppercase tracking-[0.2em]`}
                      style={{ color: FAINT }}
                    >
                      {r.rung}
                    </span>
                    <span
                      className="mt-2.5 block max-w-xl text-[14px] leading-relaxed"
                      style={{ color: DIM }}
                    >
                      {r.shift}
                    </span>
                  </span>
                  <span className="col-start-2 mt-3 flex items-center gap-3 sm:col-start-3 sm:mt-0 sm:flex-col sm:items-end sm:gap-1.5">
                    <span className={`${mono} text-[11px] whitespace-nowrap`} style={{ color: FAINT }}>
                      {r.time}
                    </span>
                    {r.cost && (
                      <span
                        className={`${mono} text-[11px] font-bold whitespace-nowrap`}
                        style={{ color: PROMPT }}
                      >
                        {r.cost}
                      </span>
                    )}
                    {r.live ? (
                      <span
                        className={`${mono} rung-go text-[10px] font-bold uppercase tracking-[0.2em] transition-all sm:opacity-0 sm:translate-x-1`}
                        style={{ color: PROMPT }}
                      >
                        Build sheet →
                      </span>
                    ) : (
                      <span
                        className={`${mono} text-[10px] uppercase tracking-[0.2em]`}
                        style={{ color: FAINT }}
                      >
                        Not yet
                      </span>
                    )}
                  </span>
                </div>
              );

              return (
                <li
                  key={r.n}
                  className="border-t"
                  style={{
                    borderColor: r.live ? PROMPT : RULE_SOFT,
                    background: r.live ? `${PROMPT}0d` : undefined,
                  }}
                >
                  {r.live && r.href ? (
                    <Link href={r.href} className="rung-live block px-4 sm:px-5">
                      {inner}
                    </Link>
                  ) : (
                    <div className="px-4 sm:px-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            {RUNGS_CLOSER}
          </p>
        </section>

        {/* ── What a build sheet is ────────────────────────────── */}
        <section className="pt-20">
          <SectionHead
            part="What you get"
            title="Every rung, the same sheet"
            lede="Not a summary of the reel. The thing you'd actually follow on a Saturday."
          />
          <ul className="mt-8 space-y-3">
            {WHATS_IN_ONE.map((w, i) => (
              <li key={i} className="flex gap-4 text-[15px] leading-relaxed" style={{ color: DIM }}>
                <span className={`${mono} shrink-0 text-[12px]`} style={{ color: PROMPT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed" style={{ color: PAPER }}>
            {CLOSING}
          </p>
          <Link
            href="/ladder/taylor-swift"
            className={`${mono} mt-6 inline-block border-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7ba2e0] transition-colors hover:bg-[#7ba2e0] hover:text-[#161613]`}
            style={{ borderColor: PROMPT }}
          >
            Start at rung one →
          </Link>
        </section>

        {/* ── Every walk-through ───────────────────────────────── */}
        <section id="guides" className="scroll-mt-8 pt-20">
          <SectionHead part="All of it" title="Every walk-through" lede={GUIDES_LEDE} />
          <ul className="mt-8 space-y-px">
            {GUIDES.map((g) => (
              <li key={g.href} className="border-t" style={{ borderColor: RULE_SOFT }}>
                <Link
                  href={g.href}
                  className="group grid grid-cols-1 gap-x-6 gap-y-1 py-5 sm:grid-cols-[16rem_1fr_auto]"
                >
                  <span
                    className={`${serif} text-xl font-black transition-colors group-hover:text-[#7ba2e0]`}
                    style={{ color: PAPER }}
                  >
                    {g.name}
                  </span>
                  <span className="text-[15px] leading-relaxed" style={{ color: DIM }}>
                    {g.what}
                  </span>
                  <span
                    className={`${mono} whitespace-nowrap text-[11px] sm:text-right`}
                    style={{ color: FAINT }}
                  >
                    {g.when}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Subscribe ────────────────────────────────────────── */}
        <section className="pt-20">
          <div className="border-t pt-10" style={{ borderColor: RULE }}>
            <Kicker>The next rung</Kicker>
            <h2
              className={`${serif} mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-4xl`}
              style={{ color: PAPER }}
            >
              Five more sheets, as they get built.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              They go out when the build is done, not on a schedule.
            </p>
            <div className="mt-6 max-w-md">
              <ScratchSubscribe source="ladder" cta="send the next rung" done="You're in." />
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer
          className={`${mono} mt-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-6 text-[10px] uppercase tracking-[0.25em]`}
          style={{ borderColor: RULE, color: FAINT }}
        >
          <span>Field Guide № 004 · the ladder</span>
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
