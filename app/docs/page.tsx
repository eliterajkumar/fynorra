"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Copy, Search, Play, Upload, Cpu } from "lucide-react";

const SAMPLE_PROMPTS = [
  { id: "p1", title: "Q&A", prompt: `Summarize the key points from my uploaded report.` },
  { id: "p2", title: "Creative", prompt: `Generate a blog post based on the training data in this assistant.` },
  { id: "p3", title: "FAQ", prompt: `List 10 FAQs customers ask about our product, with concise answers.` },
  { id: "p4", title: "Tone", prompt: `Rewrite the following paragraph in a professional friendly tone: <paste text>` },
];

const FAQS = [
  { q: "What file types can I upload?", a: "We support PDF, DOCX, and plain text. For scanned PDFs, run OCR before uploading." },
  { q: "When should I use RAG vs Fine-tune?", a: "Use RAG for small datasets or frequently-updated content. Use Fine-tune (LoRA/QLoRA) for large, curated datasets (>~50MB or ~1000 QA pairs)." },
  { q: "How long does training take?", a: "LoRA jobs typically take 30m–4h depending on dataset size and GPU type. RAG indexing is usually minutes to an hour." },
  { q: "How do I deploy a model?", a: "Go to Deploy → generate API keys or copy the embed widget. For private hosting, request dedicated GPU from Billing." },
];

export default function DocsPage() {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({});

  const prompts = useMemo(
    () =>
      SAMPLE_PROMPTS.filter(
        (p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.prompt.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const faqs = useMemo(
    () =>
      FAQS.filter(
        (f) => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  async function copyPrompt(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 overflow-auto ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">💬 Help & Docs</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
                Quick start guides, recommended prompts, and FAQs to get the most from your custom assistants.
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => (window.location.href = "/upload")}>
                <Upload size={16} className="mr-2" /> Upload Data
              </Button>
              <Button variant="secondary" onClick={() => (window.location.href = "/train")}>
                <Cpu size={16} className="mr-2" /> Train AI
              </Button>
              <Button onClick={() => (window.location.href = "/playground")}>
                <Play size={16} className="mr-2" /> Playground
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="sr-only" htmlFor="doc-search">Search docs</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                id="doc-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides, prompts, FAQs..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">Try “RAG”, “Fine-tune”, or “sample prompts”.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Usage Guide & Prompts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Usage Guide */}
              <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border dark:border-slate-700">
                <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">Usage Guide</h2>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-slate-300">
                  <li><strong>Upload:</strong> Add PDFs, DOCX or paste URLs on Upload page. Clean or remove irrelevant pages for better results.</li>
                  <li><strong>Index / Train:</strong> Use Index (RAG) for fast updates; choose Fine-tune for large curated datasets.</li>
                  <li><strong>Test:</strong> Use Playground to chat & test voice. Enable citations for fact-checking.</li>
                  <li><strong>Deploy:</strong> Generate API keys in Deploy to embed or call from your apps.</li>
                </ol>
              </section>

              {/* Sample prompts */}
              <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Sample Prompts</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Copy & paste these into Playground</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prompts.map((p) => (
                    <div key={p.id} className="p-4 rounded-lg border dark:border-slate-700 bg-gray-50 dark:bg-slate-700">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{p.title}</div>
                          <div className="mt-2 text-sm text-gray-700 dark:text-slate-200 whitespace-pre-wrap">{p.prompt}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="ghost" onClick={() => copyPrompt(p.id, p.prompt)}>
                            <Copy size={14} />
                          </Button>
                          <Button variant="outline" onClick={() => { navigator.clipboard.writeText(p.prompt); window.location.href = "/playground"; }}>
                            Try
                          </Button>
                        </div>
                      </div>
                      {copiedId === p.id && <div className="text-xs text-emerald-600 mt-2">Copied!</div>}
                    </div>
                  ))}
                </div>
              </section>

              {/* How-to steps */}
              <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border dark:border-slate-700">
                <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">How to create a useful assistant (5 min)</h2>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-slate-300">
                  <li>Collect relevant documents (PDFs, docs, internal FAQs).</li>
                  <li>Upload them via Upload page — preview and remove noisy sections.</li>
                  <li>Index for RAG (fast) or run Fine-tune (LoRA) for large data.</li>
                  <li>Test in Playground — enable citations and flag errors.</li>
                  <li>Deploy and embed — monitor queries & retrain periodically.</li>
                </ol>
              </section>
            </div>

            {/* Right: FAQ & Quick Links */}
            <aside className="space-y-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">Quick Links</h3>
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" onClick={() => (window.location.href = "/upload")}><Upload size={14} className="mr-2" /> Upload Data</Button>
                  <Button variant="ghost" onClick={() => (window.location.href = "/train")}><Cpu size={14} className="mr-2" /> Train AI</Button>
                  <Button variant="ghost" onClick={() => (window.location.href = "/playground")}><Play size={14} className="mr-2" /> Playground</Button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">FAQs</h3>
                <div className="space-y-2">
                  {faqs.map((f, i) => (
                    <div key={i} className="border-b dark:border-slate-700 pb-2">
                      <button
                        onClick={() => setOpenFaq((s) => ({ ...s, [i]: !s[i] }))}
                        className="w-full text-left flex items-center justify-between gap-2"
                      >
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{f.q}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">{openFaq[i] ? "−" : "+"}</div>
                      </button>

                      {openFaq[i] && <div className="mt-2 text-sm text-gray-600 dark:text-slate-300">{f.a}</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-fuchsia-500 text-white p-4 rounded-lg shadow">
                <div className="font-semibold">Need help?</div>
                <div className="text-sm mt-1">Contact support or join our Discord for onboarding help.</div>
                <div className="mt-3">
                  <Button onClick={() => window.location.href = "/help/contact"} className="bg-white text-indigo-600">Contact Support</Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
