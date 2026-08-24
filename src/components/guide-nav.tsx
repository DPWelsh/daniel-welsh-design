"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, RoutiqMark } from "@/components/chrome";

/**
 * The persistent menu for the scrolling guide pages.
 *
 * Sticky rather than a section you have to scroll to, the whole point is
 * being able to leave at any moment, not only once you reach the bottom of
 * the one you are on.
 *
 * Links come from the same NAV the masthead uses. They used to come from
 * lib/guides.ts, which was routiq-labs' index and pointed at /get-started,
 * /ladder and /guides. None of those routes exist on this site, so every
 * link in this bar except the first was a 404.
 */

const MONO = "font-[family-name:var(--font-jetbrains)]";
const INK = "#f3f0e9";
const PROMPT = "#a43e35";
const FAINT = "rgba(26,28,18,0.52)";
const RULE = "rgba(26,28,18,0.14)";

export function GuideNav() {
  const pathname = usePathname() || "/";

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ borderColor: RULE, background: `${INK}e6` }}
    >
      <div
        className={`${MONO} mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] sm:px-8`}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-colors hover:text-[#a43e35]"
          style={{ color: FAINT }}
        >
          <span style={{ color: PROMPT }}>
            <RoutiqMark className="h-[15px] w-[15px] shrink-0" />
          </span>
          Daniel Welsh<span style={{ color: PROMPT }}>.</span> Routiq
        </Link>

        <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const style = { color: active ? PROMPT : FAINT };

            return item.external ? (
              <a
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-[#a43e35]"
                style={style}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="transition-colors hover:text-[#a43e35]"
                style={style}
              >
                {item.name}
              </Link>
            );
          })}
        </span>
      </div>
    </nav>
  );
}
