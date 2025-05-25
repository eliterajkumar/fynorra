
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, Zap, Eye, ListChecks, Settings2, Briefcase, Search, Settings, Rocket, ServerLock, KeyRound, UserCheck, CheckCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <ServerLock className="h-8 w-8 text-primary mb-2" />,
    title: "Cloud Security Posture Management (CSPM)",
    description: "Assess and improve the security of your cloud configurations and workloads against industry best practices.",
  },
  {
    icon: <KeyRound className="h-8 w-8 text-primary mb-2" />,
    title: "Identity & Access Management (IAM)",
    description: "Implement robust IAM policies and practices to ensure least privilege access and secure authentication.",
  },
  {
    icon: <Eye className="h-8 w-8 text-primary mb-2" />,
    title: "Threat Detection & Response",
    description: "Set up continuous monitoring, logging, and alerting systems to detect and respond to security threats in real-time.",
  },
  {
    icon: <ListChecks className="h-8 w-8 text-primary mb-2" />,
    title: "Compliance Automation & Auditing",
    description: "Automate compliance checks and reporting for standards like SOC 2, HIPAA, GDPR, and ISO 27001.",
  },
];

const securityProcess = [
  {
    step: "1",
    title: "Security Assessment & Gap Analysis",
    description: "Comprehensive review of your current cloud security posture to identify vulnerabilities and compliance gaps.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Strategy & Policy Development",
    description: "Designing a tailored cloud security strategy and defining clear security policies and procedures.",
    icon: <Briefcase className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Implementation & Hardening",
    description: "Implementing security controls, hardening configurations, and deploying security tools and services.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Continuous Monitoring & Improvement",
    description: "Ongoing monitoring of security events, regular vulnerability assessments, and continuous refinement of security measures.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

const benefits = [
    { title: "Protection Against Threats", description: "Safeguard your data and applications from evolving cyber threats.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Meet Compliance Requirements", description: "Adhere to industry regulations and standards with automated checks.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Build Customer Trust", description: "Demonstrate a commitment to data security and privacy.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Reduce Security Risks", description: "Proactively identify and mitigate vulnerabilities in your cloud environment.", icon: <CheckCircle className="text-green-400" /> },
];

export default function CloudSecurityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Cloud Security & Compliance
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Implement best practices and tools to secure your cloud environments and meet industry compliance standards.
          </p>
        </header>

        {/* Why Cloud Security Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Secure Your Cloud Journey</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              As businesses increasingly move to the cloud, ensuring robust security and maintaining compliance are paramount. Fynorra offers comprehensive cloud security solutions designed to protect your assets, data, and applications from threats while helping you navigate complex regulatory landscapes. We provide expertise in securing cloud infrastructure across major platforms like AWS, Azure, and GCP.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our Cloud Security Offerings</h2>
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

        {/* Our Security Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Cloud Security Implementation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {securityProcess.map((item) => (
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
            <UserCheck className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-10 text-center">Benefits of Our Cloud Security Solutions</h2>
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
          <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Fortify Your Cloud Environment?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Partner with Fynorra to implement robust cloud security and ensure compliance.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Secure Your Cloud <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
