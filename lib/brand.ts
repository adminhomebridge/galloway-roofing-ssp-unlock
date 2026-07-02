// ============================================================
// Smart Savings Plan — "Unlock" landing page configuration
// ============================================================
// This page is built to live INSIDE the portal, where the
// homeowner's personalized Smart Savings Plan already exists.
// The visitor arrives from a retargeting campaign, enters an
// identifier (email), we match it to their existing plan, and
// send them straight into it.
//
// ── FOR PRANSHU: there is exactly ONE thing to wire up ──
// Point `matchEndpoint` below at the portal route that takes an
// identifier and returns that user's plan URL. The contract the
// front end expects is documented right under it. Everything
// else (copy, design, fallbacks) is already handled.
// ============================================================

export const BRAND = {
  partnerName: "Galloway Roofing",
  tagline: "Your Smart Savings Plan, ready to unlock",
};

export const UNLOCK = {
  // ----------------------------------------------------------
  // 1) THE MATCH ENDPOINT  (Pranshu wires this)
  // ----------------------------------------------------------
  // The form POSTs the homeowner's identifier here. Because this
  // page runs inside the portal, the portal already has the user
  // record — this endpoint just needs to match on the identifier
  // and return the URL of that user's existing Smart Savings Plan.
  //
  // Leave as "" while building; the form will fall back to the
  // demo behaviour below so the page is fully clickable without a
  // backend. Set it to the real route to go live.
  //
  // Example:  "/api/match-plan"   or   "https://portal.dealerbridge.ai/api/match-plan"
  matchEndpoint: "",

  // ----------------------------------------------------------
  // REQUEST the front end sends to matchEndpoint:
  //   POST  { identifier: string, type: "email", token?: string }
  //   - identifier : what the homeowner typed (or the prefilled value)
  //   - type       : currently always "email"
  //   - token      : optional opaque token from the retargeting link
  //                  (?t=... in the URL) if you'd rather match on that
  //
  // RESPONSE the front end expects (JSON):
  //   FOUND      -> { found: true,  planUrl: "https://.../plan/abc123" }
  //   NOT FOUND  -> { found: false }
  //   (any non-2xx or network error is treated as a soft error and
  //    the visitor is shown the "we couldn't find that" message)
  // ----------------------------------------------------------

  // 2) ONE-CLICK PREFILL (optional, recommended)
  // If the retargeting link carries the identifier, the form
  // prefills and the visitor unlocks in one tap. Supported params:
  //   ?email=jane@email.com     -> prefills the email field
  //   ?t=OPAQUE_TOKEN           -> passed through as `token`
  //   ?autounlock=1             -> auto-submits if an identifier is present
  prefillEmailParam: "email",
  tokenParam: "t",
  autoUnlockParam: "autounlock",

  // 3) FALLBACK (used only while matchEndpoint is "")
  // Where to send people if there's no backend yet — keeps the
  // page demoable. Default: Galloway's own free-estimate page.
  // TODO(Thomas): confirm this is the right fallback destination.
  fallbackUrl: "https://gallowayroofing.com/free-estimate/",
};

// Optional secondary CTA — fund the plan with a HELOC.
export const FIGURE_URL =
  "https://www.figure.com/home-equity-line/homebridge/?irclickid=2GVVO6wmpxyZRAMQSfxfZV6dUkuUflUBQRqTw80&irgwc=1&afsrc=1&utm_medium=affiliate&utm_source=Home%20Bridge.ai&utm_campaign=heloc&utm_content=HomeBridge%20Main%20Link";
