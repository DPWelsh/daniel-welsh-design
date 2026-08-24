/* ── What each tool actually is ──────────────────────────────────────
   Keyed by option id from stack-data.ts. Feeds the detail pane that opens
   when you tap the ⓘ on any option.

   `what` is one or two sentences on the job it does. `plan` is what this
   specific tier gets you, which is usually where the decision actually
   sits. `site` only appears where the option has no favicon domain, or
   where the domain is not where you would send someone to buy it.

   Opinions in here are mine and are marked as opinions. Prices live in
   stack-data.ts and were verified against vendor pages on 16 Aug 2026.

   PROSE RULE: no em dashes anywhere. */

export interface Note {
  what: string;
  plan?: string;
  site?: string;
}

export const NOTES: Record<string, Note> = {
  /* ── Coding ─────────────────────────────────────────────────────── */
  "claude-pro": {
    what: "Claude Code is the agent I write almost everything with. It runs in the terminal, reads the repo, and edits files directly instead of handing back snippets to paste.",
    plan: "Pro is the entry seat. Enough for evenings and weekends, and you will feel the usage limit on a long build day.",
  },
  "claude-max20": {
    what: "Same agent, twenty times the usage. This is the seat if the code is how you make a living and you are in it all day.",
    plan: "Max 20× is what I actually pay for. It stops the limit being a thing I think about.",
  },
  codex: {
    what: "OpenAI's coding agent, in the terminal and in the IDE. Closest thing to a like-for-like alternative to Claude Code.",
    plan: "Comes with ChatGPT Plus, so the $20 buys the chat app as well.",
  },
  gemini: {
    what: "Google's coding agent: Gemini CLI in the terminal, Code Assist in the editor. Huge context window, and the free tier is unusually generous.",
    plan: "Google AI Pro raises the limits and bundles the consumer app.",
  },
  deepseek: {
    what: "Open weights model with a coding-strong reputation and pricing far below the US labs. Good second opinion, good bulk work.",
    plan: "Pay as you go through the API. The $5 is a realistic light month, not a subscription.",
  },
  kimi: {
    what: "Moonshot's open weights model. Long context, cheap, and you can self-host it if you ever need the whole thing inside your own network.",
    plan: "Pay as you go through the API, or run the weights yourself.",
  },

  /* ── Database ───────────────────────────────────────────────────── */
  "supabase-free": {
    what: "Postgres with auth, storage and row level security wrapped around it. A real database, not a toy, which is why it survives past the prototype.",
    plan: "Free is 500MB, 50k monthly active users, 5GB egress, and it pauses after a week of no traffic. Fine until people show up.",
  },
  "supabase-pro": {
    what: "Same Postgres, no pausing, daily backups and room to grow. This is the row I would pay for first.",
    plan: "$25 includes the base compute. Bigger instances are an add-on: Small $15, Medium $60, Large $110 on top.",
  },
  "supabase-self": {
    what: "The whole Supabase platform running on your own machine: Postgres, auth, storage, the studio. Same API as the hosted one, so you can start hosted and move later.",
    plan: "The software is free. The cost is a box big enough to hold it, and you are now the one on call for it.",
  },
  "pg-self": {
    what: "Postgres on a box you rent. No platform, no dashboard, no per-seat pricing, and no one else to call when the disk fills up at 2am.",
    plan: "The software is free. The cost is the server it shares and the hour a week you spend on backups.",
    site: "https://www.postgresql.org/",
  },
  "hetzner-web": {
    what: "A plain Linux box in Germany or Finland, usually with Coolify or Dokku on top so deploys still feel like git push. The cheapest real compute you can buy.",
    plan: "CX22 is about 5 euros a month for 2 vCPU and 4GB, which is close enough to 5 US dollars. It will serve more traffic than most people expect.",
  },
  "hetzner-app": {
    what: "A second box for the things that should not share a process with your web server: workers, cron, queues.",
    plan: "Same 5 euro class of machine. Split it out before an overnight job takes the site down, not after.",
  },
  "neon-usage": {
    what: "Serverless Postgres that scales to zero and branches like git, so every preview deploy can have its own copy of the data.",
    plan: "Usage based, so the number moves with traffic. $15 is a lean production month.",
  },

  /* ── Front end ──────────────────────────────────────────────────── */
  "vercel-hobby": {
    what: "The default home for a Next.js app. Push to git, get a deploy, get preview URLs per branch.",
    plan: "Hobby is free but non-commercial only. The moment the app charges anyone, you are on Pro by the terms, not by choice.",
  },
  "vercel-pro": {
    what: "Same platform, licensed for commercial use, with the function limits an app that actually gets traffic needs.",
    plan: "$20 per seat, 1TB bandwidth included. This is what labs.routiq.ai runs on.",
  },
  "cf-paid": {
    what: "Cloudflare Workers runs your code at the edge, with KV, R2 storage and D1 alongside it. Cheapest serious way to serve traffic.",
    plan: "$5 covers a lot. The tradeoff is the Workers runtime, which is not plain Node.",
  },

  /* ── Back end ───────────────────────────────────────────────────── */
  "render-free": {
    what: "Somewhere to run the long jobs that do not fit in a serverless function: workers, cron, a websocket server.",
    plan: "Free instances spin down when idle and take a while to wake. Acceptable for a side project, not for a webhook.",
  },
  "railway-hobby": {
    what: "Deploy a container or a repo and it runs. The friendliest of these for someone who does not want to learn infrastructure first.",
    plan: "$5 of usage included. Billed per GB-second, so an idle service costs close to nothing.",
  },
  "railway-pro": {
    what: "Same Railway, with the limits and support a production service needs.",
    plan: "$20 seat plus usage on top. Budget more than the sticker if the service stays warm.",
  },

  "aws-ec2": {
    what: "The default answer for a decade, and still the one with everything in it: compute, queues, storage, managed Postgres, the lot. It will do anything, and it will make you do the wiring.",
    plan: "A t4g.small is about $12 a month reserved. That number is a trap: the instance is never the bill. A load balancer is $20, a NAT gateway is $35 before it moves a byte, managed Postgres is $60, and egress is 9c a gigabyte. At 10,000 users the same setup is comfortably $200.",
    site: "https://aws.amazon.com/ec2/pricing/",
  },

  firebase: {
    what: "Auth, database, functions, storage and hosting behind one SDK. Nothing gets you to a working app faster, and nothing punishes a badly shaped query harder.",
    plan: "Blaze is pay as you go with a real free allowance, so a small app is a few dollars. Firestore bills per document read, so one screen that reads a collection on every open is how a $10 month becomes a $250 one.",
  },
  "gcp-run": {
    what: "Give Cloud Run a container and it serves it, scales it to zero when nobody is there, and back up when they are. The least fussy way into Google Cloud.",
    plan: "A generous free tier, then per request and per second of CPU. The rest of GCP is next door when you need a queue or a managed Postgres.",
    site: "https://cloud.google.com/run/pricing",
  },

  /* ── Payments ───────────────────────────────────────────────────── */
  stripe: {
    what: "Take money, handle subscriptions, handle tax. Stripe is a processor, not a merchant of record: you are still the seller, so registering and filing sales tax in every country you sell into is your problem. The MoR options in this row take that on for roughly two more points.",
    plan: "Nothing monthly. Australian cards are 1.75% + 30c, dropping to 1.7% on 1 Oct 2026. International cards cost more.",
  },

  /* ── Error tracking ─────────────────────────────────────────────── */
  "sentry-free": {
    what: "Tells you the app broke before the customer does, with the stack trace and the user session attached.",
    plan: "Developer is free for 5,000 errors a month, one user. Enough to catch the ones that matter.",
  },
  "sentry-team": {
    what: "The full version: more errors, more retention, performance tracing and alert routing.",
    plan: "$26 a month, and the usage tiers climb from there.",
  },
  glitchtip: {
    what: "Open source and Sentry-compatible, so the same SDK points at it. Self-host it for free or pay for hosting.",
    plan: "Hosted starts around $15. Self-hosted costs you a server and your attention.",
  },
  rollbar: {
    what: "Error tracking with strong grouping and a good workflow for deciding what is actually new.",
    plan: "Essentials, around $15 for a small team.",
  },
  bugsnag: {
    what: "Error monitoring built around stability scores per release, so you can see whether the last deploy made things worse.",
    plan: "Starter tier. Now part of SmartBear.",
  },
  highlight: {
    what: "Errors plus session replay, so you get the click path that produced the crash instead of guessing.",
    plan: "Generous free tier, open source, self-hostable.",
  },
  datadog: {
    what: "Watches the whole host, not just the application: CPU, memory, database, traces across services. The step up from error tracking, and the step where monitoring becomes a real line item.",
    plan: "About $15 per host for infrastructure, roughly $31 more per host once APM is on.",
  },

  /* ── Analytics ──────────────────────────────────────────────────── */
  "posthog-free": {
    what: "Product analytics, session replay, feature flags and experiments in one tool. The free tier is the most generous of any of these by a distance.",
    plan: "1 million events and 5,000 replays free every month. Most small products never pass it.",
  },
  "posthog-usage": {
    what: "Same PostHog, past the free allowance. You only start paying when the traffic is real.",
    plan: "Usage based. $40 is a mid-size month, not a fixed fee.",
  },
  "amplitude-free": {
    what: "Serious behavioural analytics: funnels, retention curves, cohorts. Heavier to set up than PostHog, stronger at the analysis end.",
    plan: "2 million events a month free.",
  },
  mixpanel: {
    what: "Event analytics built around funnels and reports non-technical people can actually run themselves.",
    plan: "Free tier covers a small product.",
  },
  ga4: {
    what: "Free, everywhere, and the thing every marketer already knows how to read. Weak at product questions, fine at traffic questions.",
    plan: "Free. Pair it with Search Console.",
  },
  plausible: {
    what: "Lightweight privacy-first traffic analytics. No cookie banner, one small script, one page of numbers.",
    plan: "Starter around $9 for 10,000 monthly pageviews.",
  },

  /* ── Transactional email ────────────────────────────────────────── */
  "resend-free": {
    what: "Sends the emails your app produces: receipts, resets, welcomes. Built for developers, with React email templates.",
    plan: "3,000 emails a month free, 100 a day.",
  },
  "resend-pro": {
    what: "Same Resend with real volume and better deliverability tooling.",
    plan: "$20 for 50,000 emails a month. This is what Routiq sends on. Whichever you pick, set SPF, DKIM and DMARC on the domain or your mail lands in spam no matter how good the provider is.",
  },
  postmark: {
    what: "The deliverability specialist. Costs more per email and gets more of them into the inbox, which is the only metric that matters for a password reset.",
    plan: "Basic tier, around $15 for 10,000 sends. Deliverability is mostly your DNS: SPF, DKIM and DMARC do more for the inbox than any provider choice.",
  },
  sendgrid: {
    what: "The incumbent. Huge feature surface, more configuration than most small apps need.",
    plan: "Free tier covers low volume.",
  },
  ses: {
    what: "Amazon's raw sending pipe. Cheapest per email by a wide margin, and you build everything around it yourself.",
    plan: "About 10c per 1,000 emails. The $1 is a real small month.",
  },
  loops: {
    what: "Transactional and marketing email in one place, aimed at SaaS. Sequences and product emails without a second tool.",
    plan: "Scale tier. Priced on contacts, so it climbs with the list.",
  },

  /* ── AI in the product ──────────────────────────────────────────── */
  "api-light": {
    what: "The Anthropic API is the model your product calls, which is a different bill from the coding subscription. Every summary, reply and score you generate lands here.",
    plan: "Light is a few thousand calls a month. Use Haiku 4.5 at $1 in and $5 per million tokens out where quality allows.",
  },
  "api-steady": {
    what: "Same API at the volume of a product with paying customers using it daily.",
    plan: "Sonnet 5 at $3 in and $15 out per million tokens is the workhorse. Cache aggressively and this number stops growing linearly.",
  },
  "api-heavy": {
    what: "Where the AI feature is the product, not a garnish. This row is usually the single biggest line on the whole bill.",
    plan: "Opus 5 at $5 in and $25 out per million tokens for the hard calls, cheaper models underneath for everything else.",
  },

  /* ── Voice ──────────────────────────────────────────────────────── */
  "el-starter": {
    what: "ElevenLabs is the voice layer: text to speech, and conversational agents that hold a phone call.",
    plan: "Starter includes about 75 minutes of agent time. Enough to build and demo, not to run.",
  },
  "el-creator": {
    what: "Same platform with enough minutes to put an agent in front of real callers.",
    plan: "About 275 minutes included, then 8c a minute. The model behind the agent is billed separately.",
  },
  "el-pro": {
    what: "Production voice: more minutes, better concurrency, and the quality settings you want on a customer call.",
    plan: "About 1,238 minutes included, then 8c a minute over.",
  },

  vapi: {
    what: "Voice agent orchestration: it wires the transcriber, the model and the voice into one call and handles the interruptions, the latency and the phone plumbing. You bring your own providers, which is the point and also the work.",
    plan: "About 5 cents a minute in platform fee, plus whatever the transcriber, model and voice cost on top. The $30 is a light month, not a subscription.",
  },
  retell: {
    what: "The same job as Vapi with fewer decisions: one bundled per-minute price with the pipeline already chosen. Faster to get a working agent, less control over the pieces.",
    plan: "From about 7 cents a minute all in. Pay as you go, so the number is a usage month.",
  },
  livekit: {
    what: "The open source realtime stack the others are often built on. Agents framework, WebRTC transport, and you can run every part of it on your own machines.",
    plan: "The framework is free. LiveKit Cloud has a free tier and then bills on usage, or you host it and pay for the box instead.",
  },
  "deepgram-agent": {
    what: "Deepgram's Voice Agent API, from the people who do the transcription underneath half of these. One endpoint for listen, think and speak.",
    plan: "About $4.50 an hour, so roughly 7.5 cents a minute, billed on usage.",
  },

  /* ── Phone numbers and SMS ──────────────────────────────────────── */
  "twilio-1": {
    what: "A phone number your software owns, so calls and texts can be answered by code. This is the row that turns an app into a receptionist.",
    plan: "An Australian number is about $3 a month before any traffic.",
  },
  "twilio-sms": {
    what: "The same account once the texts are the product. Volume, not the number, is what you are paying for here.",
    plan: "About 5.15c per Australian SMS segment. A long message is more than one segment, which is where the bill surprises people.",
  },
  mobilemessage: {
    what: "An Australian SMS gateway, and what Routiq actually sends through now. Message bodies stay with an Australian company instead of a US carrier, and the per-message price is roughly half of Twilio's.",
    plan: "Prepaid credits: 4c a message at 500, 3.5c at 1,000, 3c at 10,000. Inbound and delivery receipts are free, the first dedicated number is included, and the $40 here is a reminder-heavy month. SMS only: the number for voice stays at Twilio.",
  },
  "telnyx-1": {
    what: "The cheaper carrier. Same job as Twilio, less documentation and a smaller ecosystem around it.",
    plan: "Numbers from about $1, voice around 0.2c a minute.",
  },

  /* ── LLM tracing ────────────────────────────────────────────────── */
  "langfuse-free": {
    what: "Records every prompt, response, token count and cost so you can see what your AI feature actually did. Without this you are debugging by vibe, which is why it is required at every budget here.",
    plan: "Hobby is free and self-hostable. This is what I would start with.",
  },
  "langfuse-core": {
    what: "Same tracing with longer retention, evaluations and more seats.",
    plan: "Core is $29 a month.",
  },
  langsmith: {
    what: "LangChain's tracing and evaluation platform. Strongest option if you are already building on LangChain or LangGraph.",
    plan: "Plus is about $39 per seat.",
  },
  helicone: {
    what: "Sits as a proxy in front of the model APIs, so you get logging, caching and rate limits by changing one base URL.",
    plan: "Free tier covers a small product. Open source.",
  },

  /* ── Domain ─────────────────────────────────────────────────────── */
  namecheap: {
    what: "Where you buy the address. Namecheap is the boring right answer: honest renewal prices, free WHOIS privacy, and no attempt to sell you seven things at checkout. This is where routiq.ai is registered.",
    plan: "A .com is around $12 a year, so a dollar a month. A .ai is about $70 a year and a .io about $35, and those renew at that price forever. Turn on WHOIS privacy and set SPF, DKIM and DMARC while you are in the DNS panel.",
  },
  "vercel-domains": {
    what: "Buy the domain inside the platform you already deploy on, and the DNS is configured before you have finished typing. Convenience over price.",
    plan: "A .com is around $20 a year. You are paying a few dollars for never touching a nameserver record.",
    site: "https://vercel.com/domains",
  },
  godaddy: {
    what: "The one everybody has heard of. It works, and the cart will try to sell you hosting, email, a website builder and privacy that the others include for free.",
    plan: "A .com is around $22 a year at renewal, and the first year is cheap on purpose. Watch the renewal, not the sticker.",
  },

  /* ── Code hosting ───────────────────────────────────────────────── */
  "github-free": {
    what: "Where the code lives, and where CI runs. Free private repos and Actions minutes cover a solo build entirely.",
    plan: "Free. 2,000 Actions minutes a month on private repos.",
  },
  "github-team": {
    what: "Same GitHub with protected branches, required reviews and org controls.",
    plan: "$4 per user a month.",
  },
  gitlab: {
    what: "Git hosting with the CI, registry and issue tracking built in rather than bolted on. Self-hostable if that matters to you.",
    plan: "Free tier is substantial.",
  },

  /* ── Email and docs ─────────────────────────────────────────────── */
  "gws-starter": {
    what: "you@yourcompany.com, plus Docs, Sheets, Drive and Meet. The first thing a customer checks without realising they are checking it.",
    plan: "Starter is $7 per user a month, 30GB.",
    site: "https://workspace.google.com/pricing",
  },
  "gws-standard": {
    what: "Same Workspace with 2TB per user and recorded meetings, which matters once you are sending demos.",
    plan: "Standard is about $14 per user a month.",
    site: "https://workspace.google.com/pricing",
  },
  ms365: {
    what: "The Microsoft equivalent: Outlook, Teams, the desktop Office apps. Pick this if your customers live in Outlook.",
    plan: "Business Standard is about $12.50 per user a month.",
    site: "https://www.microsoft.com/en-au/microsoft-365/business",
  },

  /* ── Accounting ─────────────────────────────────────────────────── */
  spreadsheet: {
    what: "Google Sheets, with money in and money out. Genuinely correct until you have a bookkeeper or a tax agent asking for a file.",
    plan: "Free, and it does not scale past your first few customers.",
    site: "https://workspace.google.com/products/sheets/",
  },
  qb: {
    what: "Books, invoices, GST and a file your accountant already knows how to open.",
    plan: "Simple Start is around $20 a month.",
    site: "https://quickbooks.intuit.com/au/pricing/",
  },
  xero: {
    what: "The Australian default for small business accounting. Bank feeds, invoicing, payroll as an add-on.",
    plan: "Ignite is about A$35 a month with invoice limits. Xero bills Australians in AUD, so the USD figure here is the conversion.",
  },

  /* ── Tasks ──────────────────────────────────────────────────────── */
  "clickup-free": {
    what: "Somewhere the work lives that is not your head. Docs, tasks and boards in one place.",
    plan: "Free covers unlimited tasks for a small team.",
  },
  "clickup-paid": {
    what: "Same tool with the automations, dashboards and guest access a team needs.",
    plan: "Unlimited is about $10 per user a month.",
  },
  linear: {
    what: "Issue tracking that is fast and opinionated. Built for software teams and it shows.",
    plan: "Free tier covers up to 250 issues, which is longer than it sounds.",
  },

  /* ── Shared inbox ───────────────────────────────────────────────── */
  "chatwoot-free": {
    what: "One inbox for web chat, email, WhatsApp and SMS, so a customer conversation does not depend on which channel they picked.",
    plan: "Hacker plan is free. Open source, so you can self-host the whole thing.",
  },
  "chatwoot-paid": {
    what: "Hosted Chatwoot with the automation, reporting and team routing turned on.",
    plan: "Startups tier is about $19 per agent a month.",
  },
  intercom: {
    what: "The polished incumbent. Best in class messenger and help centre, priced accordingly, with AI resolution billed on top.",
    plan: "Essential starts around $29 per seat, and the resolution charges are where it adds up.",
  },

  /* ── DM automation ──────────────────────────────────────────────── */
  "manychat-free": {
    what: "Answers Instagram and Facebook DMs automatically. This is what runs a keyword in a caption: someone comments STACK, they get the link.",
    plan: "Free up to 1,000 contacts. Enough to test whether the audience actually replies.",
  },
  "manychat-pro": {
    what: "Same automation with keyword triggers and email capture inside the DM, priced on how many contacts the bot has talked to.",
    plan: "$29 a month billed yearly, $39 billed monthly, for 2,500 contacts. Past 7,500 it charges per extra contact, so a keyword that works raises the bill.",
  },
  chatfuel: {
    what: "The alternative, stronger on WhatsApp and on AI agents inside the chat.",
    plan: "Business tier from about $20 a month.",
  },
  "meta-wa": {
    what: "The WhatsApp Business API direct from Meta, for messaging customers on the channel they actually read. Since January 2026 only bounded automation flows are allowed, so it is a notification and support channel, not a bot playground.",
    plan: "No monthly fee. Billed per conversation, priced by country and by category.",
    site: "https://business.whatsapp.com/products/business-platform",
  },

  /* ── Scraping and leads ─────────────────────────────────────────── */
  "apify-free": {
    what: "A marketplace of ready-made scrapers. This is how a lead list gets built without writing a crawler for every site.",
    plan: "Pay as you go, no monthly fee. You are billed per event, which for us works out around 24c per fully enriched lead.",
  },
  "apify-starter": {
    what: "Same platform with included credit and higher concurrency, for when the scraping runs on a schedule.",
    plan: "$29 a month including usage credit.",
  },
  phantombuster: {
    what: "Automations aimed at social platforms and outreach sequences rather than general crawling.",
    plan: "Starter around $69 a month, priced in execution hours.",
  },

  /* ── Prospecting ────────────────────────────────────────────────── */
  "linkedin-free": {
    what: "Search, connect, message. The free account genuinely works for founder-led sales, and it is where most of the buying signal is anyway.",
    plan: "Free. The limits are on search volume, not on selling.",
  },
  salesnav: {
    what: "Sales Navigator adds proper filters, saved lead lists and alerts when someone changes job.",
    plan: "Core is about $99 a month. Worth it when prospecting is a daily job, not a weekly one.",
  },
  apollo: {
    what: "A contact database with emails and phone numbers, plus sequencing on top.",
    plan: "Free tier includes a monthly credit allowance.",
  },
  instantly: {
    what: "Cold email at volume: inbox rotation, warmup and deliverability management.",
    plan: "Growth is about $37 a month. Regulated industries make this a legal question before it is a tooling question.",
  },

  /* ── Design ─────────────────────────────────────────────────────── */
  "figma-free": {
    what: "Where the interface gets decided before it gets built, and where a brand kit lives so it stays consistent.",
    plan: "Starter is free for up to 3 design files.",
  },
  "figma-pro": {
    what: "Unlimited files, version history, shared libraries and dev mode.",
    plan: "Professional is about $16 per editor a month.",
  },
  "canva-pro": {
    what: "Faster than Figma for anything that is not an interface: carousels, thumbnails, decks, one-pagers.",
    plan: "Pro is about $15 a month with the brand kit and background remover.",
  },

  /* ── Video and screen ───────────────────────────────────────────── */
  capcut: {
    what: "Cuts, captions and subtitles for short video. It is what most of the reels on Instagram were edited in, including mine.",
    plan: "Free, and the free tier is genuinely enough.",
  },
  loom: {
    what: "Record your screen, send a link. The fastest way to answer a customer question or send a demo without booking a call.",
    plan: "Business is about $15 per seat for unlimited length recordings.",
  },
  descript: {
    what: "Edits video by editing the transcript. Deletes filler words in one click, which saves an hour per talking-head video.",
    plan: "Creator is about $16 a month.",
  },

  /* ── Newsletter ─────────────────────────────────────────────────── */
  "beehiiv-free": {
    what: "Publishing and list growth for a newsletter, with recommendations and referrals built in.",
    plan: "Launch is free up to 2,500 subscribers.",
  },
  "beehiiv-paid": {
    what: "Same platform with automations, segmentation and the ad network.",
    plan: "Scale is about $39 a month and climbs with list size.",
  },
  kit: {
    what: "Formerly ConvertKit. Creator-focused email with strong automation and tagging.",
    plan: "Free up to 10,000 subscribers on the newsletter plan.",
  },
  "own-blog": {
    what: "Publish on your own site and collect the emails yourself. Slower to start, and nobody can move your audience or change the terms.",
    plan: "Free if the site already exists. This is what labs.routiq.ai does.",
  },

  /* ── Second model ───────────────────────────────────────────────── */
  "openai-light": {
    what: "A second provider, so one outage or one price change does not take the product down. Different models are also genuinely better at different jobs.",
    plan: "Light API usage, a few dollars to twenty a month.",
  },
  "openai-steady": {
    what: "OpenAI at production volume alongside your primary model.",
    plan: "Around $100 a month for steady product traffic.",
  },
  "gemini-api": {
    what: "Google's API. Long context, competitive pricing, and strong on documents and video.",
    plan: "Pay as you go, with a free tier worth testing on first.",
  },

  /* ── Crawling ───────────────────────────────────────────────────── */
  "firecrawl-free": {
    what: "Turns any website into clean markdown a model can read. This is what powers the audit tools on this site. If you already pay for Apify, its Website Content Crawler does the same job and you can skip this row entirely.",
    plan: "Free tier is 500 credits, one credit per page.",
  },
  "firecrawl-hobby": {
    what: "Same crawler with the volume and concurrency for a tool that runs on demand for customers.",
    plan: "Hobby is about $16 a month for 3,000 credits.",
  },
  jina: {
    what: "Prefix any URL with r.jina.ai and get readable text back. The zero-setup option.",
    plan: "Free without a key at low rates, keyed for higher limits.",
  },
  crawl4ai: {
    what: "The open source default. Same job as Firecrawl, running on your own machine, which matters when the pages you crawl are sensitive.",
    plan: "Free as a library. Once you count the server and the proxies it lands near $5 per 1,000 pages, so it is cheaper than hosted only up to a point.",
    site: "https://github.com/unclecode/crawl4ai",
  },
  tavily: {
    what: "Search and extract in one API, built for agents rather than for scraping pipelines. Reach for this when the agent needs to find the page, not just read a URL you already have.",
    plan: "1,000 credits a month free, then about $30 for 4,000. Pay as you go gets expensive at real volume.",
  },
  scrapingbee: {
    what: "The unblocker. Proxies, JavaScript rendering and CAPTCHA handling, for the sites that refuse a plain fetch. Not an LLM-markdown tool, a get-the-page tool.",
    plan: "Freelance is $49 a month. The step up is $99.",
  },

  /* ── Code review ────────────────────────────────────────────────── */
  coderabbit: {
    what: "Reviews every pull request automatically and leaves line comments. The safety net when the code was written faster than you can read it.",
    plan: "Pro is about $24 per developer a month.",
  },
  "copilot-review": {
    what: "GitHub's own review and completion, sitting where the code already is.",
    plan: "Business is $19 per user a month.",
  },
  greptile: {
    what: "Reviews with whole-repo context, so it catches the change that breaks something three files away.",
    plan: "Standard is about $30 per developer a month.",
  },

  /* ── Image and video generation ─────────────────────────────────── */
  fal: {
    what: "One API in front of the open image and video models. Fast, pay per generation, and it is what generates the backgrounds and avatars here.",
    plan: "Pay as you go. $10 is a solid month of image work.",
  },
  higgsfield: {
    what: "AI video with real camera controls, aimed at ads and short-form rather than novelty clips.",
    plan: "Creator is about $39 a month in credits.",
  },
  midjourney: {
    what: "Still the best taste per prompt for stills. Weakest on text inside an image, which is why logos get composited on afterwards.",
    plan: "Basic is about $10 a month.",
  },

  /* ── Data APIs ──────────────────────────────────────────────────── */
  exa: {
    what: "Search built for models rather than people. Ask for a kind of page and get structured results back instead of ten blue links.",
    plan: "Pay as you go, priced per search and per page of content.",
  },
  places: {
    what: "Google Places is the source for a business address, phone, rating and review count. The backbone of any local lead list.",
    plan: "Usage based with a monthly free allowance before it bills.",
    site: "https://developers.google.com/maps/documentation/places/web-service",
  },
  serper: {
    what: "Google search results as a clean API, cheaply, for when you need the actual SERP.",
    plan: "Starter around $50 for 50,000 queries.",
  },

  /* ── Video hosting ──────────────────────────────────────────────── */
  bunny: {
    what: "Video hosting and CDN at a price that does not punish you for being watched. This is where the explainers on this site are served from.",
    plan: "Usage based storage plus bandwidth, cents per GB.",
  },
  "cf-stream": {
    what: "Cloudflare's video product. Encoding, player and delivery, priced per minute stored and per minute watched.",
    plan: "About $5 per 1,000 minutes stored.",
  },
  mux: {
    what: "The developer video platform with the best analytics on playback quality. Costs more, tells you more.",
    plan: "Usage based on encoding and delivery.",
  },


  /* ── Added 17 Aug 2026, from the comment sweep on ten stack reels ── */

  "cursor-free": {
    what: "Cursor's free tier. The editor is the whole editor, with a monthly allowance of agent requests and completions rather than a crippled feature set. Enough to decide whether you like the shape of it before paying.",
    plan: "Free, with a limited number of agent requests a month and a Pro trial to start. The limit is the reason people upgrade, not a missing feature.",
  },
  cursor: {
    what: "VS Code with the AI built into the editing surface, so you watch the file change instead of reading a terminal. Asked about by name more than any other missing tool in the comments.",
    plan: "Pro is $20 a month with a usage allowance on the frontier models.",
  },
  ollama: {
    what: "Runs open models on your own machine. Worth knowing about, and worth the warning: five separate commenters said some version of \"ollama is not a Claude replacement\", and they are right at current model sizes.",
    plan: "Free software. The cost is the machine, and a GPU that keeps up with a frontier model is not a laptop.",
  },
  convex: {
    what: "The most requested swap in the comments. A reactive database where queries are TypeScript functions and the client re-renders when the data changes, so there is no cache layer to get wrong.",
    plan: "Free tier for a real prototype, Pro from about $25 a month per member.",
  },
  planetscale: {
    what: "MySQL with branching and online schema changes, so a migration never locks the table. Built by the people who ran Vitess at YouTube scale.",
    plan: "Scaler from about $39 a month. No free tier since 2024.",
  },
  turso: {
    what: "SQLite at the edge, and cheap enough to give every customer their own database file. A genuinely different shape from one big Postgres.",
    plan: "Free tier is generous, Starter around $9 a month.",
  },
  mongodb: {
    what: "Documents instead of rows. Fastest thing in the world when the shape of your data is still moving, and the one you will fight when you need a join.",
    plan: "Atlas has a free shared tier, Flex from about $9 a month.",
  },
  netlify: {
    what: "The other name in this row. Same push-to-deploy shape as Vercel, with a stronger free tier for static sites and less Next.js-specific magic.",
    plan: "Pro is about $19 per member a month, and bandwidth past the included tier is the part that surprises people.",
  },
  "cf-pages": {
    what: "Static sites and edge functions on Cloudflare, free with limits most projects never touch. The unglamorous right answer for a marketing site.",
    plan: "Free, including unlimited bandwidth. Functions come from the Workers allowance.",
  },
  fly: {
    what: "Runs your container close to your users, in as many regions as you want, with real Postgres alongside it. The nicest developer experience of the container hosts.",
    plan: "Pay as you go from about $5 a month for a small always-on machine.",
  },
  digitalocean: {
    what: "The middle ground between a raw VPS and a platform. App Platform deploys from a repo, and the droplets are next door when you outgrow it.",
    plan: "App Platform from about $5 a month, droplets from $4.",
  },

  /* Payments. Stripe is a processor, the rest are merchants of record: they
     become the seller, so they file the sales tax and eat the chargebacks. */
  paddle: {
    what: "A merchant of record. Paddle is legally the seller, which means Paddle files VAT and sales tax in every country you sell into, and you never register for tax anywhere. For a non-US founder selling internationally that is the whole pitch.",
    plan: "5% + 50c per transaction. Roughly 1.5 to 2 points more than Stripe all in, which is the price of never filing a foreign tax return.",
  },
  lemonsqueezy: {
    what: "The indie-friendly merchant of record, now owned by Stripe. Same tax handling as Paddle with a lighter setup and a checkout you can be live on today.",
    plan: "5% + 50c, plus international fees. Closer to 7.5% all in for a non-US seller.",
  },
  polar: {
    what: "A developer-first merchant of record built around usage billing and digital products, with a good API and an open source core.",
    plan: "4% + 40c, which is the cheapest of the well-known MoR options.",
  },
  creem: {
    what: "The cheapest merchant of record on this list. Newer and smaller than Paddle, which is the tradeoff you are making.",
    plan: "3.9% + 40c per transaction.",
  },

  fathom: {
    what: "Privacy analytics with no cookie banner and a single page of numbers. Same lane as Plausible, slightly more polished, slightly more expensive.",
    plan: "From about $15 a month for 100,000 pageviews.",
  },
  umami: {
    what: "Open source analytics that runs in one container next to your app. The self-hosted answer when PostHog is more than you need.",
    plan: "Free software, or about $9 a month hosted by them.",
  },
  matomo: {
    what: "The heavyweight you can own. Everything Google Analytics does, on your own server, with the raw data staying yours.",
    plan: "Free to self-host, and it wants a real database. Cloud starts around $26 a month.",
  },
  openrouter: {
    what: "One API key in front of every model from every lab. The right answer when you want to switch models without switching code, or route cheap requests to a cheap model.",
    plan: "Pay as you go at the underlying model price plus a small margin. No monthly fee.",
  },
  groq: {
    what: "Open models on custom silicon, at speeds that change what you can put in a user-facing loop. Not the smartest models, by a distance the fastest.",
    plan: "Pay as you go, priced well under the frontier labs.",
  },
  kokoro: {
    what: "Open weights text to speech, small enough to run on a normal machine. The self-hosted answer for voice, and the reason the self-hosted board is not empty in this row.",
    plan: "Free software, runs on CPU. The cost is the box it sits on.",
    site: "https://github.com/hexgrad/kokoro",
  },
  cartesia: {
    what: "Low latency voice with strong quality, built for realtime agents rather than narration.",
    plan: "Pro from about $49 a month, then usage.",
  },
  plivo: {
    what: "The third carrier. Same job as Twilio and Telnyx, competitive pricing, smaller ecosystem.",
    plan: "Numbers from about $1 a month, SMS priced per country.",
  },
  vonage: {
    what: "Old guard telco API with unusually wide country coverage, which matters if you send to places the others do not reach cleanly.",
    plan: "Numbers from about $1 a month.",
  },
  phoenix: {
    what: "Arize's open source tracing and evaluation tool. Same job as Langfuse, and it runs in a container you own.",
    plan: "Free and self-hostable, with a hosted tier if you would rather not.",
  },
  "cf-registrar": {
    what: "Cloudflare sells domains at wholesale with no markup, which makes it the cheapest honest answer in this row. The catch is you have to use Cloudflare for DNS.",
    plan: "At cost, so a .com is about $10 a year. WHOIS privacy included, renewals never jump.",
    site: "https://www.cloudflare.com/products/registrar/",
  },
  porkbun: {
    what: "Cheap, pleasant, and free WHOIS privacy on everything. The indie favourite when Cloudflare's DNS requirement does not suit.",
    plan: "A .com is around $11 a year including privacy.",
  },
  "adobe-cc": {
    what: "Photoshop, Illustrator, Premiere, After Effects and the rest. Still where the professional standard lives, and still a subscription you cannot escape without losing the files.",
    plan: "All Apps is about $60 a month on the annual plan. Single apps are around $23.",
  },
  affinity: {
    what: "Photo, Designer and Publisher, bought once rather than rented. The credible answer to Adobe for people who resent the meter.",
    plan: "A one-time licence, so roughly $2 a month if you keep it three years.",
  },
  framer: {
    what: "Design that is already the website. Closer to a site builder than to Figma, and fast when the design and the build are the same person.",
    plan: "Free to design, from about $10 a month to publish on your own domain.",
  },
  davinci: {
    what: "The free version is the real product, not a trial. Full editing, colour grading and audio, with no watermark and no export limit. This is the honest answer for anyone editing video who does not already pay Adobe.",
    plan: "Free. The paid Studio version adds features most people never reach.",
  },
  "davinci-studio": {
    what: "The paid version: better noise reduction, more AI tools, higher-than-4K export. Bought once, not rented, which is the whole argument.",
    plan: "$295 once, forever. Over three years that is about $8 a month, against Premiere at $23 every month with nothing owned at the end.",
  },
  premiere: {
    what: "The industry default, and the one every editor you hire already knows. That is a real reason, and it is the main one.",
    plan: "About $23 a month as a single app, more month to month.",
  },
  obs: {
    what: "Records your screen and streams it, free, on every platform. Every demo video on this site was captured with it.",
    plan: "Free and open source, forever.",
  },

  /* File storage */
  r2: {
    what: "S3-compatible object storage with no egress fees, which is the whole point. If people download what they upload, this row is where AWS quietly bills you and Cloudflare does not.",
    plan: "About 1.5c per GB stored a month, and nothing to serve it.",
  },
  s3: {
    what: "The one every library, tutorial and SDK already speaks. Endlessly durable, and the egress charges are the reason R2 exists.",
    plan: "About 2.3c per GB stored, plus 9c per GB out. The second number is the one to model.",
  },
  b2: {
    what: "Backblaze built a backup company and sold the storage underneath it. Cheapest per terabyte of the serious options.",
    plan: "About 0.6c per GB a month, with free egress up to three times your stored volume.",
  },
  "supabase-storage": {
    what: "If you already pay for Supabase, you already have object storage with row level security over it. One less vendor, one less key.",
    plan: "Included in your plan up to the quota, then a few cents per GB.",
  },
  minio: {
    what: "The S3 API on your own disk. Point any S3 library at it and nothing else in your code changes.",
    plan: "Free software. The cost is the disk and the backups you now own.",
  },

  /* Auth */
  "supabase-auth": {
    what: "Auth that comes with the database you already picked, sharing the same row level security. Boring, free, and one fewer service to keep in sync.",
    plan: "Included, up to 50,000 monthly active users on the paid plan.",
  },
  clerk: {
    what: "Auth where the pre-built components are the product: sign-in, profile, organisations and invitations, dropped in and styled. Fastest way to a real login screen.",
    plan: "Free to 10,000 monthly active users, then from about $25 a month plus per-user pricing.",
  },
  "better-auth": {
    what: "An open source auth library that lives in your codebase and uses your database. No vendor, no monthly active user meter, and no migration if you grow.",
    plan: "Free. You own the sessions and the security decisions.",
  },
  auth0: {
    what: "The enterprise answer, and the one that already has the SSO and compliance checkboxes a large customer will ask you for.",
    plan: "From about $35 a month, and it climbs steeply with monthly active users.",
  },
  workos: {
    what: "SSO, SCIM and directory sync for when one big customer says \"we need Okta\". Free up to a million users, which is unusual and deliberate.",
    plan: "Free for auth up to 1M monthly active users, with enterprise features priced per connection.",
  },

  /* Background jobs */
  "vercel-cron": {
    what: "A schedule that hits one of your own routes. No queue, no retries, no dashboard, and for most apps that is genuinely enough. This site runs on it.",
    plan: "Included in your Vercel plan, with limits on frequency by tier.",
  },
  "pg-cron": {
    what: "A jobs table, a worker and a timer. The oldest answer, still correct, and the one you can debug with a SQL query at 2am.",
    plan: "Free. You write the retry logic, which is where the work actually is.",
  },
  inngest: {
    what: "Durable functions: each step is retried and resumed on its own, so a job that dies halfway does not start again from the top. This is the row where vibe-coded apps quietly break.",
    plan: "Free tier covers a small app, Basic from about $20 a month.",
  },
  trigger: {
    what: "Long-running background jobs written as normal code, with no timeout to design around. Open source, and self-hostable.",
    plan: "Generous free tier, paid from about $20 a month.",
  },
  qstash: {
    what: "A message queue you talk to over HTTP, so serverless functions can hand work to each other without a broker to run.",
    plan: "Pay as you go, with a free daily allowance.",
  },

  /* Uptime and status */
  uptimerobot: {
    what: "Tells you the site is down before a customer does. Error tracking will not: Sentry knows the app threw, not that the box is gone.",
    plan: "Free for 50 monitors at 5-minute intervals, which is enough for most people.",
  },
  betterstack: {
    what: "Monitoring, on-call scheduling and a hosted status page in one. The step up from a ping when someone has to be woken.",
    plan: "Free tier exists, paid from about $29 a month.",
  },
  checkly: {
    what: "Runs a real browser through your actual signup flow on a schedule, so you find out the checkout broke before a customer does.",
    plan: "Hobby tier is free, paid from about $40 a month.",
  },
  "uptime-kuma": {
    what: "Open source monitoring in one container, with a status page included. The self-hosted answer that is genuinely as good as the paid ones for small setups.",
    plan: "Free software on a box you already have.",
  },

  /* Rate limiting and WAF */
  "cf-waf": {
    what: "If your DNS is on Cloudflare, you already have a firewall, bot filtering and rate limiting in front of everything, mostly unconfigured. Turning it on is free.",
    plan: "Managed rules and basic rate limiting on the free plan, more on Pro at about $20 a month.",
  },
  arcjet: {
    what: "Rate limiting, bot detection and email validation as a few lines in your own code rather than a network appliance. Useful when the abuse is application-shaped, like one user hammering an expensive AI route.",
    plan: "Free tier covers a small app.",
  },
  "upstash-rl": {
    what: "Serverless Redis with a ready-made rate limiter on top. Cheap, boring, and it works from an edge function.",
    plan: "Pay as you go, with a free allowance that covers a small product.",
  },

  /* Content */
  "own-files": {
    what: "Markdown files in the repo. Content ships with the code, reviews in a pull request, and there is no second system to keep in sync. This page and every guide on this site works exactly this way.",
    plan: "Free. The tradeoff is that a non-technical person cannot edit it without you.",
  },
  sanity: {
    what: "Structured content with a real API and a customisable editor. The right answer when someone who does not write code needs to publish.",
    plan: "Free up to 20 seats, then about $15 per seat a month.",
  },
  payload: {
    what: "An open source CMS that installs into your own app and uses your own database. No external content API to go down.",
    plan: "Free and self-hosted, or a paid cloud tier.",
  },
  contentful: {
    what: "The enterprise incumbent. Excellent at multi-language, multi-brand content, priced for companies that have both.",
    plan: "Free tier exists, and the jump to paid is steep.",
  },
  wordpress: {
    what: "Still runs a large share of the web, still the fastest way to hand a marketing team something they already know, and still a security surface you now own.",
    plan: "Free software, about $10 a month for hosting that will not embarrass you.",
  },

  /* ── Editor ─────────────────────────────────────────────────────── */
  vscode: {
    what: "The editor almost everything targets. Free, extensions for every language, and the thing your AI agent is probably assuming you use.",
    plan: "Free forever. Add the Claude Code extension and the terminal agent lives inside it.",
  },
  zed: {
    what: "Written in Rust, and you feel it. Opens instantly, edits without lag, with collaboration and AI built in rather than bolted on.",
    plan: "Free and open source, with a paid tier for hosted AI.",
  },
  windsurf: {
    what: "The other AI-first editor. Same idea as Cursor with a different agent design and a cheaper seat.",
    plan: "There is a free tier with a monthly credit allowance, and Pro is about $15 a month.",
  },
  jetbrains: {
    what: "IntelliJ, WebStorm, PyCharm and the rest. Nobody has beaten their refactoring, and they know exactly what your code means rather than what it looks like.",
    plan: "All Products Pack is about $29 a month for the first year, cheaper after that.",
  },

  /* ── The free tiers that were missing from otherwise paid rows ────── */
  "canva-free": {
    what: "Canva's free plan is not a trial. Templates, the editor, and enough stock to make a carousel or a thumbnail without ever paying. Pro buys the brand kit, the background remover and the resize button.",
    plan: "Free forever. The upgrade is convenience, not capability.",
  },
  "loom-free": {
    what: "Record your screen and send a link, free. The limit is length and library size, not features, so it works fine for answering a customer question.",
    plan: "Starter is free: 25 videos, up to 5 minutes each.",
  },
  "descript-free": {
    what: "The transcript-editing trick on the free plan, with a monthly transcription allowance. Enough to find out whether editing video by deleting words suits you.",
    plan: "Free with about an hour of transcription a month and watermarked exports on some features.",
  },
  "netlify-free": {
    what: "The free tier is a real one: custom domains, HTTPS, deploy previews and 100GB of bandwidth. Plenty for a marketing site or a small app.",
    plan: "Free. Bandwidth and build minutes are the ceilings, and both are generous.",
  },
  "neon-free": {
    what: "Serverless Postgres that scales to zero, free, with branching included. The best free Postgres for a project that sleeps most of the day.",
    plan: "Free tier is about 0.5GB of storage and limited compute hours. It genuinely runs a small product.",
  },
  "convex-free": {
    what: "Convex free until it is a business. The whole reactive model, the functions, the dashboard, with usage limits rather than a feature wall.",
    plan: "Free tier covers a real prototype and a small live app.",
  },
  "turso-free": {
    what: "Hundreds of SQLite databases for nothing, which is the tier that makes database-per-customer worth trying.",
    plan: "Free tier covers 500 databases and about 9GB total.",
  },
  "mongodb-free": {
    what: "The M0 shared cluster has been free forever and is why half the tutorials on the internet use Mongo.",
    plan: "512MB, shared, free with no card. It will not survive real traffic, which is the point of the row above.",
  },
  "windsurf-free": {
    what: "Windsurf's free plan gives you the editor and a monthly credit allowance, which is enough to compare it against Cursor properly before choosing.",
    plan: "Free with monthly credits that refresh.",
  },

  /* ── Data APIs: the free tier exists, it is just quiet about it ──── */
  "places-free": {
    what: "Google Maps Platform gives every project a monthly free allowance per API, which for most side projects is the entire bill. Places, Geocoding and Maps each get their own allowance.",
    plan: "About 10,000 free calls a month per API before anything bills. You still have to put a card on file, which is what makes people think it is not free.",
    site: "https://mapsplatform.google.com/pricing/",
  },
  osm: {
    what: "OpenStreetMap is the free one. Nominatim for geocoding and Overpass for querying places, with no key and no card. The data is community-maintained, so it is patchier than Google on business hours and phone numbers and better on streets.",
    plan: "Free. The rules are usage limits and attribution, and if you hammer the public endpoint you will be blocked, so host your own for anything serious.",
    site: "https://nominatim.org/",
  },
  "brave-search": {
    what: "A genuinely independent search index with an API, which matters because most search APIs are reselling the same one. Good default when you want web results in an agent without paying per query.",
    plan: "Free tier is about 2,000 queries a month, then a few dollars per thousand.",
    site: "https://brave.com/search/api/",
  },

  "gh-issues": {
    what: "Issues and Projects in the repo the code already lives in. No second login, no syncing a ticket to a branch, and the task sits next to the commit that closed it. For one person or a small team that is genuinely enough.",
    plan: "Free, Projects boards included. You outgrow it when people who should not see a repo need to file work.",
  },

  socials: {
    what: "LinkedIn, Instagram, Reddit and X. Four places you can reach the people who would buy the thing, for nothing, before you spend a cent on a prospecting tool. The cost is attention and consistency, which is a real cost, just not a billed one.",
    plan: "Free. Reddit in particular punishes anything that reads like an ad, so read the room you are posting in first.",
  },
};
