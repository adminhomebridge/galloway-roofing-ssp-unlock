"use client";

/**
 * ⚠️ PLACEHOLDER LAYOUT — NOT rendered on the live page yet.
 *
 * The quotes, names, and the stat bar below are SAMPLE content to show the
 * design only. Do NOT publish invented reviews or made-up stats — fabricated
 * testimonials violate the FTC fake-reviews rule. Replace REVIEWS and STATS
 * with verified, real homeowner quotes and true numbers, then enable it by
 * adding to app/page.tsx:
 *     import Testimonials from "@/components/Testimonials";
 *     ...   <HowItWorks />   <Testimonials />   <FinalCTA />
 */

import Reveal from "./Reveal";

// SAMPLE — replace each with a real, verified review (with permission).
const REVIEWS = [
  { quote: "REPLACE: a real homeowner's quote about seeing their numbers.", name: "First L.", place: "City, ST", initials: "FL", color: "bg-asRed" },
  { quote: "REPLACE: a real homeowner's quote about the upgrade they chose.", name: "First L.", place: "City, ST", initials: "FL", color: "bg-asDark-soft" },
  { quote: "REPLACE: a real homeowner's quote about how easy it was.", name: "First L.", place: "City, ST", initials: "FL", color: "bg-amber-500" },
];

// SAMPLE — replace with TRUE, defensible numbers only (or delete the bar).
const STATS = [
  { v: "REPLACE", l: "homeowners" },
  { v: "REPLACE", l: "avg. rating" },
  { v: "16", l: "upgrades scored" },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-asRed-deep uppercase tracking-wider mb-3">
              Homeowners like you
            </p>
            <h2 className="text-3xl lg:text-5xl font-black text-asDark leading-tight text-balance">
              Real plans. Real <span className="highlight-red">savings.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6 shadow-card ring-1 ring-asDark/5 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" />
                    </svg>
                  ))}
                </div>
                <p className="text-asDark font-medium leading-relaxed flex-1">&ldquo;{r.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-asDark/8">
                  <div className={`w-10 h-10 rounded-full ${r.color} text-white font-black flex items-center justify-center text-sm`}>
                    {r.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-asDark">{r.name}</div>
                    <div className="text-xs text-slateWarm">{r.place}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 bg-white rounded-2xl py-7 px-6 shadow-card ring-1 ring-asDark/5">
            {STATS.map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-black text-asDark">{s.v}</div>
                <div className="text-xs font-semibold text-slateWarm uppercase tracking-wide mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
