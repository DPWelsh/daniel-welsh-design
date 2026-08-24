/* Copy-paste artifacts for /launch. Same contract as /scratch and /ship:
   every one is short enough to read in full before pasting, and none of
   them need a library you do not already have. Facts current August 2026.

   Prose rule, same as content.ts: no em dashes, one idea per sentence.
   That applies to the code comments too, because they are read on the
   page as much as the prose is. */

export interface Steal {
  id: string;
  title: string;
  blurb: string;
  filename: string;
  body: string;
}

export const STEALS: Steal[] = [
  {
    id: "og-tags",
    title: "The five tags",
    blurb:
      "Check 01 as plain HTML, for anything that is not Next.js. og tags use property=, twitter tags use name=. All five must be in the server-rendered head, because scrapers do not run JavaScript.",
    filename: "the five tags (plain html)",
    body: `<!-- in <head>, server-rendered -->
<meta property="og:title" content="Your app: what it does in six words" />
<meta property="og:description" content="One plain sentence on what it does." />
<meta property="og:image" content="https://yourdomain.com/og.png" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />

<!-- og:image rules: 1200x630, absolute https, JPG/PNG under ~300KB.
     WhatsApp drops images over 600KB and cannot read SVG.
     No separate twitter:image needed. X falls back to og:image. -->`,
  },
  {
    id: "layout-metadata",
    title: "The Next.js version",
    blurb:
      "The same five tags via the metadata export. metadataBase is the line people forget. It turns relative image paths into absolute production URLs, and current Next.js fails the build without it.",
    filename: "app/layout.tsx",
    body: `import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"), // set once, here
  title: "Your app",
  description: "One plain sentence on what it does.",
  openGraph: {
    title: "Your app",
    description: "One plain sentence on what it does.",
    type: "website",
    images: ["/og.png"], // public/og.png -> https://yourdomain.com/og.png
  },
  twitter: { card: "summary_large_image" },
};

// Or skip images[] and drop a 1200x630 file at app/opengraph-image.png
// (jpg/jpeg/png/gif only, never WebP) with app/opengraph-image.alt.txt
// beside it. That convention emits the og:image tags automatically.
// X falls back to og:image, and twitter.card above still sets the layout.`,
  },
  {
    id: "dns-records",
    title: "The three records",
    blurb:
      "Check 02 as a DNS worksheet. The values here are the common case. Copy the exact ones from your Vercel domain card, because newer projects get per-project targets and pool IPs.",
    filename: "docs/dns-records.txt",
    body: `# marketing project owns:  example.com + www.example.com
# app project owns:        app.example.com

Type: CNAME   Name: app   Value: <your domain card value>
                          # e.g. d1d4fc829fe7bc7c.vercel-dns-017.com
                          # (old cname.vercel-dns.com resolves, but
                          #  verification wants the card's exact value)

Type: A       Name: @     Value: 76.76.21.21
                          # newer projects may show a pool IP instead.
                          # copy the card, not this file

Type: CNAME   Name: www   Value: <your domain card value>

# Cloudflare DNS? Grey cloud (DNS-only) until Vercel verifies,
# or Flexible SSL gives you an infinite redirect loop.

# marketing project, next.config.ts. Catch wrong-domain habits:
#   { source: '/login',      destination: 'https://app.example.com/login',   permanent: true },
#   { source: '/app/:path*', destination: 'https://app.example.com/:path*',  permanent: true },`,
  },
  {
    id: "empty-states",
    title: "The empty-state pattern",
    blurb:
      "Check 03 as a writing template. Every empty screen in a new account is an onboarding screen whether you wrote it or not. This is the three-line pattern plus the three worked examples.",
    filename: "docs/empty-states.md",
    body: `# Every empty state, three lines

Line 1, what this becomes:  "Your [reports / conversations / metrics] will appear here."
Line 2, the one action:     imperative verb + object, as the button: "Run my first audit"
Line 3, escape hatch:       "Or explore a sample [report] first"  (a link, not a second button)

The button repeats the landing page's promise, in the same words.

## Scanner tool
H1:         "See what your website is costing you"
Input:      placeholder="yourclinic.com.au"  (a realistic value, never the word URL)  autoFocus
Button:     "Run my free audit"
Under:      "Takes about 60 seconds. Results on this page."
Activation: audit_completed. Fires when the report RENDERS, not on the click

## Booking / chat product
Empty inbox: "Your conversations will appear here.
              Text your new number from your own phone and watch the assistant reply."
              [ +61 4xx xxx xxx ]  [Copy number]
Activation: first_reply_received. The reply on their personal phone is the moment

## Dashboard / SaaS
Grey ghost charts, one button centred over them:
  "This is your revenue dashboard. It's waiting on data."
  Button: "Connect Stripe, takes ~2 minutes"
  Link:   "Look around with sample data first"  (persistent SAMPLE DATA banner)
Activation: dashboard_loaded_with_real_data. Not the OAuth callback

Before launch:  grep -riE "no (data|items|results)( yet)?|nothing here" src/
Every hit is an onboarding screen you have not written yet.`,
  },
  {
    id: "posthog-init",
    title: "PostHog in one file",
    blurb:
      "Check 04 as code. One file in the project root. If your app uses a src directory it must live there instead, or it is silently ignored. Then flip Record user sessions on in PostHog settings, because SDK config alone records nothing.",
    filename: "instrumentation-client.ts",
    body: `import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST, // us.i.posthog.com / eu.i.posthog.com
  defaults: "2026-05-30",
});

// after login, so replays have names:
//   posthog.identify(user.id)
// on logout:
//   posthog.reset()

// EU/UK audience with a banner (replay for consenters, hash-count for the rest):
//   add  cookieless_mode: "on_reject"
//   NOTE nothing is captured while the banner is unanswered. Pre-consent
//   events are dropped, not queued. Replay never works without storage consent.

// serverless events (fire activation where the value is delivered):
//   const ph = new PostHog(key, { host, flushAt: 1, flushInterval: 0 });
//   ph.capture({ distinctId, event: "audit_completed" });
//   await ph.shutdown(); // or the event dies when the function exits`,
  },
  {
    id: "sitemap-robots",
    title: "Sitemap and robots, one convention each",
    blurb:
      "Check 05 as the two files. Public pages only, because the sitemap is itself public and Googlebot crawls what you list. Skip changeFrequency and priority, since Google ignores both.",
    filename: "app/sitemap.ts + app/robots.ts",
    body: `// app/sitemap.ts, served at /sitemap.xml
import type { MetadataRoute } from "next";

const BASE = "https://yourdomain.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date() },
    { url: \`\${BASE}/pricing\` },
    { url: \`\${BASE}/blog\` },
    // one entry per PUBLIC page. Nothing behind login, ever
  ];
}

// app/robots.ts, served at /robots.txt
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard/", "/admin/"] }],
    sitemap: "https://yourdomain.com/sitemap.xml", // absolute, always
  };
}

// robots.txt is a request, not security. Out of Google = noindex.
// Private = server-side auth. Disallow is neither.`,
  },
  {
    id: "health-route",
    title: "The health route worth monitoring",
    blurb:
      "Item 09. A monitor pointed at the homepage proves Vercel can serve HTML. Pointed here, it proves the database answers. On Supabase Free the ping doubles as the activity that stops the seven-day auto-pause.",
    filename: "app/api/health/route.ts",
    body: `import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  // any small table you actually have
  const { error } = await supabase.from("profiles").select("id").limit(1);
  if (error) return NextResponse.json({ ok: false }, { status: 503 });
  return NextResponse.json({ ok: true });
}`,
  },
  {
    id: "backup-workflow",
    title: "The nightly backup Supabase Free does not do",
    blurb:
      "Item 10. Supabase's own documented CI pattern: a nightly dump committed to a private repo. Use the Session Pooler connection string. CI runners are IPv4-only and the direct string resolves to IPv6, which times out.",
    filename: ".github/workflows/backup.yml",
    body: `# PRIVATE repo only. This commits your production data.
# Secret: SUPABASE_DB_URL = the Session Pooler string (Dashboard -> Connect)
name: db-backup
on:
  schedule:
    - cron: "23 17 * * *" # ~3:23am AEST; odd minute dodges the on-the-hour queue
  workflow_dispatch:
jobs:
  backup:
    runs-on: ubuntu-latest
    env:
      DB_URL: \${{ secrets.SUPABASE_DB_URL }}
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
      - run: |
          supabase db dump --db-url "$DB_URL" -f roles.sql --role-only
          supabase db dump --db-url "$DB_URL" -f schema.sql
          supabase db dump --db-url "$DB_URL" -f data.sql --use-copy --data-only
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "db backup \${{ github.run_id }}"

# If production data in a private repo is still unacceptable,
# swap the commit step for an upload to a private S3/R2 bucket.`,
  },
];
