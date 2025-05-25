
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, ThumbsUp, ArrowUpCircle, Smile, Users, PlayCircle, GraduationCap, BookOpen, Brain, Settings2 } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: <ArrowUpCircle className="h-8 w-8 text-primary mb-2" />,
    title: "Increased Engagement",
    description: "Keep users on your platform longer by suggesting content and products they'll love.",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary mb-2" />, // Using DollarSign for upsell
    title: "Upsell & Cross-sell Opportunities",
    description: "Subtly guide users towards higher-value items or complementary products.",
  },
  {
    icon: <Smile className="h-8 w-8 text-primary mb-2" />,
    title: "Enhanced Customer Satisfaction",
    description: "Make users feel understood and valued by providing relevant and timely suggestions.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary mb-2" />,
    title: "Personalized User Experiences",
    description: "Tailor content and product discovery to individual preferences and behavior.",
  },
];

const howItWorksSteps = [
  {
    step: "1",
    title: "Data Collection & Analysis",
    description: "Gather data on user behavior, item characteristics, and user preferences (e.g., clicks, views, purchases, ratings).",
    icon: <DatabaseIcon className="h-10 w-10 text-primary" /> // Using DatabaseIcon
  },
  {
    step: "2",
    title: "AI Model Training",
    description: "Machine learning algorithms (like collaborative filtering or content-based filtering) are trained on this data to find patterns.",
    icon: <Brain className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Generate Personalized Suggestions",
    description: "The trained model predicts what a user might like and generates a ranked list of recommendations.",
    icon: <ListChecksIcon className="h-10 w-10 text-primary" /> // Using ListChecksIcon
  },
  {
    step: "4",
    title: "Display & Refine",
    description: "Recommendations are displayed to the user, and the system continuously learns and refines suggestions based on new interactions.",
    icon: <Settings2 className="h-10 w-10 text-primary" />
  },
];

const useCases = [
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary mb-2" />,
    title: "E-commerce Platforms",
    description: "Suggest products based on browsing history, past purchases, and similar user preferences to boost sales.",
  },
  {
    icon: <PlayCircle className="h-8 w-8 text-primary mb-2" />,
    title: "Streaming Services (Video/Music)",
    description: "Recommend movies, shows, or songs based on viewing habits and content similarity.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary mb-2" />,
    title: "News & Content Platforms",
    description: "Personalize news feeds and article suggestions to keep readers engaged.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary mb-2" />,
    title: "Education Portals",
    description: "Suggest relevant courses, learning materials, or study groups based on a student's progress and interests.",
  },
];

// Placeholder icons if specific ones are not available
import { DollarSign, ShoppingCart, DatabaseIcon, ListChecksIcon } from 'lucide-react';

export default function RecommendationEnginesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <ThumbsUp className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Recommendation Engines: Powering Personalization
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Deliver tailored experiences by suggesting the most relevant content, products, and services to each user.
          </p>
        </header>

        {/* What is a Recommendation Engine Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Brain className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">What is a Recommendation Engine?</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              A recommendation engine is an AI-powered system that predicts users' interests and suggests items (like products, articles, or movies) they are likely to find appealing. It analyzes past behavior, item attributes, and user similarities to deliver personalized suggestions.
            </p>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col text-center p-6">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <CardTitle className="text-xl font-semibold text-primary mb-2">{benefit.title}</CardTitle>
                <CardDescription className="text-slate-300 text-sm leading-relaxed flex-grow">
                  {benefit.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How Recommendation Engines Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
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
            <h2 className="text-3xl font-bold mb-10 text-center">Applications Across Platforms</h2>
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
          <ThumbsUp className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Deliver Hyper-Personalized Experiences?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Implement a smart recommendation engine and watch your engagement and conversions soar.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Personalize Your Platform <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
