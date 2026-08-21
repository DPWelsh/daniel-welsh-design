"use client";

import { useState } from "react";
import { posthog } from "@/lib/posthog";

const PROMPT = "#7ba2e0";
const INK = "#161613";
const RULE_LIGHT = "rgba(26,28,18,0.18)";

/**
 * Defaults reproduce the original /scratch behaviour exactly, so that page is
 * unchanged. Other field guides pass their own source so the list stays
 * segmentable by which magnet brought someone in.
 */
export function ScratchSubscribe({
  source = "scratch",
  cta = "send me each stage",
  done = "You'll get each stage as it ships. No noise between drops.",
  tone = "dark",
}: {
  source?: string;
  cta?: string;
  done?: string;
  /** "light" for pages on the Cloud ground, where white-on-white vanishes. */
  tone?: "dark" | "light";
} = {}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

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
        posthog.capture("scratch_subscribe", { source });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  const light = tone === "light";

  if (state === "done") {
    return (
      <p
        className="font-[family-name:var(--font-jetbrains)] text-sm"
        style={{ color: light ? "rgba(26,28,18,0.72)" : "rgba(255,255,255,0.8)" }}
      >
        <span style={{ color: PROMPT }}>✓ in.</span> {done}
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <label htmlFor={`${source}-email`} className="sr-only">
        Email address
      </label>
      <input
        id={`${source}-email`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@wherever.com"
        className="min-w-0 flex-1 border px-4 py-3 font-[family-name:var(--font-jetbrains)] text-sm focus:outline-none"
        style={
          light
            ? { borderColor: RULE_LIGHT, backgroundColor: "rgba(26,28,18,0.03)", color: INK }
            : { borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(0,0,0,0.3)", color: "#fff" }
        }
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="cursor-pointer px-5 py-3 font-[family-name:var(--font-jetbrains)] text-xs font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ background: PROMPT, color: INK }}
      >
        {state === "sending" ? "sending…" : cta}
      </button>
      {state === "error" && (
        <p className="text-xs sm:w-full" style={{ color: light ? "#a8443f" : "#f87171" }}>
          That didn&apos;t go through. Try again.
        </p>
      )}
    </form>
  );
}
