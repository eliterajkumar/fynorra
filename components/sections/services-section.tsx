"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Zap, Code2, CloudCog, ArrowRight } from "lucide-react";
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
    id: "services-ai",
    icon: Bot,
    title: "Custom AI Chatbots",
    description:
      "Fynorra builds intelligent, human-like chatbots that understand context, learn from interactions, and provide 24/7 customer support across channels.",
    features: ["Natural Language Processing", "Multi-channel Integration", "Custom Training", "Analytics Dashboard"],
    useCases: ["Customer Service", "Lead Generation", "E-commerce Support", "Healthcare Assistance"],
    link: "/custom-ai-solutions"
  },
  {
    id: "ai-integration",
    icon: Zap,
    title: "AI Integration & Automation",
    description:
      "Seamlessly integrate Fynorra AI capabilities into your systems to automate processes, reduce manual work and increase throughput.",
    features: ["API Integration", "Workflow Automation", "Data Processing", "Real-time Analytics"],
    useCases: ["Process Automation", "Data Analysis", "Predictive Maintenance", "Quality Control"],
    link: "/custom-ai-solutions"
  },
  {
    id: "services-dev",
    icon: Code2,
    title: "Software Development",
    description:
      "End-to-end development from web and mobile apps to enterprise platforms — modern, maintainable, and secure.",
    features: ["Full-stack Development", "Mobile Apps", "API Development", "Legacy Modernization"],
    useCases: ["Web Applications", "Mobile Solutions", "Enterprise Software", "E-commerce Platforms"],
    link: "/software-development"
  },
  {
    id: "services-cloud",
    icon: CloudCog,
    title: "Cloud & DevOps",
    description:
      "Scalable cloud architectures and DevOps practices for reliability, security, and performance at scale.",
    features: ["Cloud Migration", "CI/CD Pipelines", "Infrastructure as Code", "Monitoring & Security"],
    useCases: ["Cloud Migration", "DevOps Transformation", "Scalable Infrastructure", "Disaster Recovery"],
    link: "/cloud-devops"
  },
];

export function ServicesSection() {
  // Client-side JSON-LD injection as fallback. For best SEO, move this to server-side <Head>.
  useEffect(() => {
    const id = "fynorra-services-jsonld";
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
      "areaServed": ["IN","US"],
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
                      
                        aria-label={`Learn more about ${service.title} by Fynorra`}
                        rel="noopener noreferrer"
                        className="w-full inline-block"
                      
                        <Button
                          variant="outline"
                          className="w-full group text-sm border-primary/50 hover:bg-primary/10 hover:text-primary flex items-center justify-center gap-2"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </Button>
                      
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
