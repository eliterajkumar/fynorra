
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Code2, Laptop, Smartphone, Layers, FileSearch, Palette, Codepen, Rocket, Zap } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { icons as lucideIcons, type LucideProps, HelpCircle } from 'lucide-react';

const renderIcon = (name: string | undefined, props?: LucideProps) => {
  if (!name) return <HelpCircle {...props} />;
  const LucideIconComponent = lucideIcons[name as keyof typeof lucideIcons];
  if (!LucideIconComponent) {
    return <HelpCircle {...props} />;
  }
  return <LucideIconComponent {...props} />;
};

interface SoftwareService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  link: string;
}

async function getSoftwareServices(): Promise<SoftwareService[]> {
  try {
    const servicesCollection = collection(db, "softwareServices");
    const q = query(servicesCollection, orderBy("title", "asc"));
    const servicesSnapshot = await getDocs(q);
    const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SoftwareService));
    
    if (servicesList.length === 0) {
        return getSampleSoftwareServices();
    }
    return servicesList;
  } catch (error) {
    console.error("Error fetching software services from Firestore:", error);
    return getSampleSoftwareServices();
  }
}

function getSampleSoftwareServices(): SoftwareService[] {
  return [
    { id: '1', title: 'Web Application Development', description: 'Custom, scalable web applications built with modern technologies to meet your business objectives.', iconName: 'Laptop', link: '/software-development/web-apps' },
    { id: '2', title: 'Mobile App Development', description: 'Engaging and high-performance iOS and Android mobile applications for a wide range of use cases.', iconName: 'Smartphone', link: '/software-development/mobile-apps' },
    { id: '3', title: 'API Development & Integration', description: 'Robust and secure APIs to connect your systems, enable third-party integrations, and power new services.', iconName: 'Share2', link: '/software-development/api-integration' },
    { id: '4', title: 'Enterprise Software Solutions', description: 'Complex software systems designed for large organizations to streamline operations and enhance productivity.', iconName: 'Building', link: '/software-development/enterprise-solutions' },
    { id: '5', title: 'UI/UX Design', description: 'User-centric design services to create intuitive, accessible, and visually appealing digital experiences.', iconName: 'PenTool', link: '/software-development/ui-ux-design' },
    { id: '6', title: 'Legacy System Modernization', description: 'Upgrade and transform your outdated systems into modern, efficient, and maintainable platforms.', iconName: 'RefreshCw', link: '/software-development/modernization' },
  ];
}

const developmentProcessSteps = [
  { title: "Requirement Analysis", description: "We start by thoroughly understanding your vision, goals, and technical requirements.", iconName: "FileSearch" },
  { title: "Design & Prototyping", description: "Crafting intuitive user interfaces and interactive prototypes to visualize the end product.", iconName: "Palette" },
  { title: "Development & Testing", description: "Agile development sprints coupled with rigorous testing to ensure quality and functionality.", iconName: "Codepen" },
  { title: "Deployment & Support", description: "Seamless deployment to your chosen environment, followed by ongoing support and maintenance.", iconName: "Rocket" },
];

export default async function SoftwareDevelopmentPage() {
  const services = await getSoftwareServices();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Code2 className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Software Development: Build Smarter, Faster
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From concept to deployment, we create robust, scalable, and innovative software solutions for your enterprise.
          </p>
        </header>

        {/* Services Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our Software Development Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3 transition-colors duration-300 group-hover:bg-primary/20">
                    {renderIcon(service.iconName, { className: "h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" })}
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-slate-300 text-sm leading-relaxed">{service.description}</p>
                </CardContent>
                <div className="p-6 pt-2 mt-auto">
                  <Link href={service.link}>
                    <Button variant="outline" className="w-full group text-sm border-primary/50 hover:bg-primary/10 hover:text-primary">
                      Learn More <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Development Process Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {developmentProcessSteps.map((step) => (
                <div key={step.title} className="flex flex-col items-center text-center p-4">
                   <div className="p-3 bg-primary/10 rounded-full mb-4">
                    {renderIcon(step.iconName, { className: "h-8 w-8 text-primary" })}
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
          <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Need a Custom Software Solution?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Let’s build it together. Contact Fynorra to discuss your project and how we can bring your ideas to life.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Get Started <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
