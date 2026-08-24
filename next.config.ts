import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // GitHub Pages resolved /blog/<slug>/ to that folder's index.html.
      // Next serves public/ as flat files and does no directory-index
      // lookup, so the clean URL 404s without this. The posts stay
      // hand-built static HTML; only the routing is taught the old trick.
      // /blog itself is a real route, and :slug never matches a bare /blog.
      { source: "/blog/:slug", destination: "/blog/:slug/index.html" },
    ];
  },
  async redirects() {
    return [
      // Posts lived at /blog, moved to /journal on 2026-08-21, and came back
      // to /blog on 2026-08-24 as the canonical name. This sends the /journal
      // spell back; the old /blog -> /journal rule had to go with it, since
      // keeping both would bounce a request between them forever.
      { source: "/journal/:path*", destination: "/blog/:path*", permanent: true },
      { source: "/guides", destination: "/tutorials", permanent: true },
      { source: "/beginner-mistakes", destination: "/scratch", permanent: false },
      { source: "/stack-builder", destination: "/saas-calc", permanent: true },
      { source: "/saas-cost-calculator", destination: "/saas-calc", permanent: true },
    ];
  },
};

export default nextConfig;
