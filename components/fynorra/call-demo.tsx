"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneOff, Mic, Loader2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reworked CallDemo:
 * - Modal opens idle ("Ready — press Record")
 * - User clicks RECORD -> create session (/api/start_demo) -> show Connecting...
 * - Start MediaRecorder & stream chunks to /voice/stream
 * - When first backend response with audio/text arrives -> mark Connected
 * - Stop stops streaming and calls /voice/stream/end
 *
 * Make sure NEXT_PUBLIC_API_BASE is set (e.g. http://127.0.0.1:8001)
 */

interface CallDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type LeadForm = {
  name: string;
  phone: string;
  email: string;
  service?: string;
  message?: string;
};

export function CallDemo({ open, onOpenChange }: CallDemoProps) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8001";
  const START_DEMO_URL = `${API_BASE}/api/start_demo`;
  const VOICE_STREAM_URL = `${API_BASE}/voice/stream`;
  const VOICE_STREAM_END = `${VOICE_STREAM_URL}/end`;

  const [isRecording, setIsRecording] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // becomes true only after first backend reply
  const [callStatus, setCallStatus] = useState("Ready — press Record");
  const [form, setForm] = useState<LeadForm>({ name: "", phone: "", email: "", service: "Demo", message: "" });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sendQueueRef = useRef<Promise<any>>(Promise.resolve());
  const sessionIdRef = useRef<string | null>(null);
  const gotFirstReplyRef = useRef(false);

  // helpers
  const readBlobAsDataURL = (blob: Blob) =>
    new Promise<string>((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result as string);
      fr.onerror = () => rej(new Error("Failed to read blob"));
      fr.readAsDataURL(blob);
    });

  const playAudioDataUri = async (dataUri: string | undefined) => {
    if (!dataUri || !audioRef.current) return;
    try {
      audioRef.current.src = dataUri;
      await audioRef.current.play();
    } catch (e) {
      console.warn("Playback failed:", e);
    }
  };

  // create session on server and store session id
  const createSessionOnServer = async (lead?: Partial<LeadForm>) => {
    setCallStatus("Creating session...");
    try {
      const body = {
        name: lead?.name ?? form.name ?? "Guest",
        phone: lead?.phone ?? form.phone ?? "0000000000",
        email: lead?.email ?? form.email ?? "guest@example.com",
        service: lead?.service ?? form.service ?? "Demo",
        message: lead?.message ?? form.message ?? "",
        consent: true,
      };
      const res = await fetch(START_DEMO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await res.json();
      if (!res.ok) {
        setCallStatus(j?.detail || j?.error || "Failed to create session");
        return null;
      }
      if (j?.session_id) {
        sessionIdRef.current = j.session_id;
        setCallStatus("Connecting...");
        return j.session_id;
      }
      setCallStatus("No session returned");
      return null;
    } catch (err) {
      console.error("createSession error", err);
      setCallStatus("Network error: cannot create session");
      return null;
    }
  };

  // send chunk to backend (sequential queue)
  const sendChunk = async (dataUri: string) => {
    sendQueueRef.current = sendQueueRef.current
      .catch(() => {})
      .then(async () => {
        try {
          const body = { session_id: sessionIdRef.current, chunk: dataUri };
          const ctrl = new AbortController();
          const timeout = setTimeout(() => ctrl.abort(), 25000);
          setIsProcessing(true);
          const resp = await fetch(VOICE_STREAM_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: ctrl.signal,
          });
          clearTimeout(timeout);
          if (!resp.ok) {
            const txt = await resp.text().catch(() => "");
            console.warn("stream endpoint error:", resp.status, txt);
            setCallStatus("Server error while streaming");
            return;
          }
          const json = await resp.json().catch(() => null);
          if (json?.session_id) sessionIdRef.current = json.session_id;
          if (!gotFirstReplyRef.current && (json?.audio || json?.text)) {
            gotFirstReplyRef.current = true;
            setIsConnected(true);
            setCallStatus("Connected — Live");
          }
          if (json?.audio) {
            await playAudioDataUri(json.audio);
          }
          if (json?.text) {
            // show interim text
            setCallStatus(json.text);
          }
        } catch (err: any) {
          if (err.name === "AbortError") {
            console.warn("Chunk send aborted (timeout)");
            setCallStatus("Network timeout while streaming");
          } else {
            console.error("sendChunk error:", err);
            setCallStatus("Streaming error");
          }
        } finally {
          setIsProcessing(false);
        }
      });
    return sendQueueRef.current;
  };

  // start recording flow: create session -> ask mic permission -> start recorder -> stream
  const startRecording = async () => {
    if (isRecording) return;
    setIsRecording(true);
    setIsConnected(false);
    gotFirstReplyRef.current = false;
    setCallStatus("Creating session...");
    const sid = await createSessionOnServer();
    if (!sid) {
      setIsRecording(false);
      return;
    }
    // request mic & start recorder
    try {
      setCallStatus("Requesting microphone...");
      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = localStream;
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/ogg;codecs=opus";
      const recorder = new MediaRecorder(localStream, { mimeType: mime });
      mediaRecorderRef.current = recorder;

      recorder.onstart = () => {
        setIsStreaming(true);
        setCallStatus("Connecting...");
      };

      recorder.ondataavailable = async (ev: BlobEvent) => {
        if (!ev.data || ev.data.size === 0) return;
        try {
          const dataUri = await readBlobAsDataURL(ev.data);
          // send chunk (queued)
          sendChunk(dataUri);
        } catch (e) {
          console.error("Failed to read chunk:", e);
        }
      };

      recorder.onerror = (e) => {
        console.error("recorder error", e);
        setCallStatus("Microphone error");
      };

      // start sending chunks every 900ms
      recorder.start(900);
      setCallStatus("Connecting...");
    } catch (err) {
      console.error("mic access failed:", err);
      setCallStatus("Microphone access denied. Allow mic and press Record again.");
      setIsRecording(false);
    }
  };

  // stop recording
  const stopRecording = async () => {
    // stop recorder & tracks
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    } catch {}
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    mediaRecorderRef.current = null;
    streamRef.current = null;

    // wait for queue to drain quickly
    await sendQueueRef.current.catch(() => {});
    // call backend end
    try {
      if (sessionIdRef.current) {
        await fetch(VOICE_STREAM_END, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionIdRef.current }),
        }).catch(() => {});
      }
    } catch {}
    setIsStreaming(false);
    setIsRecording(false);
    setIsProcessing(false);
    setIsConnected(false);
    gotFirstReplyRef.current = false;
    setCallStatus("Ready — press Record");
    sessionIdRef.current = null;
  };

  // End call button handler (same as stop + close)
  const handleEndCall = async () => {
    await stopRecording();
    onOpenChange(false);
  };

  // cleanup when modal closes
  useEffect(() => {
    if (!open) {
      stopRecording().catch(() => {});
      setCallStatus("Ready — press Record");
    } else {
      // when opened, reset to idle
      setCallStatus("Ready — press Record");
      setIsRecording(false);
      setIsStreaming(false);
      setIsConnected(false);
      setIsProcessing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-2xl font-bold">AI Call Demo</DialogTitle>
          <DialogDescription>{callStatus}</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Optional: quick lead fields so session has real lead data */}
          {!isRecording && (
            <div className="space-y-2">
              <input className="input" placeholder="Your name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
              <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
            </div>
          )}

          <div className="flex justify-center items-center gap-4 bg-slate-800/50 p-4 rounded-xl">
            <div className={cn("h-16 w-16 rounded-full bg-slate-700/50 flex items-center justify-center text-white")}>
              {isConnected ? <Mic className="h-7 w-7" /> : <Loader2 className="h-7 w-7 animate-spin" />}
            </div>

            <div className="flex gap-2">
              {!isRecording ? (
                <Button onClick={() => startRecording()} className="px-6 py-2">
                  Record
                </Button>
              ) : (
                <Button variant="destructive" onClick={() => stopRecording()} className="px-6 py-2">
                  Stop
                </Button>
              )}

              <Button variant="ghost" onClick={handleEndCall}>
                Close
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-slate-400">
            <p>{isProcessing ? "Processing..." : ""}</p>
            <p className="mt-2">Tip: Press Record only when you're ready to speak — this reduces usage.</p>
          </div>
        </div>

        <audio ref={audioRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
