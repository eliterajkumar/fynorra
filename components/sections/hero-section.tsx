"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedWelcomeText } from "@/components/common/animation"; // <-- Import

export function HeroSection() {
  const heroWelcomeText = "AI is the defining technology of our time. It's not just about algorithms, it's about augmenting human capability.";

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-24 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="gradient-wave w-full h-full"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a]/10 via-[#172133]/50 to-[#1e293b]"></div>

      <div className="relative z-10 w-full">
        {/* ✨ Typing Effect Text */}
        <AnimatedWelcomeText text={heroWelcomeText} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mt-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-50 mt-4">
              Train Custom AI Models.
              <br />
              <span className="block sm:inline-block">Deploy Enterprise Solutions.</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-lg sm:text-xl text-slate-300">
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
      </div>

      {/* Blur Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sky-900/10 via-transparent to-transparent pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 left-1/4 right-1/4 h-20 bg-sky-700/10 blur-3xl pointer-events-none opacity-30"></div>
    </section>
  );
}
