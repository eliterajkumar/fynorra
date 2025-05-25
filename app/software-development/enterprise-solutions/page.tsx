
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Building, Zap, ShieldCheck, Users, Briefcase, Settings2, Search, IterationCcw, Puzzle, Settings, Rocket, Workflow, BarChartBig } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Workflow className="h-8 w-8 text-primary mb-2" />,
    title: "Custom ERP & CRM Systems",
    description: "Tailored Enterprise Resource Planning and Customer Relationship Management solutions to fit your unique workflows.",
  },
  {
    icon: <BarChartBig className="h-8 w-8 text-primary mb-2" />,
    title: "Business Process Automation",
    description: "Automate complex operational processes to improve efficiency, reduce errors, and cut costs.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary mb-2" />,
    title: "Scalable & Secure Architectures",
    description: "Robust software designed for high availability, data integrity, and enterprise-grade security.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary mb-2" />,
    title: "Advanced Data Analytics & Reporting",
    description: "Integrate powerful analytics and reporting tools for actionable insights and informed decision-making.",
  },
];

const solutionLifecycle = [
  {
    step: "1",
    title: "Strategic Consulting",
    description: "In-depth analysis of your business needs, existing systems, and long-term strategic goals.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Solution Architecture & Design",
    description: "Designing a comprehensive architecture that is scalable, secure, and aligned with your objectives.",
    icon: <Puzzle className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Agile Development & Integration",
    description: "Iterative development, seamless integration with existing enterprise systems, and continuous quality assurance.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Deployment, Training & Support",
    description: "Full deployment services, comprehensive user training, and ongoing enterprise-level support.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

export default function EnterpriseSoftwarePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Building className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Enterprise Software Solutions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Complex software systems designed for large organizations to streamline operations and enhance productivity.
          </p>
        </header>

        {/* Why Enterprise Solutions Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Powering Your Large-Scale Operations</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Enterprises require robust, scalable, and secure software solutions to manage complex operations, large datasets, and diverse user needs. Fynorra specializes in developing custom enterprise software that integrates seamlessly with your existing infrastructure, optimizes workflows, and provides a solid foundation for growth and innovation.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our Enterprise Solution Capabilities</h2>
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

        {/* Our Solution Lifecycle Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Enterprise Solution Lifecycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {solutionLifecycle.map((item, index) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Enterprise Systems?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Partner with Fynorra to build enterprise software that drives efficiency and future-proofs your business.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Discuss Your Enterprise Needs <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
