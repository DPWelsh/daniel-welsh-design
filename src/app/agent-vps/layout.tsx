import type { Metadata } from "next";

/* The runbook itself is a client component (step state, ticks,
   localStorage), and "use client" cannot also export metadata. So it
   lives here. */

export const metadata: Metadata = {
  title: "Claude Code on a VPS, unattended",
  description:
    "A follow-along runbook: the AVX2 trap and the one CPU setting that fixes it, the install methods that still work, tmux, Tailscale, and what to put around the agent before you take the prompts away.",
  alternates: { canonical: "/agent-vps" },
  openGraph: {
    title: "Claude Code on a VPS, unattended",
    description:
      "The AVX2 trap, the CPU setting that fixes it, and the isolation you need before --dangerously-skip-permissions. Verified against the docs and the open issue.",
    url: "https://danielwelsh.design/agent-vps",
    siteName: "Daniel Welsh",
    type: "article",
  },
};

export default function AgentVpsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
