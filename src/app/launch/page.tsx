import type { Metadata } from "next";
import Link from "next/link";
import { GuideNav } from "@/components/guide-nav";
import { CopyBlock } from "@/components/scratch/copy-block";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import {
  CHECKS,
  CLOSING,
  LEDE,
  METHOD,
  NEXT_FIVE,
  NEXT_FIVE_LEDE,
  NOT_COVERED,
  WHY_YOU,
} from "./content";
import { STEALS } from "./steals";
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
 * /launch. Field Guide № 004, payload for the LAUNCH keyword.
 *
 * The reel (P02, "five things before you launch") names the five; every
 * part here is the how. Exact tags, exact records, exact toggles, plus
 * "the next five" for the first week live and eight paste-in files.
 *
 * Copy rules live in content.ts: no em dashes, one idea per sentence.
 *
 * Facts were researched and independently fact-checked against current
 * docs (August 2026). Where a claim is version-sensitive (Vercel DNS
 * values, PostHog consent modes, free tiers) the page says "copy the
 * card" / "as of 2026" rather than pretending it is timeless.
 */

export const metadata: Metadata = {
  title: "Five Things Before You Launch",
  description:
    "The pre-launch list in full: the preview image, the subdomain split, the one first action, session replay, and the sitemap. Exact steps, the gotchas, and eight files to paste in.",
  alternates: { canonical: "/launch" },
  openGraph: {
    title: "Five Things Before You Launch",
    description:
      "Preview image, subdomains, one first action, session replay, sitemap. The mechanics for each, plus the next five for your first week live.",
    url: "https://danielwelsh.design/launch",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

export default function LaunchPage() {
  const anchors: [string, string][] = [
    ["why", "Why you can't see it"],
    ...CHECKS.map((c) => [c.id, `${c.n} · ${c.title}`] as [string, string]),
    ["next-five", "The next five"],
    ["steal", "Steal these"],
  ];

  return (
    <main
      className="relative min-h-screen overflow-x-clip antialiased selection:bg-[#7ba2e0] selection:text-[#161613]"
      style={{ background: "#161613", color: PAPER }}
    >
      <GuideNav />
      <style>{`
        @keyframes ln-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .ln-rise { animation: ln-rise 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .ln-rise { animation: none; } }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Five Things Before You Launch",
            author: { "@type": "Person", name: "Daniel Welsh" },
            publisher: { "@type": "Person", name: "Daniel Welsh" },
            url: "https://danielwelsh.design/launch",
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

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        {/* ── Masthead ─────────────────────────────────────────── */}
        <header className="pt-10">
          <div
            className={`${mono} ln-rise flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b pb-3 text-[10px] uppercase tracking-[0.25em]`}
            style={{ borderColor: RULE, color: FAINT }}
          >
            <span>Daniel Welsh · Field Guide № 004</span>
            <span>Est. reading time. One honest coffee</span>
          </div>

          <div className="relative pt-12 sm:pt-16">
            <span
              className={`${mono} ln-rise absolute right-0 top-8 hidden rotate-[7deg] border-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] sm:top-12 sm:block`}
              style={{ borderColor: PROMPT, color: PROMPT, animationDelay: "0.35s" }}
            >
              Launch · request received
            </span>

            <Kicker>You commented LAUNCH. Here is the list in full.</Kicker>
            <h1
              className={`${serif} ln-rise mt-4 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-7xl`}
              style={{ animationDelay: "0.08s" }}
            >
              Five things,{" "}
              <em className="not-italic" style={{ color: PROMPT }}>
                before you launch.
              </em>
            </h1>
            <p
              className="ln-rise mt-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: DIM, animationDelay: "0.16s" }}
            >
              {LEDE}
            </p>

            <div
              className={`${mono} ln-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em]`}
              style={{ color: FAINT, animationDelay: "0.24s" }}
            >
              <span style={{ color: PAPER }}>Daniel Welsh</span>
              <a
                href="https://www.instagram.com/danielwelsh_routiq"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
                style={{ color: PROMPT }}
              >
                @danielwelsh_routiq
              </a>
              <span>4 apps in production · 5 + 5 items · 8 files</span>
            </div>

            <nav
              aria-label="Contents"
              className={`${mono} ln-rise mt-10 flex flex-wrap gap-x-5 gap-y-2 border-y py-3 text-[11px] uppercase tracking-[0.18em]`}
              style={{ borderColor: RULE, animationDelay: "0.3s" }}
            >
              {anchors.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="transition-colors hover:text-white"
                  style={{ color: FAINT }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* ── Part I. Why you can't see it ─────────────────────── */}
        <section id="why" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part I. Before the list"
            title="Why you can't see your own launch"
          />

          <div className="mt-8 border-l-2 py-2 pl-6" style={{ borderColor: PROMPT }}>
            <p className={`${serif} text-2xl leading-snug sm:text-[28px]`} style={{ color: PAPER }}>
              {WHY_YOU.line}
            </p>
          </div>

          <div className="mt-9 space-y-6">
            <p className="max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              {WHY_YOU.a}
            </p>
            <p className="max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              {WHY_YOU.b}
            </p>
            <p className={`${serif} pt-2 text-xl leading-snug`} style={{ color: PAPER }}>
              {WHY_YOU.c}
            </p>
          </div>
        </section>

        {/* ── Parts II–VI. The five checks ─────────────────────── */}
        {CHECKS.map((c, ci) => (
          <section key={c.id} id={c.id} className="mt-20 scroll-mt-10">
            <SectionHead
              part={`Part ${["II", "III", "IV", "V", "VI"][ci]}. Check ${c.n}`}
              title={c.title}
              lede={c.lede}
            />

            <ol className="mt-10 space-y-8">
              {c.steps.map((s, i) => (
                <li key={s.h} className="border-t pt-5" style={{ borderColor: RULE_SOFT }}>
                  <div className="flex items-baseline gap-4">
                    <span className={`${mono} text-[13px]`} style={{ color: PROMPT }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`${serif} text-xl font-bold`} style={{ color: PAPER }}>
                      {s.h}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10 border-l-2 py-3 pl-6" style={{ borderColor: ENERGY }}>
              <Kicker color={ENERGY}>Where this bites</Kicker>
              <ul className="mt-4 space-y-3">
                {c.gotchas.map((g) => (
                  <li key={g} className="flex gap-3">
                    <span className={`${mono} shrink-0 text-[12px]`} style={{ color: ENERGY }}>
                      &times;
                    </span>
                    <span className="max-w-2xl text-[14px] leading-relaxed" style={{ color: DIM }}>
                      {g}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-l-2 py-3 pl-6" style={{ borderColor: PROMPT }}>
              <Kicker color={PROMPT}>The thirty-second test</Kicker>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                {c.test}
              </p>
            </div>
          </section>
        ))}

        {/* ── Part VII. The next five ──────────────────────────── */}
        <section id="next-five" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part VII. The next five"
            title="Items 06–10, for your first week live"
            lede={NEXT_FIVE_LEDE}
          />

          <ol className="mt-10">
            {NEXT_FIVE.map((x) => (
              <li
                key={x.n}
                className="grid gap-2 border-t py-6 sm:grid-cols-[230px_1fr] sm:gap-6"
                style={{ borderColor: RULE_SOFT }}
              >
                <div>
                  <span className={`${mono} text-[11px]`} style={{ color: FAINT }}>
                    {x.n}
                  </span>
                  <p className={`${serif} mt-1 text-lg font-bold`} style={{ color: PAPER }}>
                    {x.title}
                  </p>
                </div>
                <div>
                  <p className="max-w-2xl text-[14px] leading-relaxed" style={{ color: DIM }}>
                    {x.body}
                  </p>
                  <p className="mt-3 max-w-2xl text-[14px] leading-relaxed" style={{ color: PAPER }}>
                    <span className={`${mono} text-[11px] uppercase tracking-[0.18em]`} style={{ color: PROMPT }}>
                      Do this.{" "}
                    </span>
                    {x.action}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Part VIII. Steal these ───────────────────────────── */}
        <section id="steal" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part VIII. Steal these"
            title="Eight things to paste in"
            lede="The mechanics, as files. Every one is short enough to read in full before you paste it, and none of them need a library you do not already have."
          />

          <div className="mt-10 space-y-12">
            {STEALS.map((s) => (
              <article key={s.id}>
                <h3 className={`${serif} text-xl font-bold`} style={{ color: PAPER }}>
                  {s.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                  {s.blurb}
                </p>
                <div className="mt-4">
                  <CopyBlock id={s.id} filename={s.filename} body={s.body} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Limits ───────────────────────────────────────────── */}
        <section className="mt-20">
          <SectionHead
            part="Part IX. The limits"
            title="What this list will not do"
            lede="This is a launch-day list, not a definition of done. Four things it deliberately does not touch."
            color={ENERGY}
          />
          <ul className="mt-8 space-y-4">
            {NOT_COVERED.map((n) => (
              <li key={n} className="flex gap-3 border-t pt-4" style={{ borderColor: RULE_SOFT }}>
                <span className={`${mono} shrink-0 text-[12px]`} style={{ color: ENERGY }}>
                  &times;
                </span>
                <span className="max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Method + subscribe ───────────────────────────────── */}
        <section className="mt-20 border-t pt-10" style={{ borderColor: RULE }}>
          <Kicker color={FAINT}>Where this came from</Kicker>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            {METHOD}
          </p>

          <p className={`${serif} mt-10 max-w-2xl text-2xl leading-snug`} style={{ color: PAPER }}>
            {CLOSING}
          </p>

          <div className="mt-12 border-t pt-8" style={{ borderColor: RULE }}>
            <Kicker>The rest of the series</Kicker>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              One guide per thing that broke, written the week it broke. No noise in between.
            </p>
            <div className="mt-6">
              <ScratchSubscribe
                source="launch"
                cta="send me the next one"
                done="You'll get each guide as it ships. No noise between drops."
              />
            </div>
          </div>

          <p className="mt-12 max-w-2xl text-[15px] leading-relaxed" style={{ color: FAINT }}>
            The rest of the field guides:{" "}
            <Link href="/scratch" className="underline underline-offset-4" style={{ color: PROMPT }}>
              building it properly
            </Link>
            ,{" "}
            <Link href="/ship" className="underline underline-offset-4" style={{ color: PROMPT }}>
              the three checks before anyone touches it
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
