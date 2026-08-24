---
name: font-match
description: Use when someone wants typography that feels like THEM. "find my fonts", "what fonts should I use", "figure out a font group for me", "make my type more techy / warmer / louder". Derives complete type identities from what you know about the person, renders them as a live HTML audition with their own words, links where to get every font free, and iterates by dials until the system locks.
---

# Font match. A type system from who they are

Fonts read as personality. Your job is not to list nice fonts. It's to
figure out who this person is, propose 2–3 coherent type IDENTITIES, and
let them FEEL the difference in a rendered specimen using their own
words. Then turn dials until it locks.

## Step 1. Read the person, not their taste

Derive from EVIDENCE, in this order:

1. **What you already know.** Their content, their audience, what
   performs, what they screenshot (terminal output? photos? spreadsheets?),
   the register of their writing. Past conversation beats questionnaire.
2. **If you're fresh**, ask three questions, one at a time: What do you
   make and for whom? Which piece of your work are you proudest of (link
   or paste)? Three words your work should feel like. And one word it
   must NEVER feel like.
3. Watch for the gap between the brand they were SOLD and the person
   they ARE (an agency's "quiet luxury" on someone who posts terminal
   receipts). Name that gap out loud. It's usually why nothing has
   felt right so far.

## Step 2. Find the anchor

One font is usually already true to them. The builder who posts
receipts already lives in a mono; the illustrator already has a hand.
Name it, keep it CONSTANT across every group. It's the control variable
that makes the comparison fair.

## Step 3. Compose 2–3 identities

Each group is a complete system with a NAME and a one-line story ("The
Field Manual. The honest operator"), covering four roles max:

| Role | Job |
|---|---|
| Headline | The personality. One display voice only |
| Body | The conversation. Warm, readable |
| UI | Labels, buttons, chrome. Disappears politely |
| Data | Numbers, receipts, stats. Usually a mono |

Rules:
- **Free fonts only**. Google Fonts or Fontshare. Unless they say
  otherwise. If a perfect paid font exists, mention it, marked clearly.
- **Never the converged defaults as personality choices**: Inter,
  Roboto, Arial, Space Grotesk. They can be fallbacks, not identities.
- Never two display personalities in one group. One diva per stage.
- Every group must answer: *what does this say about the person?* If
  you can't write the story line, the group isn't an identity.

## Step 4. Build the audition

One self-contained HTML file. The design that works:

- Dark neutral page (#101010), one bordered card per group.
- **Same copy in every card, and it's THEIR copy**. Their real
  headline, their real stat, their real CTA. Auditioning fonts on
  lorem ipsum is auditioning nothing.
- Each card: mono kicker → headline → support line → UI chips (one
  primary, one ghost) → data row → a recipe line (`headline X · body Y
  · ui Z · data M`) and the story line.
- Load fonts via the CDNs:
  - Google: `https://fonts.googleapis.com/css2?family=Name:wght@300;700&display=swap`
  - Fontshare: `https://api.fontshare.com/v2/css?f[]=name@300,700&display=swap`
- Show it to them (serve locally / send the file). Never describe fonts
  in prose and call it done.

## Step 5. The dials

Ask which card is CLOSEST, then iterate with dial vocabulary: *techier,
warmer, louder, quieter, more premium, more handmade.* Rules for a dial
pass:

- Move ONE slot at a time and say where the quality now lives ("the
  tech lives in the body font; the serif keeps the authority").
- Keep the anchor font fixed so rounds stay comparable.
- Offer a full-commit option each round (e.g. mono headlines) alongside
  the safe option. People often want permission for the bold one.

## Step 6. Lock it

When they pick, output the locked system:

```
| Role | Font + weights | Get it |
|---|---|---|
| Headline | ... | https://www.fontshare.com/fonts/<slug>  or  https://fonts.google.com/specimen/<Name> |
| Body | ... | link |
| UI | ... | link |
| Data | ... | link |
```

Plus: the import strings ready to paste, a fallback chain for
environments that block CDNs (name the nearest Google-hosted cousin for
any Fontshare/licensed font), and one line of story for their brand doc.
Tell them to write it into wherever their agents look (CLAUDE.md, a
BRAND.md). A type system that lives in one person's head isn't a
system.

## What NOT to do

- Don't audition more than ~10 fonts per round or 3 groups at once.
  choice paralysis kills the lock.
- Don't let two rounds pass without something rendered.
- Don't flatter. If their favourite fights their identity ("trendy thin
  serif, dates fast"), say so with the reason.
