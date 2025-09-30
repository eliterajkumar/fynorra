
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
export const metadata = {
  title: "AI Consulting & Strategy – Fynorra",
  description:
    "Strategic AI consulting: opportunity discovery, ROI roadmaps, and implementation planning for enterprise AI.",
};

const pageMeta = {
  title: "AI Consulting & Strategy",
  description:
    "Fynorra helps organisations identify high-value AI opportunities, calculate ROI, and build realistic implementation roadmaps focused on measurable business impact.",
  url: "https://www.fynorra.com/services/ai-consulting",
};

const features = [
  "Use-case discovery & prioritization",
  "Feasibility & ROI analysis",
  "Pilot scoping & MVP planning",
  "Technology & vendor selection",
];

const useCases = [
  "Operational automation pilots",
  "Customer support automation",
  "Data-driven product features",
  "Model governance & compliance",
];

const faqs = [
  {
    q: "How long does a consulting engagement take?",
    a: "Discovery workshops usually take 1–2 weeks. A pilot roadmap and cost estimate are typically delivered in 2–4 weeks depending on complexity.",
  },
  {
    q: "Do you only consult or also build?",
    a: "We consult and build — we can deliver the pilot/MVP to reduce handover friction and accelerate time-to-value.",
  },
  {
    q: "What does the first workshop include?",
    a: "We map processes, data readiness, risk & ROI, and produce a prioritized list of 2–3 pilot projects with a 90-day plan.",
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

export default function AIConsultingPage() {
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
              We take a practical, ROI-first approach — not theory. Our team (product, ML engineering, and business)
              runs workshops to find high-impact AI work that can be piloted quickly and scaled securely.
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
                  <Button className="w-full">Book Discovery Workshop</Button>
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Why clients pick Fynorra</h3>
          <ul className="list-disc list-inside mb-4 text-foreground/80">
            <li>Practical, ROI-first approach — we focus on measurable outcomes.</li>
            <li>Cross-functional delivery team: ML, engineering, and product experts.</li>
            <li>Fast pilots: 2–6 week MVPs designed to prove value quickly.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3">FAQs</h3>
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
