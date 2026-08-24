/* ── The Stack Builder game · data ───────────────────────────────────
   Gamified v2 of /saas-calc. Same verified pricing research
   (16 Aug 2026), reshaped into job slots and budget challenges.

   The board is the complete stack AND tools bill, walked in two parts:
   Part 1 the stack (what runs the product), Part 2 the tools (what
   runs the company). A challenge sets a budget and which slots are
   required; the player picks one option per required slot, stays under
   budget, and gets graded.

   PROSE RULE: no em dashes anywhere. */

export interface Option {
  id: string;
  name: string;
  plan: string;
  usd: number;
  domain?: string;
  eg?: string;
}

export interface Slot {
  id: string;
  label: string;
  options: Option[];
}

export interface Section {
  id: string;
  title: string;
  blurb: string;
  slotIds: string[];
}

export interface Challenge {
  id: string;
  label: string;
  title: string;
  budget: number;
  blurb: string;
  required: string[];
  optional: string[];
  daniel: Record<string, string>;
  danielLine: string;
  /** No ceiling, no grade, nothing locked. The plain calculator mode. */
  open?: boolean;
}

export const SLOTS: Slot[] = [
  /* ── Part 1 · the stack ─────────────────────────────────────────── */
  {
    id: "coding",
    label: "Coding",
    options: [
      { id: "claude-pro", name: "Claude", plan: "Pro", usd: 20, domain: "claude.com", eg: "nights and weekends" },
      { id: "claude-max20", name: "Claude", plan: "Max 20×", usd: 200, domain: "claude.com", eg: "you code all day" },
      { id: "codex", name: "Codex", plan: "ChatGPT Plus", usd: 20, domain: "openai.com", eg: "OpenAI's agent in the terminal" },
      { id: "gemini", name: "Gemini", plan: "Google AI Pro", usd: 20, domain: "gemini.google.com", eg: "Gemini CLI and Code Assist" },
      { id: "deepseek", name: "DeepSeek", plan: "API pay as you go", usd: 5, domain: "deepseek.com", eg: "the budget option" },
      { id: "kimi", name: "Kimi", plan: "API pay as you go", usd: 5, domain: "kimi.com", eg: "open weights, run it anywhere" },
      { id: "ollama", name: "Ollama", plan: "Self-hosted", usd: 0, domain: "ollama.com", eg: "models on your own machine" },
    ],
  },
  {
    id: "ide",
    label: "Editor",
    options: [
      { id: "vscode", name: "VS Code", plan: "Free", usd: 0, domain: "code.visualstudio.com", eg: "what most extensions target" },
      { id: "cursor-free", name: "Cursor", plan: "Hobby", usd: 0, domain: "cursor.com", eg: "free tier, limited agent requests" },
      { id: "cursor", name: "Cursor", plan: "Pro", usd: 20, domain: "cursor.com", eg: "VS Code with the AI built in" },
      { id: "zed", name: "Zed", plan: "Free", usd: 0, domain: "zed.dev", eg: "fast, native, collaborative" },
      { id: "windsurf-free", name: "Windsurf", plan: "Free", usd: 0, domain: "windsurf.com", eg: "a monthly credit allowance" },
      { id: "windsurf", name: "Windsurf", plan: "Pro", usd: 15, domain: "windsurf.com", eg: "the other AI editor" },
      { id: "jetbrains", name: "JetBrains", plan: "All Products", usd: 29, domain: "jetbrains.com", eg: "refactoring nobody has beaten" },
    ],
  },
  {
    id: "db",
    label: "Database",
    options: [
      { id: "supabase-free", name: "Supabase", plan: "Free", usd: 0, domain: "supabase.com", eg: "dies ~1,000 users" },
      { id: "supabase-pro", name: "Supabase", plan: "Pro", usd: 25, domain: "supabase.com", eg: "a real SaaS" },
      { id: "neon-free", name: "Neon", plan: "Free", usd: 0, domain: "neon.com", eg: "0.5GB, scales to zero" },
      { id: "neon-usage", name: "Neon", plan: "Usage", usd: 15, domain: "neon.com", eg: "lean production" },
      { id: "pg-self", name: "Postgres", plan: "On your own box", usd: 0, domain: "postgresql.org", eg: "you run it, you back it up" },
      { id: "supabase-self", name: "Supabase", plan: "Self-hosted", usd: 15, domain: "supabase.com", eg: "the whole platform, your box" },
      { id: "convex-free", name: "Convex", plan: "Starter", usd: 0, domain: "convex.dev", eg: "free until it is a business" },
      { id: "convex", name: "Convex", plan: "Pro", usd: 25, domain: "convex.dev", eg: "reactive by default, TypeScript throughout" },
      { id: "planetscale", name: "PlanetScale", plan: "Scaler", usd: 39, domain: "planetscale.com", eg: "MySQL that never blocks on a migration" },
      { id: "turso-free", name: "Turso", plan: "Free", usd: 0, domain: "turso.tech", eg: "500 databases, 9GB" },
      { id: "turso", name: "Turso", plan: "Starter", usd: 9, domain: "turso.tech", eg: "SQLite at the edge" },
      { id: "mongodb-free", name: "MongoDB", plan: "Atlas M0", usd: 0, domain: "mongodb.com", eg: "512MB shared, free forever" },
      { id: "mongodb", name: "MongoDB", plan: "Atlas Flex", usd: 9, domain: "mongodb.com", eg: "documents, not rows" },
    ],
  },
  {
    id: "frontend",
    label: "Front end",
    options: [
      { id: "vercel-hobby", name: "Vercel", plan: "Hobby", usd: 0, domain: "vercel.com", eg: "non-commercial only" },
      { id: "vercel-pro", name: "Vercel", plan: "Pro", usd: 20, domain: "vercel.com", eg: "any app that charges" },
      { id: "cf-paid", name: "Cloudflare", plan: "Workers Paid", usd: 5, domain: "cloudflare.com", eg: "app with API routes" },
      { id: "hetzner-web", name: "Hetzner", plan: "CX22 + Coolify", usd: 5, domain: "hetzner.com", eg: "your own box, your own uptime" },
      { id: "netlify-free", name: "Netlify", plan: "Free", usd: 0, domain: "netlify.com", eg: "100GB bandwidth, real projects" },
      { id: "netlify", name: "Netlify", plan: "Pro, per member", usd: 19, domain: "netlify.com", eg: "the other one everyone names" },
      { id: "cf-pages", name: "Cloudflare Pages", plan: "Free", usd: 0, domain: "pages.dev", eg: "static and edge, genuinely free" },
    ],
  },
  {
    id: "backend",
    label: "Back end",
    options: [
      { id: "render-free", name: "Render", plan: "Free", usd: 0, domain: "render.com", eg: "spins down when idle" },
      { id: "railway-hobby", name: "Railway", plan: "Hobby", usd: 5, domain: "railway.com", eg: "one small API" },
      { id: "railway-pro", name: "Railway", plan: "Pro + usage", usd: 20, domain: "railway.com", eg: "API plus a worker" },
      { id: "hetzner-app", name: "Hetzner", plan: "Second box", usd: 5, domain: "hetzner.com", eg: "workers and cron, self-run" },
      { id: "aws-ec2", name: "AWS", plan: "EC2 t4g.small", usd: 12, domain: "aws.amazon.com", eg: "the whole toolbox, you wire it" },
      { id: "firebase", name: "Firebase", plan: "Blaze, usage", usd: 10, domain: "firebase.google.com", eg: "auth, database and functions in one" },
      { id: "gcp-run", name: "Google Cloud", plan: "Cloud Run", usd: 10, domain: "cloud.google.com", eg: "containers that scale to zero" },
      { id: "fly", name: "Fly.io", plan: "Launch", usd: 5, domain: "fly.io", eg: "containers near your users" },
      { id: "digitalocean", name: "DigitalOcean", plan: "App Platform", usd: 6, domain: "digitalocean.com", eg: "the friendly middle ground" },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    options: [
      { id: "stripe", name: "Stripe", plan: "Pay as you earn", usd: 0, domain: "stripe.com", eg: "1.75% + 30¢ per charge" },
      { id: "paddle", name: "Paddle", plan: "5% + 50c, MoR", usd: 0, domain: "paddle.com", eg: "they are the seller, they file the tax" },
      { id: "lemonsqueezy", name: "Lemon Squeezy", plan: "5% + 50c, MoR", usd: 0, domain: "lemonsqueezy.com", eg: "Stripe owns it now" },
      { id: "polar", name: "Polar", plan: "4% + 40c, MoR", usd: 0, domain: "polar.sh", eg: "developer-first merchant of record" },
      { id: "creem", name: "Creem", plan: "3.9% + 40c, MoR", usd: 0, domain: "creem.io", eg: "cheapest MoR on this list" },
    ],
  },
  {
    id: "errors",
    label: "Error tracking",
    options: [
      { id: "sentry-free", name: "Sentry", plan: "Developer", usd: 0, domain: "sentry.io", eg: "5k errors free" },
      { id: "sentry-team", name: "Sentry", plan: "Team", usd: 26, domain: "sentry.io", eg: "50k errors" },
      { id: "glitchtip", name: "GlitchTip", plan: "Hosted", usd: 15, domain: "glitchtip.com", eg: "Sentry compatible, swap the DSN" },
      { id: "rollbar", name: "Rollbar", plan: "Essentials", usd: 15, domain: "rollbar.com", eg: "the old guard" },
      { id: "bugsnag", name: "Bugsnag", plan: "Starter", usd: 18, domain: "bugsnag.com", eg: "mobile-strong" },
      { id: "highlight", name: "Highlight.io", plan: "Free", usd: 0, domain: "highlight.io", eg: "errors plus session replay" },
      { id: "datadog", name: "Datadog", plan: "Infra + APM", usd: 46, domain: "datadoghq.com", eg: "the whole host, not just the app" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    options: [
      { id: "posthog-free", name: "PostHog", plan: "Free", usd: 0, domain: "posthog.com", eg: "1M events, 5k replays" },
      { id: "posthog-usage", name: "PostHog", plan: "Usage", usd: 40, domain: "posthog.com", eg: "~10k users" },
      { id: "amplitude-free", name: "Amplitude", plan: "Free", usd: 0, domain: "amplitude.com", eg: "2M events free" },
      { id: "mixpanel", name: "Mixpanel", plan: "Free", usd: 0, domain: "mixpanel.com", eg: "1M events free" },
      { id: "ga4", name: "Google Analytics", plan: "Free", usd: 0, domain: "analytics.google.com", eg: "everyone's default" },
      { id: "plausible", name: "Plausible", plan: "Starter", usd: 9, domain: "plausible.io", eg: "privacy-first, no cookies" },
      { id: "fathom", name: "Fathom", plan: "Starter", usd: 15, domain: "usefathom.com", eg: "privacy analytics, no banner" },
      { id: "umami", name: "Umami", plan: "Self-hosted", usd: 0, domain: "umami.is", eg: "open source, one container" },
      { id: "matomo", name: "Matomo", plan: "Self-hosted", usd: 0, domain: "matomo.org", eg: "the heavyweight you can own" },
    ],
  },
  {
    id: "email",
    label: "Product email",
    options: [
      { id: "resend-free", name: "Resend", plan: "Free", usd: 0, domain: "resend.com", eg: "3k emails, 100/day" },
      { id: "resend-pro", name: "Resend", plan: "Pro", usd: 20, domain: "resend.com", eg: "50k emails" },
      { id: "postmark", name: "Postmark", plan: "Basic", usd: 15, domain: "postmarkapp.com", eg: "deliverability obsessives" },
      { id: "sendgrid", name: "SendGrid", plan: "Free", usd: 0, domain: "sendgrid.com", eg: "100 emails a day" },
      { id: "ses", name: "Amazon SES", plan: "Usage", usd: 1, domain: "aws.amazon.com", eg: "cheapest at any volume" },
      { id: "loops", name: "Loops", plan: "Scale", usd: 49, domain: "loops.so", eg: "product email for SaaS" },
    ],
  },
  {
    id: "ai",
    label: "AI tokens",
    options: [
      { id: "api-light", name: "Anthropic API", plan: "Light", usd: 25, domain: "anthropic.com", eg: "one AI feature" },
      { id: "api-steady", name: "Anthropic API", plan: "Steady", usd: 100, domain: "anthropic.com", eg: "AI used daily" },
      { id: "api-heavy", name: "Anthropic API", plan: "Heavy", usd: 430, domain: "anthropic.com", eg: "AI is the product" },
      { id: "openrouter", name: "OpenRouter", plan: "Pay as you go", usd: 25, domain: "openrouter.ai", eg: "one key, every model" },
      { id: "groq", name: "Groq", plan: "Pay as you go", usd: 20, domain: "groq.com", eg: "open models, absurd speed" },
    ],
  },
  {
    id: "voice",
    label: "Voice AI",
    options: [
      { id: "el-starter", name: "ElevenLabs", plan: "Starter", usd: 6, domain: "elevenlabs.io", eg: "a demo agent" },
      { id: "el-creator", name: "ElevenLabs", plan: "Creator", usd: 22, domain: "elevenlabs.io", eg: "real callers" },
      { id: "el-pro", name: "ElevenLabs", plan: "Pro", usd: 99, domain: "elevenlabs.io", eg: "hundreds of calls" },
      { id: "vapi", name: "Vapi", plan: "Pay as you go", usd: 30, domain: "vapi.ai", eg: "you assemble the pieces" },
      { id: "retell", name: "Retell AI", plan: "Pay as you go", usd: 30, domain: "retellai.com", eg: "one bundled per-minute price" },
      { id: "livekit", name: "LiveKit", plan: "Agents, open source", usd: 0, domain: "livekit.io", eg: "run the whole pipeline yourself" },
      { id: "deepgram-agent", name: "Deepgram", plan: "Voice Agent", usd: 25, domain: "deepgram.com", eg: "transcription house, one API" },
      { id: "kokoro", name: "Kokoro", plan: "Self-hosted TTS", usd: 0, domain: "github.com", eg: "open weights voice, your box" },
      { id: "cartesia", name: "Cartesia", plan: "Pro", usd: 49, domain: "cartesia.ai", eg: "low latency, strong voices" },
    ],
  },
  {
    id: "phone",
    label: "Phone lines",
    options: [
      { id: "twilio-1", name: "Twilio", plan: "1 number", usd: 3, domain: "twilio.com", eg: "one line in" },
      { id: "twilio-sms", name: "Twilio", plan: "SMS-heavy", usd: 120, domain: "twilio.com", eg: "a reminder-heavy app" },
      { id: "mobilemessage", name: "Mobile Message", plan: "SMS-heavy, AU", usd: 40, domain: "mobilemessage.com.au", eg: "the same reminders, Australian gateway" },
      { id: "telnyx-1", name: "Telnyx", plan: "1 number", usd: 1, domain: "telnyx.com", eg: "same line, cheaper" },
      { id: "plivo", name: "Plivo", plan: "1 number", usd: 1, domain: "plivo.com", eg: "the third carrier" },
      { id: "vonage", name: "Vonage", plan: "1 number", usd: 1, domain: "vonage.com", eg: "old guard, wide reach" },
    ],
  },
  {
    id: "storage",
    label: "File storage",
    options: [
      { id: "r2", name: "Cloudflare R2", plan: "Usage", usd: 5, domain: "cloudflare.com", eg: "no egress fees, ever" },
      { id: "s3", name: "AWS S3", plan: "Usage", usd: 5, domain: "aws.amazon.com", eg: "the one everything speaks" },
      { id: "b2", name: "Backblaze B2", plan: "Usage", usd: 6, domain: "backblaze.com", eg: "cheapest per terabyte" },
      { id: "supabase-storage", name: "Supabase Storage", plan: "In your plan", usd: 0, domain: "supabase.com", eg: "already paid for, if you use Supabase" },
      { id: "minio", name: "MinIO", plan: "Self-hosted", usd: 0, domain: "min.io", eg: "S3 API on your own disk" },
    ],
  },
  {
    id: "auth",
    label: "Auth",
    options: [
      { id: "supabase-auth", name: "Supabase Auth", plan: "In your plan", usd: 0, domain: "supabase.com", eg: "comes with the database" },
      { id: "clerk", name: "Clerk", plan: "Pro", usd: 25, domain: "clerk.com", eg: "the components are the product" },
      { id: "better-auth", name: "Better Auth", plan: "Open source", usd: 0, domain: "better-auth.com", eg: "your database, your sessions" },
      { id: "auth0", name: "Auth0", plan: "Essentials", usd: 35, domain: "auth0.com", eg: "enterprise SSO checkboxes" },
      { id: "workos", name: "WorkOS", plan: "Free to 1M", usd: 0, domain: "workos.com", eg: "SSO when a big customer asks" },
    ],
  },
  {
    id: "jobs",
    label: "Background jobs",
    options: [
      { id: "vercel-cron", name: "Vercel Cron", plan: "In your plan", usd: 0, domain: "vercel.com", eg: "a schedule, nothing more" },
      { id: "pg-cron", name: "Postgres + cron", plan: "Roll your own", usd: 0, domain: "postgresql.org", eg: "a table and a timer" },
      { id: "inngest", name: "Inngest", plan: "Basic", usd: 20, domain: "inngest.com", eg: "durable steps, retries handled" },
      { id: "trigger", name: "Trigger.dev", plan: "Hobby", usd: 0, domain: "trigger.dev", eg: "long jobs without a server" },
      { id: "qstash", name: "QStash", plan: "Pay as you go", usd: 10, domain: "upstash.com", eg: "a queue over HTTP" },
    ],
  },
  {
    id: "tracing",
    label: "LLM tracing",
    options: [
      { id: "langfuse-free", name: "Langfuse", plan: "Hobby", usd: 0, domain: "langfuse.com", eg: "one LLM app" },
      { id: "langfuse-core", name: "Langfuse", plan: "Core", usd: 29, domain: "langfuse.com", eg: "production traces" },
      { id: "langsmith", name: "LangSmith", plan: "Plus", usd: 39, domain: "smith.langchain.com", eg: "the LangChain house option" },
      { id: "helicone", name: "Helicone", plan: "Free", usd: 0, domain: "helicone.ai", eg: "one-line proxy setup" },
      { id: "phoenix", name: "Phoenix", plan: "Self-hosted", usd: 0, domain: "arize.com", eg: "open source tracing and evals" },
    ],
  },

  /* ── Part 2 · the tools ─────────────────────────────────────────── */
  {
    id: "domain",
    label: "Domain",
    options: [
      { id: "namecheap", name: "Namecheap", plan: ".com amortised", usd: 1, domain: "namecheap.com", eg: "cheap renewals, no upsells" },
      { id: "vercel-domains", name: "Vercel", plan: ".com amortised", usd: 2, domain: "vercel.com", eg: "buy it where you deploy it" },
      { id: "godaddy", name: "GoDaddy", plan: ".com amortised", usd: 2, domain: "godaddy.com", eg: "the one everyone has heard of" },
      { id: "cf-registrar", name: "Cloudflare", plan: "At cost", usd: 1, domain: "cloudflare.com", eg: "sold at wholesale, no markup" },
      { id: "porkbun", name: "Porkbun", plan: ".com amortised", usd: 1, domain: "porkbun.com", eg: "cheap, and WHOIS privacy is free" },
    ],
  },
  {
    id: "codehost",
    label: "Code hosting",
    options: [
      { id: "github-free", name: "GitHub", plan: "Free", usd: 0, domain: "github.com", eg: "almost everyone" },
      { id: "github-team", name: "GitHub", plan: "Team", usd: 4, domain: "github.com", eg: "protected branches" },
      { id: "gitlab", name: "GitLab", plan: "Free", usd: 0, domain: "gitlab.com", eg: "built-in CI minutes" },
    ],
  },
  {
    id: "workspace",
    label: "Email + docs",
    options: [
      { id: "gws-starter", name: "Google Workspace", plan: "Starter", usd: 7, domain: "workspace.google.com", eg: "email on your own domain" },
      { id: "gws-standard", name: "Google Workspace", plan: "Standard", usd: 14, domain: "workspace.google.com", eg: "shared drives" },
      { id: "ms365", name: "Microsoft 365", plan: "Business Standard", usd: 12.5, domain: "microsoft.com", eg: "an Office-first team" },
    ],
  },
  {
    id: "accounting",
    label: "Accounting",
    options: [
      { id: "spreadsheet", name: "Google Sheets", plan: "Free", usd: 0, eg: "until the accountant complains" },
      { id: "qb", name: "QuickBooks", plan: "Simple Start", usd: 20, domain: "intuit.com", eg: "a company that invoices" },
      { id: "xero", name: "Xero", plan: "Ignite", usd: 25, domain: "xero.com", eg: "the AU accountant favourite" },
    ],
  },
  {
    id: "tasks",
    label: "Tasks",
    options: [
      { id: "clickup-free", name: "ClickUp", plan: "Free", usd: 0, domain: "clickup.com", eg: "a personal list" },
      { id: "clickup-paid", name: "ClickUp", plan: "Unlimited", usd: 10, domain: "clickup.com", eg: "a team tracking work" },
      { id: "gh-issues", name: "GitHub Issues", plan: "In your repo", usd: 0, domain: "github.com", eg: "already there, no second login" },
      { id: "linear", name: "Linear", plan: "Free", usd: 0, domain: "linear.app", eg: "engineers who hate clutter" },
    ],
  },
  {
    id: "inbox",
    label: "Support inbox",
    options: [
      { id: "chatwoot-free", name: "Chatwoot", plan: "Hacker", usd: 0, domain: "chatwoot.com", eg: "a solo founder inbox" },
      { id: "chatwoot-paid", name: "Chatwoot", plan: "Startups", usd: 19, domain: "chatwoot.com", eg: "SMS and WhatsApp in one place" },
      { id: "intercom", name: "Intercom", plan: "Essential", usd: 29, domain: "intercom.com", eg: "the polished incumbent" },
    ],
  },
  {
    id: "dms",
    label: "Keyword DMs",
    options: [
      { id: "manychat-free", name: "ManyChat", plan: "Free", usd: 0, domain: "manychat.com", eg: "testing keywords" },
      { id: "manychat-pro", name: "ManyChat", plan: "Pro", usd: 29, domain: "manychat.com", eg: "an IG account running keywords" },
      { id: "chatfuel", name: "Chatfuel", plan: "Business", usd: 20, domain: "chatfuel.com", eg: "the alternative" },
      { id: "meta-wa", name: "Meta WhatsApp", plan: "Per message", usd: 10, domain: "whatsapp.com", eg: "billed per conversation, not per seat" },
    ],
  },
  {
    id: "scraping",
    label: "Scraping + leads",
    options: [
      { id: "apify-free", name: "Apify", plan: "Pay as you go", usd: 0, domain: "apify.com", eg: "$5 free credit, then usage" },
      { id: "apify-starter", name: "Apify", plan: "Starter", usd: 29, domain: "apify.com", eg: "a lead list that refreshes" },
      { id: "phantombuster", name: "PhantomBuster", plan: "Starter", usd: 69, domain: "phantombuster.com", eg: "social scraping flows" },
    ],
  },
  {
    id: "prospecting",
    label: "Prospecting",
    options: [
      { id: "linkedin-free", name: "LinkedIn", plan: "Free", usd: 0, domain: "linkedin.com", eg: "manual prospecting" },
      { id: "socials", name: "Your socials", plan: "LinkedIn, IG, Reddit, X", usd: 0, domain: "instagram.com", eg: "distribution costs attention, not money" },
      { id: "salesnav", name: "LinkedIn Sales Nav", plan: "Core", usd: 99, domain: "linkedin.com", eg: "outbound as a channel" },
      { id: "apollo", name: "Apollo", plan: "Free", usd: 0, domain: "apollo.io", eg: "contacts on a budget" },
      { id: "instantly", name: "Instantly", plan: "Growth", usd: 37, domain: "instantly.ai", eg: "cold email at volume" },
    ],
  },
  {
    id: "design",
    label: "Design",
    options: [
      { id: "figma-free", name: "Figma", plan: "Starter", usd: 0, domain: "figma.com", eg: "occasional design" },
      { id: "figma-pro", name: "Figma", plan: "Professional", usd: 16, domain: "figma.com", eg: "a weekly habit" },
      { id: "canva-free", name: "Canva", plan: "Free", usd: 0, domain: "canva.com", eg: "genuinely enough for most posts" },
      { id: "canva-pro", name: "Canva", plan: "Pro", usd: 15, domain: "canva.com", eg: "brand templates" },
      { id: "adobe-cc", name: "Adobe", plan: "Creative Cloud", usd: 60, domain: "adobe.com", eg: "all the apps, the industry default" },
      { id: "affinity", name: "Affinity", plan: "One-time licence", usd: 2, domain: "affinity.serif.com", eg: "buy it once, keep it" },
      { id: "framer", name: "Framer", plan: "Basic", usd: 10, domain: "framer.com", eg: "design that is already the site" },
    ],
  },
  {
    id: "video",
    label: "Video + screen",
    options: [
      { id: "capcut", name: "CapCut", plan: "Free", usd: 0, domain: "capcut.com", eg: "the free editor" },
      { id: "loom-free", name: "Loom", plan: "Starter", usd: 0, domain: "loom.com", eg: "25 videos, 5 minutes each" },
      { id: "loom", name: "Loom", plan: "Business", usd: 15, domain: "loom.com", eg: "async walkthroughs" },
      { id: "descript-free", name: "Descript", plan: "Free", usd: 0, domain: "descript.com", eg: "an hour of transcription a month" },
      { id: "descript", name: "Descript", plan: "Creator", usd: 16, domain: "descript.com", eg: "edit video like a doc" },
      { id: "davinci", name: "DaVinci Resolve", plan: "Free", usd: 0, domain: "blackmagicdesign.com", eg: "the free one is the real product" },
      { id: "davinci-studio", name: "DaVinci Studio", plan: "$295 once", usd: 8, domain: "blackmagicdesign.com", eg: "one payment, over three years" },
      { id: "premiere", name: "Adobe Premiere", plan: "Single app", usd: 23, domain: "adobe.com", eg: "every month, forever" },
      { id: "obs", name: "OBS", plan: "Open source", usd: 0, domain: "obsproject.com", eg: "record and stream, free" },
    ],
  },
  {
    id: "newsletter",
    label: "Newsletter",
    options: [
      { id: "beehiiv-free", name: "Beehiiv", plan: "Launch", usd: 0, domain: "beehiiv.com", eg: "under 2,500 subs" },
      { id: "beehiiv-paid", name: "Beehiiv", plan: "Scale", usd: 39, domain: "beehiiv.com", eg: "a growing list" },
      { id: "kit", name: "Kit", plan: "Newsletter", usd: 0, domain: "kit.com", eg: "free to 10k subscribers" },
      { id: "own-blog", name: "Your blog", plan: "On your site", usd: 0, eg: "posts on the site you already pay for" },
    ],
  },
  /* ── Part 3 · the engine room (advanced) ────────────────────────── */
  {
    id: "secondmodel",
    label: "Second model",
    options: [
      { id: "openai-light", name: "OpenAI", plan: "API light", usd: 20, domain: "openai.com", eg: "Whisper and images" },
      { id: "openai-steady", name: "OpenAI", plan: "API steady", usd: 100, domain: "openai.com", eg: "a second model in production" },
      { id: "gemini-api", name: "Gemini API", plan: "Pay as you go", usd: 10, domain: "gemini.google.com", eg: "cheap long context" },
    ],
  },
  {
    id: "crawling",
    label: "Crawling",
    options: [
      { id: "firecrawl-free", name: "Firecrawl", plan: "Free", usd: 0, domain: "firecrawl.dev", eg: "occasional scraping" },
      { id: "firecrawl-hobby", name: "Firecrawl", plan: "Hobby", usd: 16, domain: "firecrawl.dev", eg: "a weekly crawl job" },
      { id: "jina", name: "Jina Reader", plan: "Free", usd: 0, domain: "jina.ai", eg: "URL to markdown, free" },
      { id: "crawl4ai", name: "Crawl4AI", plan: "Self-hosted", usd: 0, domain: "crawl4ai.com", eg: "open source, you run it" },
      { id: "tavily", name: "Tavily", plan: "Pay as you go", usd: 30, domain: "tavily.com", eg: "search plus extract, for agents" },
      { id: "scrapingbee", name: "ScrapingBee", plan: "Freelance", usd: 49, domain: "scrapingbee.com", eg: "sites that block you" },
    ],
  },
  {
    id: "codereview",
    label: "AI code review",
    options: [
      { id: "coderabbit", name: "CodeRabbit", plan: "Pro", usd: 24, domain: "coderabbit.ai", eg: "every PR reviewed" },
      { id: "copilot-review", name: "GitHub Copilot", plan: "Business", usd: 19, domain: "github.com", eg: "review inside GitHub" },
      { id: "greptile", name: "Greptile", plan: "Standard", usd: 30, domain: "greptile.com", eg: "codebase-aware review" },
    ],
  },
  {
    id: "imagegen",
    label: "Image + video gen",
    options: [
      { id: "fal", name: "fal.ai", plan: "Pay as you go", usd: 10, domain: "fal.ai", eg: "images in a pipeline" },
      { id: "higgsfield", name: "Higgsfield", plan: "Creator", usd: 39, domain: "higgsfield.ai", eg: "regular gen work" },
      { id: "midjourney", name: "Midjourney", plan: "Basic", usd: 10, domain: "midjourney.com", eg: "the style benchmark" },
    ],
  },
  {
    id: "dataapis",
    label: "Data APIs",
    options: [
      { id: "places-free", name: "Google Places", plan: "Free tier", usd: 0, domain: "maps.google.com", eg: "10k calls a month, free" },
      { id: "osm", name: "OpenStreetMap", plan: "Free", usd: 0, domain: "openstreetmap.org", eg: "no key, no bill, be polite" },
      { id: "brave-search", name: "Brave Search", plan: "Free tier", usd: 0, domain: "brave.com", eg: "2,000 queries a month, free" },
      { id: "exa", name: "Exa", plan: "Pay as you go", usd: 10, domain: "exa.ai", eg: "AI search in a workflow" },
      { id: "places", name: "Google Places", plan: "Usage", usd: 20, domain: "maps.google.com", eg: "local business data" },
      { id: "serper", name: "Serper", plan: "Starter", usd: 50, domain: "serper.dev", eg: "Google results as JSON" },
    ],
  },
  {
    id: "uptime",
    label: "Uptime + status",
    options: [
      { id: "uptimerobot", name: "UptimeRobot", plan: "Free", usd: 0, domain: "uptimerobot.com", eg: "50 checks, 5 minutes apart" },
      { id: "betterstack", name: "Better Stack", plan: "Freelancer", usd: 29, domain: "betterstack.com", eg: "checks, on-call and a status page" },
      { id: "checkly", name: "Checkly", plan: "Hobby", usd: 0, domain: "checklyhq.com", eg: "browser checks, not just pings" },
      { id: "uptime-kuma", name: "Uptime Kuma", plan: "Self-hosted", usd: 0, domain: "uptime.kuma.pet", eg: "open source, one container" },
    ],
  },
  {
    id: "security",
    label: "Rate limiting + WAF",
    options: [
      { id: "cf-waf", name: "Cloudflare WAF", plan: "Free", usd: 0, domain: "cloudflare.com", eg: "in front of everything already" },
      { id: "arcjet", name: "Arcjet", plan: "Free", usd: 0, domain: "arcjet.com", eg: "rate limits in your code, not your DNS" },
      { id: "upstash-rl", name: "Upstash Ratelimit", plan: "Pay as you go", usd: 0, domain: "upstash.com", eg: "Redis counters, serverless" },
    ],
  },
  {
    id: "cms",
    label: "Content",
    options: [
      { id: "own-files", name: "Markdown in the repo", plan: "Free", usd: 0, domain: "github.com", eg: "the content ships with the code" },
      { id: "sanity", name: "Sanity", plan: "Free, then per seat", usd: 0, domain: "sanity.io", eg: "structured content, real API" },
      { id: "payload", name: "Payload", plan: "Self-hosted", usd: 0, domain: "payloadcms.com", eg: "open source, lives in your app" },
      { id: "contentful", name: "Contentful", plan: "Free", usd: 0, domain: "contentful.com", eg: "the enterprise default" },
      { id: "wordpress", name: "WordPress", plan: "Self-hosted", usd: 10, domain: "wordpress.org", eg: "still runs half the web" },
    ],
  },
  {
    id: "cdn",
    label: "Video CDN",
    options: [
      { id: "bunny", name: "Bunny", plan: "Usage", usd: 10, domain: "bunny.net", eg: "hosting your own video" },
      { id: "cf-stream", name: "Cloudflare Stream", plan: "Usage", usd: 5, domain: "cloudflare.com", eg: "per minute stored" },
      { id: "mux", name: "Mux", plan: "Usage", usd: 20, domain: "mux.com", eg: "the developer favourite" },
    ],
  },
];


export const SECTIONS: Section[] = [
  {
    id: "stack",
    title: "Part 1 · The stack",
    blurb: "What runs the product. One tool per job.",
    slotIds: [
      "coding", "ide", "db", "frontend", "backend", "payments", "errors",
      "analytics", "email", "ai", "voice", "phone", "storage", "auth", "jobs", "tracing",
    ],
  },
  {
    id: "tools",
    title: "Part 2 · The tools",
    blurb: "What runs the company around the product. The part every stack video forgets.",
    slotIds: [
      "domain", "codehost", "workspace", "accounting", "tasks", "inbox",
      "dms", "scraping", "prospecting", "design", "video", "newsletter",
    ],
  },
  {
    id: "engine",
    title: "Part 3 · The engine room",
    blurb: "The advanced layer: second models, crawlers, generators, data APIs. Only the advanced challenge opens it.",
    slotIds: ["secondmodel", "crawling", "codereview", "imagegen", "dataapis", "cdn", "uptime", "security", "cms"],
  },
];

export const CHALLENGES: Challenge[] = [
  {
    id: "c25",
    label: "$25",
    title: "The ramen build",
    budget: 25,
    blurb:
      "Ship something real this week for less than a takeaway. Code it, host it, store data, own the name, keep the code somewhere. You can charge for it too: Stripe takes a cut, not a subscription. Just not on Vercel Hobby, which is non-commercial by the terms.",
    required: ["coding", "ide", "db", "frontend", "domain", "codehost", "tracing"],
    optional: ["email", "errors", "backend", "payments"],
    daniel: {
      coding: "claude-pro",
      ide: "vscode",
      db: "supabase-free",
      frontend: "vercel-hobby",
      domain: "namecheap",
      codehost: "github-free",
      tracing: "langfuse-free",
      email: "resend-free",
      errors: "sentry-free",
    },
    danielLine:
      "Claude Pro plus a one dollar domain. Everything else rides free tiers, tracing included. Nine tools, live this week.",
  },
  {
    id: "c100",
    label: "$100",
    title: "The first customer",
    budget: 100,
    blurb:
      "Someone is about to pay you. Now it needs a back end, payments, error tracking, and email on your own domain. Vercel Hobby is out, the free tier is non-commercial.",
    required: ["coding", "ide", "db", "frontend", "backend", "payments", "errors", "domain", "codehost", "workspace", "tracing"],
    optional: ["analytics", "email", "tasks", "design", "storage", "auth"],
    daniel: {
      coding: "claude-pro",
      ide: "cursor",
      db: "supabase-pro",
      frontend: "vercel-pro",
      backend: "railway-hobby",
      payments: "stripe",
      errors: "sentry-free",
      domain: "namecheap",
      codehost: "github-free",
      workspace: "gws-starter",
      tracing: "langfuse-free",
      analytics: "posthog-free",
      email: "resend-free",
      tasks: "clickup-free",
      design: "figma-free",
    },
    danielLine:
      "Supabase Pro and Vercel Pro are the honest costs of charging money, Workspace makes the email real. Fifteen tools with room to spare.",
  },
  {
    id: "c1000",
    label: "$1,000",
    title: "The real company",
    budget: 1000,
    blurb:
      "A growing product with an AI feature, plus the company around it: books, support inbox, the works. This is the tier where the AI line starts beating the servers.",
    required: [
      "coding", "ide", "db", "frontend", "backend", "payments", "errors",
      "analytics", "email", "ai", "tracing",
      "domain", "codehost", "workspace", "accounting", "inbox",
    ],
    optional: [
      "voice", "phone", "scraping", "design", "video", "tasks", "dms", "prospecting", "newsletter",
      "secondmodel", "crawling", "codereview", "imagegen", "dataapis", "cdn",
      "storage", "auth", "jobs", "uptime", "security", "cms",
    ],
    daniel: {
      coding: "claude-max20",
      ide: "cursor",
      db: "supabase-pro",
      frontend: "vercel-pro",
      backend: "railway-pro",
      payments: "stripe",
      errors: "sentry-free",
      analytics: "posthog-free",
      email: "resend-pro",
      ai: "api-heavy",
      domain: "namecheap",
      codehost: "github-team",
      workspace: "gws-starter",
      accounting: "qb",
      inbox: "chatwoot-paid",
      voice: "el-creator",
      phone: "twilio-1",
      tracing: "langfuse-free",
      scraping: "apify-starter",
      design: "figma-pro",
      video: "capcut",
      tasks: "clickup-paid",
      dms: "manychat-pro",
      codereview: "coderabbit",
      crawling: "firecrawl-hobby",
    },
    danielLine:
      "Twenty-six tools. The coding seat and the product API together are more than half of it, and the entire tools section costs less than the AI line. That is the shape of an AI company's bill.",
  },
  {
    id: "cadv",
    label: "$2,000",
    title: "Advanced: everything I use",
    budget: 2000,
    blurb:
      "The complete Routiq board. Every slot on the real bill is open and every one is required: the stack, the tools, and the engine room. Thirty picks. Beat my setup.",
    required: [
      "coding", "ide", "db", "frontend", "backend", "payments",
      "errors", "analytics", "email", "ai", "voice", "phone",
      "tracing", "domain", "codehost", "workspace", "accounting", "tasks",
      "inbox", "dms", "scraping", "prospecting", "design", "video",
      "newsletter", "secondmodel", "crawling", "codereview", "imagegen", "dataapis",
      "cdn",
    ],
    optional: ["storage", "auth", "jobs", "uptime", "security", "cms"],
    daniel: {
      coding: "claude-max20",
      ide: "cursor",
      db: "supabase-pro",
      frontend: "vercel-pro",
      backend: "railway-pro",
      payments: "stripe",
      errors: "sentry-team",
      analytics: "posthog-free",
      email: "resend-free",
      ai: "api-heavy",
      voice: "el-creator",
      phone: "mobilemessage",
      tracing: "langfuse-core",
      domain: "namecheap",
      codehost: "github-team",
      workspace: "gws-starter",
      accounting: "qb",
      tasks: "clickup-paid",
      inbox: "chatwoot-paid",
      dms: "manychat-pro",
      scraping: "apify-starter",
      prospecting: "salesnav",
      design: "figma-pro",
      video: "capcut",
      newsletter: "beehiiv-free",
      secondmodel: "openai-steady",
      crawling: "firecrawl-hobby",
      codereview: "coderabbit",
      imagegen: "higgsfield",
      dataapis: "places",
      cdn: "bunny",
      storage: "supabase-storage",
      jobs: "vercel-cron",
      cms: "own-files",
    },
    danielLine:
      "Thirty slots, the whole engine room running. Look at the AI column: the coding seat, the product API and a second model are over half the bill. The tools and engine room together cost less than the AI does.",
  },
  {
    id: "open",
    label: "no limit",
    title: "Price your own stack",
    budget: 0,
    open: true,
    blurb:
      "No ceiling and no grade. Every tool is unlocked, nothing is required, and the number at the bottom is whatever you pick. Use this one to price the stack you already run.",
    required: [],
    optional: [],
    daniel: {
      coding: "claude-max20",
      ide: "cursor",
      db: "supabase-pro",
      frontend: "vercel-pro",
      backend: "railway-pro",
      payments: "stripe",
      errors: "sentry-team",
      analytics: "posthog-free",
      email: "resend-free",
      ai: "api-heavy",
      voice: "el-creator",
      phone: "mobilemessage",
      tracing: "langfuse-core",
      domain: "namecheap",
      codehost: "github-team",
      workspace: "gws-starter",
      accounting: "qb",
      tasks: "clickup-paid",
      inbox: "chatwoot-paid",
      dms: "manychat-pro",
      scraping: "apify-starter",
      prospecting: "salesnav",
      design: "figma-pro",
      video: "capcut",
      newsletter: "beehiiv-free",
      secondmodel: "openai-steady",
      crawling: "firecrawl-hobby",
      codereview: "coderabbit",
      imagegen: "higgsfield",
      dataapis: "places",
      cdn: "bunny",
      storage: "supabase-storage",
      jobs: "vercel-cron",
      cms: "own-files",
    },
    danielLine:
      "Thirty rows, everything Routiq runs on. Swap any row for what you actually pay and the total moves with you.",
  },
];

export interface Grade {
  mark: string;
  verdict: string;
}

/** Grade a finished board. Over budget never grades. */
export function grade(
  total: number,
  budget: number,
  requiredFilled: boolean,
  optionalCount: number,
  optionalTotal: number,
): Grade | null {
  if (!requiredFilled || total > budget) return null;
  const headroom = (budget - total) / budget;
  if (optionalCount >= Math.min(2, optionalTotal) && headroom >= 0.12)
    return { mark: "S", verdict: "Ships fast, covered everywhere, money left over. This is the build." };
  if (optionalCount >= 1 && headroom >= 0.06)
    return { mark: "A", verdict: "Under budget with real coverage. You would actually run this." };
  if (headroom >= 0.02)
    return { mark: "B", verdict: "It works and it fits. The gaps will introduce themselves later." };
  return { mark: "C", verdict: "Every dollar spent and nothing spare. One overage email ends this." };
}
