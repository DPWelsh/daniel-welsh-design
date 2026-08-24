import type { Metadata } from "next";
import Link from "next/link";
import {
  TEN_MINUTES,
  EMAIL_RULE,
  EMAIL_RECORDS,
  DMARC_STAGES,
  FULL_CHECKLIST,
  MISTAKES,
  CONFESSION,
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
 * /domain. The payload for the DOMAIN keyword.
 *
 * The reel gave three things and promised "the full tips list". This is it.
 * Part II is deliberately the biggest section: the reel told people to split
 * notify. from mail. without mentioning the three records that make that
 * split mean anything, and that is the half most likely to bite them.
 */

export const metadata: Metadata = {
  title: "Domain day. The full setup list",
  description:
    "Everything to do on the day you buy a domain. The three from the reel, the SPF, DKIM and DMARC records that make email actually arrive, the twelve-item checklist and the five ways people get it wrong.",
  alternates: { canonical: "https://danielwelsh.design/domain" },
  openGraph: {
    title: "Domain day. The full setup list",
    description:
      "The three from the reel, plus the email records nobody mentions until their password resets land in spam.",
    url: "https://danielwelsh.design/domain",
    type: "article",
  },
};

export default function DomainPage() {
  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#101206" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-16 sm:px-8 lg:px-10">
        {/* ── Masthead ───────────────────────────────────────────── */}
        <header>
          <Kicker color={ENERGY}>Daniel Welsh · domain day</Kicker>
          <h1
            className={`${serif} mt-5 text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl`}
            style={{ color: PAPER }}
          >
            Ten minutes now.
            <br />
            <span style={{ color: ENERGY }}>Or a week later.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed" style={{ color: DIM }}>
            Everything worth doing on the day you buy a domain, in the order you should do it.
            None of it is hard. All of it is annoying to retrofit once something is live and
            people are already using the old address.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: FAINT }}>
            If you commented <span style={{ color: PROMPT }}>DOMAIN</span>, this is the full list.
            The reel gave you the first three. Part II is the half it left out, and it is the part
            that decides whether your email arrives.
          </p>

          <nav
            className={`${mono} mt-9 flex flex-wrap gap-x-5 gap-y-2 border-y py-3 text-[11px] uppercase tracking-[0.18em]`}
            style={{ borderColor: RULE }}
            aria-label="Contents"
          >
            <Link href="#ten" className="transition-colors hover:text-white" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>01 </span>The ten minutes
            </Link>
            <Link href="#email" className="transition-colors hover:text-white" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>02 </span>Why email fails
            </Link>
            <Link href="#checklist" className="transition-colors hover:text-white" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>03 </span>The full list
            </Link>
            <Link href="#mistakes" className="transition-colors hover:text-white" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>04 </span>Getting it wrong
            </Link>
            <Link href="/stacks" className="transition-colors hover:text-white" style={{ color: PROMPT }}>
              → The stacks
            </Link>
          </nav>
        </header>

        {/* ── Part I ─────────────────────────────────────────────── */}
        <section id="ten" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part I. Domain day"
            title="The ten minutes"
            lede="The first three are the ones from the video. Four and five are the bonus everybody asked for in the comments."
          />

          <ol className="mt-8 space-y-8">
            {TEN_MINUTES.map((s) => (
              <li
                key={s.n}
                className="border-t pt-6"
                style={{ borderColor: s.inReel ? RULE_SOFT : RULE_SOFT }}
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <Kicker color={s.inReel ? ENERGY : FAINT}>{s.n}</Kicker>
                  <h3 className={`${serif} text-2xl font-bold`} style={{ color: PAPER }}>
                    {s.title}
                  </h3>
                  {!s.inReel && (
                    <span className={`${mono} text-[10px] uppercase tracking-[0.18em]`} style={{ color: FAINT }}>
                      bonus
                    </span>
                  )}
                </div>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: PAPER }}>
                  {s.what}
                </p>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                  <span style={{ color: PROMPT }}>Why: </span>
                  {s.why}
                </p>
                {s.record && (
                  <p
                    className={`${mono} mt-4 inline-block border px-3 py-1.5 text-[12px]`}
                    style={{ borderColor: RULE, color: FAINT }}
                  >
                    {s.record}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* ── Part II ────────────────────────────────────────────── */}
        <section id="email" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part II. The half the video left out"
            title="Why your email goes to spam"
            lede="Three records, one afternoon, and the difference between a password reset arriving and quietly not."
            color={ENERGY}
          />

          <div className="mt-8 border-l-2 py-2 pl-6" style={{ borderColor: ENERGY }}>
            <p className={`${serif} text-2xl leading-snug sm:text-[28px]`} style={{ color: PAPER }}>
              {EMAIL_RULE}
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {EMAIL_RECORDS.map((r) => (
              <article key={r.name} className="border-t pt-6" style={{ borderColor: RULE_SOFT }}>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className={`${serif} text-3xl font-black`} style={{ color: PAPER }}>
                    {r.name}
                  </h3>
                  <span
                    className={`${mono} border px-2 py-0.5 text-[11px] uppercase tracking-[0.16em]`}
                    style={{ borderColor: RULE, color: FAINT }}
                  >
                    {r.type}
                  </span>
                </div>
                <p className={`${serif} mt-4 text-xl italic`} style={{ color: PROMPT }}>
                  “{r.answers}”
                </p>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                  {r.what}
                </p>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                  <span style={{ color: ENERGY }}>The gotcha: </span>
                  {r.gotcha}
                </p>
              </article>
            ))}
          </div>

          {/* DMARC ramp */}
          <div className="mt-12">
            <Kicker color={FAINT}>The DMARC ramp</Kicker>
            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              {DMARC_STAGES.map((d, i) => (
                <article
                  key={d.p}
                  className="border-t pt-5"
                  style={{ borderColor: i === 0 ? PROMPT : RULE_SOFT }}
                >
                  <p className={`${mono} text-[13px]`} style={{ color: i === 0 ? PROMPT : PAPER }}>
                    {d.p}
                  </p>
                  <p className={`${mono} mt-2 text-[11px] uppercase tracking-[0.16em]`} style={{ color: FAINT }}>
                    {d.when}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed" style={{ color: DIM }}>
                    {d.does}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Part III ───────────────────────────────────────────── */}
        <section id="checklist" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part III. The list"
            title="Everything, in order"
            lede="Twelve items. The right-hand column is what it costs you to skip it, which is the only reason any of them are worth doing today rather than eventually."
          />

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className={`${mono} text-[11px] uppercase tracking-[0.16em]`} style={{ color: FAINT }}>
                  <th className="border-b py-3 pr-4 font-normal" style={{ borderColor: RULE }}>Do this</th>
                  <th className="border-b py-3 pr-4 font-normal" style={{ borderColor: RULE }}>When</th>
                  <th className="border-b py-3 font-normal" style={{ borderColor: RULE }}>If you skip it</th>
                </tr>
              </thead>
              <tbody>
                {FULL_CHECKLIST.map((c) => (
                  <tr key={c.item} className="align-top">
                    <td
                      className="border-b py-4 pr-4 text-[15px]"
                      style={{ borderColor: RULE_SOFT, color: PAPER }}
                    >
                      {c.item}
                    </td>
                    <td
                      className={`${mono} border-b py-4 pr-4 text-[12px] uppercase tracking-[0.14em]`}
                      style={{ borderColor: RULE_SOFT, color: FAINT }}
                    >
                      {c.when}
                    </td>
                    <td
                      className="border-b py-4 text-[14px] leading-relaxed"
                      style={{ borderColor: RULE_SOFT, color: DIM }}
                    >
                      {c.skipCost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Part IV ────────────────────────────────────────────── */}
        <section id="mistakes" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part IV. The five"
            title="How people get this wrong"
            lede="Every one of these looks like it worked at the time. That is what makes them expensive."
            color={ENERGY}
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {MISTAKES.map((m, i) => (
              <article key={m.t} className="border-t pt-5" style={{ borderColor: RULE_SOFT }}>
                <div className="flex items-baseline gap-3">
                  <span className={`${mono} text-[12px]`} style={{ color: ENERGY }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`${serif} text-xl font-bold`} style={{ color: PAPER }}>
                    {m.t}
                  </h3>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: DIM }}>
                  {m.d}
                </p>
              </article>
            ))}
          </div>

          {/* Honesty beat */}
          <div className="mt-12 border-l-2 py-2 pl-6" style={{ borderColor: FAINT }}>
            <Kicker color={FAINT}>While we&rsquo;re being honest</Kicker>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              {CONFESSION}
            </p>
          </div>
        </section>

        {/* ── Onward ─────────────────────────────────────────────── */}
        <section className="mt-20 border-t pt-10" style={{ borderColor: RULE }}>
          <Kicker color={FAINT}>Next</Kicker>
          <h2 className={`${serif} mt-4 text-3xl font-bold sm:text-4xl`} style={{ color: PAPER }}>
            The domain is the address.
            <br />
            <span style={{ color: PROMPT }}>Now pick what runs behind it.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            Nine jobs every app has, and what to run for each one: the starter stack, the self
            hosted version, and what it becomes at 10,000 users. Including which email tool goes
            on the subdomains you just made.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/stacks"
              className={`${mono} inline-block border px-6 py-3 text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-white/5`}
              style={{ borderColor: RULE, color: PAPER }}
            >
              Read: the stacks →
            </Link>
            <Link
              href="/scratch"
              className={`${mono} inline-block border px-6 py-3 text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-white/5`}
              style={{ borderColor: RULE, color: DIM }}
            >
              Build it properly →
            </Link>
          </div>
        </section>
      </div>

      <div aria-hidden className="h-1 w-full" style={{ backgroundColor: "#7d312d" }} />
    </main>
  );
}
