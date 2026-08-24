import type { Metadata } from "next";
import { Calculator } from "./calculator";
import { MissingTool, StackSubscribe } from "./capture";
import { getRates } from "./rates";
import { serif, mono } from "../scratch/ui";
import { GuideNav } from "@/components/guide-nav";

/**
 * /saas-calc. One page now.
 *
 * This used to be a checkbox list of 42 tools, with the budget builder living
 * separately at /stack-builder. Two URLs for one question is one too many, so
 * the builder won on UX and moved here, and /stack-builder redirects (see
 * next.config.ts). The old list survives as the "no limit" tier: nothing
 * locked, nothing required, just a running total.
 *
 * Shared CSS lives here rather than in either component, because both the
 * calculator and the capture forms use the .sb-cta button treatment.
 *
 * PROSE RULE: no em dashes anywhere on this page.
 */

const CLOUD = "#f3f0e9";
const CORE = "#1f211e";
const CLAY = "#a43e35";
const DIM = "rgba(26,28,18,0.72)";
const FAINT = "rgba(26,28,18,0.52)";

export const metadata: Metadata = {
  title: "SaaS cost calculator. Price your whole stack",
  description:
    "Pick a budget, pick one tool per row, and see what a real software business costs to run each month. 110 tools with verified pricing across the stack, the tools and the engine room, plus the exact stack Routiq runs on.",
  alternates: { canonical: "https://danielwelsh.design/saas-calc" },
  openGraph: {
    title: "SaaS cost calculator",
    description:
      "Build a working stack under $25, $100, $1,000, or price your own with no ceiling. Real verified prices, and the full bill Routiq actually pays.",
    url: "https://danielwelsh.design/saas-calc",
    type: "website",
  },
};

export default async function SaasCostCalculatorPage() {
  const rates = await getRates();

  return (
    <main className="relative min-h-screen" style={{ backgroundColor: CLOUD }}>
      {/* This page shipped with no chrome at all: once you were here the
          only way out was the back button. */}
      <GuideNav />
      <style>{`
        @keyframes stampIn{0%{transform:scale(2.4) rotate(-14deg);opacity:0}60%{transform:scale(0.92) rotate(2deg);opacity:1}100%{transform:scale(1) rotate(-3deg)}}
        @keyframes paneIn{from{transform:translateX(18px);opacity:0}to{transform:none;opacity:1}}
        /* A button has to read as a button before it reads as a sentence:
           solid fill, hard offset shadow, and it moves when you touch it. */
        .sb-cta{position:relative;box-shadow:4px 4px 0 ${CLAY};transition:transform .16s cubic-bezier(.2,.8,.3,1),box-shadow .16s cubic-bezier(.2,.8,.3,1)}
        .sb-cta:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 ${CLAY}}
        .sb-cta:active{transform:translate(3px,3px);box-shadow:0 0 0 ${CLAY}}
        .sb-cta .sb-arrow{display:inline-block;transition:transform .16s cubic-bezier(.2,.8,.3,1)}
        .sb-cta:hover .sb-arrow{transform:translateX(5px)}
        .sb-info{opacity:.45;transition:opacity .14s ease,transform .14s ease}
        /* A live typing indicator, because "thinking…" as static text reads
           as a stuck page rather than a reply on its way. */
        .sb-dots i{width:5px;height:5px;border-radius:50%;background:${CLAY};display:inline-block;animation:sbBlink 1.1s infinite ease-in-out both}
        .sb-dots i:nth-child(2){animation-delay:.16s}
        .sb-dots i:nth-child(3){animation-delay:.32s}
        @keyframes sbBlink{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-2px)}}
        .sb-info:hover{opacity:1;transform:scale(1.15)}
        @media (prefers-reduced-motion:reduce){
          .sb-cta,.sb-cta .sb-arrow,.sb-info{transition:none}
          .sb-dots i{animation:none}
          .sb-cta:hover{transform:none}
        }
      `}</style>

      <div className="relative mx-auto max-w-5xl px-6 pb-52 pt-16 sm:px-8 lg:px-10">
        <header>
          <p className={`${mono} text-[11px] uppercase tracking-[0.22em]`} style={{ color: CLAY }}>
            Daniel Welsh · the calculator
          </p>
          <h1
            className={`${serif} mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl`}
            style={{ color: CORE }}
          >
            Price your
            <br />
            <span style={{ color: CLAY }}>whole stack.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed" style={{ color: DIM }}>
            Pick a budget, pick one tool per row, and see what the bill comes to.
          </p>
          <p className={`${mono} mt-2 text-[11px] tracking-[0.04em]`} style={{ color: FAINT }}>
            * Real prices, checked 16 Aug 2026.
          </p>
        </header>

        <Calculator rates={rates} />

        <MissingTool source="saas-calc" />
        <StackSubscribe source="saas-calc" />

        <p className="mt-14 max-w-2xl text-[13px] leading-relaxed" style={{ color: FAINT }}>
          Every price is the vendor list price in US dollars, because that is how nearly all of
          them bill. The few that bill in Australian dollars or euros (Xero, Cliniko, Nookal,
          Hetzner) are stored as their US equivalent so the totals add up, and say so in their
          panel. The currency dropdown converts at the day&rsquo;s mid-market rate, refreshed daily, so
          treat it as a guide and not as what your card will be charged.
        </p>
        <p className="mt-5 max-w-2xl text-[13px] leading-relaxed" style={{ color: FAINT }}>
          Grades are opinionated on purpose. S needs coverage and headroom, C means you spent the
          whole budget, over budget never grades. Want no ceiling and no grade? Take the no limit
          tier and price the stack you already run.
        </p>
      </div>
    </main>
  );
}
