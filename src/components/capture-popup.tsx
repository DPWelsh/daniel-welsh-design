"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { posthog } from "@/lib/posthog";

/**
 * The capture popup. Mounted once site-wide with a `source` per page, so the
 * list stays segmentable by which page earned the signup.
 *
 * Deliberately polite, because the reader is mid-tutorial:
 *
 *   - never fires before they have done something (scroll or dwell)
 *   - one dismissal buys a day of silence
 *   - subscribing suppresses it everywhere, forever
 *   - never on first paint, so it cannot hurt LCP or bounce
 *
 * Every state fires a PostHog event. Without shown/dismissed/subscribed you
 * cannot tell a good popup from a bad one, and a popup you cannot measure is
 * how a page quietly gets worse.
 */

const SEEN_KEY = "dw_capture_dismissed_at";
const SUBBED_KEY = "dw_capture_subscribed";
const QUIET_DAYS = 1;
/** first real flick, in px — the early trigger on very long pages */
const NUDGE_PX = 240;

const CORE = "#1f211e";
const CLOUD = "#f3f0e9";
const ACCENT = "#a43e35";
const RULE = "rgba(243,240,233,0.16)";

export function CapturePopup({
  source,
  title = "Get the next one",
  line = "One email per build sheet. Nothing between drops.",
  cta = "send it to me",
  done = "Done. The next one lands in your inbox.",
  /** fraction of the page scrolled before it may fire */
  atScroll = 0.05,
  /** seconds on page before it may fire, whichever comes first */
  afterSeconds = 25,
}: {
  source: string;
  title?: string;
  line?: string;
  cta?: string;
  done?: string;
  atScroll?: number;
  afterSeconds?: number;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const fired = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suppressed = useCallback(() => {
    try {
      if (localStorage.getItem(SUBBED_KEY)) return true;
      const at = Number(localStorage.getItem(SEEN_KEY) || 0);
      return at > 0 && Date.now() - at < QUIET_DAYS * 864e5;
    } catch {
      // private mode. Showing once per page load beats never showing.
      return false;
    }
  }, []);

  const show = useCallback(() => {
    if (fired.current || suppressed()) return;
    fired.current = true;
    setOpen(true);
    posthog.capture("capture_popup_shown", { source });
  }, [source, suppressed]);

  /* Triggers: scroll depth, dwell, or exit intent, whichever lands first.
     Exit intent is desktop only (no pointer leaves a touchscreen), so the
     other two carry mobile, which is most of the traffic. */
  useEffect(() => {
    if (suppressed()) return;

    const onScroll = () => {
      // The fraction alone means a 12,000px field guide asks a thousand
      // pixels later than a short one, so a flat nudge carries the long
      // pages and the fraction carries the short.
      if (window.scrollY >= NUDGE_PX) return show();
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0 && window.scrollY / h >= atScroll) show();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    const timer = window.setTimeout(show, afterSeconds * 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    // The listener only sees scrolls after hydration. On a long guide the
    // reader is often already past the threshold by then (or the browser
    // restored their position), and if they stop there no event ever
    // arrives. So judge where they already are, once, on mount.
    onScroll();
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [show, suppressed, atScroll, afterSeconds]);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(SEEN_KEY, String(Date.now()));
    } catch {
      /* nothing to do, and not worth interrupting the reader for */
    }
    posthog.capture("capture_popup_dismissed", { source, state });
  }, [source, state]);

  /* Esc closes, and focus moves into the dialog when it opens. A popup you
     cannot dismiss from the keyboard is a trap. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, dismiss]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (data.success) {
        setState("done");
        try {
          localStorage.setItem(SUBBED_KEY, "1");
        } catch {
          /* they still subscribed; only the suppression is lost */
        }
        posthog.capture("capture_popup_subscribed", { source });
        window.setTimeout(() => setOpen(false), 2200);
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="capture-title"
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
    >
      {/* scrim. Click anywhere off the card to dismiss. */}
      <button
        aria-label="Close"
        onClick={dismiss}
        className="dw-fade absolute inset-0 h-full w-full cursor-default bg-black/55 backdrop-blur-[2px]"
      />

      <div
        className="dw-pop relative w-full max-w-[440px] rounded-2xl p-7 pt-6 shadow-2xl"
        style={{ background: CORE, border: `1px solid ${RULE}` }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[15px] transition-colors hover:bg-white/10"
          style={{ color: "rgba(243,240,233,0.5)" }}
        >
          ✕
        </button>

        {state === "done" ? (
          <p
            className="py-6 text-center text-[17px] leading-relaxed"
            style={{ color: CLOUD, fontFamily: "var(--font-body), system-ui" }}
          >
            {done}
          </p>
        ) : (
          <>
            <p
              className="text-[11px] uppercase tracking-[0.24em]"
              style={{ color: ACCENT, fontFamily: "var(--font-mono), monospace" }}
            >
              Daniel Welsh
            </p>

            <h2
              id="capture-title"
              className="mt-3 text-[30px] leading-[1.05]"
              style={{ color: CLOUD, fontFamily: "var(--font-display), Georgia, serif" }}
            >
              {title}
            </h2>

            <p
              className="mt-3 text-[15px] leading-relaxed"
              style={{ color: "rgba(243,240,233,0.62)", fontFamily: "var(--font-body), system-ui" }}
            >
              {line}
            </p>

            <form onSubmit={submit} className="mt-5 flex flex-col gap-2.5">
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@work.com"
                className="w-full rounded-lg px-4 py-3 text-[15px] outline-none transition-colors"
                style={{
                  background: "rgba(243,240,233,0.06)",
                  border: `1px solid ${RULE}`,
                  color: CLOUD,
                  fontFamily: "var(--font-mono), monospace",
                }}
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full rounded-lg py-3 text-[13px] font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: ACCENT, color: CLOUD, fontFamily: "var(--font-mono), monospace" }}
              >
                {state === "sending" ? "sending…" : cta}
              </button>
            </form>

            {state === "error" && (
              <p className="mt-2.5 text-[13px]" style={{ color: "#c96b66" }}>
                That did not go through. Try again?
              </p>
            )}

            <p
              className="mt-3.5 text-[12px]"
              style={{ color: "rgba(243,240,233,0.34)", fontFamily: "var(--font-mono), monospace" }}
            >
              No spam. Unsubscribe whenever.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
