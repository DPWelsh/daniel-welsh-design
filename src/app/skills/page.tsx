import type { Metadata } from "next";
import { CopyBlock } from "@/components/scratch/copy-block";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import {
  DIM,
  FAINT,
  GRAIN,
  INDIGO,
  Kicker,
  PAPER,
  PROMPT,
  RULE,
  RULE_SOFT,
  mono,
  serif,
} from "../scratch/ui";

export const metadata: Metadata = {
  title: "The Skill Library. Downloadable Claude Code Skills",
  description:
    "The skills I actually run: guided first build, brand enforcement, pre-launch ship checks, the app-difficulty ladder, plain-English writing, and ADHD focus & shutdown rituals. One command installs any of them.",
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "The Skill Library. Skills I actually run",
    description:
      "Build, write, and focus skills for Claude Code. One command each.",
    url: "https://danielwelsh.design/skills",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

const INK = "#161613";

type SkillEntry = {
  slug: string;
  name: string;
  what: string;
  say: string;
};

const GROUPS: { title: string; lede: string; skills: SkillEntry[] }[] = [
  {
    title: "Build",
    lede: "The software half. From first site to safe to ship.",
    skills: [
      {
        slug: "day-zero",
        name: "day-zero",
        what: "The guided first build. Ushers a complete beginner from empty folder to a live URL. One step at a time, asking before each next step.",
        say: "build my first site",
      },
      {
        slug: "ship-check",
        name: "ship-check",
        what: "Pre-flight before anyone else touches the app. The three checks every app needs, plus the extra locks for logins, money, and AI. Ends in SHIP or a blocker list.",
        say: "am I ready to ship?",
      },
      {
        slug: "ladder-check",
        name: "ladder-check",
        what: "Places any app idea on the 7-rung difficulty ladder: the honest time shape, cost shape, the invisible work the demo hides. And the weekend-sized version of the same idea.",
        say: "how hard is this to build?",
      },
      {
        slug: "pick-a-stack",
        name: "pick-a-stack",
        what: "Places you in one of three columns for nine infrastructure jobs, names the swaps that have a real forcing function behind them, and talks you out of the rest. Most people should be on the starter stack and are being argued out of it by comment sections.",
        say: "what stack should I use?",
      },
      {
        slug: "remake-a-site",
        name: "remake-a-site",
        what: "Rung one, end to end. Learn the layout of a site you admire, then fill it with words and pictures that are yours. Runs the auth, repo, crawl, deploy and domain silently, and stops six times to make you decide the parts worth learning.",
        say: "remake taylorswift.com as my artist site",
      },
      {
        slug: "site-crawl",
        name: "site-crawl",
        what: "Turns a site you admire into a design brief. Captures one page of every template (including the about and legal pages a page limit silently drops), the real hex values and fonts read from CSS with contrast already measured, and all media including the video hero that markdown makes invisible.",
        say: "crawl this site",
      },
    ],
  },
  {
    title: "Design",
    lede: "The looks half. Brand and type, applied like an engineer.",
    skills: [
      {
        slug: "use-my-brand",
        name: "use-my-brand",
        what: "Fetches the brand kit and applies it exactly. Palette, type system, real logo SVGs, naming rules. No freestyling.",
        say: "use my brand",
      },
      {
        slug: "publish-brand-kit",
        name: "publish-brand-kit",
        what: "Turns locked brand decisions into the two-reader kit. A human page with live specimens and a machine-readable BRAND.md that never drift apart. Then sweeps the codebase for violations. Includes the self-violation checks and the enforcement grep.",
        say: "publish my brand kit",
      },
      {
        slug: "font-match",
        name: "font-match",
        what: "Figures out a type system from who YOU are. Proposes 2–3 named identities, renders them as a live specimen using your own words, links where to get every font free, then iterates by dials (techier, warmer, louder) until it locks.",
        say: "figure out a font group for me",
      },
    ],
  },
  {
    title: "Write",
    lede: "The words half.",
    skills: [
      {
        slug: "plain-english",
        name: "plain-english",
        what: "The 12-year-old test, enforced. Every piece of jargon swapped for a plainer, MORE vivid replacement. With the canonical swap table.",
        say: "make this plain english",
      },
    ],
  },
  {
    title: "Focus",
    lede: "The brain half. Written for ADHD; useful for everyone.",
    skills: [
      {
        slug: "adhd-focus",
        name: "adhd-focus",
        what: "A body double for work blocks. One named task, a two-minute start, a hard timebox, a parking lot for every stray thought, and a no-shame restart when attention slips.",
        say: "help me focus",
      },
      {
        slug: "adhd-shutdown",
        name: "adhd-shutdown",
        what: "The end-of-day ritual. Dump every open loop, sort once, park tomorrow's first move, name the wins, say the words. The brain releases what's been captured.",
        say: "shutdown",
      },
    ],
  },
];

const ALL_SLUGS = GROUPS.flatMap((g) => g.skills.map((s) => s.slug));

const INSTALL_ALL = `for s in ${ALL_SLUGS.join(" ")}; do mkdir -p ~/.claude/skills/$s && curl -fsSL https://danielwelsh.design/skills/$s/SKILL.md -o ~/.claude/skills/$s/SKILL.md; done`;

const installOne = (slug: string) =>
  `mkdir -p ~/.claude/skills/${slug} && curl -fsSL https://danielwelsh.design/skills/${slug}/SKILL.md -o ~/.claude/skills/${slug}/SKILL.md`;

export default function SkillsPage() {
  return (
    <main
      className="relative min-h-screen overflow-x-clip antialiased selection:bg-[#7ba2e0] selection:text-[#161613]"
      style={{ background: INK, color: PAPER }}
    >
      <style>{`
        @keyframes sk-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .sk-rise { animation: sk-rise 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .sk-rise { animation: none; } }
      `}</style>

      {/* grain + glow */}
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
        {/* ── Masthead ──────────────────────────────────────── */}
        <header className="pt-10">
          <div
            className={`${mono} sk-rise flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b pb-3 text-[10px] uppercase tracking-[0.25em]`}
            style={{ borderColor: RULE, color: FAINT }}
          >
            <span>Daniel Welsh · The Skill Library</span>
            <span>{ALL_SLUGS.length} skills · free</span>
          </div>

          <div className="pt-12 sm:pt-16">
            <Kicker>Skills I actually run</Kicker>
            <h1
              className={`${serif} sk-rise mt-4 text-6xl font-black leading-[0.95] tracking-tight sm:text-8xl`}
              style={{ animationDelay: "0.08s" }}
            >
              The skill{" "}
              <em className="not-italic" style={{ color: PROMPT }}>
                library.
              </em>
            </h1>
            <p
              className="sk-rise mt-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: DIM, animationDelay: "0.16s" }}
            >
              A skill is a set of instructions Claude follows, written in
              plain English. You can read every one before installing it.
              Drop one in, then just say the trigger phrase in Claude Code.
            </p>

            <div className="sk-rise mt-8" style={{ animationDelay: "0.24s" }}>
              <CopyBlock
                id="skills-install-all"
                filename="install all of them. One paste, in Terminal"
                body={INSTALL_ALL}
              />
            </div>
          </div>
        </header>

        {/* ── Groups ────────────────────────────────────────── */}
        {GROUPS.map((g) => (
          <section key={g.title} className="mt-16 sm:mt-20">
            <header className="border-t pt-6" style={{ borderColor: RULE }}>
              <Kicker>{g.title}</Kicker>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
                {g.lede}
              </p>
            </header>
            <ul className="mt-2">
              {g.skills.map((s) => (
                <li key={s.slug} className="border-b py-6" style={{ borderColor: RULE_SOFT }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className={`${mono} text-[15px] font-bold`} style={{ color: PAPER }}>
                      {s.name}
                    </h3>
                    <span className={`${mono} text-[10px] uppercase tracking-[0.15em]`} style={{ color: FAINT }}>
                      say: “{s.say}”
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-[14px] leading-relaxed" style={{ color: DIM }}>
                    {s.what}
                  </p>
                  <div className="mt-4">
                    <CopyBlock id={`skill-${s.slug}`} filename={`install ${s.name}`} body={installOne(s.slug)} />
                  </div>
                  <p className={`${mono} mt-2 text-[11px]`} style={{ color: FAINT }}>
                    <a
                      href={`/skills/${s.slug}/SKILL.md`}
                      className="underline underline-offset-4"
                      style={{ color: PROMPT }}
                    >
                      read it first. SKILL.md
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* ── How it works ──────────────────────────────────── */}
        <section className="mt-16 sm:mt-20">
          <header className="border-t pt-6" style={{ borderColor: RULE }}>
            <Kicker>How skills work</Kicker>
          </header>
          <ol className="mt-4 space-y-2 text-[14px] leading-relaxed" style={{ color: DIM }}>
            <li>
              <span className={`${mono} text-[11px] font-bold`} style={{ color: PROMPT }}>1 · </span>
              The install command puts a plain-English instruction file in{" "}
              <code className={`${mono} text-[12px]`}>~/.claude/skills/</code>.
            </li>
            <li>
              <span className={`${mono} text-[11px] font-bold`} style={{ color: PROMPT }}>2 · </span>
              Claude Code reads that folder when it starts.
            </li>
            <li>
              <span className={`${mono} text-[11px] font-bold`} style={{ color: PROMPT }}>3 · </span>
              Say the trigger phrase. Claude loads the skill and follows it.
              No restart, no config.
            </li>
          </ol>
          <p className={`${mono} mt-6 text-[11px] uppercase tracking-[0.25em]`} style={{ color: FAINT }}>
            New computer? Start at{" "}
            <a href="/get-started" className="underline underline-offset-4" style={{ color: PROMPT }}>
              /get-started
            </a>{" "}.
           The setup script installs day-zero for you.
          </p>
        </section>

        {/* ── Subscribe ─────────────────────────────────────── */}
        <section className="mt-16 sm:mt-20">
          <div className="border-t pt-8" style={{ borderColor: RULE }}>
            <p className="max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
              New skills land here first. Add your email to get them.
            </p>
            <div className="mt-4">
              <ScratchSubscribe source="skills" cta="send them" done="You're in." />
            </div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────── */}
        <footer
          className={`${mono} mt-20 flex flex-wrap items-center justify-between gap-2 border-t pt-6 text-[10px] uppercase tracking-[0.25em]`}
          style={{ borderColor: RULE, color: FAINT }}
        >
          <span>danielwelsh.design</span>
          <span>read every skill before you install it</span>
        </footer>
      </div>
    </main>
  );
}
