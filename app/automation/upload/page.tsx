"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

export default function UploadData() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        setMessage("❌ File size exceeds 5MB limit!");
        return;
      }

      setUploadedFile(file);
      setMessage(null);

      const formData = new FormData();
      formData.append("file", file);

      setUploading(true);
      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          setMessage(`✅ ${result.message}`);
        } else {
          setMessage(`❌ Error: ${result.error}`);
        }
      } catch (error) {
        setMessage("❌ Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">📂 Upload Data (PDF/CSV)</h1>

        <label className="cursor-pointer flex items-center justify-center bg-gray-200 px-4 py-2 rounded-md w-full">
          <Upload size={20} className="mr-2" /> Upload File
          <input type="file" className="hidden" accept=".pdf,.csv" onChange={handleFileUpload} />
        </label>

        {uploadedFile && <p className="text-sm text-gray-600 mt-2 text-center">📄 {uploadedFile.name}</p>}

        {uploading && (
          <div className="flex items-center justify-center text-blue-500 mt-2">
            <Loader2 className="animate-spin mr-2" size={16} />
            Uploading...
          </div>
        )}

        {message && <p className="text-sm mt-2 text-center">{message}</p>}
      </div>
    </div>
  );
}
