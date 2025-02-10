import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, LineChart, Database, TrendingUp, Clock, BrainCircuit } from "lucide-react";


export default function PredictiveAnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Predictive Analytics</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Forecast trends and make data-driven decisions with AI-powered predictive models.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Predictive Analytics?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BarChart, title: "Data-Driven Forecasting", description: "Make informed business decisions using AI-driven insights." },
                { icon: LineChart, title: "Trend Analysis", description: "Identify market trends and predict future movements." },
                { icon: Database, title: "Big Data Processing", description: "Utilize large datasets to uncover hidden patterns." },
                { icon: TrendingUp, title: "Sales & Demand Prediction", description: "Optimize inventory and forecast customer demand accurately." },
                { icon: Clock, title: "Real-Time Analytics", description: "Monitor key performance indicators (KPIs) in real time." },
                { icon: BrainCircuit, title: "AI-Powered Insights", description: "Leverage machine learning for more accurate business predictions." },
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
            <h2 className="text-3xl font-bold text-center mb-8">Applications of Predictive Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Customer Behavior Prediction", description: "Analyze user data to predict purchasing patterns and improve marketing strategies." },
                { title: "Financial Risk Assessment", description: "Detect fraud and assess credit risk using AI-driven models." },
                { title: "Healthcare Diagnostics", description: "Predict diseases and patient outcomes based on medical data." },
                { title: "Supply Chain Optimization", description: "Reduce operational costs by forecasting logistics and inventory demands." },
                { title: "Marketing & Personalization", description: "Deliver personalized recommendations to customers using predictive insights." },
                { title: "Energy & Utility Forecasting", description: "Optimize power distribution and predict energy consumption trends." },
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
            <h2 className="text-3xl font-bold mb-4">Want to Implement Predictive Analytics?</h2>
            <p className="text-lg mb-6">Let's explore how AI-driven analytics can optimize your decision-making process.</p>
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
