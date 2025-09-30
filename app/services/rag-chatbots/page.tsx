export const metadata = {
  title: "RAG Chatbots – Fynorra",
  description: "Build secure Retrieval-Augmented Generation (RAG) chatbots on your data — accurate, private, and context-aware.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "RAG Chatbots",
  "description": "Fynorra builds Retrieval-Augmented Generation chatbots that connect to your documents, databases and knowledge bases for accurate, context-aware answers.",
  "provider": { "@type": "Organization", "name": "Fynorra AI Solutions Pvt Ltd", "url": "https://www.fynorra.com" },
  "url": "https://www.fynorra.com/services/rag-chatbots"
};

export default function RAGChatbotsPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>RAG Chatbots — Private AI Assistants for Your Data</h1>

      <p>
        Fynorra builds Retrieval-Augmented Generation (RAG) chatbots that combine powerful language models with
        your internal knowledge (documents, FAQs, CRM, databases). The result: fast, accurate, context-aware answers
        that reduce support load and improve decision-making — without exposing data.
      </p>

      <h2>Why choose RAG Chatbots from Fynorra?</h2>
      <ul>
        <li><strong>Accurate answers:</strong> vector search + context windows for precise responses.</li>
        <li><strong>Private & secure:</strong> on-prem or VPC deployments keep data under your control.</li>
        <li><strong>Domain-aware:</strong> fine-tuned retrieval + prompt templates for your industry.</li>
        <li><strong>Scalable:</strong> from a small knowledge base to enterprise document lakes.</li>
      </ul>

      <h3>Key Features</h3>
      <ul>
        <li>Embeddings + Vector DB (Pinecone / Milvus / Weaviate) pipelines</li>
        <li>Hybrid search (keyword + semantic) for better recall</li>
        <li>Context window management & memory (LangChain + LangGraph patterns)</li>
        <li>Custom prompt templates & tool integrations (CRM, ticketing, DBs)</li>
        <li>Monitoring, analytics & feedback loop for continuous improvement</li>
      </ul>

      <h3>Use Cases</h3>
      <ul>
        <li>Customer support automation & 24/7 help desk</li>
        <li>Employee knowledge assistant — HR, IT, SOPs</li>
        <li>Legal and compliance Q&A over contracts</li>
        <li>Sales enablement — product specs and pricing lookup</li>
      </ul>

      <h3>FAQs</h3>
      <dl>
        <dt>How private are RAG chatbots?</dt>
        <dd>We deploy in your VPC or on-prem, encrypt data at rest and in transit, and never share your docs without authorization.</dd>

        <dt>Which vector DB do you use?</dt>
        <dd>We recommend Pinecone or Weaviate for most clients; we can adapt to your stack.</dd>

        <dt>How quickly can you deliver a pilot?</dt>
        <dd>Typical pilot (one knowledge base + prototype UI) is 2–4 weeks depending on data readiness.</dd>
      </dl>

      <h3>Next step</h3>
      <p>Book a 30-minute consultation and we’ll audit your data and propose an MVP RAG plan.</p>
      <button>Request a Demo</button>
    </main>
  );
}
