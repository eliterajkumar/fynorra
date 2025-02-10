import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Briefcase, Lightbulb, BarChart, Users } from "lucide-react";

export default function AIConsulting() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">AI Consulting Services</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get expert advice on AI strategy, implementation, and optimization for your business.
            </p>
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our AI Consulting Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Briefcase, title: "Strategic Planning", description: "Develop a customized AI roadmap aligned with your business goals." },
                { icon: Lightbulb, title: "Innovation & Research", description: "Stay ahead of the competition with cutting-edge AI solutions." },
                { icon: BarChart, title: "Data-Driven Insights", description: "Leverage AI analytics to make informed business decisions." },
                { icon: Users, title: "Team Training", description: "Upskill your team with AI workshops and hands-on training." },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consulting Areas */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">AI Consulting Focus Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "AI Strategy & Roadmap", description: "Develop an AI adoption plan that aligns with your business needs." },
                { title: "AI Implementation", description: "Integrate AI-powered solutions into your existing systems seamlessly." },
                { title: "Machine Learning & Deep Learning", description: "Leverage advanced ML techniques for predictive analytics and automation." },
                { title: "Natural Language Processing", description: "Enhance customer interactions with AI-powered chatbots and sentiment analysis." },
                { title: "Computer Vision", description: "Implement AI for image recognition, object detection, and automation." },
                { title: "AI Ethics & Compliance", description: "Ensure your AI models are ethical, fair, and aligned with industry regulations." },
              ].map((area, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to discuss how AI can drive innovation and efficiency in your organization.
            </p>
            <Button size="lg" variant="secondary">
              Contact Us
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
