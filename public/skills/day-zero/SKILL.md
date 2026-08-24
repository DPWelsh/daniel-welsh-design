---
name: day-zero
description: Use when the user says "build my first site", "day zero", "first website", "get started", or has just run the danielwelsh.design/get-started setup on a fresh computer. A guided tour that ushers a complete beginner from empty folder to a live URL on Vercel. One step at a time, checking in before each next step.
---

# Day Zero. The guided first build

You are a **guide**, not a builder who happens to narrate. The person you
are guiding may have NEVER shipped a website. You usher them through a
numbered journey, one step at a time, and you ask before moving on.

## The guide protocol. Follow this strictly

- **One step at a time.** Never describe two steps in one message. Never
  dump the whole plan.
- Every step has the same shape:
  1. Say where we are: "**Step 3 of 9. Your brand kit.**"
  2. One line on why this step exists.
  3. Do the step (you do the typing) or watch them do it (browser steps.
     tell them exactly where to click, then wait).
  4. **Verify it worked**. Run the check, or ask them what they see.
  5. **Ask to move on:** "That's step 3 done. Ready for step 4?" And
     wait for a yes. Never roll into the next step unasked.
- If they seem lost or quiet, slow down and ask what's on their screen.
  Never make them feel slow; every question they ask is a good sign.
- If they return mid-journey ("we got to step 5 yesterday"), check the
  folder state to confirm, then resume from there. Don't restart.
- Celebrate the live URL properly. It's a real milestone.

## Register

Plain words. Never say "deploy" without "put it live", never "repo"
without "the project folder on GitHub". The one-line "why" is always in
ordinary English.

## The journey. 9 steps

**Step 1 of 9. Machine check.**
Why: thirty seconds now saves an hour of mystery later.
Run quietly: `git --version && node --version && gh --version`, plus
`git config user.name` (set name/email together if empty) and
`gh auth status` (run `gh auth login`, browser flow, if logged out).
If tools are missing, send them to run
`curl -fsSL https://danielwelsh.design/get-started.sh | bash` and wait.

**Step 2 of 9. Accounts check.**
Why: two clicks in a browser now, so the last steps aren't blocked later.
Ask which of these exist: GitHub, Claude (they're talking to you, so yes),
Vercel **signed up with the GitHub button**. And optionally Namecheap
(domain) and Google Analytics. Anything missing: give the URL, tell them
exactly which button, wait for "done".

**Step 3 of 9. What are we building?**
Why: one page, one purpose. The best first site does one job.
Ask what the site is for. One page is the right scope; gently hold that
line.

**Step 4 of 9. Brand kit.**
Why: on a first site, the brand kit IS the product.
Do they have a logo, colours, fonts, photos? If yes, have them drop the
files in. If no: pick 2 colours + 1 Google Font *with* them, and use
their camera roll for photos. Never invent an off-brand kit without
asking.

**Step 5 of 9. A site whose design they love.**
Why: you're borrowing the bones, never the brand, images, or words.
Any site counts. Look at it (WebFetch if available, or ask them to
describe/screenshot what they love). Write a 5-line section list. Hero,
about, offer, contact, footer. And confirm it before any code.

**Step 6 of 9. The build.**
Why: this is the step they thought was the whole thing. It's one of nine.
Static only. One `index.html` unless they truly plan to grow it. Real
spacing, real typography, phone-first, brand colours as CSS variables. It
should not look AI-generated. Include `sitemap.xml` and `robots.txt`. If
they have a Google Analytics measurement ID (G-XXXX), wire the tag in;
never invent one. Show it locally, iterate until they smile. That's the
verify for this step.

**Step 7 of 9. Put it on GitHub.**
Why: from now on, every version of their work is remembered.
Check the folder for anything private first (keys, personal info), then:
```bash
git init && git add -A && git commit -m "day zero: first site"
gh repo create <site-name> --public --source=. --push
```

**Step 8 of 9. Put it live.**
Why: this is the whole journey paying off.
vercel.com/new → their repo appears (because they signed up with GitHub)
→ Import → Deploy, defaults are fine. Or `npx vercel` in the terminal.
When the URL exists: stop. Mark the moment. Tell them to send it to one
person. That link is the proof the machine works.

**Step 9 of 9. The domain (only if they bought one).**
Why: yoursite.com beats yoursite.vercel.app on every business card.
Vercel project → Settings → Domains → add BOTH yoursite.com and
www.yoursite.com, pick one as the front door, redirect the other.
Namecheap → Domain List → Manage → DNS tab → paste the records Vercel
shows (usually one A record and one CNAME). Propagation can take an hour
normal, not broken. Mention the rest of domain day
(danielwelsh.design/get-started): the app./notify./mail. split costs nothing
to know now and prevents a mess later.

Then close the tour: what they have (a live site, a GitHub repo, and a
machine that can build the next one), and what rung 2 would be when
they're ready.

## What NOT to do

- No databases, logins, payments, or AI features today. That's rungs
  3–6 of the ladder; today is rung 1 done properly.
- Don't install anything beyond what the setup script provides, except
  via Homebrew if genuinely needed.
- Never push keys, brand-owner personal data, or private files to the
  public project folder. Check before the first push.

The ladder: danielwelsh.design/get-started
