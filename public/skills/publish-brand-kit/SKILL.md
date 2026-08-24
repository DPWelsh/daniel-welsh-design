---
name: publish-brand-kit
description: Use when brand decisions exist (or were just made) and need to become usable. "publish my brand kit", "make a brand kit page", "put my brand somewhere my agents can use it", "update the brand kit". Builds the two-reader kit - a human page with live specimens and a machine-readable BRAND.md. Then keeps them in sync and sweeps the codebase for violations.
---

# Publish brand kit. One brand, two readers

A brand that lives in one person's head (or a PDF nobody opens) isn't a
system. Your job: publish it as TWO artifacts that can never drift
apart, then enforce it in the codebase.

## The two artifacts

**1. BRAND.md · the agent version.** One markdown file at a stable URL
(e.g. `/brand-kit/BRAND.md`). This is the source of truth. It contains,
in this order:
- Identity: exact wordmark rules, naming rules, banned phrases.
- Colors: name, hex, RGB, role. Plus the APPROVED combinations list
  ("do not freestyle other pairings").
- Typography: role → font → weights → where to get it. Import strings
  ready to paste. A fallback chain for every licensed or CDN-only font
  (name the nearest freely-hosted cousin. Never "any serif").
- Emphasis and device rules, each with the exact CSS value an agent can
  copy.
- Logo assets: real file URLs, when to use which variant, clear-space
  rule.
- A **banned list with reasons** ("colour-painted headline words. The
  X silhouette"). The reason is what stops an agent re-deriving the
  mistake.
- A closing paragraph: the whole system in prose, for agents that skim.

**2. The page. The human version.** Same URL minus the file. It
RENDERS everything BRAND.md states: real swatches, approved combos as
actual fg/bg tiles, type specimens in the actual fonts, the emphasis
rule as side-by-side demos, real logo files on their correct
backgrounds, an Always/Never panel. Top of page: a copy-block with the
one-line agent prompt. "Fetch <BRAND.md URL> and follow it exactly."

## The laws

1. **BRAND.md is truth; the page is its proof.** Any decision changes
   BOTH in the same commit, or neither.
2. **Practice what it preaches.** The page's own headings use the brand
   fonts. The wordmark on the page is the real SVG. Never typed. If
   the kit bans a pattern, the page must not contain it. Check this
   explicitly before shipping; self-violation is the most common bug
   (we've caught a typed wordmark AND a banned emphasis pattern on our
   own kit page).
3. **Vendor what you're allowed to.** Free fonts with permissive
   licenses (e.g. Fontshare) get downloaded into the repo and loaded
   locally. No CDN dependency. Licensed fonts stay local with a
   documented public fallback.
4. **Date the decisions.** "Locked 2026-08-07", "X replaced Y (2026-08)".
  Agents and future-you need to know which rule wins.

## The enforcement sweep

Publishing isn't done until the codebase agrees. After any brand change:

1. Grep for the retired thing: the old font variable, the banned hex,
   the deprecated pattern. Count the hits before promising anything.
2. Migrate at the variable level where possible (swap what
   `--font-heading` resolves to, not 40 class names). Watch for
   framework traps. E.g. Tailwind arbitrary values break on spaces:
   `font-[family-name:var(--a),var(--b)]`, no space after the comma.
3. Name the exceptions out loud (a signature that genuinely needs an
   italic serif; a legal doc). Exceptions are fine; silent ones aren't.
4. Verify RENDERED, not just compiled. Screenshot the real pages.
   A broken font class falls back silently and lint won't catch it.
5. Keep a migration list in the kit's memory/notes for what's
   deliberately not swept yet (other repos, legacy content), so it's a
   queue, not a surprise.

## The companion skill

Ship a small `use-my-brand`-style skill alongside: a pointer skill
whose whole job is "fetch BRAND.md, follow it exactly, stop and ask if
a need falls outside it." That's what makes the kit reach agents who've
never seen this conversation.

## What NOT to do

- Never publish a kit page whose values are hand-copied from the real
  system "for now". Hand copies ARE the drift.
- Never state a rule without its exact value (hex, CSS, URL). "Use the
  accent sparingly" is a vibe; `inset 0 -0.16em 0 0 rgba(201,139,122,0.9)`
  is a rule.
- Never delete the old system's record. Retired ≠ erased. Someone has
  to read legacy work next year.
