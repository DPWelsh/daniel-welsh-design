"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RoutiqMark } from "@/components/chrome";
import type { RunbookContent, RunbookStep } from "./types";

/**
 * The runbook console, generalised from /agent-vps so every tutorial shares
 * one renderer. Built as a console rather than an article: the reader keeps
 * it open on one screen and works on the other.
 *
 * Sized for half a monitor. Ticks persist to localStorage because a single
 * step can run to hours and nobody does these in one sitting. The storage
 * key derives from the slug, so the original agent-vps key is unchanged.
 *
 * Ported from routiq-landing on 2026-10-02 when the tutorials moved off
 * the company domain. Still inline hex and its own copy button; the brand
 * swaps are the mark in place of a typed wordmark and the site's display
 * face for headings.
 */

const PAPER = "#ededeb";
const DIM = "rgba(237,237,235,0.55)";
const FAINT = "rgba(237,237,235,0.35)";
const RULE = "rgba(237,237,235,0.14)";
const RULE_SOFT = "rgba(237,237,235,0.10)";
const PROMPT = "#7ba2e0";
const ENERGY = "#c96b66";
const INK = "#1a1c12";

/** Tiny inline renderer: **bold** and `code`. Not markdown, just enough. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return <strong key={i} style={{ color: PAPER, fontWeight: 600 }}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("`") && p.endsWith("`"))
          return <code key={i} className="font-mono" style={{ color: PROMPT, fontSize: "0.92em" }}>{p.slice(1, -1)}</code>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

function CopyBlock({ filename, body }: { filename: string; body: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between gap-3 border border-b-0 px-4 py-2"
        style={{ borderColor: RULE, background: "rgba(255,255,255,0.03)" }}>
        <span className="min-w-0 truncate font-mono text-[11px]" style={{ color: FAINT }}>{filename}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(body);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
          aria-label={`Copy ${filename} to clipboard`}
          className="shrink-0 cursor-pointer px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors"
          style={{ background: copied ? PROMPT : PAPER, color: INK }}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto border px-4 py-4 font-mono text-[12.5px] leading-relaxed"
        style={{ borderColor: RULE, background: "rgba(0,0,0,0.28)", color: PAPER }}>
        {body}
      </pre>
    </div>
  );
}

export default function Runbook({ content }: { content: RunbookContent }) {
  const { steps } = content;
  const KEY = `${content.slug}-progress-v1`;

  const [i, setI] = useState(0);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setDone(p.done ?? {});
        setI(Math.min(p.i ?? 0, steps.length - 1));
      }
    } catch { /* corrupt or blocked storage — start fresh */ }
    setLoaded(true);
  }, [KEY, steps.length]);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify({ i, done })); } catch { /* private mode */ }
  }, [KEY, i, done, loaded]);

  const step = steps[i];
  const totalChecks = useMemo(() => steps.reduce((n, s) => n + s.checks.length, 0), [steps]);
  const doneCount = useMemo(() => Object.values(done).filter(Boolean).length, [done]);
  const pct = Math.round((doneCount / totalChecks) * 100);
  const stepDone = (s: RunbookStep) => s.checks.every((_, n) => done[`${s.id}:${n}`]);
  const allStepChecks = step.checks.every((_, n) => done[`${step.id}:${n}`]);

  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-8 sm:px-7">
      {/* ── App chrome: the whole page is the console, so this is all of it ── */}
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70" style={{ color: PAPER }}>
          <RoutiqMark className="h-[19px] w-[19px] shrink-0" />
          <span className="label" style={{ color: FAINT }}>Daniel Welsh</span>
        </Link>
        <Link href="/tutorials" className="font-mono text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-70" style={{ color: FAINT }}>
          all tutorials →
        </Link>
      </div>

      {/* ── Masthead ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b pb-3 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ borderColor: RULE, color: FAINT }}>
        <span>Runbook № {content.number}</span>
        <span style={{ color: PROMPT }}>Verified {content.verifiedOn}</span>
      </div>

      <h1 className="display mt-8 text-[clamp(2.6rem,6vw,4.25rem)]" style={{ color: PAPER }}>
        {content.title}{content.titleAccent && <>{" "}<em className="not-italic" style={{ color: PROMPT }}>{content.titleAccent}</em></>}
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed" style={{ color: DIM }}>{content.lede}</p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: FAINT }}>{content.timeTotal}</p>

      {/* ── Progress rail ────────────────────────────────────── */}
      <div className="sticky top-0 z-20 -mx-5 mt-8 px-5 pb-3 pt-4 backdrop-blur sm:-mx-7 sm:px-7"
        style={{ background: "rgba(26,28,18,0.93)" }}>
        <div className="flex gap-1">
          {steps.map((s, n) => (
            <button
              key={s.id}
              onClick={() => setI(n)}
              aria-label={`Step ${s.n} — ${s.title}`}
              aria-current={n === i ? "step" : undefined}
              className="h-1.5 flex-1 cursor-pointer rounded-full transition-all"
              style={{
                background: stepDone(s) ? PROMPT : n === i ? PAPER : "rgba(237,237,235,0.16)",
                outline: n === i ? `2px solid ${PROMPT}` : "none",
                outlineOffset: "3px",
              }}
            />
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: FAINT }}>
          <span>Step {step.n} of {steps[steps.length - 1].n}</span>
          <span style={{ color: pct === 100 ? PROMPT : FAINT }}>{doneCount}/{totalChecks} done · {pct}%</span>
        </div>
      </div>

      {/* ── The step ─────────────────────────────────────────── */}
      <section className="mt-9" key={step.id}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[13px]" style={{ color: allStepChecks ? PROMPT : ENERGY }}>{step.n}</span>
          <h2 className="display text-3xl" style={{ color: PAPER }}>{step.title}</h2>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: DIM }}>{step.why}</p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: FAINT }}>~{step.time}</p>

        {step.notes && (
          <ul className="mt-7 space-y-3.5">
            {step.notes.map((nn) => (
              <li key={nn} className="border-l-2 pl-4 text-[14px] leading-relaxed" style={{ borderColor: RULE_SOFT, color: DIM }}>
                <Rich text={nn} />
              </li>
            ))}
          </ul>
        )}

        {step.tip && (
          <div className="mt-6 border-l-2 py-2.5 pl-4" style={{ borderColor: PROMPT }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: PROMPT }}>{step.tipLabel ?? "The fix"}</p>
            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: PAPER }}>{step.tip}</p>
          </div>
        )}

        {step.warn && (
          <div className="mt-6 border-l-2 py-2.5 pl-4" style={{ borderColor: ENERGY }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: ENERGY }}>{step.warnLabel ?? "Stop and think"}</p>
            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: PAPER }}>{step.warn}</p>
          </div>
        )}

        {step.blocks?.map((b) => (
          <div className="mt-7" key={b.filename}>
            <CopyBlock filename={b.filename} body={b.body} />
          </div>
        ))}

        {/* ── Checks ─────────────────────────────────────────── */}
        <div className="mt-9 border-t pt-6" style={{ borderColor: RULE }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: FAINT }}>Tick before moving on</p>
          <ul className="mt-4 space-y-2.5">
            {step.checks.map((c, n) => {
              const k = `${step.id}:${n}`;
              const on = !!done[k];
              return (
                <li key={k}>
                  {/* the tick glyph is aria-hidden, so the button needs its
                      own role, state and name or a screen reader hears
                      an unnamed control */}
                  <button
                    role="checkbox"
                    aria-checked={on}
                    aria-label={c}
                    onClick={() => setDone((d) => ({ ...d, [k]: !d[k] }))}
                    className="flex w-full cursor-pointer items-start gap-3 rounded px-1 py-1.5 text-left transition-colors hover:bg-white/[0.04]"
                  >
                    <span aria-hidden
                      className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border text-[11px] transition-colors"
                      style={{
                        borderColor: on ? PROMPT : "rgba(237,237,235,0.28)",
                        background: on ? PROMPT : "transparent",
                        color: INK,
                      }}>
                      {on ? "✓" : ""}
                    </span>
                    <span className="text-[14px] leading-relaxed"
                      style={{ color: on ? FAINT : PAPER, textDecoration: on ? "line-through" : "none" }}>
                      {c}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Nav ────────────────────────────────────────────── */}
        <div className="mt-9 flex items-center justify-between gap-4">
          <button
            onClick={() => setI((n) => Math.max(0, n - 1))}
            disabled={i === 0}
            className="cursor-pointer px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-opacity disabled:cursor-default disabled:opacity-25"
            style={{ border: `1px solid ${RULE}`, color: DIM }}
          >
            ← Back
          </button>

          {i < steps.length - 1 ? (
            <button
              onClick={() => setI((n) => Math.min(steps.length - 1, n + 1))}
              className="cursor-pointer px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
              style={{
                background: allStepChecks ? PROMPT : "transparent",
                color: allStepChecks ? INK : DIM,
                border: `1px solid ${allStepChecks ? PROMPT : RULE}`,
              }}
            >
              {allStepChecks ? "Next →" : "Skip ahead →"}
            </button>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: PROMPT }}>
              {pct === 100 ? "All done ✓" : "Last step"}
            </span>
          )}
        </div>
      </section>

      {/* ── Foot ─────────────────────────────────────────────── */}
      <section className="mt-16 border-t pt-8" style={{ borderColor: RULE }}>
        <p className="display text-xl leading-snug" style={{ color: PAPER }}>{content.closing}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <button
            onClick={() => { setDone({}); setI(0); try { localStorage.removeItem(KEY); } catch {} }}
            className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.18em] underline underline-offset-4"
            style={{ color: FAINT }}
          >
            Reset progress
          </button>
          <span className="font-mono text-[11px]" style={{ color: FAINT }}>Progress is saved in this browser only.</span>
        </div>
      </section>
    </div>
  );
}
