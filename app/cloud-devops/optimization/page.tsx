import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Terminal, Zap, FileCode, Repeat, ShieldCheck, Settings2, Briefcase, Search, Settings, Rocket, Layers, CheckCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <FileCode className="h-8 w-8 text-primary mb-2" />,
    title: "Model Deployment Pipelines",
    description: "Seamlessly deploy fine-tuned models using secure, scalable pipelines to edge or cloud environments.",
  },
  {
    icon: <Repeat className="h-8 w-8 text-primary mb-2" />,
    title: "Version Control & Monitoring",
    description: "Track model versions, performance metrics, and manage rollbacks with integrated monitoring tools.",
  },
  {
    icon: <Layers className="h-8 w-8 text-primary mb-2" />,
    title: "Environment Isolation",
    description: "Deploy models in isolated containers or VMs to ensure stability, security, and repeatability.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary mb-2" />,
    title: "Secure APIs & Access Control",
    description: "Expose models via secure APIs with authentication, rate limiting, and role-based access control.",
  },
];

const deploymentProcess = [
  {
    step: "1",
    title: "Model Evaluation",
    description: "Assess the performance and compatibility of your fine-tuned models for production deployment.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Infrastructure Selection",
    description: "Choose between edge, on-prem, or cloud infrastructure depending on use-case and scale.",
    icon: <Briefcase className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Containerization & Optimization",
    description: "Package models using Docker or serverless functions, and optimize latency and memory use.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "CI/CD Integration & API Hosting",
    description: "Automate deployment pipelines and expose model APIs with monitoring and auto-scaling enabled.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

const benefits = [
    { title: "Production-Ready APIs", description: "Expose AI capabilities instantly with REST or GraphQL endpoints.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Faster Time to Market", description: "Deploy fine-tuned models in hours, not weeks.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Cost-Efficient Scaling", description: "Autoscale your model services to handle variable traffic loads.", icon: <CheckCircle className="text-green-400" /> },
    { title: "End-to-End Automation", description: "From training to deployment, keep your AI lifecycle streamlined and automated.", icon: <CheckCircle className="text-green-400" /> },
];

export default function AIDeploymentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Rocket className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            AI Model Deployment Services
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Deploy your custom AI models with scalability, reliability, and security using our automated deployment systems.
          </p>
        </header>

        {/* What is Deployment Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Effortless AI Model Delivery</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Fynorra enables you to take your custom-trained models from development to production in a fully automated and secure manner. Whether you're serving real-time predictions or large-scale batch jobs, our platform ensures your models are production-ready.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Deployment Capabilities</h2>
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

        {/* Our Deployment Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How We Deploy Your Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {deploymentProcess.map((item) => (
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

        {/* Benefits Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <Zap className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-10 text-center">Why Deploy with Fynorra</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="bg-slate-800/60 border-slate-700/60 p-6">
                  <div className="flex items-center mb-3">
                    {benefit.icon}
                    <h3 className="text-lg font-semibold text-primary ml-2">{benefit.title}</h3>
                  </div>
                  <p className="text-slate-300 text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
          <Terminal className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Launch Your AI Model with Confidence</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Let Fynorra handle the complexities of deployment, so you can focus on delivering AI-powered experiences.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Deploy Now <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
