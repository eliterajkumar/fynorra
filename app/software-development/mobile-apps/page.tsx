
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Smartphone, Zap, Palette, ShieldCheck, TrendingUp, Users, Settings2, Search, IterationCcw, Puzzle, Settings, Rocket, Apple, BadgeCent } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Apple className="h-8 w-8 text-primary mb-2" />,
    title: "Native iOS Development",
    description: "High-performance, feature-rich iOS applications leveraging the latest Apple technologies.",
  },
  {
    icon: <BadgeCent className="h-8 w-8 text-primary mb-2" />,
    title: "Native Android Development",
    description: "Robust and scalable Android applications designed for a wide range of devices.",
  },
  {
    icon: <Puzzle className="h-8 w-8 text-primary mb-2" />,
    title: "Cross-Platform Solutions",
    description: "Efficiently build apps for both iOS and Android from a single codebase using frameworks like React Native or Flutter.",
  },
  {
    icon: <Palette className="h-8 w-8 text-primary mb-2" />,
    title: "Intuitive UI/UX Design",
    description: "User-centric designs that ensure engaging, easy-to-navigate mobile experiences.",
  },
];

const developmentProcess = [
  {
    step: "1",
    title: "Strategy & Prototyping",
    description: "Defining app goals, target audience, and creating interactive prototypes for validation.",
    icon: <Search className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Design & Development",
    description: "Crafting beautiful UIs and developing core functionalities with clean, efficient code.",
    icon: <Settings className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Testing & QA",
    description: "Comprehensive testing across devices and scenarios to ensure a bug-free, high-quality app.",
    icon: <ShieldCheck className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Deployment & Launch",
    description: "Managing submissions to app stores and ensuring a smooth launch process.",
    icon: <Rocket className="h-10 w-10 text-primary" />
  },
];

export default function MobileAppDevelopmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Smartphone className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Mobile App Development
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Engaging and high-performance iOS and Android mobile applications for a wide range of use cases.
          </p>
        </header>

        {/* Why Mobile Apps Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <TrendingUp className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Connect With Your Audience On The Go</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Mobile applications are essential for businesses looking to expand their reach, enhance customer engagement, and provide convenient access to services. We build custom mobile apps that are not only visually stunning but also deliver seamless performance and intuitive user experiences, helping you connect with your users wherever they are.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Our Mobile App Capabilities</h2>
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

        {/* Our Development Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Mobile App Development Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
            <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            {developmentProcess.map((item, index) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Mobile App?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Let's discuss your mobile app idea and how Fynorra can turn it into a reality.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Start Your Mobile Project <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
