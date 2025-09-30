export const metadata = {
  title: "Custom LLM & NLP Solutions – Fynorra",
  description: "Fine-tune, build, and deploy LLMs and NLP systems (GPT, LLaMA, Mistral). Secure on-prem or cloud options.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom LLM & NLP Solutions",
  "description": "Fine-tuning, training and secure deployment of Large Language Models and NLP pipelines tailored to your domain.",
  "provider": { "@type": "Organization", "name": "Fynorra AI Solutions Pvt Ltd", "url": "https://www.fynorra.com" },
  "url": "https://www.fynorra.com/services/llm-nlp"
};

export default function LLMNLPPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>Custom LLM & NLP Solutions</h1>

      <p>
        Fynorra customizes large language models and end-to-end NLP solutions for businesses that need domain-accurate
        language intelligence. We fine-tune open models (LLaMA, Mistral, Falcon) or adapt commercial APIs with your data,
        plus build the pipelines to deploy them privately and reliably.
      </p>

      <h2>Benefits</h2>
      <ul>
        <li><strong>Higher accuracy:</strong> models trained on your domain data outperform generic models.</li>
        <li><strong>Cost-effective:</strong> we use smaller tuned models where they work best to save compute.</li>
        <li><strong>Privacy-first:</strong> local/on-prem deployment options for regulated industries.</li>
      </ul>

      <h3>Services we provide</h3>
      <ul>
        <li>Data curation & cleaning for fine-tuning</li>
        <li>Instruction tuning & supervised fine-tuning</li>
        <li>Parameter-efficient fine-tuning (LoRA / QLoRA) and adapter methods</li>
        <li>Pipeline automation: training → evaluation → deployment</li>
        <li>Integration with your apps: REST APIs, streaming endpoints, SDKs</li>
      </ul>

      <h3>Use Cases</h3>
      <ul>
        <li>Legal summarization and contract analysis</li>
        <li>Clinical note summarization and medical QA (with governance)</li>
        <li>Customer support automation with domain knowledge</li>
        <li>Content moderation & automated tagging</li>
      </ul>

      <h3>FAQs</h3>
      <dl>
        <dt>Do you train models from scratch?</dt>
        <dd>Yes — for select clients with specialized needs we design and train models from scratch; otherwise we prefer efficient fine-tuning of base models.</dd>

        <dt>What about model monitoring?</dt>
        <dd>We provide AI Ops: drift detection, performance monitoring, and retraining pipelines as part of the solution.</dd>

        <dt>Can I run models locally?</dt>
        <dd>Yes — we support on-prem and hybrid deployments to meet compliance and latency needs.</dd>
      </dl>

      <h3>Next step</h3>
      <p>Request a technical call — we’ll evaluate your dataset and propose a 4–6 week proof of concept.</p>
      <button>Request Technical Call</button>
    </main>
  );
}
