"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";
import { useUser, UserButton } from "@clerk/nextjs";

export default function AIDeploymentDashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in"); // Redirect unauthorized users
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return null; // Prevent rendering unauthorized content
  }

  const services = [
    {
      title: "AI Model Fine-Tuning",
      description: "Fine-tune AI models with your own data for better accuracy and customization.",
      link: "#fine-tuning"
    },
    {
      title: "Automated Model Training & Optimization",
      description: "Let the platform automatically train and optimize AI models for you.",
      link: "#training-optimization"
    },
    {
      title: "No-Code/Low-Code AI App Deployment",
      description: "Deploy AI-powered applications without writing complex code.",
      link: "#no-code-deployment"
    },
    {
      title: "Custom AI API Generation",
      description: "Generate AI APIs that integrate with existing enterprise workflows.",
      link: "#ai-api-generation"
    },
    {
      title: "Live AI Chatbots & Assistants",
      description: "Easily deploy AI chatbots for various industries and personal use.",
      link: "#ai-chatbots"
    }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        
        {/* 🔹 User Info + Logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">AI Deployment Dashboard</h1>
          
          {/* User Details + Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-lg font-semibold">{user?.fullName}</p>
              <p className="text-gray-600 text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Deploy and manage AI models and applications effortlessly.
        </p>

        {/* 🔹 AI Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a href={service.link} className="mt-auto text-blue-600 font-medium hover:underline">Learn More →</a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
