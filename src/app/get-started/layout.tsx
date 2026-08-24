import type { Metadata } from "next";

/**
 * The page is a client component (the Day Zero console), and a client
 * component cannot export metadata, so the SEO surface and the HowTo
 * structured data live here.
 */

export const metadata: Metadata = {
  title: "Day Zero. Set Up a Completely Fresh Computer to Build Apps",
  description:
    "Once, ever. The exact accounts and installs to go from a brand-new laptop to your first live website. With a one-command setup script and a Claude Code skill that builds your first site with you.",
  alternates: { canonical: "/get-started" },
  openGraph: {
    title: "Day Zero. From fresh laptop to live URL",
    description:
      "The exact setup: 1 browser, 5 accounts, 4 installs, 1 live URL. One command does the installs.",
    url: "https://danielwelsh.design/get-started",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Day Zero. Set up a completely fresh computer to build apps",
            step: [
              { "@type": "HowToStep", name: "Accounts", text: "Chrome, GitHub, Claude, Namecheap, Vercel (signed up with GitHub), Google Analytics" },
              { "@type": "HowToStep", name: "Installs", text: "Homebrew, Git, Node, Cursor, Claude Code" },
              { "@type": "HowToStep", name: "The first site", text: "Build a page with Claude Code and push it to a live URL" },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
