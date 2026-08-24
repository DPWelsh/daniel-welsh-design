---
name: pick-a-stack
description: Use when someone is choosing infrastructure for an app — "what stack should I use", "should I self host this", "is Supabase or Neon right for me", "what do I use for auth/database/payments", "pick my stack", "am I on the wrong stack". Places them in one of three columns for nine jobs and tells them which swaps to make and, more often, which to refuse.
---

# Pick a stack

Nine jobs. Three answers each. Most people should be in column one and
are being talked out of it by comment sections.

**The whole method: name the forcing function, or do not swap.** Every
migration below is something you do because a bill or a limit made you,
never because a stack is "better". If nobody can name what forced it, the
answer is stay.

## Step 1. Which column are they in

Ask two questions, one at a time. Do not guess.

| Column | When | Cost | The catch |
|---|---|---|---|
| **Starter** | You have shipped something and it has users you can count. | mostly free tiers | Nothing. Stay far longer than you think. |
| **Self hosted** | One bill has started to sting, or the data cannot leave your box. | about $15/mo | You just became your own DevOps team. |
| **At 10,000 users** | A limit or an invoice forced your hand. Not before. | whatever the invoice says | Six of nine move, three do not. |

**If they have not shipped, they are Starter.** Say so plainly and stop
there. Nothing on this page matters until people are using the thing.

## Step 2. The nine jobs

| # | Job | Starter | Self hosted | At 10,000 |
|---|---|---|---|---|
| 1 | Database | Supabase | Supabase, self hosted | **Neon** |
| 2 | Coding | Claude | Ollama + an open model | Claude stays |
| 3 | Front end | Vercel | Coolify on a $10 box | **Cloudflare** |
| 4 | Back end | Railway | the same box | **AWS** |
| 5 | Getting paid | Stripe | — | Stripe stays |
| 6 | Voice AI | ElevenLabs | Kokoro | ElevenLabs stays |
| 7 | Phone lines | Twilio | Asterisk | **Telnyx** |
| 8 | Bugs | Sentry | GlitchTip | **Datadog** |
| 9 | Session replay | PostHog | OpenReplay | **Amplitude** |

The three that never move: **coding, payments, voice**. If someone is
planning to migrate one of those to save money, that is the conversation
to have instead.

Details worth saying out loud when the job comes up:

- **Database.** Supabase is open source, so owning it is a Docker command.
- **Front end.** The one swap everybody agrees on. Cloudflare at scale.
- **Back end.** Self hosted, two subscriptions collapse into one server.
  At scale you do not swap Railway for Render, you swap it for a bill.
- **Payments.** Nobody self hosts card processing. You will IPO before you
  outgrow Stripe.
- **Voice.** Kokoro is 82M params, Apache 2.0, runs on a CPU.
- **Phone.** You can self host Asterisk. You probably will not. At volume
  Telnyx is the same job for roughly half.
- **Bugs.** GlitchTip is Sentry compatible, so you swap the DSN and move on.
- **Session replay.** PostHog themselves say the self hosting maths rarely
  works. Believe them.

## Step 3. The self host test

> Self host the ones where the bill hurts and the blast radius is small.
> Rent anything that touches money, deliverability, or a pager you do not
> carry.

**Yes, if any of these are true:**

- One line item now costs more per month than a server would.
- The data legally cannot sit on someone else's infrastructure. Health,
  government, EU residency.
- You already run a box and you have actually restored a backup, not just
  taken one.
- The tool is open source AND ships a maintained Docker image. Both.
- Usage is steady. Self hosting punishes spiky traffic.
- You are moving one or two services. Not nine.

**No, and do not argue, if any of these are true:**

- You have not shipped yet.
- You have never restored a backup. Taking one is not the same skill.
- The saving is under about $50/month. Their evening is worth more.
- It is payments. Never. Not once. Not ever.
- It is email deliverability. Domain reputation is not worth the experiment.
- It is on the critical path and nobody is on call at 2am. That includes
  them, asleep.

## Verdict format

Keep it short. They asked a stack question, not for an essay.

- **Column:** starter / self hosted / at 10,000, and the one sentence why.
- **Swap now:** the jobs with a named forcing function. Usually zero.
- **Leave alone:** everything else, named, so it reads as a decision rather
  than an omission.
- **The trap:** the one swap they are most likely to make for the wrong
  reason, and what it will cost.

## Do not

- Do not recommend a migration nobody was forced into.
- Do not let a comment section be the forcing function. "Seven people said
  Cloudflare" is a reason to look, not a reason to move.
- Do not self host payments or email. There is no version of this where
  that is the right call.
- Do not price a swap without asking what the current bill actually is.

Full table, costs and the self host list: danielwelsh.design/stacks
