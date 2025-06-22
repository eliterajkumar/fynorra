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
              Train Custom AI Models.
              <br />
              <span className="block sm:inline-block">Deploy Enterprise Solutions.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300">
              From intelligent chatbots to full-scale automation, experience our AI engine in action.
              Watch how it chats from your PDF in real time.
            </p>

            {/* 🎬 Demo Video Embed */}
            <div className="mt-10">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-w-3xl mx-auto rounded-2xl shadow-xl ring-1 ring-sky-600/20"
              >
                <source src="/fynorra-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
                  Talk to Us
                </Button>
              </Link>
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
