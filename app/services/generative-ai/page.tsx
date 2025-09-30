
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
export const metadata = {
  title: "Generative AI Media – Fynorra",
  description:
    "Generate images, avatars, and videos using AI. Ideal for marketing, social media & creative automation.",
};

const pageMeta = {
  title: "Generative AI Media",
  description:
    "Fynorra builds AI-powered image, avatar, and video generation systems that help creators and brands scale content production for marketing, social media, and ads.",
  url: "https://www.fynorra.com/services/generative-ai",
};

const features = [
  "AI image generation & style transfer",
  "Avatar & virtual human synthesis",
  "Video generation & lip-sync",
  "Text → image, video, and audio multimodal pipelines",
];

const useCases = [
  "YouTube and social avatars & videos",
  "Ad creatives & banners",
  "Content marketing campaigns",
  "Virtual spokespersons & brand avatars",
];

const faqs = [
  {
    q: "How realistic are the avatars?",
    a: "We use advanced motion models and lip-sync. Depending on input quality, avatars can be photorealistic or stylized.",
  },
  {
    q: "Can I supply my own assets?",
    a: "Yes — we can integrate your brand assets, voice, and design guidelines directly into the generative pipeline.",
  },
  {
    q: "Do you support multiple languages?",
    a: "Yes — our generative pipelines can create multilingual video, voice, and text content for global reach.",
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

export default function GenerativeAIPage() {
  return (
    
    <main className="py-12">
      <Navbar />
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
              We empower creators and enterprises to produce high-quality visuals, avatars, and videos at scale.
              Content that previously took weeks to produce can now be automated with Generative AI.
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
            <a className="inline-flex items-center gap-2 text-sm underline">← Back to Services</a>
          </Link>
        </div>
      </section>
      <Footer/>
    </main>
   
  );
}
