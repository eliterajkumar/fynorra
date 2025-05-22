
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Zap, Target, Briefcase, Lightbulb, ShieldCheck, LineChart } from "lucide-react";
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

interface BusinessSolution {
  id: string;
  title: string;
  description: string;
  iconName: string;
  link: string;
}

async function getBusinessSolutions(): Promise<BusinessSolution[]> {
  try {
    const solutionsCollection = collection(db, "businessSolutions");
    const q = query(solutionsCollection, orderBy("title", "asc"));
    const solutionsSnapshot = await getDocs(q);
    const solutionsList = solutionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BusinessSolution));
    
    if (solutionsList.length === 0) {
        return getSampleBusinessSolutions();
    }
    return solutionsList;
  } catch (error) {
    console.error("Error fetching business solutions from Firestore:", error);
    return getSampleBusinessSolutions();
  }
}

function getSampleBusinessSolutions(): BusinessSolution[] {
  return [
    { id: '1', title: 'AI-Driven Automation', description: 'Streamline operations and boost productivity with custom AI automation solutions.', iconName: 'Bot', link: '/custom-ai-solutions/automation' },
    { id: '2', title: 'Enterprise Software Development', description: 'Build robust, scalable software tailored to your complex business requirements.', iconName: 'Building', link: '/software-development/enterprise-solutions' },
    { id: '3', title: 'Cloud Infrastructure Optimization', description: 'Maximize performance and cost-efficiency with our expert cloud solutions.', iconName: 'CloudCog', link: '/cloud-devops/optimization' },
    { id: '4', title: 'Data Analytics & Insights', description: 'Unlock valuable insights from your data to make informed business decisions.', iconName: 'BarChartHorizontalBig', link: '/custom-ai-solutions/analytics' },
    { id: '5', title: 'Custom Chatbot Solutions', description: 'Enhance customer engagement with intelligent chatbots designed for your brand.', iconName: 'MessageSquare', link: '/custom-ai-solutions/chatbots' },
    { id: '6', title: 'IT Modernization Services', description: 'Transform legacy systems into agile, future-ready platforms.', iconName: 'RefreshCw', link: '/software-development/modernization' },
  ];
}

const fynorraBenefits = [
  { title: "Custom AI Models", description: "AI solutions precision-engineered for your unique business challenges and goals.", iconName: "BrainCircuit" },
  { title: "Seamless Software Deployment", description: "Enterprise-grade software, deployed efficiently into your existing ecosystem.", iconName: "Rocket" },
  { title: "Expert Cloud & DevOps Support", description: "Ongoing guidance and support to ensure your cloud infrastructure is optimized and secure.", iconName: "Users" },
  { title: "Innovative Technology Stack", description: "Leverage the latest advancements in AI and software to stay ahead of the curve.", iconName: "Sparkles" },
];

export default async function ForBusinessesPage() {
  const solutions = await getBusinessSolutions();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Briefcase className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            For Businesses: Scale with AI & Software Solutions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Empower your enterprise with cutting-edge technology tailored to your needs, driving growth and innovation.
          </p>
        </header>

        {/* Solutions Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our Solutions for Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <Card key={solution.id} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3 transition-colors duration-300 group-hover:bg-primary/20">
                    {renderIcon(solution.iconName, { className: "h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" })}
                  </div>
                  <CardTitle className="text-xl font-semibold">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-slate-300 text-sm leading-relaxed">{solution.description}</p>
                </CardContent>
                <div className="p-6 pt-2 mt-auto">
                  <Link href={solution.link}>
                    <Button variant="outline" className="w-full group text-sm border-primary/50 hover:bg-primary/10 hover:text-primary">
                      Learn More <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
             {solutions.length === 0 && (
                <p className="md:col-span-2 lg:col-span-3 text-center text-slate-400 py-8">Loading solutions or no solutions available currently. Please check back soon.</p>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Why Choose Fynorra?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {fynorraBenefits.map((benefit) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Business?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Let’s get started today. Contact Fynorra to explore how our tailored AI and software solutions can drive your success.
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

