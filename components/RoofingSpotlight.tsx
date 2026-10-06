"use client";

/* ============================================================
   ROOFING SPOTLIGHT — Galloway Roofing
   ------------------------------------------------------------
   Sits above the LockedRoadmap ("all 16 upgrades") section to
   ground the plan in the specific company running it. Since
   Galloway is a roofing contractor, this calls out their
   roofing credentials before the homeowner scrolls into the
   full multi-category upgrade list.

   Facts below are pulled from gallowayroofing.com (fetched
   2026-07-02) — update if their stats change.
   ============================================================ */

import { useReveal, useCountUp } from "./hooks";
import Reveal from "./Reveal";
import UnlockForm from "./UnlockForm";

const STATS = [
  { target: 30, suffix: "+", label: "Years in Southwest Florida" },
  { target: 30000, suffix: "+", label: "Roofing projects completed" },
  { target: 62, suffix: "", label: "Team members" },
];

const MATERIALS = [
  {
    name: "Asphalt Shingles",
    detail:
      "Premium architectural asphalt shingles, built for Florida wind, sun, and storm season.",
    img: "/images/roofing-asphalt-shingles.jpg",
    benefits: [
      "Rated for high winds",
      "Algae-resistant protection",
      "Precision installation",
    ],
  },
  {
    name: "Metal Roofing",
    detail:
      "Durable stone-coated steel metal roofing — a 50-year, 120 mph system built for Florida.",
    img: "/images/roofing-metal.jpg",
    benefits: [
      "50-year warranty",
      "120 mph wind rating",
      "Stone-coated steel system",
    ],
  },
];

const CREDENTIALS = [
  "Uncompromising Craftsmanship: Every project is built with precision and care, ensuring long-lasting durability and exceptional results.",
  "Client-Centered Service: From the first call to the final inspection, we're here to provide a seamless, stress-free experience that puts your satisfaction first.",
  "Full general liability & workers' comp coverage",
  "Storm damage & insurance claim specialists",
];

export default function RoofingSpotlight() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  // Called explicitly (not via .map) to satisfy the rules of hooks —
  // STATS has a fixed length so this is safe, but the linter can't verify that.
  const years = useCountUp(STATS[0].target, visible);
  const projects = useCountUp(STATS[1].target, visible);
  const team = useCountUp(STATS[2].target, visible);
  const values = [years, projects, team];

  return (
    <section ref={ref} className="bg-cream py-20 lg:py-28 border-b border-asDark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-asRed-deep uppercase tracking-wider mb-3">
              Your roofing partner
            </p>
            <h2 className="text-3xl lg:text-5xl font-black text-asDark leading-tight mb-4 text-balance">
              Built by{" "}
              <span className="highlight-red">Galloway Roofing.</span>
            </h2>
            <p className="text-lg text-slateWarm leading-relaxed max-w-2xl mx-auto">
              A licensed roofing contractor, proudly serving Southwest
              Florida since 2012.
            </p>
            <div className="relative mt-7 max-w-2xl mx-auto">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#4ecde8]/60 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
              <div
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-asRed-bright/45 rounded-full blur-3xl pointer-events-none animate-glow-pulse"
                style={{ animationDelay: "1.8s" }}
              />

              <div className="relative overflow-hidden bg-gradient-to-br from-white to-[#eef7fb] rounded-2xl shadow-deep ring-1 ring-[#4ecde8]/30 p-6 lg:p-7">
                <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                  <img
                    src="/images/homebridge-logo.png"
                    alt="Homebridge"
                    className="h-16 sm:h-20 w-auto object-contain flex-shrink-0"
                  />
                  <div>
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-asRed-deep mb-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-transparent via-[#4ecde8]/70 to-transparent bg-[length:200%_100%] animate-shimmer-fast">
                      <SparkIcon />
                      AI-powered savings technology
                    </p>
                    <p className="text-xl font-black text-asDark leading-snug mb-1.5">
                      Powered by Homebridge.
                    </p>
                    <p className="text-sm text-slateWarm leading-relaxed">
                      Homebridge is the technology behind this Smart Savings
                      Plan — scoring your whole home, not just your roof,
                      across all 16 upgrades so you see the full picture
                      before you unlock your numbers.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-asDark/8 flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
                  <TechStat label="AI-powered analysis" delay={STAT_DELAYS[0]} />
                  <TechStat label="16 upgrades scored" delay={STAT_DELAYS[1]} />
                  <TechStat label="30-second results" delay={STAT_DELAYS[2]} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* stats */}
        <Reveal>
          <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-12">
            {STATS.map((s, i) => (
              <div key={s.label} className="text-center bg-white rounded-2xl p-5 lg:p-8 shadow-card border border-asDark/8">
                <div className="text-3xl lg:text-5xl font-black text-asRed tabular-nums leading-none">
                  {values[i].toLocaleString()}
                  {s.suffix}
                </div>
                <div className="mt-2 text-xs lg:text-sm font-bold text-asDark leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <h3 className="text-sm font-bold text-asDark uppercase tracking-wider mb-4">
          What we install
        </h3>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* materials */}
          <Reveal className="h-full">
            <div className="h-full flex flex-col sm:flex-row gap-4">
              {MATERIALS.map((m) => (
                <div key={m.name} className="sm:flex-1 bg-white rounded-2xl overflow-hidden shadow-card border border-asDark/8 flex flex-col">
                  <div className="relative flex-1 min-h-[8rem]">
                    <img src={m.img} alt={m.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-asDark/85 via-asDark/25 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="text-lg font-black text-white leading-tight">{m.name}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-slateWarm leading-relaxed mb-3 min-h-[4.5rem]">{m.detail}</p>
                    {m.benefits && (
                      <ul className="space-y-2">
                        {m.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-asRed flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-asDark leading-snug">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* credentials */}
          <Reveal delay={100}>
            <div className="bg-gradient-to-br from-asDark via-asDark-mid to-asDark-deep rounded-2xl p-6 lg:p-8 text-white shadow-deep">
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-4">
                Why homeowners choose Galloway
              </h3>
              <ul className="space-y-3.5">
                {CREDENTIALS.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-asGreen/25 flex items-center justify-center">
                      <svg className="w-3 h-3 text-asGreen-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/90 leading-snug">{c}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                  See my roof upgrade options
                </p>
                <UnlockForm variant="onDark" stacked hideNote />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SparkIcon() {
  return (
    <svg className="w-5 h-5 text-[#4ecde8] flex-shrink-0 animate-twinkle-big" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

const STAT_DELAYS = ["0s", "0.6s", "1.2s"];

function TechStat({ label, delay = "0s" }: { label: string; delay?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-asDark/70">
      <span className="relative flex w-2.5 h-2.5">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-[#4ecde8] opacity-90 animate-ping-slow"
          style={{ animationDelay: delay }}
        />
        <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#2C76B7]" />
      </span>
      {label}
    </span>
  );
}
