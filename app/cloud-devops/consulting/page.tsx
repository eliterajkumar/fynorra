
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Settings2, Zap, MessageSquare, Lightbulb, Users, Settings, Search, Briefcase, Rocket, Presentation, Wrench, CheckCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <MessageSquare className="h-8 w-8 text-primary mb-2" />,
    title: "DevOps Strategy & Roadmap",
    description: "Developing tailored DevOps strategies that align with your business goals and technology landscape.",
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary mb-2" />,
    title: "Process Automation & Optimization",
    description: "Identifying and automating manual processes across your development lifecycle to improve efficiency.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary mb-2" />,
    title: "Toolchain Modernization",
    description: "Advising on and implementing modern DevOps tools for CI/CD, monitoring, and collaboration.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary mb-2" />,
    title: "Team Training & Cultural Transformation",
    description: "Providing training and guidance to foster a DevOps culture within your organization.",
  },
];

const consultingProcess = [
  {
    step: "1",
    title: "Discovery & Assessment",
    description: "Understanding your current processes, challenges, and objectives through workshops and analysis.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Strategy Formulation",
    description: "Developing a customized DevOps roadmap, including tool recommendations and implementation plans.",
    icon: <Briefcase className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Implementation & Integration",
    description: "Implementing the defined strategies, tools, and processes, integrating them into your workflows.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Mentoring & Continuous Improvement",
    description: "Providing ongoing support, mentoring your teams, and helping you continuously optimize your DevOps practices.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

const benefits = [
    { title: "Accelerated Delivery", description: "Streamline workflows to release software faster and more frequently.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Enhanced Collaboration", description: "Foster better communication and collaboration between development and operations teams.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Improved Quality & Reliability", description: "Implement best practices for testing and automation to build more stable systems.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Increased Innovation", description: "Free up resources from manual tasks to focus on innovation and value creation.", icon: <CheckCircle className="text-green-400" /> },
];

export default function DevOpsConsultingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Settings2 className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            DevOps Consulting & Automation
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Optimize your development lifecycle with expert DevOps consulting and automation solutions tailored to your needs.
          </p>
        </header>

        {/* What is DevOps Consulting Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Lightbulb className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Transform Your Software Delivery</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              DevOps is a cultural and operational shift that aims to shorten the systems development life cycle and provide continuous delivery with high software quality. Fynorra's DevOps consulting services help your organization adopt these principles, streamline workflows, automate processes, and foster a culture of collaboration and innovation.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our DevOps Consulting Services</h2>
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

        {/* Our Consulting Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our DevOps Consulting Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {consultingProcess.map((item) => (
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
            <Presentation className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-10 text-center">Advantages of DevOps Adoption</h2>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Development Lifecycle?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Partner with Fynorra for expert DevOps consulting and achieve new levels of efficiency and innovation.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Transform Your DevOps <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
