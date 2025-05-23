"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const pricingData = {
  smallBusiness: {
    title: "Small Business Solutions",
    description: "Perfect for startups and small teams looking to leverage AI for growth and efficiency. Get foundational AI tools and support to get started.",
    features: [
      "Basic AI-powered chatbot",
      "Standard analytics dashboard",
      "Email support",
      "Up to 5 users",
    ],
    cta: "Get in Touch",
  },
  customAiChatbot: {
    title: "Custom AI Chatbot",
    description: "Develop a bespoke AI chatbot tailored to your specific customer service, sales, or internal process needs. Advanced features and integration capabilities.",
    features: [
      "Tailored conversation flows",
      "CRM/Software integration",
      "Advanced analytics & reporting",
      "Dedicated support & training",
    ],
    cta: "Get in Touch",
  },
  enterpriseAi: {
    title: "Enterprise AI",
    description: "Comprehensive AI solutions for large organizations seeking to transform operations, innovate products, and achieve significant competitive advantages.",
    features: [
      "Custom model development & fine-tuning",
      "Scalable cloud infrastructure",
      "Enterprise-grade security & compliance",
      "Premium 24/7 support & SLA",
    ],
    cta: "Get in Touch",
  },
};

type PlanKey = keyof typeof pricingData;

export function PricingSection() {
  const [activeTab, setActiveTab] = useState<PlanKey>("customAiChatbot");

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Tailored to your needs
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Custom pricing for custom solutions. We work with you to find the perfect fit.
          </p>
        </div>

        <Tabs
          defaultValue={activeTab}
          onValueChange={(value) => setActiveTab(value as PlanKey)}
          className="w-full max-w-3xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 h-auto sm:h-10">
            <TabsTrigger value="smallBusiness" className="py-2 sm:py-0">Small Business</TabsTrigger>
            <TabsTrigger value="customAiChatbot" className="py-2 sm:py-0">Custom AI Chatbot</TabsTrigger>
            <TabsTrigger value="enterpriseAi" className="py-2 sm:py-0">Enterprise AI</TabsTrigger>
          </TabsList>

          {Object.keys(pricingData).map((key) => {
            const plan = pricingData[key as PlanKey];
            return (
              <TabsContent key={key} value={key}>
                <Card className="bg-card/50 shadow-xl gradient-border">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-semibold text-primary">{plan.title}</CardTitle>
                    <CardDescription className="text-foreground/70 mt-1 text-base">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-3 mb-8 text-foreground/90">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {/* Contact Button */}
                    <Link href="/contact" passHref>
                      <Button size="lg" className="w-full group text-base">
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Bottom "Contact us" Link */}
        <div className="mt-12 text-center">
          <p className="text-foreground/70">
            Don't see exactly what you need? Our solutions are highly customizable.
          </p>
          <Link href="/contact" passHref>
            <Button variant="link" className="text-primary text-lg mt-2">
              Contact us for a personalized consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}