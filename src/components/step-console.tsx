"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";

/**
 * The fixed-viewport stepper used by the tutorial pages.
 *
 * Extracted after building it twice. It owns the chrome only, top bar,
 * progress, keyboard, footer controls, and takes an array of already
 * rendered cards. Each page keeps its own card markup, because a tutorial
 * step and a Day Zero account signup do not usefully share a shape.
 *
 * Two rules it enforces for every consumer:
 *  - The PAGE never scrolls. The card body does, so progress and controls
 *    stay visible while a long prompt is on screen.
 *  - Every card stays mounted and is hidden with the `hidden` attribute
 *    rather than conditionally rendered, so crawlers see the whole
 *    tutorial and structured data still describes content that exists.
 *
 * Consumers must be client components, and their metadata belongs in a
 * sibling layout.tsx.
 *
 * NOTE: fixed-viewport routes also need adding to the suppression list in
 * components/subscribe-hook.tsx, or the Field Notes popup slides in over
 * the Next button.
 */

const INK = "#161613";

export type ConsoleCard = {
  /** Stable key. */
  id: string;
  /** Rendered card. */
  node: ReactNode;
  /** Shown top-right, e.g. "step 3 of 8". Falls back to a count. */
  label?: string;
  /** Marks this card as tickable with D, intro/outro usually are not. */
  checkable?: boolean;
};

export function StepConsole({
  cards,
  backHref,
  backLabel,
  /** Optional second crumb, e.g. the /guides index. */
  indexHref,
  indexLabel = "All guides",
  eyebrow,
  accent = "#7ba2e0",
  rule = "rgba(237,237,235,0.14)",
  ruleSoft = "rgba(237,237,235,0.1)",
  faint = "rgba(237,237,235,0.35)",
  paper = "#ededeb",
  mono,
  startLabel = "start",
  onDoneChange,
}: {
  cards: ConsoleCard[];
  backHref: string;
  backLabel: string;
  indexHref?: string;
  indexLabel?: string;
  eyebrow: string;
  accent?: string;
  rule?: string;
  ruleSoft?: string;
  faint?: string;
  paper?: string;
  mono: string;
  startLabel?: string;
  onDoneChange?: (done: Set<string>) => void;
}) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState<Set<string>>(() => new Set());
  const total = cards.length;

  const next = useCallback(() => setI((v) => Math.min(v + 1, total - 1)), [total]);
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);

  const toggleDone = useCallback(() => {
    setI((cur) => {
      const card = cards[cur];
      if (card?.checkable) {
        setDone((d) => {
          const n = new Set(d);
          if (n.has(card.id)) n.delete(card.id);
          else n.add(card.id);
          onDoneChange?.(n);
          return n;
        });
      }
      return cur;
    });
  }, [cards, onDoneChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Never hijack typing, and leave copy/paste alone.
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key.toLowerCase() === "d") {
        e.preventDefault();
        toggleDone();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, toggleDone]);

  return (
    <main
      className="flex h-[100dvh] flex-col overflow-hidden antialiased"
      style={{ background: INK, color: paper }}
    >
      <header className="shrink-0 border-b px-5 py-3 sm:px-8" style={{ borderColor: rule }}>
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <span className={`${mono} flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.25em]`}>
            <Link href={backHref} className="transition-colors hover:opacity-70" style={{ color: faint }}>
              ← {backLabel}
            </Link>
            {indexHref && (
              <Link href={indexHref} className="transition-colors hover:opacity-70" style={{ color: faint }}>
                {indexLabel}
              </Link>
            )}
          </span>
          <span className={`${mono} text-[10px] uppercase tracking-[0.25em]`} style={{ color: faint }}>
            {eyebrow} · {cards[i]?.label ?? `${i + 1} of ${total}`}
          </span>
        </div>

        <div className="mx-auto mt-3 flex max-w-4xl gap-1">
          {cards.map((c, n) => (
            <button
              key={c.id}
              onClick={() => setI(n)}
              aria-label={`Go to ${c.label ?? c.id}`}
              className="h-1.5 flex-1 transition-colors"
              style={{
                background:
                  n === i
                    ? accent
                    : done.has(c.id)
                      ? `${accent}66`
                      : n < i
                        ? `${accent}33`
                        : ruleSoft,
              }}
            />
          ))}
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          {cards.map((c, n) => (
            <section key={c.id} hidden={n !== i} aria-hidden={n !== i}>
              {c.node}
            </section>
          ))}
        </div>
      </div>

      <footer className="shrink-0 border-t px-5 py-3 sm:px-8" style={{ borderColor: rule }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <button
            onClick={prev}
            disabled={i === 0}
            className={`${mono} border px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-opacity disabled:opacity-25`}
            style={{ borderColor: rule, color: faint }}
          >
            ← back
          </button>

          <span
            className={`${mono} hidden text-[10px] uppercase tracking-[0.2em] sm:block`}
            style={{ color: faint }}
          >
            → next · ← back{cards.some((c) => c.checkable) ? " · D done" : ""}
          </span>

          <button
            onClick={next}
            disabled={i === total - 1}
            className={`${mono} border-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors disabled:opacity-25`}
            style={{ borderColor: accent, color: accent }}
          >
            {i === 0 ? `${startLabel} →` : "next →"}
          </button>
        </div>
      </footer>
    </main>
  );
}

/** The tickable "done when" block. Shared so every tutorial checks the same way. */
export function DoneWhen({
  text,
  checked,
  onToggle,
  accent = "#7ba2e0",
  mono,
}: {
  text: string;
  checked: boolean;
  onToggle: () => void;
  accent?: string;
  mono: string;
}) {
  return (
    <button
      onClick={onToggle}
      className="mt-8 flex w-full items-start gap-4 border px-5 py-4 text-left transition-colors"
      style={{
        borderColor: checked ? accent : `${accent}55`,
        background: checked ? `${accent}22` : `${accent}0d`,
      }}
    >
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border text-[12px] font-bold"
        style={{
          borderColor: accent,
          background: checked ? accent : "transparent",
          color: checked ? INK : accent,
        }}
        aria-hidden
      >
        {checked ? "✓" : ""}
      </span>
      <span>
        <span
          className={`${mono} block text-[10px] font-bold uppercase tracking-[0.25em]`}
          style={{ color: accent }}
        >
          Done when
        </span>
        <span className="mt-1.5 block text-[15px] leading-relaxed">{text}</span>
      </span>
    </button>
  );
}
