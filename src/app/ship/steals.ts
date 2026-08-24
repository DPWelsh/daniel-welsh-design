/* Copy-paste artifacts for /ship. Same contract as /scratch's steals:
   every one is short enough to read in full before pasting, and none of
   them need a library you do not already have. */

export interface Steal {
  id: string;
  title: string;
  blurb: string;
  filename: string;
  body: string;
}

export const STEALS: Steal[] = [
  {
    id: "breaks-list",
    title: "The breaks-it list",
    blurb:
      "Check 01, as a file. Keep it in the repo, add a line every time something surprises you, and never delete a row. This is the artifact the whole first section is about.",
    filename: "docs/what-breaks-it.md",
    body: `# What breaks it

One row per way a real person can produce a wrong answer instead of
an error. Add to it every time something surprises you. Never delete.

| # | What someone does | What happens now | Handled? | Test |
|---|-------------------|------------------|----------|------|
| 1 | Leaves the box empty |  | no |  |
| 2 | Pastes 4,000 words |  | no |  |
| 3 | Writes it the other way (+61 / 04) |  | no |  |
| 4 | Says a word the model has not heard |  | no |  |
| 5 | Types instructions at the app |  | no |  |
| 6 | Double-taps the button |  | no |  |
| 7 | Hits it when it is slow |  | no |  |
| 8 | Gets an empty response back |  | no |  |
| 9 | Gets JSON in a code fence |  | no |  |
| 10 | Is in a different timezone |  | no |  |
| 11 | Sends two events out of order |  | no |  |
| 12 | Tries to read another account |  | no |  |

Rule: a row is only "yes" when there is a test in the Test column.
"I checked once by hand" is not a yes.`,
  },
  {
    id: "two-format-test",
    title: "The two-format test",
    blurb:
      "Four lines, and it is the test that would have saved me the bug in the confession. Run it for every value that a human can write more than one way.",
    filename: "the test I did not have",
    body: `// For every value a person can write two ways, prove the two ways
// land on ONE record. Phone numbers, emails, names, addresses.

test("+61 and 04 are the same person", async () => {
  const a = await findOrCreate({ phone: "+61412345678" });
  const b = await findOrCreate({ phone: "0412345678" });
  expect(b.id).toBe(a.id);
});

// Then the same for: TRAILING SPACES, uppercase, "St" vs "Street",
// and whatever your domain's version of this is.`,
  },
  {
    id: "shape-check",
    title: "The shape check",
    blurb:
      "Check 02, cheapest tier. Never parse raw model output. Strip the wrapper, validate the shape, then use it. Retry on failure rather than crashing.",
    filename: "src/lib/checked.ts",
    body: `import { z } from "zod";

// Models wrap JSON in markdown fences some of the time, not all of it.
// This is not a rare edge case, it is a coin flip you will lose in prod.
const unfence = (s: string) =>
  s.trim().replace(/^\\\`\\\`\\\`(?:json)?\\s*/i, "").replace(/\\\`\\\`\\\`$/, "").trim();

export async function checked<T>(
  schema: z.ZodType<T>,
  call: () => Promise<string>,
  tries = 2,
): Promise<{ value: T; raw: string }> {
  let raw = "";
  for (let i = 0; i < tries; i++) {
    raw = await call();
    if (!raw?.trim()) continue;              // empty is a failure, not an answer
    const parsed = schema.safeParse(
      JSON.parse(unfence(raw)),
    );
    if (parsed.success) return { value: parsed.data, raw };
  }
  throw new Error(\`Model output failed the shape check: \${raw.slice(0, 200)}\`);
}`,
  },
  {
    id: "reversibility",
    title: "The reversibility rule",
    blurb:
      "The one-paragraph version of check 02, written so your AI session inherits it. Paste it into CLAUDE.md and it applies to every feature after it.",
    filename: "CLAUDE.md (append)",
    body: `## AI output rules

Match the check to whether the action can be undone.

- READS AND EXPLAINS — shape check only. Ship it.
- SUGGESTS TO A USER — shape check + the rules we already know.
- SENDS A MESSAGE — the above, plus one narrow second-model check.
- WRITES TO A CALENDAR, CHARGES, OR CONTACTS A PATIENT —
  all of the above, plus a human approves before it happens.

No model output alone decides anything in the last group.
Anything a user typed is untrusted, including text we fetched
on their behalf.`,
  },
  {
    id: "record",
    title: "The record to save",
    blurb:
      "Check 03, as a type. Write this on day one, not the day after the first complaint. The first field is the one everyone leaves out.",
    filename: "src/lib/ai-log.ts",
    body: `export interface AiRecord {
  id: string;              // the string you paste into a search box
  at: string;              // ISO, absolute instant, always UTC
  feature: string;         // which part of the app asked

  promptSent: string;      // THE RENDERED PROMPT, not the template.
                           // the one field that solves most bugs.
  rawResponse: string;     // before parsing. before cleanup.
  model: string;           // including the version
  ms: number;              // how long it took

  checkPassed: boolean;    // what your check decided
  checkReason?: string;    // and why
  shownToUser: string;     // what actually reached the screen

  userRef?: string;        // who, so you can find it from a complaint
}`,
  },
  {
    id: "break-it-prompt",
    title: "The make-it-break prompt",
    blurb:
      "Do check 01 with the AI rather than from memory. It is better than you are at listing the weird cases, because it is not attached to the thing being broken.",
    filename: "paste into your AI session",
    body: `You are trying to break this feature, not use it.

List every input a real user could give it that produces a WRONG
ANSWER rather than an error. Ignore the happy path entirely.

Cover at minimum: empty, enormous, the same value written two
different ways, a word the model would not know, someone typing
instructions at the app, the same request twice, a slow response,
an empty response, output in the wrong format, a different
timezone, events out of order, and another account's data.

For each one give me: what the user does, what happens now, and
the smallest test that would catch it. Be specific to THIS code,
not generic advice.`,
  },
  {
    id: "replay",
    title: "The replay",
    blurb:
      "What check 03 buys you. When a customer says it is broken, this is the whole workflow, and it is why the record above has an ID.",
    filename: "the ritual",
    body: `1. Get one thing from the customer: roughly when, or their number.
2. Find the record. One search, not a scroll.
3. Read promptSent. Nine times in ten the bug is visible right here —
   something was empty, or doubled, or in the wrong format.
4. Read rawResponse. If promptSent looked right, the bug is the model
   or your parsing, and this tells you which.
5. Read checkReason. If both looked right, your check let it through,
   and now you know which layer to fix.
6. Add the case to docs/what-breaks-it.md with a test.

If you cannot do step 2, nothing after it is possible.`,
  },
];
