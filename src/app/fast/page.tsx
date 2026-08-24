import type { Metadata } from "next";
import Link from "next/link";
import { GuideNav } from "@/components/guide-nav";
import { CopyBlock } from "@/components/scratch/copy-block";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import { BEFORE, CLOSING, FIXES, LEDE, NOT_COVERED, VITALS, VITALS_NOTE } from "./content";
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
 * /fast. Field Guide № 006, payload for the FAST keyword.
 *
 * Its own page rather than a section on /launch. /launch is the pre-launch
 * list, before anyone has seen the thing. This is the opposite moment: it
 * is live and it is slow. /launch is also already 34k characters.
 *
 * Copy rules live in content.ts: no em dashes, one idea per sentence.
 * Each fix carries a time estimate, a done-when test and an if-it-looks-
 * different note, so a non technical reader always knows where they are.
 */

export const metadata: Metadata = {
  title: "Three Things That Make Your App Fast",
  description:
    "Your app is slow and it is almost always the images. Convert them, stop loading what nobody needs, and measure it with PageSpeed Insights. Free, no rewrite, written for people who are not performance engineers.",
  alternates: { canonical: "/fast" },
  openGraph: {
    title: "Three Things That Make Your App Fast",
    description: "The images, the dead weight, and how to actually measure it. All free.",
    url: "https://danielwelsh.design/fast",
    type: "article",
  },
};

export default function FastPage() {
  return (
    <main
      className="relative min-h-screen overflow-x-clip antialiased selection:bg-[#7ba2e0] selection:text-[#161613]"
      style={{ background: "#161613", color: PAPER }}
    >
      <GuideNav />
      <style>{`
        @keyframes fs-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .fs-rise { animation: fs-rise 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .fs-rise { animation: none; } }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Three things that make your app fast",
            author: { "@type": "Person", name: "Daniel Welsh" },
            publisher: { "@type": "Person", name: "Daniel Welsh" },
            url: "https://danielwelsh.design/fast",
            step: FIXES.map((f) => ({
              "@type": "HowToSection",
              name: f.title,
              itemListElement: f.steps.map((s) => ({
                "@type": "HowToStep",
                position: Number(s.n),
                text: s.body,
              })),
            })),
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

      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {/* ── Masthead ─────────────────────────────────────────── */}
        <header className="pt-10">
          <div
            className={`${mono} fs-rise flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b pb-3 text-[10px] uppercase tracking-[0.25em]`}
            style={{ borderColor: RULE, color: FAINT }}
          >
            <span>Daniel Welsh · Field Guide № 006</span>
            <span>All free · no rewrite</span>
          </div>

          <div className="fs-rise pt-14">
            <Kicker color={PROMPT}>You commented FAST. Here are the three.</Kicker>
            <h1
              className={`${serif} mt-5 text-[clamp(2.6rem,8vw,4.6rem)] leading-[0.95] tracking-[-0.02em]`}
            >
              Three things that
              <br />
              make your app <span style={{ color: PROMPT }}>fast.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed" style={{ color: DIM }}>
              {LEDE}
            </p>
          </div>
        </header>

        {/* ── Before you start ─────────────────────────────────── */}
        <section className="mt-16 border-t pt-9" style={{ borderColor: RULE }}>
          <Kicker>{BEFORE.h}</Kicker>
          <ul className="mt-5 space-y-4">
            {BEFORE.lines.map((l) => (
              <li
                key={l}
                className="border-l-2 pl-5 text-[15px] leading-relaxed"
                style={{ borderColor: RULE_SOFT, color: DIM }}
              >
                {l}
              </li>
            ))}
          </ul>
        </section>

        {/* ── The three numbers ────────────────────────────────── */}
        <section className="mt-16 border-t pt-9" style={{ borderColor: RULE }}>
          <SectionHead part="What good looks like" title="The three numbers" />
          <div className="mt-7 space-y-3">
            {VITALS.map((v) => (
              <div
                key={v.code}
                className="rounded-lg border p-5"
                style={{ borderColor: RULE, background: "rgba(237,237,235,0.02)" }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className={`${mono} text-[15px]`} style={{ color: PROMPT }}>
                    {v.code}
                    <span className="ml-3 text-[13px]" style={{ color: FAINT }}>
                      {v.name}
                    </span>
                  </span>
                  <span className={`${mono} text-[13px]`} style={{ color: PAPER }}>
                    {v.good}
                  </span>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: DIM }}>
                  {v.means}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[14px] leading-relaxed" style={{ color: FAINT }}>
            {VITALS_NOTE}
          </p>
        </section>

        {/* ── The three fixes ──────────────────────────────────── */}
        {FIXES.map((f) => (
          <section
            key={f.id}
            id={f.id}
            className="mt-20 scroll-mt-20 border-t pt-9"
            style={{ borderColor: RULE }}
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className={`${mono} text-[11px] tracking-[0.3em]`} style={{ color: ENERGY }}>
                {f.n}
              </span>
              <h2 className={`${serif} text-[clamp(1.9rem,5vw,2.7rem)] leading-tight`}>
                {f.title}
              </h2>
              <span
                className={`${mono} rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]`}
                style={{ borderColor: RULE, color: FAINT }}
              >
                {f.time}
              </span>
            </div>

            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed" style={{ color: DIM }}>
              {f.what}
            </p>

            {/* Claude first: asking is a lower wall than configuring */}
            <div
              className="mt-8 rounded-xl border p-6"
              style={{ borderColor: PROMPT + "55", background: "rgba(123,162,224,0.05)" }}
            >
              <p
                className={`${mono} text-[11px] uppercase tracking-[0.2em]`}
                style={{ color: PROMPT }}
              >
                Do it with Claude
              </p>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: PAPER }}>
                {f.claude.setup}
              </p>
              <div className="mt-5">
                <CopyBlock
                  id={`${f.id}-prompt`}
                  filename="paste this into Claude"
                  body={f.claude.prompt}
                />
              </div>
              <p className="mt-5 text-[15px] leading-relaxed" style={{ color: DIM }}>
                {f.claude.after}
              </p>
            </div>

            {/* the tools, named, with the reason each is here */}
            <div className="mt-8">
              <p
                className={`${mono} text-[11px] uppercase tracking-[0.2em]`}
                style={{ color: FAINT }}
              >
                Or use the tool
              </p>
              <div className="mt-4 space-y-2">
                {f.alts.map((t) => (
                  <a
                    key={t.name}
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border p-4 transition-colors hover:border-[#7ba2e0]"
                    style={{ borderColor: RULE, background: "rgba(237,237,235,0.02)" }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className={`${mono} text-[14px]`} style={{ color: PROMPT }}>
                        {t.name} ↗
                      </span>
                      <span className={`${mono} text-[11px]`} style={{ color: FAINT }}>
                        {t.score}
                      </span>
                    </div>
                    <p className="mt-2 text-[14px] leading-relaxed" style={{ color: DIM }}>
                      {t.note}
                    </p>
                  </a>
                ))}
              </div>

              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(f.watch.q)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${mono} mt-4 inline-flex items-center gap-2 text-[13px] underline underline-offset-4`}
                style={{ color: FAINT }}
              >
                {f.watch.label} on YouTube ↗
              </a>
            </div>

            <p
              className={`${mono} mt-8 text-[11px] uppercase tracking-[0.2em]`}
              style={{ color: FAINT }}
            >
              The steps, click by click
            </p>
            <ol className="mt-5 space-y-6">
              {f.steps.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span
                    className={`${mono} mt-[3px] flex h-8 w-8 flex-none items-center justify-center rounded-md text-[13px] font-bold`}
                    style={{ background: PROMPT, color: "#161613" }}
                  >
                    {s.n}
                  </span>
                  <p className="text-[16px] leading-relaxed" style={{ color: PAPER }}>
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>

            {f.warn && (
              <div
                className="mt-9 rounded-lg border-l-4 p-6"
                style={{ borderColor: ENERGY, background: "rgba(201,107,102,0.07)" }}
              >
                <p
                  className={`${mono} text-[11px] uppercase tracking-[0.2em]`}
                  style={{ color: ENERGY }}
                >
                  {f.warn.h}
                </p>
                <div className="mt-4 space-y-3">
                  {f.warn.body.map((b) => (
                    <p key={b} className="text-[15px] leading-relaxed" style={{ color: DIM }}>
                      {b}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <p
              className={`${mono} mt-8 border-t pt-5 text-[14px]`}
              style={{ borderColor: RULE_SOFT, color: PROMPT }}
            >
              Done when: <span style={{ color: PAPER }}>{f.done}</span>
            </p>
            <p className="mt-4 text-[14px] leading-relaxed" style={{ color: FAINT }}>
              <span className={mono} style={{ color: DIM }}>
                If it looks different:{" "}
              </span>
              {f.stuck}
            </p>
          </section>
        ))}

        {/* ── Not covered ──────────────────────────────────────── */}
        <section className="mt-20 border-t pt-9" style={{ borderColor: RULE }}>
          <SectionHead part="On purpose" title="What this does not cover" />
          <ul className="mt-6 space-y-4">
            {NOT_COVERED.map((n) => (
              <li
                key={n}
                className="border-l-2 pl-5 text-[15px] leading-relaxed"
                style={{ borderColor: RULE_SOFT, color: DIM }}
              >
                {n}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Close + subscribe ────────────────────────────────── */}
        <section className="mt-20 border-t pt-10" style={{ borderColor: RULE }}>
          <p className={`${serif} max-w-2xl text-2xl leading-snug`} style={{ color: PAPER }}>
            {CLOSING}
          </p>

          <div className="mt-12 border-t pt-8" style={{ borderColor: RULE }}>
            <Kicker>The next one</Kicker>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              One guide per thing that actually broke, written the week it broke. Nothing in
              between.
            </p>
            <div className="mt-6">
              <ScratchSubscribe
                source="fast"
                cta="send me the next one"
                done="Done. The next guide lands the week it is written."
              />
            </div>
          </div>

          <p className="mt-12 max-w-2xl text-[15px] leading-relaxed" style={{ color: FAINT }}>
            Not live yet? The rest of the field guides:{" "}
            <Link href="/launch" className="underline underline-offset-4" style={{ color: PROMPT }}>
              five things before you launch
            </Link>
            ,{" "}
            <Link href="/scratch" className="underline underline-offset-4" style={{ color: PROMPT }}>
              building it properly
            </Link>{" "}
            and{" "}
            <Link href="/scale" className="underline underline-offset-4" style={{ color: PROMPT }}>
              what changes at 10,000 users
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
