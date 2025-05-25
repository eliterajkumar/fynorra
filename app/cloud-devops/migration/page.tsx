
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, CloudUpload, Zap, Route, ShieldCheck, Settings2, Briefcase, Search, Settings, Rocket, TrendingUp, BarChart, CheckCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <CloudUpload className="h-8 w-8 text-primary mb-2" />,
    title: "Comprehensive Cloud Assessment",
    description: "Detailed analysis of your existing infrastructure, applications, and business goals to identify the optimal cloud strategy.",
  },
  {
    icon: <Route className="h-8 w-8 text-primary mb-2" />,
    title: "Tailored Migration Roadmap",
    description: "Development of a phased migration plan, minimizing downtime and ensuring a smooth transition to the cloud (AWS, Azure, GCP).",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary mb-2" />,
    title: "Secure & Compliant Migration",
    description: "Ensuring data integrity, security, and compliance throughout the migration process and in the new cloud environment.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary mb-2" />,
    title: "Post-Migration Optimization",
    description: "Optimizing cloud resources for cost-efficiency, performance, and scalability after successful migration.",
  },
];

const migrationProcess = [
  {
    step: "1",
    title: "Discovery & Assessment",
    description: "Deep dive into your current IT landscape, application dependencies, and business objectives for cloud adoption.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Strategy & Planning",
    description: "Defining the right cloud model (IaaS, PaaS, SaaS), selecting cloud providers, and creating a detailed migration roadmap.",
    icon: <Briefcase className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Execution & Migration",
    description: "Careful execution of the migration plan, including data transfer, application re-platforming or re-hosting, and testing.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Optimization & Governance",
    description: "Post-migration, we focus on optimizing performance, managing costs, and implementing cloud governance best practices.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

const benefits = [
    { title: "Reduced IT Costs", description: "Optimize operational expenses by leveraging pay-as-you-go cloud models.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Enhanced Scalability", description: "Easily scale resources up or down based on business demand.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Improved Business Agility", description: "Respond faster to market changes with flexible cloud infrastructure.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Better Disaster Recovery", description: "Robust backup and recovery solutions inherent in cloud platforms.", icon: <CheckCircle className="text-green-400" /> },
];


export default function CloudMigrationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <CloudUpload className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Cloud Migration & Strategy
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Seamlessly transition your business to the cloud with our expert migration services and strategic planning.
          </p>
        </header>

        {/* Why Cloud Migration Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Unlock the Power of the Cloud</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Migrating to the cloud offers unparalleled opportunities for scalability, cost-efficiency, and innovation. Fynorra provides end-to-end cloud migration services, from initial strategy and planning to execution and post-migration optimization. We help you choose the right cloud model and provider to meet your unique business needs, ensuring a secure and smooth transition.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our Cloud Migration Services</h2>
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

        {/* Our Migration Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Migration Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {migrationProcess.map((item) => (
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
            <BarChart className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-10 text-center">Benefits of Cloud Migration with Fynorra</h2>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Migrate to the Cloud?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Let Fynorra guide your journey to the cloud for enhanced performance and strategic advantage.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Discuss Your Cloud Strategy <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
