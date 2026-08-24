import posthog from "posthog-js";

// posthog.init throws a console warning and re-runs autocapture wiring if it
// is called twice, and React strict mode mounts effects twice in dev.
let started = false;

export function initPostHog() {
  if (typeof window === "undefined") return posthog;
  if (started) return posthog;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return posthog;

  started = true;
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    // App Router client navigations don't reload the page, so the built-in
    // pageview capture only ever sees the first route. PostHogPageview sends
    // them instead.
    capture_pageview: false,
    capture_pageleave: true,
    loaded: (ph) => {
      ph.register({ app_source: "danielwelsh-design" });
    },
  });

  return posthog;
}

export { posthog };
