import type { Metadata } from "next";
import Link from "next/link";
import { GuideNav } from "@/components/guide-nav";
import { CopyBlock } from "@/components/scratch/copy-block";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import {
  BREAKERS,
  CHECK_INTRO,
  CHECK_RULE,
  CLOSING,
  WHY_YOU,
  FIELDS,
  GUARDS,
  GUARD_FAILURE,
  GUARD_GOOD,
  LEDE,
  LOG_HEADLINE,
  LOG_RECEIPT,
  METHOD,
  NOT_COVERED,
  TWO_APPS,
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
 * /ship. Field Guide № 002, payload for the SHIP keyword.
 *
 * The comment prompt asks how to DO the three checks, so every part is
 * mechanics rather than a restatement of the reel.
 *
 * Authority framing, not confession framing: this page is read by people
 * evaluating AI software for medical clinics, so it names traps and how to
 * catch them rather than admitting production bugs. Same specifics, no
 * self-incrimination.
 */

export const metadata: Metadata = {
  title: "Three Checks Before You Ship",
  description:
    "How to actually do the three checks: the twelve ways a real user breaks an AI app, the four kinds of check ranked by cost, the seven fields worth saving, and the templates to steal.",
  alternates: { canonical: "/ship" },
  openGraph: {
    title: "Three Checks Before You Ship",
    description:
      "Twelve ways a real user breaks an AI app, four kinds of check, seven fields, seven templates. From four AI products running in production.",
    url: "https://danielwelsh.design/ship",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

export default function ShipPage() {
  const anchors = [
    ["why", "Why testing misses it"],
    ["breaks", "Twelve ways it breaks"],
    ["check", "The check in the middle"],
    ["save", "What to save"],
    ["two-apps", "Demo vs product"],
    ["steal", "Steal these"],
  ];

  return (
    <main
      className="relative min-h-screen overflow-x-clip antialiased selection:bg-[#7ba2e0] selection:text-[#161613]"
      style={{ background: "#161613", color: PAPER }}
    >
      <GuideNav />
      <style>{`
        @keyframes sh-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .sh-rise { animation: sh-rise 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .sh-rise { animation: none; } }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Three Checks Before You Ship",
            author: { "@type": "Person", name: "Daniel Welsh" },
            publisher: { "@type": "Person", name: "Daniel Welsh" },
            url: "https://danielwelsh.design/ship",
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
            className={`${mono} sh-rise flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b pb-3 text-[10px] uppercase tracking-[0.25em]`}
            style={{ borderColor: RULE, color: FAINT }}
          >
            <span>Daniel Welsh · Field Guide № 002</span>
            <span>Est. reading time. One honest coffee</span>
          </div>

          <div className="relative pt-12 sm:pt-16">
            <span
              className={`${mono} sh-rise absolute right-0 top-8 hidden rotate-[7deg] border-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] sm:top-12 sm:block`}
              style={{ borderColor: PROMPT, color: PROMPT, animationDelay: "0.35s" }}
            >
              Ship · request received
            </span>

            <Kicker>You commented. Here is how to do them.</Kicker>
            <h1
              className={`${serif} sh-rise mt-4 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-7xl`}
              style={{ animationDelay: "0.08s" }}
            >
              Three checks.{" "}
              <em className="not-italic" style={{ color: PROMPT }}>
                before a stranger touches it.
              </em>
            </h1>
            <p
              className="sh-rise mt-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: DIM, animationDelay: "0.16s" }}
            >
              {LEDE}
            </p>

            <div
              className={`${mono} sh-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em]`}
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
              <span>4 apps in production · 12 breakers · 7 templates</span>
            </div>

            <nav
              aria-label="Contents"
              className={`${mono} sh-rise mt-10 flex flex-wrap gap-x-5 gap-y-2 border-y py-3 text-[11px] uppercase tracking-[0.18em]`}
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

        {/* ── Part I. Why your own testing cannot find these ─── */}
        <section id="why" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part I. Before the list"
            title="Why your own testing misses all of this"
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

        {/* ── Part II. The extended list ──────────────────────── */}
        <section id="breaks" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part II. Check 01"
            title="Twelve ways a real user breaks it"
            lede="Not a list of features. A list of things a person can do that produce a wrong answer instead of an error, which is the only kind of bug that reaches a customer quietly. Two of them are worth an extra minute."
          />

          <ol className="mt-10 space-y-10">
            {BREAKERS.map((b) => (
              <li
                key={b.n}
                className="border-t pt-6"
                style={{ borderColor: b.flag ? ENERGY : RULE_SOFT }}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className={`${mono} text-[13px]`} style={{ color: b.flag ? ENERGY : PROMPT }}>
                    {b.n}
                  </span>
                  <h3
                    className={`${serif} text-2xl font-bold leading-tight`}
                    style={{ color: b.flag ? ENERGY : PAPER }}
                  >
                    {b.title}
                  </h3>
                </div>

                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className={`${mono} text-[10px] uppercase tracking-[0.22em]`} style={{ color: FAINT }}>
                      How it shows up
                    </dt>
                    <dd className="mt-2 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                      {b.showsUp}
                    </dd>
                  </div>
                  <div>
                    <dt className={`${mono} text-[10px] uppercase tracking-[0.22em]`} style={{ color: FAINT }}>
                      Why you will never find it yourself
                    </dt>
                    <dd className="mt-2 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                      {b.why}
                    </dd>
                  </div>
                  <div>
                    <dt className={`${mono} text-[10px] uppercase tracking-[0.22em]`} style={{ color: PROMPT }}>
                      What to do
                    </dt>
                    <dd className="mt-2 max-w-2xl text-[15px] leading-relaxed" style={{ color: PAPER }}>
                      {b.fix}
                    </dd>
                  </div>
                </dl>

                {b.receipt && (
                  <p
                    className={`${mono} mt-5 max-w-2xl border-l-2 py-1 pl-4 text-[13px] leading-relaxed`}
                    style={{
                      borderColor: b.flag ? ENERGY : RULE,
                      color: b.flag ? ENERGY : FAINT,
                    }}
                  >
                    {b.receipt}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* ── Part III. The check ─────────────────────────────── */}
        <section id="check" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part III. Check 02"
            title="Put a check between the AI and the person"
            lede={CHECK_INTRO}
          />

          <div className="mt-8 border-l-2 py-2 pl-6" style={{ borderColor: PROMPT }}>
            <p className={`${serif} text-2xl leading-snug sm:text-[28px]`} style={{ color: PAPER }}>
              {CHECK_RULE}
            </p>
          </div>

          <ol className="mt-10 space-y-8">
            {GUARDS.map((g, i) => (
              <li key={g.name} className="border-t pt-5" style={{ borderColor: RULE_SOFT }}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <div className="flex items-baseline gap-4">
                    <span className={`${mono} text-[13px]`} style={{ color: PROMPT }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`${serif} text-xl font-bold`} style={{ color: PAPER }}>
                      {g.name}
                    </h3>
                  </div>
                  <span className={`${mono} text-[11px] uppercase tracking-[0.18em]`} style={{ color: PROMPT }}>
                    Costs: {g.cost}
                  </span>
                </div>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                  <span style={{ color: FAINT }}>Catches. </span>
                  {g.catches}
                </p>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                  <span style={{ color: FAINT }}>Use it when. </span>
                  {g.when}
                </p>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: PAPER }}>
                  <span className={`${mono} text-[11px] uppercase tracking-[0.18em]`} style={{ color: PROMPT }}>
                    How.{" "}
                  </span>
                  {g.how}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 border-l-2 py-3 pl-6" style={{ borderColor: ENERGY }}>
            <Kicker color={ENERGY}>{GUARD_FAILURE.t}</Kicker>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              {GUARD_FAILURE.d}
            </p>
          </div>

          <div className="mt-6 border-l-2 py-3 pl-6" style={{ borderColor: PROMPT }}>
            <Kicker color={PROMPT}>{GUARD_GOOD.t}</Kicker>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              {GUARD_GOOD.d}
            </p>
          </div>
        </section>

        {/* ── Part IV. What to save ───────────────────────────── */}
        <section id="save" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part IV. Check 03"
            title="Save a copy of everything, from day one"
            lede={LOG_HEADLINE}
          />

          <ol className="mt-10">
            {FIELDS.map((f, i) => (
              <li
                key={f.f}
                className="grid gap-2 border-t py-5 sm:grid-cols-[230px_1fr] sm:gap-6"
                style={{ borderColor: RULE_SOFT }}
              >
                <div>
                  <span className={`${mono} text-[11px]`} style={{ color: FAINT }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-[15px] font-semibold" style={{ color: PAPER }}>
                    {f.f}
                  </p>
                </div>
                <p className="text-[14px] leading-relaxed" style={{ color: DIM }}>
                  {f.why}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-8 border-l-2 py-3 pl-6" style={{ borderColor: PROMPT }}>
            <Kicker color={PROMPT}>{LOG_RECEIPT.t}</Kicker>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              {LOG_RECEIPT.d}
            </p>
          </div>
        </section>

        {/* ── Part V. Demo vs product ─────────────────────────── */}
        <section id="two-apps" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part V. The difference"
            title="The same app, twice"
            lede="Both of these work when you demo them. Only one of them is still working in month six, and every row is one of the three checks doing its job."
          />

          <div className="mt-9 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr className={`${mono} text-[10px] uppercase tracking-[0.2em]`}>
                  <th className="w-[180px] border-b py-3 pr-4 font-normal" style={{ borderColor: RULE, color: FAINT }}>
                    When
                  </th>
                  <th className="border-b py-3 pr-4 font-normal" style={{ borderColor: RULE, color: ENERGY }}>
                    A demo with a payment form
                  </th>
                  <th className="border-b py-3 font-normal" style={{ borderColor: RULE, color: PROMPT }}>
                    A product
                  </th>
                </tr>
              </thead>
              <tbody>
                {TWO_APPS.map((r) => (
                  <tr key={r.label} className="align-top">
                    <td className="border-b py-4 pr-4 text-[14px]" style={{ borderColor: RULE_SOFT, color: PAPER }}>
                      {r.label}
                    </td>
                    <td className="border-b py-4 pr-4 text-[14px] leading-relaxed" style={{ borderColor: RULE_SOFT, color: DIM }}>
                      {r.demo}
                    </td>
                    <td className="border-b py-4 text-[14px] leading-relaxed" style={{ borderColor: RULE_SOFT, color: DIM }}>
                      {r.product}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Part VI. Steal these ────────────────────────────── */}
        <section id="steal" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part VI. Steal these"
            title="Seven things to paste in"
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
            part="Part VII. The limits"
            title="What three checks will not do"
            lede="This is a pre-launch list, not a definition of done. Four things it deliberately does not touch."
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
                source="ship"
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
            <Link href="/automation" className="underline underline-offset-4" style={{ color: PROMPT }}>
              ten automations and the failure rate
            </Link>{" "}
            and{" "}
            <Link href="/domain" className="underline underline-offset-4" style={{ color: PROMPT }}>
              domain day
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
