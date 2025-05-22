import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Briefcase, Target, Building, MessageSquareQuote, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

interface CaseStudy {
  id: string;
  title: string;
  overview: string;
  results: string[];
  client: string;
  imageUrl?: string;
  slug?: string; // For linking to full case study
  dataAiHint?: string;
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const csCollection = collection(db, "caseStudies");
    // Example: order by client name or a specific date field if available
    const q = query(csCollection, orderBy("client", "asc")); 
    const csSnapshot = await getDocs(q);
    const csList = csSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CaseStudy));
    
    if (csList.length === 0) {
      return getSampleCaseStudies();
    }
    return csList;
  } catch (error) {
    console.error("Error fetching case studies from Firestore:", error);
    return getSampleCaseStudies();
  }
}

function getSampleCaseStudies(): CaseStudy[] {
  return [
    { id: '1', title: 'AI-Powered Automation Boosts Efficiency for FinTech Inc.', overview: 'FinTech Inc. leveraged Fynorra\'s custom AI solutions to automate 80% of their manual data entry tasks, leading to significant operational improvements.', results: ['80% reduction in manual data entry', '45% increase in processing speed', '20% decrease in operational costs'], client: 'FinTech Inc.', imageUrl: 'https://placehold.co/800x450.png', slug: 'fintech-ai-automation', dataAiHint: 'finance technology' },
    { id: '2', title: 'E-commerce Giant Achieves 30% Sales Growth with Personalized Chatbots', overview: 'A leading e-commerce platform integrated Fynorra\'s AI chatbots, resulting in enhanced customer engagement and a substantial uplift in sales.', results: ['30% increase in online sales', '24/7 customer support availability', 'Improved customer satisfaction scores by 40%'], client: 'GlobalCart Marketplace', imageUrl: 'https://placehold.co/600x400.png', slug: 'ecommerce-chatbot-growth', dataAiHint: 'online shopping' },
    { id: '3', title: 'Healthcare Provider Enhances Patient Care with Predictive Analytics', overview: 'Fynorra developed a predictive analytics model that helped a major healthcare provider anticipate patient needs and optimize resource allocation.', results: ['15% improvement in patient outcome predictions', 'Optimized staff scheduling', 'Reduced wait times by 25%'], client: 'HealthCare Solutions Group', imageUrl: 'https://placehold.co/600x400.png', slug: 'healthcare-predictive-analytics', dataAiHint: 'medical data' },
  ];
}

const staticTestimonial = {
  quote: "Fynorra’s AI solutions transformed our operations – we couldn’t be happier! Their team delivered beyond our expectations, providing innovative tools that gave us a real competitive edge.",
  author: "Jane Doe, CEO",
  company: "XYZ Corp."
};

export default async function CaseStudiesPage() {
  const allCaseStudies = await getCaseStudies();
  const featuredStudy = allCaseStudies.length > 0 ? allCaseStudies[0] : null;
  const moreStudies = allCaseStudies.length > 1 ? allCaseStudies.slice(1) : (allCaseStudies.length === 1 && !featuredStudy ? allCaseStudies : []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <Briefcase className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Case Studies: Real Impact with Fynorra Solutions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            See how we’ve helped businesses achieve exponential growth with our cutting-edge AI and software solutions.
          </p>
        </header>

        {/* Featured Case Study */}
        {featuredStudy && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">Featured Case Study</h2>
            <Card className="bg-slate-800/50 border-primary/30 shadow-xl overflow-hidden lg:flex lg:flex-row">
              {featuredStudy.imageUrl && (
                <div className="lg:w-2/5">
                  <Image
                    src={featuredStudy.imageUrl}
                    alt={featuredStudy.title}
                    width={800}
                    height={450}
                    className="w-full h-64 lg:h-full object-cover"
                    data-ai-hint={featuredStudy.dataAiHint || "business success"}
                  />
                </div>
              )}
              <div className={`p-6 md:p-10 flex flex-col justify-center ${featuredStudy.imageUrl ? 'lg:w-3/5' : 'w-full'}`}>
                <CardHeader className="p-0 mb-4">
                  <p className="text-sm text-primary font-semibold mb-1 uppercase tracking-wider flex items-center">
                    <Building className="h-4 w-4 mr-2" /> Client: {featuredStudy.client}
                  </p>
                  <CardTitle className="text-3xl font-semibold mb-2">{featuredStudy.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-slate-300 mb-6 text-base leading-relaxed">
                  {featuredStudy.overview}
                </CardDescription>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-primary mb-2 flex items-center">
                    <Target className="h-5 w-5 mr-2" /> Key Results:
                  </h4>
                  <ul className="space-y-2 text-slate-200">
                    {featuredStudy.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-green-400 shrink-0" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/case-studies/${featuredStudy.slug || featuredStudy.id}`} className="mt-auto">
                  <Button size="lg" className="group w-full sm:w-auto">
                    Read Full Case Study <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          </section>
        )}

        {/* More Case Studies */}
        {moreStudies.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">More Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {moreStudies.map((study) => (
                <Card key={study.id} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                  {study.imageUrl && (
                    <Image
                      src={study.imageUrl}
                      alt={study.title}
                      width={600}
                      height={338} // 16:9 aspect ratio
                      className="w-full h-56 object-cover rounded-t-lg"
                      data-ai-hint={study.dataAiHint || "corporate solution"}
                    />
                  )}
                  <CardHeader className="pb-3">
                    <p className="text-xs text-primary font-medium mb-1 uppercase tracking-wide flex items-center">
                      <Building className="h-3.5 w-3.5 mr-1.5" /> {study.client}
                    </p>
                    <CardTitle className="text-xl font-semibold">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">{study.overview}</p>
                  </CardContent>
                  <div className="p-6 pt-2 mt-auto">
                    <Link href={`/case-studies/${study.slug || study.id}`}>
                      <Button variant="outline" className="w-full group text-sm border-primary/50 hover:bg-primary/10 hover:text-primary">
                        Learn More <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
         {moreStudies.length === 0 && !featuredStudy && (
            <p className="text-slate-400 text-center py-10 text-lg">No case studies available at the moment. Please check back soon!</p>
        )}


        {/* Testimonials Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 text-center">
            <MessageSquareQuote className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
            <blockquote className="max-w-3xl mx-auto">
              <p className="text-2xl italic text-slate-200 leading-relaxed">
                "{staticTestimonial.quote}"
              </p>
              <footer className="mt-6">
                <p className="text-lg font-semibold text-primary">{staticTestimonial.author}</p>
                <p className="text-md text-slate-400">{staticTestimonial.company}</p>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
          <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Contact us today to explore how Fynorra's innovative solutions can help your business achieve its full potential.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Contact Us <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
