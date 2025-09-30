export const metadata = {
  title: "Generative AI Media – Fynorra",
  description: "Generate images, avatars, and videos using AI. Ideal for marketing, social media & creative automation.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Generative AI Media",
  "description": "Fynorra builds AI-driven image, avatar, and video generation systems for creative content automation.",
  "provider": { "@type": "Organization", "name": "Fynorra AI Solutions Pvt Ltd", "url": "https://www.fynorra.com" },
  "url": "https://www.fynorra.com/services/generative-ai"
};

export default function GenerativeAIPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>Generative AI Media Solutions</h1>

      <p>
        From images to avatars to full-motion videos — Fynorra crafts generative media tools that empower creators
        and brands to make content at scale. No manual work, just AI magic.
      </p>

      <h2>Capabilities</h2>
      <ul>
        <li>AI image generation & style transfer</li>
        <li>Avatar and virtual human synthesis</li>
        <li>Video generation & lip-sync from script</li>
        <li>Multimodal pipelines: text → image, text → video, text → audio</li>
      </ul>

      <h3>Use Cases</h3>
      <ul>
        <li>YouTube and social avatars & videos</li>
        <li>Ad creatives & banners</li>
        <li>Content marketing & campaign graphics</li>
        <li>Virtual spokespersons & brand avatars</li>
      </ul>

      <h3>FAQs</h3>
      <dl>
        <dt>How realistic are the avatars?</dt>
        <dd>We use state-of-the-art motion models & lip-sync. Depending on input data quality, avatars can be photoreal or stylized.</dd>

        <dt>Can I supply my own assets?</dt>
        <dd>Yes — bring your brand assets, voice, or design guidelines — we will incorporate them into the generative pipeline.</dd>
      </dl>

      <h3>Next step</h3>
      <p>Let’s prototype a branded avatar or video generation demo for your brand. Book a session now.</p>
      <button>Request a Demo</button>
    </main>
  );
}
