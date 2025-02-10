import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Camera, Image, Eye, Video, ScanLine, Layers } from "lucide-react";

export default function ComputerVisionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Computer Vision Solutions</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Implement image and video analysis for object detection, facial recognition, and more.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Computer Vision?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Camera, title: "Object Detection", description: "Recognize and classify objects in images and videos." },
                { icon: Image, title: "Facial Recognition", description: "Authenticate users and analyze emotions using AI-powered facial recognition." },
                { icon: Eye, title: "Image Processing", description: "Enhance image quality and analyze visual data efficiently." },
                { icon: Video, title: "Video Analytics", description: "Monitor and analyze video footage in real time." },
                { icon: ScanLine, title: "Optical Character Recognition (OCR)", description: "Extract text from scanned documents and images." },
                { icon: Layers, title: "3D Vision & Augmented Reality", description: "Enable AR experiences and 3D object tracking." },
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
            <h2 className="text-3xl font-bold text-center mb-8">Applications of Computer Vision</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Autonomous Vehicles", description: "Enable self-driving cars to detect pedestrians, traffic signals, and obstacles." },
                { title: "Medical Imaging", description: "Analyze X-rays, MRIs, and other scans for disease detection." },
                { title: "Retail & Inventory Management", description: "Automate shelf monitoring and product recognition in stores." },
                { title: "Surveillance & Security", description: "Detect threats, unauthorized access, and suspicious activities." },
                { title: "Agriculture & Crop Monitoring", description: "Analyze crop health and detect pests using AI-driven image analysis." },
                { title: "Manufacturing Quality Control", description: "Inspect products and detect defects in production lines." },
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
            <h2 className="text-3xl font-bold mb-4">Want to Integrate Computer Vision into Your Business?</h2>
            <p className="text-lg mb-6">Let's discuss how AI-powered vision solutions can enhance your operations.</p>
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
