"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Rocket } from "lucide-react";

export function ComingSoonSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="gradient-border shadow-2xl overflow-hidden bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Fynorra AI Platform
            </h2>
            <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
              Train, Fine-tune & Deploy Your Own LLMs with No Code. Coming Soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
