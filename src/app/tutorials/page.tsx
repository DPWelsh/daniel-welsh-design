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
 * achieve, not which guide number covers it. */
type Entry = {
  href: string;
  n: string;
  title: string;
  accent: string;
  blurb: string;
  when: string;
};

const ENTRIES: Entry[] = [
  {
    href: "/get-started",
    n: "001",
    title: "Day Zero.",
    accent: "Laptop to live URL.",
    blurb:
      "A brand-new machine to a site on the internet. The accounts, the installs, and the first build, one step at a time.",
    when: "Once, ever. Before anything else.",
  },
  {
    href: "/ladder",
    n: "002",
    title: "The ladder.",
    accent: "Seven build sheets.",
    blurb:
      "How hard an app is has nothing to do with how famous it is. Seven apps, ranked by what actually makes them difficult.",
    when: "When you're picking what to build.",
  },
  {
    href: "/ladder/taylor-swift",
    n: "003",
    title: "Rung one,",
    accent: "the build.",
    blurb:
      "Eight steps and the exact prompts, from a scrape to a pointed domain. The whole thing, start to finish.",
    when: "An afternoon, about $35.",
  },
  {
    href: "/ladder/uber-eats",
    n: "004",
    title: "Rung six,",
    accent: "the reference.",
    blurb:
      "Order, payment and dispatch. The components, the state machines, and the invariants that keep it honest.",
    when: "Read before you quote one.",
  },
  {
    href: "/scratch",
    n: "005",
    title: "Build it properly,",
    accent: "the second time.",
    blurb:
      "The five mistakes that quietly wreck AI-built apps, the six-stage plan that fixes them, and the books, talks and templates to steal.",
    when: "After your first build goes wrong.",
  },
  {
    href: "/ship",
    n: "006",
    title: "Three checks",
    accent: "before you ship.",
    blurb:
      "The twelve ways a real person breaks an AI-built app, and how to find every one of them before they do.",
    when: "Before you give someone the link.",
  },
  {
    href: "/launch",
    n: "007",
    title: "Five things",
    accent: "before you launch.",
    blurb:
      "The preview image, the subdomain split, the first action, session replay, and the sitemap. In that order.",
    when: "The day before you share it.",
  },
  {
    href: "/scale",
    n: "008",
    title: "The stack at",
    accent: "10,000 users.",
    blurb:
      "The same nine jobs you started with. Six of them change hands as you grow, three never do, and each one has a trigger.",
    when: "When a bill starts to sting.",
  },
  {
    href: "/saas-calc",
    n: "009",
    title: "Price your",
    accent: "whole stack.",
    blurb:
      "Pick a budget, pick one tool per row, see what a real software business costs to run each month. 110 tools at real, dated prices.",
    when: "Before you commit to a stack.",
  },
  {
    href: "/stacks",
    n: "010",
    title: "Nine jobs,",
    accent: "three answers.",
    blurb:
      "Every app has the same nine jobs. Here's what to run for each one, at the starter tier and past it.",
    when: "When you're choosing tools.",
  },
  {
    href: "/supabase-vs-neon",
    n: "011",
    title: "Supabase or Neon.",
    accent: "The wrong question.",
    blurb:
      "One is a backend, the other is a database. What each actually gives you, and which question you should be asking instead.",
    when: "Before you pick a database.",
  },
  {
    href: "/presets",
    n: "012",
    title: "A brand kit",
    accent: "from photos.",
    blurb:
      "Turn a look you like into a real hex palette and a working Lightroom preset, without guessing at the colours.",
    when: "Alongside step 03 of any build.",
  },
  {
    href: "/domain",
    n: "013",
    title: "Domain day.",
    accent: "The full list.",
    blurb:
      "Everything to do on the day you buy a domain. The DNS, the SPF and DKIM records, and the subdomain split most people get wrong.",
    when: "The day you buy one.",
  },
  {
    href: "/easy",
    n: "014",
    title: "Three easy",
    accent: "automations.",
    blurb:
      "Email clean-up, a daily sales report, and Google review alerts. The exact steps for each, nothing clever.",
    when: "A quiet afternoon.",
  },
  {
    href: "/automation",
    n: "015",
    title: "Ten automations,",
    accent: "and the failure rate.",
    blurb:
      "The ten running on a real clinic stack, what each one replaced, and the honest rate at which they break.",
    when: "Before you automate anything.",
  },
  {
    href: "/fast",
    n: "016",
    title: "Three things",
    accent: "that make it fast.",
    blurb:
      "Your app is slow and it is almost always the images. Convert them, stop loading what nobody looks at, and measure it.",
    when: "When it starts to feel slow.",
  },
  {
    href: "/skills",
    n: "017",
    title: "The skill",
    accent: "library.",
    blurb:
      "The Claude Code skills I actually run: a guided first build, brand enforcement, pre-launch checks. Downloadable, readable, yours.",
    when: "Any time. Read one before you install it.",
  },
  {
    href: "/agent-vps",
    n: "018",
    title: "Claude Code on a server,",
    accent: "unattended.",
    blurb:
      "Putting the agent on a VPS so the work carries on after you shut the laptop, and what to lock down before you do.",
    when: "When one machine isn't enough.",
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
          {ENTRIES.map((e) => (
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
            </li>
          ))}
        </ul>
      </main>

      <PageFooter />
    </div>
  );
}
