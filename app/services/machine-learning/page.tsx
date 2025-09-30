"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Machine Learning & Analytics – Fynorra",
  description: "Predictive models, anomaly detection & recommendation systems. Turn data into actionable intelligence.",
};

const pageMeta = {
  title: "Machine Learning & Analytics",
  description:
    "Predictive models, anomaly detection and recommendation systems to translate data into actionable insights and operational improvements.",
  url: "https://www.fynorra.com/services/machine-learning",
};

const features = [
  "Time series forecasting & trend prediction",
  "Anomaly & fraud detection pipelines",
  "Recommendation & personalization engines",
  "Feature engineering & model explainability",
  "AI-driven dashboards & BI integrations",
];

const useCases = [
  "Inventory & demand forecasting",
  "Transaction fraud detection",
  "Personalized product recommendations",
  "Churn prediction & customer segmentation",
];

const faqs = [
  {
    q: "How quickly can you build a pilot model?",
    a: "A focused pilot (one use case, cleaned dataset) typically takes 3–6 weeks including testing and validation.",
  },
  {
    q: "What data do you need for forecasting?",
    a: "Historical time-series data, business context, and any external signals (e.g., promotions, seasonality) are ideal for accurate forecasts.",
  },
  {
    q: "Do you provide dashboards?",
    a: "Yes — we deliver BI dashboards and integrate model outputs with your analytics stack (Looker, Power BI, Grafana, etc.).",
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

export default function MachineLearningPage() {
  return (
    <main className="py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold">{pageMeta.title}</h1>
          <p className="mt-3 text-lg text-foreground/80">{pageMeta.description}</p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">What we build</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4">
              We convert messy data into reliable models and dashboards that help teams forecast, detect issues, and
              personalize customer experiences. Production-ready pipelines with monitoring and retraining loops included.
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
                  <Button className="w-full">Request a Data Audit</Button>
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
  );
}
