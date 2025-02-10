import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Brain, Code, Zap, BarChart } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Custom AI Solutions for Your Business</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Harness the power of artificial intelligence to drive innovation and growth in your organization.
            </p>
            <Button size="lg" variant="secondary">
              Start Your AI Journey
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Fynorra?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Cutting-edge AI",
                  description: "Access to the latest AI technologies and methodologies",
                },
                {
                  icon: Code,
                  title: "Custom Development",
                  description: "Tailored solutions designed for your specific needs",
                },
                {
                  icon: Zap,
                  title: "Rapid Deployment",
                  description: "Quick integration of AI into your existing systems",
                },
                {
                  icon: BarChart,
                  title: "Data-Driven Insights",
                  description: "Unlock the potential of your data with AI-powered analytics",
                },
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

        {/* Services Section */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Custom AI Development Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
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
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link href={service.link} passHref>
                    <Button variant="outline" className="mt-auto">
                      Learn More
                    </Button>
                  </Link>
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
              Let's discuss how our custom AI development services can help you achieve your goals.
            </p>
            <Link href="/contact" passHref>
              <Button size="lg" variant="secondary">
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
