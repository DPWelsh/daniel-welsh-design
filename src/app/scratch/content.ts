export interface Mistake {
  n: string;
  title: string;
  showsUp: string;
  why: string;
  fix: string;
  receipt: string;
  confession?: boolean;
}

export const MISTAKES: Mistake[] = [
  {
    n: "01",
    title: "GitHub as a save button",
    showsUp:
      "No repo, or one giant “updates” commit a week. Then the AI breaks something and there's no yesterday to go back to.",
    why: "AI makes code feel disposable — you can always “just ask again.” You can't. You get a different wrong answer.",
    fix: "Repo before the first prompt. Commit every working change, small. Branch before experiments. Git isn't backup — it's the undo button for AI mistakes.",
    receipt: "9,354 commits behind the clinic app. The habit is the receipt.",
  },
  {
    n: "02",
    title: "Secrets in the code",
    showsUp:
      "API keys pasted into frontend files, or a committed .env. Scanners find hundreds of thousands of live keys on GitHub every month; one sweep of 20k+ indie launches found 11% exposing database credentials in the frontend.",
    why: "The AI optimises for “it works” — and pasting the key into the file works. Anything in the browser bundle is readable by anyone who opens dev tools.",
    fix: ".gitignore and .env before the first secret exists. .env.example for the shape. A secret scanner (gitleaks) on pre-commit, so a key physically can't get in. Server-only keys stay server-only.",
    receipt:
      "Confession: v1 shipped a committed encryption key. Fixing it is a pre-day-1 item of the rebuild plan. Not preaching — recovering.",
    confession: true,
  },
  {
    n: "03",
    title: "Everything in one file",
    showsUp:
      "The 2,000-line page.tsx. The AI happily keeps appending until it can't safely edit its own file — and neither can you.",
    why: "Every prompt is “add X,” and adding in place is the path of least resistance. Nobody prompts “reorganise.”",
    fix: "The folder skeleton before the first feature — AI reads structure and imitates it. Plus a file-size budget (600 lines) enforced as a check, so bloat bounces automatically.",
    receipt:
      "Confession: v1's front door was one 2,535-line function. The brain was 4,830. Nobody could read either — that's why there's a rebuild.",
    confession: true,
  },
  {
    n: "04",
    title: "The database is public and nobody checked",
    showsUp:
      "Supabase or Firebase with row-level security off — any user can read every row. A 2026 audit found 88% of vibe-coded apps had RLS entirely disabled; one incident confirmed 170+ production apps exposed.",
    why: "The app works without it. Nothing visibly breaks. Security that's invisible when missing never gets built.",
    fix: "RLS on from day one. An ownership policy per table. The two-account test before launch. The prompt that matters: “show me the exact rule that enforces ownership” — if the AI can't point to it, it doesn't exist.",
    receipt:
      "This one gets its own episode — “Your data might be public” is already in the series.",
  },
  {
    n: "05",
    title: "Design as an afterthought",
    showsUp:
      "Two flavours. Visually: every AI app looks identical, because the model defaults to the internet's average. Structurally: screens before deciding what the app is, so the data model changes weekly and every screen breaks.",
    why: "The demo looks 80% done in an hour, and the pretty parts are the fun parts. Both flavours are the same mistake: taste and scope were never written down, so the AI supplied defaults.",
    fix: "The one page first — what it does, who it's for, what done means. A taste file of apps you love, so the AI copies your taste, not the average. Data model before screens; migrations as the truth.",
    receipt: "Stages 1 and 2 below exist because of this one.",
  },
];

export interface Stage {
  n: number;
  title: string;
  check: string;
  intro: string;
  lenses: { label: string; text: string }[];
}

export const STAGES: Stage[] = [
  {
    n: 1,
    title: "The one page and the workspace",
    check: "Could a stranger say what this app is?",
    intro:
      "Before any code: write one page — what it does, who it's for, what “done” means, what it will not do. Then the empty folder skeleton and CLAUDE.md, before the first feature prompt.",
    lenses: [
      {
        label: "Folders",
        text: "The skeleton is the first prompt — the AI reads structure and imitates it.",
      },
      {
        label: "Tools",
        text: "Git and GitHub from commit 1. .gitignore and .env.example before any secret exists.",
      },
      {
        label: "Architecture",
        text: "None yet, on purpose. The one-pager is the first architecture decision: scope.",
      },
      {
        label: "Readability",
        text: "CLAUDE.md written like onboarding notes for a new hire — it's how every future session inherits the project.",
      },
    ],
  },
  {
    n: 2,
    title: "Rules the AI can't argue with",
    check: "Can a bad commit physically get in?",
    intro:
      "Gates before features. Every push runs them; a failing check bounces the commit — the AI's included.",
    lenses: [
      {
        label: "Folders",
        text: "A CI workflow, lint and format config at root, one config file validating every env var at boot.",
      },
      {
        label: "Tools",
        text: "TypeScript strict. Linter and formatter. Test runner. Gitleaks on pre-commit. CI on every push. A 600-line file budget as a check.",
      },
      {
        label: "Architecture",
        text: "Fail-loud config: the app never half-boots.",
      },
      {
        label: "Readability",
        text: "The size budget is readability enforced mechanically — no file the AI can quietly bloat.",
      },
    ],
  },
  {
    n: 3,
    title: "One core, thin edges",
    check: "Does every integration have an exam and a mock?",
    intro:
      "Decide the boundaries before the features. One domain core. One adapter per outside service. Channels — web, API, phone — as thin shells over the same core.",
    lenses: [
      {
        label: "Folders",
        text: "src/core/ holds types and logic and imports no vendors. src/lib/ holds one adapter per service. Channels never import vendors directly.",
      },
      {
        label: "Tools",
        text: "A contract test suite per integration — the exam every adapter must pass — plus a mock adapter passing the same exam, so the AI iterates all day without touching anything real.",
      },
      {
        label: "Architecture",
        text: "Ports and adapters. One shared definition per noun. For AI features: the model picks the words, a table picks the outcomes.",
      },
      {
        label: "Readability",
        text: "The state table fits on one screen. An unreadable brain is unreviewable — and unsafe to let AI extend.",
      },
    ],
  },
  {
    n: 4,
    title: "The smallest complete slice, with receipts",
    check: "Can anything happen twice?",
    intro:
      "One user journey end-to-end — ugly but live. Then every action that touches the outside world gets a receipt before it happens.",
    lenses: [
      {
        label: "Folders",
        text: "The ledger-table migration lands with the first write path, not later.",
      },
      {
        label: "Tools",
        text: "Deploy pipeline from week one. Idempotency keys on every external write. A dead-letter path for failures.",
      },
      {
        label: "Architecture",
        text: "The walking skeleton kills integration risk first. Effects go through the ledger, so “it sent twice” is a constraint violation, not a code-review hope.",
      },
      {
        label: "Readability",
        text: "One job per module. After each slice, the AI explains its own diff as if to someone who didn't write it. Long explanation = wrong code.",
      },
    ],
  },
  {
    n: 5,
    title: "Watch it — errors, usage, evals, a stranger",
    check: "Does the system tell you what it did?",
    intro:
      "Wire observability while it's small, then hand it to someone who isn't you.",
    lenses: [
      {
        label: "Folders",
        text: "tests/evals/ with golden transcripts for every AI behaviour. Diagnostics as structured events, not print statements.",
      },
      {
        label: "Tools",
        text: "Sentry — did it break. PostHog — did anyone use it. An eval harness with deterministic replay: the scoreboard that turns “seems fine” into a number.",
      },
      {
        label: "Architecture",
        text: "Built to be watched: the system tells you what it did.",
      },
      {
        label: "Readability",
        text: "The stranger test: README to running in ten minutes, no help — or it isn't finished.",
      },
    ],
  },
  {
    n: 6,
    title: "Widen only when the core proves it",
    check: "Did channel #2 take days or months?",
    intro:
      "Now — and only now — the second channel, the second integration. Through the same contracts and the same core.",
    lenses: [
      {
        label: "Folders",
        text: "One new adapter file plus its contract-suite run. No new architecture.",
      },
      {
        label: "Tools",
        text: "The existing exam grades the new integration. Decision records in docs/ so future sessions inherit the why.",
      },
      {
        label: "Architecture",
        text: "The proof: channel #2 in days validates stage 3; months falsifies it — found out cheap. The old system migrates by parallel-run, through the same front door as a stranger.",
      },
      {
        label: "Readability",
        text: "The gates never stop: any file that outgrows the budget gets split. Properly built means stays readable.",
      },
    ],
  },
];

export interface RepoRow {
  label: string;
  mess: string;
  proper: string;
}

export const REPO_ROWS: RepoRow[] = [
  {
    label: "History",
    mess: "1 commit — “updates”, 9:47pm",
    proper: "18 small commits + a merged feature branch",
  },
  {
    label: "Biggest file",
    mess: "page.tsx — 2,535 lines",
    proper: "every file under the 600-line budget",
  },
  {
    label: "Secrets",
    mess: ".env committed, keys inside",
    proper: ".env invisible to git status; .env.example holds the shape",
  },
  {
    label: "Database",
    mess: "RLS disabled in schema.sql",
    proper: "RLS + ownership policy in migration 001",
  },
  {
    label: "Versions",
    mess: "“utils copy 2.js” · “final-final-v3.js”",
    proper: "one utils — git holds the history",
  },
  {
    label: "Dependencies",
    mess: "node_modules committed",
    proper: "lockfile only",
  },
];
