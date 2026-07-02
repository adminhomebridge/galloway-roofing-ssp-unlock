"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* ============================================================
   META PIXEL — Galloway Roofing SSP dataset
   ------------------------------------------------------------
   Fires PageView on first load (inline script) and again on
   every client-side route change (the thing the raw Meta
   snippet gets wrong in Next.js). The Lead conversion event is
   fired from UnlockForm on submit, with an eventId that is also
   sent to the match endpoint so a server-side CAPI Lead can
   dedupe against it.

   IMPORTANT: this is a NEW client site, so it needs its OWN
   Pixel/Dataset ID — do not reuse Allstar's. Set it via
   NEXT_PUBLIC_META_PIXEL_ID in Vercel (same pattern as the
   Google Maps key / PostHog key below). Until it's set, the
   pixel simply doesn't load — no events fire anywhere.

   The Pixel/Dataset ID is public by design (it ships in the
   browser). The CAPI access token is NOT — that stays a server
   secret and never goes in this repo.
   ============================================================ */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function MetaPixel() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  // Subsequent route changes: the inline script already fired the first one.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname]);

  if (!PIXEL_ID) {
    if (typeof window !== "undefined") {
      console.warn(
        "[Galloway] NEXT_PUBLIC_META_PIXEL_ID is missing — Meta Pixel is off. Add Galloway's own Pixel/Dataset ID in Vercel and redeploy."
      );
    }
    return null;
  }

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}
