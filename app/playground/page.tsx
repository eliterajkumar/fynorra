"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

type Citation = { id?: string; text?: string; url?: string; page?: number; snippet?: string };
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
  citations?: Citation[];
  loading?: boolean;
};

const STORAGE_KEY = "fynorra_playground_v1";
const BASE_URL = "https://c33822360e09.ngrok-free.app";

export default function PlaygroundPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [assistantLoading, setAssistantLoading] = useState(false);

  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (!messagesRef.current) return;
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function addMessage(msg: Message) {
    setMessages((m) => [...m, msg]);
  }

  function removeMessageById(id: string) {
    setMessages((m) => m.filter((x) => x.id !== id));
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text, ts: Date.now() };
    addMessage(userMsg);
    setInput("");
    await requestAssistantReply(userMsg);
  }

  async function requestAssistantReply(userMsg: Message) {
    const loadingMsg: Message = { id: `a-${Date.now()}`, role: "assistant", content: "", ts: Date.now(), loading: true };
    addMessage(loadingMsg);
    setAssistantLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/dev/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg.content }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const j = await res.json();
      let answerText = j.answer || "No response received";
      let sources: Citation[] = j.sources || [];

      removeMessageById(loadingMsg.id);
      addMessage({
        id: `a-${Date.now()}`,
        role: "assistant",
        content: answerText,
        ts: Date.now(),
        citations: sources,
      });
    } catch (err: any) {
      console.error("requestAssistantReply error", err);
      setMessages((m) =>
        m.map((x) => (x.id === loadingMsg.id ? { ...x, loading: false, content: `Error: ${err?.message || "Failed to get response."}` } : x))
      );
    } finally {
      setAssistantLoading(false);
    }
  }

  function renderCitations(citations?: Citation[]) {
    if (!citations || citations.length === 0) return null;
    return (
      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Sources:
        <ul className="list-disc list-inside">
          {citations.map((c, i) => (
            <li key={i}>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                  {c.text || c.snippet || c.id}
                </a>
              ) : (
                <span>{c.text || c.snippet || c.id}</span>
              )}
              {c.page ? <span className="ml-2 text-xs text-gray-400"> (page {c.page})</span> : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 overflow-auto ml-0 md:ml-64">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Chat</h1>
            <Button onClick={() => setMessages([])} variant="outline" size="sm">
              Clear
            </Button>
          </div>

          <div className="flex flex-col h-[calc(100vh-200px)] bg-white dark:bg-slate-900 rounded-lg border dark:border-slate-700">
            <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-slate-400">Start a conversation...</p>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"}`}>
                    <div className="whitespace-pre-wrap">{m.loading ? "Thinking..." : m.content}</div>
                    {m.role === "assistant" && renderCitations(m.citations)}
                  </div>
                </div>
              ))}

              {assistantLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" />
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-75" />
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t dark:border-slate-700">
              <div className="flex gap-3">
                <Input
                  placeholder="Message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  className="flex-1 rounded-full"
                  disabled={assistantLoading}
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={!input.trim() || assistantLoading}
                  className="rounded-full px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}