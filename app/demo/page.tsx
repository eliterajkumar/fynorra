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
import { CallDemo } from '@/components/fynorra/call-demo';
import { Phone } from 'lucide-react';
export default function FynorraLandingPage() {
  const [demoId, setDemoId] = useState<string | null>(null);

  const handleTryDemo = (id: string) => {
    setDemoId(id);
  };
const [isCallDemoOpen, setIsCallDemoOpen] = useState(false);
  const handleCloseDemo = () => {
    setDemoId(null);
  }

  const startCall = (type: string) => {
    console.log(`Starting ${type} call...`);
    setIsCallDemoOpen(true);
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
            <CallDemo 
        open={isCallDemoOpen}
        onOpenChange={setIsCallDemoOpen}
      />
      <button
        onClick={() => startCall("incoming")}
        className="fixed right-6 bottom-24 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold hover:scale-105 transition-transform"
        title="Start Live Call Demo with Fynorra AI"
      >
        <Phone className="w-5 h-5" />
        Call Demo
      </button>
    </div>  
  );
}
