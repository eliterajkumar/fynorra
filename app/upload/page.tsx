"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Link, Trash2, CheckCircle, AlertTriangle } from "lucide-react";

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

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB recommended

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8001";

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scraped, setScraped] = useState<ScrapedItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
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

    // Basic type check + warn
    const unsupported = arr.filter((a) => !/\.(pdf|docx?|txt|md|csv|json)$/i.test(a.name));
    if (unsupported.length > 0) {
      setMessage("Some file types are unusual — processing may fail. Supported: PDF, DOCX, TXT, MD, CSV.");
    } else {
      setMessage(null);
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

  // Upload single file via XHR to get progress events.
  // Uses backend: POST ${BASE_URL}/upload_pdf
  function uploadFileToBackend(fileItem: UploadFile) {
    return new Promise<UploadFile>((resolve) => {
      const form = new FormData();
      form.append("file", fileItem.file);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${BASE_URL}/upload_pdf`);
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
            // backend should return job_id (we store it)
            const jobId = body.job_id || body.dataset_id || null;
            setFiles((prev) =>
              prev.map((p) => (p.id === fileItem.id ? { ...p, status: "uploaded", progress: 100, jobId } : p))
            );
            resolve({ ...fileItem, status: "uploaded", progress: 100, jobId });
          } catch {
            setFiles((prev) =>
              prev.map((p) => (p.id === fileItem.id ? { ...p, status: "uploaded", progress: 100, jobId: null } : p))
            );
            resolve({ ...fileItem, status: "uploaded", progress: 100, jobId: null });
          }
        } else {
          setFiles((prev) =>
            prev.map((p) => (p.id === fileItem.id ? { ...p, status: "error", error: `Upload failed (${xhr.status})` } : p))
          );
          resolve({ ...fileItem, status: "error", error: `Upload failed (${xhr.status})` });
        }
      };
      xhr.onerror = () => {
        setFiles((prev) =>
          prev.map((p) => (p.id === fileItem.id ? { ...p, status: "error", error: "Network error" } : p))
        );
        resolve({ ...fileItem, status: "error", error: "Network error" });
      };
      xhr.send(form);
    });
  }

  // Upload all pending files + save scraped items by sending them to backend.
  // Also collects returned job_ids so we can create a dataset.
  async function saveDataset() {
    if (files.length === 0 && scraped.length === 0) {
      setMessage("Add files or scraped URLs before saving.");
      return;
    }
    setBusy(true);
    setMessage(null);

    // 1) Upload files sequentially (safe). Parallel is possible but throttling needed.
    for (const f of files) {
      if (f.status === "uploaded") continue;
      if (f.size > 200 * 1024 * 1024) {
        setFiles((prev) => prev.map((p) => (p.id === f.id ? { ...p, status: "error", error: "File too large (>200MB)" } : p)));
        continue;
      }
      setFiles((prev) => prev.map((p) => (p.id === f.id ? { ...p, status: "uploading" } : p)));
      // call backend upload
      // if backend not reachable, uploadFileToBackend will fail; you can test fallback by setting BASE_URL differently.
      await uploadFileToBackend(f);
    }

    // 2) Send scraped URLs to backend (submit_url) and collect job ids
    for (const s of scraped) {
      if (s.status === "saved" && s.jobId) continue;
      if (s.status === "fetched" || s.status === "pending") {
        try {
          setScraped((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: "fetched" } : x)));
          const res = await fetch(`${BASE_URL}/submit_url`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ url: s.url }),
          });
          if (!res.ok) throw new Error(`Scrape failed ${res.status}`);
          const data = await res.json();
          setScraped((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: "saved", jobId: data.job_id || null } : x)));
        } catch (err) {
          // fallback: keep as fetched but mark no jobId
          setScraped((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: "error" } : x)));
        }
      }
    }

    // 3) Build arrays of job ids for dataset creation
    const file_job_ids = files.filter(f => f.jobId).map(f => f.jobId!) ;
    const url_job_ids = scraped.filter(s => s.jobId).map(s => s.jobId!) ;

    // 4) Call backend to create dataset record
    try {
      // Backend should implement POST /datasets accepting jobIds; adapt payload as needed.
      const res = await fetch(`${BASE_URL}/datasets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `dataset-${Date.now()}`, // you can add input to rename
          file_job_ids,
          url_job_ids,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        setMessage(`Dataset creation failed: ${res.status} ${text}`);
      } else {
        const data = await res.json();
        setMessage(`Dataset created: ${data.dataset_id || "ok"}. Go to Train page to index.`);
      }
    } catch (err) {
      setMessage("Dataset creation failed (network). Ensure backend /datasets implemented.");
    }

    setBusy(false);
  }

  // Scrape URL using backend /submit_url (POST form) — returns job_id on success
  async function scrapeUrlHandler(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!scrapeUrl.trim()) {
      setMessage("Enter a URL to scrape.");
      return;
    }
    setBusy(true);
    setMessage(null);

    try {
      const res = await fetch(`${BASE_URL}/submit_url`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ url: scrapeUrl.trim() }),
      });
      if (!res.ok) throw new Error(`Scrape failed: ${res.status}`);
      const data = await res.json();
      const item: ScrapedItem = {
        id: data.job_id || `s-${Date.now()}`,
        url: scrapeUrl,
        title: data.title || data.source || scrapeUrl,
        excerpt: data.excerpt || "",
        status: "saved",
        jobId: data.job_id || null,
      };
      setScraped((s) => [item, ...s]);
      setScrapeUrl("");
      setMessage("URL scraped and saved.");
    } catch (err) {
      // fallback: create local preview entry and set status to fetched.
      setScraped((s) => [{ id: `s-${Date.now()}`, url: scrapeUrl, title: `Preview: ${scrapeUrl}`, excerpt: "Preview (backend failed)", status: "fetched", jobId: null }, ...s]);
      setScrapeUrl("");
      setMessage("Scraped locally (demo). Implement backend /submit_url for full behavior.");
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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">📤 Upload Data</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                Upload PDFs/DOCX/TXT or paste URLs. Clean data gives better RAG & fine-tune results.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => fileInputRef.current?.click()} variant="ghost">
                <Upload className="mr-2 h-4 w-4" /> Select files
              </Button>
              <Button onClick={saveDataset} className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white" disabled={busy}>
                Save Dataset
              </Button>
            </div>
          </div>

          {/* Drag & drop */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" /> Drag & Drop Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); handleDragClass(true); }}
                onDragLeave={() => handleDragClass(false)}
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors bg-white dark:bg-slate-800 dark:border-slate-700"
                onClick={() => fileInputRef.current?.click()}
              >
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-600 to-fuchsia-500 flex items-center justify-center text-white">
                    <Upload size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">Drop files here or click to select</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400 mt-1">Supported: PDF, DOCX, TXT, MD, CSV. Recommended max 50MB per file.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* URL scraper */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" /> Scrape from URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={scrapeUrlHandler} className="flex gap-3">
                <Input placeholder="https://example.com/article" value={scrapeUrl} onChange={(e) => setScrapeUrl(e.target.value)} />
                <Button type="submit" disabled={busy}><Link className="mr-2 h-4 w-4" /> Scrape</Button>
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
                    <div key={f.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                          <CheckCircle />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">{f.name}</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400">{human(f.size)}</div>
                          {f.jobId && <div className="text-xs text-green-600">job: {f.jobId}</div>}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {f.status === "uploading" && <div className="text-xs text-gray-500">{f.progress}%</div>}
                        {f.status === "error" && <div className="text-xs text-rose-600">{f.error || "Error"}</div>}
                        <button onClick={() => removeFile(f.id)} className="text-rose-600"><Trash2 /></button>
                      </div>

                      {/* progress bar shown below each item */}
                      <div className="w-full mt-2">
                        {f.status === "uploading" && (
                          <div className="h-1 bg-gray-200 dark:bg-slate-700 rounded overflow-hidden mt-2">
                            <div style={{ width: `${f.progress}%` }} className="h-1 bg-indigo-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center gap-3">
                <Button onClick={() => { setFiles([]); setScraped([]); }} variant="outline" disabled={busy}><Trash2 className="mr-2" /> Clear</Button>
                <div className="text-sm text-gray-500">Tip: Remove irrelevant pages before indexing for better RAG results.</div>
              </div>
            </CardContent>
          </Card>

          {message && (
            <div className="rounded-md p-3 text-sm bg-amber-50 text-amber-800 border border-amber-100">{message}</div>
          )}
        </div>
      </main>
    </div>
  );
}
