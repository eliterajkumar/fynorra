
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, TrendingUp, DollarSign, Users, Package, LineChart, Database, Brain, BarChartBig, Settings2 } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <DollarSign className="h-8 w-8 text-primary mb-2" />,
    title: "Sales Forecasting",
    description: "Accurately predict future sales trends, optimize inventory, and make informed business decisions.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary mb-2" />,
    title: "Customer Churn Prediction",
    description: "Identify customers at risk of leaving and implement proactive strategies to retain them.",
  },
  {
    icon: <Package className="h-8 w-8 text-primary mb-2" />,
    title: "Inventory Demand Planning",
    description: "Optimize stock levels, reduce waste, and ensure product availability by forecasting demand accurately.",
  },
  {
    icon: <LineChart className="h-8 w-8 text-primary mb-2" />,
    title: "Market Trend Analysis",
    description: "Uncover emerging market trends and opportunities by analyzing historical data and external factors.",
  },
];

const howItWorksSteps = [
  {
    step: "1",
    title: "Data Collection & Preparation",
    description: "We gather and process historical data from various sources, ensuring it's clean and ready for analysis.",
    icon: <Database className="h-10 w-10 text-primary" />
  },
  {
    step: "2",
    title: "Model Training & Validation",
    description: "Our data scientists build and train machine learning models using your data, rigorously validating for accuracy.",
    icon: <Brain className="h-10 w-10 text-primary" />
  },
  {
    step: "3",
    title: "Prediction & Insights Generation",
    description: "The trained model makes predictions on new data, providing actionable insights and forecasts.",
    icon: <BarChartBig className="h-10 w-10 text-primary" />
  },
  {
    step: "4",
    title: "Integration & Action",
    description: "Insights are integrated into your workflows, empowering you to make data-driven decisions and take proactive measures.",
    icon: <Settings2 className="h-10 w-10 text-primary" />
  },
];

const useCases = [
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary mb-2" />,
    title: "Retail & E-commerce",
    description: "Forecast demand, optimize pricing, personalize recommendations, and reduce customer churn.",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary mb-2" />,
    title: "Finance & Banking",
    description: "Assess credit risk, detect fraud, predict market movements, and personalize financial advice.",
  },
  {
    icon: <Truck className="h-8 w-8 text-primary mb-2" />,
    title: "Logistics & Supply Chain",
    description: "Optimize routes, predict delivery times, manage inventory efficiently, and forecast demand fluctuations.",
  },
];

// Placeholder icons if specific ones are not available in lucide-react
import { ShoppingCart, Truck } from 'lucide-react';


export default function PredictiveAnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <TrendingUp className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Predictive Analytics: Illuminate Your Path Forward
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Leverage the power of data to anticipate future trends, make smarter decisions, and drive business growth.
          </p>
        </header>

        {/* What is Predictive Analytics Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <LineChart className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">What is Predictive Analytics?</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Predictive analytics uses historical data, statistical algorithms, and machine learning techniques to make predictions about future outcomes. It helps businesses identify risks, uncover opportunities, and optimize strategies by understanding what is likely to happen next.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Core Capabilities</h2>
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

        {/* How It Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
            {/* Horizontal line for larger screens */}
            <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-primary/30 transform -translate-y-8 -z-10"></div>
            
            {howItWorksSteps.map((item, index) => (
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
        
        {/* Use Cases Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <Settings2 className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-10 text-center">Applications Across Industries</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase) => (
                <Card key={useCase.title} className="bg-slate-800/50 border-slate-700/50 shadow-md p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">{useCase.icon}</div>
                  <CardTitle className="text-xl font-semibold text-primary mb-2">{useCase.title}</CardTitle>
                  <CardDescription className="text-slate-300 text-sm leading-relaxed flex-grow">
                    {useCase.description}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
          <TrendingUp className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Predict Your Success?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Discover how predictive analytics can transform your data into a strategic asset.
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Unlock the Power of Future Insights <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
