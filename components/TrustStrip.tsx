"use client";

import { useReveal, useCountUp } from "./hooks";
import UnlockForm from "./UnlockForm";

const INPUTS = [
  {
    pct: 30,
    label: "Lower energy bills",
    micro: "Ranked highest-impact first for your home",
    accent: "border-t-asRed",
    chip: "bg-asRed/10 text-asRed-deep",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    pct: 20,
    label: "Lower insurance",
    micro: "On qualifying upgrades like impact windows & roofing",
    accent: "border-t-blue-400",
    chip: "bg-blue-50 text-blue-600",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z" />
    ),
  },
  {
    pct: 15,
    label: "More home value",
    micro: "Added equity from the right projects",
    accent: "border-t-amber-400",
    chip: "bg-amber-50 text-amber-600",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8M21 7v5M21 7h-5" />
    ),
  },
];

export default function TrustStrip() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const energy = useCountUp(30, visible);
  const insurance = useCountUp(20, visible);
  const value = useCountUp(15, visible);
  const live = [energy, insurance, value];

  return (
    <section ref={ref} className="bg-white py-20 lg:py-24 border-b border-asDark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-asRed-deep uppercase tracking-wider mb-3">
            What your plan is worth
          </p>
          <h2 className="text-3xl lg:text-5xl font-black text-asDark leading-tight mb-4 text-balance">
            We run the math. You keep the{" "}
            <span className="highlight-red">savings.</span>
          </h2>
          <p className="text-lg text-slateWarm leading-relaxed max-w-2xl mx-auto">
            Your plan scores all 16 upgrades on three returns, then turns them
            into one number — calculated for your exact home.
          </p>
        </div>

        {/* three input cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {INPUTS.map((s, i) => (
            <div
              key={s.label}
              className={`bg-white border border-asDark/8 ${s.accent} border-t-4 rounded-2xl p-6 shadow-card`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-asDark/5 flex items-center justify-center">
                  <svg className="w-6 h-6 text-asDark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    {s.icon}
                  </svg>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.chip}`}>
                  in your plan
                </span>
              </div>
              <div className="text-4xl font-black text-asDark tabular-nums leading-none">
                Up to {live[i]}%
              </div>
              <div className="mt-2 text-base font-bold text-asDark">{s.label}</div>
              <p className="text-sm text-slateWarm mt-1 leading-relaxed">{s.micro}</p>
            </div>
          ))}
        </div>

        {/* result bar — the three combine into one locked number */}
        <div className="relative overflow-hidden bg-gradient-to-br from-asDark via-asDark-soft to-asDark-deep rounded-2xl p-6 lg:p-8 shadow-deep">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-asRed/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-10">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-asRed mb-2">
                Combined into one number for your home
              </p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-white/70 text-lg font-semibold">
                  Your total monthly savings:
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="value-lock text-4xl font-black text-asGreen-bright">$312/mo</span>
                  <svg className="w-5 h-5 text-white/50" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2a5 5 0 00-5 5v3H6a1 1 0 00-1 1v9a1 1 0 001 1h12a1 1 0 001-1v-9a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm3 8H9V7a3 3 0 016 0v3z" />
                  </svg>
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-white/55">
                <span>16 upgrades scored</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>30 seconds</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>100% free to use</span>
              </div>
            </div>

            {/* unlock form — convert right from this section */}
            <div className="w-full lg:w-[440px] flex-shrink-0">
              <UnlockForm variant="onDark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
