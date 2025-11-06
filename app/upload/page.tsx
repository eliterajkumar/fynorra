"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Link, Trash2, CheckCircle, AlertTriangle, FileText, Globe, Loader2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Updated Upload Page (Next.js + .tsx)
 * - Uploads files to backend /upload_pdf with XHR (progress)
 * - Scrapes URLs via backend /submit_url
 * - Save Dataset: calls backend /datasets with uploaded job_ids + scraped job_ids
 *
 * Environment:
 *   NEXT_PUBLIC_API_BASE  (e.g. http://localhost:8000)
 *
 * Backend endpoints expected:
 *  POST /upload_pdf   -> returns { job_id, path?, ... }
 *  POST /submit_url   -> returns { job_id, source: url, ... }
 *  POST /datasets     -> expects { name, file_job_ids:[], url_job_ids:[] } -> returns { dataset_id }
 *
 * If backend differs, adjust BASE_URL or endpoint paths below.
 */

type UploadFile = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number; // 0-100
  status: "pending" | "uploading" | "uploaded" | "error";
  error?: string;
  // backend job id after successful upload
  jobId?: string | null;
};

type ScrapedItem = {
  id: string;
  url: string;
  title?: string;
  excerpt?: string;
  status: "pending" | "fetched" | "saved" | "error";
  jobId?: string | null; // backend returned job id
};

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const BASE_URL = "https://c33822360e09.ngrok-free.app";

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scraped, setScraped] = useState<ScrapedItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [datasetName, setDatasetName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    const prevent = (e: DragEvent) => e.preventDefault();
    el.addEventListener("dragenter", prevent);
    el.addEventListener("dragover", prevent);
    el.addEventListener("dragleave", prevent);
    el.addEventListener("drop", prevent);
    return () => {
      el.removeEventListener("dragenter", prevent);
      el.removeEventListener("dragover", prevent);
      el.removeEventListener("dragleave", prevent);
      el.removeEventListener("drop", prevent);
    };
  }, []);

  // Helpers
  const human = (n: number) => {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  };

  function addFiles(list: FileList | null) {
    if (!list) return;
    const arr = Array.from(list).map((f) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const status = f.size > MAX_FILE_SIZE ? "pending" : "pending";
      return {
        id,
        file: f,
        name: f.name,
        size: f.size,
        type: f.type || "application/octet-stream",
        progress: 0,
        status,
        jobId: null,
      } as UploadFile;
    });

    const unsupported = arr.filter((a) => !/\.(pdf|docx?|txt|md|csv|json)$/i.test(a.name));
    if (unsupported.length > 0) {
      toast.warning("Some file types may not be supported. Recommended: PDF, DOCX, TXT, MD, CSV");
    }

    setFiles((s) => [...arr, ...s]);
  }

  // Drop handler
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleDragClass(false);
    addFiles(e.dataTransfer.files);
  }

  function handleDragClass(active: boolean) {
    if (!dropRef.current) return;
    dropRef.current.style.borderColor = active ? "rgb(99 102 241)" : "";
    dropRef.current.style.background = active ? "rgba(99,102,241,0.03)" : "";
  }

  // Remove file
  function removeFile(id: string) {
    setFiles((s) => s.filter((f) => f.id !== id));
  }

  function uploadFileToBackend(fileItem: UploadFile) {
    return new Promise<UploadFile>((resolve) => {
      const form = new FormData();
      form.append("file", fileItem.file);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${BASE_URL}/api/upload`);
      // TODO: Add Supabase JWT token when auth is implemented
      // xhr.setRequestHeader('Authorization', `Bearer ${supabaseToken}`);
      
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          const pct = Math.round((ev.loaded / ev.total) * 100);
          setFiles((prev) => prev.map((p) => (p.id === fileItem.id ? { ...p, progress: pct } : p)));
        }
      };
      
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const body = JSON.parse(xhr.responseText || "{}");
            const jobId = body.jobId || body.documentId || null;
            // Backend returns: { jobId: "job_123", documentId: "doc_456", status: "queued" }
            setFiles((prev) =>
              prev.map((p) => (p.id === fileItem.id ? { ...p, status: "uploaded", progress: 100, jobId } : p))
            );
            toast.success(`${fileItem.name} uploaded successfully`);
            resolve({ ...fileItem, status: "uploaded", progress: 100, jobId });
          } catch {
            setFiles((prev) =>
              prev.map((p) => (p.id === fileItem.id ? { ...p, status: "uploaded", progress: 100, jobId: null } : p))
            );
            resolve({ ...fileItem, status: "uploaded", progress: 100, jobId: null });
          }
        } else {
          const error = `Upload failed (${xhr.status})`;
          setFiles((prev) =>
            prev.map((p) => (p.id === fileItem.id ? { ...p, status: "error", error } : p))
          );
          toast.error(`Failed to upload ${fileItem.name}`);
          resolve({ ...fileItem, status: "error", error });
        }
      };
      
      xhr.onerror = () => {
        const error = "Network error";
        setFiles((prev) =>
          prev.map((p) => (p.id === fileItem.id ? { ...p, status: "error", error } : p))
        );
        toast.error(`Network error uploading ${fileItem.name}`);
        resolve({ ...fileItem, status: "error", error });
      };
      
      xhr.send(form);
    });
  }

  async function saveDataset() {
    if (files.length === 0 && scraped.length === 0) {
      toast.error("Add files or scraped URLs before saving");
      return;
    }
    // Dataset name not required as backend auto-processes files
    
    setIsUploading(true);
    setBusy(true);

    // Upload files
    for (const f of files) {
      if (f.status === "uploaded") continue;
      if (f.size > MAX_FILE_SIZE) {
        setFiles((prev) => prev.map((p) => (p.id === f.id ? { ...p, status: "error", error: "File too large" } : p)));
        continue;
      }
      setFiles((prev) => prev.map((p) => (p.id === f.id ? { ...p, status: "uploading" } : p)));
      await uploadFileToBackend(f);
    }

    // Process scraped URLs
    for (const s of scraped) {
      if (s.status === "saved" && s.jobId) continue;
      if (s.status === "fetched" || s.status === "pending") {
        try {
          const res = await fetch(`${BASE_URL}/api/scrape`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: s.url }),
          });
          if (!res.ok) throw new Error(`Scrape failed ${res.status}`);
          const data = await res.json();
          setScraped((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: "saved", jobId: data.jobId || null } : x)));
        } catch (err) {
          setScraped((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: "error" } : x)));
        }
      }
    }

    // Create dataset
    const file_job_ids = files.filter(f => f.jobId).map(f => f.jobId!);
    const url_job_ids = scraped.filter(s => s.jobId).map(s => s.jobId!);

    try {
      // Files are auto-processed by backend, no separate dataset creation needed
      toast.success(`Files uploaded and processing started!`);
      setFiles([]);
      setScraped([]);
      setDatasetName("");
      setIsUploading(false);
      setBusy(false);
      return;
      
    } catch (err) {
      toast.error("Failed to process files. Check your backend connection.");
      setIsUploading(false);
      setBusy(false);
    }
  }

  async function scrapeUrlHandler(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!scrapeUrl.trim()) {
      toast.error("Enter a URL to scrape");
      return;
    }
    setBusy(true);

    try {
      const res = await fetch(`${BASE_URL}/api/scrape`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: scrapeUrl.trim() }),
      });
      if (!res.ok) throw new Error(`Scrape failed: ${res.status}`);
      const data = await res.json();
      const item: ScrapedItem = {
        id: data.jobId || `s-${Date.now()}`,
        url: scrapeUrl,
        title: data.title || scrapeUrl,
        excerpt: data.excerpt || "",
        status: "saved",
        jobId: data.jobId || null,
      };
      setScraped((s) => [item, ...s]);
      setScrapeUrl("");
      toast.success("URL scraped successfully");
    } catch (err) {
      toast.error("Failed to scrape URL. Check your backend connection.");
    } finally {
      setBusy(false);
    }
  }

  // Remove scraped item
  function removeScraped(id: string) {
    setScraped((s) => s.filter((x) => x.id !== id));
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 overflow-auto ml-0 md:ml-64">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">📤 Upload Data</h1>
              <p className="text-gray-600 dark:text-slate-400 mt-2">
                Upload files or scrape URLs to create your dataset
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Input 
                placeholder="Dataset name" 
                value={datasetName} 
                onChange={(e) => setDatasetName(e.target.value)}
                className="w-48"
              />
              <Button onClick={saveDataset} disabled={isUploading || (!files.length && !scraped.length)} className="bg-gradient-to-r from-blue-600 to-purple-600">
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Dataset
              </Button>
            </div>
          </div>

          {/* Drag & drop */}
          <Card className="border-2 border-dashed border-gray-300 dark:border-slate-600 hover:border-blue-400 transition-all">
            <CardContent className="p-0">
              <div
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); handleDragClass(true); }}
                onDragLeave={() => handleDragClass(false)}
                className="p-12 text-center cursor-pointer transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    <Upload size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Drop files here or click to browse</h3>
                    <p className="text-gray-500 dark:text-slate-400 mt-2">PDF, DOCX, TXT, MD, CSV files up to 50MB</p>
                  </div>
                  <Button variant="outline" className="mt-2">
                    <FileText className="mr-2 h-4 w-4" />
                    Choose Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* URL scraper */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" /> Scrape from URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={scrapeUrlHandler} className="flex gap-3">
                <Input 
                  placeholder="https://example.com/article" 
                  value={scrapeUrl} 
                  onChange={(e) => setScrapeUrl(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={busy} variant="outline">
                  {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4" />}
                  Scrape
                </Button>
              </form>

              {scraped.length > 0 && (
                <div className="mt-4 space-y-3">
                  {scraped.map((s) => (
                    <div key={s.id} className="p-3 rounded-md bg-gray-50 dark:bg-slate-700 border dark:border-slate-600 flex items-start justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{s.title || s.url}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">{s.excerpt}</div>
                        <div className="text-xs text-gray-400 mt-2">Status: {s.status}</div>
                        {s.jobId && <div className="text-xs text-green-600 mt-1">job: {s.jobId}</div>}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button onClick={() => removeScraped(s.id)} className="text-rose-600 text-sm"><Trash2 size={14} /> Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Files list */}
          <Card>
            <CardHeader>
              <CardTitle>Files in dataset</CardTitle>
            </CardHeader>
            <CardContent>
              {files.length === 0 ? (
                <div className="text-sm text-gray-500">No files yet — add files above.</div>
              ) : (
                <div className="space-y-3">
                  {files.map((f) => (
                    <div key={f.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            {f.status === "uploaded" ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : f.status === "error" ? (
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            ) : (
                              <FileText className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">{f.name}</div>
                            <div className="text-sm text-gray-500 dark:text-slate-400">{human(f.size)}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {f.status === "uploading" && (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                              <span className="text-sm text-blue-600">{f.progress}%</span>
                            </div>
                          )}
                          {f.status === "error" && (
                            <span className="text-sm text-red-600">{f.error}</span>
                          )}
                          <Button onClick={() => removeFile(f.id)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {f.status === "uploading" && (
                        <div className="mt-3">
                          <Progress value={f.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {files.length > 0 && (
                <div className="mt-6 pt-4 border-t flex items-center justify-between">
                  <div className="text-sm text-gray-500">Total: {files.length} files</div>
                  <Button onClick={() => { setFiles([]); setScraped([]); }} variant="outline" size="sm" disabled={busy}>
                    <Trash2 className="mr-2 h-4 w-4" /> Clear All
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>


        </div>
      </main>
    </div>
  );
}
