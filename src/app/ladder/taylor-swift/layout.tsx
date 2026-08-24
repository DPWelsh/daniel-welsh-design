import type { Metadata } from "next";
import { STOPS } from "./content";

/**
 * The SEO surface. The page itself is a server component now and could
 * export metadata directly, but the JSON-LD wants to live next to it and
 * this file already owns the canonical, so both stay here.
 *
 * The HowTo used to describe eleven steps you performed by hand. It now
 * describes the six decisions you actually make, which is what the page
 * is about and what a reader is choosing between.
 */

export const metadata: Metadata = {
  title: "Rebuild Taylor Swift's Website With Claude Code",
  description:
    "One skill, about an hour, roughly $35. It runs the auth, the repo, the crawl and the deploy for you, and stops six times to make you decide the things worth learning. Rung one of the ladder.",
  alternates: { canonical: "/ladder/taylor-swift" },
  openGraph: {
    title: "Rebuild Taylor Swift's Website With Claude Code",
    description:
      "Install one skill, say one sentence, answer six questions. The five boring steps run themselves, and you end up owning every word and image on the page.",
    url: "https://danielwelsh.design/ladder/taylor-swift",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

export default function TaylorSwiftLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Rebuild Taylor Swift's Website With Claude Code",
            totalTime: "PT1H",
            estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "35" },
            step: STOPS.map((s) => ({
              "@type": "HowToStep",
              name: s.title,
              text: s.ask,
            })),
            url: "https://danielwelsh.design/ladder/taylor-swift",
          }),
        }}
      />
      {children}
    </>
  );
}
