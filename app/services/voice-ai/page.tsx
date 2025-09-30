
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
export const metadata = {
  title: "Voice & Speech AI – Fynorra",
  description: "Speech-to-text, text-to-speech, voice cloning & branded voice assistants from Fynorra AI Solutions.",
};

const pageMeta = {
  title: "Voice & Speech AI",
  description:
    "High-accuracy STT, expressive TTS, voice cloning and conversational voice agents for call centers, products and media.",
  url: "https://www.fynorra.com/services/voice-ai",
};

const features = [
  "High-accuracy Speech-to-Text (STT)",
  "Natural Text-to-Speech (TTS) voices",
  "Voice cloning & custom brand voices",
  "IVR, AI call managers & conversational agents",
  "Multilingual support & accent tuning",
];

const useCases = [
  "Call center automation & analytics",
  "Podcast narration & voiceovers",
  "Branded voice assistants & IVR",
  "Accessibility & voice-enabled apps",
];

const faqs = [
  {
    q: "How long to clone a voice?",
    a: "We can produce a high-quality cloned voice in hours with a few minutes of clean audio; premium tuning improves realism.",
  },
  {
    q: "Which languages do you support?",
    a: "We support major world languages and can add additional languages or accents on request through targeted training.",
  },
  {
    q: "Can voice models run locally?",
    a: "Yes — we offer on-prem and hybrid deployments for privacy-sensitive or low-latency applications.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: pageMeta.title,
  description: pageMeta.description,
  url: pageMeta.url,
  provider: {
    "@type": "Organization",
    name: "Fynorra AI Solutions Pvt Ltd",
    url: "https://www.fynorra.com",
  },
};

export default function VoiceAIPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
    <main className="py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold">{pageMeta.title}</h1>
          <p className="mt-3 text-lg text-foreground/80">{pageMeta.description}</p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">What we deliver</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4">
              We build production-ready voice systems: high-fidelity STT for accurate transcripts, expressive TTS for
              natural-sounding voices, and voice cloning for brand identity. Deployable as cloud, hybrid or on-prem.
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Key features</h4>
              <ul className="flex flex-wrap gap-2">
                {features.map((f) => (
                  <li key={f} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Perfect for</h4>
              <ul className="flex flex-wrap gap-2">
                {useCases.map((u) => (
                  <li key={u} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full">
                    {u}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <Link href="/contact">
                <a>
                  <Button className="w-full">Request a Demo</Button>
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">FAQs</h3>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="p-4 bg-surface rounded-md">
                <div className="font-medium">{f.q}</div>
                <div className="text-sm text-foreground/70 mt-1">{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-8">
          <Link href="/services">
            <a className="inline-flex items-center gap-2 text-sm underline">← Back to Services</a>
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </div>
  );
}
