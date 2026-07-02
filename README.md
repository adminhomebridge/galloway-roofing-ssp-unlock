# Homebridge.ai — Smart Savings Plan "Unlock" Landing Page

A standalone landing page for **retargeting traffic** whose Smart Savings Plan
already exists in the system. The page teases the full plan (all 16 upgrades,
savings, ROI) with every number **locked**, captures the homeowner's email,
matches it to their existing plan, and sends them straight in.

Same structure and stack as the HELOC landing page: Next.js 14 (App Router),
React 18, TypeScript, Tailwind v3. No CMS, no external icon library.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (already verified clean)
```

Deploys to Vercel exactly like the HELOC page (push to main → auto-deploy).

---

## FOR PRANSHU — the one thing to wire up

Everything lives in **`lib/brand.ts`** under the `UNLOCK` object. You only need
to set `matchEndpoint`. While it's `""`, the page is fully clickable and falls
back to the public SSP page, so nothing breaks before the backend is ready.

### 1. Set the endpoint

```ts
// lib/brand.ts
export const UNLOCK = {
  matchEndpoint: "/api/match-plan",   // <-- your portal route
  ...
};
```

### 2. The contract the front end uses

The form (`components/UnlockForm.tsx`) sends:

```
POST {matchEndpoint}
Content-Type: application/json

{
  "identifier": "jane@email.com",   // what the homeowner typed (or prefilled)
  "type": "email",                  // always "email" for now
  "token": "OPAQUE_TOKEN"           // optional, from ?t=... on the link
}
```

Your endpoint matches on the identifier (the portal already has the user
record) and returns the URL of that user's existing plan:

```jsonc
// FOUND
{ "found": true, "planUrl": "https://portal.../plan/abc123" }

// NOT FOUND
{ "found": false }
```

- On `found: true` → the browser is redirected to `planUrl`.
- On `found: false` → the homeowner sees a "we couldn't find that" message
  with a link to build a fresh plan.
- Any non-2xx or network error → treated as a soft error, same fallback message.

### 3. One-click prefill (optional but recommended)

If the retargeting link carries the identifier, the form prefills and can
auto-submit, so the homeowner unlocks in a single tap. Supported URL params
(names configurable in `lib/brand.ts`):

| Param         | Effect                                            |
|---------------|---------------------------------------------------|
| `?email=...`  | Prefills the email field                          |
| `?t=...`      | Passed through as `token` in the POST body        |
| `?autounlock=1` | Auto-submits if an identifier is present        |

Example link for a campaign:
`https://portal.../unlock?email=jane@email.com&autounlock=1`

---

## File map

```
app/
  layout.tsx          metadata + noindex
  page.tsx            section assembly
  globals.css         theme + the "locked value" styles
components/
  Header.tsx
  HeroUnlock.tsx      hero: unlock form + locked plan preview (the signature)
  UnlockForm.tsx      *** the email-match form — integration lives here ***
  TrustStrip.tsx      animated program stats
  LockedRoadmap.tsx   all 16 upgrades, numbers redacted
  WhatsInside.tsx     three value streams
  HowItWorks.tsx      confirm email -> match -> unlock
  FinalCTA.tsx        second unlock form
  FAQ.tsx
  Footer.tsx
  Reveal.tsx, hooks.ts   scroll reveal + count-up
lib/
  brand.ts            *** all config: matchEndpoint, prefill, fallback ***
public/images/        logo, Hootsy, 16 product images
```

The redacted-number styling (`.locked-value`, `.blur-lock`, `.locked-value--dark`)
is in `app/globals.css` if you ever need to reuse the locked look elsewhere.
