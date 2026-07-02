import Header from "@/components/Header";
import HeroUnlock from "@/components/HeroUnlock";
import TrustStrip from "@/components/TrustStrip";
import LockedRoadmap from "@/components/LockedRoadmap";
import WhatsInside from "@/components/WhatsInside";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ExitIntentModal from "@/components/ExitIntentModal";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroUnlock />
        <TrustStrip />
        <LockedRoadmap />
        <WhatsInside />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      <ExitIntentModal />
    </>
  );
}
