import { BRAND } from "@/lib/brand";

const MAIN_SITE = "https://gallowayroofing.com/";

const SITE_LINKS = [
  { name: "About Us", href: "https://gallowayroofing.com/about-us/" },
  { name: "Gallery", href: "https://gallowayroofing.com/gallery/" },
  { name: "Testimonials", href: "https://gallowayroofing.com/testimonials/" },
  { name: "FAQs", href: "https://gallowayroofing.com/faqs/" },
];

export default function Footer() {
  return (
    <footer className="bg-asDark-deep text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-10 md:gap-8">
          {/* brand */}
          <div className="max-w-md">
            <img src="/images/galloway-logo.png" alt={BRAND.partnerName} className="h-16 w-auto mb-5" />
            <p className="text-sm leading-relaxed text-white/60 mb-5">
              {BRAND.partnerName} builds a personalized Smart Savings Plan for
              your home — the monthly cost and savings on the upgrades your home
              is ready for, all in one place.
            </p>
            <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-asRed-bright hover:text-white transition">
              Visit gallowayroofing.com
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* cta + links */}
          <div className="flex flex-col md:items-end gap-6">
            <a href="#unlock" className="inline-flex items-center gap-2 bg-asRed hover:bg-asRed-deep text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-cta hover:-translate-y-0.5 self-start md:self-end">
              Unlock My Plan
              <span aria-hidden>→</span>
            </a>

            <div className="md:text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                Explore Galloway Roofing
              </p>
              <nav className="flex flex-col md:items-end gap-2">
                {SITE_LINKS.map((l) => (
                  <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/65 hover:text-white transition">
                    {l.name}
                  </a>
                ))}
              </nav>
            </div>
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
