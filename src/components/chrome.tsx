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

const NAV: Array<{ name: string; href: string; external?: boolean }> = [
  { name: "Tutorials", href: "/tutorials" },
  { name: "Blog", href: "/journal/how-we-made-this-website" },
  { name: "Discord", href: "https://discord.gg/tz6jQDvmrh", external: true },
];

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
          <span className="mark text-[19px]" style={{ color: "var(--accent)" }}>
            DW
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
