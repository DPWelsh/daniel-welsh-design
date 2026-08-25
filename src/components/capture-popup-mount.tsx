"use client";

import { usePathname } from "next/navigation";
import { CapturePopup } from "./capture-popup";

/**
 * Site-wide capture. Mounted once in the root layout, so every guide nudges
 * without each page having to remember to.
 *
 * The source is the first path segment, so the list stays segmentable by
 * which page earned the signup. COPY is per-path where a page has a specific
 * promise worth making; everything else gets the default.
 */

/** Pages that must never be interrupted. */
const NEVER = [
  // The hero is one screen with its own menu. A modal over it is the first
  // thing a new reader would see, which is the one moment worth protecting.
  "/",
];

/** First path segment → the offer that page can actually honour. */
const COPY: Record<string, { title: string; line: string; cta: string; done?: string }> = {
  ladder: {
    title: "Want the skill?",
    line: "The one that runs the whole build and stops six times to let you decide. I'll send it, plus the next rung when it lands.",
    cta: "send me the skill",
    done: "On its way. The next rung lands in your inbox too.",
  },
  stacks: {
    title: "Nine more jobs are coming.",
    line: "Every stack gets the same treatment: what it costs at ten users, what it costs at ten thousand, and the one thing that forces the swap.",
    cta: "send me the next stack",
  },
  scratch: {
    title: "Get each stage as it ships.",
    line: "Six stages from first commit to something you would hand to another developer. One email per drop.",
    cta: "send me each stage",
  },
  skills: {
    title: "New skills as they land.",
    line: "Every skill here started as something I was retyping. When a new one gets written, you get it.",
    cta: "send me new skills",
  },
  tutorials: {
    title: "Every walk-through, as it ships.",
    line: "One email per guide. Nothing between drops.",
    cta: "send me the guides",
  },
  fast: {
    title: "The next thing that was slow.",
    line: "One guide per problem worth writing down, sent the week it came up. Nothing in between.",
    cta: "send me the next one",
    done: "Done. The next guide lands the week it is written.",
  },
  easy: {
    title: "The next three.",
    line: "One guide per job you should never have been doing by hand. Written the week it comes up, nothing in between.",
    cta: "send me the next three",
    done: "Done. The next guide lands the week it is written.",
  },
  "saas-calc": {
    title: "Which one, and when.",
    line: "A price tells you what a tool costs, not whether you need it. One short guide per row: when the free tier is the right answer, and when a paid seat pays for itself.",
    cta: "send me the guides",
    done: "Done. One guide per row, and a note when a price moves.",
  },
  launch: {
    title: "One guide per thing that broke.",
    line: "This is № 004. The next one gets written the week something else breaks, and you get it then. Nothing in between.",
    cta: "send me the next one",
    done: "Done. The next guide lands the week it is written.",
  },
  blog: {
    title: "The next build note.",
    line: "How the things on this site actually got made, written up when there is something worth writing up.",
    cta: "send me the next note",
  },
  ship: {
    title: "One guide per thing that broke.",
    line: "This is № 002. The next one gets written the week something else breaks, and you get it then. Nothing in between.",
    cta: "send me the next one",
    done: "Done. The next guide lands the week it is written.",
  },
  scale: {
    title: "The next bill that stung.",
    line: "What changed, what it cost before and after, and the number that made the swap worth doing.",
    cta: "send me the next one",
  },
  "get-started": {
    title: "Day one, then day two.",
    line: "You've got the machine set up. The next guide is the first real build, sent when you'd actually need it.",
    cta: "send me the next step",
  },
  domain: {
    title: "The rest of the setup.",
    line: "Domains are the first of a dozen things nobody writes down properly. One guide each, as they come up.",
    cta: "send me the next one",
  },
  automation: {
    title: "The next ten.",
    line: "What got automated, what it replaced, and the honest rate at which it breaks. One write-up per batch.",
    cta: "send me the next batch",
  },
  presets: {
    title: "The rest of the brand kit.",
    line: "Palette and preset are the start. Type, logo rules and the machine-readable version follow, as they get written.",
    cta: "send me the rest",
  },
  "supabase-vs-neon": {
    title: "The next comparison.",
    line: "One pair of tools per write-up, with the question you should actually be asking instead. Nothing in between.",
    cta: "send me the next one",
  },
  "agent-vps": {
    title: "The next thing I put on a server.",
    line: "What ran unattended, what it cost, and what I locked down before letting it. One write-up per setup.",
    cta: "send me the next one",
  },
};

export function CapturePopupMount() {
  const pathname = usePathname() || "/";
  if (NEVER.includes(pathname)) return null;

  const seg = pathname.split("/").filter(Boolean)[0];
  if (!seg) return null;
  const source = seg.slice(0, 40).replace(/[^a-z0-9_-]/g, "-");

  // keyed per mount so a client-side route change resets the trigger timers
  return <CapturePopup key={source} source={source} {...(COPY[seg] ?? {})} />;
}
