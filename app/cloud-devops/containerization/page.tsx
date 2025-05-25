
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Container, Zap, Box, Server, Settings2, Briefcase, Search, Settings, Rocket, Cuboid, Network, CheckCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Box className="h-8 w-8 text-primary mb-2" />,
    title: "Docker Containerization",
    description: "Packaging applications and their dependencies into portable Docker containers for consistency across environments.",
  },
  {
    icon: <Cuboid className="h-8 w-8 text-primary mb-2" />,
    title: "Kubernetes Orchestration (EKS, GKE, AKS)",
    description: "Deploying, managing, and scaling containerized applications using Kubernetes on major cloud platforms.",
  },
  {
    icon: <Server className="h-8 w-8 text-primary mb-2" />,
    title: "Microservices Architecture",
    description: "Designing and implementing microservices architectures that leverage containerization for agility and scalability.",
  },
  {
    icon: <Network className="h-8 w-8 text-primary mb-2" />,
    title: "Container Registry & Security",
    description: "Setting up private container registries and implementing security best practices for container images.",
  },
];

const containerizationProcess = [
  {
    step: "1",
    title: "Application Analysis",
    description: "Assessing your applications to determine suitability for containerization and defining a strategy.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Dockerfile & Image Creation",
    description: "Writing efficient Dockerfiles and building optimized, secure container images for your applications.",
    icon: <Briefcase className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Orchestration Setup",
    description: "Configuring Kubernetes or other orchestration platforms to manage your containerized workloads.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Deployment & Monitoring",
    description: "Deploying containers to your chosen environment and setting up monitoring for health and performance.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

const benefits = [
    { title: "Portability & Consistency", description: "Run applications consistently across different environments (dev, test, prod).", icon: <CheckCircle className="text-green-400" /> },
    { title: "Improved Scalability", description: "Easily scale applications up or down based on demand with orchestration tools.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Faster Deployment Cycles", description: "Streamline the deployment process for quicker releases and updates.", icon: <CheckCircle className="text-green-400" /> },
    { title: "Resource Efficiency", description: "Optimize resource utilization compared to traditional virtual machines.", icon: <CheckCircle className="text-green-400" /> },
];

export default function ContainerizationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Container className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Containerization & Orchestration
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Leverage Docker and Kubernetes to build, deploy, and manage scalable and resilient containerized applications.
          </p>
        </header>

        {/* What is Containerization Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Modernize Your Application Deployment</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Containerization, powered by tools like Docker, packages applications with all their dependencies into isolated units. Orchestration platforms like Kubernetes then automate the deployment, scaling, and management of these containers. Fynorra helps you adopt these technologies to achieve greater agility, portability, and efficiency in your software lifecycle.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our Containerization Services</h2>
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

        {/* Our Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Containerization & Orchestration Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {containerizationProcess.map((item) => (
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
            <h2 className="text-3xl font-bold mb-10 text-center">Why Containerize Your Applications?</h2>
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
          <Container className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Embrace Containerization?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Transform your application deployment and management with Fynorra's containerization and orchestration expertise.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Containerize Your Apps <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
