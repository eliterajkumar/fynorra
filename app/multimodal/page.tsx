"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";
import { Upload } from "lucide-react";

export default function MultiModalAI() {
  const [inputText, setInputText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("GPT-4");
  const [response, setResponse] = useState<string | null>(null); // Output Response State

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const processInput = () => {
    // Fake processing response
    setResponse(`Processed: ${inputText || file?.name || "No input"} with ${selectedModel}`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Explore MultiModal AI</h1>
        <p className="text-gray-600 mb-6">Combine text, images, and audio for a powerful AI experience.</p>

        {/* Features Section */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white shadow rounded-lg text-center">
            <h3 className="font-semibold text-lg">📝 Text Understanding</h3>
            <p className="text-sm text-gray-500">Generate & analyze text efficiently.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg text-center">
            <h3 className="font-semibold text-lg">🖼️ Image Processing</h3>
            <p className="text-sm text-gray-500">Recognize and generate images.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg text-center">
            <h3 className="font-semibold text-lg">🎙️ Speech & Audio</h3>
            <p className="text-sm text-gray-500">Transcribe & synthesize speech.</p>
          </div>
        </div>

        {/* Upload & Try Section */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Try MultiModal AI</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter text here..."
              value={inputText}
              onChange={handleTextChange}
              className="flex-1 p-2 border rounded-md"
            />
            <label className="cursor-pointer flex items-center bg-gray-200 px-4 py-2 rounded-md">
              <Upload size={20} className="mr-2" /> Upload File
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
          {file && <p className="text-sm text-gray-600">Uploaded: {file.name}</p>}
          
          {/* Model Selection */}
          <select
            className="mt-4 p-2 border rounded-md w-full"
            value={selectedModel}
            onChange={handleModelChange}
          >
            <option>GPT-4</option>
            <option>Mistral</option>
            <option>Claude</option>
            <option>Google Gemini</option>
            <option>Custom Fine-Tuned Model</option>
          </select>
          
          <Button className="mt-4 w-full" onClick={processInput}>
            Process with {selectedModel}
          </Button>

          {/* Output Display Section */}
          {response && (
            <div className="mt-4 p-4 border rounded bg-gray-200">
              <h3 className="text-lg font-semibold">Output:</h3>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
