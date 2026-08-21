export interface Steal {
  id: string;
  title: string;
  blurb: string;
  filename: string;
  body: string;
}

export const STEALS: Steal[] = [
  {
    id: "one-page",
    title: "The one page",
    blurb:
      "Stage 1's first artifact. If you can't fill this in, the AI can't build it — it'll supply defaults for everything you left blank.",
    filename: "docs/one-page.md",
    body: `# <app name> — the one page

**What it does (one sentence):**

**Who it's for:**

**What "done" means (3 checks):**
1.
2.
3.

**What it will NOT do (v1):**
-

**The first slice (one user journey, end to end):**
`,
  },
  {
    id: "skeleton",
    title: "The folder skeleton",
    blurb:
      "Create this empty, before the first feature prompt. The AI reads structure and imitates it — the skeleton is the prompt.",
    filename: "the shape of the repo",
    body: `src/
  app/          # routes / screens
  components/
  lib/          # ONE file per external service (stripe.ts, twilio.ts…)
  hooks/
  core/         # domain logic — imports no vendors
supabase/migrations/   # schema as code, the only truth
tests/
scripts/        # one-off automation, never in src
docs/           # the one-pager + decision records
CLAUDE.md       # the project constitution`,
  },
  {
    id: "claude-md",
    title: "CLAUDE.md starter",
    blurb:
      "The project constitution — written like onboarding notes for a new hire. Every future AI session inherits it.",
    filename: "CLAUDE.md",
    body: `# <App name>

<One sentence on what this app is — written for a new hire.>

## Commands
- npm run dev / build / test / lint

## Rules
- Migrations are the only truth for the schema. Never edit the DB by hand.
- One file per external service in src/lib/. Core logic in src/core/ imports no vendors.
- No file over 600 lines. Split before you add.
- Secrets live in .env (gitignored). .env.example holds the shape. Never print or commit a key.
- Commit small, after every working change. Branch before experiments.

## Gotchas
- <the things that bit you — keep this list honest>`,
  },
  {
    id: "rls-prompt",
    title: "The ownership prompt",
    blurb:
      "The one that catches mistake #4 before your users do. If the AI can't point to the policy, it doesn't exist.",
    filename: "paste into your AI session",
    body: `Show me the exact rule that enforces ownership on this table.
Point to the policy file and the line. If it doesn't exist,
write the migration now — and then walk me through the
two-account test to prove it holds.`,
  },
  {
    id: "two-account-test",
    title: "The two-account test",
    blurb:
      "Five minutes, before launch, every time the schema changes. This is the whole test.",
    filename: "the ritual",
    body: `1. Sign up as user A. Create a record.
2. Sign up as user B in an incognito window.
3. As B, try to read A's record — through the UI, then through
   the network tab (copy the request, replay it).
4. If anything of A's comes back, the policy is wrong.
   Nothing else ships until this passes.`,
  },
  {
    id: "taste-prompt",
    title: "The taste prompt",
    blurb:
      "The fix for mistake #5. Written taste beats supplied defaults — otherwise every AI app looks like the internet's average.",
    filename: "paste into your AI session",
    body: `Here are screenshots of three apps whose design I love.
Write me a design guide from them — type scale, spacing,
color, density, tone — and follow it for every screen
from now on. Never fall back to defaults. When in doubt,
ask the guide, not the internet's average.`,
  },
  {
    id: "file-budget",
    title: "The 600-line budget",
    blurb:
      "Readability enforced mechanically. Wire it into pre-commit or CI and the 2,535-line file physically can't happen again.",
    filename: "scripts/check-file-budget.mjs",
    body: `import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const BUDGET = 600;
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const over = walk("src")
  .filter((f) => /\\.(ts|tsx|js|jsx)$/.test(f))
  .map((f) => [f, readFileSync(f, "utf8").split("\\n").length])
  .filter(([, lines]) => lines > BUDGET);

if (over.length) {
  console.error(\`Over the \${BUDGET}-line budget:\`);
  for (const [f, lines] of over) console.error(\`  \${f} — \${lines} lines\`);
  process.exit(1);
}`,
  },
];
