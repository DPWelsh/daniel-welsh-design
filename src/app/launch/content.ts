/* ── /launch · Field Guide № 004 ──────────────────────────────────────
   Payload for the LAUNCH keyword (P02, "five things before you launch").

   The reel names the five things; this page is the how. Every section is
   mechanics (the exact tags, the exact records, the exact toggles) and
   every product claim (Vercel DNS values, PostHog consent modes, Sentry
   and Better Stack free tiers, Supabase backup tiers, GSC behaviour) was
   re-verified against current docs in August 2026, then adversarially
   fact-checked a second time. Where an older tutorial disagrees with this
   page, the tutorial is out of date.

   Treatment follows /ship: authority framing, artifacts you can paste,
   first person where it earns it.

   PROSE RULES (set 2026-08-14, and they are load-bearing):
   no em dashes anywhere, and one idea per sentence. The reader is a
   builder on launch day with fifteen tabs open. Long clause-stacked
   sentences are where they lose the thread, so break them. Lead each
   paragraph with the instruction, then the reason. If a sentence needs
   a subordinate clause to survive, it wanted to be two sentences. */

/* ── the opener ─────────────────────────────────────────────────────── */

export const WHY_YOU = {
  line: "You cannot see your own launch, because you never arrive at it from the outside.",
  a: "You open the app from localhost, from a bookmark, from muscle memory. A stranger arrives from a link in a group chat. The first thing they see is not your app. It is the grey box WhatsApp drew because you never gave it an image. Every item on this list lives in that gap: invisible from inside the build, glaring from outside it.",
  b: "None of them are features. None of them make the product better. They decide what the thirty seconds around your product look like. The card the link unfurls into. The domain in the address bar. The first screen a cold visitor has to decode. And whether you can watch any of it happening.",
  c: "So do them the day before the link goes out, in one sitting, in this order.",
};

export const LEDE =
  "The reel named the five things. This is the how for each one: the exact tags, the exact DNS records, the empty-state pattern, the replay setup and the sitemap rules. Plus the five that come after, for your first week live, and eight files to paste straight in.";

/* ── the five checks ────────────────────────────────────────────────── */

export interface CheckStep {
  h: string;
  body: string;
}

export interface Check {
  n: string;
  id: string;
  title: string;
  lede: string;
  steps: CheckStep[];
  gotchas: string[];
  test: string;
}

export const CHECKS: Check[] = [
  {
    n: "01",
    id: "preview",
    title: "The preview image",
    lede: "Someone pastes your link into WhatsApp, iMessage, Slack or LinkedIn. That platform's scraper fetches the page once, reads a few meta tags, and draws the card. No tags is a bare grey URL. Broken tags get cached and shown to everyone who shares the link, for days. This is the single cheapest-looking thing in software. It costs five tags and one image.",
    steps: [
      {
        h: "Ship the five-tag set",
        body: "Five tags cover Facebook, WhatsApp, iMessage, Slack, LinkedIn, Discord and X. They are og:title, og:description, og:image, og:type, and twitter:card set to summary_large_image so X uses the full-width layout. Watch the attribute split: og tags use property=, twitter tags use name=. They must appear in the server-rendered head, because scrapers do not run JavaScript. The exact block is in the steals below.",
      },
      {
        h: "Make the image to spec: 1200×630, absolute, legible tiny",
        body: "One 1200×630 image, served from an absolute https URL that opens in an incognito tab with no auth in the way. Design it for thumbnail size. One short line of large text, high contrast, subject centred. WhatsApp and iMessage often crop it to a small square, so keep nothing important near the edges. JPG or PNG under about 300KB. WhatsApp silently drops images over 600KB and does not render SVG. Zoom your browser to 25% and check you can still read it.",
      },
      {
        h: "In Next.js: the metadata export, and metadataBase once",
        body: "Export metadata from app/layout.tsx for the site-wide default, then override per page. Set metadataBase once in the root layout. It is what turns a relative image path into an absolute production URL. On current Next.js, forgetting it fails the build loudly. On older versions it silently resolved images against the deployment URL, which is how previews work locally and die when shared.",
      },
      {
        h: "Or use the file convention",
        body: "Drop a 1200×630 file named opengraph-image.png into app/. Next.js emits the og:image tags with a correct absolute URL, plus alt text from opengraph-image.alt.txt beside it. Two catches the docs bury. The static convention takes jpg, jpeg, png or gif only, never WebP. And it does not emit twitter:image. Either add a twitter-image file too, or leave it out and X falls back to og:image while your twitter:card export still controls the layout.",
      },
      {
        h: "Know the caches, because edits do not show immediately",
        body: "Every platform scrapes once and caches the card against the exact URL string. Slack holds it for half an hour to a few hours, so delete the message and repost. WhatsApp holds it for days to weeks with no official flush. iMessage renders on the sender's device at send time, and bubbles already sent never update. The universal escape is a throwaway query string. yourdomain.com/?v=2 is a new exact URL, so everything scrapes it fresh. Facebook and Messenger have the Sharing Debugger's Scrape Again button. LinkedIn has the Post Inspector.",
      },
    ],
    gotchas: [
      "og:image must be an absolute https URL. A relative path renders fine in your own browser and dies in the scraper. In Next.js the fix is metadataBase, set once.",
      "Vercel preview deployments sit behind Vercel Authentication by default, so scrapers get a 401 and no card ever appears. Test previews against production only.",
      "Tags injected client-side are invisible to scrapers. That means a Vite SPA with react-helmet, or anything set in useEffect. The App Router metadata export is safe because it renders on the server.",
      "X's Card Validator stopped rendering previews years ago even though twitter:card still works. Test X with a real post to yourself, not the validator.",
    ],
    test: "Deploy, then curl your production URL and grep for og:. All five tags present, image URL absolute, and it opens in incognito. Then DM the link to yourself on WhatsApp: full card inside a few seconds. Iterating on the image? Share ?v=2 to dodge the cache.",
  },
  {
    n: "02",
    id: "subdomains",
    title: "Subdomains",
    lede: "App at app.example.com, marketing at example.com, from the very first deploy. Done on day one this is one CNAME record and two minutes in the Vercel dashboard. Done after launch it is a migration: every user logged out, auth config rewritten, search history split across two hosts.",
    steps: [
      {
        h: "Two Vercel projects, three domains",
        body: "Domains attach to projects, so the split starts with two projects even if both live in one repo. The marketing project gets example.com and www.example.com. The app project gets app.example.com. Settings → Domains → Add Domain in each. Custom domains work on the free Hobby plan.",
      },
      {
        h: "The one CNAME",
        body: "At your registrar, add one CNAME. Name is app, value is copied from the Vercel domain card. Copy the card, not a tutorial. Vercel now issues per-project targets like d1d4fc829fe7bc7c.vercel-dns-017.com. The old shared cname.vercel-dns.com still resolves, but verification checks for the exact value your card shows. TLS is provisioned automatically once it propagates. This one record is the entire separation.",
      },
      {
        h: "The apex pair",
        body: "The DNS spec forbids CNAMEs on an apex, so example.com gets an A record. Most projects show 76.76.21.21. Newer ones draw from an anycast pool and may show a different IP, so again: copy the card. www is an ordinary CNAME, like the app subdomain.",
      },
      {
        h: "Wire the redirects",
        body: "In the marketing project, set the secondary domain to redirect to the primary with a permanent 308. Vercel's dropdown does it. Then forward the app paths people will inevitably type on the wrong domain. /login and /app/* on the marketing site should land on app.example.com. Two lines of next.config, in the steals.",
      },
      {
        h: "Know the migration you are skipping",
        body: "Auth cookies are host-scoped. The sb-…-auth-token cookie Supabase sets on example.com is never sent to app.example.com. So moving the app after launch force-logs-out every user you have. You would also rewrite Supabase's Site URL and every Redirect URL, while magic-link emails already sitting in inboxes still point at the old host. Search engines treat the subdomain as a separate site, so months of indexed app routes become 301s you maintain forever. Before launch, all of that is one CNAME.",
      },
    ],
    gotchas: [
      "Copy DNS values from your project's domain card, never from a tutorial. A mismatched value leaves the domain stuck on Invalid Configuration.",
      "DNS on Cloudflare: keep both records DNS-only (grey cloud) until Vercel verifies and issues certificates. Proxying with Flexible SSL is an infinite redirect loop.",
      "Do not set Domain=.example.com on auth cookies to share login with the marketing site. Host-only cookies are the point. Analytics and chat widgets on marketing pages must never be able to read the app session.",
      "Supabase's Site URL takes exactly one value: the app domain. Localhost and Vercel previews go in the Redirect URLs allowlist, which accepts wildcards. Auth emails build their links from Site URL, so pointing it at the marketing domain sends magic links to a page with no auth handler.",
    ],
    test: "dig the apex (returns the A record from your card) and the app subdomain (returns the vercel-dns chain). curl -sI both: 200s, with a 308 from the secondary. Then log in at the app and check DevTools cookies. The auth token lives on app.example.com only, and the marketing domain carries none.",
  },
  {
    n: "03",
    id: "first-action",
    title: "The onboarding path",
    lede: "Ten seconds after a cold open, a new user has either spotted the one thing to do or started drifting toward the tab-close button. You do not need a product tour. You need three things: one decided first action, an empty state that states it as an instruction, and one tracked event that proves it happened.",
    steps: [
      {
        h: "Work backwards from the activation event",
        body: "Finish this sentence before touching any UI copy. A user has gotten the point of this app the moment they ___. That moment is your activation event. The one first action is the smallest visible step that causes it. The first screen exists to cause that action and nothing else. Every other card, nav item and settings link is a competitor. If you cannot name a single action, that is a positioning problem, and no amount of UI fixes it.",
      },
      {
        h: "Write every empty state as the instruction",
        body: "A brand-new account sees empty screens. So the empty state is your onboarding whether you wrote it or not, and “No items yet” is an onboarding screen that teaches nothing. Give it three lines: what this screen becomes, the one action as an imperative button, and an escape hatch for people not ready to commit real data. The button repeats the exact promise your landing page made, in the same words.",
      },
      {
        h: "Worked example: the scanner",
        body: "For a run-something-on-my-thing tool, the input field is the app. Put it above the fold. The headline does the instructing, the field is autofocused, and the placeholder is a realistic example. Never the word URL. Fire activation when the report renders, not when the button is clicked, because a crawl that errored is not an activated user.",
      },
      {
        h: "Worked example: the inbox",
        body: "A booking or chat product only feels real when the owner experiences it from their customer's side. The empty inbox shows their new number and tells them to text it from their own phone. The assistant's reply landing on their personal mobile is the magic moment, and it doubles as an end-to-end test of their telephony wiring. Activation is the reply. Not the signup, not the number provisioning.",
      },
      {
        h: "Worked example: the dashboard",
        body: "Never render an empty dashboard as blank panels. Use grey ghost charts, so they see the shape of what they are buying. Put one connect button centred over them with a time estimate on it. Sample data is the escape hatch, behind a link. Activation is not the OAuth callback. It is the first render containing their real data.",
      },
      {
        h: "Track the action. Skip the tour.",
        body: "Tours teach where buttons are. The single action delivers the thing the buttons exist for. The industry's own benchmark data shows barely six in ten started tours even get finished, which measures patience, not activation. Instrument two things in PostHog. The activation event, fired server-side where the value is delivered. And a signup-to-activation funnel, so the drop-off is visible. On serverless, flush before the function exits or the event dies with it.",
      },
    ],
    gotchas: [
      "Fire activation on value delivery, not on the click. A click that ended in an error toast inflates the number with failed runs.",
      "If the first action happens before login, typical for scanner tools, events carry an anonymous ID. Call identify at signup so pre-signup activity stitches to the account, or your funnel silently reports near zero.",
      "AI scaffolds ship dead empty states without asking. Grep the repo for “no data yet” and its cousins. Every hit is an onboarding screen you have not written.",
      "Sample data must look fake. Use a persistent banner and obviously synthetic names. Unlabelled demo data makes new users think the app is broken or showing someone else's account.",
    ],
    test: "Open production in an incognito window on your phone and hand it to someone who has never seen it. Within ten seconds they should say the first action back to you in your own button's words. Then perform it yourself and watch the live events feed: exactly one activation event, at the moment the value renders.",
  },
  {
    n: "04",
    id: "replay",
    title: "Analytics, with session replay",
    lede: "Pageview counts tell you people came. Session replay shows you the exact moment they gave up. PostHog does both on one free tier: a million events and five thousand replays a month, no card. The current Next.js setup is one file at the repo root. Set it up before launch, because your first ten real users are the most informative ten replays you will ever watch.",
    steps: [
      {
        h: "One file: instrumentation-client.ts",
        body: "Sign up, pick your region, grab the project token, npm install posthog-js. The current App Router pattern is an instrumentation-client.ts file in the project root. If your app uses a src directory it must live there instead, or it is silently ignored. No provider component, no wrapper. Next.js runs it before hydration. Call identify after login so replays have names, and reset on logout. Add the env vars to Vercel too, then redeploy, because NEXT_PUBLIC values bake in at build time.",
      },
      {
        h: "Flip the replay toggle, and know what is masked",
        body: "Recording stays off until you enable it in the PostHog app: Settings → Session replay → Record user sessions. SDK config alone does nothing. The defaults protect inputs. Every input is masked before it leaves the browser, so emails, passwords and card fields never reach PostHog. Text that your app renders on screen is not masked by default. If the screen shows sensitive data, health or finance, mask all text or put ph-no-capture on the element and it renders as a black box.",
      },
      {
        h: "Pick US or EU Cloud before you ship",
        body: "You choose the region at signup and it sticks. Moving later is a support ticket, not a toggle. Same product and free tier either way. The only code difference is the host URL. If your users are mostly European, or you want data-stays-in-the-EU as a one-line GDPR answer, pick Frankfurt now.",
      },
      {
        h: "Cookie banner or cookieless, decided by audience",
        body: "PostHog sets a first-party cookie by default. For an AU or US audience no law forces a banner for that. Disclose analytics in the privacy policy and move on. For EU and UK visitors you need consent, or no storage at all. Cookieless mode set to always never touches storage and counts uniques with a daily server-side hash, so no banner is needed. But session replay does not work without storage consent, full stop. The honest EU combination is a banner with cookieless on_reject. Nothing at all is captured while the banner sits unanswered, because pre-consent events are dropped rather than queued. Then full tracking from the moment they accept, and hash-counting if they decline.",
      },
      {
        h: "Watch your first ten users end to end",
        body: "After launch, open Session replay daily until you have watched ten real strangers. Sampling comes later. Use the built-in frustration filter, turn on skip-inactivity, run at 2×. Look for three things. Rage clicks, meaning three clicks inside a second in the same spot, flagged automatically on the timeline. Dead ends, where they bounce between the same two screens. And the stall, the long motionless pause on a form or pricing page right before the tab closes. Fix the single worst stall before you fix anything else.",
      },
    ],
    gotchas: [
      "“No banner and full replays from EU users” is not an available combination. Replay requires storage consent. Cookieless counting works without it. Pick per audience, not per wish.",
      "Adblockers eat a share of events and recordings. Before concluding nobody visited, put PostHog behind a reverse proxy. The managed one is free for Cloud users.",
      "Set a billing limit. The free tier is generous, but it rolls into pay-as-you-go, and a traffic spike should not be able to surprise-charge you. Free-tier replays keep for 30 days, so export anything you want forever.",
      "The project token is public by design, so it is fine in the client bundle. But it bakes in at build time, so adding it to Vercel after deploying does nothing until you rebuild.",
    ],
    test: "Deploy, open production in a private window with the adblocker off, and behave like a confused user for ninety seconds. Type a fake email, rage-click some static text, idle twenty seconds, close the tab. A few minutes later the session sits at the top of Session replay: input masked, rage click flagged on the timeline, skip-inactivity jumping your idle gap. An empty list means the toggle is off, or requests to your PostHog host are not leaving the page.",
  },
  {
    n: "05",
    id: "sitemap",
    title: "sitemap.xml",
    lede: "A sitemap is a machine-readable list of your public URLs, so Google finds every page without guessing from links. In Next.js it is one TypeScript file. Submitting it takes ten minutes plus a DNS wait. This is plumbing, not growth. It removes discovery as a failure point, nothing more.",
    steps: [
      {
        h: "One file: app/sitemap.ts",
        body: "A default-exported function returning MetadataRoute.Sitemap, served automatically at /sitemap.xml. Make it async if it needs to pull blog slugs from the database, because it runs at build time by default. Only url is required per entry. Set lastModified when it is real, and skip changeFrequency and priority entirely, because Google ignores both.",
      },
      {
        h: "Public pages only. This is the hard rule.",
        body: "List only what a logged-out stranger should see: landing, pricing, blog, legal. Never /dashboard, /admin, /app, /login, /api. The sitemap is a public file, so listing private routes publishes a map of your app's internal surface. Googlebot also crawls what you list, so login redirects become junk results under your brand. If a “protected” page only checks auth client-side, a common bug in AI-generated code, the sitemap fast-tracks it straight into the index. If something private does get indexed, the Removals tool hides it from results within about a day for six months, which buys the time to fix the actual auth.",
      },
      {
        h: "Pair it with app/robots.ts",
        body: "Same convention, served at /robots.txt. It has two jobs. Point crawlers at the sitemap with its absolute URL, and keep them off private paths. Never Disallow a path that appears in the sitemap, because those are contradictory signals. And remember robots.txt is a request, not security. A blocked URL can still appear in results as a bare title if anything links to it. Pages that must stay out of Google need noindex. Pages that must stay private need server-side auth.",
      },
      {
        h: "Verify the domain in Search Console",
        body: "Add a Domain property, the left option. One verification covers www and every subdomain. Google hands you a TXT record, and it goes wherever your DNS actually lives, which for most setups is the registrar. Only add it in Vercel if your domain genuinely uses Vercel's nameservers. Connecting a domain with A and CNAME records leaves DNS at the registrar, and a TXT added in the wrong place verifies nothing. Propagation is usually minutes, and the dialog lets you retry without losing anything.",
      },
      {
        h: "Submit, then actually wait",
        body: "Sitemaps → paste sitemap.xml → Submit. A “Couldn't fetch” shown immediately after submission usually means Google has not fetched it yet, so wait a day before debugging. Genuine failures are 404s, server errors or robots blocks, and a malformed file shows a parse error instead. Success means the XML parsed and the URLs are queued. It does not mean indexed. A brand-new domain takes one to three weeks to index meaningfully, and “Discovered, currently not indexed” is normal early. A sitemap earns zero rankings. It just guarantees Google knows the pages exist.",
      },
    ],
    gotchas: [
      "robots.txt does not de-index and does not protect. Removal from results needs noindex. Privacy needs auth enforced server-side.",
      "GSC Success is not indexing. Do not spend day three “fixing” a working sitemap because the Pages report is still mostly empty. New sites routinely wait weeks.",
      "Still on your-app.vercel.app? You cannot add DNS records to vercel.app, so use a URL-prefix property with the HTML tag method. Better still, connect the real domain first and verify once.",
      "app/sitemap.ts renders at build time, so a bare new Date() bakes in the deploy date and database-driven pages appear only after the next deploy. That is fine. But do not fake freshness with always-now timestamps, because Google learns to distrust your lastModified and ignores it.",
    ],
    test: "Open /sitemap.xml logged out: valid XML, and every URL is a page you would happily show a stranger. Search Console shows the sitemap row as Success with a count near what you listed. Both true means done. Check Indexing → Pages in two weeks, not tomorrow.",
  },
];

/* ── the next five ──────────────────────────────────────────────────── */

export interface NextItem {
  n: string;
  title: string;
  body: string;
  action: string;
}

export const NEXT_FIVE_LEDE =
  "The core five make the link presentable. These five cover your first week live. Each takes under thirty minutes and has exactly one action. The free-tier claims here are current as of August 2026, which matters because two of them changed recently enough that most tutorials state them wrong.";

export const NEXT_FIVE: NextItem[] = [
  {
    n: "06",
    title: "A favicon",
    body: "Three files in app/, zero config. favicon.ico at 32 pixels, which only works at the top level of app/. icon.png at 512 square. apple-icon.png at 180 on a solid background, because iOS renders transparency as black. Next.js generates every link tag from their presence.",
    action: "Export all three from one 1024px master, which realfavicongenerator.net does in a single upload, and drop them next to layout.tsx.",
  },
  {
    n: "07",
    title: "A 404 that points home",
    body: "app/not-found.tsx renders for every URL that matches nothing, and the default is an unbranded dead end. Rebuild it with your layout and exactly one link, back to the one first action from check 03. A dead end with zero links converts at zero.",
    action: "Create the file, deploy, open /any-gibberish-path and confirm your version renders.",
  },
  {
    n: "08",
    title: "Error tracking",
    body: "Sentry's Developer plan is still free in 2026. Five thousand errors a month, one seat, thirty-day retention, which is plenty pre-traction. The wizard instruments client, server and edge, and writes a test page that throws on demand. Add the auth token to Vercel too, so source maps upload and stack traces stay readable.",
    action: "npx @sentry/wizard@latest -i nextjs, deploy, open the example page, watch the error land in the dashboard.",
  },
  {
    n: "09",
    title: "Uptime monitoring",
    body: "Better Stack free gives ten monitors on three-minute checks with a status page. UptimeRobot free gives fifty monitors on five-minute checks. As of mid-2026 both explicitly allow commercial use, so pick on merits, which mostly means Better Stack's faster checks. Point the monitor at a health route that actually queries the database, not the homepage. On Supabase's free plan that same three-minute ping doubles as the activity that stops your project auto-pausing after seven idle days.",
    action: "Deploy the health route from the steals, then add one free monitor pointed at it with email alerts on.",
  },
  {
    n: "10",
    title: "Database backups",
    body: "Read this one twice: Supabase Free has no automated backups at all. Pro at US$25 a month is daily backups with seven-day retention, so you restore to last night and everything since is gone. Point-in-time recovery is never included. It is a separate add-on from about US$100 a month. On Free, the only backup is the one you take yourself, and Supabase's own docs say so.",
    action: "Commit the nightly-dump workflow from the steals into a private repo, add the Session Pooler connection string as a secret, run it once by hand and confirm the green tick.",
  },
];

/* ── limits ─────────────────────────────────────────────────────────── */

export const NOT_COVERED = [
  "Marketing. This list makes the link look right wherever it lands. It does not put the link anywhere. Distribution is its own discipline and no checklist substitutes for it.",
  "Security. Who can log in, what they can reach, the two-account test. That is the SHIP guide and the SCRATCH guide. Launch-day polish does not patch an open database.",
  "App stores. This is the web list. An iOS launch has its own review queue, its own metadata, and its own week of lead time.",
  "Load. Everything here assumes launch-day traffic in the dozens. If you honestly expect thousands, read the Scale guide first and come back.",
];

export const METHOD =
  "This list comes from launching four AI products in twelve months: an AI receptionist that answers real clinic phones, a set of free audit tools, a compliance checker, and a patient recall system. Every one of the five has bitten me at least once. The preview image got me twice, which is why it goes first.";

export const CLOSING =
  "None of these make the app better. They make it look finished from the outside, which is the one view of it you do not have. Five things, one coffee, the day before the link goes out.";
