"use client";

import { useEffect, useRef, useState } from "react";
import { posthog } from "@/lib/posthog";
import { serif, mono } from "../scratch/ui";

/**
 * The two things at the bottom of the calculator: tell me what I missed, and
 * get told when the prices move.
 *
 * Both reveal on scroll rather than sitting there from first paint. The page
 * is long and the reader is mid-task; an email field that appears as you
 * arrive at it reads as the end of the page, not as an interruption. The
 * site-wide capture popup still runs on top of this (240px scroll, or 25s),
 * so this is the polite second ask, not the only one.
 *
 * PROSE RULE: no em dashes anywhere.
 */

const CLOUD = "#ededeb";
const CORE = "#1a1c12";
const CLAY = "#C98B7A";
const PROMPT = "#7ba2e0";
const DIM = "rgba(26,28,18,0.72)";
const FAINT = "rgba(26,28,18,0.52)";
const RULE = "rgba(26,28,18,0.18)";

/** Adds the reveal class once the block has been scrolled to. Once, not on
 *  every pass: a section that re-animates when you scroll back up is noise. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

const revealStyle = (seen: boolean) => ({
  opacity: seen ? 1 : 0,
  transform: seen ? "none" : "translateY(14px)",
  transition: "opacity .5s ease, transform .5s cubic-bezier(.2,.8,.3,1)",
});

const fieldClass =
  "w-full border px-3.5 py-2.5 text-[14px] outline-none transition-colors focus:border-[#1a1c12]";
const fieldStyle = { borderColor: RULE, backgroundColor: "rgba(26,28,18,0.03)", color: CORE };

/* ── Missing a tool? ──────────────────────────────────────────────── */

export function MissingTool({ source = "stack-builder" }: { source?: string }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [form, setForm] = useState({ tool_name: "", url: "", job: "", price_note: "", email: "" });
  const [honey, setHoney] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.tool_name.trim() || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/tool-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source, website: honey }),
      });
      const data = await res.json();
      if (data.success) {
        setState("done");
        posthog.capture("tool_suggested", { source, tool: form.tool_name.slice(0, 60) });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <div ref={ref} className="mt-20 border-t pt-10" style={{ borderColor: RULE, ...revealStyle(seen) }}>
      <h2 className={`${serif} text-2xl sm:text-3xl`} style={{ color: CORE }}>
        Missing one?
      </h2>
      <p className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: DIM }}>
        This list is my own bill, so it is blind by construction. It only has what I happen to
        pay for. Tell me what should be on it.
      </p>

      {state === "done" ? (
        <p className="mt-5 max-w-xl border-l-2 py-1 pl-4 text-[15px] leading-relaxed" style={{ borderColor: CLAY, color: DIM }}>
          Got it. I price every suggestion against the vendor page before it goes on, so it
          lands here once it is checked, not before.
        </p>
      ) : !open ? (
        <button
          onClick={() => setOpen(true)}
          className={`${mono} sb-cta mt-5 cursor-pointer border-2 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em]`}
          style={{ borderColor: CORE, color: CLOUD, backgroundColor: CORE }}
        >
          Add a tool{" "}
          <span className="sb-arrow" aria-hidden>
            →
          </span>
        </button>
      ) : (
        <form onSubmit={submit} className="mt-5 grid max-w-xl gap-2.5 sm:grid-cols-2">
          <input
            autoFocus
            required
            value={form.tool_name}
            onChange={set("tool_name")}
            placeholder="Tool name"
            className={fieldClass}
            style={fieldStyle}
          />
          <input
            value={form.url}
            onChange={set("url")}
            placeholder="Website"
            className={fieldClass}
            style={fieldStyle}
          />
          <input
            value={form.job}
            onChange={set("job")}
            placeholder="What job does it do?"
            className={fieldClass}
            style={fieldStyle}
          />
          <input
            value={form.price_note}
            onChange={set("price_note")}
            placeholder="What does it cost?"
            className={fieldClass}
            style={fieldStyle}
          />
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="Your email (optional)"
            className={`${fieldClass} sm:col-span-2`}
            style={fieldStyle}
          />
          {/* honeypot */}
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            className="hidden"
            aria-hidden
          />
          <div className="flex items-center gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={state === "sending"}
              className={`${mono} cursor-pointer px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-90 disabled:opacity-50`}
              style={{ backgroundColor: CORE, color: CLOUD }}
            >
              {state === "sending" ? "sending…" : "send it"}
            </button>
            <span className={`${mono} text-[11px]`} style={{ color: FAINT }}>
              Name is enough. The rest saves me a search.
            </span>
          </div>
          {state === "error" && (
            <p className="text-[13px] sm:col-span-2" style={{ color: "#a8443f" }}>
              That did not go through. Try again?
            </p>
          )}
        </form>
      )}
    </div>
  );
}

/* ── Tell me when the prices move ─────────────────────────────────── */

export function StackSubscribe({ source = "saas-calc" }: { source?: string }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

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
        posthog.capture("calculator_subscribe", { source });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    // Same shape as the subscribe block on /ladder: a section on the page
    // ground rather than a filled card, so it reads as the end of the page
    // and not as an ad dropped into it.
    <div ref={ref} className="mt-16 border-t pt-10" style={{ borderColor: RULE, ...revealStyle(seen) }}>
      <p className={`${mono} text-[10px] uppercase tracking-[0.22em]`} style={{ color: CLAY }}>
        The next question
      </p>
      <h2
        className={`${serif} mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl`}
        style={{ color: CORE }}
      >
        Which one, and when.
      </h2>
      {state === "done" ? (
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: DIM }}>
          <span style={{ color: PROMPT }}>✓ in.</span> One guide per row on this page, and a note
          when a price moves. Nothing in between.
        </p>
      ) : (
        <>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: DIM }}>
            A price tells you what a tool costs, not whether you need it. So the guides go row by
            row: when Supabase beats Neon, when the free tier is the right answer, when a paid seat
            pays for itself.
          </p>
          <form onSubmit={submit} className="mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <label htmlFor="calc-email" className="sr-only">
              Email address
            </label>
            <input
              id="calc-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@work.com"
              className={`${mono} min-w-0 flex-1 border px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#1a1c12]`}
              style={{ borderColor: RULE, backgroundColor: "rgba(26,28,18,0.03)", color: CORE }}
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className={`${mono} cursor-pointer px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-90 disabled:opacity-50`}
              style={{ backgroundColor: PROMPT, color: CORE }}
            >
              {state === "sending" ? "sending…" : "send me the guides"}
            </button>
          </form>
          {state === "error" && (
            <p className="mt-2.5 text-[13px]" style={{ color: "#a8443f" }}>
              That did not go through. Try again?
            </p>
          )}
          <p className={`${mono} mt-3.5 text-[11px]`} style={{ color: FAINT }}>
            No spam. Unsubscribe whenever.
          </p>
        </>
      )}
    </div>
  );
}
