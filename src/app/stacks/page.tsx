import type { Metadata } from "next";
import Link from "next/link";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import { CopyBlock } from "@/components/scratch/copy-block";
import {
  STACK_ROWS,
  STACK_GUIDES,
  SELF_HOST_RULE,
  SELF_HOST_YES,
  SELF_HOST_NO,
} from "./content";
import { Kicker, PROMPT, serif, mono } from "../scratch/ui";

/* Light mode. The shared tokens in scratch/ui are built for the ink
   ground, so this page carries its own palette rather than bending them
   and breaking every other page that imports them. */
const CLOUD = "#ededeb";
const CORE = "#1a1c12";
const CLAY = "#C98B7A";
const PAPER = CORE; // the ink colour on this page, not the ground
const DIM = "rgba(26,28,18,0.72)";
const FAINT = "rgba(26,28,18,0.52)";
const ENERGY = CLAY;
const RULE = "rgba(26,28,18,0.18)";
const RULE_SOFT = "rgba(26,28,18,0.10)";
const CELL = "#f4f4f2";

function SectionHead({
  part,
  title,
  lede,
  color,
}: {
  part: string;
  title: string;
  lede?: string;
  color?: string;
}) {
  return (
    <header className="space-y-4 border-t pt-6" style={{ borderColor: RULE }}>
      <Kicker color={color ?? CLAY}>{part}</Kicker>
      <h2 className={`${serif} text-3xl font-black leading-tight sm:text-4xl`} style={{ color: CORE }}>
        {title}
      </h2>
      {lede && (
        <p className="max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
          {lede}
        </p>
      )}
    </header>
  );
}

/**
 * /stacks. The companion to /scratch.
 *
 * Nine jobs, three answers. /scratch is about building the thing properly;
 * this is about what you run it on, and specifically about NOT migrating
 * before something forces you to. The guidance matters more than the table:
 * a reader who copies the scale column on day one has hurt themselves.
 */

export const metadata: Metadata = {
  title: "The stacks. Nine jobs, three answers",
  description:
    "The nine jobs every app has, and what to run for each one. Part 1 the starter stack, Part 2 what changes at 10,000 users, Part 3 the self hosted version. Plus when to move and when to stay put.",
  alternates: { canonical: "https://danielwelsh.design/stacks" },
  openGraph: {
    title: "The stacks. Nine jobs, three answers",
    description:
      "Part 1 starter, Part 2 at 10,000 users, Part 3 self hosted. Every swap, and the reason it happens.",
    url: "https://danielwelsh.design/stacks",
    type: "article",
  },
};

export default function StacksPage() {
  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: CLOUD }}>
      <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-16 sm:px-8 lg:px-10">
        {/* ── Masthead ───────────────────────────────────────────── */}
        <header>
          <Kicker color={ENERGY}>Daniel Welsh · the stacks</Kicker>
          <h1
            className={`${serif} mt-5 text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl`}
            style={{ color: PAPER }}
          >
            Nine jobs.
            <br />
            <span style={{ color: ENERGY }}>Three answers.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed" style={{ color: DIM }}>
            Every app does the same nine jobs. What changes is whether you rent the tool, own it,
            or get forced off it. Here are all three answers side by side, in the same order as the
            reels, and the honest note on each one about why it moves.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: FAINT }}>
            If you commented <span style={{ color: PROMPT }}>STACKS</span>, this is the page: the
            full answer on when a self hosted stack is worth it and when it quietly costs you more
            than it saves. Start with Part I.
          </p>

          <nav
            className={`${mono} mt-9 flex flex-wrap gap-x-5 gap-y-2 border-y py-3 text-[11px] uppercase tracking-[0.18em]`}
            style={{ borderColor: RULE }}
            aria-label="Contents"
          >
            <Link href="#should" className="transition-opacity hover:opacity-60" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>01 </span>Should you self host
            </Link>
            <Link href="#guide" className="transition-opacity hover:opacity-60" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>02 </span>Which stack
            </Link>
            <Link href="#table" className="transition-opacity hover:opacity-60" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>03 </span>The nine jobs
            </Link>
            <Link href="#docs" className="transition-opacity hover:opacity-60" style={{ color: DIM }}>
              <span style={{ color: FAINT }}>04 </span>The docs
            </Link>
            <Link href="/supabase-vs-neon" className="transition-opacity hover:opacity-60" style={{ color: PROMPT }}>
              Supabase or Neon →
            </Link>
            <Link href="/scratch" className="transition-opacity hover:opacity-60" style={{ color: PROMPT }}>
              ← Build it properly
            </Link>
          </nav>
        </header>

        {/* ── The answer the keyword promises ────────────────────── */}
        <section id="should" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part I. The short answer"
            title="Should you self host?"
            lede="If any single line on the right is true, stop there. It does not matter how many on the left are also true."
          />

          <div
            className="mt-8 border-l-2 py-2 pl-6"
            style={{ borderColor: ENERGY }}
          >
            <p className={`${serif} text-2xl leading-snug sm:text-[28px]`} style={{ color: PAPER }}>
              {SELF_HOST_RULE}
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <Kicker color={PROMPT}>Yes, if</Kicker>
              <ul className="mt-5 space-y-4">
                {SELF_HOST_YES.map((y) => (
                  <li key={y} className="flex gap-3 border-t pt-4" style={{ borderColor: RULE_SOFT }}>
                    <span className={`${mono} text-[12px]`} style={{ color: PROMPT }}>+</span>
                    <span className="text-[15px] leading-relaxed" style={{ color: DIM }}>{y}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Kicker color={ENERGY}>No, if</Kicker>
              <ul className="mt-5 space-y-4">
                {SELF_HOST_NO.map((n) => (
                  <li key={n} className="flex gap-3 border-t pt-4" style={{ borderColor: RULE_SOFT }}>
                    <span className={`${mono} text-[12px]`} style={{ color: ENERGY }}>&times;</span>
                    <span className="text-[15px] leading-relaxed" style={{ color: DIM }}>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Which stack are you on ─────────────────────────────── */}
        <section id="guide" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part II. Before you touch anything"
            title="Which stack are you on?"
            lede="Three answers, and you almost certainly want the first one. Read the catch before the cost."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {STACK_GUIDES.map((g, i) => (
              <article
                key={g.title}
                className="flex flex-col border-t pt-6"
                style={{ borderColor: i === 0 ? ENERGY : RULE_SOFT }}
              >
                <Kicker color={i === 0 ? ENERGY : FAINT}>{g.part}</Kicker>
                <h3 className={`${serif} mt-3 text-2xl font-bold`} style={{ color: PAPER }}>
                  {g.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: DIM }}>
                  <span style={{ color: PROMPT }}>When: </span>
                  {g.when}
                </p>
                <p className={`${mono} mt-3 text-[12px] uppercase tracking-[0.16em]`} style={{ color: FAINT }}>
                  {g.cost}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed" style={{ color: DIM }}>
                  <span style={{ color: ENERGY }}>The catch: </span>
                  {g.catch}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── The nine ───────────────────────────────────────────── */}
        <section id="table" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part III. The table"
            title="The nine jobs"
            lede="The job numbers never change. Only the answer under them does. Where a cell says stays, that is the answer, not a gap."
          />

          {/* One card per job rather than a four-column table. The table
              worked on paper and not on a screen: the note column pushed
              the three answers into a thin strip on the right, so the
              thing people actually came for was the hardest part to read.
              Here each job owns a block and the three answers sit in a
              row of equal cells, labelled with the part number of the
              reel they came from. */}
          <div className="mt-8 space-y-3">
            {STACK_ROWS.map((r) => {
              const cells = [
                { part: "Part 1", label: "Starter", value: r.starter },
                { part: "Part 2", label: "At 10,000", value: r.scale },
                { part: "Part 3", label: "Self hosted", value: r.selfHosted },
              ];
              return (
                <article
                  key={r.n}
                  className="border-t pt-6"
                  style={{ borderColor: RULE_SOFT }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className={`${mono} text-[12px]`} style={{ color: ENERGY }}>
                      {String(r.n).padStart(2, "0")}
                    </span>
                    <h3 className={`${serif} text-2xl font-bold`} style={{ color: PAPER }}>
                      {r.job}
                    </h3>
                  </div>

                  <div className="mt-5 grid gap-px sm:grid-cols-3" style={{ backgroundColor: RULE }}>
                    {cells.map((c) => {
                      const stays = typeof c.value === "string" && c.value.endsWith("stays");
                      return (
                        <div
                          key={c.label}
                          className="px-4 py-4"
                          style={{ backgroundColor: CELL }}
                        >
                          <div
                            className={`${mono} flex items-baseline gap-2 text-[10px] uppercase tracking-[0.16em]`}
                            style={{ color: FAINT }}
                          >
                            <span style={{ color: PROMPT }}>{c.part}</span>
                            <span>{c.label}</span>
                          </div>
                          <div
                            className="mt-2 text-[17px] leading-snug"
                            style={{
                              color: c.value === null ? ENERGY : stays ? FAINT : PAPER,
                            }}
                          >
                            {c.value ?? "don’t"}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-4 max-w-3xl text-[14px] leading-relaxed" style={{ color: DIM }}>
                    {r.note}
                  </p>
                </article>
              );
            })}
          </div>

          <p className="mt-6 max-w-2xl text-[14px] leading-relaxed" style={{ color: FAINT }}>
            Three rows never move: Stripe, and at scale Claude and ElevenLabs. Nobody self hosts
            card processing, and the two tools people argue hardest about are the two nobody
            actually leaves.
          </p>

          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            Row 01 is the one everybody argues about, so it has a page of its own:{" "}
            <Link
              href="/supabase-vs-neon"
              className="underline underline-offset-4 transition-opacity hover:opacity-60"
              style={{ color: PROMPT }}
            >
              Supabase or Neon, and why it&rsquo;s usually the wrong question →
            </Link>
          </p>
        </section>

        {/* ── The docs ───────────────────────────────────────────── */}
        <section id="docs" className="mt-20 scroll-mt-10">
          <SectionHead
            part="Part IV. Going deeper"
            title="The docs"
            lede="Every claim above has a source. These are the ones worth your time before you move anything."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Supabase, self hosted",
                d: "The official Docker compose stack. This is the whole of row 01.",
                h: "https://supabase.com/docs/guides/self-hosting/docker",
              },
              {
                t: "Coolify",
                d: "Rows 03 and 04 collapsed into one box. Preview deploys included.",
                h: "https://coolify.io/docs",
              },
              {
                t: "Ollama",
                d: "Row 02. Pull an open coding model and point your editor at localhost.",
                h: "https://ollama.com/",
              },
              {
                t: "Kokoro",
                d: "Row 06. 82M params, Apache 2.0, runs on a CPU.",
                h: "https://huggingface.co/hexgrad/Kokoro-82M",
              },
              {
                t: "GlitchTip",
                d: "Row 08. Sentry compatible, so the migration is swapping a DSN.",
                h: "https://glitchtip.com/documentation",
              },
              {
                t: "OpenReplay",
                d: "Row 09. PostHog themselves publish why self hosting rarely pays.",
                h: "https://docs.openreplay.com/",
              },
            ].map((d) => (
              <a
                key={d.t}
                href={d.h}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-t pt-5 transition-colors"
                style={{ borderColor: RULE_SOFT }}
              >
                <h3
                  className={`${serif} text-xl font-bold transition-opacity group-hover:opacity-60`}
                  style={{ color: PAPER }}
                >
                  {d.t} <span style={{ color: PROMPT }}>↗</span>
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: DIM }}>
                  {d.d}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ── Back to scratch ────────────────────────────────────── */}
        <section
          className="mt-20 border-t pt-10"
          style={{ borderColor: RULE }}
        >
          <Kicker color={FAINT}>The other half</Kicker>
          <h2 className={`${serif} mt-4 text-3xl font-bold sm:text-4xl`} style={{ color: PAPER }}>
            This page is what you run it on.
            <br />
            <span style={{ color: PROMPT }}>The other one is how to build it.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            Picking the right stack will not save an app with secrets in the repo, a 2,500-line
            file and one commit called “updates”. That is the other page: the five mistakes, the
            two repos side by side, and the six stages.
          </p>
          <Link
            href="/scratch"
            className={`${mono} mt-7 inline-block border px-6 py-3 text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-white/5`}
            style={{ borderColor: RULE, color: PAPER }}
          >
            Read: build it properly →
          </Link>
        </section>

        {/* ── The skill ──────────────────────────────────────────
            The table answers "what are the options". It cannot answer
            "which column am I in", because that needs two questions about
            their situation. The skill asks them, then refuses most of the
            swaps, which is the actual advice on this page. */}
        <section className="mt-20 border-t pt-10" style={{ borderColor: RULE }}>
          <Kicker>Not sure which column you are in?</Kicker>
          <h2 className={`${serif} mt-4 text-3xl font-bold sm:text-4xl`} style={{ color: PAPER }}>
            Let it ask you two questions.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            A skill that places you in a column, names the swaps with a real forcing function
            behind them, and talks you out of the rest. Most people should be in column one and
            are being argued out of it by comment sections.
          </p>
          <div className="mt-7 max-w-2xl space-y-3">
            <CopyBlock
              tone="light"
              id="pick-a-stack-install"
              filename="install it, once"
              body={`mkdir -p ~/.claude/skills/pick-a-stack && curl -fsSL https://danielwelsh.design/skills/pick-a-stack/SKILL.md -o ~/.claude/skills/pick-a-stack/SKILL.md`}
            />
            <CopyBlock
              tone="light"
              id="pick-a-stack-say"
              filename="then say this to Claude Code"
              body={`what stack should I use?`}
            />
          </div>
          <a
            href="/skills/pick-a-stack/SKILL.md"
            className={`${mono} mt-5 inline-block border-b text-[12px] uppercase tracking-[0.18em] transition-colors hover:opacity-70`}
            style={{ borderColor: PROMPT, color: PROMPT }}
          >
            read it first · SKILL.md
          </a>
        </section>

        {/* ── Capture ─────────────────────────────────────────────
            Inline, at the end, on top of the site-wide slide-in. On the
            measured numbers to 2026-08-12 the inline form on /scratch
            earned two signups to the hook's one, so the page that has
            both is the page that converts best. Source "stacks" keeps it
            attributable per magnet. */}
        <section className="mt-16 border-t pt-10" style={{ borderColor: RULE }}>
          <Kicker>Get the next one</Kicker>
          <h2 className={`${serif} mt-4 text-3xl font-bold sm:text-4xl`} style={{ color: PAPER }}>
            Nine more jobs are coming.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            Every stack gets the same treatment: what it costs at ten users, what it costs at
            ten thousand, and the one that forces the swap. One email per drop, nothing between.
          </p>
          <div className="mt-6 max-w-md">
            <ScratchSubscribe
              tone="light"
              source="stacks"
              cta="send me the next stack"
              done="Done. The next stack lands in your inbox."
            />
          </div>
        </section>
      </div>

      <div aria-hidden className="h-1 w-full" style={{ backgroundColor: CLAY }} />
    </main>
  );
}
