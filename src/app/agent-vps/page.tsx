"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyBlock } from "@/components/scratch/copy-block";
import { CLOSING, LEDE, STEPS, TIME_TOTAL, VERIFIED_ON } from "./content";
import {
  DIM, ENERGY, FAINT, GRAIN, INDIGO, PAPER, PROMPT, RULE, RULE_SOFT, mono, serif,
} from "../scratch/ui";

/**
 * /agent-vps. A runbook you work alongside, not an article you read.
 *
 * Built to sit on half a screen while you type on the other, the same way
 * /app-review is used. One step at a time, ticks persist to localStorage
 * because the isolation step alone can run to three hours and nobody does
 * this in a single sitting.
 *
 * Step 00 tries to talk you out of the whole project, because Anthropic
 * now hosts the two things most people are trying to hand-roll. A runbook
 * that only tells you how and never whether is an advert.
 */

const KEY = "agent-vps-progress-v1";

/** Tiny inline renderer: **bold** and `code`. Not markdown, just enough. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return <strong key={i} style={{ color: PAPER, fontWeight: 600 }}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("`") && p.endsWith("`"))
          return (
            <code key={i} className={mono} style={{ color: PROMPT, fontSize: "0.92em" }}>
              {p.slice(1, -1)}
            </code>
          );
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export default function AgentVpsPage() {
  const [i, setI] = useState(0);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  // restore before first paint of real content, so ticks don't flash empty
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setDone(p.done ?? {});
        setI(Math.min(p.i ?? 0, STEPS.length - 1));
      }
    } catch { /* corrupt or blocked storage. Just start fresh */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify({ i, done })); } catch { /* private mode */ }
  }, [i, done, loaded]);

  const step = STEPS[i];
  const totalChecks = useMemo(() => STEPS.reduce((n, s) => n + s.checks.length, 0), []);
  const doneCount = useMemo(() => Object.values(done).filter(Boolean).length, [done]);
  const pct = Math.round((doneCount / totalChecks) * 100);

  const stepDone = (s: typeof step) => s.checks.every((_, n) => done[`${s.id}:${n}`]);
  const allStepChecks = step.checks.every((_, n) => done[`${step.id}:${n}`]);

  return (
    <main
      className="relative min-h-screen antialiased selection:bg-[#7ba2e0] selection:text-[#161613]"
      style={{ background: "#161613", color: PAPER }}
    >
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-screen"
        style={{ backgroundImage: GRAIN }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[300px]"
        style={{ background: `radial-gradient(70% 100% at 50% 0%, ${INDIGO}77, transparent 70%)` }} />

      {/* Narrow on purpose: this lives on half a monitor. */}
      <div className="relative z-10 mx-auto max-w-2xl px-5 pb-24 sm:px-7">

        {/* ── Masthead ─────────────────────────────────────────── */}
        <header className="pt-8">
          <div className={`${mono} flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b pb-3 text-[10px] uppercase tracking-[0.22em]`}
            style={{ borderColor: RULE, color: FAINT }}>
            <span>Daniel Welsh · Runbook № 003</span>
            <span style={{ color: PROMPT }}>Verified {VERIFIED_ON}</span>
          </div>

          <h1 className={`${serif} mt-7 text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl`}>
            Claude Code on a server,{" "}
            <em className="not-italic" style={{ color: PROMPT }}>unattended.</em>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed" style={{ color: DIM }}>{LEDE}</p>
          <p className={`${mono} mt-3 text-[11px] uppercase tracking-[0.16em]`} style={{ color: FAINT }}>
            {TIME_TOTAL}
          </p>
        </header>

        {/* ── Progress rail. Sticky, so it survives scrolling ── */}
        <div className="sticky top-0 z-20 -mx-5 mt-8 px-5 pb-3 pt-4 backdrop-blur sm:-mx-7 sm:px-7"
          style={{ background: "rgba(22,22,19,0.92)" }}>
          <div className="flex gap-1">
            {STEPS.map((s, n) => {
              const complete = stepDone(s);
              return (
                <button
                  key={s.id}
                  onClick={() => setI(n)}
                  aria-label={`Step ${s.n}. ${s.title}`}
                  aria-current={n === i ? "step" : undefined}
                  className="group h-1.5 flex-1 cursor-pointer rounded-full transition-all"
                  style={{
                    background: complete ? PROMPT : n === i ? PAPER : "rgba(237,237,235,0.16)",
                    outline: n === i ? `2px solid ${PROMPT}` : "none",
                    outlineOffset: "3px",
                  }}
                />
              );
            })}
          </div>
          <div className={`${mono} mt-2.5 flex items-center justify-between text-[10px] uppercase tracking-[0.18em]`}
            style={{ color: FAINT }}>
            <span>Step {step.n} of {STEPS[STEPS.length - 1].n}</span>
            <span style={{ color: pct === 100 ? PROMPT : FAINT }}>{doneCount}/{totalChecks} done · {pct}%</span>
          </div>
        </div>

        {/* ── The step ─────────────────────────────────────────── */}
        <section className="mt-9" key={step.id}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className={`${mono} text-[13px]`} style={{ color: allStepChecks ? PROMPT : ENERGY }}>
              {step.n}
            </span>
            <h2 className={`${serif} text-3xl font-black leading-tight`} style={{ color: PAPER }}>
              {step.title}
            </h2>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: DIM }}>{step.why}</p>
          <p className={`${mono} mt-2 text-[11px] uppercase tracking-[0.18em]`} style={{ color: FAINT }}>
            ~{step.time}
          </p>

          {step.notes && (
            <ul className="mt-7 space-y-3.5">
              {step.notes.map((nn) => (
                <li key={nn} className="border-l-2 pl-4 text-[14px] leading-relaxed"
                  style={{ borderColor: RULE_SOFT, color: DIM }}>
                  <Rich text={nn} />
                </li>
              ))}
            </ul>
          )}

          {step.tip && (
            <div className="mt-6 border-l-2 py-2.5 pl-4" style={{ borderColor: PROMPT }}>
              <p className={`${mono} text-[10px] uppercase tracking-[0.2em]`} style={{ color: PROMPT }}>
                The fix
              </p>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: PAPER }}>{step.tip}</p>
            </div>
          )}

          {step.warn && (
            <div className="mt-6 border-l-2 py-2.5 pl-4" style={{ borderColor: ENERGY }}>
              <p className={`${mono} text-[10px] uppercase tracking-[0.2em]`} style={{ color: ENERGY }}>
                Stop and think
              </p>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: PAPER }}>{step.warn}</p>
            </div>
          )}

          {step.blocks?.map((b) => (
            <div className="mt-7" key={b.filename}>
              <CopyBlock id={`${step.id}-${b.filename}`} filename={b.filename} body={b.body} />
            </div>
          ))}

          {/* ── Checks ─────────────────────────────────────────── */}
          <div className="mt-9 border-t pt-6" style={{ borderColor: RULE }}>
            <p className={`${mono} text-[10px] uppercase tracking-[0.22em]`} style={{ color: FAINT }}>
              Tick before moving on
            </p>
            <ul className="mt-4 space-y-2.5">
              {step.checks.map((c, n) => {
                const k = `${step.id}:${n}`;
                const on = !!done[k];
                return (
                  <li key={k}>
                    {/* role + aria-checked + an explicit label: the tick glyph
                        is aria-hidden, so without these a screen reader hears
                        an unnamed button and no state. */}
                    <button
                      role="checkbox"
                      aria-checked={on}
                      aria-label={c}
                      onClick={() => setDone((d) => ({ ...d, [k]: !d[k] }))}
                      className="flex w-full cursor-pointer items-start gap-3 rounded px-1 py-1.5 text-left transition-colors hover:bg-white/[0.04]"
                    >
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border text-[11px] transition-colors"
                        style={{
                          borderColor: on ? PROMPT : "rgba(237,237,235,0.28)",
                          background: on ? PROMPT : "transparent",
                          color: "#161613",
                        }}
                      >
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
              className={`${mono} cursor-pointer px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-opacity disabled:cursor-default disabled:opacity-25`}
              style={{ border: `1px solid ${RULE}`, color: DIM }}
            >
              ← Back
            </button>

            {i < STEPS.length - 1 ? (
              <button
                onClick={() => setI((n) => Math.min(STEPS.length - 1, n + 1))}
                className={`${mono} cursor-pointer px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-90`}
                style={{ background: allStepChecks ? PROMPT : "transparent", color: allStepChecks ? "#161613" : DIM, border: `1px solid ${allStepChecks ? PROMPT : RULE}` }}
              >
                {allStepChecks ? "Next →" : "Skip ahead →"}
              </button>
            ) : (
              <span className={`${mono} text-[11px] uppercase tracking-[0.18em]`} style={{ color: PROMPT }}>
                {pct === 100 ? "All done ✓" : "Last step"}
              </span>
            )}
          </div>
        </section>

        {/* ── Foot ─────────────────────────────────────────────── */}
        <section className="mt-16 border-t pt-8" style={{ borderColor: RULE }}>
          <p className={`${serif} text-xl leading-snug`} style={{ color: PAPER }}>{CLOSING}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              onClick={() => { setDone({}); setI(0); try { localStorage.removeItem(KEY); } catch {} }}
              className={`${mono} cursor-pointer text-[11px] uppercase tracking-[0.18em] underline underline-offset-4`}
              style={{ color: FAINT }}
            >
              Reset progress
            </button>
            <span className={`${mono} text-[11px]`} style={{ color: FAINT }}>
              Progress is saved in this browser only.
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
