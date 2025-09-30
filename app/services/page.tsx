"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Zap, Code2, CloudCog, Speaker, ImageIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  useCases: string[];
  link: string;
}

const services: Service[] = [
  {
    id: "ai-consulting",
    icon: Bot,
    title: "AI Consulting & Strategy",
    description:
      "AI adoption roadmaps, feasibility & ROI analysis, and pilot planning to identify high-impact AI use cases.",
    features: ["Use-case discovery", "ROI analysis", "Pilot scoping", "Vendor selection"],
    useCases: ["Enterprise transformation", "Pilot & MVP planning", "Vendor selection"],
    link: "/services/ai-consulting"
  },
  {
    id: "llm-nlp",
    icon: Code2,
    title: "Custom LLM & NLP Solutions",
    description:
      "Fine-tune and deploy LLMs (LLaMA, Mistral, Falcon) and build NLP pipelines for domain-specific performance.",
    features: ["Fine-tuning (LoRA/QLoRA)", "Data curation", "Instruction tuning", "API deployment"],
    useCases: ["Legal summarization", "Medical QA", "Support automation", "Content moderation"],
    link: "/services/llm-nlp"
  },
  {
    id: "rag-chatbots",
    icon: Bot,
    title: "RAG Chatbots",
    description:
      "Retrieval-Augmented Generation chatbots that connect to your documents, databases and knowledge bases for accurate answers.",
    features: ["Embeddings + Vector DB", "Hybrid semantic search", "Context windows", "Analytics"],
    useCases: ["Customer support", "Internal knowledge base", "Sales enablement", "Legal Q&A"],
    link: "/services/rag-chatbots"
  },
  {
    id: "voice-ai",
    icon: Speaker,
    title: "Voice & Speech AI",
    description:
      "Speech-to-Text, Text-to-Speech, voice cloning and branded voice assistants for immersive voice experiences.",
    features: ["STT", "TTS", "Voice cloning", "IVR & call managers"],
    useCases: ["Call centers", "Podcasts & narration", "Accessibility", "Voice assistants"],
    link: "/services/voice-ai"
  },
  {
    id: "generative-ai",
    icon: ImageIcon,
    title: "Generative AI Media",
    description:
      "AI-powered image, avatar and video generation for social media, advertising and scalable creative production.",
    features: ["Text → Image", "Avatar generation", "Video synthesis", "Style transfer"],
    useCases: ["YouTube automation", "Ad creatives", "Social content at scale", "Brand avatars"],
    link: "/services/generative-ai"
  },
  {
    id: "machine-learning",
    icon: Code2,
    title: "Machine Learning & Analytics",
    description:
      "Predictive models, anomaly detection and recommendation systems to turn data into actionable intelligence.",
    features: ["Forecasting", "Anomaly detection", "Recommendation engines", "BI dashboards"],
    useCases: ["Inventory forecasting", "Fraud detection", "Churn prediction", "Personalization"],
    link: "/services/machine-learning"
  },
  {
    id: "content-automation",
    icon: Zap,
    title: "Content & Social Media Automation",
    description:
      "Automate content pipelines for YouTube and social: script → voice → video → publish, plus cross-posting and analytics.",
    features: ["Script generation", "Auto-editing", "Scheduling", "Analytics & optimization"],
    useCases: ["Creator automation", "Agency workflows", "Marketing campaigns"],
    link: "/services/generative-ai" // you can change to dedicated page if created
  },
  {
    id: "ai-safety",
    icon: Bot,
    title: "AI Safety, Ethics & Auditing",
    description:
      "Explainability, bias detection, and compliance audits to ensure safe and trustworthy AI deployments.",
    features: ["Bias & fairness checks", "Explainable AI", "Compliance reporting", "Audit trails"],
    useCases: ["Regulated industries", "Model governance", "Third-party audits"],
    link: "/services/ai-safety" // create this page later or point to /contact
  },
  {
    id: "cloud-aiops",
    icon: CloudCog,
    title: "Cloud & AI Ops",
    description:
      "Model hosting, scaling, monitoring, drift detection and auto-retraining pipelines. Hybrid cloud & on-prem options.",
    features: ["Managed hosting", "Monitoring & logging", "Retraining pipelines", "Hybrid deployment"],
    useCases: ["Production ML systems", "Scalable inference", "Secure on-prem deployments"],
    link: "/services/cloud-devops"
  },
];

export function ServicesSection() {
  // Client-side JSON-LD injection as fallback when server-side isn't available.
  useEffect(() => {
    const id = "fynorra-services-jsonld-client";
    if (document.getElementById(id)) return;

    const serviceItems = services.map((s) => ({
      "@type": "Service",
      "serviceType": s.title,
      "name": s.title,
      "description": s.description,
      "provider": {
        "@type": "Organization",
        "name": "Fynorra AI Solutions Pvt Ltd",
        "url": "https://www.fynorra.com"
      },
      "areaServed": ["IN", "US", "GLOBAL"],
      "url": `https://www.fynorra.com${s.link}`
    }));

    const catalog = {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Fynorra Services",
      "url": "https://www.fynorra.com/services",
      "itemListElement": serviceItems.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": item
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify(catalog);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-background" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Fynorra — Enterprise AI & Software Solutions
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Comprehensive AI and IT solutions by Fynorra, designed to transform operations, enhance experiences, and drive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" role="list">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                id={service.id}
                role="listitem"
                className="group bg-card/50 hover:bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col rounded-lg"
                aria-labelledby={`${service.id}-title`}
              >
                <CardHeader className="items-center text-center p-6">
                  <div
                    aria-hidden
                    className="p-4 bg-primary/10 rounded-full mb-4 inline-flex items-center justify-center"
                  >
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle id={`${service.id}-title`} className="text-xl font-semibold text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-center text-foreground/70 flex-grow p-6">
                  <p className="mb-4">{service.description}</p>

                  <div className="mb-4 text-left">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Features</h4>
                    <ul className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 text-left">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Perfect For</h4>
                    <ul className="flex flex-wrap gap-2">
                      {service.useCases.map((uc) => (
                        <li key={uc} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full">
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <Link href={service.link} passHref>
                      <a
                        aria-label={`Learn more about ${service.title} by Fynorra`}
                        rel="noopener noreferrer"
                        className="w-full inline-block"
                      >
                        <Button
                          variant="outline"
                          className="w-full group text-sm border-primary/50 hover:bg-primary/10 hover:text-primary flex items-center justify-center gap-2"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </a>
                    </Link>
                  </div>
                </CardContent>
              </article>
            );
          })}
        </div>

        {/* Industry Solutions */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">Industry-Specific Solutions by Fynorra</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Healthcare", icon: "🏥" },
              { name: "Finance", icon: "💳" },
              { name: "E-commerce", icon: "🛒" },
              { name: "Manufacturing", icon: "🏭" },
              { name: "Education", icon: "🎓" },
              { name: "Real Estate", icon: "🏠" },
              { name: "Legal", icon: "⚖️" },
              { name: "Marketing", icon: "📈" }
            ].map((industry) => (
              <div
                key={industry.name}
                className="p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
                role="button"
                tabIndex={0}
                aria-pressed="false"
              >
                <div className="text-2xl mb-2" aria-hidden>{industry.icon}</div>
                <div className="text-sm font-medium text-foreground">{industry.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Page wrapper with server-side SEO in <Head>
export default function ServicesPage() {
  const pageTitle = "AI Services — Fynorra AI Solutions | Custom Chatbots, Automation, Cloud";
  const pageDescription =
    "Fynorra builds enterprise AI, software, and cloud solutions: custom chatbots, workflow automation, cloud & DevOps, and full-stack development. Request a free consultation.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Fynorra Services",
    "description": pageDescription,
    "url": "https://www.fynorra.com/services",
    "publisher": {
      "@type": "Organization",
      "name": "Fynorra AI Solutions Pvt Ltd",
      "url": "https://www.fynorra.com"
    },
    "mainEntity": services.map((s) => ({
      "@type": "Service",
      "name": s.title,
      "description": s.description,
      "url": `https://www.fynorra.com${s.link}`
    }))
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://www.fynorra.com/services" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.fynorra.com/services" />
        <meta property="og:site_name" content="Fynorra" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Basic performance best-practices hints */}
        <meta name="robots" content="index, follow" />
      </Head>

      <main>
        <ServicesSection />

        <section className="py-12 bg-surface">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Ready to transform with AI?</h3>
            <p className="max-w-2xl mx-auto mb-6">Book a free 30-minute consultation. We’ll audit your use case and propose a practical MVP plan.</p>
            <div className="max-w-sm mx-auto">
              <Link href="/contact">
                <a>
                  <Button className="w-full">Request Consultation</Button>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
