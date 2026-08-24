"use client";

import { type Option, type Slot } from "./game-data";
import { NOTES } from "./tool-notes";
import { SCALE, SELFHOST } from "./build-modes";
import { serif, mono } from "../scratch/ui";
import { Logo } from "./logo";
import { CLAY, CLOUD, CORE, PROMPT } from "./theme";

/** The always-on detail card. Rail on desktop, sheet on a phone. */
export function DetailCard({
  slot,
  opt,
  mine,
  picked,
  budgetLabel,
  price,
  lockedNote,
  usdNote,
  m$,
  onPick,
  onClose,
}: {
  slot: Slot;
  opt: Option;
  mine: boolean;
  picked: boolean;
  budgetLabel: string | null;
  price: number | null;
  lockedNote: string | null;
  usdNote: boolean;
  m$: (n: number) => string;
  onPick: () => void;
  onClose?: () => void;
}) {
  const note = NOTES[opt.id];
  const site = note?.site ?? (opt.domain ? `https://${opt.domain}` : null);
  const s10k = SCALE[opt.id];
  const scaleAt = s10k === "dies" ? null : typeof s10k === "number" ? s10k : opt.usd;
  const selfAt = typeof SELFHOST[opt.id] === "number" ? SELFHOST[opt.id] : null;
  return (
    <div className="px-6 pb-6 pt-5" style={{ backgroundColor: CORE }}>
      <div className="flex items-start justify-between gap-4">
        <span className={`${mono} text-[10px] uppercase tracking-[0.2em]`} style={{ color: CLAY }}>
          {slot.label}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-2 cursor-pointer px-2 py-1 text-[15px]"
            style={{ color: "rgba(237,237,235,0.5)" }}
          >
            ✕
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <Logo opt={opt} />
        <h3 className={`${serif} text-[26px] leading-none`} style={{ color: CLOUD }}>
          {opt.name}
        </h3>
      </div>
      <p className={`${mono} mt-2.5 text-[12px] tracking-[0.08em]`} style={{ color: CLAY }}>
        {opt.plan} · {price === null ? "not an option here" : `${m$(price)}/mo`}
        {price !== null && price !== opt.usd && (
          <span style={{ color: "rgba(237,237,235,0.45)" }}> (listed {m$(opt.usd)})</span>
        )}
      </p>
      {lockedNote && (
        <p
          className="mt-4 border-l-2 py-1 pl-4 text-[13px] leading-relaxed"
          style={{ borderColor: "#c96b66", color: "rgba(237,237,235,0.78)" }}
        >
          {lockedNote}
        </p>
      )}

      <p className="mt-4 text-[13px] leading-[1.6]" style={{ color: "rgba(237,237,235,0.78)" }}>
        {note?.what ?? opt.eg ?? "No notes on this one yet."}
      </p>

      {note?.plan && (
        <>
          <p className={`${mono} mt-4 text-[10px] uppercase tracking-[0.2em]`} style={{ color: "rgba(237,237,235,0.45)" }}>
            On this plan
          </p>
          <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: "rgba(237,237,235,0.78)" }}>
            {note.plan}
          </p>
        </>
      )}

      {/* What this row becomes later, visible from every mode. */}
      <dl className={`${mono} mt-4 space-y-1.5 border-t pt-3.5 text-[11px]`} style={{ borderColor: "rgba(237,237,235,0.14)" }}>
        <div className="flex justify-between gap-3">
          <dt style={{ color: "rgba(237,237,235,0.45)" }}>AT 10,000 USERS</dt>
          <dd style={{ color: scaleAt === null ? "#c96b66" : CLOUD }}>
            {scaleAt === null ? "does not hold" : m$(scaleAt)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt style={{ color: "rgba(237,237,235,0.45)" }}>SELF-HOSTED</dt>
          <dd style={{ color: selfAt === null ? "rgba(237,237,235,0.45)" : CLOUD }}>
            {selfAt === null ? "not possible" : m$(selfAt)}
          </dd>
        </div>
      </dl>

      {mine && (
        <p
          className="mt-5 border-l-2 py-1 pl-4 text-[13px] leading-relaxed"
          style={{ borderColor: CLAY, color: "rgba(237,237,235,0.78)" }}
        >
          <span style={{ color: CLAY }}>●</span> This is the one I run
          {budgetLabel ? ` with ${budgetLabel} a month.` : "."}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {!lockedNote && (
          <button
            onClick={onPick}
            className={`${mono} cursor-pointer px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-90`}
            style={{ backgroundColor: picked ? "rgba(237,237,235,0.14)" : PROMPT, color: picked ? CLOUD : CORE }}
          >
            {picked ? "remove" : "add to my stack"}
          </button>
        )}
        {site && (
          <a
            href={site}
            target="_blank"
            rel="noopener noreferrer"
            className={`${mono} border px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-white/10`}
            style={{ borderColor: "rgba(237,237,235,0.3)", color: CLOUD }}
          >
            visit site ↗
          </a>
        )}
      </div>

      <p className={`${mono} mt-4 text-[10px] leading-relaxed`} style={{ color: "rgba(237,237,235,0.4)" }}>
        Checked 16 Aug 2026. Usage rows are a realistic month, not a cap.
        {usdNote && " Figures written in the text above are USD list prices."}
      </p>
    </div>
  );
}
