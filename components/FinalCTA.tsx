"use client";

import Reveal from "./Reveal";
import UnlockForm from "./UnlockForm";

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="bg-gradient-to-br from-asDark via-asDark-soft to-asDark-deep rounded-3xl p-10 lg:p-14 relative overflow-hidden shadow-deep">
            <div className="absolute inset-0 bg-grain opacity-30" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-asRed/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-asRed/10 rounded-full blur-3xl" />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-4 text-balance">
                Your plan is one email away from{" "}
                <span className="highlight-red text-white">unlocked.</span>
              </h2>
              <p className="text-lg text-white/80 mb-8">
                We already did the work for your home. Confirm your email and
                open your Smart Savings Plan.
              </p>

              <div className="bg-asDark-deep/60 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-left">
                <UnlockForm variant="onDark" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
