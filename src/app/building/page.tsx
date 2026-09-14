import type { Metadata } from "next";
import { Masthead, PageFooter } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Things I'm building",
  description:
    "What's on the bench right now: the Routiq products, the client systems, and the shops. Each with what it is, who it's for, and where it's at.",
  alternates: { canonical: "https://danielwelsh.design/building" },
};

/* One entry per thing. "who" is the person it serves, "status" is the honest
 * state today, and "link" only exists when there's a public front door. No
 * link means it isn't public yet, not that I forgot. */
type Status = "Live" | "In build" | "Ongoing" | "Paused";

type Thing = {
  name: string;
  accent: string;
  blurb: string;
  who: string;
  status: Status;
  since?: string;
  link?: { href: string; label: string };
};

type Group = {
  n: string;
  label: string;
  intro: string;
  things: Thing[];
};

const GROUPS: Group[] = [
  {
    n: "01",
    label: "Routiq products",
    intro: "The company. Things I own, price, and answer for.",
    things: [
      {
        name: "routiq.",
        accent: "The front desk that never clocks off.",
        blurb:
          "An AI receptionist for allied health clinics. It answers the phone, replies to texts and WhatsApps, and books straight into Cliniko and PracSuite. Every missed call becomes a booking or a note, not a voicemail.",
        who: "Physio, podiatry and chiro clinics that lose patients to the ring-out.",
        status: "Live",
        since: "2025",
        link: { href: "https://routiq.ai", label: "routiq.ai" },
      },
      {
        name: "romotion.",
        accent: "The reel machine.",
        blurb:
          "A Mac app that turns a recording or a subtitle file into an animated collage reel. Shape the beats, generate a few versions, nitpick, and export a CapCut-ready MP4. It's how every reel on my Instagram gets made.",
        who: "Founders who talk to camera and don't want to learn After Effects.",
        status: "Live",
        since: "v1.14",
        link: { href: "https://romotion.xyz", label: "romotion.xyz" },
      },
    ],
  },
  {
    n: "02",
    label: "Client work",
    intro: "Systems I build inside someone else's business.",
    things: [
      {
        name: "MODE",
        accent: "Health market & cafe, Bali.",
        blurb:
          "Native iOS and Android ordering apps, a staff dashboard for orders, kitchen and dispatch, and one shared Supabase backend under all of it. Menu, build-your-own, checkout, loyalty.",
        who: "MODE's customers at the counter and its team behind it.",
        status: "In build",
      },
      {
        name: "AWAVE",
        accent: "Surf trips, priced while you sleep.",
        blurb:
          "An inquiry engine for a boutique surf travel company. Every enquiry gets read, matched against live availability and pricing, and answered with a bespoke draft before the founder opens his laptop.",
        who: "One founder who used to hand-answer every enquiry from seven Google Docs.",
        status: "Live",
        since: "Nov 2025",
      },
      {
        name: "Tullius",
        accent: "Contract benchmarking, asked in plain English.",
        blurb:
          "VIC, a contract and tender benchmarking platform running on Azure, plus the Claude Code suite the consultants use to question its data and turn the answers into client-grade reports and decks.",
        who: "A consulting firm and the analysts who'd rather ask than query.",
        status: "Live",
      },
    ],
  },
  {
    n: "03",
    label: "Ecomm",
    intro: "Shops. Themes, checkout, and the plumbing behind them.",
    things: [
      {
        name: "Silome",
        accent: "Online store.",
        blurb: "Details coming. Ask me about it in the meantime.",
        who: "Its customers.",
        status: "In build",
      },
      {
        name: "Arthur Apparel",
        accent: "Shopify, kept honest.",
        blurb:
          "Theme work on a live apparel store. Always pulled from the live theme first, changes applied on top, then pushed back. Small fixes that don't break a shop that's already selling.",
        who: "An apparel brand and the person who publishes from the Shopify admin.",
        status: "Ongoing",
      },
    ],
  },
];

/* Live is the only status that earns the accent. Everything else is ink or
 * muted so a page of mostly-live things doesn't turn into a wall of red. */
function StatusDot({ status }: { status: Status }) {
  const color =
    status === "Live" ? "var(--accent)" : status === "Paused" ? "var(--muted)" : "var(--ink)";
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className="inline-block h-[7px] w-[7px] rounded-full"
        style={{
          background: status === "In build" ? "transparent" : color,
          border: `1.5px solid ${color}`,
        }}
      />
      <span className="label" style={{ color }}>
        {status}
      </span>
    </span>
  );
}

export default function BuildingPage() {
  return (
    <div className="grain relative min-h-screen">
      <Masthead section="Building" />

      <main className="relative z-10 mx-auto max-w-[1180px] px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <p className="label" style={{ color: "var(--accent)" }}>
          On the bench
        </p>
        <h1
          className="display rise mt-5 text-[clamp(52px,8vw,116px)]"
          style={{ maxWidth: "13ch" }}
        >
          Things I&apos;m
          <br />
          <span style={{ color: "var(--accent)" }}>building.</span>
        </h1>
        <p
          className="rise mt-8 max-w-[46ch] text-[clamp(17px,1.5vw,21px)] leading-[1.35]"
          style={{ color: "var(--muted)", animationDelay: "0.1s" }}
        >
          The tutorials are the how. This is the what: everything currently
          taking my time, who it&apos;s for, and where it&apos;s honestly at.
        </p>

        {GROUPS.map((g) => (
          <section key={g.n} className="mt-20 first-of-type:mt-16">
            <div className="grid gap-x-10 gap-y-2 border-b pb-5 sm:grid-cols-[64px_1fr]" style={{ borderColor: "var(--ink)" }}>
              <span className="label pt-1" style={{ color: "var(--accent)" }}>
                {g.n}
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                <h2 className="display text-[clamp(26px,3vw,40px)]">{g.label}</h2>
                <p className="text-[14px]" style={{ color: "var(--muted)" }}>
                  {g.intro}
                </p>
              </div>
            </div>

            <ul>
              {g.things.map((t) => {
                const body = (
                  <>
                    <div className="sm:pt-2">
                      <StatusDot status={t.status} />
                      {t.since && (
                        <p className="mt-2 text-[13px]" style={{ color: "var(--muted)" }}>
                          {t.since}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="display text-[clamp(30px,3.6vw,50px)] transition-opacity group-hover:opacity-70">
                        {t.name}{" "}
                        <span style={{ color: "var(--accent)" }}>{t.accent}</span>
                      </p>
                      <p
                        className="mt-4 max-w-[58ch] text-[15px] leading-[1.45]"
                        style={{ color: "var(--muted)" }}
                      >
                        {t.blurb}
                      </p>
                    </div>

                    <div className="sm:pt-3">
                      <p className="label" style={{ color: "var(--muted)" }}>
                        For
                      </p>
                      <p className="mt-2 text-[14px] leading-[1.4]" style={{ color: "var(--ink)" }}>
                        {t.who}
                      </p>
                      {t.link && (
                        <span
                          className="label mt-4 inline-block border-b pb-0.5 transition-opacity group-hover:opacity-60"
                          style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
                        >
                          {t.link.label} →
                        </span>
                      )}
                    </div>
                  </>
                );

                const cls =
                  "group grid gap-x-10 gap-y-4 py-10 sm:grid-cols-[110px_1fr_260px]";

                return (
                  <li key={t.name} className="border-b" style={{ borderColor: "var(--rule)" }}>
                    {t.link ? (
                      <a href={t.link.href} className={cls} target="_blank" rel="noopener">
                        {body}
                      </a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </main>

      <PageFooter />
    </div>
  );
}
