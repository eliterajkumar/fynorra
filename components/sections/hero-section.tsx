
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedWelcomeText } from "@/components/common/animated-welcome-text";

export function HeroSection() {
  // Updated sample text as per the new request
  const heroWelcomeText = "Welcome to Fynorra! As a business leader or tech enthusiast, we know you're driven by innovation. Explore our AI and software development solutions to unlock exponential growth for your enterprise";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* Existing gradient wave overlay - opacity might need adjustment if base bg is too dark or too similar */}
      <div className="absolute inset-0 z-0 opacity-20"> {/* Reduced opacity for subtlety on new dark bg */}
        <div className="gradient-wave w-full h-full"></div>
      </div>
      {/* Existing overlay gradient from transparent to new background, or remove if new bg is sufficient */}
      {/* This gradient used to be from-background/10, if #0f172a is too dark, this might be too subtle or unnecessary */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a]/10 via-[#172133]/50 to-[#1e293b]"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <AnimatedWelcomeText text={heroWelcomeText} className="mb-6 md:mb-8" />
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-50 mt-4"> {/* text-foreground changed to text-slate-50 for better contrast on dark blue */}
            Train Custom AI Models.
            <br />
            <span className="block sm:inline-block">Deploy Enterprise Solutions.</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-lg sm:text-xl text-slate-300"> {/* text-foreground/80 changed to text-slate-300 */}
            From intelligent chatbots to full-scale automation, we help businesses build the future with AI.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 group">
              Get Started <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base px-8 py-6 group">
              Join the Waitlist
            </Button>
          </div>
        </div>
      </div>
       {/* Subtle lighting effect at the bottom - colors might need to tie into new theme */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sky-900/10 via-transparent to-transparent pointer-events-none opacity-50"></div> {/* Changed accent/5 to sky-900/10 */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-20 bg-sky-700/10 blur-3xl pointer-events-none opacity-30"></div> {/* Changed primary/10 to sky-700/10 */}
    </section>
  );
}

