"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Globe, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type Document = {
  id: string;
  title: string;
  sourceType: "upload" | "scrape";
  sourceUrl: string;
  fileType: string;
  chunkCount: number;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
};

const BASE_URL = "https://c33822360e09.ngrok-free.app";

export default function BrainPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalDocuments: 0, totalChunks: 0, totalVectors: 0 });

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/dev/brain?limit=50&offset=0`);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      
      const data = await res.json();
      setDocuments(data.documents || []);
      setStats({
        totalDocuments: data.totalDocuments || 0,
        totalChunks: data.totalChunks || 0,
        totalVectors: data.totalVectors || 0
      });
    } catch (err) {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600";
      case "processing": return "text-blue-600";
      case "failed": return "text-red-600";
      default: return "text-yellow-600";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 overflow-auto ml-0 md:ml-64">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">🧠 Knowledge Base</h1>
              <p className="text-gray-600 dark:text-slate-400 mt-2">
                View your uploaded documents and scraped content
              </p>
            </div>

            <Button onClick={fetchDocuments} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Documents</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.totalDocuments}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Chunks</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.totalChunks}</p>
                  </div>
                  <div className="h-8 w-8 rounded bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span className="text-green-600 font-bold">C</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Vectors</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.totalVectors}</p>
                  </div>
                  <div className="h-8 w-8 rounded bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">V</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                  <p className="text-gray-500 mt-2">Loading...</p>
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="text-gray-500 mt-2">No documents found. Upload files to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          {doc.sourceType === "upload" ? <FileText className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900 dark:text-slate-100">{doc.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span className={getStatusColor(doc.status)}>{doc.status.toUpperCase()}</span>
                            <span>{doc.chunkCount} chunks</span>
                            <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}