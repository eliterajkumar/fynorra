"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Mic, Volume2, Pause, Play as PlayIcon } from "lucide-react";

/**
 * PlaygroundPage (backend-integrated)
 *
 * - Replaces simulateResponse() with real API call to backend RAG endpoint.
 * - Expects backend endpoint (change BASE_URL or path if different):
 *    POST ${BASE_URL}/playground/query
 *    Form fields: dataset_id, assistant_name, question
 *    Response (expected): { answer: string, sources?: [{ id, text, page?, snippet?, url? }] }
 *
 * - Uses NEXT_PUBLIC_API_BASE env var (e.g. http://localhost:8000)
 * - Keeps voice/STT and TTS behavior
 */

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
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8001";

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
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [listening, setListening] = useState(false);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [ttsPlaying, setTtsPlaying] = useState(false);

  // New: dataset and assistant name selection
  const [datasetId, setDatasetId] = useState<string>(""); // set by query param or UI
  const [assistantName, setAssistantName] = useState<string>("Assistant");

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthUtterRef = useRef<SpeechSynthesisUtterance | null>(null);

  // auto-scroll to bottom when messages change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (!messagesRef.current) return;
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Setup Web Speech Recognition if available (Chrome/Edge)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition || null;
    if (!SpeechRecognition) return;
    const r = new SpeechRecognition();
    r.lang = "en-US";
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.onresult = (ev: any) => {
      const t = ev.results[0][0].transcript;
      setInput((old) => (old ? `${old} ${t}` : t));
    };
    r.onerror = (ev: any) => {
      console.warn("SpeechRecognition error", ev);
      setListening(false);
    };
    r.onend = () => {
      setListening(false);
    };
    recognitionRef.current = r;
  }, []);

  // Clean up TTS / recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) try { recognitionRef.current.stop(); } catch {}
      if (synthUtterRef.current) try { window.speechSynthesis.cancel(); } catch {}
    };
  }, []);

  // helpers
  function addMessage(msg: Message) {
    setMessages((m) => [...m, msg]);
  }

  function removeMessageById(id: string) {
    setMessages((m) => m.filter((x) => x.id !== id));
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    // require dataset selection for RAG queries
    if (!datasetId) {
      alert("Select a dataset in the Train/Upload page first (dataset id required).");
      return;
    }

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text, ts: Date.now() };
    addMessage(userMsg);
    setInput("");
    await requestAssistantReply(userMsg);
  }

  // Main: call backend RAG endpoint and add assistant reply
  async function requestAssistantReply(userMsg: Message) {
    // show assistant loading message
    const loadingMsg: Message = { id: `a-${Date.now()}`, role: "assistant", content: "", ts: Date.now(), loading: true };
    addMessage(loadingMsg);
    setAssistantLoading(true);

    try {
      // Build form data as backend expects (adapt if your backend expects JSON)
      const fd = new FormData();
      fd.append("dataset_id", datasetId);
      fd.append("assistant_name", assistantName);
      fd.append("question", userMsg.content);

      // POST to playground endpoint. Adjust path if your backend uses /rag_query or /playground/query.
      const res = await fetch(`${BASE_URL}/playground/query`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        // fallback: try /rag_query (some earlier code used this)
        try {
          const alt = await fetch(`${BASE_URL}/rag_query`, { method: "POST", body: fd });
          if (alt.ok) {
            const t = await alt.text();
            // alt endpoint in earlier sample returned plain stdout — put it into assistant answer
            removeMessageById(loadingMsg.id);
            addMessage({ id: `a-${Date.now()}`, role: "assistant", content: t, ts: Date.now() });
            setAssistantLoading(false);
            if (mode === "voice" && t) playTTS(t);
            return;
          }
        } catch (e) {
          console.warn("alternate rag_query failed", e);
        }
        throw new Error(`Server returned ${res.status}`);
      }

      // parse JSON response
      const j = await res.json();

      // expected shape: { answer: string, sources?: [{ id, text, page, snippet, url }] }
      let answerText = "";
      let sources: Citation[] = [];

      if (typeof j === "string") {
        // some endpoints return plain string
        answerText = j;
      } else if (j.answer || j.data || j.result) {
        // flexible mapping
        answerText = j.answer || j.data || j.result || "";
        if (Array.isArray(j.sources)) sources = j.sources;
        else if (Array.isArray(j.contexts)) sources = j.contexts;
      } else if (j.choices && Array.isArray(j.choices) && j.choices[0]?.text) {
        // Llama style
        answerText = j.choices[0].text;
      } else {
        // fallback: stringify
        answerText = JSON.stringify(j).slice(0, 1000);
      }

      // remove loading message and append actual assistant reply
      removeMessageById(loadingMsg.id);
      addMessage({
        id: `a-${Date.now()}`,
        role: "assistant",
        content: answerText,
        ts: Date.now(),
        citations: sources,
      });

      // auto-play TTS if in voice mode and supported
      if (mode === "voice" && answerText) {
        playTTS(answerText);
      }
    } catch (err: any) {
      console.error("requestAssistantReply error", err);
      // replace loading with error message
      setMessages((m) =>
        m.map((x) => (x.id === loadingMsg.id ? { ...x, loading: false, content: `Error: ${err?.message || "Failed to get response."}` } : x))
      );
    } finally {
      setAssistantLoading(false);
    }
  }

  // Speech Recognition controls
  function startListening() {
    const r = recognitionRef.current;
    if (!r) {
      alert("SpeechRecognition not supported in this browser.");
      return;
    }
    try {
      r.start();
      setListening(true);
    } catch (e) {
      console.warn(e);
    }
  }
  function stopListening() {
    const r = recognitionRef.current;
    if (r) try { r.stop(); } catch {}
    setListening(false);
  }

  // TTS (browser)
  function playTTS(text: string) {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
    } catch {}
    const ut = new SpeechSynthesisUtterance(text);
    synthUtterRef.current = ut;
    ut.onstart = () => setTtsPlaying(true);
    ut.onend = () => setTtsPlaying(false);
    ut.onerror = () => setTtsPlaying(false);
    window.speechSynthesis.speak(ut);
  }
  function stopTTS() {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
    } catch {}
    setTtsPlaying(false);
  }

  // small UI helpers
  const canUseSpeechRec = typeof window !== "undefined" && (!!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition);
  const canUseTTS = typeof window !== "undefined" && "speechSynthesis" in window;

  // quick helper to render sources under an assistant message
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
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">🧩 Playground</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Test your assistant with text or voice. Citations are shown for RAG responses.</p>
            </div>

            <div className="flex items-center gap-3">
              {/* datasetId + assistant name inputs — user sets which dataset to use & assistant label */}
              <Input placeholder="Dataset ID (required)" value={datasetId} onChange={(e) => setDatasetId(e.target.value)} style={{ width: 220 }} />
              <Input placeholder="Assistant name" value={assistantName} onChange={(e) => setAssistantName(e.target.value)} style={{ width: 200 }} />
            </div>
          </div>

          <Card className="flex flex-col h-[640px]">
            <CardHeader>
              <CardTitle>Chat</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-4">
              <div ref={messagesRef} className="h-full overflow-y-auto space-y-4 pb-4">
                {messages.length === 0 && (
                  <div className="text-center text-sm text-gray-500 mt-12">No messages yet — ask something to get started.</div>
                )}

                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] p-3 rounded-lg ${m.role === "user" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border dark:border-slate-700"}`}>
                      <div className="text-sm whitespace-pre-wrap">{m.loading ? <span className="italic text-gray-500">Thinking...</span> : m.content}</div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                        <div>{new Date(m.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                      </div>

                      {/* show citations under assistant messages */}
                      {m.role === "assistant" && renderCitations(m.citations)}
                    </div>
                  </div>
                ))}

                {/* typing indicator */}
                {assistantLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[65%] p-3 rounded-lg bg-white dark:bg-slate-800 border dark:border-slate-700">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" />
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-75" />
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150" />
                        <div className="ml-2 text-xs">Assistant is typing...</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            {/* Input / controls */}
            <div className="p-4 border-t dark:border-slate-700 bg-gradient-to-tr from-white to-gray-50 dark:from-slate-900">
              <div className="flex gap-3 items-center">
                {/* Voice controls */}
                <div className="flex items-center gap-2">
                  <Button onClick={() => setMode("voice")} variant={mode === "voice" ? "default" : "outline"}>
                    <Mic className="mr-2 h-4 w-4" /> Voice
                  </Button>
                  <Button onClick={() => setMode("text")} variant={mode === "text" ? "default" : "outline"}>
                    <Volume2 className="mr-2 h-4 w-4" /> Text
                  </Button>
                </div>

                {mode === "voice" ? (
                  <div className="flex items-center gap-2">
                    <Button onClick={() => (listening ? stopListening() : startListening())} className={`${listening ? "bg-rose-500 text-white" : ""}`}>
                      <Mic className="h-4 w-4" />
                      {listening ? "Stop" : "Record"}
                    </Button>
                    <div className="text-sm text-gray-500">{listening ? "Listening..." : "Use microphone to speak your query."}</div>
                  </div>
                ) : (
                  <>
                    <Input
                      placeholder="Type your message and press Enter or Send..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* TTS playback control when a last assistant message exists */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant" && !m.loading);
                      if (lastAssistant) playTTS(lastAssistant.content);
                    }}
                    title="Play last reply"
                    disabled={!canUseTTS}
                  >
                    <PlayIcon className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => stopTTS()} title="Stop TTS" disabled={!canUseTTS}>
                    <Pause className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-4">
                <div className="text-xs text-gray-500">TTS: {canUseTTS ? "available" : "not supported"}</div>
                <div className="text-xs text-gray-500">STT: {canUseSpeechRec ? "available" : "not supported"}</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
