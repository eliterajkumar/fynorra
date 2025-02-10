import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Brain, ChartBar, ShieldCheck, Settings, Lightbulb } from "lucide-react";

export default function MachineLearningPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Machine Learning Models</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Unlock the potential of AI-driven solutions with custom machine learning models designed for your business needs.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Machine Learning?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: "Smarter Decisions", description: "Leverage AI to analyze data and improve decision-making." },
                { icon: ChartBar, title: "Predictive Insights", description: "Forecast trends and behaviors using AI-driven analytics." },
                { icon: ShieldCheck, title: "Automated Security", description: "Enhance fraud detection and cybersecurity with intelligent ML algorithms." },
                { icon: Settings, title: "Process Automation", description: "Optimize workflows and reduce manual effort with ML-driven automation." },
                { icon: Lightbulb, title: "Personalization", description: "Deliver tailored user experiences with recommendation systems." },
                { icon: CheckCircle, title: "Cost Efficiency", description: "Reduce operational costs through AI-powered automation." },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                  <item.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Applications Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Applications of Machine Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Healthcare AI", description: "AI-powered diagnostics, predictive patient care, and drug discovery." },
                { title: "Finance & Banking", description: "Fraud detection, risk assessment, and stock market predictions." },
                { title: "Retail & E-commerce", description: "Personalized recommendations, demand forecasting, and customer analytics." },
                { title: "Manufacturing", description: "Predictive maintenance, quality control, and supply chain optimization." },
                { title: "Autonomous Vehicles", description: "Self-driving technology and intelligent traffic systems." },
                { title: "Natural Language Processing", description: "Chatbots, sentiment analysis, and AI-driven content generation." },
              ].map((app, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">{app.title}</h3>
                  <p className="text-gray-600">{app.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call-to-Action Section */}
          <section className="text-center bg-primary text-white py-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Implement Machine Learning?</h2>
            <p className="text-lg mb-6">Let's discuss how AI can drive innovation in your business.</p>
            <Link href="/contact">
              <Button size="lg" variant="secondary">Schedule a Consultation</Button>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
