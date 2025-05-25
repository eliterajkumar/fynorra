
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, RefreshCw, Zap, ShieldCheck, Cloud, Server, Settings2, Search, IterationCcw, Puzzle, Settings, Rocket, BarChart } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Cloud className="h-8 w-8 text-primary mb-2" />,
    title: "Cloud Migration & Re-architecting",
    description: "Moving legacy applications to modern cloud platforms (AWS, Azure, GCP) and optimizing their architecture.",
  },
  {
    icon: <Server className="h-8 w-8 text-primary mb-2" />,
    title: "Platform Modernization",
    description: "Upgrading underlying technologies, databases, and frameworks to improve performance and maintainability.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary mb-2" />,
    title: "Security Enhancements",
    description: "Integrating modern security practices and tools to protect against current and future threats.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary mb-2" />,
    title: "Performance Optimization",
    description: "Refactoring code and infrastructure to enhance speed, scalability, and user experience.",
  },
];

const modernizationProcess = [
  {
    step: "1",
    title: "Assessment & Analysis",
    description: "Comprehensive review of your existing systems, identifying pain points, risks, and modernization opportunities.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Strategy & Roadmap",
    description: "Developing a tailored modernization strategy and roadmap aligned with your business objectives and budget.",
    icon: <Puzzle className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Phased Implementation",
    description: "Iterative execution of the modernization plan, ensuring minimal disruption to ongoing operations.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Testing, Deployment & Support",
    description: "Rigorous testing, seamless deployment of modernized components, and continuous support.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

export default function LegacyModernizationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <RefreshCw className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Legacy System Modernization
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Upgrade and transform your outdated systems into modern, efficient, and maintainable platforms.
          </p>
        </header>

        {/* Why Modernize Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Future-Proof Your Technology</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Legacy systems can hinder growth, increase operational costs, and pose security risks. Our modernization services help you transform these outdated applications into agile, scalable, and secure platforms. By leveraging modern technologies and architectural patterns, we ensure your systems can support your business now and in the future.
            </p>
          </div>
        </section>

        {/* Key Modernization Services Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our Modernization Expertise</h2>
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

        {/* Our Modernization Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Modernization Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {modernizationProcess.map((item, index) => (
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
        
        {/* Call to Action Section */}
        <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
          <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Modernize Your Legacy Systems?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Contact Fynorra to discuss how we can help you transition to a modern, efficient, and secure technology landscape.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Transform Your Technology <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
