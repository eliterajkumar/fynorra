"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "How much does a custom AI chatbot cost?",
    answer: "Custom AI chatbot pricing varies based on complexity, features, and integration requirements. Basic chatbots start around $5,000, while enterprise solutions with advanced features can range from $15,000 to $50,000+. We provide detailed quotes after understanding your specific needs and use cases.",
    category: "Pricing"
  },
  {
    question: "How long does it take to develop a custom AI solution?",
    answer: "Development timelines depend on the complexity of your AI solution. Simple chatbots can be ready in 2-4 weeks, while complex enterprise AI systems may take 3-6 months. We follow agile methodologies to deliver working prototypes quickly and iterate based on feedback.",
    category: "Development"
  },
  {
    question: "Can your AI chatbots integrate with our existing systems?",
    answer: "Yes! Our AI chatbots are designed for seamless integration with your existing CRM, ERP, helpdesk, and other business systems. We support APIs, webhooks, and custom integrations for platforms like Salesforce, HubSpot, Zendesk, and more.",
    category: "Integration"
  },
  {
    question: "What makes Fynorra's AI solutions different from off-the-shelf options?",
    answer: "Unlike generic AI tools, our solutions are custom-built for your specific business needs, industry requirements, and customer interactions. We train models on your data, integrate with your workflows, and provide ongoing optimization to ensure maximum ROI.",
    category: "Customization"
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Absolutely! We offer comprehensive support packages including 24/7 monitoring, regular updates, performance optimization, and technical support. Our team ensures your AI solutions continue to deliver value and adapt to your evolving business needs.",
    category: "Support"
  },
  {
    question: "How secure are your AI solutions for enterprise use?",
    answer: "Security is our top priority. We implement enterprise-grade security measures including data encryption, secure API authentication, GDPR compliance, and SOC 2 Type II certification. Your data remains private and secure throughout the development and deployment process.",
    category: "Security"
  },
  {
    question: "Can AI chatbots handle complex customer inquiries?",
    answer: "Yes! Our advanced AI chatbots use natural language processing and machine learning to understand context, handle complex queries, and escalate to human agents when needed. They can manage multi-step conversations, process forms, and provide personalized responses.",
    category: "Capabilities"
  },
  {
    question: "What industries do you specialize in?",
    answer: "We serve diverse industries including healthcare, finance, e-commerce, manufacturing, education, and professional services. Each solution is tailored to industry-specific regulations, workflows, and customer expectations. We have deep expertise in compliance requirements for regulated industries.",
    category: "Industries"
  },
  {
    question: "How do you measure the success of AI implementations?",
    answer: "We establish clear KPIs before implementation, including response times, resolution rates, customer satisfaction scores, and ROI metrics. Our analytics dashboard provides real-time insights into performance, allowing continuous optimization and improvement.",
    category: "Analytics"
  },
  {
    question: "What if we need to scale our AI solution as our business grows?",
    answer: "Our AI solutions are built with scalability in mind from day one. We design architectures that can handle increased traffic, add new features, and integrate additional systems as your business expands. We also provide migration and upgrade services.",
    category: "Scalability"
  }
];

const categories = ["All", "Pricing", "Development", "Integration", "Customization", "Support", "Security", "Capabilities", "Industries", "Analytics", "Scalability"];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const filteredFAQs = activeCategory === "All" 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-900/50" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Get answers to common questions about our AI solutions, development process, 
            and how we can help transform your business with custom artificial intelligence.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <Card key={index} className="bg-slate-800/30 border-slate-700/50">
              <CardHeader 
                className="cursor-pointer hover:bg-slate-800/50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <CardTitle className="text-lg font-semibold text-foreground flex justify-between items-center">
                  {faq.question}
                  {expandedItems.has(index) ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary" />
                  )}
                </CardTitle>
              </CardHeader>
              {expandedItems.has(index) && (
                <CardContent className="pt-0">
                  <p className="text-foreground/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-foreground/80 mb-4">
            Still have questions? Our AI experts are here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="group">
              Schedule a Consultation
            </Button>
            <Button variant="outline" size="lg">
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 