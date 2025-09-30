export const metadata = {
  title: "AI Consulting & Strategy – Fynorra",
  description: "Strategic AI consulting: opportunity discovery, ROI roadmaps, and implementation planning for enterprise AI.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Consulting & Strategy",
  "description": "Fynorra offers AI strategy, use-case discovery, and implementation roadmaps to ensure measurable business outcomes.",
  "provider": { "@type": "Organization", "name": "Fynorra AI Solutions Pvt Ltd", "url": "https://www.fynorra.com" },
  "url": "https://www.fynorra.com/services/ai-consulting"
};

export default function AIConsultingPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>AI Consulting & Strategy</h1>

      <p>
        Fynorra’s AI consulting service helps organizations identify high-value AI opportunities, calculate ROI, and
        build realistic implementation roadmaps. We focus on pilotable projects that deliver measurable business impact.
      </p>

      <h2>What we do</h2>
      <ul>
        <li>Use-case discovery workshops and prioritization</li>
        <li>Feasibility & ROI analysis</li>
        <li>Pilot scoping and MVP planning</li>
        <li>Technology and vendor selection (models, infra, partners)</li>
      </ul>

      <h3>Why clients pick Fynorra</h3>
      <ul>
        <li>Practical, ROI-first approach — not hype</li>
        <li>Cross-functional team (engineering + ML + product)</li>
        <li>Fast pilots: 2–6 week MVPs that prove value</li>
      </ul>

      <h3>FAQs</h3>
      <dl>
        <dt>How long does a consulting engagement take?</dt>
        <dd>Discovery workshops typically take 1–2 weeks; a pilot roadmap and cost estimate are delivered in 2–4 weeks.</dd>

        <dt>Do you implement projects too?</dt>
        <dd>Yes — we both consult and build, which reduces handover risk and speeds delivery.</dd>
      </dl>

      <h3>Next step</h3>
      <p>Schedule a discovery workshop — we’ll map 3 pilot opportunities and a 90-day plan.</p>
      <button>Book Discovery Workshop</button>
    </main>
  );
}
