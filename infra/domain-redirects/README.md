# Domain redirects

This small Vercel project provides HTTPS-safe permanent redirects from
`danielwelsh.dev` and `danielwelsh.site` to the canonical
`https://danielwelsh.design` domain while preserving the request path.

The bare root has its own rule because Vercel's `/:path*` wildcard only
matches non-empty paths. Both rules preserve query strings automatically.
