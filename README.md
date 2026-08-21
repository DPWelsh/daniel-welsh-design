# Daniel Welsh Design

Personal brand website for Daniel Welsh: builder, designer, and product storyteller.

The site is a dependency-free static page with animated ASCII artwork, Daniel and Billie walking together, a floating laptop, responsive layouts, reduced-motion support, and a cursor-driven colour shimmer.

## Run locally

```sh
python3 -m http.server 4173
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Structure

- `index.html` — complete site, styles, and animation runtime
- `site-assets/higgsfield-b2-ascii-walk-with-hat/` — character frames
- `site-assets/billie-ascii-walk/` — Billie’s Kintamani walk frames
- `site-assets/billie-higgsfield-walk-tail-up.mp4` — approved Billie source loop
- `site-assets/higgsfield-laptop-ascii/` — laptop frames
- `scripts/generate-billie-ascii-walk.mjs` — deterministic Billie-to-ASCII converter

## Deployment

The `main` branch is published with GitHub Pages.
