import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Server, Code, PlugZap, Settings } from "lucide-react";

export default function AIIntegration() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">AI Integration Services</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Seamlessly integrate AI into your existing software and workflows for enhanced automation and efficiency.
            </p>
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Integrate AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Server, title: "Scalability", description: "Enhance your system’s ability to handle growing workloads effortlessly." },
                { icon: Code, title: "Automation", description: "Reduce manual work by automating repetitive tasks with AI models." },
                { icon: PlugZap, title: "Seamless APIs", description: "Integrate AI-powered APIs into your business apps and workflows." },
                { icon: Settings, title: "Custom AI Solutions", description: "Tailor AI models to meet your business-specific requirements." },
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

        {/* Use Cases */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Where AI Integration Works Best</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Customer Support", description: "Deploy AI chatbots for 24/7 customer assistance and ticket management." },
                { title: "Data Analysis", description: "Use AI to analyze large datasets and generate business insights." },
                { title: "E-commerce", description: "Enhance recommendation engines and personalize user experiences." },
                { title: "Finance & Banking", description: "Detect fraud and automate financial reporting with AI models." },
                { title: "Healthcare", description: "Utilize AI for patient diagnosis and predictive analytics." },
                { title: "Manufacturing", description: "Implement AI-driven predictive maintenance and process automation." },
              ].map((useCase, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Let’s Bring AI to Your Business</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get in touch with us to discuss how AI integration can improve your business operations.
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
