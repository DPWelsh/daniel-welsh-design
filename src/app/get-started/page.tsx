"use client";

import Image from "next/image";
import * as si from "simple-icons";
import { CopyBlock } from "@/components/scratch/copy-block";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import {
  DIM,
  FAINT,
  Kicker,
  PAPER,
  PROMPT,
  RULE,
  RULE_SOFT,
  mono,
  serif,
} from "../scratch/ui";
import { StepConsole, type ConsoleCard } from "@/components/step-console";


type SimpleIcon = { title: string; path: string; hex: string };

/* Printed logo plate: paper tile, official mark in its own hex.
   Tools not in the simple-icons set pass an image file instead. */
function LogoPlate({
  icon,
  img,
  name,
  size = 44,
}: {
  icon?: SimpleIcon;
  img?: string;
  name?: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center border"
      style={{
        width: size,
        height: size,
        background: PAPER,
        borderColor: "rgba(237,237,235,0.25)",
      }}
    >
      {icon ? (
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={size * 0.55}
          height={size * 0.55}
          fill={`#${icon.hex}`}
        >
          <path d={icon.path} />
        </svg>
      ) : img ? (
        <Image
          src={img}
          alt={name ? `${name} logo` : ""}
          width={Math.round(size * 0.6)}
          height={Math.round(size * 0.6)}
          unoptimized
        />
      ) : null}
    </span>
  );
}

type Step = {
  n: string;
  name: string;
  icon?: SimpleIcon;
  img?: string;
  what: string;
  why: string;
  href?: string;
  hrefLabel?: string;
};

const ACCOUNTS: Step[] = [
  {
    n: "01",
    name: "Chrome",
    icon: si.siGooglechrome,
    what: "The browser everything gets built and tested in.",
    why: "Open Safari once. Download Chrome. Close Safari forever.",
    href: "https://www.google.com/chrome/",
    hrefLabel: "google.com/chrome",
  },
  {
    n: "02",
    name: "GitHub",
    icon: si.siGithub,
    what: "The passport. Everything else signs in with it.",
    why: "It's also where your code lives. Every app you ever build, in one place.",
    href: "https://github.com/signup",
    hrefLabel: "github.com",
  },
  {
    n: "03",
    name: "Claude",
    icon: si.siClaude,
    what: "The builder's brain. Take the Pro plan.",
    why: "This is the one subscription on the list. It writes every line of code you're about to not write.",
    href: "https://claude.ai",
    hrefLabel: "claude.ai",
  },
  {
    n: "04",
    name: "Namecheap",
    icon: si.siNamecheap,
    what: "The domain shop. ~$20 a year.",
    why: "The only thing on this whole page with a renewal date.",
    href: "https://www.namecheap.com",
    hrefLabel: "namecheap.com",
  },
  {
    n: "05",
    name: "Vercel",
    icon: si.siVercel,
    what: "Sign up WITH the GitHub button.",
    why: "That one choice is the whole trick. It's what makes “push the code = site goes live” work automatically, forever.",
    href: "https://vercel.com/signup",
    hrefLabel: "vercel.com",
  },
  {
    n: "06",
    name: "Google Analytics",
    icon: si.siGoogleanalytics,
    what: "Free. One account, one measurement ID.",
    why: "So the site counts its visitors from day one. The skill wires the ID into every site you build.",
    href: "https://analytics.google.com",
    hrefLabel: "analytics.google.com",
  },
];

const INSTALLS: Step[] = [
  {
    n: "07",
    name: "Homebrew",
    icon: si.siHomebrew,
    what: "The Mac's app store for builder tools.",
    why: "One paste in Terminal. Everything below installs through it in one line.",
    href: "https://brew.sh",
    hrefLabel: "brew.sh",
  },
  {
    n: "08",
    name: "Git + Node",
    icon: si.siGit,
    what: "The two engines. One line: brew install git node",
    why: "Git remembers every version of your work. Node runs the tools. Boring, essential.",
  },
  {
    n: "09",
    name: "Cursor",
    icon: si.siCursor,
    what: "The editor. The window you see the files in.",
    why: "Free tier is fine when Claude Code does the building. Say yes when it offers its command line tools.",
    href: "https://cursor.com",
    hrefLabel: "cursor.com",
  },
  {
    n: "10",
    name: "Claude Code",
    icon: si.siAnthropic,
    what: "The builder. Lives in your terminal.",
    why: "npm install -g @anthropic-ai/claude-code. Then type claude and log in.",
  },
];


function StepRow({ step, delay }: { step: Step; delay: number }) {
  return (
    <li
      className="gs-rise flex gap-4 border-b py-5 sm:gap-6"
      style={{ borderColor: RULE_SOFT, animationDelay: `${delay}s` }}
    >
      <span
        className={`${mono} pt-2 text-[11px] font-bold tracking-[0.2em]`}
        style={{ color: FAINT }}
      >
        {step.n}
      </span>
      <LogoPlate icon={step.icon} img={step.img} name={step.name} />
      <div className="min-w-0">
        <p className="text-[15px] font-semibold leading-snug" style={{ color: PAPER }}>
          {step.name}
          {step.href && (
            <a
              href={step.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${mono} ml-3 text-[10px] font-normal uppercase tracking-[0.15em] underline-offset-4 hover:underline`}
              style={{ color: PROMPT }}
            >
              {step.hrefLabel} ↗
            </a>
          )}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed" style={{ color: DIM }}>
          {step.what}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed" style={{ color: FAINT }}>
          {step.why}
        </p>
      </div>
    </li>
  );
}

function Phase({
  part,
  chip,
  title,
  lede,
  children,
}: {
  part: string;
  chip: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 sm:mt-20">
      <header className="border-t pt-6" style={{ borderColor: RULE }}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Kicker>{part}</Kicker>
          <span className={`${mono} text-[10px] uppercase tracking-[0.25em]`} style={{ color: FAINT }}>
            {chip}
          </span>
        </div>
        <h2 className={`${serif} mt-3 text-3xl font-black leading-tight sm:text-4xl`} style={{ color: PAPER }}>
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
          {lede}
        </p>
      </header>
      {children}
    </section>
  );
}


const DOMAIN_DAY = [
  { n: "01", title: "Split your subdomains", body: "www.yoursite.com for the marketing site. app.yoursite.com for the actual app. Even if the app doesn't exist yet." },
  { n: "02", title: "Two more, for email", body: "notify.yoursite.com for no-reply and password resets. mail.yoursite.com for marketing emails. Keep them separate so one can't hurt the other." },
  { n: "03", title: "sitemap.xml", body: "yoursite.com/sitemap.xml is how Google finds every page you publish. The day-zero skill adds it to your first site automatically." },
  { n: "04", title: "Pick one front door", body: "yoursite.com or www.yoursite.com. Pick one, redirect the other. Otherwise Google sees two copies of your site. Drop a robots.txt next to that sitemap while you're there." },
];

/* Seven cards: the command, three install phases, the filmed proof, the
   domain appendix, and the sign-off. Phase/StepRow above are unchanged,
   the console only replaces the scrolling shell around them. */
export default function GetStartedConsole() {
  const cards: ConsoleCard[] = [
    {
      id: "intro",
      label: "start",
      node: (
        <>
          <Kicker>The completely fresh computer</Kicker>
          <h1
            className={`${serif} mt-4 text-6xl font-black leading-[0.95] tracking-tight sm:text-8xl`}
          >
            Day <em className="not-italic" style={{ color: PROMPT }}>Zero.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: DIM }}>
            New laptop → first live website. One browser, five accounts, four installs.
            Every app you ever build starts from this exact setup. And you never do it
            again.
          </p>
          <div className="mt-8">
            <CopyBlock
              id="get-started-curl"
              filename="the install half. One command, in Terminal"
              body="curl -fsSL https://danielwelsh.design/get-started.sh | bash"
            />
            <p className={`${mono} mt-2 text-[11px] leading-relaxed`} style={{ color: FAINT }}>
              Safe to run twice. It checks before it installs. Mac only; it tells Windows
              people where to go. Or read every line first:{" "}
              <a href="/get-started.sh" className="underline underline-offset-4" style={{ color: PROMPT }}>
                get-started.sh
              </a>
            </p>
          </div>
        </>
      ),
    },
    {
      id: "accounts",
      label: "phase I · accounts",
      checkable: true,
      node: (
        <Phase
          part="Phase I. In the browser"
          chip="all free"
          title="Accounts first."
          lede="In this exact order, so every later step can log straight in. The Vercel one is the trick worth knowing."
        >
          <ol className="mt-2">
            {ACCOUNTS.map((s, i) => (
              <StepRow key={s.n} step={s} delay={0.05 * i} />
            ))}
          </ol>
        </Phase>
      ),
    },
    {
      id: "installs",
      label: "phase II · installs",
      checkable: true,
      node: (
        <Phase
          part="Phase II. In the Terminal"
          chip="the script does these"
          title="Installs."
          lede="The one command on the first card does all four of these. The list is here so you know what just landed on your machine. Never run a script you can't read the receipt for."
        >
          <ol className="mt-2">
            {INSTALLS.map((s, i) => (
              <StepRow key={s.n} step={s} delay={0.05 * i} />
            ))}
          </ol>
        </Phase>
      ),
    },
    {
      id: "proof",
      label: "phase IV · the proof",
      checkable: true,
      node: (
        <Phase
          part="Phase IV. The proof"
          chip="the payoff"
          title="A stranger can load your URL."
          lede="The last step is the whole setup paying off, and it is one sentence long."
        >
          <div
            className="mt-6 border p-6 sm:p-8"
            style={{ borderColor: RULE, background: "rgba(237,237,235,0.03)" }}
          >
            <p className={`${mono} text-[11px] font-bold uppercase tracking-[0.25em]`} style={{ color: PROMPT }}>
              Last step
            </p>
            <p className="mt-3 text-[17px] leading-relaxed" style={{ color: PAPER }}>
              Open Terminal, type{" "}
              <code className={`${mono} px-1 text-[15px]`} style={{ color: PROMPT }}>claude</code>{" "}
              and say: <em>build my first site</em>.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed" style={{ color: DIM }}>
              The day-zero skill (installed by the script) walks Claude through it with
              you: brand kit, a site whose design you love, the build, the push, the live
              URL. When a stranger anywhere on earth can load that URL, the machine is
              ready and you have built your first thing.
            </p>
          </div>
          <div className="mt-6">
            <CopyBlock
              id="get-started-skill"
              filename="already have Claude Code? install just the skill"
              body={`mkdir -p ~/.claude/skills/day-zero && curl -fsSL https://danielwelsh.design/skills/day-zero/SKILL.md -o ~/.claude/skills/day-zero/SKILL.md`}
            />
            <p className={`${mono} mt-2 text-[11px]`} style={{ color: FAINT }}>
              Read it first if you like:{" "}
              <a href="/skills/day-zero/SKILL.md" className="underline underline-offset-4" style={{ color: PROMPT }}>
                SKILL.md
              </a>{" "}. It&apos;s a set of instructions Claude follows, in plain English.
            </p>
          </div>
        </Phase>
      ),
    },
    {
      id: "domain",
      label: "appendix · domain day",
      node: (
        <>
          <Kicker>Appendix. Domain day</Kicker>
          <h2 className={`${serif} mt-3 text-3xl font-black leading-tight sm:text-4xl`} style={{ color: PAPER }}>
            The day you buy the domain, do these.
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            Ten minutes at Namecheap, once. Future you says thanks.
          </p>
          <ol className="mt-2">
            {DOMAIN_DAY.map((d) => (
              <li key={d.n} className="flex gap-4 border-b py-5 sm:gap-6" style={{ borderColor: RULE_SOFT }}>
                <span className={`${mono} pt-0.5 text-[11px] font-bold tracking-[0.2em]`} style={{ color: PROMPT }}>
                  {d.n}
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-snug" style={{ color: PAPER }}>{d.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed" style={{ color: DIM }}>{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </>
      ),
    },
    {
      id: "done",
      label: "done",
      node: (
        <>
          <h2 className={`${serif} text-4xl font-black leading-tight sm:text-5xl`} style={{ color: PAPER }}>
            That is Day Zero. You never do it again.
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed" style={{ color: DIM }}>
            Every app you build from here starts from this machine. The next thing to
            build is rung one: a page that just sits there, in an afternoon.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/ladder/taylor-swift"
              className={`${mono} inline-block border-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7ba2e0] transition-colors hover:bg-[#7ba2e0] hover:text-[#161613]`}
              style={{ borderColor: PROMPT }}
            >
              Rung one → build the first site
            </a>
            <a
              href="/ladder"
              className={`${mono} inline-block px-5 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-[#7ba2e0]`}
              style={{ color: FAINT }}
            >
              All seven rungs →
            </a>
          </div>
          <div className="mt-10 max-w-md">
            <ScratchSubscribe source="get-started" cta="send them" done="You're in." />
          </div>
        </>
      ),
    },
  ];

  return (
    <StepConsole
      cards={cards}
      backHref="/ladder"
      backLabel="The ladder"
      indexHref="/guides"
      eyebrow="Day Zero"
      startLabel="start"
      mono={mono}
      accent={PROMPT}
      rule={RULE}
      ruleSoft={RULE_SOFT}
      faint={FAINT}
      paper={PAPER}
    />
  );
}
