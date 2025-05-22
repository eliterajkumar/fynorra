
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, CloudCog, Server, Settings2, Zap, CloudUpload, GitBranchPlus, Container, ShieldCheck, Repeat, DollarSign } from "lucide-react";
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

interface CloudDevOpsService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  link: string;
}

async function getCloudDevOpsServices(): Promise<CloudDevOpsService[]> {
  try {
    const servicesCollection = collection(db, "cloudDevOpsServices");
    const q = query(servicesCollection, orderBy("title", "asc"));
    const servicesSnapshot = await getDocs(q);
    const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CloudDevOpsService));
    
    if (servicesList.length === 0) {
        return getSampleCloudDevOpsServices();
    }
    return servicesList;
  } catch (error) {
    console.error("Error fetching Cloud & DevOps services from Firestore:", error);
    return getSampleCloudDevOpsServices();
  }
}

function getSampleCloudDevOpsServices(): CloudDevOpsService[] {
  return [
    { id: '1', title: 'Cloud Migration & Strategy', description: 'Seamlessly migrate your applications and data to the cloud with a tailored strategy for optimal performance.', iconName: 'CloudUpload', link: '/cloud-devops/migration' },
    { id: '2', title: 'CI/CD Pipeline Implementation', description: 'Automate your software delivery process with robust Continuous Integration and Continuous Deployment pipelines.', iconName: 'GitBranchPlus', link: '/cloud-devops/ci-cd' },
    { id: '3', title: 'Containerization & Orchestration', description: 'Leverage Docker and Kubernetes to build, deploy, and manage scalable containerized applications.', iconName: 'Container', link: '/cloud-devops/containerization' },
    { id: '4', title: 'Infrastructure as Code (IaC)', description: 'Manage and provision your cloud infrastructure through code for consistency and repeatability.', iconName: 'Terminal', link: '/cloud-devops/iac' },
    { id: '5', title: 'Cloud Security & Compliance', description: 'Implement best practices and tools to secure your cloud environments and meet compliance standards.', iconName: 'ShieldCheck', link: '/cloud-devops/security' },
    { id: '6', title: 'DevOps Consulting & Automation', description: 'Optimize your development lifecycle with expert DevOps consulting and automation solutions.', iconName: 'Settings2', link: '/cloud-devops/consulting' },
  ];
}

const cloudDevOpsBenefits = [
  { title: "Improved Scalability", description: "Dynamically scale your resources up or down based on demand, ensuring optimal performance.", iconName: "TrendingUp" },
  { title: "Faster Deployment Cycles", description: "Accelerate your time-to-market with automated CI/CD pipelines and agile practices.", iconName: "FastForward" },
  { title: "Enhanced Reliability", description: "Build resilient systems with automated monitoring, recovery, and high availability.", iconName: "ShieldAlert" },
  { title: "Cost Optimization", description: "Reduce infrastructure costs by optimizing resource utilization and leveraging cloud efficiencies.", iconName: "DollarSign" },
];

export default async function CloudDevOpsPage() {
  const services = await getCloudDevOpsServices();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <CloudCog className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Cloud & DevOps: Scale with Confidence
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Optimize your infrastructure, automate processes, and accelerate innovation with our expert cloud and DevOps solutions.
          </p>
        </header>

        {/* Services Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our Cloud & DevOps Services</h2>
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

        {/* Benefits Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Why Cloud & DevOps?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cloudDevOpsBenefits.map((benefit) => (
                <div key={benefit.title} className="flex flex-col items-center text-center p-4">
                   <div className="p-3 bg-primary/10 rounded-full mb-4">
                    {renderIcon(benefit.iconName, { className: "h-8 w-8 text-primary" })}
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
          <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Infrastructure?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Partner with Fynorra to transform your cloud and DevOps practices for agility, scalability, and efficiency.
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
