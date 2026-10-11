import type { Metadata } from "next";
import { GuideNav } from "@/components/guide-nav";
import { CopyBlock } from "@/components/scratch/copy-block";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import { CLOSING, LEDE, MISTAKES, PULLS, PULLS_LEDE, PULLS_PROMPT, STEPS, WHY_YOU } from "./content";
import {
  DIM, ENERGY, FAINT, Kicker, PAPER, PROMPT,
  RULE, RULE_SOFT, SectionHead, mono, serif,
} from "../scratch/ui";

/**
 * /grid. Payload for the "IG grid overhaul" reel (comment GRID). Also on labs.routiq.ai/grid,
 * whose canonical points here.
 *
 * Six steps from a messy reels tab to a consistent one, each with the prompt
 * to paste into Claude Code, then the mistakes worth skipping. Copy lives in
 * content.ts.
 */

export const metadata: Metadata = {
  title: "Redo Your Instagram Grid With Claude: The Prompts | Routiq Labs",
  description:
    "How I redid all 21 reel covers with Claude Code: a look to copy, my brand kit, a still from every reel, titles from the transcript, real stickers, and a mock before the swap. Every prompt included.",
  alternates: { canonical: "https://danielwelsh.design/grid" },
  openGraph: {
    title: "Redo Your Instagram Grid With Claude",
    description: "Six steps and the prompts, from a messy reels tab to a consistent one.",
  },
};

export default function GridPage() {
  return (
    <main
      className="relative min-h-screen overflow-x-clip antialiased selection:bg-[#a43e35] selection:text-[#f3f0e9]"
      style={{ background: "var(--paper)", color: PAPER }}
    >
      <GuideNav />

      <header className="mx-auto max-w-3xl px-6 pt-4 pb-12 sm:pt-8">
        <Kicker>Instagram grid · Field Guide № 009</Kicker>
        <h1 className={`${serif} mt-5 text-4xl leading-[1.06] sm:text-6xl`}>
          Redo your grid with Claude
        </h1>
        <p className="mt-6 text-lg leading-relaxed" style={{ color: DIM }}>{LEDE}</p>
        <p className="mt-4 text-base leading-relaxed" style={{ color: FAINT }}>{WHY_YOU}</p>

        {/* The before and after, side by side. */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          {[
            { src: "/grid/before.jpg", label: "Before" },
            { src: "/grid/after.jpg", label: "After" },
          ].map((p) => (
            <figure key={p.label}>
              <p className={`${mono} mb-2 text-xs uppercase tracking-widest`} style={{ color: p.label === "After" ? PROMPT : FAINT }}>
                {p.label}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={`My Instagram reels grid, ${p.label.toLowerCase()} the redo`}
                className="w-full rounded-2xl"
                style={{ border: `1px solid ${RULE}` }}
                loading="eager"
              />
            </figure>
          ))}
        </div>
      </header>

      {/* The six steps in one table. */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <SectionHead part="01" title="The short version" lede="Six steps, in the order I did them." />
        <div className="mt-8" style={{ borderTop: `1px solid ${RULE}` }}>
          {STEPS.map((s) => (
            <a
              key={s.n}
              href={`#s${s.n}`}
              className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 py-4 transition-colors hover:bg-black/[0.03] sm:grid-cols-[3rem_1fr_16rem] sm:gap-6"
              style={{ borderBottom: `1px solid ${RULE_SOFT}` }}
            >
              <span className={`${mono} text-sm`} style={{ color: ENERGY }}>{s.n}</span>
              <span className="text-base">{s.name}</span>
              <span className={`${mono} col-span-2 text-sm sm:col-span-1 sm:text-right`} style={{ color: PROMPT }}>{s.short}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Each step, with the prompt to paste. */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <SectionHead part="02" title="Each step, and the prompt" lede="Paste each one into Claude Code. Swap the bits in brackets for your own." />
        <div className="mt-8 space-y-16">
          {STEPS.map((s) => (
            <article key={s.n} id={`s${s.n}`} className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className={`${mono} text-sm`} style={{ color: ENERGY }}>{s.n}</span>
                <h3 className={`${serif} text-2xl`}>{s.name}</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed" style={{ color: DIM }}>{s.what}</p>

              <ul className="mt-5 space-y-2">
                {s.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed" style={{ color: DIM }}>
                    <span className={`${mono} shrink-0 text-sm`} style={{ color: FAINT }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <CopyBlock id={`grid-step-${s.n}`} filename={`prompt-${s.n}.txt`} body={s.prompt} tone="light">
                  {/* prose prompts wrap; commands elsewhere keep CopyBlock's one-line default */}
                  <span className="whitespace-pre-wrap text-[13px]">{s.prompt}</span>
                </CopyBlock>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Getting the reel list, captions and videos out of Instagram. */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <SectionHead part="03" title="Pulling your reels" lede={PULLS_LEDE} />
        <div className="mt-8 grid grid-cols-1 gap-px sm:grid-cols-2">
          {PULLS.map((p) => (
            <div key={p.name} className="p-6" style={{ background: "rgba(31,33,30,0.04)" }}>
              <p className={`${serif} text-2xl`}>{p.name}</p>
              <p className={`${mono} mt-1 text-xs uppercase tracking-widest`} style={{ color: PROMPT }}>{p.who}</p>
              <p className="mt-4 text-base leading-relaxed">{p.gets}</p>
              <p className="mt-3 text-base leading-relaxed" style={{ color: DIM }}>{p.how}</p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: FAINT }}>{p.watch}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <CopyBlock id="grid-pull" filename="prompt-pull.txt" body={PULLS_PROMPT} tone="light">
            <span className="whitespace-pre-wrap text-[13px]">{PULLS_PROMPT}</span>
          </CopyBlock>
        </div>
      </section>

      {/* What cost time, so you can skip it. */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <SectionHead part="04" title="What I would skip next time" lede="The mistakes that cost me time, so they do not cost you any." />
        <div className="mt-8 grid grid-cols-1 gap-px sm:grid-cols-2">
          {MISTAKES.map((m) => (
            <div key={m.name} className="p-6" style={{ background: "rgba(31,33,30,0.04)" }}>
              <p className={`${mono} text-xs uppercase tracking-widest`} style={{ color: PROMPT }}>{m.name}</p>
              <p className="mt-3 text-base leading-relaxed" style={{ color: DIM }}>{m.line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <p className={`${serif} text-2xl leading-snug`}>{CLOSING}</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <ScratchSubscribe source="grid" />
      </section>
    </main>
  );
}
