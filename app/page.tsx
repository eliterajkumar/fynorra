import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Footer } from "@/components/layout/footer";
export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <FAQSection />
        <ComingSoonSection />
      </main>
      <Footer />
    </div>
  );
}
