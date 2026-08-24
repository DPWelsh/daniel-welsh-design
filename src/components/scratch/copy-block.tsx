"use client";

import { useState } from "react";
import { posthog } from "@/lib/posthog";

const PAPER = "#ededeb";
const INK = "#161613";
const PROMPT = "#7ba2e0";

export function CopyBlock({
  id,
  filename,
  body,
  tone = "dark",
}: {
  id: string;
  filename: string;
  body: string;
  /** "light" for pages on a cloud ground (e.g. /brand-kit). The code itself
   *  stays dark either way — only the chrome around it flips. */
  tone?: "dark" | "light";
}) {
  const [copied, setCopied] = useState(false);
  const light = tone === "light";

  return (
    <div className="group relative">
      <div
        className="flex items-center justify-between gap-3 border border-b-0 px-4 py-2"
        style={
          light
            ? { borderColor: "rgba(26,28,18,0.16)", background: "rgba(26,28,18,0.04)" }
            : { borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }
        }
      >
        <span
          className="min-w-0 truncate font-[family-name:var(--font-jetbrains)] text-[11px] tracking-wide"
          style={{ color: light ? "rgba(26,28,18,0.62)" : "rgba(255,255,255,0.4)" }}
        >
          {filename}
        </span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(body);
            setCopied(true);
            posthog.capture("scratch_copy", { block: id });
            setTimeout(() => setCopied(false), 1600);
          }}
          aria-label={`Copy ${filename} to clipboard`}
          className="shrink-0 cursor-pointer px-2 py-0.5 font-[family-name:var(--font-jetbrains)] text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            background: copied ? PROMPT : PAPER,
            color: INK,
            outlineColor: PROMPT,
          }}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre
        className="overflow-x-auto border px-4 py-4 font-[family-name:var(--font-jetbrains)] text-[12px] leading-relaxed"
        style={
          light
            ? { borderColor: "rgba(26,28,18,0.16)", background: INK, color: "rgba(237,237,235,0.82)" }
            : { borderColor: "rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.75)" }
        }
      >
        {body}
      </pre>
    </div>
  );
}
