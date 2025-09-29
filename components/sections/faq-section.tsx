"use client";
import React from "react";

// Server-rendered FAQ section with JSON-LD and lightweight client JS for interactivity.
// Drop this file into your Next.js App Router page (e.g. app/components/FAQSection.tsx)
// It does NOT use `use client` so content is server-rendered and indexable by search engines.

const faqData = [
  {
    question: "How much does a custom AI chatbot cost to build with Fynorra?",
    answer:
      "Custom AI chatbot pricing varies based on complexity, features, and integration requirements. Basic chatbots start around $5,000, while enterprise solutions with advanced features can range from $15,000 to $50,000+. We provide detailed quotes after understanding your specific needs and use cases.",
    category: "Pricing",
  },
  {
    question: "How long does it take to develop a custom AI solution at Fynorra?",
    answer:
      "Development timelines depend on the complexity of your AI solution. Simple chatbots can be ready in 2-4 weeks, while complex enterprise AI systems may take 3-6 months. We follow agile methodologies to deliver working prototypes quickly and iterate based on feedback.",
    category: "Development",
  },
  {
    question: "Can Fynorra's AI chatbots integrate with our existing systems (Salesforce, HubSpot)?",
    answer:
      "Yes! Fynorra's AI chatbots are designed for seamless integration with your existing CRM, ERP, helpdesk, and other business systems. We support APIs, webhooks, and custom integrations for platforms like Salesforce, HubSpot, Zendesk, and more.",
    category: "Integration",
  },
  {
    question: "What makes Fynorra's AI solutions different from off-the-shelf options?",
    answer:
      "Unlike generic AI tools, Fynorra's solutions are custom-built for your specific business needs, industry requirements, and customer interactions. We train models on your data, integrate with your workflows, and provide ongoing optimization to ensure maximum ROI.",
    category: "Customization",
  },
  {
    question: "Do you provide ongoing support and maintenance for Fynorra deployments?",
    answer:
      "Absolutely! We offer comprehensive support packages including 24/7 monitoring, regular updates, performance optimization, and technical support. Our team ensures your AI solutions continue to deliver value and adapt to your evolving business needs.",
    category: "Support",
  },
  {
    question: "How secure are Fynorra's AI solutions for enterprise use?",
    answer:
      "Security is our top priority. We implement enterprise-grade security measures including data encryption, secure API authentication, GDPR compliance, and SOC 2 Type II certification. Your data remains private and secure throughout the development and deployment process.",
    category: "Security",
  },
  {
    question: "Can Fynorra's AI chatbots handle complex customer inquiries?",
    answer:
      "Yes! Our advanced AI chatbots use natural language processing and machine learning to understand context, handle complex queries, and escalate to human agents when needed. They can manage multi-step conversations, process forms, and provide personalized responses.",
    category: "Capabilities",
  },
  {
    question: "What industries does Fynorra specialize in?",
    answer:
      "Fynorra serves diverse industries including healthcare, finance, e-commerce, manufacturing, education, and professional services. Each solution is tailored to industry-specific regulations, workflows, and customer expectations.",
    category: "Industries",
  },
  {
    question: "How does Fynorra measure the success of AI implementations?",
    answer:
      "We establish clear KPIs before implementation, including response times, resolution rates, customer satisfaction scores, and ROI metrics. Our analytics dashboard provides real-time insights into performance, allowing continuous optimization and improvement.",
    category: "Analytics",
  },
  {
    question: "What if we need to scale our Fynorra AI solution as our business grows?",
    answer:
      "Fynorra solutions are built with scalability in mind from day one. We design architectures that can handle increased traffic, add new features, and integrate additional systems as your business expands. We also provide migration and upgrade services.",
    category: "Scalability",
  },
];

const categories = [
  "All",
  "Pricing",
  "Development",
  "Integration",
  "Customization",
  "Support",
  "Security",
  "Capabilities",
  "Industries",
  "Analytics",
  "Scalability",
];

export default function FAQSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-900/50" id="faq">
      {/* JSON-LD for FAQPage (server-rendered) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Fynorra — Frequently Asked Questions
          </h1>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Get answers to common questions about Fynorra AI solutions, development
            process, integrations, pricing, security and how we help businesses
            automate customer interactions.
          </p>
        </div>

        {/* Category Filter (server-rendered buttons) */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" data-role="faq-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`faq-filter-btn px-3 py-1 rounded-md text-sm border border-slate-700/40`}
              data-category={category}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4" id="faq-list">
          {faqData.map((faq, index) => (
            <article
              key={index}
              className="bg-slate-800/30 border-slate-700/50 rounded-md"
              data-category={faq.category}
            >
              <header
                className="cursor-pointer hover:bg-slate-800/50 transition-colors px-4 py-3 flex justify-between items-center"
                data-role="faq-question"
                aria-controls={`faq-answer-${index}`}
                aria-expanded="false"
                tabIndex={0}
              >
                <h2 className="text-lg font-semibold text-foreground">
                  {faq.question}
                </h2>
                <span className="faq-toggle">+</span>
              </header>

              <div id={`faq-answer-${index}`} className="faq-answer px-4 pb-4 hidden">
                <p className="text-foreground/80 leading-relaxed">
                  {/* Add internal links where helpful */}
                  {faq.answer}
                  {faq.category === "Integration" && (
                    <>
                      {' '}
                      <a href="/services/integration" className="underline">
                        Learn about Fynorra integrations
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-foreground/80 mb-4">
            Still have questions? Our AI experts at Fynorra are here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/contact" className="inline-block">
              <button className="px-6 py-3 rounded-md bg-primary text-white">Schedule a Consultation</button>
            </a>
            <a href="/case-studies" className="inline-block">
              <button className="px-6 py-3 rounded-md border border-slate-700/40">View Case Studies</button>
            </a>
          </div>
        </div>
      </div>

      {/* Lightweight client JS: filtering + toggle behaviour. Keeps module server-rendered but interactive in browser. */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const faqList = document.getElementById('faq-list');
          const filterBtns = document.querySelectorAll('[data-role="faq-filters"] .faq-filter-btn');

          function setFilter(category){
            const items = faqList.querySelectorAll('[data-category]');
            items.forEach(item => {
              if(category === 'All' || item.getAttribute('data-category') === category){
                item.style.display = '';
              } else {
                item.style.display = 'none';
              }
            });
            // update active button styles
            filterBtns.forEach(b => b.classList.toggle('bg-primary/90', b.getAttribute('data-category') === category));
          }

          filterBtns.forEach(btn => {
            btn.addEventListener('click', () => setFilter(btn.getAttribute('data-category')));
          });

          // toggle answers
          faqList.addEventListener('click', function(e){
            const header = e.target.closest('[data-role="faq-question"]');
            if(!header) return;
            const article = header.closest('[data-category]');
            const answer = article.querySelector('.faq-answer');
            const toggle = header.querySelector('.faq-toggle');
            const expanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', String(!expanded));
            if(expanded){
              answer.classList.add('hidden');
              toggle.textContent = '+';
            } else {
              answer.classList.remove('hidden');
              toggle.textContent = '-';
            }
          });

          // support keyboard toggle
          faqList.addEventListener('keydown', function(e){
            if(e.key === 'Enter' || e.key === ' '){
              const header = e.target.closest('[data-role="faq-question"]');
              if(header){ header.click(); e.preventDefault(); }
            }
          });

          // initialize default filter
          setFilter('All');
        })();
      `}} />
    </section>
  );
}
