"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, PlayCircle, CheckCircle } from "lucide-react";

export default function TrainModelPage() {
  const [model, setModel] = useState("gpt-4");
  const [dataset, setDataset] = useState<File | null>(null);
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDataset(e.target.files[0]);
    }
  };
  
  const startTraining = () => {
    if (!dataset) return alert("Please upload a dataset file!");
    setTraining(true);
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTraining(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Train AI Model
          </CardTitle>
          <p className="text-gray-500 text-sm">
            Upload your dataset, select a model, and start training.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={setModel} defaultValue="gpt-4">
              <SelectTrigger className="w-full border border-gray-300 dark:border-gray-700 rounded-lg">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                <SelectItem value="custom-model">Custom Model</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col items-center gap-2 border border-dashed p-4 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700">
              <label className="cursor-pointer text-gray-500 dark:text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5" /> Upload Dataset (CSV, JSON)
                <input type="file" className="hidden" accept=".csv,.json" onChange={handleFileUpload} />
              </label>
              {dataset && <p className="text-sm text-gray-700 dark:text-gray-300">{dataset.name}</p>}
            </div>
            <Button onClick={startTraining} className="w-full bg-black text-white hover:bg-gray-800 rounded-lg">
              <PlayCircle className="mr-2 h-5 w-5" /> Start Training
            </Button>
            {training && (
              <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <p className="text-center text-sm mt-2 text-gray-500">Training in progress... {progress}%</p>
              </div>
            )}
            {progress === 100 && !training && (
              <div className="text-center mt-4 text-green-600 flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" /> Training Completed!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
