

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
export const metadata = {
  title: "RAG Chatbots – Fynorra",
  description:
    "Build secure Retrieval-Augmented Generation (RAG) chatbots on your data — accurate, private, and context-aware.",
};

const pageMeta = {
  title: "RAG Chatbots — Private AI Assistants for Your Data",
  description:
    "Fynorra builds Retrieval-Augmented Generation chatbots that combine LLMs with your internal knowledge bases for accurate, context-aware answers — without exposing sensitive data.",
  url: "https://www.fynorra.com/services/rag-chatbots",
};

const features = [
  "Embeddings + Vector DB (Pinecone / Milvus / Weaviate)",
  "Hybrid keyword + semantic search",
  "Context window management & memory",
  "Custom prompt templates & tool integrations",
  "Monitoring, analytics & feedback loop",
];

const useCases = [
  "Customer support automation & 24/7 help desk",
  "Employee knowledge assistant — HR, IT, SOPs",
  "Legal and compliance Q&A over contracts",
  "Sales enablement — product specs and pricing lookup",
];

const faqs = [
  {
    q: "How private are RAG chatbots?",
    a: "We deploy in your VPC or on-prem, encrypt data at rest and in transit, and never share your documents without authorization.",
  },
  {
    q: "Which vector DB do you use?",
    a: "We often recommend Pinecone or Weaviate, but we adapt to your preferred stack and infra.",
  },
  {
    q: "How quickly can you deliver a pilot?",
    a: "A typical pilot (one knowledge base + prototype UI) takes 2–4 weeks depending on your data readiness.",
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

export default function RAGChatbotsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
    <main className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold">{pageMeta.title}</h1>
          <p className="mt-3 text-lg text-foreground/80">{pageMeta.description}</p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Why choose Fynorra RAG Chatbots?
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4">
              Retrieval-Augmented Generation combines vector search with powerful
              language models. The result: chatbots that pull directly from your
              company data, delivering precise, context-aware answers.
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Key features</h4>
              <ul className="flex flex-wrap gap-2">
                {features.map((f) => (
                  <li
                    key={f}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Perfect for</h4>
              <ul className="flex flex-wrap gap-2">
                {useCases.map((u) => (
                  <li
                    key={u}
                    className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full"
                  >
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
            <a className="inline-flex items-center gap-2 text-sm underline">
              ← Back to Services
            </a>
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </div>
  );
}
