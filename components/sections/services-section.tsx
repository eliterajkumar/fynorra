"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, BrainCircuit, Code2, CloudCog, Zap } from "lucide-react"; // Zap for AI Integration
import type { LucideIcon } from "lucide-react";

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: "services-ai", // For navbar link
    icon: Bot,
    title: "Custom Chatbots",
    description: "Engage customers 24/7 with intelligent, human-like chatbots tailored to your business needs.",
  },
  {
    id: "ai-integration",
    icon: Zap, // Using Zap for AI Integration as BrainCircuit might be too generic
    title: "AI Integration",
    description: "Seamlessly integrate AI capabilities into your existing systems and workflows for enhanced efficiency.",
  },
  {
    id: "services-dev", // For navbar link
    icon: Code2,
    title: "IT Development",
    description: "End-to-end software development services, from web and mobile apps to complex enterprise solutions.",
  },
  {
    id: "services-cloud", // For navbar link
    icon: CloudCog,
    title: "Cloud & DevOps",
    description: "Optimize your infrastructure with our cloud solutions and DevOps practices for scalability and reliability.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            What We Do
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Fynorra offers a comprehensive suite of AI and IT solutions designed to empower your business and drive innovation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              id={service.id}
              className="group bg-card/50 hover:bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                  <service.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-foreground/70 flex-grow">
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
