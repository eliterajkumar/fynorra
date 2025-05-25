
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Terminal, Zap, FileCode, Repeat, ShieldCheck, Settings2, Briefcase, Search, Settings, Rocket, Layers, CheckCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <FileCode className="h-8 w-8 text-primary mb-2" />,
    title: "Automated Provisioning",
    description: "Define and manage your cloud infrastructure using code for automated and repeatable deployments (Terraform, CloudFormation).",
  },
  {
    icon: <Repeat className="h-8 w-8 text-primary mb-2" />,
    title: "Version Control & Collaboration",
    description: "Store infrastructure code in version control systems (Git) to track changes, collaborate, and enable rollbacks.",
  },
  {
    icon: <Layers className="h-8 w-8 text-primary mb-2" />,
    title: "Environment Consistency",
    description: "Ensure consistency across development, staging, and production environments, reducing configuration drift.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary mb-2" />,
    title: "Security & Compliance as Code",
    description: "Embed security policies and compliance checks directly into your infrastructure code.",
  },
];

const iacProcess = [
  {
    step: "1",
    title: "Infrastructure Assessment",
    description: "Review your current infrastructure and define requirements for IaC adoption.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Tool Selection & Strategy",
    description: "Choosing the right IaC tools (e.g., Terraform, Ansible, Pulumi) and developing a modular coding strategy.",
    icon: <Briefcase className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Code Development & Testing",
    description: "Writing infrastructure code, implementing reusable modules, and testing configurations thoroughly.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Pipeline Integration & Deployment",
    description: "Integrating IaC into CI/CD pipelines for automated provisioning and management of infrastructure.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

const benefits = [
    { title: "Speed & Agility", description: "Rapidly provision and update infrastructure, accelerating development cycles.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Cost Savings", description: "Reduce manual effort and optimize resource usage through automation.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Reduced Risk", description: "Minimize human error and ensure consistent configurations across environments.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Improved Scalability", description: "Easily scale infrastructure up or down as code, responding to business needs.", icon: <CheckCircle className="text-green-400" /> },
];

export default function IaCPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Terminal className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Infrastructure as Code (IaC)
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Manage and provision your cloud infrastructure through code for automation, consistency, and repeatability.
          </p>
        </header>

        {/* What is IaC Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Define Your Infrastructure Programmatically</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Infrastructure as Code (IaC) is the practice of managing and provisioning computing infrastructure (networks, virtual machines, load balancers, etc.) through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools. Fynorra helps you adopt IaC to automate your infrastructure, improve reliability, and accelerate your DevOps practices.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our IaC Services</h2>
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

        {/* Our IaC Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our IaC Implementation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {iacProcess.map((item) => (
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
            <h2 className="text-3xl font-bold mb-10 text-center">Key Benefits of IaC</h2>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Infrastructure?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Implement Infrastructure as Code with Fynorra to build a resilient, scalable, and efficient cloud foundation.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Adopt IaC Today <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
