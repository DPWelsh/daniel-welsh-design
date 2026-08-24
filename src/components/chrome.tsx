import Link from "next/link";

/**
 * The furniture every page below the hero shares.
 *
 * The hero is a full-bleed statement with a floating MENU button. Interior
 * pages can't borrow that — they need a persistent way back and a way into
 * the other sections. So they get a rule-thin masthead instead: the DW mark
 * in Raptor, the section name in mono, and the way home on the right. Same
 * palette, same two type voices, different job.
 */

export const NAV: Array<{ name: string; href: string; external?: boolean }> = [
  { name: "Tutorials", href: "/tutorials" },
  { name: "Blog", href: "/blog" },
  { name: "Discord", href: "https://discord.gg/tz6jQDvmrh", external: true },
];

/**
 * The Routiq logomark, from the brand package's single-path core artwork.
 *
 * Inlined rather than an <img> so it takes currentColor and matches whatever
 * the surrounding bar is using. It also means no second request for a shape
 * this small, and no broken image if the file ever moves, which is exactly
 * how the old /routiq-logo-light.svg reference died.
 */
export function RoutiqMark({ className = "h-[19px] w-[19px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Routiq" className={className} fill="currentColor">
      <path d="M319.41,274.11v53.39c-63.42-4.7-122.71-45.33-148.86-100.43v48.37c0,28.82-23.42,52.24-52.24,52.24h-37.71V124.55c0-28.88,23.36-52.24,52.24-52.24h37.71v33.39c15.04-20.25,39.1-33.39,66.27-33.39,45.64,0,82.59,37.01,82.59,82.59s-36.95,82.65-82.59,82.65c-17.58,0-33.84-5.52-47.23-14.85,19.55,23.42,46.4,40.82,76.37,48.06,17.77,4.51,35.99,5.52,53.45,3.36Z" />
    </svg>
  );
}

export function Masthead({ section }: { section?: string }) {
  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-[2px]"
      style={{
        borderColor: "var(--rule)",
        background: "color-mix(in srgb, var(--paper) 92%, transparent)",
      }}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-70">
          <span style={{ color: "var(--accent)" }}>
            <RoutiqMark className="h-[19px] w-[19px] shrink-0" />
          </span>
          <span className="label" style={{ color: "var(--muted)" }}>
            Daniel Welsh · Routiq
          </span>
        </Link>
        <nav className="flex items-center gap-5">
          {/* The section you're already in shows as a label, not a link, so
              the bar never reads "Tutorials Tutorials Blog". */}
          {NAV.map((item) =>
            item.name === section ? (
              <span key={item.name} className="label" style={{ color: "var(--accent)" }}>
                {item.name}
              </span>
            ) : item.external ? (
              <a
                key={item.name}
                href={item.href}
                className="label hover:opacity-70"
                style={{ color: "var(--muted)" }}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="label hover:opacity-70"
                style={{ color: "var(--muted)" }}
              >
                {item.name}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}

export function PageFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 py-8 sm:px-8">
        <Link href="/" className="label hover:opacity-70" style={{ color: "var(--muted)" }}>
          ← Back home
        </Link>
        <span className="label" style={{ color: "var(--muted)" }}>
          danielwelsh.design
        </span>
      </div>
    </footer>
  );
}

/** The eyebrow that opens every section. Mono, accent, wide. */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="label" style={{ color: "var(--accent)" }}>
      {children}
    </p>
  );
}
