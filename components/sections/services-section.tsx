import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, BrainCircuit, Code2, CloudCog, Zap, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  useCases: string[];
  link: string;
}

const services: Service[] = [
  {
    id: "services-ai",
    icon: Bot,
    title: "Custom AI Chatbots",
    description: "Build intelligent, human-like chatbots that understand context, learn from interactions, and provide 24/7 customer support across multiple channels.",
    features: ["Natural Language Processing", "Multi-channel Integration", "Custom Training", "Analytics Dashboard"],
    useCases: ["Customer Service", "Lead Generation", "E-commerce Support", "Healthcare Assistance"],
    link: "/custom-ai-solutions"
  },
  {
    id: "ai-integration",
    icon: Zap,
    title: "AI Integration & Automation",
    description: "Seamlessly integrate AI capabilities into your existing systems and workflows to automate complex processes and boost operational efficiency.",
    features: ["API Integration", "Workflow Automation", "Data Processing", "Real-time Analytics"],
    useCases: ["Process Automation", "Data Analysis", "Predictive Maintenance", "Quality Control"],
    link: "/custom-ai-solutions"
  },
  {
    id: "services-dev",
    icon: Code2,
    title: "Software Development",
    description: "End-to-end software development services, from web and mobile applications to complex enterprise solutions with modern technologies.",
    features: ["Full-stack Development", "Mobile Apps", "API Development", "Legacy Modernization"],
    useCases: ["Web Applications", "Mobile Solutions", "Enterprise Software", "E-commerce Platforms"],
    link: "/software-development"
  },
  {
    id: "services-cloud",
    icon: CloudCog,
    title: "Cloud & DevOps",
    description: "Optimize your infrastructure with scalable cloud solutions and DevOps practices for maximum reliability, security, and performance.",
    features: ["Cloud Migration", "CI/CD Pipelines", "Infrastructure as Code", "Monitoring & Security"],
    useCases: ["Cloud Migration", "DevOps Transformation", "Scalable Infrastructure", "Disaster Recovery"],
    link: "/cloud-devops"
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 sm:py-24 bg-background" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Enterprise AI & Software Solutions
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Comprehensive AI and IT solutions designed to transform your business operations, 
            enhance customer experiences, and drive sustainable growth through innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <Card
              key={service.title}
              id={service.id}
              className="group bg-card/50 hover:bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                  <service.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-foreground/70 flex-grow">
                <p className="mb-4">{service.description}</p>
                
                {/* Key Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {service.features.map((feature) => (
                      <span key={feature} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Use Cases */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Perfect For:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {service.useCases.map((useCase) => (
                      <span key={useCase} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={service.link}>
                  <Button variant="outline" className="w-full group text-sm border-primary/50 hover:bg-primary/10 hover:text-primary">
                    Learn More <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industry Solutions */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">Industry-Specific Solutions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Healthcare", icon: "🏥" },
              { name: "Finance", icon: "💳" },
              { name: "E-commerce", icon: "🛒" },
              { name: "Manufacturing", icon: "🏭" },
              { name: "Education", icon: "🎓" },
              { name: "Real Estate", icon: "🏠" },
              { name: "Legal", icon: "⚖️" },
              { name: "Marketing", icon: "📈" }
            ].map((industry) => (
              <div key={industry.name} className="p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="text-2xl mb-2">{industry.icon}</div>
                <div className="text-sm font-medium text-foreground">{industry.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
