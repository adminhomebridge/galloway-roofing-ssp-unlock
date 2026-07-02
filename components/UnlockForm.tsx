"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import posthog from "posthog-js";
import { UNLOCK } from "@/lib/brand";

type Status = "idle" | "unlocking" | "notfound" | "error";

type PlaceData = {
  place_id?: string;
  address_components?: { long: string; short: string; types: string[] }[];
  lat?: number;
  lng?: number;
};

const REVEAL_TEXT = [
  "Confirming it’s you…",
  "Decrypting your numbers…",
  "Your plan is unlocked",
];

const GMAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

/**
 * Loads the Google Places library once (matches the proven pattern used on
 * the Allstar Services main site + the other white-labeled landing pages: the legacy
 * `google.maps.places.Autocomplete` widget loaded via `&libraries=places`).
 * Calls `cb` as soon as the library is available.
 */
function loadGooglePlaces(cb: () => void) {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.google?.maps?.places) {
    cb();
    return;
  }
  const existing = document.getElementById("google-places-script");
  if (existing) {
    existing.addEventListener("load", cb, { once: true });
    return;
  }
  if (!GMAPS_KEY) {
    // No key baked in yet → the field still works as a plain text input.
    console.warn(
      "[Galloway] NEXT_PUBLIC_GOOGLE_MAPS_KEY is missing — address autocomplete is off. Add it in Vercel and redeploy without build cache."
    );
    return;
  }
  const s = document.createElement("script");
  s.id = "google-places-script";
  s.src = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_KEY}&libraries=places`;
  s.async = true;
  s.addEventListener("load", cb, { once: true });
  document.head.appendChild(s);
}

/**
 * Coarse, non-PII metadata about the selected address for PostHog event props.
 * Deliberately excludes the raw street address — we only emit zip / state and
 * whether a Google Place was actually selected (so we can break funnels down by
 * region without storing PII in analytics).
 */
function addressMeta(place: PlaceData) {
  const comps = place.address_components ?? [];
  const pick = (type: string) =>
    comps.find((c) => c.types?.includes(type))?.short;
  return {
    zip: pick("postal_code"),
    state: pick("administrative_area_level_1"),
    has_place_id: Boolean(place.place_id),
  };
}

export default function UnlockForm({
  variant = "light",
  stacked = false,
  hideNote = false,
}: {
  variant?: "light" | "onDark";
  stacked?: boolean;
  hideNote?: boolean;
}) {
  const [address, setAddress] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<Status>("idle");

  const addressRef = useRef<HTMLInputElement>(null);
  const acRef = useRef<any>(null);
  const placeRef = useRef<PlaceData>({});

  // reveal-animation state
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => setMounted(true), []);

  // attach Google Places autocomplete to the input (legacy widget)
  const initAutocomplete = useCallback(() => {
    const w = window as any;
    if (!addressRef.current || !w.google?.maps?.places || acRef.current) return;
    const ac = new w.google.maps.places.Autocomplete(addressRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["formatted_address", "place_id", "geometry", "address_components"],
    });
    acRef.current = ac;
    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      const addr = place?.formatted_address ?? "";
      if (addr) setAddress(addr);
      const loc = place?.geometry?.location;
      placeRef.current = {
        place_id: place?.place_id,
        address_components: (place?.address_components ?? []).map((c: any) => ({
          long: c.long_name,
          short: c.short_name,
          types: c.types,
        })),
        lat: loc ? loc.lat() : undefined,
        lng: loc ? loc.lng() : undefined,
      };
      setStatus("idle");
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadGooglePlaces(() => {
      if (!cancelled) initAutocomplete();
    });
    return () => {
      cancelled = true;
    };
  }, [initAutocomplete]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const sleep = (ms: number) =>
    new Promise<void>((r) => {
      timers.current.push(setTimeout(r, ms));
    });

  const unlock = useCallback(
    async (addr: string, tok?: string) => {
      if (!addr || addr.trim().length < 4) {
        setStatus("error");
        return;
      }

      // PostHog: the user submitted the address (funnel intent signal).
      const meta = addressMeta(placeRef.current);
      posthog.capture("plan_unlock_started", meta);

      // Meta Pixel Lead event. The same eventId is sent to the match endpoint
      // so a server-side CAPI Lead (Pranshu) can dedupe against this one.
      const eventId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `lead_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq(
          "track",
          "Lead",
          { content_name: "SSP Unlock" },
          { eventID: eventId }
        );
      }

      setStatus("unlocking");
      setPhase(0);
      setCount(0);
      setProgress(12);

      timers.current.push(setTimeout(() => { setPhase(1); setProgress(55); }, 650));
      timers.current.push(setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 850, 1);
          setCount(Math.round(16 * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, 700));
      timers.current.push(setTimeout(() => { setPhase(2); setProgress(100); }, 1750));

      const minHold = sleep(2400);
      const place = placeRef.current;
      let dest: string | null = null;
      let failed: Status | null = null;
      let usedFallback = false;

      if (!UNLOCK.matchEndpoint) {
        usedFallback = true;
        const url = new URL(UNLOCK.fallbackUrl);
        url.searchParams.set("address", addr.trim());
        dest = url.toString();
      } else {
        try {
          const res = await fetch(UNLOCK.matchEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: addr.trim(),
              type: "address",
              place_id: place.place_id,
              address_components: place.address_components,
              lat: place.lat,
              lng: place.lng,
              token: tok,
              event_id: eventId,
            }),
          });
          if (!res.ok) failed = "error";
          else {
            const data = (await res.json()) as { found?: boolean; planUrl?: string };
            if (data.found && data.planUrl) dest = data.planUrl;
            else failed = "notfound";
          }
        } catch {
          failed = "error";
        }
      }

      await minHold;

      if (dest) {
        // PostHog: funnel step 2 — the plan was unlocked for this address.
        posthog.capture("plan_unlocked", {
          ...meta,
          unlock_source: usedFallback ? "fallback" : "match",
        });
        window.location.href = dest;
      } else {
        clearTimers();
        posthog.capture("plan_unlock_failed", {
          ...meta,
          reason: failed ?? "error",
        });
        setStatus(failed ?? "error");
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // one-click prefill from the retargeting link (?address=... or ?email=...)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get("address") ?? params.get(UNLOCK.prefillEmailParam);
    const tok = params.get(UNLOCK.tokenParam) ?? undefined;
    const auto = params.get(UNLOCK.autoUnlockParam);
    if (tok) setToken(tok);
    if (prefill) setAddress(prefill);
    if (auto && (prefill || tok)) unlock(prefill ?? "", tok);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => unlock(address, token);
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit();
  };

  const onDark = variant === "onDark";
  const busy = status === "unlocking";

  return (
    <div className="w-full">
      <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${onDark ? "text-white/80" : "text-asDark/70"}`}>
        Your home address
      </label>

      <div className={`flex gap-3 ${stacked ? "flex-col" : "flex-col sm:flex-row"}`}>
        <input
          ref={addressRef}
          type="text"
          inputMode="text"
          autoComplete="off"
          value={address}
          onChange={(e) => { setAddress(e.target.value); placeRef.current = {}; if (status !== "idle" && status !== "unlocking") setStatus("idle"); }}
          onKeyDown={onKey}
          placeholder="Start typing your home address…"
          aria-label="Your home address"
          disabled={busy}
          className={`flex-1 rounded-xl px-5 py-4 text-base outline-none transition disabled:opacity-60 ${
            onDark
              ? "bg-white text-asDark placeholder-slateWarm focus:ring-2 focus:ring-asRed"
              : "bg-white border-2 border-asDark/15 text-asDark placeholder-slateWarm focus:border-asRed focus:ring-2 focus:ring-asRed/30"
          }`}
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={busy}
          className={`inline-flex items-center justify-center gap-2 bg-asRed hover:bg-asRed-deep text-white font-bold px-6 py-4 rounded-xl text-base transition shadow-cta hover:-translate-y-0.5 disabled:opacity-80 disabled:translate-y-0 whitespace-nowrap ${stacked ? "w-full text-lg py-5" : ""}`}
        >
          Unlock My Plan
          <LockOpen />
        </button>
      </div>

      <div className="min-h-[22px] mt-3" aria-live="polite">
        {status === "error" && (
          <p className={`text-sm font-medium ${onDark ? "text-white" : "text-asDark"}`}>
            Please enter your home address.
          </p>
        )}
        {status === "notfound" && (
          <p className={`text-sm font-medium ${onDark ? "text-white" : "text-asDark"}`}>
            We couldn&apos;t find a plan for that address.{" "}
            <a href={UNLOCK.fallbackUrl} className="underline font-bold text-asRed-deep">
              Build a fresh plan
            </a>.
          </p>
        )}
      </div>

      {!hideNote && (
        <p className={`text-xs mt-1 leading-relaxed ${onDark ? "text-white/55" : "text-slateWarm"}`}>
          Your plan is already built — this just opens it for your home. Free to
          use, no obligation.
        </p>
      )}

      {busy && mounted && createPortal(
        <div className="unlock-overlay">
          <div className="unlock-panel">
            <span className="inline-flex items-center justify-center bg-white rounded-xl px-3 py-2 mx-auto mb-5"><img src="/images/galloway-logo.png" alt="Galloway Roofing" className="h-8 w-auto object-contain" /></span>
            <Padlock open={phase >= 2} />
            <h3 className="text-2xl font-black text-white mt-6 mb-1">
              {REVEAL_TEXT[phase]}
              {phase >= 2 && <span className="text-asRed-bright"> ✓</span>}
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Smart Savings Plan · {address ? address.split(",")[0] : "your home"}
            </p>
            <div className="unlock-track mb-3">
              <div className="unlock-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-white/80 text-sm font-semibold tabular-nums">
              {count} of 16 upgrades unlocked
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

function Padlock({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={`w-20 h-20 mx-auto padlock-glow ${open ? "padlock--open" : ""}`} aria-hidden>
      <path className="padlock-shackle" d="M20 30 v-7 a12 12 0 0 1 24 0 v7" fill="none" stroke="#1f66b0" strokeWidth="5" strokeLinecap="round" />
      <rect x="15" y="29" width="34" height="27" rx="6" fill="#004187" />
      <circle cx="32" cy="40" r="4" fill="#111a27" />
      <rect x="30.5" y="42" width="3" height="8" rx="1.5" fill="#111a27" />
    </svg>
  );
}

function LockOpen() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 018 0M6 11h12a1 1 0 011 1v7a1 1 0 01-1 1H6a1 1 0 01-1-1v-7a1 1 0 011-1z" />
    </svg>
  );
}
