import type { Metadata } from "next";
import Link from "next/link";
import { GuideNav } from "@/components/guide-nav";
import { CopyBlock } from "@/components/scratch/copy-block";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import { BRAND_TIE, CLOSING, LEDE, NOT_COVERED, STAGES, WHY } from "./content";
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
 * /presets. Field Guide № 005, a look, turned into a palette and a
 * Lightroom preset.
 *
 * The load-bearing decision is stage 04: export a preset out of Lightroom
 * and EDIT it, rather than asking for an .xmp to be written from scratch.
 * Generated presets import cleanly and then do nothing, which is the worst
 * failure mode available. See the note atop content.ts.
 */

export const metadata: Metadata = {
  title: "A Brand Kit and a Lightroom Preset, From Photos",
  description:
    "Turn a look you like into a real hex palette and a working Lightroom preset, with the prompt sequence for each stage. Seven stages, four copy-able prompts.",
  alternates: { canonical: "/presets" },
  openGraph: {
    title: "A Brand Kit and a Lightroom Preset, From Photos",
    description:
      "Drop the images in, get a palette with real hex values and a preset that holds up on photos it has never seen.",
    url: "https://danielwelsh.design/presets",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

export default function PresetsPage() {
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
            "@type": "HowTo",
            name: "A Brand Kit and a Lightroom Preset, From Photos",
            step: STAGES.map((s) => ({
              "@type": "HowToStep",
              name: s.title,
              text: s.steps.join(" "),
            })),
            url: "https://danielwelsh.design/presets",
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
            <span>Daniel Welsh · Field Guide № 005</span>
            <span>Seven stages · four prompts</span>
          </div>

          <div className="pt-12 sm:pt-16">
            <Kicker>From a photo to a brand</Kicker>
            <h1
              className={`${serif} sc-rise mt-4 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl`}
              style={{ animationDelay: "0.08s" }}
            >
              A brand kit and a Lightroom preset,{" "}
              <em className="not-italic" style={{ color: PROMPT }}>
                out of photos you already like.
              </em>
            </h1>
            <p
              className="sc-rise mt-6 max-w-2xl text-[17px] leading-relaxed"
              style={{ color: DIM, animationDelay: "0.16s" }}
            >
              {LEDE}
            </p>
          </div>

          <div className="mt-10 border-l-2 py-1 pl-5" style={{ borderColor: PROMPT }}>
            <Kicker>Why start from photography</Kicker>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: PAPER }}>
              {WHY}
            </p>
          </div>
        </header>

        {/* ── Stages ───────────────────────────────────────────── */}
        <section id="stages" className="scroll-mt-8 pt-20">
          <ol className="space-y-px">
            {STAGES.map((s) => (
              <li key={s.n} className="border-t pt-8 pb-10" style={{ borderColor: RULE_SOFT }}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span
                    className={`${mono} text-[13px] font-bold tracking-[0.2em]`}
                    style={{ color: PROMPT }}
                  >
                    {s.n}
                  </span>
                  <h2
                    className={`${serif} flex-1 text-3xl font-black leading-tight sm:text-4xl`}
                    style={{ color: PAPER }}
                  >
                    {s.title}
                  </h2>
                  <span className={`${mono} whitespace-nowrap text-[11px]`} style={{ color: FAINT }}>
                    {s.time}
                  </span>
                </div>

                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                  {s.what}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {s.steps.map((d, i) => (
                    <li
                      key={i}
                      className="flex gap-3.5 text-[15px] leading-relaxed"
                      style={{ color: PAPER }}
                    >
                      <span className={`${mono} shrink-0 pt-0.5 text-[11px]`} style={{ color: FAINT }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {s.copy && (
                  <div className="mt-6">
                    <CopyBlock id={s.copy.id} filename={s.copy.filename} body={s.copy.body} />
                  </div>
                )}

                {s.note && (
                  <p
                    className="mt-6 max-w-2xl border-l-2 py-1 pl-4 text-[14px] leading-relaxed"
                    style={{ borderColor: `${ENERGY}88`, color: DIM }}
                  >
                    {s.note}
                  </p>
                )}

                <div
                  className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border px-4 py-3"
                  style={{ borderColor: `${PROMPT}55`, background: `${PROMPT}0d` }}
                >
                  <span
                    className={`${mono} text-[10px] font-bold uppercase tracking-[0.25em]`}
                    style={{ color: PROMPT }}
                  >
                    Done when
                  </span>
                  <span className="flex-1 text-[14px] leading-relaxed" style={{ color: PAPER }}>
                    {s.done}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Tie-in ───────────────────────────────────────────── */}
        <section className="pt-20">
          <SectionHead part="After" title="Where the palette goes" />
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed" style={{ color: PAPER }}>
            {BRAND_TIE}
          </p>
          <Link
            href="/ladder/taylor-swift"
            className={`${mono} mt-6 inline-block border-b text-[12px] uppercase tracking-[0.2em] transition-colors hover:text-[#7ba2e0]`}
            style={{ borderColor: PROMPT, color: PROMPT }}
          >
            Rung one → the build that uses it
          </Link>

          <div className="mt-12 border-t pt-6" style={{ borderColor: RULE }}>
            <Kicker color={FAINT}>Not covered here</Kicker>
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
        <section className="pt-16">
          <div className="border-t pt-10" style={{ borderColor: RULE }}>
            <p className="max-w-3xl text-[17px] leading-relaxed" style={{ color: PAPER }}>
              {CLOSING}
            </p>
            <div className="mt-10 max-w-md">
              <ScratchSubscribe source="presets" cta="send the next one" done="You're in." />
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer
          className={`${mono} mt-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-6 text-[10px] uppercase tracking-[0.25em]`}
          style={{ borderColor: RULE, color: FAINT }}
        >
          <span>Field Guide № 005 · presets</span>
          <span className="flex flex-wrap gap-5">
            <Link href="/scratch" className="transition-colors hover:text-[#7ba2e0]">
              № 001
            </Link>
            <Link href="/ship" className="transition-colors hover:text-[#7ba2e0]">
              № 002
            </Link>
            <Link href="/scale" className="transition-colors hover:text-[#7ba2e0]">
              № 003
            </Link>
            <Link href="/ladder" className="transition-colors hover:text-[#7ba2e0]">
              № 004
            </Link>
          </span>
        </footer>
      </div>
    </main>
  );
}
