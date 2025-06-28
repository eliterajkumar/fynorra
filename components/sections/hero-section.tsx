"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedWelcomeText } from "@/components/common/animation";
import Link from "next/link";

export function HeroSection() {
  const heroWelcomeText =
    "AI is the defining technology of our time. It's not just about algorithms, it's about augmenting human capability.";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-24 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="gradient-wave w-full h-full"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a]/10 via-[#172133]/50 to-[#1e293b]"></div>

      <div className="relative z-10 w-full">
        {/* ✨ Typing Effect Text */}
        <AnimatedWelcomeText text={heroWelcomeText} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto mt-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-50 mt-4">
              Custom AI Solutions & Chatbots
              <br />
              <span className="block sm:inline-block">for Enterprise Growth</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300">
              Transform your business with tailored AI chatbots, custom LLMs, and intelligent automation. 
              From customer service to predictive analytics, we build AI solutions that drive real results.
            </p>

            {/* Key Benefits */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                24/7 Customer Support
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Custom AI Models
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Enterprise Integration
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Scalable Solutions
              </span>
            </div>

            {/* 🎬 Demo Video Embed */}
            <div className="mt-10">
              <div className="relative w-full max-w-3xl mx-auto rounded-2xl shadow-xl ring-1 ring-sky-600/20 overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full"
                  poster="/placeholder.jpg"
                  preload="metadata"
                >
                  <source src="/fynorra-demo.mp4" type="video/mp4" />
                  <source src="/fynorra-demo.webm" type="video/webm" />
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-2">AI Chatbot Demo</p>
                      <p className="text-sm">Watch our custom AI chatbot in action</p>
                      <Link href="/chat" className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                        Try Live Demo
                      </Link>
                    </div>
                  </div>
                </video>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/chat">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 group">
                  Try Live Demo{" "}
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 py-6 group"
                >
                  Get Custom Quote
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400 mb-4">Trusted by businesses worldwide</p>
              <div className="flex justify-center items-center gap-6 opacity-60">
                <span className="text-xs text-slate-500">✓ Enterprise Security</span>
                <span className="text-xs text-slate-500">✓ 99.9% Uptime</span>
                <span className="text-xs text-slate-500">✓ 24/7 Support</span>
              </div>
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
