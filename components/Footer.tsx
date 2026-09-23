import { BRAND } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="bg-asDark-deep text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-10 md:gap-8">
          {/* brand */}
          <div className="max-w-md">
            <img src="/images/galloway-logo.png" alt={BRAND.partnerName} className="h-32 w-auto mb-5" />
            <p className="text-sm leading-relaxed text-white/60">
              {BRAND.partnerName} builds a personalized Smart Savings Plan for
              your home — the monthly cost and savings on the upgrades your home
              is ready for, all in one place.
            </p>
          </div>

          {/* cta */}
          <div className="flex flex-col md:items-end gap-5">
            <a href="#unlock" className="inline-flex items-center gap-2 bg-asRed hover:bg-asRed-deep text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-cta hover:-translate-y-0.5 self-start md:self-end">
              Unlock My Plan
              <span aria-hidden>→</span>
            </a>
            <a href="https://homebridge.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-asRed-bright hover:text-white transition">
              Powered by Homebridge.ai
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-white/45">
          <p>
            © {new Date().getFullYear()} Galloway Roofing. All rights
            reserved.
          </p>
          <p className="leading-relaxed max-w-2xl">
            Savings ranges are estimates and vary by home, product, and
            installer. Viewing your plan involves no credit check and carries no
            obligation.
          </p>
        </div>
      </div>
    </footer>
  );
}
