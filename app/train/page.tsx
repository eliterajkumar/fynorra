"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Trash2, Info } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/**
 * Train Page (backend integrated)
 *
 * Uses these backend endpoints (adjust BASE_URL or endpoints if your backend differs):
 *  - GET  /datasets
 *  - POST /datasets/{datasetId}/train        -> { job_id }
 *  - GET  /train/{jobId}/status              -> { status, progress }
 *  - GET  /train/{jobId}/logs                -> { logs: string[] }
 *  - POST /train/{jobId}/cancel
 *
 * If your API uses other paths (e.g. /datasets/{id}/status), update functions:
 *   startTrain(), pollJobStatus(), fetchJobLogs(), cancelJobRequest()
 */

type Dataset = { id: string; name: string; sizeMB: number; docs: number; uploadedAt: string };
type TrainJob = {
  id: string; // job id returned by backend
  datasetId: string;
  modelType: "RAG" | "LoRA";
  status: "queued" | "running" | "completed" | "cancelled" | "failed";
  progress: number;
  startedAt?: string;
  finishedAt?: string;
  logs: string[];
};

const BASE_URL = "https://c33822360e09.ngrok-free.app";

export default function TrainPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string>("");
  const [modelType, setModelType] = useState<"RAG" | "LoRA">("RAG");
  const [jobs, setJobs] = useState<TrainJob[]>([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const logsRef = useRef<HTMLDivElement | null>(null);

  // Polling map: jobId -> intervalId
  const pollingRef = useRef<Record<string, number>>({});

  // load datasets on mount
  useEffect(() => {
    fetchDatasets();
    // restore jobs from localStorage (lightweight UI persistence)
    const raw = localStorage.getItem("train_jobs_v1");
    if (raw) setJobs(JSON.parse(raw));
    // cleanup on unmount: clear intervals
    return () => {
      Object.values(pollingRef.current).forEach((id) => clearInterval(id));
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("train_jobs_v1", JSON.stringify(jobs));
    // auto-scroll logs if active job changes
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [jobs]);

  // Fetch datasets from backend
  async function fetchDatasets() {
    try {
      const res = await fetch(`${BASE_URL}/datasets`);
      if (!res.ok) throw new Error(`datasets fetch failed: ${res.status}`);
      const data: Dataset[] = await res.json();
      setDatasets(data);
      // auto-select first dataset if none selected
      if (!selectedDataset && data.length > 0) setSelectedDataset(data[0].id);
    } catch (err) {
      console.error("fetchDatasets error", err);
      // fallback: keep existing demo datasets if network fails
      if (datasets.length === 0) {
        setDatasets([
          { id: "d1", name: "Product Manuals", sizeMB: 12.4, docs: 14, uploadedAt: "2025-09-29" },
          { id: "d2", name: "Sales FAQ", sizeMB: 2.1, docs: 3, uploadedAt: "2025-10-01" },
        ]);
      }
    }
  }

  // Start training job on backend
  async function startTrainRequest(datasetId: string, model: "RAG" | "LoRA") {
    // POST /datasets/{datasetId}/train
    try {
      const res = await fetch(`${BASE_URL}/datasets/${datasetId}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_type: model }),
      });
      if (!res.ok) throw new Error(`startTrain failed ${res.status}`);
      const data = await res.json();
      // Expect { job_id: string }
      return data.job_id as string;
    } catch (err) {
      console.error("startTrainRequest error", err);
      return null;
    }
  }

  // Poll job status endpoint (starts interval). Adjust path if needed.
  function pollJobStatus(jobId: string) {
    // if already polling, skip
    if (pollingRef.current[jobId]) return;
    // poll every 2s
    const iid = window.setInterval(async () => {
      try {
        const res = await fetch(`${BASE_URL}/train/${jobId}/status`);
        if (!res.ok) throw new Error("status fetch failed");
        const json = await res.json(); // { status, progress }
        const { status, progress } = json;
        setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status, progress } : j)));
        // also fetch logs to append/refresh
        await fetchJobLogs(jobId);
        if (status === "completed" || status === "failed" || status === "cancelled") {
          clearInterval(iid);
          delete pollingRef.current[jobId];
          // set finishedAt
          setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, finishedAt: new Date().toISOString() } : j)));
        }
      } catch (err) {
        console.error("pollJobStatus error", err);
      }
    }, 2000);
    pollingRef.current[jobId] = iid;
  }

  // Fetch logs for a job and append to job.logs
  async function fetchJobLogs(jobId: string) {
    try {
      const res = await fetch(`${BASE_URL}/train/${jobId}/logs`);
      if (!res.ok) throw new Error("logs fetch failed");
      const json = await res.json(); // { logs: string[] }
      const logs: string[] = json.logs || [];
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, logs: mergeLogs(j.logs, logs) } : j))
      );
    } catch (err) {
      console.error("fetchJobLogs error", err);
    }
  }

  // Helper: merge new logs into old (avoid duplicates)
  function mergeLogs(oldLogs: string[], newLogs: string[]) {
    if (!newLogs || newLogs.length === 0) return oldLogs;
    // simple dedupe by string equality and keep order: old + (new minus old)
    const set = new Set(oldLogs);
    const appended = newLogs.filter((l) => !set.has(l));
    return [...oldLogs, ...appended];
  }

  // cancel request to backend
  async function cancelJobRequest(jobId: string) {
    try {
      const res = await fetch(`${BASE_URL}/train/${jobId}/cancel`, { method: "POST" });
      if (!res.ok) throw new Error("cancel failed");
      // update local state immediately; backend should also reflect it on next poll
      setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "cancelled", finishedAt: new Date().toISOString() } : j)));
      // clear polling interval if exists
      if (pollingRef.current[jobId]) {
        clearInterval(pollingRef.current[jobId]);
        delete pollingRef.current[jobId];
      }
    } catch (err) {
      console.error("cancelJobRequest error", err);
    }
  }

  // UI action: confirm start job (calls backend)
  async function confirmStartJob() {
    if (!selectedDataset) return;
    setOpenConfirm(false);
    // create a placeholder local job so UI is responsive; will be aligned after first poll
    const placeholderJob: TrainJob = {
      id: `local-${Date.now()}`,
      datasetId: selectedDataset,
      modelType,
      status: "queued",
      progress: 0,
      startedAt: new Date().toISOString(),
      logs: [`Queued training for dataset ${selectedDataset}`],
    };
    setJobs((s) => [placeholderJob, ...s]);

    // call backend to start actual job
    const realJobId = await startTrainRequest(selectedDataset, modelType);
    if (!realJobId) {
      // mark placeholder as failed
      setJobs((prev) => prev.map((j) => (j.id === placeholderJob.id ? { ...j, status: "failed", logs: [...j.logs, "Failed to start job"] } : j)));
      return;
    }

    // replace placeholder job id with real job id
    setJobs((prev) => prev.map((j) => (j.id === placeholderJob.id ? { ...j, id: realJobId, status: "running", progress: 2, logs: [...j.logs, `Started job ${realJobId}`] } : j)));

    // start polling job status & logs
    pollJobStatus(realJobId);
    // fetch initial logs immediately
    await fetchJobLogs(realJobId);
  }

  // cancel job (UI action)
  function cancelJob(jobId: string) {
    // optimistic update
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "cancelled" } : j)));
    // call backend cancel
    cancelJobRequest(jobId);
  }

  // estimate time & cost (same heuristics as before)
  const estimate = useMemo(() => {
    const ds = datasets.find((d) => d.id === selectedDataset);
    if (!ds) return { time: "—", cost: "—" };
    if (modelType === "RAG") {
      const mins = Math.max(1, Math.round((ds.sizeMB / 10) * 0.5));
      return { time: `${mins}m`, cost: `₹${Math.max(10, Math.round(ds.sizeMB * 0.1))}` };
    } else {
      const mins = Math.max(10, Math.round((ds.sizeMB / 100) * 20));
      return { time: `${mins}m`, cost: `₹${Math.max(200, Math.round(ds.sizeMB * 0.5))}` };
    }
  }, [selectedDataset, modelType, datasets]);

  // Selected dataset object
  const selectedDatasetObj = datasets.find((d) => d.id === selectedDataset) || null;

  // Active job (top-most running or last created)
  const activeJob = jobs.find((j) => j.status === "running") || jobs[0] || null;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />
      <main className="flex-1 overflow-auto ml-0 md:ml-64">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">🧠 Train AI</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Choose dataset, select training mode, and run a job. Monitor logs & progress here.</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-slate-400">Tip: Use RAG for small datasets; LoRA for large curated data.</div>
          </div>

          {/* Setup */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Training Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Dataset select */}
                <div>
                  <label className="block text-sm font-medium mb-2">Dataset</label>
                  <Select value={selectedDataset} onValueChange={(v) => setSelectedDataset(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose dataset (upload first)" />
                    </SelectTrigger>
                    <SelectContent>
                      {datasets.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name} — {d.docs} docs — {d.sizeMB} MB
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedDatasetObj && (
                    <div className="mt-3 text-xs text-gray-500 dark:text-slate-400">
                      <div>Uploaded: {selectedDatasetObj.uploadedAt}</div>
                      <div>{selectedDatasetObj.docs} documents • {selectedDatasetObj.sizeMB} MB</div>
                    </div>
                  )}
                </div>

                {/* Model type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Model Type</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setModelType("RAG")}
                      className={`px-3 py-2 rounded-md border ${modelType === "RAG" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-slate-800"}`}
                    >
                      RAG
                    </button>
                    <button
                      onClick={() => setModelType("LoRA")}
                      className={`px-3 py-2 rounded-md border ${modelType === "LoRA" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-slate-800"}`}
                    >
                      LoRA (Fine-tune)
                    </button>

                    <div className="ml-auto text-sm text-gray-500 dark:text-slate-400 flex items-center gap-1">
                      <Info size={14} /> <span>{modelType === "RAG" ? "Fast updates, no GPU" : "Private model, needs GPU"}</span>
                    </div>
                  </div>
                </div>

                {/* Estimate & start */}
                <div className="flex items-center gap-3 justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Estimated time</div>
                    <div className="font-semibold">{estimate.time}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">Estimated cost</div>
                    <div className="font-semibold">{estimate.cost}</div>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      onClick={() => setOpenConfirm(true)}
                      className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white"
                      disabled={!selectedDataset}
                    >
                      <Play className="mr-2 h-4 w-4" /> {modelType === "RAG" ? "Index for RAG" : "Start Fine-tune"}
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Right column: history & tips */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training History</CardTitle>
                </CardHeader>
                <CardContent>
                  {jobs.length === 0 && <div className="text-sm text-gray-500">No jobs yet.</div>}
                  <ul className="space-y-3">
                    {jobs.map((j) => (
                      <li key={j.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">{j.modelType} • {datasets.find(d=>d.id===j.datasetId)?.name || j.datasetId}</div>
                          <div className="text-xs text-gray-500">{j.status} • {j.progress}%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {j.status === "running" ? (
                            <Button variant="outline" onClick={() => cancelJob(j.id)}><Pause size={14} /> Cancel</Button>
                          ) : (
                            <Button variant="ghost" onClick={() => {
                              // open logs for this job - scroll to it in the panel
                              setJobs((prev) => {
                                // move selected job to top for easy viewing
                                const copy = prev.filter(x => x.id !== j.id);
                                return [{ ...j }, ...copy];
                              });
                            }}>View</Button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-slate-300 space-y-2">
                    <li>For small or frequently changing docs, prefer RAG.</li>
                    <li>For brand tone or deep customization, use LoRA with high-quality QA pairs (GPU required).</li>
                    <li>Remove noisy content before training (preview on Upload page).</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Active job / logs */}
          {activeJob && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">Active Job</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Live Job Monitor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-slate-300">Job: {activeJob.id}</div>
                      <div className="text-sm text-gray-500">{activeJob.status}</div>
                    </div>
                    <div className="mt-3">
                      <Progress value={activeJob.progress} className="w-full" />
                    </div>
                  </div>

                  <div className="h-40 overflow-y-auto bg-gray-50 dark:bg-slate-800 p-3 rounded-md font-mono text-xs" ref={logsRef}>
                    {activeJob.logs.map((l, i) => (
                      <div key={i} className="mb-1">{l}</div>
                    ))}
                  </div>

                  <div className="flex gap-2 justify-end">
                    {activeJob.status === "running" ? (
                      <Button variant="outline" onClick={() => cancelJob(activeJob.id)}><Pause size={14} /> Cancel</Button>
                    ) : null}
                    <Button variant="ghost" onClick={() => { setJobs((p) => p.slice(1)); }}>Dismiss</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Confirm dialog */}
          <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{modelType === "RAG" ? "Confirm RAG Indexing" : "Confirm Fine-tune"}</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                {modelType === "RAG"
                  ? `Index dataset "${selectedDatasetObj?.name}" for retrieval. Estimated: ${estimate.time}, cost ~ ${estimate.cost}.`
                  : `Fine-tune a private model on "${selectedDatasetObj?.name}". Estimated: ${estimate.time}, cost ~ ${estimate.cost}.`}
              </p>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpenConfirm(false)}>Cancel</Button>
                <Button onClick={confirmStartJob} className="bg-indigo-600 text-white">{modelType === "RAG" ? "Start Index" : "Start Training"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
