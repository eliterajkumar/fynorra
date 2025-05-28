
// src/app/case-studies/[slug]/page.tsx
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Building, CheckCircle, MessageCircle, Target, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface CaseStudyData {
  slug: string;
  title: string;
  summary: string; // For card view and metadata
  clientInfo: {
    industry: string;
    companyName: string;
  };
  imagePrompt: string;
  heroImageUrl: string; // Placeholder or actual URL
  content: {
    introduction: string;
    challenge: string;
    solution: string;
    implementationDetails: string;
    keyResults: string[];
    clientFeedback?: {
      quote: string;
      author?: string; // e.g., "CEO, [Company Name]"
    };
    conclusion: string;
  };
  publishedAt?: string; // Optional date
}

// In a real app, this would fetch from Firestore or a CMS
// For now, we'll use a hardcoded map for sample case studies
const caseStudiesContent: Record<string, CaseStudyData> = {
  'fintech-ai-automation': {
    slug: 'fintech-ai-automation',
    title: 'AI-Powered Automation Boosts Efficiency for FinTech Inc.',
    summary: 'FinTech Inc. leveraged Fynorra\'s custom AI solutions to automate 80% of their manual data entry tasks, leading to significant operational improvements and cost savings.',
    clientInfo: {
      industry: 'Finance (FinTech)',
      companyName: 'FinTech Inc.',
    },
    heroImageUrl: '/case2.png',
    imagePrompt: "A modern fintech office environment with digital screens showing AI-powered automation, data dashboards, and workflow charts. Include futuristic but realistic design with business professionals working efficiently. Professional corporate color palette. Focus on collaboration and efficiency.",
    publishedAt: '2024-07-15',
    content: {
      introduction: "FinTech Inc., a rapidly growing financial technology company, was grappling with operational inefficiencies due to high volumes of manual data entry and document processing. This led to increased turnaround times, higher error rates, and escalating operational costs, hindering their ability to scale effectively.",
      challenge: "The core challenge was to automate the laborious and error-prone manual data processing tasks associated with client onboarding, transaction verification, and compliance reporting. FinTech Inc. needed a solution that could integrate with their existing systems, ensure data accuracy, and free up their skilled workforce for more strategic initiatives.",
      solution: "Fynorra developed and implemented a custom AI-powered automation solution. This involved leveraging Optical Character Recognition (OCR) for data extraction from various document types, Natural Language Processing (NLP) for understanding and categorizing unstructured data, and Robotic Process Automation (RPA) bots augmented with AI decision-making capabilities to handle the end-to-end workflow.",
      implementationDetails: "The implementation was phased, starting with a thorough analysis of FinTech Inc.'s existing workflows. Fynorra's team then designed intelligent automation modules, trained AI models on FinTech Inc.'s specific data sets, and integrated the solution seamlessly with their core banking and CRM systems. Rigorous testing and user training ensured a smooth transition.",
      keyResults: [
        "Achieved an 80% reduction in manual data entry tasks.",
        "Increased document processing speed by 45%.",
        "Reduced operational costs related to data processing by 20%.",
        "Significantly improved data accuracy and compliance adherence.",
        "Freed up approximately 500 human-hours per month, reallocated to higher-value tasks."
      ],
      clientFeedback: {
        quote: "Fynorra's AI automation solution has been a game-changer for us. The efficiency gains and cost savings are remarkable, allowing us to focus on innovation and serving our clients better.",
        author: "CFO, FinTech Inc."
      },
      conclusion: "By embracing AI-powered automation, FinTech Inc. successfully transformed its operational backbone, achieving significant improvements in efficiency, accuracy, and cost-effectiveness. This strategic move has positioned them for sustained growth and a stronger competitive edge in the dynamic fintech landscape. Fynorra continues to partner with FinTech Inc. for ongoing optimization and exploration of further AI applications."
    },
  },
  'ecommerce-chatbot-growth': {
    slug: 'ecommerce-chatbot-growth',
    title: 'E-commerce Giant Achieves 30% Sales Growth with Personalized AI Chatbot',
    summary: 'GlobalCart Marketplace, a leading e-commerce platform, integrated Fynorra\'s AI chatbots, resulting in enhanced customer engagement and a substantial uplift in sales.',
    clientInfo: {
      industry: 'E-commerce',
      companyName: 'GlobalCart Marketplace',
    },
    heroImageUrl: '/ecom2.png',
    imagePrompt: "A vibrant e-commerce website interface on a large screen with an AI chatbot window actively engaging a customer. Shopping cart icons, product recommendations, and sales graphs are visible in the background. Bright, friendly colors, modern flat design.",
    publishedAt: '2024-06-20',
    content: {
      introduction: "GlobalCart Marketplace faced challenges in providing instant, personalized support to its vast customer base, leading to missed sales opportunities and suboptimal customer experiences, especially during peak shopping seasons.",
      challenge: "To enhance customer engagement, provide 24/7 support, and convert more website visitors into paying customers by offering personalized product recommendations and assistance throughout the buying journey.",
      solution: "Fynorra deployed an advanced AI-powered chatbot integrated with GlobalCart's product catalog and CRM. The chatbot was designed to handle FAQs, guide users in product discovery, assist with order tracking, and offer personalized recommendations based on user behavior and preferences.",
      implementationDetails: "The project involved analyzing customer interaction data, designing conversational flows, training the NLP model for e-commerce specific queries, and integrating the chatbot across GlobalCart's website and mobile app. A/B testing was conducted to optimize chatbot responses and user engagement strategies.",
      keyResults: [
        "Recorded a 30% increase in online sales within three months of chatbot deployment.",
        "Achieved 24/7 customer support availability, handling 70% of routine inquiries automatically.",
        "Improved customer satisfaction scores by 40% based on post-interaction surveys.",
        "Reduced shopping cart abandonment rate by 15% through proactive engagement.",
      ],
      clientFeedback: {
        quote: "The AI chatbot from Fynorra has revolutionized our customer interaction. It's like having an expert sales assistant available for every visitor, around the clock. The impact on sales and customer satisfaction has been phenomenal.",
        author: "Head of E-commerce, GlobalCart Marketplace"
      },
      conclusion: "Fynorra's personalized AI chatbot provided GlobalCart Marketplace with a powerful tool to scale customer interactions, boost sales, and enhance user satisfaction, solidifying its position as a leader in the competitive e-commerce space."
    },
  },
  'healthcare-predictive-care': {
    slug: 'healthcare-predictive-care',
    title: 'Healthcare Provider Enhances Patient Care with Predictive Analytics',
    summary: 'HealthFlow Group leveraged Fynorra\'s predictive analytics model to anticipate patient needs, optimize resource allocation, and improve treatment accuracy.',
    clientInfo: {
      industry: 'Healthcare',
      companyName: 'HealthFlow Group',
    },
    heroImageUrl: '/health2.png',
    imagePrompt: "A futuristic healthcare setting where doctors and AI collaborate. A holographic display shows patient data, predictive analytics charts, and treatment plans. Clean, sterile environment with blue and white tones, conveying trust and innovation in medical technology.",
    publishedAt: '2024-05-10',
    content: {
      introduction: "HealthFlow Group, a network of hospitals and clinics, aimed to transition from reactive to proactive patient care by leveraging their vast amounts of patient data to predict health risks and optimize treatment pathways.",
      challenge: "To develop a system capable of analyzing historical patient data, identifying patterns indicative of potential health issues, and providing actionable insights to clinicians for early intervention and personalized care plans, while ensuring data privacy and HIPAA compliance.",
      solution: "Fynorra designed and implemented a predictive analytics platform using machine learning models. The platform analyzed anonymized patient records, lab results, and demographic data to predict disease likelihood, patient readmission risks, and optimal treatment efficacies for various conditions.",
      implementationDetails: "The process involved secure data aggregation, feature engineering, training multiple machine learning models (e.g., logistic regression, random forests, gradient boosting), and validating their performance against clinical outcomes. The resulting insights were integrated into the hospital's EMR system via secure APIs, providing clinicians with decision support tools.",
      keyResults: [
        "Improved accuracy in predicting patient readmission risk by 22%.",
        "Enhanced early detection rates for certain chronic conditions by 15%.",
        "Optimized staff scheduling and resource allocation based on predicted patient inflow.",
        "Reduced patient average wait times by 25% in outpatient clinics.",
        "Contributed to a 10% improvement in adherence to evidence-based treatment protocols."
      ],
      clientFeedback: {
        quote: "Fynorra's predictive analytics solution has empowered our clinicians with invaluable insights, enabling us to provide more proactive and personalized care. It's a significant step forward in our mission to improve patient outcomes.",
        author: "Chief Medical Officer, HealthFlow Group"
      },
      conclusion: "By harnessing the power of predictive analytics, HealthFlow Group is now better equipped to anticipate patient needs, allocate resources efficiently, and ultimately deliver a higher standard of care. Fynorra's expertise was crucial in transforming data into life-saving insights."
    },
  },
};

async function getCaseStudyData(slug: string): Promise<CaseStudyData | null> {
  // In a real app, fetch from Firestore based on slug
  if (caseStudiesContent[slug]) {
    return caseStudiesContent[slug];
  }
  return null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const study = await getCaseStudyData(params.slug);

  if (!study) {
    return {
      title: 'Case Study Not Found | Fynorra',
      description: 'The case study you are looking for could not be found.',
    }
  }

  return {
    title: `${study.title} | Fynorra Case Study`,
    description: study.summary,
    openGraph: {
        title: study.title,
        description: study.summary,
        images: [
            {
                url: study.heroImageUrl, 
                width: 1200,
                height: 630,
                alt: study.title,
            },
        ],
        type: 'article',
        publishedTime: study.publishedAt || new Date().toISOString(),
        authors: ['Fynorra'], 
        tags: [study.clientInfo.industry, study.clientInfo.companyName],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = await getCaseStudyData(params.slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 md:pt-32">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <div className="mb-6">
              <Link href="/case-studies" className="text-primary hover:underline flex items-center w-max">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Case Studies
              </Link>
            </div>
            <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wider flex items-center">
                <Building className="h-4 w-4 mr-2" /> Client: {study.clientInfo.companyName} | Industry: {study.clientInfo.industry}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50 mb-4">
              {study.title}
            </h1>
            {study.publishedAt && <p className="text-sm text-slate-400">Published: {new Date(study.publishedAt).toLocaleDateString()}</p>}
          </header>

          {study.heroImageUrl && (
            <div className="mb-12 aspect-video relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={study.heroImageUrl}
                alt={study.title}
                fill
                className="object-cover"
                data-ai-hint={study.imagePrompt}
                priority 
              />
            </div>
          )}
          
          <div className="prose prose-invert prose-lg max-w-none 
                       prose-headings:text-slate-100 prose-h2:text-3xl prose-h2:font-semibold prose-h2:text-primary prose-h2:mb-4 prose-h2:mt-10 prose-h2:border-b prose-h2:border-primary/30 prose-h2:pb-2
                       prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                       prose-ul:list-disc prose-ul:pl-6 prose-ul:text-slate-300 prose-li:mb-2
                       prose-strong:text-slate-200
                       prose-blockquote:border-l-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-300">
            
            <h2 id="introduction">Introduction</h2>
            <p>{study.content.introduction}</p>

            <h2 id="challenge">The Challenge</h2>
            <p>{study.content.challenge}</p>

            <h2 id="solution">The AI Solution</h2>
            <p>{study.content.solution}</p>

            <h2 id="implementation">Implementation Details</h2>
            <p>{study.content.implementationDetails}</p>

            <h2 id="results">Key Results</h2>
            <ul className="list-none p-0">
              {study.content.keyResults.map((result, index) => (
                <li key={index} className="flex items-start mb-3 text-slate-200">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3 shrink-0 mt-1" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>

            {study.content.clientFeedback && (
              <>
                <h2 id="feedback">Client Feedback</h2>
                <blockquote className="mt-6 border-l-4 border-primary pl-6 italic text-slate-300">
                  <p>"{study.content.clientFeedback.quote}"</p>
                  {study.content.clientFeedback.author && (
                    <footer className="mt-2 text-sm text-primary not-italic font-semibold">
                      — {study.content.clientFeedback.author}
                    </footer>
                  )}
                </blockquote>
              </>
            )}

            <h2 id="conclusion">Conclusion</h2>
            <p>{study.content.conclusion}</p>
          </div>

          <div className="mt-16 text-center py-12 bg-primary/10 rounded-xl shadow-lg">
            <Zap className="mx-auto h-10 w-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Want similar results?</h3>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-6">
                Let Fynorra help your business leverage AI for transformative growth.
            </p>
            <Link href="/contact">
                <Button size="lg" className="group text-lg px-8 py-3">
                    Contact Fynorra <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
          </div>

        </article>
      </main>
      <Footer />
    </div>
  );
}
