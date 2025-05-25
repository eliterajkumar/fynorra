
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Share2, Zap, ShieldCheck, Rows, GitMerge, CloudCog, Settings2, Search, IterationCcw, Puzzle, Settings, Rocket, Network } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Network className="h-8 w-8 text-primary mb-2" />,
    title: "Custom API Development",
    description: "Building tailored APIs (REST, GraphQL) that meet your specific data exchange and functionality requirements.",
  },
  {
    icon: <GitMerge className="h-8 w-8 text-primary mb-2" />,
    title: "Third-Party API Integration",
    description: "Seamlessly connect your applications with external services, payment gateways, social media, and more.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary mb-2" />,
    title: "Secure & Scalable APIs",
    description: "Implementing robust security measures (OAuth, JWT) and designing APIs for high performance and scalability.",
  },
  {
    icon: <Rows className="h-8 w-8 text-primary mb-2" />,
    title: "API Documentation & Management",
    description: "Providing clear documentation (e.g., Swagger/OpenAPI) and API management solutions.",
  },
];

const integrationProcess = [
  {
    step: "1",
    title: "Requirement Analysis",
    description: "Understanding your integration needs, data flows, and existing system architecture.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "API Design & Strategy",
    description: "Designing the API structure, choosing appropriate protocols, and defining security measures.",
    icon: <Puzzle className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Development & Implementation",
    description: "Building the custom API or integrating third-party APIs with meticulous coding standards.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Testing & Deployment",
    description: "Rigorous testing for functionality, security, and performance before deployment.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

export default function ApiDevelopmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Share2 className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            API Development & Integration
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Robust and secure APIs to connect your systems, enable third-party integrations, and power new services.
          </p>
        </header>

        {/* Why APIs Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <CloudCog className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Unlock Seamless Connectivity</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              APIs (Application Programming Interfaces) are the backbone of modern software, enabling different systems and applications to communicate and share data effectively. We develop custom APIs and integrate third-party services to streamline your workflows, enhance functionality, and create new revenue streams.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our API Development Services</h2>
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

        {/* Our Integration Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our API Integration Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {integrationProcess.map((item, index) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Connect Your Digital Ecosystem?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Let Fynorra build the powerful APIs you need to drive innovation and efficiency.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Integrate Your Systems <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
