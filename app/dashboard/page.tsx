"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";

/**
 * DashboardPage
 * - Quick overview of assistants, last models & training status
 * - Create Assistant CTA (modal + redirect)
 * - Replace mock data with API calls: GET /api/assistants, GET /api/models, GET /api/jobs
 */

type Assistant = { id: string; name: string; status: "ready" | "training" | "indexing" | "idle"; datasets: number; updatedAt: string };
type Model = { id: string; name: string; lastUsed: string; base: string };
type Job = { id: string; name: string; progress: number; status: string };

export default function DashboardPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  // Mock state — replace with fetches to backend
  const [assistants, setAssistants] = useState<Assistant[]>([
    { id: "a1", name: "Sales Assistant", status: "ready", datasets: 3, updatedAt: "2025-10-01" },
    { id: "a2", name: "HR Handbook", status: "indexing", datasets: 1, updatedAt: "2025-10-02" },
    { id: "a3", name: "Product Docs", status: "training", datasets: 6, updatedAt: "2025-09-28" },
  ]);
  const [models, setModels] = useState<Model[]>([
    { id: "m1", name: "ft-sales-v1", lastUsed: "2h ago", base: "phi-2-small" },
    { id: "m2", name: "rag-hr-v1", lastUsed: "1d ago", base: "openrouter" },
  ]);
  const [jobs, setJobs] = useState<Job[]>([
    { id: "j1", name: "ft-product-v2", progress: 70, status: "running" },
  ]);

  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/sign-in");
  }, [isLoaded, isSignedIn, router]);

  const totals = useMemo(() => ({
    assistants: assistants.length,
    models: models.length,
    runningJobs: jobs.filter(j => j.status === "running").length,
  }), [assistants, models, jobs]);

  async function createAssistant() {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      // TODO: replace with POST /api/assistants
      await new Promise(r => setTimeout(r, 800));
      const id = `a${Date.now()}`;
      setAssistants(s => [{ id, name: newName.trim(), status: "idle", datasets: 0, updatedAt: (new Date()).toISOString().slice(0,10) }, ...s]);
      setShowCreate(false);
      setNewName("");
      router.push(`/assistants/${id}`); // suggest next step
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  }

  function statusBadge(status: Assistant["status"]) {
    switch (status) {
      case "ready": return <Badge>Ready</Badge>;
      case "training": return <Badge variant="outline">Training</Badge>;
      case "indexing": return <Badge variant="secondary">Indexing</Badge>;
      default: return <Badge variant="outline">Idle</Badge>;
    }
  }

  if (!isLoaded) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!isSignedIn) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 overflow-auto ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">🏠 Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Quick overview of assistants, recent models and training status.</p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-500 text-white">
                <Plus size={14} /> Create Assistant
              </Button>
              <UserButton />
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Assistants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{totals.assistants}</div>
                <div className="text-sm text-gray-500 mt-1">Active & configured</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{totals.models}</div>
                <div className="text-sm text-gray-500 mt-1">Available artifacts</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Running Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{totals.runningJobs}</div>
                <div className="text-sm text-gray-500 mt-1">Indexing / Training</div>
              </CardContent>
            </Card>
          </div>

          {/* Main panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Assistants */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Assistants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assistants.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{a.name}</div>
                      <div className="text-xs text-gray-500 dark:text-slate-400">{a.datasets} dataset(s) • updated {a.updatedAt}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {statusBadge(a.status)}
                      <Button variant="ghost" onClick={() => router.push(`/assistants/${a.id}`)}>Open</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Right column: Models & Jobs */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Last Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {models.map(m => (
                      <li key={m.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">{m.name}</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400">{m.base}</div>
                        </div>
                        <div className="text-xs text-gray-500">{m.lastUsed}</div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {jobs.length === 0 ? (
                    <div className="text-sm text-gray-500">No active jobs</div>
                  ) : (
                    jobs.map(j => (
                      <div key={j.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{j.name}</div>
                          <div className="text-sm text-gray-500">{j.progress}%</div>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2">
                          <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${j.progress}%` }} />
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Create Assistant Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCreate(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6 border dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2">Create a new Assistant</h3>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 mb-3"
              placeholder="Assistant name (e.g. Sales Assistant)"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button onClick={createAssistant} disabled={creating || !newName.trim()} className="bg-indigo-600 text-white">
                {creating ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
