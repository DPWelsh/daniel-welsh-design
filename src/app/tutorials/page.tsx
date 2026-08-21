import type { Metadata } from "next";
import Link from "next/link";
import { Masthead, PageFooter } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Field guides and build sheets for making software with AI. Written while running a business on it, not while demoing it.",
  alternates: { canonical: "https://danielwelsh.design/tutorials" },
};

/* The menu. Numbered because the order is the order you'd actually do them
 * in, and "when" does the real work: people arrive knowing what they want to
 * achieve, not which guide number covers it. Twenty-one more are on their way
 * over from labs, so the list is built to grow without redesigning. */
type Entry = {
  href: string;
  n: string;
  title: string;
  accent: string;
  blurb: string;
  when: string;
  live: boolean;
};

const ENTRIES: Entry[] = [
  {
    href: "/scratch",
    n: "001",
    title: "Build it properly,",
    accent: "the second time.",
    blurb:
      "The five mistakes that quietly wreck AI-built apps, the six-stage plan that fixes them, and the books, talks and templates to steal.",
    when: "After your first build goes wrong.",
    live: true,
  },
  {
    href: "/saas-calc",
    n: "002",
    title: "Price your",
    accent: "whole stack.",
    blurb:
      "Pick a budget, pick one tool per row, see what a real software business costs to run each month. 110 tools at real, dated prices.",
    when: "Before you commit to a stack.",
    live: true,
  },
];

export default function TutorialsPage() {
  return (
    <div className="grain relative min-h-screen">
      <Masthead section="Tutorials" />

      <main className="relative z-10 mx-auto max-w-[1180px] px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <p className="label" style={{ color: "var(--accent)" }}>
          Field guides &amp; build sheets
        </p>
        <h1
          className="display rise mt-5 text-[clamp(52px,8vw,116px)]"
          style={{ maxWidth: "13ch" }}
        >
          I build things.
          <br />
          <span style={{ color: "var(--accent)" }}>Here&apos;s how.</span>
        </h1>
        <p
          className="rise mt-8 max-w-[46ch] text-[clamp(17px,1.5vw,21px)] leading-[1.35]"
          style={{ color: "var(--muted)", animationDelay: "0.1s" }}
        >
          Written while running a business on AI-written code, not while
          demoing it. Every number in here is one I can show you.
        </p>

        <ul className="mt-16 border-t" style={{ borderColor: "var(--rule)" }}>
          {ENTRIES.map((e, i) => (
            <li key={e.href} className="border-b" style={{ borderColor: "var(--rule)" }}>
              <Link
                href={e.href}
                className="group grid gap-x-10 gap-y-4 py-10 sm:grid-cols-[64px_1fr_260px]"
              >
                <span className="label pt-2" style={{ color: "var(--accent)" }}>
                  {e.n}
                </span>

                <div>
                  <p className="display text-[clamp(30px,3.6vw,50px)] transition-opacity group-hover:opacity-70">
                    {e.title}{" "}
                    <span style={{ color: "var(--accent)" }}>{e.accent}</span>
                  </p>
                  <p
                    className="mt-4 max-w-[54ch] text-[15px] leading-[1.45]"
                    style={{ color: "var(--muted)" }}
                  >
                    {e.blurb}
                  </p>
                </div>

                <div className="sm:pt-3">
                  <p className="label" style={{ color: "var(--muted)" }}>
                    When
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.4]" style={{ color: "var(--ink)" }}>
                    {e.when}
                  </p>
                  <span
                    className="label mt-4 inline-block border-b pb-0.5 transition-opacity group-hover:opacity-60"
                    style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
                  >
                    Read it →
                  </span>
                </div>
              </Link>
              {i === ENTRIES.length - 1 && null}
            </li>
          ))}
        </ul>

        {/* Honest about what isn't here yet rather than shipping a wall of
            greyed-out "coming soon" rows nobody can use. */}
        <p
          className="mt-10 max-w-[60ch] text-[14px] leading-[1.5]"
          style={{ color: "var(--muted)" }}
        >
          Twenty-one more are moving across from{" "}
          <span className="label" style={{ color: "var(--ink)" }}>
            labs.routiq.ai
          </span>{" "}
          — the ladder, the field guides, Day Zero, the skill library. They land
          here as they&apos;re ported.
        </p>
      </main>

      <PageFooter />
    </div>
  );
}
