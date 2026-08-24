import type { Metadata } from "next";
import Link from "next/link";
import { GuideNav } from "@/components/guide-nav";
import { RoutiqMark } from "@/components/chrome";
import { CopyBlock } from "@/components/scratch/copy-block";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import { MISTAKES, REPO_ROWS, STAGES } from "./content";
import { BOOKS, bookLink } from "./library";
import { STEALS } from "./steals";
import { LibraryShelf, Watchlist } from "./sections";
import {
  BookPlate,
  DIM,
  ENERGY,
  ENERGY_DEEP,
  FAINT,
  GRAIN,
  
  Kicker,
  PAPER,
  PROMPT,
  RULE,
  RULE_SOFT,
  SectionHead,
  mono,
  serif,
} from "./ui";

export const metadata: Metadata = {
  title: "The SCRATCH Plan. Build an App With AI, Properly",
  description:
    "The five beginner mistakes that quietly wreck AI-built apps, the six-stage plan that fixes them, and the books, talks and templates to steal. From a real rebuild. 9,354 commits in.",
  alternates: { canonical: "/scratch" },
  openGraph: {
    title: "The SCRATCH Plan. Build an App With AI, Properly",
    description:
      "Five mistakes, six stages, twelve books, one real rebuild. The full plan behind the reel.",
    url: "https://danielwelsh.design/scratch",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

export default function ScratchPage() {
  const anchors = [
    ["mistakes", "The five mistakes"],
    ["repos", "The two repos"],
    ["stages", "The six stages"],
    ["library", "The library"],
    ["watchlist", "The watchlist"],
    ["steal", "Steal these"],
  ];

  return (
    <main
      className="relative min-h-screen overflow-x-clip antialiased selection:bg-[#a43e35] selection:text-[#f3f0e9]"
      style={{ background: "var(--paper)", color: PAPER }}
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
            headline: "The SCRATCH Plan. Build an App With AI, Properly",
            author: { "@type": "Person", name: "Daniel Welsh" },
            publisher: { "@type": "Person", name: "Daniel Welsh" },
            url: "https://danielwelsh.design/scratch",
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
          background: "radial-gradient(60% 100% at 50% 0%, rgba(164,62,53,0.14), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        {/* ── Masthead ─────────────────────────────────────────── */}
        <header className="pt-10">
          <div
            className={`${mono} sc-rise flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b pb-3 text-[10px] uppercase tracking-[0.25em]`}
            style={{ borderColor: RULE, color: FAINT }}
          >
            <span>Field Guide № 001</span>
            <span>Est. reading time. One honest coffee</span>
          </div>

          <div className="relative pt-12 sm:pt-16">
            <span
              className={`${mono} sc-rise absolute right-0 top-8 hidden rotate-[7deg] border-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] sm:top-12 sm:block`}
              style={{ borderColor: PROMPT, color: PROMPT, animationDelay: "0.35s" }}
            >
              Scratch · request received
            </span>

            <Kicker>You commented. This is the full plan.</Kicker>
            <h1
              className={`${serif} sc-rise mt-4 max-w-3xl text-5xl leading-[1.02] tracking-tight sm:text-7xl`}
              style={{ animationDelay: "0.08s" }}
            >
              Build it properly.{" "}
              <em className="not-italic" style={{ color: PROMPT }}>
                the second time.
              </em>
            </h1>
            <p
              className="sc-rise mt-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: DIM, animationDelay: "0.16s" }}
            >
              The skill isn&apos;t getting AI to write code anymore. It&apos;s knowing
              how to build it properly. Below: the five mistakes that quietly wreck
              AI-built apps, the six-stage plan that fixes them, and the exact
              books, talks and templates to steal. No theory. This is the system
              behind a real rebuild.
            </p>

            <div
              className={`${mono} sc-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em]`}
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
              <span>9,354 commits · 4 apps · 1 rebuild</span>
            </div>

            <nav
              aria-label="Contents"
              className={`${mono} sc-rise mt-10 flex flex-wrap gap-x-5 gap-y-2 border-y py-3 text-[11px] uppercase tracking-[0.18em]`}
              style={{ borderColor: RULE, animationDelay: "0.3s" }}
            >
              {anchors.map(([id, label], i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="transition-colors hover:text-white"
                  style={{ color: DIM }}
                >
                  <span style={{ color: FAINT }}>{`0${i + 1} `}</span>
                  {label}
                </a>
              ))}
              {/* Was /stacks, and beside it /supabase-vs-neon. Both were
                  routiq-labs pages that this site never had. The stack
                  pricing lives at /saas-calc here; the database comparison
                  has no equivalent yet, so it is gone rather than a 404. */}
              <Link
                href="/saas-calc"
                className="transition-colors hover:text-white"
                style={{ color: PROMPT }}
              >
                The stacks →
              </Link>
            </nav>
          </div>
        </header>

        {/* ── Part I · The five mistakes ───────────────────────── */}
        <section id="mistakes" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part I. The damage"
            title="Five mistakes that wreck AI-built apps"
            lede="Each one feels fine on the day. Each one compounds. How it shows up, why it happens, and the fix. With the receipt that says we're not guessing."
            color={ENERGY}
          />

          <ol className="mt-4">
            {MISTAKES.map((m) => (
              <li
                key={m.n}
                className="grid gap-x-8 border-t py-10 sm:grid-cols-[90px_1fr]"
                style={{ borderColor: RULE_SOFT }}
              >
                <div
                  className={`${serif} text-5xl leading-none sm:text-6xl`}
                  style={{ color: ENERGY }}
                >
                  {m.n}
                </div>
                <div className="mt-4 space-y-4 sm:mt-1">
                  <h3 className={`${serif} text-2xl `} style={{ color: PAPER }}>
                    {m.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: DIM }}>
                    <span className={`${mono} mr-2 text-[10px] font-bold uppercase tracking-[0.2em]`} style={{ color: ENERGY }}>
                      Shows up as
                    </span>
                    {m.showsUp}
                  </p>
                  <p className="text-[15px] leading-relaxed" style={{ color: DIM }}>
                    <span className={`${mono} mr-2 text-[10px] font-bold uppercase tracking-[0.2em]`} style={{ color: FAINT }}>
                      Why
                    </span>
                    {m.why}
                  </p>
                  <div className="border-l-2 py-1 pl-4" style={{ borderColor: PROMPT }}>
                    <p className="text-[15px] leading-relaxed" style={{ color: PAPER }}>
                      <span className={`${mono} mr-2 text-[10px] font-bold uppercase tracking-[0.2em]`} style={{ color: PROMPT }}>
                        The fix
                      </span>
                      {m.fix}
                    </p>
                  </div>
                  <p className={`${mono} text-[12px] leading-relaxed`} style={{ color: m.confession ? ENERGY : FAINT }}>
                    ▸ {m.receipt}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Part II · The two repos ──────────────────────────── */}
        <section id="repos" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part II. The receipts"
            title="Same app. Two histories."
            lede="Two real repos of the same clinic booking app. One built the way the five mistakes build it, one built on the plan below. These are the props from the reel."
          />

          <div className="mt-8 overflow-x-auto">
            <table className={`${mono} w-full min-w-[640px] border-collapse text-[12px]`}>
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.2em]">
                  <th className="w-32 pb-3 font-medium" style={{ color: FAINT }} />
                  <th className="pb-3 font-bold" style={{ color: ENERGY }}>
                    ✗ the-mess
                  </th>
                  <th className="pb-3 font-bold" style={{ color: PROMPT }}>
                    ✓ built-properly
                  </th>
                </tr>
              </thead>
              <tbody>
                {REPO_ROWS.map((row) => (
                  <tr key={row.label} className="border-t" style={{ borderColor: RULE_SOFT }}>
                    <td className="py-3.5 pr-4 align-top text-[10px] uppercase tracking-[0.18em]" style={{ color: FAINT }}>
                      {row.label}
                    </td>
                    <td className="py-3.5 pr-6 align-top leading-relaxed" style={{ color: "rgba(201,107,102,0.9)" }}>
                      {row.mess}
                    </td>
                    <td className="py-3.5 align-top leading-relaxed" style={{ color: "rgba(237,237,235,0.8)" }}>
                      {row.proper}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`${mono} mt-4 text-[11px]`} style={{ color: FAINT }}>
            ▸ Both parse clean. Both run. Only one of them can still be changed safely.
          </p>
        </section>

        {/* ── Part III · The six stages ────────────────────────── */}
        <section id="stages" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part III. The plan"
            title="The six stages"
            lede="One question per stage. If you can answer it honestly, move on. Every stage carries one renowned book. The deep end, when you want it. Plus a companion."
          />

          <div className="mt-4 space-y-2">
            {STAGES.map((stage) => {
              const primary = BOOKS.find((b) => b.stage === stage.n && b.role === "primary")!;
              const companion = BOOKS.find((b) => b.stage === stage.n && b.role === "companion")!;
              return (
                <article
                  key={stage.n}
                  className="relative grid gap-8 overflow-hidden border-t py-12 lg:grid-cols-[1fr_240px]"
                  style={{ borderColor: RULE_SOFT }}
                >
                  <span
                    aria-hidden
                    className={`${serif} pointer-events-none absolute -top-8 right-0 select-none text-[11rem] leading-none lg:-right-4`}
                    style={{ color: "rgba(237,237,235,0.045)" }}
                  >
                    {stage.n}
                  </span>

                  <div className="relative space-y-5">
                    <Kicker color={FAINT}>{`Stage ${stage.n} of 6`}</Kicker>
                    <h3 className={`${serif} text-2xl sm:text-3xl`} style={{ color: PAPER }}>
                      {stage.title}
                    </h3>
                    <p className={`${serif} text-xl italic leading-snug`} style={{ color: PROMPT }}>
                      “{stage.check}”
                    </p>
                    <p className="max-w-xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                      {stage.intro}
                    </p>
                    <dl className="grid gap-x-8 gap-y-4 pt-2 sm:grid-cols-2">
                      {stage.lenses.map((lens) => (
                        <div key={lens.label}>
                          <dt className={`${mono} text-[10px] font-bold uppercase tracking-[0.2em]`} style={{ color: FAINT }}>
                            {lens.label}
                          </dt>
                          <dd className="mt-1 text-[13.5px] leading-relaxed" style={{ color: DIM }}>
                            {lens.text}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <aside className="relative flex flex-col gap-4 lg:pt-6">
                    <p className={`${mono} text-[10px] font-bold uppercase tracking-[0.25em]`} style={{ color: FAINT }}>
                      The books
                    </p>
                    <div className="flex items-start">
                      <BookPlate book={primary} size="lg" />
                      <BookPlate book={companion} size="sm" />
                    </div>
                    <div className="space-y-2 text-[12.5px] leading-relaxed" style={{ color: DIM }}>
                      <p>
                        <a href={bookLink(primary)} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-4 hover:underline" style={{ color: PAPER }}>
                          {primary.title}
                        </a>{" "}
                        {primary.why}
                      </p>
                      <p>
                        <a href={bookLink(companion)} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-4 hover:underline" style={{ color: PAPER }}>
                          {companion.title}
                        </a>{" "}
                        {companion.why}
                      </p>
                    </div>
                  </aside>
                </article>
              );
            })}
          </div>
        </section>

        <LibraryShelf />
        <Watchlist />

        {/* ── Part VI · Steal these ────────────────────────────── */}
        <section id="steal" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part VI. Steal these"
            title="The templates, verbatim"
            lede="The most giveable pieces of the plan. Copy them into your project today. They work before you've read a single book above."
          />

          <div className="mt-10 grid gap-x-8 gap-y-10 lg:grid-cols-2">
            {STEALS.map((s) => (
              <div key={s.id} className="flex min-w-0 flex-col gap-3">
                <div>
                  <h3 className={`${serif} text-xl `} style={{ color: PAPER }}>
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed" style={{ color: DIM }}>
                    {s.blurb}
                  </p>
                </div>
                <CopyBlock id={s.id} filename={s.filename} body={s.body} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Follow the rebuild ───────────────────────────────── */}
        <section
          className="mt-24 border px-6 py-12 sm:px-12"
          style={{ borderColor: "rgba(164,62,53,0.28)", background: "linear-gradient(160deg, rgba(164,62,53,0.10), transparent 70%)" }}
        >
          <Kicker>The plan, run in public</Kicker>
          <h2 className={`${serif} mt-4 max-w-xl text-3xl leading-tight sm:text-4xl`} style={{ color: PAPER }}>
            This isn&apos;t theory. The rebuild is happening now.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            Robyn. The AI receptionist behind those 9,354 commits. Is being
            rebuilt from scratch on this exact plan, one stage per episode. Each
            stage ships with its own deep-dive. Leave an email and get each one
            as it drops. Nothing else, ever.
          </p>
          <div className="mt-8">
            <ScratchSubscribe />
          </div>
          <p className={`${mono} mt-6 text-[11px]`} style={{ color: FAINT }}>
            Or just follow along.{" "}
            <a
              href="https://www.instagram.com/danielwelsh_routiq"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
              style={{ color: PROMPT }}
            >
              @danielwelsh_routiq
            </a>{" "}.
           The next episode is already in progress.
          </p>
        </section>

        {/* ── Colophon ─────────────────────────────────────────── */}
        <footer
          className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t pt-8"
          style={{ borderColor: RULE }}
        >
          <div className="flex items-center gap-4">
            {/* Was an <img> for /routiq-logo-light.svg, which this site has
                never shipped, so the footer rendered a broken image. The
                inlined mark needs no asset at all. */}
            <Link href="/" aria-label="Daniel Welsh home" className="hover:opacity-70">
              <span style={{ color: PROMPT }}>
                <RoutiqMark className="h-5 w-5" />
              </span>
            </Link>
            <span className={`${mono} text-[10px] uppercase tracking-[0.25em]`} style={{ color: FAINT }}>
              Field Guide № 001 · built on its own rules
            </span>
          </div>
          <p className={`${mono} text-[10px] uppercase tracking-[0.2em]`} style={{ color: FAINT }}>
            <a href="#mistakes" className="hover:text-white">
              Back to the top ↑
            </a>
          </p>
        </footer>
      </div>

      {/* deep-red hairline base, the one energy accent the brand allows */}
      <div aria-hidden className="h-1 w-full" style={{ background: ENERGY_DEEP }} />
    </main>
  );
}
