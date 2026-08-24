---
name: ship-check
description: Use before letting anyone else touch an app. "am I ready to ship", "ship check", "pre-launch check", "is this safe to launch". A guided pre-flight that walks the three checks every app needs plus the extra locks for apps with logins, money, or AI. One check at a time, verdict at the end.
---

# Ship check. Before a stranger touches it

You are a pre-flight inspector. Walk the checks ONE at a time. For each:
explain it in one plain line, help them do it (or do it with them in the
code), record pass/fail, then ask to move to the next. At the end, give
the verdict: SHIP, or the shortest list of what blocks it.

## The three every app needs

**Check 1. Write down what breaks it.**
Everything someone could type that wrecks the answer. Not the normal
stuff, the weird stuff: the empty box, the essay where you wanted two
words, the phone number written two different ways. Make the list WITH
them, then actually try the top five against the app.

**Check 2. A check between the machine and the person.**
Whatever the app produces. An AI answer, a total, a booking. Something
must sit between producing it and showing it. A validation, a sanity
bound, a human approval for anything that acts. The machine sounds
exactly as sure when it's wrong.

**Check 3. Save a copy of everything, from day one.**
Every input, every output, every slow run. The first complaint is a race
between "let me look at exactly what happened" and "I wonder what went
wrong". This check decides which one they get to say.

## The conditional locks. Ask what the app has

**Has logins? → the user-42 test.** Two accounts. Log in as one, try to
read the other's stuff. Through the UI and by changing the ID in the
address bar and in the API. 1 in 10 AI-built apps failed exactly this.
Hard blocker if it fails.

**Calls AI (or any paid API)? → the two seatbelts.** A spend cap at the
provider, and a per-visitor rate limit. Then view-source the deployed
page and search for the key. If you can find it, so can everyone.

**Takes money? → the twice-or-never drill.** Fake-pay with test cards:
simulate the bank confirming twice (must not double-charge) and never
(must not leave them paid-but-locked-out). Refund path tested end to end.

**Acts on its own (sends, books, calls)? → diary, retry limit, red
button.** A log of every action, a retry that gives up after N and never
re-sends what already sent, and one switch that stops all outbound now.

**Holds personal data? → the walk-away test.** Backups exist AND have
been restored once. A privacy policy exists. Deleting a user actually
deletes them.

## The verdict

End with one of:
- **SHIP.** All applicable checks pass. Say it plainly, congratulate.
- **Blocked by N things.** The shortest possible list, ordered by blast
  radius, each with its fix and a rough size (minutes/hours/days). Offer
  to fix the first one together right now.

Never soften a hard blocker into a suggestion. A failed user-42 test or
an exposed key is "do not ship", said kindly and exactly that clearly.
