"use client";

import Reveal from "./Reveal";
import UnlockForm from "./UnlockForm";

type Product = {
  name: string;
  img: string;
  badge: string | null;
  cost: string;
  energy: string;
  roi: string;
  hook: string;
};
type Category = { id: string; label: string; products: Product[] };

const CATEGORIES: Category[] = [
  {
    id: "energy",
    label: "🏠 Roofing & Energy Efficiency",
    products: [
      { name: "New Roof", img: "/images/roof.png", badge: "Your Match", cost: "$104/mo", energy: "10–20%", roi: "10–15 yrs", hook: "Protect your home and cut cooling bills." },
      { name: "New Windows", img: "/images/windows.png", badge: null, cost: "$69/mo", energy: "10–13%", roi: "12–20 yrs", hook: "Quieter rooms, warmer winters, lower bills." },
      { name: "Air Conditioning", img: "/images/ac.png", badge: null, cost: "$42/mo", energy: "10–25%", roi: "5–10 yrs", hook: "Reliable cool air for less every month." },
      { name: "Attic Insulation", img: "/images/insulation.png", badge: "High ROI", cost: "$28/mo", energy: "15–30%", roi: "3–7 yrs", hook: "The cheapest way to slash energy bills." },
    ],
  },
  {
    id: "interior",
    label: "🏠 Interior Upgrades",
    products: [
      { name: "Kitchen Remodel", img: "/images/kitchen-remodel.jpg", badge: "Top Value", cost: "$124/mo", energy: "5–15%", roi: "10–15 yrs", hook: "The upgrade buyers pay the most for." },
      { name: "Bathroom Remodel", img: "/images/bathroom-remodel.jpg", badge: null, cost: "$75/mo", energy: "5–10%", roi: "8–12 yrs", hook: "A spa-like bath that lifts home value." },
      { name: "Flooring", img: "/images/flooring.png", badge: null, cost: "$65/mo", energy: "0%", roi: "8–12 yrs", hook: "Fresh floors that transform every room." },
      { name: "Custom Closets", img: "/images/bath.png", badge: null, cost: "$40/mo", energy: "0%", roi: "5–10 yrs", hook: "Double your storage, love your space." },
    ],
  },
  {
    id: "exterior",
    label: "🛡️ Exterior & Structure",
    products: [
      { name: "Exterior Painting", img: "/images/exterior-painting.jpg", badge: null, cost: "$35/mo", energy: "0%", roi: "5–8 yrs", hook: "Instant curb appeal that protects siding." },
      { name: "Gutters", img: "/images/gutters.jpg", badge: null, cost: "$15/mo", energy: "0%", roi: "4–8 yrs", hook: "Stop water damage before it starts." },
      { name: "Siding", img: "/images/siding.jpg", badge: null, cost: "$45/mo", energy: "5–15%", roi: "10–15 yrs", hook: "A whole new look with far less upkeep." },
      { name: "Generator", img: "/images/generator.png", badge: "Storm Ready", cost: "$85/mo", energy: "0%", roi: "8–15 yrs", hook: "Never lose power in the next storm." },
    ],
  },
  {
    id: "water",
    label: "💧 Water & Health",
    products: [
      { name: "Foundation Waterproofing", img: "/images/waterproof.png", badge: null, cost: "$65/mo", energy: "0%", roi: "8–12 yrs", hook: "Keep your basement dry for good." },
      { name: "Walk-In Bathtub", img: "/images/walk-in-tub.jpg", badge: null, cost: "$42/mo", energy: "0%", roi: "3–5 yrs", hook: "Safe, spa-like bathing made easy." },
      { name: "Tankless Water Heater", img: "/images/tankless.png", badge: "High ROI", cost: "$45/mo", energy: "10–20%", roi: "6–10 yrs", hook: "Endless hot water — and lower bills." },
      { name: "Water Filtration", img: "/images/tub.png", badge: null, cost: "$30/mo", energy: "0%", roi: "5–10 yrs", hook: "Cleaner, better-tasting water on tap." },
    ],
  },
];

export default function LockedRoadmap() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-asRed text-white">
      <div className="absolute inset-0 bg-grain opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-asDark/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <Reveal>
          <div className="text-center mb-6">
            <p className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              What&apos;s inside your plan
            </p>
            <h2 className="text-3xl lg:text-5xl font-black leading-tight mb-4 text-balance max-w-3xl mx-auto">
              Your roof, plus 15 more upgrades,{" "}
              <span className="highlight-green text-white">priced for your home.</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              We start with the roof upgrade your home is matched for, then show
              every other upgrade too. Your exact monthly price is already
              calculated — enter your address to reveal it.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/70">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path strokeLinecap="round" d="M3 10h18" />
              </svg>
              Financing available to spread upgrades into a single monthly payment.
            </p>
          </div>
        </Reveal>

        {/* progress meter */}
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white text-sm font-bold px-4 py-2 rounded-full">
              <LockSmall />
              0 of 16 prices unlocked
            </span>
            <div className="hidden sm:block w-40 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-0 bg-white rounded-full" />
            </div>
          </div>
        </Reveal>

        {/* all 16, grouped by category */}
        <div className="space-y-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-base font-black text-white">{cat.label}</h3>
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs font-semibold text-white/40">
                  {cat.products.length} upgrades
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {cat.products.map((p, idx) => (
                  <Reveal key={p.name} delay={idx * 50}>
                    <Card p={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* in-section unlock form */}
        <Reveal>
          <div
            id="vault-unlock"
            className="relative overflow-hidden mt-14 bg-gradient-to-br from-asDark-mid to-asDark-deep border border-white/10 rounded-3xl p-7 lg:p-10 shadow-deep scroll-mt-24"
          >
            <div className="absolute -top-20 -right-16 w-72 h-72 bg-asRed/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-black leading-tight mb-3 text-balance">
                  Unlock the price on all{" "}
                  <span className="text-asRed-bright">16 upgrades</span> at once.
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Enter the address your plan was built for and every monthly
                  price unlocks instantly — free to use, no obligation.
                </p>
              </div>
              <UnlockForm variant="onDark" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Card({ p }: { p: Product }) {
  const energyLabel = p.energy !== "0%";
  return (
    <a
      href="#vault-unlock"
      className="group relative block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-deep ring-1 ring-white/5 hover:ring-asRed/50 transition-all duration-300 hover:-translate-y-1"
    >
      {/* image with name + hook baked in (visible on every device — no hover dependency) */}
      <div className="relative h-28 overflow-hidden">
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-asDark/95 via-asDark/60 to-transparent" />
        {p.badge && (
          <div className="absolute top-2.5 left-2.5 bg-asRed text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
            {p.badge}
          </div>
        )}
        <div className="absolute bottom-2 left-3 right-3">
          <div
            className="text-white font-black text-[15px] leading-tight"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85), 0 1px 8px rgba(0,0,0,0.5)" }}
          >
            {p.name}
          </div>
          <div
            className="text-white/90 text-[11px] leading-snug line-clamp-1"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
          >
            {p.hook}
          </div>
        </div>
      </div>

      {/* compact body */}
      <div className="p-3.5">
        {/* revealed stats — clear, to build desire */}
        <div className="flex items-center gap-x-2.5 gap-y-0.5 flex-wrap text-[11px] font-semibold mb-2.5">
          {energyLabel ? (
            <span className="text-asRed-deep">↓ {p.energy} energy</span>
          ) : (
            <span className="text-asGreen-deep">✓ Adds value</span>
          )}
          <span className="text-slateWarm">↩ {p.roi} payback</span>
        </div>

        {/* the locked hero — monthly price */}
        <p className="text-[10px] font-bold uppercase tracking-wide text-slateWarm mb-0.5">
          Your monthly cost
        </p>
        <div className="flex items-center gap-2">
          <span className="value-lock text-2xl font-black text-asDark leading-none">
            {p.cost}
          </span>
          <Lock />
        </div>

        <div className="mt-2.5 flex items-center gap-1 text-asDark text-[13px] font-bold">
          Unlock my price
          <span aria-hidden className="transition group-hover:translate-x-1">→</span>
        </div>
      </div>

      {/* desktop-only flourish: green CTA fades in on hover (bonus, nothing hidden behind it) */}
      <div className="unlock-cue pointer-events-none absolute inset-x-0 bottom-0 hidden lg:flex items-center justify-center p-3 bg-gradient-to-t from-asDark/95 to-transparent">
        <span className="inline-flex items-center gap-1.5 bg-asRed text-white font-bold text-[13px] px-4 py-2 rounded-full shadow-cta">
          <LockOpen />
          Unlock your price
        </span>
      </div>
    </a>
  );
}

function Lock() {
  return (
    <svg className="w-4 h-4 text-slateWarm flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2a5 5 0 00-5 5v3H6a1 1 0 00-1 1v9a1 1 0 001 1h12a1 1 0 001-1v-9a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm3 8H9V7a3 3 0 016 0v3z" />
    </svg>
  );
}

function LockSmall() {
  return (
    <svg className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2a5 5 0 00-5 5v3H6a1 1 0 00-1 1v9a1 1 0 001 1h12a1 1 0 001-1v-9a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm3 8H9V7a3 3 0 016 0v3z" />
    </svg>
  );
}

function LockOpen() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 018 0M6 11h12a1 1 0 011 1v7a1 1 0 01-1 1H6a1 1 0 01-1-1v-7a1 1 0 011-1z" />
    </svg>
  );
}
