import type { Metadata } from "next";
import Link from "next/link";
import {
  RULE,
  CATEGORY,
  ROWS,
  MOVE_YES,
  MOVE_NO,
  STILL_HERE,
  MIGRATION_TRUTH,
} from "./content";
import {
  Kicker,
  SectionHead,
  PAPER,
  DIM,
  FAINT,
  ENERGY,
  PROMPT,
  RULE as RULE_COLOR,
  RULE_SOFT,
  serif,
  mono,
  GRAIN,
} from "../scratch/ui";

/**
 * /supabase-vs-neon. The comparison people ask for.
 *
 * The page's argument is that it is usually the wrong question: these are
 * different categories, and "should I move" is really "do I still need the
 * bundle". The counter-example at the end is the honest part. Real
 * production numbers on Supabase, with the reason to move not yet arrived.
 */

export const metadata: Metadata = {
  title: "Supabase or Neon. And why it's usually the wrong question",
  description:
    "One is a backend, the other is a database. What each actually gives you, what a migration really costs (it is never the data), and the honest counter-example: 746,155 production rows still on Supabase.",
  alternates: { canonical: "https://danielwelsh.design/supabase-vs-neon" },
  openGraph: {
    title: "Supabase or Neon. Usually the wrong question",
    description:
      "The data moves in an afternoon. The auth does not. What the migration actually costs.",
    url: "https://danielwelsh.design/supabase-vs-neon",
    type: "article",
  },
};

export default function SupabaseVsNeonPage() {
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
          <Kicker color={ENERGY}>Daniel Welsh · one job, two tools</Kicker>
          <h1
            className={`${serif} mt-5 text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl`}
            style={{ color: PAPER }}
          >
            Supabase or Neon?
            <br />
            <span style={{ color: ENERGY }}>Wrong question.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed" style={{ color: DIM }}>
            One is a backend. The other is a database. Almost every &ldquo;should I move to
            Neon&rdquo; is really &ldquo;do I still need the bundle&rdquo;, and that has a
            different answer, a different cost, and a different day to ask it.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: FAINT }}>
            Written on production numbers, not benchmarks. No pricing on this page on purpose:
            it changes every quarter, the architecture doesn&rsquo;t.
          </p>

          <nav
            className={`${mono} mt-9 flex flex-wrap gap-x-5 gap-y-2 border-y py-3 text-[11px] uppercase tracking-[0.18em]`}
            style={{ borderColor: RULE_COLOR }}
            aria-label="Contents"
          >
            <Link href="#answer" className="transition-colors hover:text-white" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>01 </span>The short answer
            </Link>
            <Link href="#table" className="transition-colors hover:text-white" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>02 </span>Side by side
            </Link>
            <Link href="#cost" className="transition-colors hover:text-white" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>03 </span>What moving costs
            </Link>
            <Link href="#still" className="transition-colors hover:text-white" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>04 </span>Still here
            </Link>
            <Link href="/stacks" className="transition-colors hover:text-white" style={{ color: PROMPT }}>
              → The stacks
            </Link>
          </nav>
        </header>

        {/* ── Part I ─────────────────────────────────────────────── */}
        <section id="answer" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part I. The short answer"
            title="They are not the same category"
            lede="Comparing them like for like is the mistake. Read what each one actually is first, then the question answers itself."
          />

          <div className="mt-8 border-l-2 py-2 pl-6" style={{ borderColor: ENERGY }}>
            <p className={`${serif} text-2xl leading-snug sm:text-[28px]`} style={{ color: PAPER }}>
              {RULE}
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <article className="border-t pt-6" style={{ borderColor: RULE_SOFT }}>
              <Kicker color={PROMPT}>Supabase</Kicker>
              <h3 className={`${serif} mt-3 text-3xl font-black`} style={{ color: PAPER }}>
                A backend
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: DIM }}>
                {CATEGORY.supabase}
              </p>
            </article>
            <article className="border-t pt-6" style={{ borderColor: RULE_SOFT }}>
              <Kicker color={ENERGY}>Neon</Kicker>
              <h3 className={`${serif} mt-3 text-3xl font-black`} style={{ color: PAPER }}>
                A database
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: DIM }}>
                {CATEGORY.neon}
              </p>
            </article>
          </div>
        </section>

        {/* ── Part II ────────────────────────────────────────────── */}
        <section id="table" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part II. Side by side"
            title="Nine dimensions"
            lede="The right-hand column is the one that matters. It says who each row actually favours, and why."
          />

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className={`${mono} text-[11px] uppercase tracking-[0.16em]`} style={{ color: FAINT }}>
                  <th className="border-b py-3 pr-4 font-normal" style={{ borderColor: RULE_COLOR }}>Dimension</th>
                  <th className="border-b py-3 pr-4 font-normal" style={{ borderColor: RULE_COLOR }}>Supabase</th>
                  <th className="border-b py-3 pr-4 font-normal" style={{ borderColor: RULE_COLOR }}>Neon</th>
                  <th className="border-b py-3 font-normal" style={{ borderColor: RULE_COLOR }}>The line</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.n} className="align-top">
                    <td className="border-b py-4 pr-4" style={{ borderColor: RULE_SOFT }}>
                      <span className={`${mono} text-[12px]`} style={{ color: FAINT }}>
                        {String(r.n).padStart(2, "0")}
                      </span>
                      <span className="ml-2 text-[15px]" style={{ color: PAPER }}>{r.dim}</span>
                    </td>
                    <td className="border-b py-4 pr-4 text-[14px]" style={{ borderColor: RULE_SOFT, color: PROMPT }}>
                      {r.supabase}
                    </td>
                    <td className="border-b py-4 pr-4 text-[14px]" style={{ borderColor: RULE_SOFT, color: ENERGY }}>
                      {r.neon}
                    </td>
                    <td className="border-b py-4 text-[14px] leading-relaxed" style={{ borderColor: RULE_SOFT, color: DIM }}>
                      {r.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Part III ───────────────────────────────────────────── */}
        <section id="cost" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part III. The real bill"
            title="It was never the data"
            lede="Both are Postgres, which is exactly why people underestimate this. Here is what actually has to move."
            color={ENERGY}
          />

          <ol className="mt-8 space-y-6">
            {MIGRATION_TRUTH.map((m, i) => (
              <li key={m.t} className="flex gap-5 border-t pt-5" style={{ borderColor: RULE_SOFT }}>
                <span className={`${mono} shrink-0 text-[13px]`} style={{ color: i === 0 ? PROMPT : ENERGY }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={`${serif} text-xl font-bold`} style={{ color: PAPER }}>{m.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: DIM }}>{m.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <Kicker color={PROMPT}>Move, if</Kicker>
              <ul className="mt-5 space-y-4">
                {MOVE_YES.map((y) => (
                  <li key={y} className="flex gap-3 border-t pt-4" style={{ borderColor: RULE_SOFT }}>
                    <span className={`${mono} text-[12px]`} style={{ color: PROMPT }}>+</span>
                    <span className="text-[15px] leading-relaxed" style={{ color: DIM }}>{y}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Kicker color={ENERGY}>Stay, if</Kicker>
              <ul className="mt-5 space-y-4">
                {MOVE_NO.map((n) => (
                  <li key={n} className="flex gap-3 border-t pt-4" style={{ borderColor: RULE_SOFT }}>
                    <span className={`${mono} text-[12px]`} style={{ color: ENERGY }}>&times;</span>
                    <span className="text-[15px] leading-relaxed" style={{ color: DIM }}>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Part IV ────────────────────────────────────────────── */}
        <section id="still" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part IV. The counter-example"
            title="Still on Supabase"
            lede={STILL_HERE.lede}
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {STILL_HERE.stats.map((s) => (
              <div key={s.l} className="border-t pt-5" style={{ borderColor: RULE_SOFT }}>
                <p className={`${serif} text-4xl font-black sm:text-5xl`} style={{ color: PAPER }}>
                  {s.n}
                </p>
                <p className={`${mono} mt-2 text-[12px] uppercase tracking-[0.16em]`} style={{ color: FAINT }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-9 max-w-2xl text-[16px] leading-relaxed" style={{ color: DIM }}>
            {STILL_HERE.kicker}
          </p>
        </section>

        {/* ── Onward ─────────────────────────────────────────────── */}
        <section className="mt-20 border-t pt-10" style={{ borderColor: RULE_COLOR }}>
          <Kicker color={FAINT}>Keep going</Kicker>
          <h2 className={`${serif} mt-4 text-3xl font-bold sm:text-4xl`} style={{ color: PAPER }}>
            This is one row of the table.
            <br />
            <span style={{ color: PROMPT }}>There are eight more.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            Database is job one of nine. The same &ldquo;rent it, own it, or outgrow it&rdquo;
            question applies to the other eight, and the answer is usually the boring one.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/stacks"
              className={`${mono} inline-block border px-6 py-3 text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-white/5`}
              style={{ borderColor: RULE_COLOR, color: PAPER }}
            >
              The nine jobs →
            </Link>
            <Link
              href="/scratch"
              className={`${mono} inline-block border px-6 py-3 text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-white/5`}
              style={{ borderColor: RULE_COLOR, color: DIM }}
            >
              Build it properly →
            </Link>
            <Link
              href="/domain"
              className={`${mono} inline-block border px-6 py-3 text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-white/5`}
              style={{ borderColor: RULE_COLOR, color: DIM }}
            >
              Domain day →
            </Link>
          </div>
        </section>
      </div>

      <div aria-hidden className="h-1 w-full" style={{ backgroundColor: "#7d312d" }} />
    </main>
  );
}
