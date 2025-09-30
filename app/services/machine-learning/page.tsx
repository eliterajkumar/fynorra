export const metadata = {
  title: "Machine Learning & Analytics – Fynorra",
  description: "Predictive models, anomaly detection & recommendation systems. Turn data into actionable intelligence.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Machine Learning & Analytics",
  "description": "Fynorra delivers predictive modeling, anomaly detection, recommendation engines, and AI-powered analytics tools.",
  "provider": { "@type": "Organization", "name": "Fynorra AI Solutions Pvt Ltd", "url": "https://www.fynorra.com" },
  "url": "https://www.fynorra.com/services/machine-learning"
};

export default function MachineLearningPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>Machine Learning & Analytics</h1>

      <p>
        Fynorra transforms raw data into insights. We build predictive models, recommendation engines, and anomaly
        detection systems that power decision-making and fuel growth.
      </p>

      <h2>What we build</h2>
      <ul>
        <li>Forecasting & trend prediction</li>
        <li>Anomaly & outlier detection</li>
        <li>Recommendation systems & personalization</li>
        <li>AI-driven dashboards & BI tools</li>
      </ul>

      <h3>Use Cases</h3>
      <ul>
        <li>Inventory forecasting & demand planning</li>
        <li>Fraud or anomaly detection in transactions</li>
        <li>Product recommendations & upsell engines</li>
        <li>User behavior modeling & churn prediction</li>
      </ul>

      <h3>FAQs</h3>
      <dl>
        <dt>How do you ensure model accuracy?</dt>
        <dd>We split, validate, and tune models using cross-validation, hyperparameter search, and continuous feedback loops.</dd>

        <dt>Can the model update in real-time?</dt>
        <dd>Yes — we build pipelines for online learning or batch retraining depending on use case.</dd>
      </dl>

      <h3>Next step</h3>
      <p>Schedule a data audit — we’ll analyze your datasets and propose an ML pilot in 2–4 weeks.</p>
      <button>Request a Demo</button>
    </main>
  );
}
