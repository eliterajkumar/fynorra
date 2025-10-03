"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneOff, Mic, VolumeX, Volume2, Loader2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One-click Call Demo
 * - No form fields (UI simplified)
 * - Click "Call Demo" -> create session -> request mic -> start streaming
 * - Shows "Connecting..." until first backend reply -> then "Connected — Live"
 * - Mute / Unmute toggles sending of audio (keeps mic open)
 * - End call stops session and notifies backend
 * - Attempts a single automatic recorder restart if the recorder unexpectedly stops
 *
 * Make sure NEXT_PUBLIC_API_BASE is set: e.g. http://127.0.0.1:8001
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

  const [state, setState] = useState<"idle" | "creating" | "connecting" | "connected" | "ended">("idle");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callStatus, setCallStatus] = useState("Ready — click Call Demo");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sendQueueRef = useRef<Promise<any>>(Promise.resolve());
  const sessionIdRef = useRef<string | null>(null);
  const gotFirstReplyRef = useRef(false);
  const restartAttemptRef = useRef(false); // allow one automatic restart

  // helper to read Blob -> data URI
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

  // sequential send queue to keep ordering
  const sendChunk = async (dataUri: string) => {
    sendQueueRef.current = sendQueueRef.current
      .catch(() => {})
      .then(async () => {
        try {
          if (isMuted) return; // if muted, do not send audio
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
            setState("connected");
            setCallStatus("Connected — Live");
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

  // create session on server
  const createSessionOnServer = async () => {
    setCallStatus("Creating session...");
    setState("creating");
    try {
      // minimal anonymous lead (you can attach real lead server-side later)
      const res = await fetch(START_DEMO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "WebUser", phone: "0000000000", email: "web@demo.local", consent: true }),
      });
      const j = await res.json();
      if (!res.ok) {
        setCallStatus(j?.detail || j?.error || "Failed to create session");
        setState("idle");
        return null;
      }
      if (j?.session_id) {
        sessionIdRef.current = j.session_id;
        setCallStatus("Connecting...");
        setState("connecting");
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

  // start media recorder and streaming
  const startStreaming = async () => {
    // create session first
    const sid = await createSessionOnServer();
    if (!sid) return;
    try {
      setCallStatus("Requesting microphone...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/ogg;codecs=opus";

      const recorder = new MediaRecorder(stream, { mimeType: mime });
      mediaRecorderRef.current = recorder;

      recorder.onstart = () => {
        setCallStatus("Connecting...");
        setState("connecting");
      };

      recorder.ondataavailable = async (ev: BlobEvent) => {
        if (!ev.data || ev.data.size === 0) return;
        try {
          const dataUri = await readBlobAsDataURL(ev.data);
          await sendChunk(dataUri);
        } catch (e) {
          console.error("Failed to read chunk:", e);
        }
      };

      recorder.onerror = (e) => {
        console.error("recorder error", e);
        setCallStatus("Microphone error");
      };

      recorder.onstop = async () => {
        console.warn("recorder stopped unexpectedly, state:", state);
        // If call still active and we haven't already attempted restart, try to restart recorder once
        if ((state === "connecting" || state === "connected") && !restartAttemptRef.current) {
          restartAttemptRef.current = true;
          setCallStatus("Recorder stopped — attempting restart...");
          // small delay
          setTimeout(() => {
            if (streamRef.current && state !== ("ended" as typeof state)) {
              try {
                // stop any existing tracks
                streamRef.current.getTracks().forEach((t) => t.stop());
              } catch {}
            }
            // try to request mic + restart recorder
            startStreaming().catch(() => {
              setCallStatus("Failed to restart recorder");
              setState("idle");
            });
          }, 800);
        } else {
          // normal stop or already tried restart
          setState("idle");
          setCallStatus("Ready — click Call Demo");
        }
      };

      // start sending chunks every 900ms
      recorder.start(900);
      setCallStatus("Connecting...");
      setState("connecting");
    } catch (err) {
      console.error("mic access failed:", err);
      setCallStatus("Microphone access denied. Allow mic and click Call Demo again.");
      setState("idle");
    }
  };

  // stop streaming & cleanup
  const stopStreaming = async () => {
    setState("ended");
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    } catch {}
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((t) => t.stop());
      } catch {}
    }
    mediaRecorderRef.current = null;
    streamRef.current = null;

    // ensure queue drained
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
    } catch (e) {
      console.warn("end call failed", e);
    }

    sessionIdRef.current = null;
    gotFirstReplyRef.current = false;
    restartAttemptRef.current = false;
    setIsMuted(false);
    setCallStatus("Ready — click Call Demo");
    setIsProcessing(false);
    setState("idle");
  };

  // UI handlers
  const handleCallDemo = async () => {
    if (state === "connecting" || state === "connected") {
      // already running
      return;
    }
    gotFirstReplyRef.current = false;
    restartAttemptRef.current = false;
    await startStreaming();
  };

  const handleEndCall = async () => {
    await stopStreaming();
    onOpenChange(false);
  };

  const toggleMute = () => {
    setIsMuted((m) => !m);
  };

  // cleanup when modal closes
  useEffect(() => {
    if (!open) {
      stopStreaming().catch(() => {});
      setCallStatus("Ready — click Call Demo");
    } else {
      setCallStatus("Ready — click Call Demo");
      // reset states
      setIsMuted(false);
      gotFirstReplyRef.current = false;
      restartAttemptRef.current = false;
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
            <Button onClick={handleCallDemo} className="px-6 py-2" disabled={state === "connecting" || state === "connected"}>
              Call Demo
            </Button>

            <Button onClick={toggleMute} variant="secondary" className="px-4 py-2" disabled={state === "idle" || state === "creating" || state === "ended"}>
              {isMuted ? <VolumeX className="mr-2" /> : <Volume2 className="mr-2" />} {isMuted ? "Unmute" : "Mute"}
            </Button>

            <Button variant="destructive" onClick={handleEndCall} className="px-4 py-2" disabled={state === "idle"}>
              <PhoneOff className="mr-2" /> End Call
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-slate-400 mt-4">
          <p>{isProcessing ? "Processing..." : ""}</p>
          <p className="mt-2">Tip: Click Call Demo and speak when you see "Connected — Live".</p>
        </div>

        <audio ref={audioRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
