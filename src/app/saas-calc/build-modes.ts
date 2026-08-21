/* ── Build type: the second axis ─────────────────────────────────────
   Budget says how much you can spend. Build type says what you are
   building, which changes what the same row costs and whether a free
   tier survives contact with it at all.

   quick  · ship it this week, a few hundred users. Prices as listed.
   scale  · 10,000 users on the product. Free tiers on the product path
            stop being an option, and the paid rows cost more than the
            sticker. Company tools (design, tasks, prospecting) do not
            move, because 10,000 users does not mean 10,000 staff.
   self   · your own boxes. Only what can actually be self-hosted, priced
            at the share of the server it eats, not at $0. Software being
            free does not make hosting free.

   Anything absent from SCALE keeps its listed price. Anything absent
   from SELFHOST cannot be self-hosted and locks in that mode.

   Numbers are the same research as the rest of the page (16 Aug 2026)
   projected to 10k users, so they are estimates where the vendor prices
   on usage. PROSE RULE: no em dashes anywhere. */

export type Mode = "quick" | "scale" | "self";

export const MODES: { id: Mode; label: string; title: string; note: string }[] = [
  {
    id: "quick",
    label: "Early stage",
    title: "ship this week",
    note: "A few hundred users. Free tiers hold, managed everything, you write features instead of running servers.",
  },
  {
    id: "scale",
    label: "10,000 users",
    title: "it worked",
    note: "The free tiers on the product path are gone and the paid rows cost more than the sticker. Company tools do not move, because 10,000 users is not 10,000 staff.",
  },
  {
    id: "self",
    label: "Self-hosted",
    title: "your own boxes",
    note: "Only what can genuinely be self-hosted, priced at the share of the server it eats. Free software still needs somewhere to run, and someone to run it.",
  },
];

/** 10,000 users on the product. "dies" means the tier does not hold. */
export const SCALE: Record<string, number | "dies"> = {
  // database
  "supabase-free": "dies",
  "supabase-pro": 85, // Pro + Medium compute
  "neon-usage": 69,
  "pg-self": 24,
  "supabase-self": 45,
  // front end
  "vercel-hobby": "dies",
  "vercel-pro": 60,
  "cf-paid": 15,
  "hetzner-web": 12,
  // back end
  "render-free": "dies",
  "railway-hobby": "dies",
  "railway-pro": 80,
  "hetzner-app": 12,
  "aws-ec2": 210,
  firebase: 250,
  "gcp-run": 120,
  // error tracking
  "sentry-free": "dies",
  "sentry-team": 60,
  glitchtip: 30,
  rollbar: 41,
  bugsnag: 60,
  highlight: "dies",
  datadog: 92,
  // analytics
  "posthog-free": "dies",
  "posthog-usage": 120,
  "amplitude-free": "dies",
  mixpanel: "dies",
  plausible: 19,
  // transactional email
  "resend-free": "dies",
  "resend-pro": 35,
  postmark: 55,
  sendgrid: "dies",
  ses: 10,
  loops: 99,
  // the model in the product
  "api-light": 100,
  "api-steady": 430,
  "api-heavy": 1200,
  // voice and phone
  "el-starter": "dies",
  "el-creator": 99,
  "el-pro": 330,
  "twilio-sms": 600,
  vapi: 700,
  retell: 850,
  livekit: 200,
  "deepgram-agent": 450,
  // tracing
  "langfuse-free": "dies",
  "langfuse-core": 199,
  helicone: 20,
  // engine room
  bunny: 40,
  "cf-stream": 25,
  mux: 100,
  "firecrawl-free": "dies",
  "firecrawl-hobby": 83,
  jina: 20,
  tavily: 100,
  scrapingbee: 99,
  "openai-light": 100,
  "openai-steady": 300,
  "gemini-api": 40,
  exa: 40,
  places: 60,
  "places-free": "dies",
  "brave-search": "dies",
  osm: 0,
  // added 17 Aug after the comment sweep
  "convex-free": "dies",
  convex: 100,
  "neon-free": "dies",
  "turso-free": "dies",
  "mongodb-free": "dies",
  "netlify-free": "dies",
  planetscale: 39,
  turso: 29,
  mongodb: 57,
  netlify: 60,
  "cf-pages": 5,
  fly: 40,
  digitalocean: 24,
  fathom: 30,
  umami: 10,
  matomo: 10,
  openrouter: 100,
  groq: 80,
  kokoro: 20,
  cartesia: 199,
  phoenix: 20,
  // file storage: the row nobody budgets for until the uploads start
  r2: 20,
  s3: 25,
  b2: 12,
  "supabase-storage": 25,
  minio: 24,
  // auth prices on monthly active users, so this row moves hard
  "supabase-auth": 0,
  clerk: 100,
  "better-auth": 0,
  auth0: 240,
  workos: 0,
  // jobs
  "vercel-cron": 0,
  "pg-cron": 0,
  inngest: 50,
  trigger: 50,
  qstash: 20,
  // ops
  uptimerobot: 0,
  betterstack: 29,
  checkly: 40,
  "uptime-kuma": 0,
  "cf-waf": 20,
  arcjet: 50,
  "upstash-rl": 10,
  "own-files": 0,
  sanity: 60,
  payload: 0,
  contentful: 0,
  wordpress: 10,
  // the list outgrows the free newsletter tier long before the product does
  "beehiiv-free": "dies",
  "beehiiv-paid": 99,
  kit: 79,
};

/** What it costs when you run it yourself. Absent means you cannot. */
export const SELFHOST: Record<string, number> = {
  // the boxes themselves
  "hetzner-web": 5,
  "hetzner-app": 5,
  "pg-self": 0,
  "supabase-self": 15,
  // code hosting
  gitlab: 15,
  // error tracking
  "sentry-free": 20,
  glitchtip: 10,
  highlight: 15,
  // analytics
  "posthog-free": 25,
  plausible: 10,
  // email: SES is a pipe, not a platform, so it is the honest self-host answer
  ses: 1,
  // inbox
  "chatwoot-free": 15,
  // tracing
  "langfuse-free": 10,
  helicone: 10,
  // crawling
  crawl4ai: 5,
  livekit: 15,
  "firecrawl-free": 10,
  // models you can actually hold
  deepseek: 5,
  kimi: 5,
  // added 17 Aug: what can genuinely be run on your own boxes
  ollama: 15,
  vscode: 0,
  zed: 0,
  jetbrains: 29,
  umami: 5,
  matomo: 10,
  phoenix: 10,
  convex: 10,
  kokoro: 10,
  minio: 5,
  "better-auth": 0,
  "pg-cron": 0,
  "uptime-kuma": 5,
  "upstash-rl": 0,
  payload: 10,
  wordpress: 10,
  "own-files": 0,
  "gh-issues": 0,
  socials: 0,
  osm: 0,
  obs: 0,
  davinci: 0,
  affinity: 2,
  porkbun: 1,
  "cf-registrar": 1,
  // the rest of the company
  spreadsheet: 0,
  "own-blog": 0,
  linear: 0,
  "linkedin-free": 0,
  capcut: 0,
  "figma-free": 0,
  apollo: 0,
  namecheap: 1,
  "vercel-domains": 2,
  godaddy: 2,
  stripe: 0,
  halaxy: 0,
};

/** The price this option carries in this mode. null means it is not on. */
export function priceIn(id: string, listed: number, mode: Mode): number | null {
  if (mode === "scale") {
    const s = SCALE[id];
    if (s === "dies") return null;
    return typeof s === "number" ? s : listed;
  }
  if (mode === "self") {
    const s = SELFHOST[id];
    return typeof s === "number" ? s : null;
  }
  return listed;
}

export const lockReason = (mode: Mode) =>
  mode === "scale" ? "does not hold at 10,000 users" : "cannot be self-hosted";
