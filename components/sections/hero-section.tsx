"use client";

import React, { useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ElegantShapeProps = {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
};

const ElegantShape = React.memo(function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: ElegantShapeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -120, rotate: rotate - 12 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{ duration: 1.8, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
      className={cn("absolute pointer-events-none will-change-transform", className)}
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 10 + delay, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/[0.06]",
            "shadow-[0_12px_40px_0_rgba(255,255,255,0.04)]",
            "after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
});

function HeroSection({
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const reduceMotion = useReducedMotion();

  const fadeUpVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, delay: 0.4 + i * 0.16, ease: [0.25, 0.4, 0.25, 1] },
      }),
    }),
    []
  );

  return (
    <section
      role="region"
      aria-label="Hero — Fynorra: AI-first web & automation"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]"
    >
      {/* decorative gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-rose-500/[0.04] blur-3xl pointer-events-none" />

      {/* decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {!reduceMotion && (
          <>
            <ElegantShape
              delay={0.28}
              width={600}
              height={140}
              rotate={12}
              gradient="from-indigo-500/[0.12]"
              className="left-[-12%] md:left-[-6%] top-[12%] md:top-[18%]"
            />
            <ElegantShape
              delay={0.5}
              width={500}
              height={120}
              rotate={-15}
              gradient="from-rose-500/[0.12]"
              className="right-[-6%] md:right-[0%] top-[68%] md:top-[74%]"
            />
            <ElegantShape
              delay={0.42}
              width={300}
              height={80}
              rotate={-8}
              gradient="from-violet-500/[0.12]"
              className="left-[5%] md:left-[10%] bottom-[6%] md:bottom-[10%]"
            />
            <ElegantShape
              delay={0.62}
              width={200}
              height={60}
              rotate={20}
              gradient="from-amber-500/[0.12]"
              className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
            />
            <ElegantShape
              delay={0.7}
              width={150}
              height={40}
              rotate={-25}
              gradient="from-cyan-500/[0.12]"
              className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
            />
          </>
        )}
      </div>

      {/* content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="font-bold mb-4 md:mb-6 tracking-tight" style={{ lineHeight: 1.02 }}>
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.85))",
                  fontSize: "clamp(2.4rem, 6.5vw, 4.8rem)",
                }}
              >
                Elevate Your Digital Vision
              </span>
              <span
                className="block bg-clip-text text-transparent mt-2"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#38bdf8 0%, #fff 45%, #f472b6 100%)",
                  fontSize: "clamp(1.4rem, 3.5vw, 1.4rem)",
                }}
              >
                AI Solutions • Custom Software • Scalable Automation
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-white/50 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              We help businesses scale smarter with{" "}
              <span className="text-white">From Advance AI Assistants</span>,{" "}
              <span className="text-white">automation to custom software</span>, and{" "}
              <span className="text-white">and IT consulting  Fynorra delivers smart</span>. scalable solutions that are simple{" "}
              <span className="text-white">powerful, and reliable.</span>.
            </p>

            {/* CTA row */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:opacity-95 transition"
              >
                Try Live Demo
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.06] text-white/90 hover:bg-white/[0.02] transition"
              >
                Get Quote
              </a>
            </div>

            {/* microcopy */}
            
          </motion.div>
        </div>
      </div>

      {/* bottom overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </section>
  );
}

export { HeroSection };
