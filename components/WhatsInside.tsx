"use client";

import Reveal from "./Reveal";

const BENEFITS = [
  "Every upgrade priced for your exact home — not generic averages.",
  "Ranked by best return, so the smart moves rise to the top.",
  "Energy savings, insurance, and resale value all factored in.",
  "Connect with A+ rated local pros only when you're ready.",
];

const PREVIEW_ROWS = [
  { emoji: "⚡", name: "New Roof", cost: "$104/mo", tag: "Most Popular" },
  { emoji: "❄️", name: "Air Conditioning", cost: "$42/mo", tag: null },
  { emoji: "🪟", name: "New Windows", cost: "$69/mo", tag: "High ROI" },
];

const TRUST = ["16 upgrades scored", "Built for your address", "Financing available", "100% free to use", "No obligation"];

export default function WhatsInside() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-cream via-white to-asRed/[0.04]">
      <div className="absolute top-10 -right-24 w-96 h-96 bg-asRed/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-asDark/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* copy */}
          <Reveal>
            <div>
              <p className="text-sm font-bold text-asRed-deep uppercase tracking-wider mb-3">
                Here&apos;s what you unlock
              </p>
              <h2 className="text-3xl lg:text-5xl font-black text-asDark leading-tight mb-5 text-balance">
                Stop guessing. See your{" "}
                <span className="highlight-red">real numbers.</span>
              </h2>
              <p className="text-lg text-slateWarm leading-relaxed mb-7 max-w-xl">
                The moment you enter your address, every blurred price turns into
                a real monthly cost — for your home, ranked by what pays you back
                the most.
              </p>

              <ul className="space-y-3.5 mb-8">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-asGreen/15 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-asGreen-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-asDark font-medium leading-snug">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {TRUST.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 bg-white border border-asDark/10 text-asDark text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-asRed" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* revealed plan preview (clearly an example) */}
          <Reveal delay={120}>
            <div className="relative">
              <div className="absolute -top-3 right-2 lg:-right-3 z-20 bg-asRed text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 018 0M6 11h12v9H6z" />
                </svg>
                Unlocked
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-deep ring-1 ring-asDark/5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center bg-white rounded-lg px-2 py-1 ring-1 ring-asDark/10"><img src="/images/galloway-logo.png" alt="Galloway Roofing" className="h-5 w-auto object-contain" /></span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slateWarm leading-none">
                        Smart Savings Plan
                      </p>
                      <p className="text-sm font-black text-asDark leading-tight mt-0.5">
                        Your upgrade roadmap
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-asRed/12 text-asRed-deep text-[11px] font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-asRed" />
                    Revealed
                  </span>
                </div>

                <div className="space-y-2.5">
                  {PREVIEW_ROWS.map((r) => (
                    <div key={r.name} className="flex items-center gap-3 bg-cream rounded-xl px-3 py-2.5 border border-asDark/5">
                      <span className="text-lg">{r.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-asDark truncate">{r.name}</div>
                        <div className="text-[10px] text-slateWarm uppercase tracking-wide leading-none mt-0.5">
                          Monthly cost
                        </div>
                      </div>
                      <span className="text-sm font-black text-asDark">{r.cost}</span>
                      {r.tag && (
                        <span className="flex-shrink-0 bg-asRed/15 border border-asRed/40 text-asRed-deep text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {r.tag}
                        </span>
                      )}
                    </div>
                  ))}

                  {/* financing bar — sits where a 4th upgrade would, showing how to fund the plan */}
                  <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-asRed/10 border border-asRed/40">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-asRed/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-asRed-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <rect x="3" y="6" width="18" height="12" rx="2" />
                        <path strokeLinecap="round" d="M3 10h18" />
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-asDark truncate">Home Equity Financing</div>
                      <div className="text-[10px] text-slateWarm uppercase tracking-wide leading-none mt-0.5">
                        Fund your upgrades over time
                      </div>
                    </div>
                    <span className="flex-shrink-0 bg-asRed text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Available
                    </span>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-br from-asDark to-asDark-deep rounded-xl p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                    Your total monthly savings
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-asGreen-bright">$312/mo</span>
                    <span className="text-white/50 text-sm">across your plan</span>
                  </div>
                </div>

                <p className="text-center text-[11px] text-slateWarm mt-4">
                  Example plan — your numbers are personalized to your home
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
