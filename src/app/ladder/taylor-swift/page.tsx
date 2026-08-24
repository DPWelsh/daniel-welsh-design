import Link from "next/link";
import { siClaude, siGithub, siVercel } from "simple-icons";
import { CopyBlock } from "@/components/scratch/copy-block";
import {
  AFTER,
  AUTOMATED,
  COSTS,
  COST_LESSON,
  COST_NOTE,
  COST_TOTAL,
  DIFFICULTY,
  HONEST_FILTER,
  HOW_LONG,
  HOW_LONG_WARNING,
  LEDE,
  NOT_COVERED,
  PREREQ,
  SKILL_INSTALL,
  SKILL_SAY,
  STOPS,
  STRAIGHT_TALK,
  TOOLS,
  TOOLS_LEDE,
  TOOLS_TITLE,
  TRAPS,
} from "./content";
import { DIM, ENERGY, FAINT, PAPER, PROMPT, RULE, RULE_SOFT, mono, serif } from "../../scratch/ui";

/**
 * /ladder/taylor-swift, rung one.
 *
 * This was an eleven-step stepper console you pasted eleven prompts out
 * of. That is now one skill, so the page went back to being a page: it
 * makes the case, prices it honestly, and hands over two lines to copy.
 *
 * Which means it is a server component again. Nothing here needs state,
 * so nothing here ships JavaScript except CopyBlock's copy button.
 */

/**
 * Real marks for the three that ship an accurate path in simple-icons,
 * already a dependency. Firecrawl and Higgsfield are not in that set and
 * are NOT drawn from memory: guessing at somebody's trademark is how you
 * ship a wrong logo. They get a lettermark until the real SVG exists in
 * public/logos/.
 *
 * Everything renders in currentColor rather than brand hex, because
 * GitHub (#181717) and Vercel (#000000) are invisible on this ground.
 */
const MARKS: Record<string, { path: string; title: string; viewBox?: string }> = {
  "Claude Code": siClaude,
  GitHub: siGithub,
  Vercel: siVercel,
  // From content/product-logos/firecrawl-logomark.svg, the flame off
  // firecrawl.dev/logo.svg. Ships as #FA5D19; rendered in currentColor
  // here so all five marks read as one set.
  Firecrawl: {
    title: "Firecrawl",
    viewBox: "0 0 200 284",
    path: "M166.862 90.7716C155.812 94.0514 147.483 101.471 141.383 109.53C140.073 111.26 137.343 109.96 137.863 107.841C149.543 59.8136 134.113 19.896 86.0157 0.247269C83.5758 -0.752669 81.0359 1.43719 81.6759 3.99704C103.555 91.8416 11.5294 84.432 23.1588 184.016C23.3588 185.726 21.4389 186.896 20.039 185.896C15.6792 182.766 10.8095 176.236 7.46963 171.647C6.48968 170.297 4.36978 170.677 3.9198 172.287C1.25994 181.906 0 190.965 0 199.965C0 234.963 17.9891 265.771 45.2177 283.63C46.7777 284.65 48.7776 283.19 48.2476 281.4C46.8477 276.7 46.0577 271.74 45.9977 266.611C45.9977 263.461 46.1977 260.241 46.6877 257.241C47.8276 249.702 50.4475 242.522 54.8473 235.983C69.9365 213.334 100.185 191.455 95.3552 161.747C95.0453 159.867 97.2651 158.627 98.6651 159.917C119.974 179.386 124.194 205.575 120.694 229.063C120.394 231.103 122.954 232.193 124.244 230.593C127.504 226.513 131.483 222.933 135.813 220.244C136.893 219.574 138.333 220.084 138.743 221.284C141.153 228.293 144.733 234.873 148.113 241.452C152.152 249.362 154.302 258.391 153.962 267.951C153.792 272.6 153.022 277.1 151.732 281.38C151.182 283.19 153.162 284.7 154.752 283.66C182.001 265.801 200 234.993 200 199.975C200 187.806 197.87 175.876 193.84 164.697C185.391 141.248 163.952 123.64 169.372 93.0815C169.632 91.6216 168.282 90.3517 166.862 90.7716Z",
  },
  // From content/product-logos/higgsfield-logomark.svg, which is a single
  // path on a 20x20 box and already uses currentColor.
  Higgsfield: {
    title: "Higgsfield",
    viewBox: "0 0 20 20",
    path: "M18.3498 9.83713L18.3339 9.65759C18.1831 7.93447 17.0963 4.69261 14.0816 4.69261C11.8445 4.69261 10.1545 6.97097 8.66311 8.97967C7.47302 10.5883 6.4419 11.9683 5.3073 11.9683C5.00574 11.9357 4.61708 11.7805 4.3792 11.4294C4.16497 11.1108 4.10948 10.7026 4.22046 10.2126C4.39489 9.43684 5.39463 8.7182 6.44963 7.95063C7.02864 7.54238 7.6238 7.10955 8.03634 6.69311C9.22643 5.5091 9.82932 4.65164 9.82932 3.2717C9.82932 1.89176 9.09157 1.20565 8.47276 0.911636C7.23514 0.323844 5.41851 0.666781 4.26026 1.69583C4.08583 1.85922 3.91117 2.01418 3.75243 2.16119C2.58622 3.23097 1.80094 3.95781 0 3.40232V5.63972C2.38791 6.72588 4.39512 4.65164 5.15675 3.69633C5.74372 3.06758 6.36253 2.70006 6.82283 2.70006H6.84671C7.05298 2.70825 7.22741 2.78995 7.35454 2.93696C7.56081 3.18204 7.64018 3.46786 7.60038 3.78622C7.51305 4.45594 6.83875 5.23967 5.60113 6.09713C4.14928 7.10159 1.7218 8.78374 1.53122 10.8987C1.3884 12.4177 2.15003 13.9365 3.34012 14.5243C6.11669 15.8798 7.80665 13.5444 9.5994 11.0783C10.9719 9.1756 12.273 7.37103 14.0818 7.37103C15.7081 7.37103 16.311 8.75916 16.311 9.63301V9.80459L16.1523 9.83713C12.2095 10.5558 10.0595 14.3611 10.0595 16.1167C10.0595 17.8724 11.5034 19.375 13.2804 19.375C15.359 19.375 17.9293 17.5458 18.3419 12.4013L18.3578 12.2136H20V9.83737H18.3498V9.83713ZM16.1998 12.4746C15.8826 15.5531 14.3513 16.9904 13.4232 16.9904C13.0027 16.9904 12.4158 16.631 12.4158 15.9615C12.4158 15.2104 13.5026 12.932 15.946 12.2543L16.2316 12.1808L16.1998 12.4748V12.4746Z",
  },
};

function ToolLogo({ name }: { name: string }) {
  const mark = MARKS[name];

  if (mark) {
    return (
      <svg
        role="img"
        aria-label={`${mark.title} logo`}
        viewBox={mark.viewBox ?? "0 0 24 24"}
        className="h-6 w-6 shrink-0"
        fill="currentColor"
      >
        <path d={mark.path} />
      </svg>
    );
  }

  return (
    <span
      aria-hidden
      className={`${serif} flex h-6 w-6 shrink-0 items-center justify-center border text-[13px] font-black leading-none`}
      style={{ borderColor: RULE, color: PROMPT }}
    >
      {name.charAt(0)}
    </span>
  );
}

export default function TaylorSwiftPage() {
  return (
    <main className="antialiased" style={{ background: "#161613", color: PAPER }}>
      {/* ── bar ──────────────────────────────────────────────── */}
      <header className="border-b px-5 py-3 sm:px-8" style={{ borderColor: RULE }}>
        <div
          className={`${mono} mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.25em]`}
        >
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/ladder" className="transition-colors hover:text-[#7ba2e0]" style={{ color: FAINT }}>
              ← The ladder
            </Link>
            <Link href="/skills" className="transition-colors hover:text-[#7ba2e0]" style={{ color: FAINT }}>
              All skills
            </Link>
          </span>
          <span style={{ color: FAINT }}>Rung 01 of 07</span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        {/* ── the pitch ──────────────────────────────────────── */}
        <p className={`${mono} text-[11px] uppercase tracking-[0.3em]`} style={{ color: PROMPT }}>
          Rung one
        </p>
        <h1 className={`${serif} mt-4 text-5xl font-black leading-[1.02] tracking-tight sm:text-7xl`}>
          Rebuild Taylor Swift&rsquo;s website.{" "}
          <em className="not-italic" style={{ color: PROMPT }}>
            One skill, six decisions.
          </em>
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed" style={{ color: DIM }}>
          {LEDE}
        </p>

        {/* ── the stamp ──────────────────────────────────────── */}
        <div className="mt-10 border-2 p-5" style={{ borderColor: PROMPT }}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span
              className={`${mono} text-[11px] font-bold uppercase tracking-[0.25em]`}
              style={{ color: PROMPT }}
            >
              Difficulty
            </span>
            <span className="flex gap-1" aria-hidden>
              {Array.from({ length: DIFFICULTY.of }, (_, n) => (
                <span
                  key={n}
                  className="block h-3 w-6"
                  style={{
                    background: n < DIFFICULTY.rung ? PROMPT : "transparent",
                    border: `1px solid ${n < DIFFICULTY.rung ? PROMPT : RULE}`,
                  }}
                />
              ))}
            </span>
            <span className={`${mono} text-[13px] font-bold`}>
              rung {DIFFICULTY.rung} of {DIFFICULTY.of}
            </span>
            <span className="ml-auto flex items-baseline gap-2">
              <span className={`${serif} text-3xl font-black leading-none sm:text-4xl`} style={{ color: PROMPT }}>
                {DIFFICULTY.cost}
              </span>
              <span className={`${mono} max-w-[11rem] text-[10px] leading-tight`} style={{ color: FAINT }}>
                {DIFFICULTY.costNote}
              </span>
            </span>
          </div>
          <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {[
              ["Time to build", DIFFICULTY.time],
              ["Blast radius", DIFFICULTY.blastRadius],
              ["Reversible", DIFFICULTY.reversible],
              ["Platform floor", DIFFICULTY.floor],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className={`${mono} text-[10px] uppercase tracking-[0.25em]`} style={{ color: FAINT }}>
                  {k}
                </dt>
                <dd className="mt-1 text-[14px] leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── the honest filter. Sends some people away on purpose ── */}
        <div className="mt-8 border-l-2 py-1 pl-5" style={{ borderColor: `${ENERGY}88` }}>
          <p className={`${mono} text-[11px] uppercase tracking-[0.3em]`} style={{ color: ENERGY }}>
            {HONEST_FILTER.title}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: DIM }}>
            {HONEST_FILTER.body}
          </p>
        </div>

        {/* ── the two lines ──────────────────────────────────── */}
        <h2 className={`${serif} mt-16 text-4xl font-black leading-tight sm:text-5xl`}>
          The whole thing is two lines.
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed" style={{ color: DIM }}>
          Install it once. Then say what you want, and answer six questions while it works.
        </p>

        <div className="mt-7">
          <CopyBlock id="remake-install" filename="install the skill, once" body={SKILL_INSTALL} />
        </div>
        <div className="mt-4">
          <CopyBlock id="remake-say" filename="then say this to Claude Code" body={SKILL_SAY} />
        </div>

        <p className="mt-5 text-[14px] leading-relaxed" style={{ color: FAINT }}>
          {PREREQ}
        </p>

        {/* ── the five tools. What they keep after the site ships ── */}
        <h2 className={`${serif} mt-16 text-4xl font-black leading-tight sm:text-5xl`}>
          {TOOLS_TITLE}
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed" style={{ color: DIM }}>
          {TOOLS_LEDE}
        </p>

        <div className="mt-9 space-y-10">
          {TOOLS.map((t) => (
            <div key={t.name} className="border-t pt-5" style={{ borderColor: RULE_SOFT }}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <ToolLogo name={t.name} />
                <h3 className={`${serif} text-2xl font-black leading-tight`}>{t.name}</h3>
                <span
                  className={`${mono} text-[11px] uppercase tracking-[0.25em]`}
                  style={{ color: PROMPT }}
                >
                  it {t.job}
                </span>
              </div>

              <p className="mt-3 text-[15px] leading-relaxed">{t.what}</p>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: DIM }}>
                {t.why}
              </p>

              <div className="mt-4 border-l-2 py-1 pl-4" style={{ borderColor: `${ENERGY}88` }}>
                <p
                  className={`${mono} text-[10px] font-bold uppercase tracking-[0.25em]`}
                  style={{ color: ENERGY }}
                >
                  What catches people out
                </p>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: DIM }}>
                  {t.gotcha}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── the six stops. This is the actual pitch ────────── */}
        <h2 className={`${serif} mt-16 text-4xl font-black leading-tight sm:text-5xl`}>
          It stops six times and makes you decide.
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed" style={{ color: DIM }}>
          That is deliberate. If it did the whole thing without asking, you would learn nothing and a
          site builder would be the better tool. These six are the reason to do it this way.
        </p>

        <ol className="mt-9 space-y-8">
          {STOPS.map((s) => (
            <li key={s.n} className="border-t pt-5" style={{ borderColor: RULE_SOFT }}>
              <div className="flex items-baseline gap-4">
                <span className={`${mono} text-[13px] font-bold tracking-[0.2em]`} style={{ color: PROMPT }}>
                  {s.n}
                </span>
                <h3 className={`${serif} text-2xl font-black leading-tight`}>{s.title}</h3>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: DIM }}>
                {s.ask}
              </p>
            </li>
          ))}
        </ol>

        {/* ── and what it does without asking ────────────────── */}
        <h2 className={`${serif} mt-16 text-3xl font-black leading-tight sm:text-4xl`}>
          Everything else runs itself.
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed" style={{ color: DIM }}>
          Nobody has ever learned anything from <code className={mono}>gh auth setup-git</code>. These
          happen silently, and you only hear about them if one fails.
        </p>
        <ul className="mt-6 space-y-3">
          {AUTOMATED.map((a, k) => (
            <li key={k} className="flex gap-4 text-[15px] leading-relaxed">
              <span className={`${mono} shrink-0 pt-1 text-[11px]`} style={{ color: FAINT }}>
                {String(k + 1).padStart(2, "0")}
              </span>
              <span style={{ color: DIM }}>{a}</span>
            </li>
          ))}
        </ul>

        {/* ── the traps. Why the skill beats a fresh session ── */}
        <h2 className={`${serif} mt-16 text-3xl font-black leading-tight sm:text-4xl`}>
          Five things it already knows.
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed" style={{ color: DIM }}>
          Each one cost real time on the first filmed run. This is what the skill carries that a fresh
          session does not.
        </p>
        <dl className="mt-8 space-y-6">
          {TRAPS.map((t) => (
            <div key={t.trap} className="border-l-2 pl-5" style={{ borderColor: `${ENERGY}88` }}>
              <dt className={`${serif} text-xl font-black leading-snug`}>{t.trap}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed" style={{ color: DIM }}>
                {t.cost}
              </dd>
            </div>
          ))}
        </dl>

        {/* ── how long ───────────────────────────────────────── */}
        <h2 className={`${serif} mt-16 text-3xl font-black leading-tight sm:text-4xl`}>
          How long it really takes.
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed" style={{ color: DIM }}>
          {HOW_LONG}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: DIM }}>
          {HOW_LONG_WARNING}
        </p>

        {/* ── cost ───────────────────────────────────────────── */}
        <h2 className={`${serif} mt-16 text-3xl font-black leading-tight sm:text-4xl`}>What it costs.</h2>
        <p className="mt-3 text-[14px] leading-relaxed" style={{ color: FAINT }}>
          {COST_NOTE}
        </p>

        <ul className="mt-6 space-y-px">
          {COSTS.map((c) => (
            <li key={c.piece} className="border-t py-3" style={{ borderColor: RULE_SOFT }}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[15px] font-semibold">{c.piece}</span>
                <span className={`${mono} shrink-0 text-[12px]`} style={{ color: PROMPT }}>
                  {c.build} · {c.run}
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: FAINT }}>
                {c.note}
              </p>
            </li>
          ))}
          <li
            className="flex items-baseline justify-between gap-4 border-t-2 pt-3"
            style={{ borderColor: PROMPT }}
          >
            <span className={`${mono} text-[11px] uppercase tracking-[0.2em]`}>To start · to keep</span>
            <span className={`${mono} text-[12px] font-bold`} style={{ color: PROMPT }}>
              {COST_TOTAL.build} · {COST_TOTAL.run}
            </span>
          </li>
        </ul>

        <p className="mt-6 text-[15px] leading-relaxed" style={{ color: DIM }}>
          {COST_LESSON}
        </p>

        {/* ── what you are left with ─────────────────────────── */}
        <p className="mt-14 text-[16px] leading-relaxed" style={{ color: DIM }}>
          {AFTER}
        </p>

        {/* ── This page names a real artist, so this is not optional ── */}
        <div className="mt-10 border-2 p-5" style={{ borderColor: `${ENERGY}88` }}>
          <p className={`${mono} text-[11px] uppercase tracking-[0.3em]`} style={{ color: ENERGY }}>
            {STRAIGHT_TALK.title}
          </p>
          {STRAIGHT_TALK.body.map((p, k) => (
            <p key={k} className="mt-3 text-[15px] leading-relaxed" style={{ color: DIM }}>
              {p}
            </p>
          ))}
        </div>

        <div className="mt-10 border-t pt-6" style={{ borderColor: RULE }}>
          <p className={`${mono} text-[11px] uppercase tracking-[0.3em]`} style={{ color: FAINT }}>
            Not covered here
          </p>
          <ul className="mt-4 space-y-2">
            {NOT_COVERED.map((n, k) => (
              <li key={k} className="flex gap-3 text-[14px] leading-relaxed" style={{ color: FAINT }}>
                <span aria-hidden>·</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/ladder"
            className={`${mono} inline-block border-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7ba2e0] transition-colors hover:bg-[#7ba2e0] hover:text-[#161613]`}
            style={{ borderColor: PROMPT }}
          >
            ← All seven rungs
          </Link>
          <Link
            href="/skills"
            className={`${mono} inline-block px-5 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-[#7ba2e0]`}
            style={{ color: FAINT }}
          >
            The rest of the skills →
          </Link>
        </div>
      </div>
    </main>
  );
}
