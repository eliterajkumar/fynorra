"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Sidebar from "@/components/sidebar"; // Sidebar Import

export default function Playground() {
  const [model, setModel] = useState("GPT-4");
  const [temperature, setTemperature] = useState([0.7]); // Fix: Array format
  const [maxTokens, setMaxTokens] = useState([100]); // Fix: Array format
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    setResponse(`Generated response for: ${input}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">AI Playground</h1>

        {/* Model Selection */}
        <select
          className="border p-2 rounded mb-4"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="GPT-4">GPT-4</option>
          <option value="Mistral">Mistral</option>
          <option value="Claude">Claude</option>
        </select>

        {/* Parameter Sliders */}
        <div className="w-full mb-4">
          <label className="block mb-1">Temperature: {temperature[0]}</label>
          <Slider min={0} max={1} step={0.1} value={temperature} onValueChange={(val) => setTemperature(val)} />
        </div>

        <div className="w-full mb-4">
          <label className="block mb-1">Max Tokens: {maxTokens[0]}</label>
          <Slider min={50} max={500} step={10} value={maxTokens} onValueChange={(val) => setMaxTokens(val)} />
        </div>

        {/* Input & Button */}
        <textarea
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter your prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="w-full" onClick={handleGenerate}>Generate</Button>

        {/* Response Section */}
        {response && (
          <div className="mt-4 p-4 border rounded bg-gray-100 w-full">
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
