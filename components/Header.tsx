"use client";

import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-asDark/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-gradient-to-b from-black/30 via-black/10 to-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16 lg:h-20" : "h-20 lg:h-24"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-3 hover:opacity-80 transition"
          aria-label={`${BRAND.partnerName} home`}
        >
          <img
            src="/images/galloway-logo.png"
            alt={BRAND.partnerName}
            className={`w-auto transition-all duration-300 ${scrolled ? "h-9" : "h-11 lg:h-12"}`}
          />
        </a>

        <a
          href="#unlock"
          className="inline-flex items-center gap-2 bg-asRed hover:bg-asRed-deep text-white font-bold px-5 py-2.5 rounded-lg text-sm transition shadow-cta hover:-translate-y-0.5"
        >
          Unlock My Plan
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
