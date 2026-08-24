---
name: use-my-brand
description: Use when building ANYTHING visual for Routiq. Pages, decks, carousels, overlays, mockups. Or when the user says "use my brand", "make it on-brand", "brand kit". Fetches the canonical Routiq brand kit and applies it exactly: palette, type system, real logo SVGs, naming rules.
---

# Use my brand

Before designing anything, fetch the source of truth:

```
https://danielwelsh.design/brand-kit/routiq/BRAND.md
```

Follow it exactly. Summary of what you'll find (the fetched file wins if
they ever disagree):

## The four decisions already made for you

1. **Colors.** Core `#1a1c12` (dark surfaces), Cloud `#ededeb` (light
   surfaces), Prompt `#7ba2e0` (anything interactive), Blackberry
   `#472424` (secondary dark), Clay `#C98B7A` (accent garnish, never a
   wall). Only the five approved fg/bg combos. Never freestyle pairings.
2. **Type. The Field Manual system.** Zodiak Black for headlines
   (Fontshare, free). Acid Grotesk Light for editorial body (licensed.
   in Routiq repos at `public/fonts/acid-grotesk-light.otf`; without
   the license fall back to Hanken Grotesk 300, Google). Satoshi for UI
   labels/buttons (Fontshare, free). JetBrains Mono for every number
   that matters (Google). CDN-blocked fallbacks: Zodiak → Fraunces 900;
   Satoshi → Hanken 500. Playfair and Inter are retired. Never carry
   them into new work. Raptor V3 is not retired, it belongs to
   Daniel Welsh's personal brand (danielwelsh.design/brand-kit/daniel/BRAND.md).
   Never use it for routiq., and never use Zodiak for him.
3. **Logo.** A real SVG from `danielwelsh.design/brand-kit/logos/`. Never
   the word "routiq." typed in a font. Clear space ≥ the trailing dot.
   No tagline, ever.
4. **Names.** "routiq." lowercase with the period. Robyn (she/her) is the
   Reception Assistant. "Assistant", never "Receptionist". Banned:
   "ai automation studio", "intelligence layer", "AI clinician",
   "behavioural science engine".

## Working rules

- **Headline emphasis is never a text colour** (a Clay word in an ink
  headline = the Claude silhouette. Banned). Default: the word goes
  italic, same ink. Heroes/covers: ink roman word with a Clay
  marker-stroke under it (`box-shadow: inset 0 -0.16em 0 0
  rgba(201,139,122,0.9)`).

- If a design need falls outside the kit (a sixth color, a new font
  role), STOP and ask. Don't invent an extension.
- Legacy routiq. assets exist in Energy `#7d312d` and Raptor V3 Black
  type. Don't copy them forward; migrate to Clay `#C98B7A` and Zodiak
  Black. Energy is retired everywhere. Raptor is not retired, it is now
  the founder brand's display face, so it is simply wrong here rather
  than dead. Playfair is retired and is only a CDN-blocked fallback,
  never a migration target.
- When handing off work, note which combos/fonts you used so the next
  agent can verify against BRAND.md.
