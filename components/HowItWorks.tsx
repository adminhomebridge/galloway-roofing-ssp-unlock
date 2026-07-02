"use client";

import Reveal from "./Reveal";
import UnlockForm from "./UnlockForm";

const STEPS = [
  {
    n: "1",
    title: "Enter your address",
    body: "Enter your home address — that's all we need to pull up the plan already built for your home.",
    img: "/images/step-confirm.jpg",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4-4.6 7-8.3 7-11a7 7 0 10-14 0c0 2.7 3 6.4 7 11z" />
        <circle cx="12" cy="10" r="2.4" />
      </>
    ),
  },
  {
    n: "2",
    title: "We match your plan",
    body: "Your Smart Savings Plan pulls up instantly — already scored across all 16 upgrades for your specific property.",
    img: "/images/step-match.jpg",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z" />
    ),
  },
  {
    n: "3",
    title: "Unlock your numbers",
    body: "Every monthly cost and saving is revealed, ranked by best return — connect with A+ rated local pros when you're ready.",
    img: "/images/step-unlock.jpg",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 018 0M6 11h12a1 1 0 011 1v7a1 1 0 01-1 1H6a1 1 0 01-1-1v-7a1 1 0 011-1z" />
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-asDark-deep via-asDark-deep to-black text-white">
      <div className="absolute inset-0 bg-grain opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-asRed/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-asRed-bright uppercase tracking-wider mb-3">
              How unlocking works
            </p>
            <h2 className="text-3xl lg:text-5xl font-black leading-tight text-balance">
              From your address to your numbers in{" "}
              <span className="highlight-red text-white">10 seconds.</span>
            </h2>
          </div>
        </Reveal>

        {/* step cards with imagery */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
          {STEPS.map((step, idx) => (
            <Reveal key={step.n} delay={idx * 110}>
              <div className="relative bg-asRed/10 border border-asRed/30 rounded-2xl overflow-hidden h-full">
                <div className="relative h-40">
                  <img src={step.img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-asDark via-asDark/45 to-asDark/15" />
                </div>

                {/* floating node */}
                <div className="relative -mt-7 flex justify-center">
                  <div className="relative w-14 h-14 rounded-full bg-asRed text-white flex items-center justify-center shadow-cta ring-4 ring-asDark">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      {step.icon}
                    </svg>
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white text-asDark text-xs font-black flex items-center justify-center ring-2 ring-asDark">
                      {step.n}
                    </span>
                  </div>
                </div>

                <div className="px-6 pb-7 pt-3 text-center">
                  <h3 className="text-lg font-black text-white mb-2">{step.title}</h3>
                  <p className="text-white/65 leading-relaxed text-sm">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* embedded form */}
        <Reveal>
          <div
            id="how-unlock"
            className="relative overflow-hidden mt-12 bg-gradient-to-br from-asDark-mid to-asDark-deep border border-white/10 rounded-3xl p-7 lg:p-10 shadow-deep scroll-mt-24"
          >
            <div className="absolute -top-20 -left-16 w-72 h-72 bg-asRed/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-black leading-tight mb-3 text-balance">
                  Enter your address and your{" "}
                  <span className="text-asRed-bright">plan opens.</span>
                </h3>
                <p className="text-white/70 leading-relaxed">
                  We already did the work for your home. Enter the address your
                  plan was built for — free to use, no obligation.
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
