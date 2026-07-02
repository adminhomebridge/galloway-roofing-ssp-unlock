"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import UnlockForm from "@/components/UnlockForm";

/* ============================================================
   EXIT-INTENT LEAD-GEN MODAL — Galloway Roofing
   ------------------------------------------------------------
   Fires when a visitor is about to leave WITHOUT unlocking, and
   converts them right here via the real UnlockForm (same Google
   Places + match logic as the page — one source of truth).

   Triggers:
     • Desktop  → exit-intent (mouse leaves toward the top)
     • Mobile   → fires after a dwell, once they've engaged
   Guards:
     • Once per session · never if the page field has content ·
       never closes mid-unlock.
   Add ?exitpreview=1 to the URL to force it open for a demo.

   ── VIDEO ──
   There is no Galloway-branded walkthrough video yet (the
   Allstar one can't be reused here). Until one exists, the
   poster image shows as a static visual. When ready, drop the
   file in /public/videos/ and set VIDEO_SRC.
   ============================================================ */

const VIDEO_SRC = ""; // TODO(Thomas): add a Galloway-branded walkthrough video, e.g. "/videos/galloway-ssp-preview.mp4"
const POSTER_SRC = "/images/hero-home.jpg";

const CONFIG = {
  sessionKey: "as_exit_modal_shown",
  minTimeOnPageMs: 4000,
  mobileDwellMs: 26000,
};

export default function ExitIntentModal() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const openedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => setMounted(true), []);

  const heroHasInput = () => {
    const el =
      (document.querySelector('#unlock input[aria-label="Your home address"]') ||
        document.querySelector("#unlock input")) as HTMLInputElement | null;
    return !!el && el.value.trim().length >= 4;
  };
  const unlockInProgress = () => !!document.querySelector(".unlock-overlay");

  const tryOpen = useCallback(() => {
    if (openedRef.current) return;
    try {
      if (sessionStorage.getItem(CONFIG.sessionKey)) return;
    } catch {
      /* sessionStorage unavailable — fail open */
    }
    if (heroHasInput() || unlockInProgress()) return;
    openedRef.current = true;
    try {
      sessionStorage.setItem(CONFIG.sessionKey, "1");
    } catch {
      /* ignore */
    }
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    if (unlockInProgress()) return;
    setOpen(false);
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("exitpreview") === "1") {
      const t = window.setTimeout(() => {
        openedRef.current = true;
        setOpen(true);
      }, 600);
      return () => window.clearTimeout(t);
    }

    const startedAt = Date.now();
    const ready = () => Date.now() - startedAt > CONFIG.minTimeOnPageMs;

    const onMouseOut = (e: MouseEvent) => {
      if (!ready()) return;
      if (e.clientY <= 0 && !e.relatedTarget) tryOpen();
    };
    document.addEventListener("mouseout", onMouseOut);

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let engaged = false;
    let dwellTimer: number | undefined;
    const onScroll = () => {
      if (engaged) return;
      engaged = true;
      dwellTimer = window.setTimeout(tryOpen, CONFIG.mobileDwellMs);
    };
    if (coarse) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
      if (dwellTimer) window.clearTimeout(dwellTimer);
    };
  }, [tryOpen]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="exit-overlay" role="dialog" aria-modal="true" aria-labelledby="exit-modal-title" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="exit-panel">
        <button type="button" onClick={close} aria-label="Close" className="absolute top-3.5 right-3.5 z-10 w-9 h-9 inline-flex items-center justify-center rounded-full bg-asDark/5 hover:bg-asDark/10 text-slateWarm hover:text-asDark transition">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-asRed/10 border border-asRed/40 rounded-full text-[11px] font-bold uppercase tracking-wider text-asRed-deep mb-4">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2v-9a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm3 8H9V6a3 3 0 016 0v3z" />
          </svg>
          Your plan&apos;s already built
        </div>

        {/* video (when available) or poster */}
        <div className="relative rounded-xl overflow-hidden bg-asDark-deep aspect-video shadow-deep mb-5">
          {VIDEO_SRC ? (
            <>
              <video ref={videoRef} src={VIDEO_SRC} poster={POSTER_SRC} muted autoPlay loop playsInline className="w-full h-full object-cover" />
              <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"} className="absolute bottom-2.5 right-2.5 w-8 h-8 inline-flex items-center justify-center rounded-full bg-asDark-deep/55 hover:bg-asDark-deep/75 text-white transition backdrop-blur-sm">
                {muted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" opacity="0.4" />
                    <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.2v2.1a7 7 0 010 13.4v2.1a9 9 0 000-17.6z" />
                  </svg>
                )}
              </button>
            </>
          ) : (
            <img src={POSTER_SRC} alt="" className="w-full h-full object-cover" />
          )}
        </div>

        <h3 id="exit-modal-title" className="text-3xl font-black text-asDark leading-[1.05] mb-2.5">
          Don&apos;t leave your savings locked.
        </h3>
        <p className="text-[15px] text-asDark/70 leading-relaxed mb-5">
          One address unlocks your{" "}
          <strong className="text-asDark font-bold">monthly cost</strong>, your{" "}
          <strong className="text-asDark font-bold">savings</strong>, and a{" "}
          <strong className="text-asDark font-bold">vetted local pro</strong> for every
          upgrade — with <strong className="text-asDark font-bold">no calls unless you ask.</strong>
        </p>

        {/* the real form — same autocomplete + match logic as the page */}
        <UnlockForm variant="light" stacked hideNote />

        {/* trust strip */}
        <div className="mt-5 pt-4 border-t border-asDark/10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {["10-second unlock", "100% free", "Your info stays private"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-asDark">
              <svg className="w-4 h-4 text-asGreen flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
