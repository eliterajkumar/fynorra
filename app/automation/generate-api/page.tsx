"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GenerateAPIPage() {
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4");

  const handleGenerateKey = () => {
    const newKey = `sk-${Math.random().toString(36).substring(2, 16)}`;
    setApiKey(newKey);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Generate AI API Key
          </CardTitle>
          <p className="text-gray-500 text-sm">
            Create an API key for integrating AI models into your application.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Enter API Name" className="border border-gray-300 dark:border-gray-700 rounded-lg" />
            <Select onValueChange={setSelectedModel} defaultValue="gpt-4">
              <SelectTrigger className="w-full border border-gray-300 dark:border-gray-700 rounded-lg">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                <SelectItem value="custom-model">Custom Model</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleGenerateKey}
              className="w-full bg-black text-white hover:bg-gray-800 rounded-lg"
            >
              Generate API Key
            </Button>
            {apiKey && (
              <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mt-4">
                <span className="text-sm text-gray-800 dark:text-white font-mono">{apiKey}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-2"
                >
                  {copied ? <Check className="text-green-500" /> : <Copy className="text-gray-600 dark:text-white" />}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
