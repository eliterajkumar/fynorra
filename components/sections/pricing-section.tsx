"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const pricingData = {
  smallBusiness: {
    title: "Small Business Solutions",
    subtitle: "Starter AI toolkit for growth",
    description:
      "Perfect for startups and small teams looking to leverage AI for growth and efficiency. Foundational AI tools and support to get started quickly.",
    features: [
      "Basic AI-powered chatbot",
      "Standard analytics dashboard",
      "Email support",
      "Up to 5 users",
    ],
    cta: "Get in Touch",
    priceText: "From $5,000",
    id: "fynorra-small",
  },
  customAiChatbot: {
    title: "Custom AI Chatbot",
    subtitle: "Tailored chatbots & integrations",
    description:
      "Bespoke AI chatbots tailored to your customer journeys, with CRM & tool integrations and advanced analytics.",
    features: [
      "Tailored conversation flows",
      "CRM/Software integration",
      "Advanced analytics & reporting",
      "Dedicated support & training",
    ],
    cta: "Get in Touch",
    priceText: "Custom pricing",
    id: "fynorra-custom",
  },
  enterpriseAi: {
    title: "Enterprise AI",
    subtitle: "Scalable, secure, enterprise-grade",
    description:
      "Comprehensive AI solutions for organizations transforming operations—custom model work, cloud-scale architecture and enterprise SLAs.",
    features: [
      "Custom model development & fine-tuning",
      "Scalable cloud infrastructure",
      "Enterprise-grade security & compliance",
      "Premium 24/7 support & SLA",
    ],
    cta: "Get in Touch",
    priceText: "Contact for pricing",
    id: "fynorra-enterprise",
  },
};

type PlanKey = keyof typeof pricingData;

export function PricingSection() {
  const [activeTab, setActiveTab] = useState<PlanKey>("customAiChatbot");

  // JSON-LD for OfferCatalog + Organization (client-side fallback).
  // Recommended: move this JSON-LD to server-side <Head> for immediate indexing.
  useEffect(() => {
    const id = "fynorra-pricing-jsonld";
    if (document.getElementById(id)) return;

    const offers = Object.keys(pricingData).map((k) => {
      const p = pricingData[k as PlanKey];
      return {
        "@type": "Offer",
        "url": `https://www.fynorra.com/#pricing`,
        "itemOffered": {
          "@type": "Service",
          "name": p.title,
          "description": p.subtitle,
          "serviceType": "AI Services",
          "provider": {
            "@type": "Organization",
            "name": "Fynorra AI Solutions Pvt Ltd",
            "url": "https://www.fynorra.com"
          }
        },
        "price": p.priceText === "From $5,000" ? "5000" : undefined,
        "priceCurrency": p.priceText === "From $5,000" ? "USD" : undefined,
        "availability": "https://schema.org/InStock",
        "identifier": p.id
      };
    });

    const catalog = {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Fynorra Pricing Plans",
      "itemListElement": offers
    };

    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = id;
    s.text = JSON.stringify(catalog);
    document.head.appendChild(s);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Fynorra Pricing — Tailored AI solutions
          </h2>
          <p className="mt-3 text-lg text-foreground/80 max-w-2xl mx-auto">
            Choose from starter packages to enterprise-grade deployments. Our AI assistants, custom chatbots, and automation solutions are priced to match value and scale.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs
            defaultValue={activeTab}
            onValueChange={(value) => setActiveTab(value as PlanKey)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 gap-2">
              <TabsTrigger value="smallBusiness" className="py-2 sm:py-3" aria-controls="fynorra-small">
                Small Business
              </TabsTrigger>
              <TabsTrigger value="customAiChatbot" className="py-2 sm:py-3" aria-controls="fynorra-custom">
                Custom AI Chatbot
              </TabsTrigger>
              <TabsTrigger value="enterpriseAi" className="py-2 sm:py-3" aria-controls="fynorra-enterprise">
                Enterprise AI
              </TabsTrigger>
            </TabsList>

            {Object.keys(pricingData).map((key) => {
              const plan = pricingData[key as PlanKey];
              return (
                <TabsContent key={key} value={key}>
                  <Card className="bg-card/50 shadow-xl gradient-border" id={plan.id}>
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl font-semibold text-primary">{plan.title}</CardTitle>
                      <div className="flex items-center justify-center gap-3 mt-2">
                        <span className="text-sm text-foreground/70">{plan.subtitle}</span>
                        <span className="text-sm text-foreground/50">•</span>
                        <span className="text-sm text-foreground/60">{plan.priceText}</span>
                      </div>
                      <CardDescription className="text-foreground/70 mt-3 text-base">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-2">
                      <ul className="space-y-3 mb-6 text-foreground/90" aria-hidden={false}>
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" aria-hidden />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mb-4">
                        <Link href="/contact" legacyBehavior>
                          <a aria-label={`Contact Fynorra about ${plan.title}`} className="w-full block">
                            <Button size="lg" className="w-full group text-base" aria-haspopup="dialog">
                              {plan.cta}
                            </Button>
                          </a>
                        </Link>
                      </div>

                      {/* Small conversion microcopy */}
                      <p className="text-xs text-foreground/60">
                        Need a custom quote? Tell us about your use case and we'll prepare a tailored proposal.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>

          {/* Bottom "Contact us" Link */}
          <div className="mt-8 text-center">
            <p className="text-foreground/70">
              Don't see exactly what you need? Our solutions are highly customizable.
            </p>
            <Link href="/contact" legacyBehavior>
              <a aria-label="Contact Fynorra for personalized consultation">
                <Button variant="link" className="text-primary text-lg mt-2">
                  Contact us for a personalized consultation
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
