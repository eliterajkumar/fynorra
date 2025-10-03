"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneOff, Mic, VolumeX, Volume2, Loader2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One-click Call Demo (minimal):
 * - Click "Call Demo" -> Connecting...
 * - When backend sends first text (e.g. "Hey — how can I help you today") -> show that text and mark Connected
 * - Buttons: Call Demo, Mute/Unmute, End Call
 *
 * Set NEXT_PUBLIC_API_BASE in .env.local
 */

interface CallDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CallDemo({ open, onOpenChange }: CallDemoProps) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8001";
  const START_DEMO_URL = `${API_BASE}/api/start_demo`;
  const VOICE_STREAM_URL = `${API_BASE}/voice/stream`;
  const VOICE_STREAM_END = `${VOICE_STREAM_URL}/end`;

  const [state, setState] = useState<"idle" | "connecting" | "connected">("idle");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callStatus, setCallStatus] = useState("Ready — click Call Demo");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sendQueueRef = useRef<Promise<any>>(Promise.resolve());
  const sessionIdRef = useRef<string | null>(null);
  const gotFirstReplyRef = useRef(false);

  // convert blob to dataURI
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

  // sequential send to avoid parallel requests
  const sendChunk = async (dataUri: string) => {
    sendQueueRef.current = sendQueueRef.current
      .catch(() => {})
      .then(async () => {
        try {
          if (isMuted) return; // do not send when muted
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
          // backend responds with { session_id?, text?, audio? }
          if (json?.session_id) sessionIdRef.current = json.session_id;
          if (!gotFirstReplyRef.current && (json?.text || json?.audio)) {
            gotFirstReplyRef.current = true;
            setState("connected");
            setCallStatus(json?.text ?? "Connected — Live");
          }
          if (json?.audio) await playAudioDataUri(json.audio);
          if (json?.text) setCallStatus(json.text);
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

  // create session before streaming (so lead/session exists server-side)
  const createSessionOnServer = async () => {
    setCallStatus("Creating session...");
    setState("connecting");
    try {
      const res = await fetch(START_DEMO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "WebUser", phone: "0000000000", email: "web@demo.local", consent: true }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCallStatus(j?.detail || j?.error || "Failed to create session");
        setState("idle");
        return null;
      }
      if (j?.session_id) {
        sessionIdRef.current = j.session_id;
        setCallStatus("Connecting...");
        return j.session_id;
      }
      setCallStatus("No session returned");
      setState("idle");
      return null;
    } catch (err) {
      console.error("createSession error", err);
      setCallStatus("Network error: cannot create session");
      setState("idle");
      return null;
    }
  };

  // start the recorder and streaming (called when user clicks Call Demo)
  const startCall = async () => {
    if (state === "connecting" || state === "connected") return;
    gotFirstReplyRef.current = false;
    setCallStatus("Creating session...");
    const sid = await createSessionOnServer();
    if (!sid) return;

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
        setCallStatus("Connecting...");
      };

      recorder.ondataavailable = async (ev: BlobEvent) => {
        if (!ev.data || ev.data.size === 0) return;
        try {
          const dataUri = await readBlobAsDataURL(ev.data);
          sendChunk(dataUri);
        } catch (e) {
          console.error("Failed reading chunk:", e);
        }
      };

      recorder.onerror = (e) => {
        console.error("recorder error", e);
        setCallStatus("Microphone error");
      };

      recorder.start(900); // send every ~900ms
      // show spinner until first backend reply
      setCallStatus("Connecting...");
      setState("connecting");
    } catch (err) {
      console.error("mic access failed:", err);
      setCallStatus("Microphone access denied. Allow mic and click Call Demo again.");
      setState("idle");
    }
  };

  const stopCall = async () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
    } catch {}
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    mediaRecorderRef.current = null;
    streamRef.current = null;

    // drain queue
    await sendQueueRef.current.catch(() => {});

    // notify backend
    try {
      if (sessionIdRef.current) {
        await fetch(VOICE_STREAM_END, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionIdRef.current }),
        }).catch(() => {});
      }
    } catch {}
    sessionIdRef.current = null;
    gotFirstReplyRef.current = false;
    setIsMuted(false);
    setState("idle");
    setCallStatus("Ready — click Call Demo");
  };

  const toggleMute = () => setIsMuted((m) => !m);

  // cleanup on modal close
  useEffect(() => {
    if (!open) {
      stopCall().catch(() => {});
      setCallStatus("Ready — click Call Demo");
    } else {
      // reset status when opened
      setCallStatus("Ready — click Call Demo");
      setIsMuted(false);
      setState("idle");
      gotFirstReplyRef.current = false;
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

        <div className="flex flex-col items-center gap-8 py-8">
          <div className="relative">
            <div className={cn("w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center transition-all", isProcessing && "scale-110")}>
              <Bot className="w-16 h-16 text-white" />
            </div>
            <div className={cn("absolute inset-0 rounded-full border-4 border-emerald-400/50", isProcessing && "animate-ping")}></div>
          </div>
          <p className="font-semibold text-xl">Fynorra AI Assistant</p>
        </div>

        <div className="flex justify-center items-center gap-4 bg-slate-800/50 p-4 rounded-xl">
          <div className={cn("h-16 w-16 rounded-full bg-slate-700/50 flex items-center justify-center text-white")}>
            {state === "connected" ? <Mic className="h-7 w-7" /> : <Loader2 className="h-7 w-7 animate-spin" />}
          </div>

          <div className="flex gap-2">
            <Button onClick={startCall} className="px-6 py-2" disabled={state === "connecting" || state === "connected"}>
              Call Demo
            </Button>

            <Button onClick={toggleMute} variant="secondary" className="px-4 py-2" disabled={state === "idle"}>
              {isMuted ? <VolumeX className="mr-2" /> : <Volume2 className="mr-2" />} {isMuted ? "Unmute" : "Mute"}
            </Button>

            <Button variant="destructive" onClick={() => { stopCall().then(() => onOpenChange(false)); }} className="px-4 py-2" disabled={state === "idle"}>
              <PhoneOff className="mr-2" /> End Call
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-slate-400 mt-4">
          <p>{isProcessing ? "Processing..." : ""}</p>
          <p className="mt-2">Tip: Click Call Demo then allow microphone. Wait until agent says "Hey — how can I help you today".</p>
        </div>

        <audio ref={audioRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
