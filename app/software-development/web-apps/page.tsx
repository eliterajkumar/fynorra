
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Laptop, Zap, Rows, LayoutTemplate, ShieldCheck, Rocket, Settings2, Search, IterationCcw, Puzzle, Settings, Users, MonitorSmartphone } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Rows className="h-8 w-8 text-primary mb-2" />,
    title: "Scalable Architectures",
    description: "Designed to grow with your business, handling increasing loads and users efficiently.",
  },
  {
    icon: <MonitorSmartphone className="h-8 w-8 text-primary mb-2" />,
    title: "Responsive Design",
    description: "Flawless user experience across all devices – desktops, tablets, and mobiles.",
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-primary mb-2" />,
    title: "Modern Tech Stack",
    description: "Utilizing cutting-edge technologies like Next.js, React, and Node.js for robust solutions.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary mb-2" />,
    title: "Secure & Reliable",
    description: "Implementing industry best practices for data security and application stability.",
  },
];

const developmentLifecycle = [
  {
    step: "1",
    title: "Discovery & Planning",
    description: "Understanding your goals, target audience, and project scope through detailed consultations.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "UI/UX Design",
    description: "Creating intuitive, engaging interfaces and prototypes that focus on user experience.",
    icon: <Puzzle className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Agile Development",
    description: "Iterative sprints, continuous feedback, and transparent progress using agile methodologies.",
    icon: <IterationCcw className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Rigorous Testing",
    description: "Ensuring quality, performance, and security through comprehensive testing phases.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "5",
    title: "Deployment & Launch",
    description: "Smooth deployment to your preferred hosting environment with post-launch checks.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
  {
    step: "6",
    title: "Support & Maintenance",
    description: "Providing ongoing support, updates, and maintenance to ensure optimal performance.",
    icon: <Users className="h-10 w-10 text-primary" />
  },
];

export default function WebApplicationDevelopmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Laptop className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Custom Web Application Development
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Building powerful, scalable, and user-centric web solutions tailored to your business needs.
          </p>
        </header>

        {/* What We Offer Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Transform Your Digital Presence</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              In today's digital landscape, a robust web application is crucial for business success. We specialize in crafting custom web solutions that not only look great but also perform flawlessly, drive user engagement, and achieve your specific business objectives. From dynamic e-commerce platforms to complex enterprise portals, we build applications that deliver results.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Core Features of Our Web Applications</h2>
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

        {/* Our Development Lifecycle Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Development Lifecycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {developmentLifecycle.map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center p-4 bg-slate-800/40 rounded-lg shadow-md border border-slate-700/50">
                <div className="relative mb-4">
                  <div className="p-3 bg-primary/10 rounded-full border-2 border-primary/30">
                    {item.icon}
                  </div>
                  <span className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold border-2 border-slate-900">
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
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Next-Gen Web Application?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Partner with Fynorra to bring your web vision to life with a solution that's perfectly tailored to your needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Discuss Your Project <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
