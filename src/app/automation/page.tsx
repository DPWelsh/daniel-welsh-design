import type { Metadata } from "next";
import Link from "next/link";
import {
  DISCLOSURE,
  VERDICT,
  TEN,
  GOOD_AT,
  BAD_AT,
  CAVEATS,
  SOURCE_NOTE,
} from "./content";
import {
  Kicker,
  SectionHead,
  PAPER,
  DIM,
  FAINT,
  ENERGY,
  PROMPT,
  RULE,
  RULE_SOFT,
  serif,
  mono,
  GRAIN,
} from "../scratch/ui";

/**
 * /automation. Payload for the AUTO keyword.
 *
 * Structure is deliberate: disclosure above the fold, verdict before the
 * list, both sides weighted equally, then the caveats. The caveats are not
 * a disclaimer, they are the argument. A page that publishes a 9.6% send
 * rate is one you can believe about the rest.
 *
 * Nothing on this page asks for anything.
 */

export const metadata: Metadata = {
  title: "10 automations, and the failure rate",
  description:
    "The ten automations running on a real clinic stack, what each replaced, and the numbers underneath: 10,793 patient messages answered, 188 bookings from 1,040 calls, and only 969 of 10,106 queued messages actually sent.",
  alternates: { canonical: "https://danielwelsh.design/automation" },
  openGraph: {
    title: "10 automations, and the failure rate",
    description:
      "Real numbers from a production clinic stack, including the 9.6% send rate nobody puts in the deck.",
    url: "https://danielwelsh.design/automation",
    type: "article",
  },
};

export default function AutomationPage() {
  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#101206" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-4xl px-6 pb-28 pt-14 sm:px-8">
        {/* ── Masthead ───────────────────────────────────────────── */}
        <header>
          <Kicker color={ENERGY}>Daniel Welsh · you commented AUTO</Kicker>
          <h1
            className={`${serif} mt-5 text-5xl font-black leading-[0.95] sm:text-6xl`}
            style={{ color: PAPER }}
          >
            Ten automations.
            <br />
            <span style={{ color: ENERGY }}>And the failure rate.</span>
          </h1>

          {/* Disclosure sits here, not the footer. It is what buys the rest. */}
          <div
            className="mt-8 border-l-2 py-3 pl-5"
            style={{ borderColor: FAINT }}
          >
            <p className={`${mono} text-[11px] uppercase tracking-[0.22em]`} style={{ color: FAINT }}>
              Read this first
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              {DISCLOSURE}
            </p>
          </div>
        </header>

        {/* ── 1. The verdict ─────────────────────────────────────── */}
        <section className="mt-16">
          <SectionHead part="The verdict" title="Where it actually pays" />
          <div className="mt-7 border-l-2 py-2 pl-6" style={{ borderColor: ENERGY }}>
            <p className={`${serif} text-2xl leading-snug sm:text-[27px]`} style={{ color: PAPER }}>
              {VERDICT.line}
            </p>
          </div>

          <div className="mt-9 grid gap-7 sm:grid-cols-2">
            <article className="border-t pt-5" style={{ borderColor: RULE_SOFT }}>
              <Kicker color={PROMPT}>{VERDICT.wins.t}</Kicker>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: DIM }}>{VERDICT.wins.d}</p>
            </article>
            <article className="border-t pt-5" style={{ borderColor: RULE_SOFT }}>
              <Kicker color={ENERGY}>{VERDICT.didnt.t}</Kicker>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: DIM }}>{VERDICT.didnt.d}</p>
            </article>
          </div>
        </section>

        {/* ── 2. The list ────────────────────────────────────────── */}
        <section className="mt-16">
          <SectionHead
            part="The list"
            title="The ten"
            lede="What each one replaced, what it has actually done, and the thing that bites. No row here is without a catch."
          />

          {/* Table scrolls inside itself; the body never scrolls sideways. */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className={`${mono} text-[11px] uppercase tracking-[0.16em]`} style={{ color: FAINT }}>
                  <th className="border-b py-3 pr-4 font-normal" style={{ borderColor: RULE }}>Automation</th>
                  <th className="border-b py-3 pr-4 font-normal" style={{ borderColor: RULE }}>Replaces</th>
                  <th className="border-b py-3 pr-4 font-normal" style={{ borderColor: RULE }}>So far</th>
                  <th className="border-b py-3 font-normal" style={{ borderColor: RULE }}>The catch</th>
                </tr>
              </thead>
              <tbody>
                {TEN.map((a) => (
                  <tr key={a.n} className="align-top">
                    <td className="border-b py-4 pr-4" style={{ borderColor: RULE_SOFT }}>
                      <span className={`${mono} text-[11px]`} style={{ color: FAINT }}>
                        {String(a.n).padStart(2, "0")}
                      </span>
                      <span className="mt-1 block text-[15px]" style={{ color: PAPER }}>{a.name}</span>
                    </td>
                    <td className="border-b py-4 pr-4 text-[14px] leading-relaxed" style={{ borderColor: RULE_SOFT, color: DIM }}>
                      {a.replaces}
                    </td>
                    <td
                      className={`${mono} border-b py-4 pr-4 text-[13px] tabular-nums`}
                      style={{ borderColor: RULE_SOFT, color: PROMPT }}
                    >
                      {a.evidence ?? <span style={{ color: FAINT }}>not running</span>}
                    </td>
                    <td className="border-b py-4 text-[14px] leading-relaxed" style={{ borderColor: RULE_SOFT, color: DIM }}>
                      {a.catch}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 3. Both sides ──────────────────────────────────────── */}
        <section className="mt-16">
          <SectionHead
            part="Both sides"
            title="What it is and isn't good at"
            lede="Equal weight on purpose. A page that only lists the wins is an ad."
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div>
              <Kicker color={PROMPT}>Good at</Kicker>
              <ul className="mt-5 space-y-4">
                {GOOD_AT.map((g) => (
                  <li key={g} className="flex gap-3 border-t pt-4" style={{ borderColor: RULE_SOFT }}>
                    <span className={`${mono} text-[12px]`} style={{ color: PROMPT }}>+</span>
                    <span className="text-[15px] leading-relaxed" style={{ color: DIM }}>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Kicker color={ENERGY}>Bad at</Kicker>
              <ul className="mt-5 space-y-4">
                {BAD_AT.map((b) => (
                  <li key={b} className="flex gap-3 border-t pt-4" style={{ borderColor: RULE_SOFT }}>
                    <span className={`${mono} text-[12px]`} style={{ color: ENERGY }}>&times;</span>
                    <span className="text-[15px] leading-relaxed" style={{ color: DIM }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 4. Caveats ─────────────────────────────────────────── */}
        <section className="mt-16">
          <SectionHead
            part="Before you quote this"
            title="What I'd check"
            lede="If you take one thing from this page, take this section rather than the table."
            color={ENERGY}
          />
          <ol className="mt-8 space-y-6">
            {CAVEATS.map((c, i) => (
              <li key={c.t} className="flex gap-5 border-t pt-5" style={{ borderColor: RULE_SOFT }}>
                <span className={`${mono} shrink-0 text-[13px]`} style={{ color: ENERGY }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={`${serif} text-xl font-bold`} style={{ color: PAPER }}>{c.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: DIM }}>{c.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 5. Where the numbers came from ─────────────────────── */}
        <section className="mt-16 border-t pt-9" style={{ borderColor: RULE }}>
          <Kicker color={FAINT}>Method</Kicker>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            {SOURCE_NOTE}
          </p>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed" style={{ color: FAINT }}>
            Nothing on this page wants your email. You already left a comment, which is more
            than enough. If you want the rest of it, the build notes are here:{" "}
            <Link href="/stacks" className="underline underline-offset-4" style={{ color: PROMPT }}>
              the nine jobs
            </Link>
            ,{" "}
            <Link href="/scratch" className="underline underline-offset-4" style={{ color: PROMPT }}>
              building it properly
            </Link>{" "}
            and{" "}
            <Link href="/domain" className="underline underline-offset-4" style={{ color: PROMPT }}>
              domain day
            </Link>
            .
          </p>
        </section>
      </div>

      <div aria-hidden className="h-1 w-full" style={{ backgroundColor: "#7d312d" }} />
    </main>
  );
}
