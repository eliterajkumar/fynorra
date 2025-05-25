
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, MessageCircleCode, SearchCheck, Sigma, AlignLeft, Bot, Mail, BarChart3, Brain, Settings2 } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <SearchCheck className="h-8 w-8 text-primary mb-2" />,
    title: "Sentiment Analysis",
    description: "Understand customer opinions and emotions from text data to gauge satisfaction and identify trends.",
  },
  {
    icon: <Sigma className="h-8 w-8 text-primary mb-2" />,
    title: "Entity Recognition",
    description: "Automatically identify and categorize key information in text, such as names, organizations, and locations.",
  },
  {
    icon: <AlignLeft className="h-8 w-8 text-primary mb-2" />,
    title: "Text Summarization",
    description: "Condense large volumes of text into concise summaries, saving time and improving comprehension.",
  },
  {
    icon: <MessageCircleCode className="h-8 w-8 text-primary mb-2" />,
    title: "Language Translation & Generation",
    description: "Translate text between languages and generate human-like text for various applications.",
  },
];

const howItWorksSteps = [
  {
    step: "1",
    title: "Text Input & Preprocessing",
    description: "Raw text data is ingested and cleaned (e.g., removing noise, tokenization) to prepare it for analysis.",
    icon: <FileTextIcon className="h-10 w-10 text-primary" /> // Using a generic file icon
  },
  {
    step: "2",
    title: "AI Model Processing",
    description: "Advanced NLP models (like transformers) analyze linguistic patterns, context, and semantics within the text.",
    icon: <Brain className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Insight Extraction",
    description: "The model extracts meaningful information, such as sentiment, entities, summaries, or translations.",
    icon: <BarChart3 className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Application & Action",
    description: "The extracted insights are used to power applications, automate tasks, or inform decision-making.",
    icon: <Settings2 className="h-10 w-10 text-primary" />
  },
];

const useCases = [
  {
    icon: <Bot className="h-8 w-8 text-primary mb-2" />,
    title: "Intelligent Voice Assistants & Chatbots",
    description: "Power conversational AI that understands user intent and responds naturally.",
  },
  {
    icon: <Mail className="h-8 w-8 text-primary mb-2" />,
    title: "Email Filtering & Categorization",
    description: "Automatically sort emails, detect spam, and categorize messages based on content.",
  },
  {
    icon: <MessagesSquare className="h-8 w-8 text-primary mb-2" />, // Using MessagesSquare
    title: "Chat Summarization & Analysis",
    description: "Summarize long conversations, analyze customer support interactions for quality assurance.",
  },
  {
    icon: <Search className="h-8 w-8 text-primary mb-2" />, // Using Search
    title: "Enhanced Search & Information Retrieval",
    description: "Improve search engine accuracy by understanding the meaning and context of user queries.",
  },
];

// Placeholder icons if specific ones are not available or for variation
import { FileTextIcon, MessagesSquare, Search } from 'lucide-react';


export default function NaturalLanguageProcessingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <MessageCircleCode className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Natural Language Processing (NLP): Understand Human Language
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Unlock the power of text and speech data with AI that comprehends, interprets, and generates human language.
          </p>
        </header>

        {/* What is NLP Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Brain className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">What is Natural Language Processing?</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Natural Language Processing (NLP) is a field of Artificial Intelligence that gives computers the ability to understand, interpret, and generate human language – both written and spoken. It bridges the gap between human communication and computer understanding.
            </p>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Core NLP Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col text-center p-6">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-semibold text-primary mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-slate-300 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How NLP Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
            {/* Horizontal line for larger screens */}
            <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            
            {howItWorksSteps.map((item, index) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="p-4 bg-slate-800/70 rounded-full border-2 border-primary/50 shadow-lg">
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center text-xs font-bold border-2 border-slate-900">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-10 text-center">Real-World Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {useCases.map((useCase) => (
                <Card key={useCase.title} className="bg-slate-800/50 border-slate-700/50 shadow-md p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">{useCase.icon}</div>
                  <CardTitle className="text-xl font-semibold text-primary mb-2">{useCase.title}</CardTitle>
                  <CardDescription className="text-slate-300 text-sm leading-relaxed flex-grow">
                    {useCase.description}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
          <MessageCircleCode className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Leverage the Power of Language?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Let Fynorra help you build NLP solutions that extract valuable insights and automate communication.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Transform Language into Insights <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
