
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, GitBranchPlus, Zap, FastForward, ShieldCheck, Settings2, Briefcase, Search, Settings, Rocket, Repeat, TestTubeDiagonal, CheckCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <GitBranchPlus className="h-8 w-8 text-primary mb-2" />,
    title: "Automated Build & Test",
    description: "Set up automated build processes and comprehensive testing suites for every code commit.",
  },
  {
    icon: <FastForward className="h-8 w-8 text-primary mb-2" />,
    title: "Continuous Deployment",
    description: "Implement automated deployment strategies to multiple environments (dev, staging, prod) with rollback capabilities.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary mb-2" />,
    title: "Infrastructure as Code (IaC) Integration",
    description: "Integrate IaC practices within your CI/CD pipelines for consistent and repeatable environment provisioning.",
  },
  {
    icon: <Repeat className="h-8 w-8 text-primary mb-2" />,
    title: "Pipeline Monitoring & Optimization",
    description: "Implement monitoring and logging for pipeline health, performance, and continuous improvement.",
  },
];

const ciCdProcess = [
  {
    step: "1",
    title: "Assessment & Planning",
    description: "Analyze current development and deployment workflows to design a tailored CI/CD strategy.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Tool Selection & Setup",
    description: "Choosing and configuring the right CI/CD tools (e.g., Jenkins, GitLab CI, GitHub Actions, Azure DevOps).",
    icon: <Briefcase className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Pipeline Development",
    description: "Building the automated pipeline stages: code commit, build, test, deploy, and monitor.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Integration & Training",
    description: "Integrating the CI/CD pipeline with your development environment and training your team on its usage.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

const benefits = [
    { title: "Faster Time to Market", description: "Accelerate software delivery cycles and release features more frequently.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Improved Code Quality", description: "Automated testing catches bugs earlier in the development process.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Increased Developer Productivity", description: "Automate repetitive tasks, allowing developers to focus on coding.", icon: <CheckCircle className="text-green-400" /> },
    { title: "More Reliable Releases", description: "Standardized and automated processes reduce the risk of human error.", icon: <CheckCircle className="text-green-400" /> },
];

export default function CiCdPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <GitBranchPlus className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            CI/CD Pipeline Implementation
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Automate your software delivery lifecycle for faster, more reliable releases with robust CI/CD pipelines.
          </p>
        </header>

        {/* What is CI/CD Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Streamline Your Software Delivery</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Continuous Integration (CI) and Continuous Deployment/Delivery (CD) are crucial DevOps practices that automate the software build, test, and release process. Fynorra helps you implement efficient CI/CD pipelines, enabling your teams to deliver high-quality software faster and more reliably, reducing manual effort and accelerating innovation.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our CI/CD Pipeline Services</h2>
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

        {/* Our CI/CD Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our CI/CD Implementation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {ciCdProcess.map((item) => (
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
            <TestTubeDiagonal className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-10 text-center">Advantages of Implementing CI/CD</h2>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Deployments?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Accelerate your software delivery with Fynorra's expert CI/CD pipeline implementation.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Build Your CI/CD Pipeline <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
