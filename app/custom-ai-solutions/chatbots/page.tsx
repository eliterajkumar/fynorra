
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Bot, MessageSquare, Zap, HelpCircle, ShoppingCart, BookOpen, Users, Settings2, GitBranchPlus, Repeat } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Repeat className="h-8 w-8 text-primary mb-2" />,
    title: "24/7 Automated Support",
    description: "Provide instant responses to customer queries anytime, day or night, improving satisfaction and reducing wait times.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary mb-2" />,
    title: "Lead Generation & Qualification",
    description: "Capture and qualify leads directly through chat, engaging visitors proactively and guiding them through your sales funnel.",
  },
  {
    icon: <HelpCircle className="h-8 w-8 text-primary mb-2" />,
    title: "Automated FAQs",
    description: "Instantly answer frequently asked questions, freeing up your human agents to handle more complex issues.",
  },
  {
    icon: <GitBranchPlus className="h-8 w-8 text-primary mb-2" />,
    title: "Seamless CRM Integration",
    description: "Connect your chatbots with your existing CRM and other business tools for a unified data flow and personalized interactions.",
  },
];

const howItWorksSteps = [
  {
    step: "1. Define Goals & Scope",
    title: "Understand Your Needs",
    description: "We collaborate to understand your business objectives, target audience, and the specific tasks you want the chatbot to handle.",
  },
  {
    step: "2. Design Conversation Flows",
    title: "Craft Engaging Dialogues",
    description: "Our team designs intuitive and natural conversation flows, ensuring your chatbot is helpful and user-friendly.",
  },
  {
    step: "3. Develop & Train AI",
    title: "Build Intelligence",
    description: "We develop the chatbot using advanced NLP and machine learning, training it on relevant data to understand and respond accurately.",
  },
  {
    step: "4. Integrate & Deploy",
    title: "Go Live",
    description: "The chatbot is integrated with your website, apps, or messaging platforms, ready to engage with your users.",
  },
];

const useCases = [
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary mb-2" />,
    title: "E-commerce",
    description: "Assist shoppers with product discovery, order tracking, and personalized recommendations, boosting sales and engagement.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary mb-2" />,
    title: "Customer Support",
    description: "Handle a large volume of support requests, provide instant solutions, and escalate complex issues to human agents when needed.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary mb-2" />,
    title: "Education",
    description: "Offer students instant access to information, course details, and administrative support, enhancing the learning experience.",
  },
];

export default function IntelligentChatbotsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Bot className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Intelligent Chatbots: Revolutionize User Interaction
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Engage customers, automate support, and drive growth with AI-powered chatbots tailored to your business.
          </p>
        </header>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Key Features</h2>
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
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connecting lines - pseudo-elements for desktop */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/30 transform -translate-y-1/2 -z-10"></div>
              {howItWorksSteps.map((item, index) => (
                <div key={item.step} className="flex flex-col items-center text-center relative px-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mb-4 border-2 border-slate-900 z-10">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Real-World Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">{useCase.icon}</div>
                <CardTitle className="text-xl font-semibold text-primary mb-2">{useCase.title}</CardTitle>
                <CardDescription className="text-slate-300 text-sm leading-relaxed flex-grow">
                  {useCase.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
          <MessageSquare className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Customer Engagement?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Let's build an intelligent chatbot that drives results for your business.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Launch Your First AI Chatbot Today <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
