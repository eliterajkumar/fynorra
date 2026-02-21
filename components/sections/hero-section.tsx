"use client";

import React, { useMemo, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ---------- Decorative Shape ---------- */
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
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 1.8, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
      className={cn("absolute pointer-events-none", className)}
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 12 + delay, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/[0.06]"
          )}
        />
      </motion.div>
    </motion.div>
  );
});

/* ---------- Hero Section ---------- */
function HeroSection() {
  const reduceMotion = useReducedMotion();

  const fadeUpVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 28 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.85,
          delay: 0.3 + i * 0.15,
          ease: [0.25, 0.4, 0.25, 1],
        },
      }),
    }),
    []
  );

  /* ---------- STRONG BRAND ENTITY JSON-LD ---------- */
  useEffect(() => {
    const id = "fynorra-brand-entity";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Fynorra AI Solutions Pvt Ltd",
      alternateName: [
        "Fynorra",
        "Fynorra AI",
        "Fynorra AI Solutions",
        "Fynorra AI Solutions Private Limited"
      ],
      url: "https://www.fynorra.com",
      description:
        "Fynorra AI Solutions Pvt Ltd is an Indian company that builds WhatsApp AI agents for business automation, lead capture, and customer engagement.",
      areaServed: "IN",
      sameAs: [
        "https://www.linkedin.com/company/fynorra-ai"
      ]
    });
    document.head.appendChild(script);
  }, []);

  return (
    <section
      className="relative min-h-screen pt-28 lg:pt-32 w-full overflow-hidden bg-[#030303]"
      aria-label="Fynorra AI Solutions Pvt Ltd – WhatsApp AI Agent for Indian Businesses"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Floating shapes */}
      {!reduceMotion && (
        <>
          <ElegantShape
            delay={0.3}
            width={620}
            height={150}
            rotate={12}
            gradient="from-indigo-500/[0.12]"
            className="left-[-10%] top-[18%]"
          />
          <ElegantShape
            delay={0.6}
            width={500}
            height={130}
            rotate={-14}
            gradient="from-rose-500/[0.12]"
            className="right-[-8%] top-[72%]"
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}
        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* SEO-SAFE H1 */}
          <h1 className="font-semibold tracking-tight mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/90 text-[clamp(2rem,4.5vw,3.2rem)] leading-tight">
              Fynorra AI Solutions – WhatsApp AI Agent for Indian Businesses
            </span>
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-400 text-base sm:text-lg">
              Turn Your WhatsApp Into a 24/7 Salesman
            </span>
          </h1>

          {/* SEO-rich but natural paragraph */}
          <p className="text-white/65 text-lg leading-relaxed mb-6 max-w-xl">
            Fynorra AI Solutions Pvt Ltd builds WhatsApp AI agents for Indian businesses.
            Our WhatsApp AI agent works as a 24/7 AI sales assistant, answers customer
            queries instantly, captures leads automatically, and integrates with
            Google Sheets — ideal for MSMEs, showrooms, and service businesses in India.
          </p>

          <ul className="text-white/70 space-y-2 mb-8">
            <li>✔ WhatsApp AI agent with human-like conversations</li>
            <li>✔ WhatsApp automation & lead capture for MSMEs</li>
            <li>✔ Hindi + English WhatsApp chatbot support</li>
            <li>✔ Built for Indian businesses & local brands</li>
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href="https://wa.me/919521297788?text=Hi%20Fynorra%2C%20I%20want%20to%20see%20a%20demo%20of%20your%20WhatsApp%20AI%20Agent."
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-500 transition"
            >
              📲 Get WhatsApp AI Demo
            </a>

            <a
              href="tel:+919352922959"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.1] text-white hover:bg-white/[0.05] transition"
            >
              📞 Talk to Expert
            </a>
          </div>

          <p className="text-xs text-white/40 mt-4">
            Live WhatsApp AI conversations • Data blurred • Real Indian businesses
          </p>

          {/* Brand disambiguation (SAFE) */}
          <p className="sr-only">
            Fynorra, Fynorra AI, Fynorra AI Solutions, Fynorra AI Solutions Pvt Ltd,
            WhatsApp AI Agent India, WhatsApp chatbot for business, WhatsApp automation India
          </p>
        </motion.div>

        {/* RIGHT – VIDEO */}
        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center lg:justify-end"
        >
          <div className="mx-auto max-w-[300px] sm:max-w-[360px] lg:max-w-[420px]">
            <div className="relative rounded-2xl overflow-hidden border border-green-500/30 shadow-2xl">
              <video
                src="/whatsapp ai demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full aspect-[9/16] object-cover"
              />
            </div>

            <p className="text-center text-xs text-white/40 mt-3">
              Live WhatsApp AI agent demo for Indian businesses
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </section>
  );
}

export { HeroSection };