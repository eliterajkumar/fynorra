"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Custom LLM & NLP Solutions – Fynorra",
  description:
    "Fine-tune, build, and deploy LLMs and NLP systems (GPT, LLaMA, Mistral). Secure on-prem or cloud options.",
};

const pageMeta = {
  title: "Custom LLM & NLP Solutions",
  description:
    "Fine-tune, build, and deploy large language models and NLP pipelines (LLaMA, Mistral, Falcon). Secure, efficient, and tailored to your domain.",
  url: "https://www.fynorra.com/services/llm-nlp",
};

const features = [
  "Data curation & cleaning",
  "Parameter-efficient fine-tuning (LoRA / QLoRA)",
  "Instruction & supervised tuning",
  "Training → evaluation → deployment pipelines",
  "API & SDK integrations",
];

const useCases = [
  "Legal summarization & contract analysis",
  "Clinical note summarization & medical QA",
  "Domain-aware customer support automation",
  "Content moderation & automated tagging",
];

const faqs = [
  {
    q: "Do you train models from scratch?",
    a: "Yes — for high-value, specialized projects we can design and train models from scratch. For most use cases we recommend efficient fine-tuning of robust base models.",
  },
  {
    q: "What is LoRA / QLoRA?",
    a: "LoRA and QLoRA are parameter-efficient tuning techniques that let us adapt large models using far less compute and storage compared to full retraining.",
  },
  {
    q: "Can models be deployed on-premise?",
    a: "Absolutely — we support on-prem, hybrid, and cloud deployments depending on compliance, latency, and cost requirements.",
  },
  {
    q: "How do you monitor model performance?",
    a: "We integrate AI Ops: continuous metrics, drift detection, alerting, and automated retraining pipelines as part of the delivery.",
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

export default function LLMNLPPage() {
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
            <CardTitle className="text-xl font-semibold">What we deliver</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4">
              We deliver production-ready LLM and NLP solutions: from preparing and curating your data to
              parameter-efficient fine-tuning, evaluation, and secure deployment. Our focus is performance,
              cost-efficiency, and compliance.
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
                  <Button className="w-full">Request Technical Call</Button>
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
