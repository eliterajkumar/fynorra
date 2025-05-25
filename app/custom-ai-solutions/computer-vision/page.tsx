
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Eye, ScanFace, SearchCode, FileJson, Image as ImageIcon, Aperture, Settings2, Cpu, ShieldCheck, Car, Factory } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: <ImageIcon className="h-8 w-8 text-primary mb-2" />,
    title: "Image Recognition",
    description: "Identify and classify objects, scenes, and people within images with high accuracy.",
  },
  {
    icon: <ScanFace className="h-8 w-8 text-primary mb-2" />,
    title: "Object Detection",
    description: "Locate and identify multiple objects within an image or video stream.",
  },
  {
    icon: <Aperture className="h-8 w-8 text-primary mb-2" />, // Changed from ScanFace to avoid repetition
    title: "Facial Recognition",
    description: "Analyze facial features for identification, verification, and demographic analysis.",
  },
  {
    icon: <SearchCode className="h-8 w-8 text-primary mb-2" />,
    title: "Optical Character Recognition (OCR)",
    description: "Extract text from images and documents, enabling data digitization and automation.",
  },
];

const howItWorksSteps = [
  {
    step: "1",
    title: "Image/Video Input",
    description: "Visual data (images or video frames) is fed into the computer vision system.",
    icon: <FileJson className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "AI Model Analysis",
    description: "Pre-trained or custom AI models process the visual data, performing tasks like feature extraction and pattern recognition.",
    icon: <Cpu className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Result Output & Interpretation",
    description: "The system outputs structured information, such as object labels, locations, text, or analytical insights.",
    icon: <Settings2 className="h-10 w-10 text-primary" />
  },
];

// Placeholder for lucide icon not available (HeartPulse)
const HeartPulse = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 20.998s-8.5-6.498-8.5-12.998a6.5 6.5 0 0 1 13 0c0 6.5-8.5 12.998-8.5 12.998z"/><path d="M10.5 9.5l1.5 1.5 1.5-1.5"/></svg>
);

const useCases = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary mb-2" />,
    title: "Surveillance & Security",
    description: "Enhance security with automated monitoring, threat detection, and access control systems.",
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary mb-2" />, // Placeholder for HeartPulse
    title: "Healthcare",
    description: "Aid in medical image analysis (X-rays, MRIs), disease detection, and surgical assistance.",
  },
  {
    icon: <Factory className="h-8 w-8 text-primary mb-2" />,
    title: "Manufacturing",
    description: "Automate quality control, defect detection, and assembly line monitoring for improved efficiency.",
  },
  {
    icon: <Car className="h-8 w-8 text-primary mb-2" />,
    title: "Traffic Analysis & Autonomous Vehicles",
    description: "Enable smart traffic management, pedestrian detection, and navigation for self-driving cars.",
  },
];


export default function ComputerVisionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Eye className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Computer Vision: See the World Intelligently
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Empower your applications to understand and interpret visual information, unlocking new possibilities in automation and insight.
          </p>
        </header>

        {/* Benefits Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col text-center p-6">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <CardTitle className="text-xl font-semibold text-primary mb-2">{benefit.title}</CardTitle>
                <CardDescription className="text-slate-300 text-sm leading-relaxed flex-grow">
                  {benefit.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <Cpu className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-12 text-center">How Computer Vision Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 relative">
              {/* Connecting lines for larger screens */}
              <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-primary/30 transform -translate-y-1/2 -z-10"></div>
              <div className="hidden md:block absolute top-1/2 left-3/4 right-1/4 h-0.5 bg-primary/30 transform -translate-y-1/2 -z-10 md:left-auto md:right-auto md:w-1/2 md:left-1/4"></div>


              {howItWorksSteps.map((item, index) => (
                <div key={item.step} className="flex flex-col items-center text-center relative px-4">
                  <div className="relative mb-4">
                     <div className="p-4 bg-slate-800/70 rounded-full border-2 border-primary/50 shadow-lg">
                       {item.icon}
                     </div>
                     <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center text-xs font-bold border-2 border-slate-900 z-10">
                       {item.step}
                     </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Diverse Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">{useCase.icon}</div>
                <CardTitle className="text-xl font-semibold text-primary mb-2">{useCase.title}</CardTitle>
                <CardDescription className="text-slate-300 text-sm leading-relaxed flex-grow">
                  {useCase.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
          <Eye className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Give Your Systems Sight?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Explore the transformative power of computer vision for your business.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Start Building with Computer Vision <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
