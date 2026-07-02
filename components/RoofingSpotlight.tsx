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
  { target: 62, suffix: "", label: "Team members, in-house" },
];

const MATERIALS = [
  {
    name: "Asphalt Shingles",
    detail: "GAF Timberline with StainGuard Plus & LayerLock wind resistance.",
    img: "/images/roofing-asphalt-shingles.jpg",
  },
  {
    name: "Metal Roofing",
    detail: "Tilcor & Decra stone-coated steel — 50-yr warranty, 120 mph rating.",
    img: "/images/roofing-metal.jpg",
  },
  {
    name: "Concrete & Clay Tile",
    detail: "Eagle & Crown tile systems, built for coastal conditions.",
    img: "/images/roofing-tile.jpg",
  },
  {
    name: "TPO & Commercial",
    detail: "TPO/EPDM membrane systems for flat and low-slope roofs.",
    img: "/images/roofing-commercial-tpo.jpg",
  },
];

const CREDENTIALS = [
  "GAF Master Elite — top 2% of roofing contractors nationwide",
  "Own crews on every job, never subcontractors",
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
              GAF Master Elite certified, serving Southwest Florida since 2012
              with our own in-house crews — never subcontractors.
            </p>
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

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* materials */}
          <Reveal>
            <div>
              <h3 className="text-sm font-bold text-asDark uppercase tracking-wider mb-4">
                What we install
              </h3>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {MATERIALS.map((m) => (
                  <div key={m.name} className="bg-white rounded-xl overflow-hidden shadow-card border border-asDark/8">
                    <div className="relative h-28">
                      <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-asDark/70 via-asDark/10 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-black text-asDark mb-1">{m.name}</div>
                      <p className="text-xs text-slateWarm leading-relaxed">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
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
