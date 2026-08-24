"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initPostHog, posthog } from "@/lib/posthog";

function Pageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    initPostHog();

    const query = searchParams?.toString();
    posthog.capture("$pageview", {
      $current_url: window.origin + pathname + (query ? `?${query}` : ""),
    });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider() {
  // useSearchParams opts its whole subtree out of static prerendering unless a
  // Suspense boundary sits above it, and every page here is static.
  return (
    <Suspense fallback={null}>
      <Pageview />
    </Suspense>
  );
}
