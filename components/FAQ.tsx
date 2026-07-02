"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import UnlockForm from "./UnlockForm";

const FAQS = [
  {
    q: "Why do I already have a plan?",
    a: "We matched your home to the upgrades it's ready for and scored each one for cost and savings ahead of time. Entering your address simply opens the plan we've already built for your home.",
  },
  {
    q: "Why do you need my address?",
    a: "Your plan is tied to your home, so your address is how we pull up the right plan before showing your personalized numbers. We don't ask for a credit card, and we never sell your information.",
  },
  {
    q: "Will this affect my credit?",
    a: "No. Opening your Smart Savings Plan is just a look at upgrade costs and savings for your home. There's no credit check involved in viewing your plan.",
  },
  {
    q: "What's actually in the plan?",
    a: "Monthly cost and estimated savings for all 16 upgrades across roofing, HVAC, windows, bath, water, and more — ranked by the best return for your specific home, plus the option to connect with A+ rated local pros.",
  },
  {
    q: "Does it cost anything?",
    a: "No. Your Smart Savings Plan is free to view and there's no obligation. You only move forward on the upgrades you choose, if and when you're ready.",
  },
  {
    q: "Can I finance the upgrades?",
    a: "Yes — financing is available to turn a project into a manageable monthly payment instead of one large cost. Your plan shows you the numbers, and you decide if and how you'd like to move forward.",
  },
  {
    q: "What if my address isn't found?",
    a: "Try the exact address we contacted you at. If it still doesn't match, you can build a fresh plan from scratch in about 30 seconds — it's the same plan, just generated live.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          {/* left rail */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold text-asRed-deep uppercase tracking-wider mb-3">
                Common questions
              </p>
              <h2 className="text-3xl lg:text-5xl font-black text-asDark leading-tight mb-4 text-balance">
                Before you <span className="highlight-red">unlock.</span>
              </h2>
              <p className="text-slateWarm leading-relaxed mb-8 max-w-sm">
                A few things people ask before they enter their address. Short
                version: it&apos;s your plan, it&apos;s free, and it&apos;s ready.
              </p>

              {/* nudge card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-asDark via-asDark-mid to-asDark-deep rounded-2xl p-6 text-white shadow-deep">
                <div className="absolute -bottom-12 -right-10 w-44 h-44 bg-asRed/20 rounded-full blur-3xl pointer-events-none" />
                <div className="relative">
                  <span className="inline-flex items-center justify-center bg-white rounded-xl px-3 py-2 mb-4 shadow-sm"><img src="/images/galloway-logo.png" alt="Galloway Roofing" className="h-7 w-auto object-contain" /></span>
                  <p className="font-black text-lg leading-snug mb-1">
                    Still have a question?
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">
                    The fastest answer is your plan itself — it takes about 10
                    seconds to open.
                  </p>
                  <a
                    href="#faq-unlock"
                    className="inline-flex items-center gap-2 bg-asRed hover:bg-asRed-deep text-white font-bold px-5 py-3 rounded-xl text-sm transition shadow-cta hover:-translate-y-0.5"
                  >
                    Unlock my plan
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* accordions */}
          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = open === idx;
              return (
                <Reveal key={faq.q} delay={idx * 45}>
                  <div
                    className={`rounded-2xl overflow-hidden transition-all duration-200 ${
                      isOpen
                        ? "bg-white shadow-deep ring-2 ring-asRed/30"
                        : "bg-white shadow-card ring-1 ring-asDark/5 hover:ring-asDark/15"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-asDark">{faq.q}</span>
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-lg transition-all duration-200 ${
                          isOpen
                            ? "bg-asRed text-white rotate-45"
                            : "bg-asDark/[0.06] text-asDark"
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-200 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 text-slateWarm leading-relaxed text-sm">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* closing form band — final conversion moment before the footer */}
        <Reveal>
          <div
            id="faq-unlock"
            className="relative overflow-hidden mt-16 lg:mt-20 bg-gradient-to-br from-asDark via-asDark-mid to-asDark-deep rounded-3xl p-8 lg:p-14 text-center text-white shadow-deep scroll-mt-24"
          >
            <div className="absolute -top-20 -left-16 w-72 h-72 bg-asRed/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-asRed/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative max-w-xl mx-auto">
              <p className="text-sm font-bold text-asRed uppercase tracking-wider mb-3">
                Ready when you are
              </p>
              <h2 className="text-3xl lg:text-4xl font-black leading-tight mb-3 text-balance">
                Your numbers are waiting.{" "}
                <span className="highlight-red text-white">Open your plan.</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-7">
                Enter the address your plan was built for and every price unlocks
                instantly.
              </p>
              <UnlockForm variant="onDark" />
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-white/55">
                <span>16 upgrades scored</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>About 10 seconds</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>100% free to use</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
