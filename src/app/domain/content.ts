/* ── Domain day ───────────────────────────────────────────────────────
   The payload for the DOMAIN keyword on the "Bought a domain? Do these 3"
   reel (193k views, 206 comments). The reel gave three things. This is the
   full list it promised.

   The reel's step 02 tells you to split notify. from mail. so one can't hurt
   the other — but a subdomain on its own sends nothing and protects nothing.
   SPF, DKIM and DMARC are what make that split real, and they were never
   mentioned. That gap is Part II, and it's the largest section on purpose. */

export interface Step {
  /** Two-digit label. 01-03 are the three from the reel. */
  n: string;
  title: string;
  /** What you actually do. */
  what: string;
  /** Why it matters, in one line, no hedging. */
  why: string;
  /** Shown as a mono chip. Null when there's nothing to copy. */
  record?: string;
  /** True for the three that were in the video. */
  inReel?: boolean;
}

export const TEN_MINUTES: Step[] = [
  {
    n: "01",
    title: "Split your subdomains",
    what: "www.yoursite.com for the marketing site. app.yoursite.com for the actual app.",
    why: "They get rebuilt on different days by different tools. Splitting them on day one means neither deploy can take the other down.",
    record: "CNAME  www → your host",
    inReel: true,
  },
  {
    n: "02",
    title: "Two more, for email",
    what: "notify.yoursite.com for no-reply and password resets. mail.yoursite.com for marketing.",
    why: "A marketing blast that gets spam-flagged drags down the reputation of whatever sent it. Keep it away from the address that sends password resets.",
    record: "two subdomains, verified separately",
    inReel: true,
  },
  {
    n: "03",
    title: "sitemap.xml",
    what: "yoursite.com/sitemap.xml, listing every page you publish.",
    why: "It's how Google finds pages nothing links to yet. Costs nothing and most frameworks generate it for you.",
    record: "/sitemap.xml",
    inReel: true,
  },
  {
    n: "04",
    title: "Pick one, redirect the other",
    what: "Choose yoursite.com or www.yoursite.com and 301 the loser to the winner.",
    why: "Otherwise Google sees two copies of the same site and splits the credit between them.",
    record: "301 redirect",
  },
  {
    n: "05",
    title: "robots.txt",
    what: "Sits next to the sitemap. Points at it, and tells crawlers what to skip.",
    why: "Keeps admin routes, staging and search pages out of the index. One file, four lines.",
    record: "/robots.txt",
  },
];

/* ── Part II ─────────────────────────────────────────────────────────── */

export const EMAIL_RULE =
  "A subdomain does not send email. It does not protect anything either. These three records are what make step 02 real, and without them your password resets land in spam.";

export interface Record {
  name: string;
  type: string;
  answers: string;
  what: string;
  gotcha: string;
}

export const EMAIL_RECORDS: Record[] = [
  {
    name: "SPF",
    type: "TXT",
    answers: "Who is allowed to send as me?",
    what: "Lists the servers permitted to send from your domain. Your email provider gives you the exact value.",
    gotcha:
      "You may only have ONE SPF record per domain. Two is not stricter, it is broken, and mail providers will fail both. If you add a second sender, merge it into the existing record.",
  },
  {
    name: "DKIM",
    type: "CNAME",
    answers: "Was this actually sent by them, unmodified?",
    what: "A cryptographic signature on every message. Your provider gives you two or three CNAMEs to paste.",
    gotcha:
      "It is per sending service. Adding a second provider later means adding its DKIM records too, or that provider's mail starts failing while the first keeps working.",
  },
  {
    name: "DMARC",
    type: "TXT",
    answers: "What should happen when the first two fail?",
    what: "The policy, published at _dmarc.yoursite.com. Also the only one that reports back to you.",
    gotcha:
      "Start at p=none with a reporting address. It changes nothing and shows you who is already sending as you. Only move to quarantine, then reject, once the reports are clean. Going straight to reject on day one is how people silently kill their own invoices.",
  },
];

export const DMARC_STAGES = [
  { p: "p=none", when: "Week 1", does: "Nothing is blocked. Reports tell you every source sending as you, including the ones you forgot." },
  { p: "p=quarantine", when: "Once reports are clean", does: "Failures go to spam instead of the inbox. Recoverable if you got something wrong." },
  { p: "p=reject", when: "The destination", does: "Failures are refused outright. Nobody can spoof you, and you cannot afford a mistake in the records." },
];

/* ── Part III ─────────────────────────────────────────────────────────── */

export interface CheckItem {
  item: string;
  when: string;
  skipCost: string;
}

export const FULL_CHECKLIST: CheckItem[] = [
  { item: "Turn on registrar auto-renew", when: "Minute one", skipCost: "You lose the domain to a squatter over a lapsed card." },
  { item: "Turn on WHOIS privacy", when: "Minute one", skipCost: "Your home address is in a public database, and the spam calls start within a day." },
  { item: "Decide where DNS lives", when: "Before any record", skipCost: "Records added at the registrar while the host is authoritative do nothing at all. This is the single most common wasted hour." },
  { item: "Drop TTL to 300s", when: "While you're changing things", skipCost: "A typo takes 24 hours to fix instead of five minutes. Put it back up afterwards." },
  { item: "www + app subdomains", when: "Day one", skipCost: "Migrating a live app onto a subdomain later means breaking every link." },
  { item: "notify + mail subdomains", when: "Day one", skipCost: "Marketing reputation and transactional reputation become the same thing." },
  { item: "SPF, DKIM, DMARC on each sender", when: "Same hour you create them", skipCost: "Password resets land in spam and you blame the code." },
  { item: "Verify the domain with your email provider", when: "Before the first send", skipCost: "The first campaign goes out unauthenticated, which is the worst possible first impression to a mailbox provider." },
  { item: "Pick canonical, redirect the other", when: "Day one", skipCost: "Duplicate content, split ranking." },
  { item: "sitemap.xml + robots.txt", when: "Day one", skipCost: "Slow indexing, and staging pages showing up in search." },
  { item: "Force HTTPS", when: "Day one", skipCost: "Mixed-content warnings and a browser telling visitors you're not secure." },
  { item: "Set a calendar reminder for expiry", when: "Day one", skipCost: "Auto-renew fails silently more often than anyone admits." },
];

/* ── Part IV ─────────────────────────────────────────────────────────── */

export const MISTAKES = [
  {
    t: "Sending from the root domain",
    d: "yoursite.com is the one thing you can never rebuild reputation for. Send from notify. and mail. and keep the root clean.",
  },
  {
    t: "Two SPF records",
    d: "Added a second provider, added a second record. Both now fail. Merge them into one.",
  },
  {
    t: "Going straight to p=reject",
    d: "It feels responsible. It silently rejects your own invoicing tool, your CRM and whatever else you forgot was sending as you.",
  },
  {
    t: "Editing DNS at the registrar when the host is authoritative",
    d: "The records save, look correct, and do nothing. Check the nameservers before you touch anything.",
  },
  {
    t: "Blasting 5,000 emails on a new subdomain",
    d: "A brand new sending domain has no reputation. Ramp over a couple of weeks, or you get filtered before anyone reads one.",
  },
];

/* Honesty beat — the thing that costs something to say. */
export const CONFESSION =
  "Routiq sends everything from one address on noreply@routiq.ai. Seven different email types, transactional and lifecycle, all on the same subdomain. I tell clinics to split notify. from mail. and I have not finished doing it myself. It is on the list, and it is the reason I know exactly what it costs to leave.";
