"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GUIDES } from "@/lib/guides";

/**
 * The persistent menu for the scrolling guide pages.
 *
 * Sticky rather than a section you have to scroll to, the whole point is
 * being able to leave for another guide at any moment, not only once you
 * reach the bottom of the one you are on.
 *
 * The console pages (Day Zero, rung one) do NOT use this: they own their
 * viewport and carry their own crumbs in the top bar, so a second fixed
 * bar would eat the card.
 *
 * Links are derived from lib/guides.ts, so a new guide appears in the menu
 * the moment it is added to that list.
 */

const MONO = "font-[family-name:var(--font-jetbrains)]";
const INK = "#f3f0e9";
const PROMPT = "#a43e35";
const FAINT = "rgba(237,237,235,0.35)";
const RULE = "rgba(237,237,235,0.14)";

/** The short menu. The full list lives on /guides. */
const PRIMARY = ["/guides", "/get-started", "/ladder"];

export function GuideNav() {
  const pathname = usePathname() || "/";

  const items = PRIMARY.map((href) => {
    const g = GUIDES.find((x) => x.href === href);
    return {
      href,
      label:
        href === "/guides" ? "Guides" : href === "/ladder" ? "The ladder" : (g?.name ?? href),
    };
  });

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ borderColor: RULE, background: `${INK}e6` }}
    >
      <div
        className={`${MONO} mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] sm:px-8`}
      >
        <Link href="/tutorials" className="transition-colors hover:text-[#a43e35]" style={{ color: FAINT }}>
          routiq<span style={{ color: PROMPT }}>.</span> labs
        </Link>

        <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {items.map((it) => {
            const active =
              it.href === "/ladder"
                ? pathname === "/ladder" || pathname.startsWith("/ladder/")
                : pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? "page" : undefined}
                className="transition-colors hover:text-[#a43e35]"
                style={{ color: active ? PROMPT : FAINT }}
              >
                {it.label}
              </Link>
            );
          })}
        </span>
      </div>
    </nav>
  );
}
