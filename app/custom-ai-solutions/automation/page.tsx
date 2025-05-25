
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Zap, ListTodo, DatabaseZap, BrainCircuit, Bot, Rocket, Settings, Cpu, Settings2, Users, BarChart, MonitorPlay } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <ListTodo className="h-8 w-8 text-primary mb-2" />,
    title: "Intelligent Task Scheduling",
    description: "Automate complex workflows and task prioritization based on AI-driven insights and predefined rules.",
  },
  {
    icon: <DatabaseZap className="h-8 w-8 text-primary mb-2" />,
    title: "Automated Data Entry & Processing",
    description: "Eliminate manual data entry and streamline data processing tasks with high accuracy and speed.",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary mb-2" />,
    title: "AI-Powered Decision-Making",
    description: "Embed intelligent decision-making capabilities into your processes, enabling faster and more informed actions.",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary mb-2" />,
    title: "Robotic Process Automation (RPA) Enhancement",
    description: "Augment your RPA bots with AI to handle more complex, non-standard tasks and exceptions.",
  },
];

const howItWorksSteps = [
  {
    step: "1",
    title: "Identify Automation Opportunities",
    description: "We analyze your current workflows to pinpoint repetitive, manual, or inefficient tasks suitable for AI automation.",
    icon: <SearchIcon className="h-10 w-10 text-primary" /> // Using SearchIcon
  },
  {
    step: "2",
    title: "Design AI-Powered Solution",
    description: "Custom AI models and logic rules are designed to address the specific automation challenges.",
    icon: <Cpu className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Develop & Integrate",
    description: "The automation solution is built and seamlessly integrated into your existing systems and infrastructure.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Monitor & Optimize",
    description: "We continuously monitor the automated processes, refining and optimizing for peak performance and efficiency.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

const useCases = [
  {
    icon: <Users className="h-8 w-8 text-primary mb-2" />,
    title: "HR Automation",
    description: "Streamline onboarding, resume screening, payroll processing, and employee query handling.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary mb-2" />,
    title: "Marketing & Sales Workflows",
    description: "Automate lead scoring, email campaigns, social media posting, and customer segmentation.",
  },
  {
    icon: <MonitorPlay className="h-8 w-8 text-primary mb-2" />,
    title: "IT Operations (AIOps)",
    description: "Automate incident detection and resolution, system monitoring, and routine maintenance tasks.",
  },
  {
    icon: <FileSpreadsheet className="h-8 w-8 text-primary mb-2" />, // Using FileSpreadsheet
    title: "Finance & Accounting",
    description: "Automate invoice processing, expense reporting, financial reconciliation, and compliance checks.",
  },
];

// Placeholder icons if specific ones are not available
import { SearchIcon, FileSpreadsheet } from 'lucide-react';


export default function AIPoweredAutomationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Zap className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            AI-Powered Automation: Work Smarter, Not Harder
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Optimize workflows, reduce manual tasks, and enhance efficiency with intelligent automation solutions.
          </p>
        </header>

        {/* What is AI Automation Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <BrainCircuit className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Introducing AI-Driven Automation</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              AI-Powered Automation goes beyond traditional automation by leveraging artificial intelligence and machine learning to handle complex, dynamic tasks. It enables systems to learn, adapt, and make intelligent decisions, drastically improving operational efficiency and freeing up human resources for strategic work.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Core Automation Features</h2>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Our Automation Process</h2>
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

        {/* Real-World Use Cases Section */}
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
          <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Efficiency?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Discover how AI-powered automation can revolutionize your business operations.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Automate Smartly with AI <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
