/* ── /easy · Field Guide № 005 ────────────────────────────────────────
   Payload for the EASY keyword (Clinic 01, "3 easy automations").

   Audience: allied health clinic owners. Physio, chiro, podiatry, psych.
   Not developers. The reel promised an afternoon and zero dollars, so
   every path here has a free option and none of them need code.

   PROSE RULES (same as /launch, and load-bearing):
   no em dashes, one idea per sentence, instruction first and reason
   second. The reader runs a clinic and is doing this between patients.

   CLAIMS: product tiers and menu names move. Anything version-sensitive
   says "at the time of writing" or tells the reader to look at the thing
   in front of them rather than trusting this page. Compliance section is
   grounded in docs/ahpra/ruleset.md §7 (the testimonial structural test),
   not in memory. */

export const LEDE =
  "Three automations you can set up this afternoon. None of them need code. Two are free forever and the third is free unless your practice software makes you pay for it. Do them in this order, because the first one takes fifteen minutes and makes the other two feel possible.";

export const BEFORE = {
  h: "Before you start",
  lines: [
    "You do not need to be technical. If you can book a flight online you can do all three of these. Where something genuinely needs a technical person, this page says so instead of pretending.",
    "Sit at a computer, not your phone. Two of the three are fiddly on a phone and quick on a laptop, and the settings you change on a laptop apply to your phone anyway.",
    "Block ninety minutes and do them in order. Number one is the confidence builder. Number three is the one everybody skips, which is why it is last and why it carries the longest warning.",
    "Nothing here asks you to buy anything. Two of the three use software you are already paying for and have never opened the right screen of.",
  ],
};

/* ── the software table ─────────────────────────────────────────────── */

export interface Pick {
  job: string;
  tool: string;
  cost: string;
  why: string;
}

export const PICKS: Pick[] = [
  {
    job: "Email clean up",
    tool: "Gmail filters, or Outlook rules",
    cost: "Free, already installed",
    why: "It is built into the inbox you already use. Nothing to sign up for and nothing to connect.",
  },
  {
    job: "Daily sales report",
    tool: "Your practice software first. Make.com if it cannot do it.",
    cost: "Free tier covers one daily run",
    why: "Scheduling is the entire job. Check your own reports menu before you build anything, because a scheduled report is a two minute job and a built one is twenty.",
  },
  {
    job: "Google reviews",
    tool: "Google Business Profile alerts, plus Claude for drafting replies",
    cost: "Free",
    why: "The alert is native and instant. The drafting is the part that actually saves you time, because replying is the bit everyone puts off.",
  },
];

export const PICKS_NOTE =
  "Two names you will see recommended elsewhere, and why they are not the pick here. Zapier is the better known tool, but at the time of writing its free plan only runs single step automations, and the daily report needs more than one step. n8n is more powerful and self hosting it is free, but you have to run a server, which is a project rather than an afternoon.";

/* ── the three ──────────────────────────────────────────────────────── */

export interface Step {
  n: string;
  body: string;
}

/** The Claude path. This is the tutorial, not a footnote: for a reader who
 *  is not technical, asking is a lower wall than configuring. */
export interface ClaudeWay {
  setup: string;
  prompt: string;
  after: string;
}

/** An alternative tool. Scores are real, sourced and dated, because a
 *  recommendation with no evidence behind it is just my opinion in a box.
 *  They also move, so every one links out for the reader to check. */
export interface Alt {
  name: string;
  score: string;
  note: string;
  url: string;
}

/** Tutorials are YouTube SEARCHES, not video links, on purpose. A named
 *  video rots the month its uploader renames it or the UI changes. A
 *  search stays correct and puts the most recent walkthrough on top. */
export interface Watch {
  label: string;
  q: string;
}

export interface Auto {
  n: string;
  id: string;
  title: string;
  time: string;
  what: string;
  need: string;
  claude: ClaudeWay;
  alts: Alt[];
  watch: Watch;
  steps: Step[];
  done: string;
  /** What to do when the screen does not match the instructions. Written
   *  because a non technical reader assumes they broke it, and stops. */
  stuck: string;
  warn?: { h: string; body: string[] };
}

export const AUTOS: Auto[] = [
  {
    n: "01",
    id: "email",
    title: "Email clean up",
    time: "15 minutes",
    what: "Your inbox stops being a to do list written by strangers. Newsletters, receipts and software notices go somewhere else automatically. What is left is mail an actual person sent you.",
    need: "Gmail, or Outlook. Nothing else.",
    claude: {
      setup:
        "Open Claude, go to Settings and then Connectors, and switch on Gmail. It asks you to sign in to Google once. Claude can then read your mail and write drafts, and it cannot send anything. Drafts land in your Gmail for you to press send on.",
      prompt: `Look at my inbox from the last 30 days.

Tell me the 10 senders taking up the most space
that are not actual people writing to me.

For each one give me:
- the sender name and email address
- roughly how many emails they sent
- whether I have ever replied

Then tell me which ones are safe to filter out
of my inbox, and which ones I should keep seeing.`,
      after:
        "Now you have your list without hunting for it. Go and make a filter for each one using the steps below. Claude found them, you spend two minutes filing them.",
    },
    alts: [
      {
        name: "Clean Email",
        score: "4.4 on G2 · headers only · self funded",
        note: "The one to look at first if you want a tool. It reads envelopes only, meaning sender, subject, date, and says it never reads message bodies. Self funded, based in Los Angeles, and it became well known in 2017 as the tool people moved to after the Unroll.me scandal.",
        url: "https://clean.email/privacy",
      },
      {
        name: "SaneBox",
        score: "4.9 on G2, from 179 reviews",
        note: "The highest rated and the most hands off, because it learns what matters and sorts future mail for you. It does hold your data for 90 days after you stop using it, and it will not clear an existing backlog.",
        url: "https://www.g2.com/products/sanebox/reviews",
      },
      {
        name: "Unroll.Me. Do not use this one.",
        score: "FTC settlement, 2019",
        note: "It is still recommended in half the listicles, so it is here to be ruled out. The FTC found it told users it would not touch their personal emails while passing their e-receipts to its parent company to sell as market research. It settled in 2019. That is a consumer inbox story. On a clinic inbox it is a notifiable one.",
        url: "https://www.ftc.gov/news-events/news/press-releases/2019/08/ftc-finalizes-settlement-company-allegedly-deceived-consumers-about-how-it-accesses-uses-their-email",
      },
    ],
    watch: {
      label: "Watch someone do it",
      q: "gmail filters skip inbox label tutorial",
    },
    steps: [
      {
        n: "1",
        body: "Open Gmail on a computer, not your phone. This one is fiddly on a phone and takes two minutes on a laptop. Click into the search box at the top and type the word unsubscribe, then press enter. Everything that comes back is a machine talking to you. That is your list.",
      },
      {
        n: "2",
        body: "Click the first email in that list to open it. Look at the top right of the message itself, not the top of the screen, and find the three little dots. Click them. A menu drops down.",
      },
      {
        n: "3",
        body: "In that menu choose Filter messages like these. A box opens with the sender's address already filled in for you. You do not need to type anything. Click Create filter at the bottom right.",
      },
      {
        n: "4",
        body: "Now tick two boxes: Skip the Inbox, and Apply the label. When you tick the label one it asks you to choose a label, so click New label and call it Reading. Then tick Also apply to matching conversations, which is the one that cleans up the ones already sitting in there. Click Create filter.",
      },
      {
        n: "5",
        body: "That sender is now handled forever. Go back to your search results and do the same four clicks for the next one. Do five senders and stop. Five is enough to feel the difference, and you can always do more next month.",
      },
      {
        n: "6",
        body: "Last job. In the search box type is:unread older_than:30d and press enter. Tick the box at the very top left to select everything, then click the Archive button, which is the box with the down arrow. Archive is not delete. Every one of those emails is still findable in search. You just will not be looking.",
      },
    ],
    done: "Open your inbox tomorrow morning. If everything sitting in it was typed by an actual person, it worked.",
    stuck: "If your Gmail looks different, you are probably on the phone app, where the three dots menu does not offer filters. Do it on a computer once and it applies everywhere, phone included. On Outlook the same job is called Rules and lives under the Settings gear.",
    warn: {
      h: "Before you connect anything to a clinic inbox",
      body: [
        "Gmail filters and the Claude connector are the only two options above that do not hand a new company access to your mail. The filters run inside Google, who already host your email. Claude reads what you ask it to and writes drafts you send yourself.",
        "The tools sell a reassurance that does not survive contact with a clinic inbox. Clean Email says it reads envelopes only, never message bodies, and that is genuinely better than the alternative. But an envelope is the sender, the subject and the date, and in your inbox the subject line is the sensitive part. Referral for lumbar MRI, and a surname, is a clinical fact sitting in a field the tool is allowed to read.",
        "So the question is not whether a tool is trustworthy. It is whether you can defend the decision to give a third party standing access to patient names and appointment subjects, in writing, to someone who asks. Sometimes the answer is yes and you document it. Often the honest answer is that five filters did the job and you did not need to.",
        "Unroll.me is on the list above only so you can rule it out. It is still widely recommended, and the FTC found it did exactly the thing everyone assumes these tools would never do.",
      ],
    },
  },
  {
    n: "02",
    id: "report",
    title: "Daily sales report",
    time: "2 minutes, or 20 if you have to build it",
    what: "One message each morning with yesterday in it. Bookings, cancellations, and what came in. You stop opening the practice software to find out what happened.",
    need: "Your practice management software. Make.com only if that software cannot schedule a report.",
    claude: {
      setup:
        "You do not need a connector for this one. Claude's job here is to tell you whether your own software can already do it, which saves you building something you did not need. Open Claude and tell it what you use.",
      prompt: `I run a physio clinic and we use Cliniko.
Change that to whatever software you actually use.

I want one message emailed to me every morning at 7am
with yesterday's numbers: appointments booked,
cancellations, and money taken.

Can Cliniko email a report on a schedule by itself?
If yes, tell me exactly where to click to set it up.
If no, say so plainly and tell me the simplest way
to do it without writing any code.

I am not technical. Assume I have never used
an automation tool before.`,
      after:
        "If the answer is that your software can do it, go and click those buttons and you are finished. If it cannot, the steps below build it in Make.",
    },
    alts: [
      {
        name: "Make.com",
        score: "4.6 out of 5 on G2, from 274 reviews",
        note: "The pick here. You drag boxes around instead of writing code, and the free tier easily covers one run a day.",
        url: "https://www.g2.com/products/make-formerly-integromat/reviews",
      },
      {
        name: "Zapier",
        score: "4.5 out of 5 on G2, from 1,877 reviews",
        note: "Better known, more apps connected, and easier to read. Not the pick because its free plan runs single step automations at the time of writing, and this one needs several.",
        url: "https://www.g2.com/products/zapier/reviews",
      },
      {
        name: "n8n",
        score: "Free if you run it yourself",
        note: "The most powerful of the three and the only one you can host on your own server. Skip it unless you have someone technical, because running the server is the job.",
        url: "https://n8n.io/",
      },
    ],
    watch: {
      label: "Watch someone build one",
      q: "make.com scheduled scenario send daily report email tutorial",
    },
    steps: [
      {
        n: "1",
        body: "Try the two minute version first, because most people never check and end up building something they did not need. Log in to your practice software and find the Reports menu. Look for a report that covers a day, usually something like Appointments or Daily takings.",
      },
      {
        n: "2",
        body: "Open that report and look at the buttons around it for the words Schedule, Subscribe, or Email this report. If one of those exists, click it, choose daily, set the time to 7am and put in your own email address. You are finished. Genuinely. Skip the rest of this section.",
      },
      {
        n: "3",
        body: "Only if there is no schedule option, go to make.com and create a free account. On your dashboard click Create a new scenario. It will show you an empty circle with a plus in it. That circle is the thing that starts your automation.",
      },
      {
        n: "4",
        body: "Click the circle and search for Schedule. Choose Every day and set the time to 7am. This is the part doing the real work. Everything after it is just deciding what the message says.",
      },
      {
        n: "5",
        body: "Click the plus to add the next step and type the name of your practice software into the search. If it appears in the list, click it and follow the sign in prompts, then choose the action that lists yesterday's appointments.",
      },
      {
        n: "6",
        body: "If your software does NOT appear in that list, stop here. Connecting it manually means API keys, and that is a genuinely technical job, not a fifteen minute one. This is the point to ask whoever does your IT, or to leave this automation for later. Number one and number three are still worth your afternoon.",
      },
      {
        n: "7",
        body: "Add one last step, search for Email, and set it to send to yourself. Only yourself. The message will contain patient numbers, so it does not go to a shared or reception inbox.",
      },
      {
        n: "8",
        body: "Click Run once at the bottom left before you turn anything on. Read the email that arrives and check the numbers against what you see when you log in. If it is wrong today it will be wrong every morning for a year, and you will stop trusting it by Thursday.",
      },
    ],
    done: "A message lands tomorrow at 7am and the numbers in it match what you see when you log in.",
    stuck: "If the report in your software shows the right numbers but will not schedule, that is normal and not your fault. Plenty of practice software can show a report and not email it. Take the two minutes to bookmark the report instead, and come back to the Make version when you have someone technical for an hour.",
    warn: {
      h: "Read only. Never let it write.",
      body: [
        "This automation looks at your practice software and reports back. It must never create, move or cancel anything.",
        "The moment a report can act on what it found, it stops being an afternoon and becomes a project with a risk register. Keep the connection read only if your software lets you choose.",
      ],
    },
  },
  {
    n: "03",
    id: "reviews",
    title: "Google reviews",
    time: "10 minutes",
    what: "You find out the moment a review lands, and a reply is already drafted. This is the one everyone forgets, because reviews arrive silently and a week later nobody has answered.",
    need: "Google Business Profile. Claude, or any AI assistant, for the drafts.",
    claude: {
      setup:
        "This is the one where Claude does the actual work every week. No connector needed. Save the prompt below in your phone notes and paste it each time a review lands.",
      prompt: `You are helping me reply to a Google review
for my allied health clinic in Australia.

Rules for every reply:
- two sentences maximum
- thank them by first name only
- never mention their condition, their treatment,
  or why they came in, even if they did
- never confirm or deny that they are a patient
- anything unhappy gets invited to a phone call,
  not argued with in public

Here is the review:
[paste the review here]

Write the reply in plain, warm, normal English.
No marketing language.`,
      after:
        "Read every draft before you post it. That is not a formality. A reply to a health review is a privacy decision, and it is yours to make rather than a machine's.",
    },
    alts: [
      {
        name: "NiceJob",
        score: "4.8 out of 5 on G2, from 410 reviews",
        note: "Highest rated of the three and the simplest. Built to automate review requests, which is the exact feature an Australian health practice should leave switched off. See the warning below.",
        url: "https://www.g2.com/products/nicejob/reviews",
      },
      {
        name: "Birdeye",
        score: "4.7 out of 5 on G2, from 3,896 reviews",
        note: "The most complete platform, and the most expensive. Aimed at multi location businesses. Same caution: its headline feature is automated review requests.",
        url: "https://www.g2.com/products/birdeye/reviews",
      },
      {
        name: "Podium",
        score: "4.6 out of 5 on G2, from 2,066 reviews",
        note: "Text message first, popular with trades and retail. Same caution again.",
        url: "https://www.g2.com/products/podium/reviews",
      },
    ],
    watch: {
      label: "Watch someone set the alerts",
      q: "google business profile review notifications settings tutorial",
    },
    steps: [
      {
        n: "1",
        body: "Go to google.com and search for your own clinic by name, while signed in to the Google account that manages your listing. Your business panel appears with buttons like Edit profile and Read reviews. That panel is your Google Business Profile. There is no separate app to download.",
      },
      {
        n: "2",
        body: "Find the settings, usually behind the three dots or a gear icon on that panel, and open the notifications section. Turn on the alert for new reviews and make sure the email address shown is one you actually read. That is the whole automation. Most clinics have simply never opened this screen.",
      },
      {
        n: "3",
        body: "Now write your reply rules once, in a note on your phone. Mine are four lines: keep it to two sentences, thank them by first name, never mention why they came in, and invite anything negative to a phone call. You will paste these a hundred times.",
      },
      {
        n: "4",
        body: "When a review lands, open Claude, paste your four rules, paste the review, and ask for a reply in your voice. Read what comes back before you post it. Every single time. A reply to a health review is a privacy decision and a person makes it, not a machine.",
      },
      {
        n: "5",
        body: "Optional, and only if the email alert is not loud enough. Make.com can push new reviews to your phone or your team chat instead. Skip this unless you already know you ignore that inbox.",
      },
    ],
    done: "The next review that arrives shows up as a notification, and you answer it the same day instead of next month.",
    stuck: "If searching your clinic name does not show you the management panel, you are either signed in to a different Google account or the listing is still owned by whoever built your website. Both are common. Sorting out ownership is a separate afternoon, and it is worth doing, because right now someone else controls what your clinic looks like on Google.",
    warn: {
      h: "Australian clinics, read this before you automate anything about reviews",
      body: [
        "Do not automate asking for reviews. Under the National Law a review is a testimonial if it mentions a symptom, a diagnosis or treatment, or an outcome, and testimonials are prohibited in advertising a regulated health service. Sending everyone a request the day after their appointment is how you end up soliciting exactly that.",
        "Never auto publish reviews onto your own website. An unsolicited review sitting on Google is not your advertising. The same words pulled onto your homepage are.",
        "Be careful what your reply says. Confirming that someone is a patient, or referring to what they came in for, is a privacy problem regardless of what they wrote first. Thank them and move the detail to a phone call.",
        "This is general information about advertising rules and not legal advice. If a review worries you, ask your association or your lawyer rather than a checklist.",
      ],
    },
  },
];

/* ── limits ─────────────────────────────────────────────────────────── */

export const NOT_COVERED = [
  "Anything that writes to your patient records. Everything on this page reads and reports. Automations that book, move or cancel appointments are a different job with a different risk, and they need testing rather than an afternoon.",
  "Recalls and reminders. Those touch patients directly, which means consent, opt outs and message timing. Worth doing, not worth doing casually.",
  "Marketing automation. This list gives you back attention. It does not bring anyone through the door.",
];

export const CLOSING =
  "None of these make you a better clinician. They take three jobs off you that never needed a person doing them, which is the only kind of automation worth starting with.";
