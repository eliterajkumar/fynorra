import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Machine Learning Models",
    description: "Develop and deploy custom machine learning models tailored to your business needs.",
    link: "/services/machine-learning",
  },
  {
    title: "Natural Language Processing",
    description: "Create chatbots, sentiment analysis tools, and text classification systems.",
    link: "/services/nlp",
  },
  {
    title: "Computer Vision Solutions",
    description: "Implement image and video analysis for object detection, facial recognition, and more.",
    link: "/services/computer-vision",
  },
  {
    title: "Predictive Analytics",
    description: "Forecast trends and make data-driven decisions with AI-powered predictive models.",
    link: "/services/predictive-analytics",
  },
  {
    title: "AI Integration",
    description: "Seamlessly integrate AI capabilities into your existing software and workflows.",
    link: "/services/ai-integration",
  },
  {
    title: "AI Consulting",
    description: "Get expert advice on AI strategy, implementation, and optimization for your business.",
    link: "/services/ai-consulting",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Custom AI Development Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href={service.link}>
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
