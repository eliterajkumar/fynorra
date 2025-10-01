'use client';

import { useState } from 'react';

import { Hero } from '@/components/fynorra/hero';
import { DemoGrid } from '@/components/fynorra/demo-grid';
import { HowItWorks } from '@/components/fynorra/how-it-works';
import { FeaturesGrid } from '@/components/fynorra/features-grid';
import { Pricing } from '@/components/fynorra/pricing';
import { CtaSection } from '@/components/fynorra/cta-section';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InteractiveDemo } from '@/components/fynorra/interactive-demo';

export default function FynorraLandingPage() {
  const [demoId, setDemoId] = useState<string | null>(null);

  const handleTryDemo = (id: string) => {
    setDemoId(id);
  };

  const handleCloseDemo = () => {
    setDemoId(null);
  }

  function startCall(id: string): void {
    setDemoId(id);
  }
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero onTryDemo={() => startCall("incoming")} />

        
        <section id="demos" className="py-12 md:py-24">
          <DemoGrid onTryDemo={handleTryDemo} />
        </section>

        <section id="how-it-works" className="py-12 md:py-24 bg-card/50">
          <HowItWorks />
        </section>

        <section id="features" className="py-12 md:py-24">
          <FeaturesGrid />
        </section>
        
        <section id="pricing" className="py-12 md:py-24 bg-card/50">
          <Pricing />
        </section>
        
        <CtaSection />
      </main>
      <Footer />
      <InteractiveDemo 
        open={!!demoId} 
        onOpenChange={(open) => !open && handleCloseDemo()}
        demoId={demoId} 
      />
    </div>  
  );
}
