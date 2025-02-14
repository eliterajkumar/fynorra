"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Sidebar from "@/components/sidebar";

export default function AutomationWorkflowBuilder() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState("GPT-4");
  const [apiType, setApiType] = useState("REST API");
  const [automationEnabled, setAutomationEnabled] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const startTraining = () => {
    alert(`Training started with ${selectedModel}`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Automation Workflow Builder</h1>
        <p className="text-gray-600 mb-6">Drag & Drop AI Pipelines, API Deployment, Task Scheduler.</p>

        {/* Data Upload Section */}
        <div className="p-6 bg-white shadow rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">1. Upload Data (PDF/CSV)</h2>
          <label className="cursor-pointer flex items-center bg-gray-200 px-4 py-2 rounded-md">
            <Upload size={20} className="mr-2" /> Upload File
            <input type="file" className="hidden" accept=".pdf,.csv" onChange={handleFileUpload} />
          </label>
          {uploadedFile && <p className="text-sm text-gray-600">Uploaded: {uploadedFile.name}</p>}
        </div>

        {/* Model Training Section */}
        <div className="p-6 bg-white shadow rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">2. Train & Deploy AI Model</h2>
          <select className="p-2 border rounded-md w-full mb-2" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
            <option>GPT-4</option>
            <option>Mistral</option>
            <option>Claude</option>
            <option>Google Gemini</option>
            <option>Custom Fine-Tuned Model</option>
          </select>
          <Button className="w-full" onClick={startTraining}>Start Training</Button>
        </div>

        {/* API Generation Section */}
        <div className="p-6 bg-white shadow rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">3. Generate AI API</h2>
          <select className="p-2 border rounded-md w-full mb-2" value={apiType} onChange={(e) => setApiType(e.target.value)}>
            <option>REST API</option>
            <option>GraphQL API</option>
          </select>
          <Button className="w-full">Generate API</Button>
        </div>

        {/* Workflow Automation Section */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">4. Workflow Automation</h2>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" checked={automationEnabled} onChange={(e) => setAutomationEnabled(e.target.checked)} />
            Enable Auto-Deployment & API Generation
          </label>
          <Button className="w-full mt-4">Save Automation Settings</Button>
        </div>
      </div>
    </div>
  );
}
