/**
 * The runbook content schema. One tutorial = one RunbookContent object.
 *
 * Authoring lives entirely in a content.ts; the renderer (Runbook.tsx) never
 * needs touching for a new tutorial. See README.md in this folder for the
 * three-step recipe.
 */

export interface RunbookBlock {
  filename: string;
  body: string;
}

export interface RunbookStep {
  id: string;
  /** Two-digit step number as printed: "00", "01"… */
  n: string;
  title: string;
  /** One line, shown under the title. Why this step exists at all. */
  why: string;
  /** Human estimate: "10 min", "1–3 hrs". Rendered with a leading ~. */
  time: string;
  /** Longer notes, shown above the checks. **bold** and `code` supported. */
  notes?: string[];
  /** Callout rendered in energy — the thing that bites. */
  warn?: string;
  /** Callout rendered in blue — the shortcut or the fix. */
  tip?: string;
  /** Kicker over the warn callout. Defaults to "Stop and think". */
  warnLabel?: string;
  /** Kicker over the tip callout. Defaults to "The fix". */
  tipLabel?: string;
  checks: string[];
  blocks?: RunbookBlock[];
}

export interface RunbookContent {
  /** Route segment; also namespaces localStorage ("<slug>-progress-v1"). */
  slug: string;
  /** Masthead numbering: "Routiq · Runbook № <number>". */
  number: string;
  /** Load-bearing: the date the whole thing was last re-verified. */
  verifiedOn: string;
  /** Headline, plain part. */
  title: string;
  /** Headline tail rendered in prompt blue: "unattended." */
  titleAccent?: string;
  lede: string;
  /** Mono meta line: "30–60 min for a working box · 2–4 hrs …". */
  timeTotal: string;
  /** Serif sign-off under the last step. */
  closing: string;
  steps: RunbookStep[];
}
