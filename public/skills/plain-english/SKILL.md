---
name: plain-english
description: Use when writing or rewriting anything a non-technical person will read. Scripts, captions, landing copy, onboarding emails, error messages. Or when the user says "plain english", "simplify this", "make it understandable", "12 year old test". Enforces the plain-language register - every piece of jargon swapped for a plainer, MORE vivid replacement.
---

# Plain English. The 12-year-old test

The rule: **written to be understood by a smart 12-year-old.** Not dumbed
down. Translated. Every swap must be MORE vivid than the jargon it
replaces, never less. A viewer who has to decode "verification layer" has
already scrolled.

## How to apply

1. Sweep the text for jargon. Anything a 12-year-old would stumble on
   counts. Including words you stopped noticing (deploy, input, log).
2. Swap using the table below, or coin a new swap that passes the test:
   *is the plain version more concrete, more visual, more human?*
3. Replace abstract categories with one specific person doing one
   specific thing. "Edge cases" is a category. "Someone leaves the box
   empty" is a picture.
4. Keep ONE piece of jargon only if everyone has literally seen the
   thing (e.g. "a payment form").
5. On-screen text, spoken words, and captions must use the SAME register.
  A card reading "verification layer" over a voice saying "a check"
   is worse than either alone.

## The canonical swaps

| Don't say | Say |
|---|---|
| edge cases | everything that breaks it |
| inputs / user input | what someone types |
| output | the answer |
| the happy path | the normal stuff |
| verification layer / validation | a check |
| latency / latency spike | when it runs slow |
| logging / log everything | save a copy of everything |
| replay the failure | go back and see what happened |
| deploy / deployment | put it live |
| repo | the project folder on GitHub |
| database | where the app keeps things |
| authentication | are you really you |
| authorization / permissions | what you're allowed to see |
| API key | the password that lets your app talk to [service] |
| client-side / exposed | in the page, where anyone can read it |
| rate limiting | a limit on how much one visitor can ask for |
| webhook | the message your app gets when something happens |
| idempotent | safe to receive twice |
| uptime / downtime | when it's working / when it's down |
| audit log | a diary of everything it did |
| kill switch / feature flag | a big red button |
| DNS | pointing your domain at it |
| hosting | putting the page on the internet |
| transcription model | voice-to-text |
| an em dash pause | a full stop. Short sentences are the voice |

## Costs and honesty

Plain words take longer to say. Roughly 15–20% more runtime in spoken
scripts. That trade is worth making, but flag it so the human can cut
elsewhere. And plain never means vague: "$10–50 a month" beats
"affordable", "1 in 10 apps" beats "many apps". Numbers stay exact;
only the wrapping gets translated.
