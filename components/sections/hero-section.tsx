"use client";

import React, { useEffect, useMemo } from "react";
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
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 10 + delay, repeat: Infinity, ease: "easeInOut" }}
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
      hidden: { opacity: 0, y: 30 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.9,
          delay: 0.4 + i * 0.15,
          ease: [0.25, 0.4, 0.25, 1],
        },
      }),
    }),
    []
  );

  /* ---------- BRAND + SERVICE JSON-LD ---------- */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Fynorra AI Solutions Pvt Ltd",
        "alternateName": [
          "Fynorra",
          "Fynorra AI",
          "Fynorra AI Solutions",
          "Finorra",
          "Fynora"
        ],
        "url": "https://www.fynorra.com",
        "areaServed": "India",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-9521297788",
            "contactType": "WhatsApp Sales"
          },
          {
            "@type": "ContactPoint",
            "telephone": "+91-9352922959",
            "contactType": "Call Sales"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "WhatsApp AI Agent for Indian Businesses",
        "serviceType": [
          "WhatsApp AI Agent",
          "AI Sales Automation",
          "AI Lead Capture"
        ],
        "areaServed": "India"
      }
    ]
  };

  useEffect(() => {
    const id = "fynorra-jsonld-hero";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section
      aria-label="Fynorra AI Solutions – WhatsApp AI Agents for Indian Businesses"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-rose-500/[0.04] blur-3xl" />

      {/* Floating shapes */}
      {!reduceMotion && (
        <>
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-indigo-500/[0.12]"
            className="left-[-10%] top-[15%]"
          />
          <ElegantShape
            delay={0.5}
            width={480}
            height={120}
            rotate={-14}
            gradient="from-rose-500/[0.12]"
            className="right-[-5%] top-[70%]"
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
          <h1 className="font-bold tracking-tight mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/90 text-[clamp(2.2rem,6vw,4rem)]">
              Fynorra AI Solutions
            </span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-400 text-[clamp(1.1rem,3vw,1.2rem)]">
              WhatsApp AI Agents & Automation for Indian Businesses
            </span>
          </h1>
        </motion.div>

        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
          <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Fynorra builds WhatsApp AI Agents for Indian MSMEs.
            Our AI chats like a human salesman, captures leads,
            qualifies customers, stores data in Google Sheets,
            and works 24/7 — perfect for showrooms, clothing brands,
            interior designers, and local businesses.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Direct WhatsApp Redirect */}
            <a
              href="https://wa.me/919521297788?text=Hi%20Fynorra%2C%20I%20want%20to%20know%20more%20about%20your%20WhatsApp%20AI%20Agent%20for%20my%20business."
              aria-label="Chat on WhatsApp with Fynorra"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-500 transition"
            >
              📲 Chat on WhatsApp
            </a>

            {/* Call Button */}
            <a
              href="tel:+919352922959"
              aria-label="Call Fynorra sales team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.08] text-white hover:bg-white/[0.04] transition"
            >
              📞 Call Now
            </a>
          </div>

          <p className="text-xs text-white/40 mt-4">
            Trusted by Indian MSMEs • Showrooms • Clothing & Interior Businesses
          </p>

          {/* Hidden brand + typo keywords */}
          <p className="sr-only">
            Fynorra, Finorra, Fynora,
            Fynorra AI, Fynorra AI Solutions,
            Fynorra WhatsApp AI Agent,
            Fynorra AI Automation Company India
          </p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </section>
  );
}

export { HeroSection };