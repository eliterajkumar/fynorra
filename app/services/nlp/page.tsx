import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle, Mic, Globe, Search, ShieldCheck, Cpu } from "lucide-react";

export default function NLPPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Natural Language Processing (NLP)</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Leverage NLP to build intelligent chatbots, sentiment analysis tools, and text classification systems.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Natural Language Processing?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: MessageCircle, title: "AI-Powered Chatbots", description: "Develop smart conversational agents for customer engagement." },
                { icon: Mic, title: "Speech Recognition", description: "Convert spoken language into text for hands-free applications." },
                { icon: Globe, title: "Language Translation", description: "Translate content across multiple languages using AI." },
                { icon: Search, title: "Information Retrieval", description: "Enhance search engines with AI-driven text processing." },
                { icon: ShieldCheck, title: "Content Moderation", description: "Detect spam, hate speech, and inappropriate content automatically." },
                { icon: Cpu, title: "Automated Text Insights", description: "Analyze customer feedback, social media, and documents efficiently." },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                  <item.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Applications Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Applications of NLP</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Chatbots & Virtual Assistants", description: "Build AI-powered assistants for customer support and automation." },
                { title: "Sentiment Analysis", description: "Analyze emotions and opinions in text data from customers and social media." },
                { title: "Text Classification", description: "Automatically categorize emails, support tickets, and documents." },
                { title: "Voice Assistants", description: "Power speech-enabled applications for smart devices and automation." },
                { title: "AI-Powered Search", description: "Improve search engines with NLP for better query understanding." },
                { title: "Document Summarization", description: "Automatically extract key points from large volumes of text." },
              ].map((app, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">{app.title}</h3>
                  <p className="text-gray-600">{app.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call-to-Action Section */}
          <section className="text-center bg-primary text-white py-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Integrate NLP into Your Business?</h2>
            <p className="text-lg mb-6">Let's discuss how NLP can revolutionize your business operations.</p>
            <Link href="/contact">
              <Button size="lg" variant="secondary">Schedule a Consultation</Button>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
