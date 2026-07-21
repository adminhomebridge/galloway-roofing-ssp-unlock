import UnlockForm from "./UnlockForm";

const PREVIEW_ROWS = [
  { emoji: "⚡", name: "New Roof", tag: "Most Popular", value: "$104/mo" },
  { emoji: "❄️", name: "Air Conditioning", tag: null, value: "$42/mo" },
  { emoji: "🪟", name: "New Windows", tag: "High ROI", value: "$69/mo" },
];

export default function HeroUnlock() {
  return (
    <section id="top" className="relative overflow-hidden text-white">
      {/* full-bleed background photo */}
      <div className="absolute inset-0">
        <img src="/images/hero-home.jpg" alt="" className="w-full h-full object-cover object-left lg:object-center" />
        {/* faint brand tint — cohesion only, not enough to cast blue */}
        <div className="absolute inset-0 bg-asDark/12" />
        {/* neutral dark scrim behind the copy — reads as shadow, not blue */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0)_70%)]" />
        {/* whisper of neutral footing at the very bottom (no blue) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.32)_0%,transparent_14%)]" />
      </div>

      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal is-visible min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-asRed/40 rounded-full text-xs font-semibold uppercase tracking-wider">
                Your plan is built and waiting
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-semibold uppercase tracking-wider text-white/80">
                Powered by Homebridge
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-6 text-balance">
              Your Smart Savings Plan is{" "}
              <span className="highlight-green text-white">ready.</span>
            </h1>

            <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-xl [text-shadow:_0_1px_12px_rgba(20,22,28,0.55)]">
              Powered by Homebridge, your plan covers 16 upgrades across your
              entire home — roofing, HVAC, windows, kitchen, and more — with
              the monthly cost and savings already worked out for each one.
              Confirm your address to unlock the numbers.
            </p>

            <div
              id="unlock"
              className="bg-asDark-deep/75 backdrop-blur-md border border-white/15 rounded-2xl p-6 lg:p-7 shadow-deep scroll-mt-28"
            >
              <UnlockForm variant="onDark" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 text-base font-bold text-white [text-shadow:_0_1px_10px_rgba(20,22,28,0.6)]">
              <Trust>Built for your address</Trust>
              <Trust>100% free to use</Trust>
              <Trust>Takes 10 seconds</Trust>
            </div>
          </div>

          <div className="reveal is-visible min-w-0" style={{ transitionDelay: "150ms" }}>
            <LockedPlanCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function LockedPlanCard() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -top-3 -right-3 z-20 bg-asRed text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
        <span aria-hidden>🔓</span>
        Ready to unlock
      </div>

      <div className="scan relative bg-white rounded-2xl p-6 shadow-deep overflow-hidden">
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
          <span className="inline-flex items-center gap-1.5 bg-asDark/8 text-asDark text-[11px] font-bold px-2.5 py-1 rounded-full">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2a5 5 0 00-5 5v3H6a1 1 0 00-1 1v9a1 1 0 001 1h12a1 1 0 001-1v-9a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm3 8H9V7a3 3 0 016 0v3z" />
            </svg>
            Locked
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
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="value-lock text-sm font-black text-asDark">{r.value}</span>
                <MiniLock />
              </div>
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

        <div className="mt-4 bg-asDark rounded-xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
            Your total monthly savings
          </p>
          <div className="flex items-center gap-2">
            <span className="value-lock text-2xl font-black text-asGreen-bright">$300/mo</span>
            <MiniLock light />
          </div>
        </div>

        <p className="text-center text-xs text-slateWarm mt-4">
          + 13 more upgrades scored for your home
        </p>
      </div>
    </div>
  );
}

function MiniLock({ light = false }: { light?: boolean }) {
  return (
    <svg className={`w-3.5 h-3.5 flex-shrink-0 ${light ? "text-white/60" : "text-slateWarm"}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2a5 5 0 00-5 5v3H6a1 1 0 00-1 1v9a1 1 0 001 1h12a1 1 0 001-1v-9a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm3 8H9V7a3 3 0 016 0v3z" />
    </svg>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <svg className="w-5 h-5 text-asGreen-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {children}
    </span>
  );
}
