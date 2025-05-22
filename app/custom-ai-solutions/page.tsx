
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Brain, Bot, Zap, Target, Settings, Cpu, Puzzle, TrendingUp, GitMerge, Cog } from "lucide-react";
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

interface AISolution {
  id: string;
  title: string;
  description: string;
  iconName: string;
  link: string;
}

async function getAISolutions(): Promise<AISolution[]> {
  try {
    const solutionsCollection = collection(db, "aiSolutions");
    const q = query(solutionsCollection, orderBy("title", "asc"));
    const solutionsSnapshot = await getDocs(q);
    const solutionsList = solutionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AISolution));
    
    if (solutionsList.length === 0) {
        return getSampleAISolutions();
    }
    return solutionsList;
  } catch (error)
 {
    console.error("Error fetching AI solutions from Firestore:", error);
    return getSampleAISolutions();
  }
}

function getSampleAISolutions(): AISolution[] {
  return [
    { id: '1', title: 'Intelligent Chatbots', description: 'Automate customer interactions and support with AI-powered chatbots that understand and respond naturally.', iconName: 'Bot', link: '/custom-ai-solutions/chatbots' },
    { id: '2', title: 'Predictive Analytics', description: 'Leverage machine learning to forecast trends, identify opportunities, and make data-driven decisions.', iconName: 'TrendingUp', link: '/custom-ai-solutions/predictive-analytics' },
    { id: '3', title: 'Computer Vision', description: 'Enable systems to interpret and understand visual information from images and videos for various applications.', iconName: 'Cpu', link: '/custom-ai-solutions/computer-vision' },
    { id: '4', title: 'Natural Language Processing', description: 'Extract insights and meaning from text and speech data to improve user experiences and automate tasks.', iconName: 'MessageSquareText', link: '/custom-ai-solutions/nlp' },
    { id: '5', title: 'Recommendation Engines', description: 'Personalize user experiences and increase engagement by suggesting relevant content or products.', iconName: 'ThumbsUp', link: '/custom-ai-solutions/recommendation-engines' },
    { id: '6', title: 'AI-Powered Automation', description: 'Streamline complex business processes and reduce manual effort through intelligent automation.', iconName: 'Cog', link: '/custom-ai-solutions/automation' },
  ];
}

const customAIBenefits = [
  { title: "Tailored to Your Needs", description: "Solutions designed specifically for your unique industry challenges and business opportunities.", iconName: "Puzzle" },
  { title: "Scalable & Efficient Models", description: "Build AI models that grow with your business and operate with maximum efficiency.", iconName: "BarChartBig" },
  { title: "Seamless Integration", description: "Integrate AI capabilities smoothly into your existing workflows and technology stack.", iconName: "GitMerge" },
  { title: "Competitive Advantage", description: "Gain a significant edge in your market by leveraging cutting-edge AI technology.", iconName: "Award" },
];

export default async function CustomAISolutionsPage() {
  const solutions = await getAISolutions();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Brain className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Custom AI Solutions: Tailored for Your Business
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Build intelligent, scalable AI models to drive innovation and efficiency across your enterprise.
          </p>
        </header>

        {/* AI Solutions Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our AI Solutions</h2>
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
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Why Custom AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {customAIBenefits.map((benefit) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Custom AI Solution?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Let’s discuss how Fynorra can empower your business with tailor-made artificial intelligence.
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
