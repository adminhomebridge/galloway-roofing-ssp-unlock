"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

/* ============================================================
   POSTHOG — Galloway Roofing SSP on-site analytics
   ------------------------------------------------------------
   Initializes PostHog in the browser so $pageview (and UTM
   params from the campaign links) are captured automatically.
   The custom funnel events (plan_unlock_started, plan_unlocked,
   …) are fired from UnlockForm on submit.

   The project API key is public by design (it ships in the
   browser, exactly like the Meta Pixel ID). It is read from
   NEXT_PUBLIC_POSTHOG_KEY so it can be set per-environment in
   Vercel without committing it — add it there and redeploy.
   ============================================================ */

export default function PostHogInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) {
      console.warn(
        "[Galloway] NEXT_PUBLIC_POSTHOG_KEY is missing — PostHog analytics are off. Add it in Vercel (PostHog → Settings → Project API Key) and redeploy."
      );
      return;
    }
    if ((posthog as any).__loaded) return;
    posthog.init(key, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      person_profiles: "always",
    });
  }, []);

  return null;
}
