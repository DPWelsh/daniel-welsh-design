import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // GitHub Pages resolved /journal/<slug>/ to that folder's index.html.
      // Next serves public/ as flat files and does no directory-index
      // lookup, so the clean URL 404s without this. The journal posts stay
      // hand-built static HTML; only the routing is taught the old trick.
      { source: "/journal/:slug", destination: "/journal/:slug/index.html" },
    ];
  },
  async redirects() {
    return [
      // The journal moved off /blog on 2026-08-21. Pages had no server
      // redirects, Vercel does, so the old URL stops 404ing here.
      { source: "/blog/:path*", destination: "/journal/:path*", permanent: true },
      { source: "/guides", destination: "/tutorials", permanent: true },
      { source: "/beginner-mistakes", destination: "/scratch", permanent: false },
      { source: "/stack-builder", destination: "/saas-calc", permanent: true },
      { source: "/saas-cost-calculator", destination: "/saas-calc", permanent: true },
    ];
  },
};

export default nextConfig;
