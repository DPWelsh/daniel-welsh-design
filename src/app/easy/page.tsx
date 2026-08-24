import type { Metadata } from "next";
import Link from "next/link";
import { GuideNav } from "@/components/guide-nav";
import { CopyBlock } from "@/components/scratch/copy-block";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import { AUTOS, BEFORE, CLOSING, LEDE, NOT_COVERED, PICKS, PICKS_NOTE } from "./content";
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
 * /easy. Field Guide № 005, payload for the EASY keyword.
 *
 * The reel (Clinic 01, "3 easy automations") names the three; this page is
 * the how, written for a clinic owner rather than a developer. Every path
 * has a free option and none of them need code.
 *
 * Copy rules live in content.ts: no em dashes, one idea per sentence.
 * Sections are short on purpose and each one ends with a "done when" test,
 * so the reader always knows whether they can stop.
 */

export const metadata: Metadata = {
  title: "Three Easy Automations",
  description:
    "Email clean up, a daily sales report, and Google review alerts. The exact steps, the software to use, and what not to automate. Written for clinic owners, no code.",
  alternates: { canonical: "/easy" },
  openGraph: {
    title: "Three Easy Automations",
    description:
      "The three from the reel, with the steps and the software. One afternoon, no code.",
    url: "https://danielwelsh.design/easy",
    type: "article",
  },
};

export default function EasyPage() {
  return (
    <main
      className="relative min-h-screen overflow-x-clip antialiased selection:bg-[#7ba2e0] selection:text-[#161613]"
      style={{ background: "#161613", color: PAPER }}
    >
      <GuideNav />
      <style>{`
        @keyframes ez-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .ez-rise { animation: ez-rise 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .ez-rise { animation: none; } }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Three easy automations for a clinic",
            author: { "@type": "Person", name: "Daniel Welsh" },
            publisher: { "@type": "Person", name: "Daniel Welsh" },
            url: "https://danielwelsh.design/easy",
            step: AUTOS.map((a) => ({
              "@type": "HowToSection",
              name: a.title,
              itemListElement: a.steps.map((s) => ({
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
        style={{
          background: `radial-gradient(60% 100% at 50% 0%, ${INDIGO}88, transparent 70%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {/* ── Masthead ─────────────────────────────────────────── */}
        <header className="pt-10">
          <div
            className={`${mono} ez-rise flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b pb-3 text-[10px] uppercase tracking-[0.25em]`}
            style={{ borderColor: RULE, color: FAINT }}
          >
            <span>Daniel Welsh · Field Guide № 005</span>
            <span>One afternoon · nothing to buy</span>
          </div>

          <div className="ez-rise pt-14">
            <Kicker color={PROMPT}>You commented EASY. Here are all three.</Kicker>
            <h1
              className={`${serif} mt-5 text-[clamp(2.6rem,8vw,4.6rem)] leading-[0.95] tracking-[-0.02em]`}
            >
              Three easy
              <br />
              <span style={{ color: PROMPT }}>automations.</span>
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

        {/* ── What you'll use ──────────────────────────────────── */}
        <section className="mt-16 border-t pt-9" style={{ borderColor: RULE }}>
          <SectionHead part="Pick the software once" title="What you will use" />
          <div className="mt-7 space-y-3">
            {PICKS.map((p) => (
              <div
                key={p.job}
                className="rounded-lg border p-5"
                style={{ borderColor: RULE, background: "rgba(237,237,235,0.02)" }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className={`${serif} text-xl`}>{p.job}</span>
                  <span
                    className={`${mono} text-[10px] uppercase tracking-[0.2em]`}
                    style={{ color: PROMPT }}
                  >
                    {p.cost}
                  </span>
                </div>
                <p className={`${mono} mt-2 text-[13px]`} style={{ color: PAPER }}>
                  {p.tool}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: DIM }}>
                  {p.why}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[14px] leading-relaxed" style={{ color: FAINT }}>
            {PICKS_NOTE}
          </p>
        </section>

        {/* ── The three ────────────────────────────────────────── */}
        {AUTOS.map((a) => (
          <section
            key={a.id}
            id={a.id}
            className="mt-20 scroll-mt-20 border-t pt-9"
            style={{ borderColor: RULE }}
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className={`${mono} text-[11px] tracking-[0.3em]`} style={{ color: ENERGY }}>
                {a.n}
              </span>
              <h2 className={`${serif} text-[clamp(1.9rem,5vw,2.7rem)] leading-tight`}>
                {a.title}
              </h2>
              <span
                className={`${mono} rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]`}
                style={{ borderColor: RULE, color: FAINT }}
              >
                {a.time}
              </span>
            </div>

            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed" style={{ color: DIM }}>
              {a.what}
            </p>

            <p
              className={`${mono} mt-5 rounded-md border px-4 py-3 text-[13px]`}
              style={{ borderColor: RULE, color: PAPER, background: "rgba(237,237,235,0.03)" }}
            >
              <span style={{ color: FAINT }}>You need: </span>
              {a.need}
            </p>

            {/* ── Do it with Claude. This is the tutorial, not a sidebar:
                   asking is a lower wall than configuring. ─────────── */}
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
                {a.claude.setup}
              </p>
              <div className="mt-5">
                <CopyBlock
                  id={`${a.id}-prompt`}
                  filename="paste this into Claude"
                  body={a.claude.prompt}
                />
              </div>
              <p className="mt-5 text-[15px] leading-relaxed" style={{ color: DIM }}>
                {a.claude.after}
              </p>
            </div>

            {/* ── Other software, with real scores. Dated and linked,
                   because scores move and an unsourced pick is opinion. ── */}
            <div className="mt-8">
              <p
                className={`${mono} text-[11px] uppercase tracking-[0.2em]`}
                style={{ color: FAINT }}
              >
                Or use software built for it
              </p>
              <div className="mt-4 space-y-2">
                {a.alts.map((t) => (
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
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(a.watch.q)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${mono} mt-4 inline-flex items-center gap-2 text-[13px] underline underline-offset-4`}
                style={{ color: FAINT }}
              >
                {a.watch.label} on YouTube ↗
              </a>
            </div>

            <p
              className={`${mono} mt-8 text-[11px] uppercase tracking-[0.2em]`}
              style={{ color: FAINT }}
            >
              The steps, click by click
            </p>
            <ol className="mt-5 space-y-6">
              {a.steps.map((s) => (
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

            {a.warn && (
              <div
                className="mt-9 rounded-lg border-l-4 p-6"
                style={{ borderColor: ENERGY, background: "rgba(201,107,102,0.07)" }}
              >
                <p
                  className={`${mono} text-[11px] uppercase tracking-[0.2em]`}
                  style={{ color: ENERGY }}
                >
                  {a.warn.h}
                </p>
                <div className="mt-4 space-y-3">
                  {a.warn.body.map((b) => (
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
              Done when: <span style={{ color: PAPER }}>{a.done}</span>
            </p>

            {/* the screen never matches the instructions exactly, and a
                non technical reader assumes that means they broke it */}
            <p className="mt-4 text-[14px] leading-relaxed" style={{ color: FAINT }}>
              <span className={mono} style={{ color: DIM }}>
                If it looks different:{" "}
              </span>
              {a.stuck}
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
              One guide per thing that actually broke in a clinic, written the week it broke.
              Nothing in between.
            </p>
            <div className="mt-6">
              <ScratchSubscribe
                source="easy"
                cta="send me the next one"
                done="Done. The next guide lands the week it is written."
              />
            </div>
          </div>

          <p className="mt-12 max-w-2xl text-[15px] leading-relaxed" style={{ color: FAINT }}>
            Building the app rather than running the clinic? The other field guides:{" "}
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
