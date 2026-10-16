import type { Metadata } from "next";
import { GuideNav } from "@/components/guide-nav";
import { CopyBlock } from "@/components/scratch/copy-block";
import { ScratchSubscribe } from "@/components/scratch/scratch-subscribe";
import {
  BEATS, BEFORE_FILMING, CLOSING, CREDIT, DEMO_NOTE, EFFECTS, FIRST_PROMPT, INSTALL, LAYERS, LEDE, MISTAKES, STEPS, WHY_YOU,
} from "./content";
import {
  DIM, ENERGY, FAINT, Kicker, PAPER, PROMPT,
  RULE, RULE_SOFT, SectionHead, mono, serif,
} from "../scratch/ui";

/**
 * /effects. Payload for the "I binned my video editor" reel (comment EFFECTS).
 *
 * Gives away the reel-effects skill: the depth-sandwich idea, a one-line install,
 * the four prompts to use it, the effects that are ready and the ones that are
 * recipes, what to fix before filming, and what went wrong building it.
 * Copy lives in content.ts. The skill is served from public/skills/reel-effects.
 */

export const metadata: Metadata = {
  title: "Video Effects With Claude, No Editor: The Skill",
  description:
    "I binned my video editor after 42 days. This is the Claude Code skill that replaced it: captions, orbit, cover story, doodle boil, spotlight, a comment CTA and more, rendered free with HyperFrames. One-line install.",
  alternates: { canonical: "https://danielwelsh.design/effects" },
  openGraph: {
    title: "Video Effects With Claude, No Editor",
    description: "The skill that replaced my video editor. Eleven effects ready, eleven recipes, one-line install.",
  },
};

const ready = EFFECTS.filter((e) => e.ready);
const recipes = EFFECTS.filter((e) => !e.ready);

export default function EffectsPage() {
  return (
    <main
      className="relative min-h-screen overflow-x-clip antialiased selection:bg-[#a43e35] selection:text-[#f3f0e9]"
      style={{ background: "var(--paper)", color: PAPER }}
    >
      <GuideNav />

      <header className="mx-auto max-w-3xl px-6 pt-4 pb-12 sm:pt-8">
        <Kicker>Video effects · Field Guide № 010</Kicker>
        <h1 className={`${serif} mt-5 text-4xl leading-[1.06] sm:text-6xl`}>
          Video effects with Claude, no editor
        </h1>
        <p className="mt-6 text-lg leading-relaxed" style={{ color: DIM }}>{LEDE}</p>
        <p className="mt-4 text-base leading-relaxed" style={{ color: FAINT }}>{WHY_YOU}</p>

        {/* The proof: the actual reel, edited by the skill, with what fires when. */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,320px)_1fr] sm:items-start">
          <figure>
            <p className={`${mono} mb-2 text-xs uppercase tracking-widest`} style={{ color: PROMPT }}>This reel, edited by the skill</p>
            <video
              src="/effects/this-reel.mp4"
              poster="/effects/this-reel.jpg"
              className="aspect-[9/16] w-full rounded-2xl object-cover"
              style={{ border: `1px solid ${RULE}`, background: "#1f211e" }}
              controls
              playsInline
              preload="metadata"
              aria-label="My 'I binned my video editor' reel, edited by the reel-effects skill"
            />
          </figure>
          <div>
            <p className={`${mono} mb-2 text-xs uppercase tracking-widest`} style={{ color: FAINT }}>What fires when</p>
            <div style={{ borderTop: `1px solid ${RULE}` }}>
              {BEATS.map((b) => (
                <div key={b.t} className="grid grid-cols-[3rem_1fr] gap-x-4 py-3" style={{ borderBottom: `1px solid ${RULE_SOFT}` }}>
                  <span className={`${mono} text-sm`} style={{ color: ENERGY }}>{b.t}</span>
                  <span className="text-base leading-snug">
                    {b.effect}
                    <span className="block text-sm" style={{ color: DIM }}>{b.on}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: FAINT }}>{DEMO_NOTE}</p>
          </div>
        </div>
      </header>

      {/* Install. */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <SectionHead part="01" title="Install it" lede="One paste in Terminal. It puts the skill where Claude Code looks for skills." />
        <div className="mt-8 space-y-4">
          <CopyBlock id="effects-install" filename="install reel-effects. One paste, in Terminal" body={INSTALL} />
          <p className="text-base leading-relaxed" style={{ color: DIM }}>
            Then open Claude Code anywhere and paste this, with your own clip:
          </p>
          <CopyBlock id="effects-first" filename="first-prompt.txt" body={FIRST_PROMPT}>
            <span className="whitespace-pre-wrap text-[13px]">{FIRST_PROMPT}</span>
          </CopyBlock>
          <p className="text-sm leading-relaxed" style={{ color: FAINT }}>
            Read it before you run it:{" "}
            <a href="/skills/reel-effects/SKILL.md" className="underline underline-offset-4" style={{ color: PROMPT }}>SKILL.md</a>
            {" · "}
            <a href="/skills/reel-effects/references/effects.md" className="underline underline-offset-4" style={{ color: PROMPT }}>the effect cards</a>
            . Fonts default to Inter. Drop your own into the skill&apos;s fonts folder.
          </p>
        </div>
      </section>

      {/* The one idea. */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <SectionHead
          part="02"
          title="The one idea"
          lede="Almost every effect is a sandwich. Your cut-out sits between two layers of graphics, so things can go behind you and in front of you."
        />
        <div className="mt-8" style={{ borderTop: `1px solid ${RULE}` }}>
          {LAYERS.map((l) => (
            <div
              key={l.z}
              className="grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-1 py-4 sm:grid-cols-[3.5rem_12rem_1fr] sm:gap-6"
              style={{ borderBottom: `1px solid ${RULE_SOFT}` }}
            >
              <span className={`${mono} text-sm`} style={{ color: ENERGY }}>{l.z}</span>
              <span className="text-base">{l.name}</span>
              <span className="col-span-2 text-base leading-relaxed sm:col-span-1" style={{ color: DIM }}>{l.what}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The effects. */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <SectionHead
          part="03"
          title="What's in it"
          lede={`${ready.length} effects are built and checked on a real take. ${recipes.length} more are written up as recipes, with the measurements, for Claude to build the first time you need one.`}
        />
        <p className={`${mono} mt-8 text-xs uppercase tracking-widest`} style={{ color: PROMPT }}>Ready</p>
        <div className="mt-3" style={{ borderTop: `1px solid ${RULE}` }}>
          {ready.map((e) => (
            <div
              key={e.name}
              className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-1 py-3 sm:grid-cols-[3rem_11rem_1fr] sm:gap-6"
              style={{ borderBottom: `1px solid ${RULE_SOFT}` }}
            >
              <span className={`${mono} text-sm`} style={{ color: ENERGY }}>{e.id}</span>
              <span className="text-base">{e.name}</span>
              <span className="col-span-2 text-base leading-relaxed sm:col-span-1" style={{ color: DIM }}>{e.what}</span>
            </div>
          ))}
        </div>
        <p className={`${mono} mt-10 text-xs uppercase tracking-widest`} style={{ color: FAINT }}>Recipes</p>
        <div className="mt-3 grid grid-cols-1 gap-px sm:grid-cols-2">
          {recipes.map((e) => (
            <div key={e.name} className="p-5" style={{ background: "rgba(31,33,30,0.04)" }}>
              <p className="text-base">
                <span className={`${mono} mr-3 text-sm`} style={{ color: FAINT }}>{e.id}</span>
                {e.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: DIM }}>{e.what}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Using it, with the prompts. */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <SectionHead part="04" title="Using it, and the prompts" lede="Four steps. Paste each one into Claude Code and swap in your own paths." />
        <div className="mt-8 space-y-14">
          {STEPS.map((s) => (
            <article key={s.n} id={`s${s.n}`} className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className={`${mono} text-sm`} style={{ color: ENERGY }}>{s.n}</span>
                <h3 className={`${serif} text-2xl`}>{s.name}</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed" style={{ color: DIM }}>{s.what}</p>
              <div className="mt-5">
                <CopyBlock id={`effects-step-${s.n}`} filename={`prompt-${s.n}.txt`} body={s.prompt}>
                  <span className="whitespace-pre-wrap text-[13px]">{s.prompt}</span>
                </CopyBlock>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Before filming. */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <SectionHead
          part="05"
          title="Fix these before the effects"
          lede="I measured his edited reels against mine. His cutting pace is ordinary. These are what actually differ."
        />
        <div className="mt-8 grid grid-cols-1 gap-px sm:grid-cols-2">
          {BEFORE_FILMING.map((b) => (
            <div key={b.name} className="p-6" style={{ background: "rgba(31,33,30,0.04)" }}>
              <p className={`${mono} text-xs uppercase tracking-widest`} style={{ color: PROMPT }}>{b.name}</p>
              <p className="mt-3 text-base leading-relaxed" style={{ color: DIM }}>{b.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What went wrong. */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <SectionHead part="06" title="What I would skip next time" lede="The mistakes from building it, so they do not cost you anything." />
        <div className="mt-8 grid grid-cols-1 gap-px sm:grid-cols-2">
          {MISTAKES.map((m) => (
            <div key={m.name} className="p-6" style={{ background: "rgba(31,33,30,0.04)" }}>
              <p className={`${mono} text-xs uppercase tracking-widest`} style={{ color: PROMPT }}>{m.name}</p>
              <p className="mt-3 text-base leading-relaxed" style={{ color: DIM }}>{m.line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-8">
        <p className="text-sm leading-relaxed" style={{ color: FAINT }}>{CREDIT}</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <p className={`${serif} text-2xl leading-snug`}>{CLOSING}</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <ScratchSubscribe source="effects" />
      </section>
    </main>
  );
}
