"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import { ChevronDown, ChevronUp } from "lucide-react";

const documentationData = [
  {
    title: "Getting Started",
    content:
      "Welcome to Fynorra AI! This guide will help you set up your account, navigate the dashboard, and start using AI models effectively.",
  },
  {
    title: "Model Training",
    content:
      "Learn how to upload datasets, choose the right model, and fine-tune it to get the best accuracy and performance.",
  },
  {
    title: "API Integration",
    content:
      "Integrate Fynorra AI into your applications using REST or GraphQL APIs. This section covers authentication, endpoints, and best practices.",
  },
  {
    title: "Automation Tools",
    content:
      "Automate your AI workflows with Fynorra's built-in tools for auto-deployment, optimization, and data processing.",
  },
];

export default function Documentation() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Documentation</h1>
        <div className="space-y-4">
          {documentationData.map((doc, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-md">
              <button
                className="w-full flex justify-between items-center text-lg font-semibold focus:outline-none"
                onClick={() => toggleSection(index)}
              >
                {doc.title}
                {openSection === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openSection === index && <p className="mt-3 text-gray-700">{doc.content}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
