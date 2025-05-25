
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, PenTool, Zap, Palette, Users, TestTube2, Settings2, Search, IterationCcw, Puzzle, Settings, Rocket, Figma, Lightbulb } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Figma className="h-8 w-8 text-primary mb-2" />, // Or generic Palette
    title: "User Interface (UI) Design",
    description: "Crafting visually appealing, brand-consistent, and modern interfaces that are a joy to use.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary mb-2" />,
    title: "User Experience (UX) Design",
    description: "In-depth user research, wireframing, and prototyping to create intuitive and efficient user journeys.",
  },
  {
    icon: <TestTube2 className="h-8 w-8 text-primary mb-2" />,
    title: "Usability Testing",
    description: "Validating designs with real users to identify pain points and areas for improvement.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary mb-2" />,
    title: "Interaction Design",
    description: "Designing smooth transitions, micro-interactions, and animations that enhance user engagement.",
  },
];

const designProcess = [
  {
    step: "1",
    title: "Research & Discovery",
    description: "Understanding your users, business goals, and competitive landscape to inform design decisions.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Wireframing & Prototyping",
    description: "Creating low and high-fidelity prototypes to visualize structure, flow, and functionality.",
    icon: <Puzzle className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Visual Design & Branding",
    description: "Developing a cohesive visual identity, including color palettes, typography, and imagery.",
    icon: <Palette className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Testing & Iteration",
    description: "Gathering user feedback and iteratively refining designs for optimal usability and satisfaction.",
    icon: <IterationCcw className="h-10 w-10 text-primary" />
  },
];

export default function UiUxDesignPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <PenTool className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            UI/UX Design
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            User-centric design services to create intuitive, accessible, and visually appealing digital experiences.
          </p>
        </header>

        {/* Why UI/UX Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Palette className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Design That Drives Engagement</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Exceptional UI/UX design is critical for capturing user attention, fostering engagement, and achieving business goals. We combine aesthetic appeal with intuitive functionality to create digital products that users love. Our human-centered approach ensures your application is not only beautiful but also easy to use and effective.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our UI/UX Design Services</h2>
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

        {/* Our Design Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {designProcess.map((item, index) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Create an Unforgettable User Experience?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Collaborate with Fynorra to design digital products that captivate and convert.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Start Your Design Project <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
