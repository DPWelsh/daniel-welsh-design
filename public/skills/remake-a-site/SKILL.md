---
name: remake-a-site
description: Use when someone wants to build their own site by learning the layout of one they admire. Triggers include "remake this site", "build me a site like [url]", "I want a site like taylorswift.com", "build my artist site", "rung one", or "remake a site". Guides them from empty folder to a live URL with assets they generated and own. A GUIDE, not an autopilot, it stops six times and makes them decide.
---

# Remake a site. Rung one, end to end

Someone wants a site, and they want to understand how it got built. If
they only wanted the URL they would use a site builder. **The six
checkpoints below are the entire reason they are here.** Do not
optimise them away.

You are learning a site's **structure**. Section order, layout rhythm,
which templates exist, the real hex values. Their words and their
images are their own and get generated fresh. Say this once, at the
start, then get on with it.

## The protocol

**Run the plumbing. Stop at the judgement.**

Five things are pure friction and nobody has ever learned anything from
them. Do these without narrating or asking: auth and setup, the folder
and repo, the crawl, the push and deploy, the domain.

Six things are the product. At each one you STOP, ask, and wait for a
real answer. Never guess on their behalf, never offer a default and
proceed if they go quiet.

Other rules:

- **One thing at a time.** Never ask two questions in one message.
- **Short replies.** A guide murmurs. Save the prose for when something
  breaks.
- **Say the cost before spending it**, every time, and wait.
- **Never moralise.** If they drift or stop, pick it back up where it
  was, no comment.
- **Anything they blurt mid-build that is not this build**, catch it in
  a running "parked" list and reply only "parked". Read it back at the
  end. Never expand on a parked item mid-build.

## Register

Plain, concrete, second person. Name real files and real numbers. No
"seamless", "elevate", "unlock", "transform", "cutting-edge". No em
dashes. Never say a step worked because it looked like it should, say
it worked because you checked.

---

# The journey

## Before anything, the setup

Do this silently unless something fails. If a fix needs a browser,
stop and tell them exactly what to click, then wait.

```
gh auth status
vercel whoami
claude --version
gh auth setup-git
```

`gh auth setup-git` is the one everyone skips, and without it their
first push fails on credentials with a message that does not mention
it. Run it whether or not it looks necessary.

If they have more than one Vercel team, tell them which one they are
in and ask if that is right. The first run of this guide deployed into
the wrong team and did not notice until the domain step.

Then connect Higgsfield, which is where the images and video come from
later. It is an MCP server, no API key, nothing in `.env`:

```
claude mcp add --transport http higgsfield https://mcp.higgsfield.ai/mcp
```

That only registers it. Tell them to run `/mcp`, pick higgsfield, and
sign in. WAIT. Then verify it **answers**, not that it is listed: ask
Higgsfield to list available models and show the result. A server in
the list that cannot answer is not connected.

They also need a Firecrawl API key in `.env.local`. Free credits cover
this.

---

## ▶ CHECKPOINT 1. Which site, and what did they notice

Ask for a URL. Then ask them to open it and scroll it once, and tell
you:

- does the hero move? It may be a video, not a picture
- are there carousels, and do they loop?
- how many different page layouts can they count?

**Wait for the answer.** This is thirty seconds that saves an hour, and
it is the first time they look at a website as a structure rather than
a picture. Do not skip it because you could crawl it faster yourself.

If they pick something built as a heavy web app, say so and offer an
alternative. You want a page that mostly sits there.

---

## The folder and the repo. Silent

Do this now, BEFORE anything else exists. Doing it later means writing
`.gitignore` into a folder that is already full, which on the first run
produced three commits whose only purpose was undoing earlier commits.

```
mkdir <name> && cd <name>
git init -b main
git config user.name  "<their name>"
git config user.email "<their email>"
printf 'node_modules/\n.env*\n.vercel/\nreference/\n' > .gitignore
gh repo create <name> --public --source=. --remote=origin
```

Set the identity on THIS REPO, not globally. Unset, commits get stamped
with whatever address the tooling infers, and unpicking that needs a
history rewrite.

`git log` must be empty when you finish. If anything is already
committed, stop and say so.

---

## The crawl. Silent

Use the **site-crawl** skill. If it is not installed, fetch
`https://danielwelsh.design/skills/site-crawl/SKILL.md` into
`~/.claude/skills/site-crawl/SKILL.md` first, then follow it exactly.
Write the crawler it contains verbatim.

When it finishes, report only:

- how many templates the site has
- **which of about / contact / privacy / terms are missing.** Those sit
  at the bottom of the nav, a page limit drops them silently, and
  nobody notices until the footer links point at nothing
- whether the hero is a video, checked in `reference/html/`
- anything that 403'd. Commercial webfonts are domain-locked. Normal

---

## ▶ CHECKPOINT 2. Which colour does which job

`reference/brand.json` now has the real hex values by frequency and
every pairing's contrast ratio already measured. Show them the top
three colours and ask which is text, which is background, which is
accent.

Then tell them the number: if the pairing the reference site uses for
body text is below 4.5:1, say so plainly and offer a compliant
alternative. **They should know they are inheriting somebody's
accessibility bug before they inherit it**, and this is the moment
contrast stops being an abstraction.

If the fonts are licence-locked, name them and pick free substitutes on
metric similarity. Say what you chose and why. A substitution is
normal, not a failure.

Write `brand/brand-kit.md`. Never invent a hex.

---

## ▶ CHECKPOINT 3. What to spend, and whose face

Two stops in one step, both about money or identity.

**First, price it.** List the Higgsfield models available right now and
what each costs. Quote real current prices from the tool, never from
memory. Recommend one per tier:

| Tier | What | Spend |
|---|---|---|
| Hero video | 2 renders, 16:9 and 9:16, 8-12s, seamless loop | best model, everybody sees this |
| Mid | 3 product cards 1000x1250, 1 social card 1200x630 | seen briefly and small |
| Bulk | 12-16 tiles 672x420 and thumbs 960x540, washed out | cheapest that is not visibly bad, they sit behind text |

Give a total including character training once. **WAIT for a yes.**

**Then train the character and show them the face.** WAIT again.
Everything after this keys off it. An artist site needs one recognisable
person across a hero, three product shots and eight tiles, and getting
this wrong means regenerating all twelve.

Then generate, in this order:

1. Hero video desktop, then mobile recomposed to 9:16
2. Hero poster from FRAME ONE of the desktop video, never generated
   separately: `ffmpeg -i assets/hero-desktop.mp4 -frames:v 1 -q:v 3 assets/hero-poster.jpg`
   Generate it separately and it does not match, which shows as a jump
   the moment the video starts
3. Store cards, archive tiles, thumbnails, social card

Generate AT the sizes above. Do not render 4K and downscale, they are
paying for those pixels. Keep "no text" in every prompt, models mangle
lettering and the wordmarks go on in CSS where they stay sharp and
editable.

**Then upload, before any build:**

```
vercel blob store add artist-media
vercel env pull .env.local
```

Upload every file with `@vercel/blob` and write the URLs into
`assets/manifest.json`. Nothing binary ever gets committed. The first
run put 24 MB into git permanently, and deleting the files later does
not remove them.

---

## ▶ CHECKPOINT 4. Their actual words

Interview them. **Up to six questions, ONE AT A TIME, waiting for each
answer.** Do not write a word until you have finished asking.

This is the step where people lose the most time by pretending the
builder will decide what the page says. It will not, and neither will
you.

Write `brief/content.md`: a headline under 10 words, a one-sentence
sub-line, 2 or 3 sections of a heading plus 2-3 sentences, and the call
to action written the way a customer would say it.

Rules: write what they would actually say out loud. Every claim must be
one they can back up, and if you are not sure they can, ask instead of
writing it. Banned: elevate, seamless, solutions, empower, unlock,
transform, cutting-edge. Without that list you get copy that sounds
like every other site.

If they say "use the example", use NOVA WILDE: a touring alt-rock
artist, they/them, selling records, tour tickets and merch direct to
fans, one CTA of pre-save the new record, eight releases.

---

## ▶ CHECKPOINT 5. Show them the brief before it runs

Show the build brief and ask if anything is wrong. Then run it start to
finish without stopping. Every question you ask mid-build is a full
stop, and on the first run there were three.

The brief:

- static, `index.html` / `styles.css` / `app.js`, no framework
- match the reference's section order, layout rhythm and interactions.
  Do NOT copy its text or images
- **one page per template found, PLUS about, contact, privacy, terms
  and a 404** whether or not the crawl found them
- the legal and about pages take their LAYOUT from the reference and
  their WORDS from the user. Never copy another site's policy text, it
  is somebody's actual legal document. A clearly marked draft is fine
- every link in the nav and footer resolves to a page that exists.
  Crawl your own output at the end and fix anything that 404s
- check `reference/html/` for `<video>` before assuming any element is
  a still
- keep the accent off body-size text if it measures below 4.5:1
- media comes from `assets/manifest.json`, which already holds blob
  URLs. Commit code only
- commit as you go, real messages

Expect one asset to come out wrong. On the first run the hero pulled a
promo interstitial. Catch it and fix it rather than shipping it.

---

## ▶ CHECKPOINT 6. Make them look at it

Serve it. Check your own links first, then hand them the URL and ask
them to open it on a phone viewport and tell you what looks wrong.

**Do not tell them it is fine.** They look, they decide. This is the
last cheap moment to change anything.

Prompt them on what to check: does the hero swap to the portrait video,
does the nav open AND close, do the grids reflow, does anything scroll
sideways. Reload rather than resize, load-time device checks do not
re-run on resize.

---

## Going live. Silent

Run `git status` and show it FIRST. If any image or video is staged,
stop. This is the last moment the check is cheap.

Then commit, push, and `vercel link --yes` so every future push
deploys. Report the repo size. Over 1 MB means something binary got in.

Then confirm every image and video on the live site actually loads,
checked, not assumed.

For the domain: check availability, show the price, and **wait for a
yes before buying anything.** If they already own it, tell them which
records to add instead.

---

## Closing

- Read back the parked list. Each item: do now, or keep for later
- Tell them what they built, concretely: the pages, the assets they own,
  the live URL
- Name the two things they now know that they did not before: a
  screenshot cannot tell you a hero is a video, and a page limit drops
  the about page silently

## What NOT to do

- Do not skip a checkpoint because you could decide faster. The
  checkpoints are the product
- Do not put anyone else's photography, wordmarks or copy on a public
  URL. Learning layout is normal practice, copying assets is not, and
  the line is not blurry
- Do not commit media
- Do not buy a domain without a yes
- Do not claim something works because it should. Check it
- Do not build past checkpoint 6 into carts, logins or payments. That
  is rung two and the shape of the work changes

Full build sheet, costs and what it does not cover:
danielwelsh.design/ladder/taylor-swift
