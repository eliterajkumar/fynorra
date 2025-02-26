"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Sidebar from "@/components/sidebar";

export default function Playground() {
  const [model, setModel] = useState("GPT-4");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([100]);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [usageStats, setUsageStats] = useState({ tokensUsed: 0, requests: 0 });
  const [subscription, setSubscription] = useState(false);
  const [promptLimit, setPromptLimit] = useState(10);
  const [trainableData, setTrainableData] = useState(1000);
  
  const handleGenerate = async () => {
    if (promptLimit > 0) {
      setResponse(`Generated response for: ${input}`);
      setUsageStats((prev) => ({
        tokensUsed: prev.tokensUsed + maxTokens[0],
        requests: prev.requests + 1,
      }));
      setPromptLimit(promptLimit - 1);
    } else {
      setResponse("Prompt limit reached. Upgrade for more access.");
    }
  };

  const handleDownload = () => {
    if (subscription) {
      alert("Download initiated");
    } else {
      alert("Please subscribe to download the model.");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">AI Playground - {model}</h1>
        
        <select
          className="border p-2 rounded mb-4"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="GPT-4">GPT-4</option>
          <option value="Mistral">Mistral</option>
          <option value="Claude">Claude</option>
        </select>
        
        <div className="w-full mb-4">
          <label className="block mb-1">Temperature: {temperature[0]}</label>
          <Slider min={0} max={1} step={0.1} value={temperature} onValueChange={setTemperature} />
        </div>

        <div className="w-full mb-4">
          <label className="block mb-1">Max Tokens: {maxTokens[0]}</label>
          <Slider min={50} max={500} step={10} value={maxTokens} onValueChange={setMaxTokens} />
        </div>

        <textarea
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter your prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="w-full" onClick={handleGenerate}>Generate</Button>
        
        {response && (
          <div className="mt-4 p-4 border rounded bg-gray-100 w-full">
            <h2 className="font-bold">System Response</h2>
            <p>{response}</p>
          </div>
        )}
        
        <div className="mt-4 p-4 border rounded bg-gray-50 w-full text-sm">
          <h2 className="font-bold">Usage Stats</h2>
          <p>Tokens Used: {usageStats.tokensUsed}</p>
          <p>Requests Made: {usageStats.requests}</p>
          <p>Remaining Prompts: {promptLimit}</p>
          <p>Trainable Data Limit: {trainableData} entries</p>
        </div>

        <Button className="mt-4" onClick={handleDownload}>Download Model</Button>
      </div>
    </div>
  );
}
