"use client";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { Footer } from "@/components/layout/footer";
import { generatePersonalizedWelcomeMessage, PersonalizedWelcomeMessageInput } from '@/ai/flows/personalized-welcome';

export default async function HomePage() {
  let welcomeMessage = "Welcome to Fynorra!";
  try {
    const aiInput: PersonalizedWelcomeMessageInput = {
      userContext: "A business leader or tech enthusiast exploring advanced AI and software development solutions for enterprise growth and innovation.",
    };
    const aiOutput = await generatePersonalizedWelcomeMessage(aiInput);
    welcomeMessage = aiOutput.message;
  } catch (error) {
    console.error("Failed to generate personalized welcome message:", error);
    // Fallback message is already set
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection welcomeMessage={welcomeMessage} />
        <ServicesSection />
        <PricingSection />
        <ComingSoonSection />
      </main>
      <Footer />
    </div>
  );
}
