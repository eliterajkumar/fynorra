"use client";

import React, { useEffect, useRef, useState } from "react";
import AvatarSVG from "@/components/ui/AvatarSVG"; // keep your avatar component
import { Paperclip, SendHorizonal, X } from "lucide-react";

const BACKEND_CHAT = process.env.NEXT_PUBLIC_BACKEND_URL || "https://fynorra.onrender.com/rag/chat";
// derived upload url (backend should support /upload or fallback will use /chat with upload_only)
const BACKEND_UPLOAD = BACKEND_CHAT.replace("/chat", "/upload");

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [anim, setAnim] = useState<"idle" | "wave" | "typing">("idle");
  const [messages, setMessages] = useState<Array<{ id: number; sender: "user" | "bot"; text: string }>>([
    { id: 1, sender: "bot", text: "👋 Namaste! I’m Fynorra AI Assistant — how can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // open: play wave then idle
  useEffect(() => {
    if (open) {
      setAnim("wave");
      const t = setTimeout(() => setAnim("idle"), 1100);
      // disable body scroll while open
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    // auto-scroll to bottom on messages change
    if (messagesRef.current) {
      messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  /* ========== helper UI actions ========== */

  const pushMessage = (sender: "user" | "bot", text: string) => {
    setMessages((m) => [...m, { id: Date.now() + Math.floor(Math.random() * 1000), sender, text }]);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowed.includes(f.type)) {
      pushMessage("bot", "⚠️ Please upload PDF or JPG/PNG only.");
      return;
    }
    setFile(f);
    pushMessage("bot", `📎 Selected file: ${f.name}. Click Upload to send and index it.`);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ========== upload file only (index, no analysis) ========== */
  const uploadFile = async () => {
    if (!file) {
      pushMessage("bot", "No file selected to upload.");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_only", "1");
      if (sessionId) form.append("session_id", sessionId);

      let res = await fetch(BACKEND_UPLOAD, { method: "POST", body: form });
      if (!res.ok) {
        // fallback to chat endpoint that supports upload_only
        res = await fetch(BACKEND_CHAT, { method: "POST", body: form });
      }
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Upload failed ${res.status}`);
      }
      const data = await res.json();
      const ack = data?.message ?? "File uploaded and indexed. Ask me to analyze it when ready.";
      if (data?.session_id && !sessionId) setSessionId(data.session_id);
      pushMessage("bot", ack);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e: any) {
      pushMessage("bot", `⚠️ Upload error: ${e?.message ?? "failed"}`);
    } finally {
      setLoading(false);
    }
  };

  /* ========== send message to backend (LLM) ========== */
  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    // If user has selected file but not uploaded, prompt to upload first
    if (file) {
      pushMessage("bot", "You attached a file — please click Upload to send it (we index it), or remove it to send message alone.");
      return;
    }

    pushMessage("user", text);
    setInput("");
    setLoading(true);
    setAnim("typing");

    try {
      const payload: any = { event: "message", message: text, source: "web_chat" };
      if (sessionId) payload.session_id = sessionId;

      const res = await fetch(BACKEND_CHAT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || `Server ${res.status}`);
      }
      const data = await res.json();
      const botText: string = data?.reply ?? "Sorry, no response from assistant.";
      if (data?.session_id && !sessionId) setSessionId(data.session_id);

      // Remove repeated greeting if assistant tries to greet each message
      const cleaned = botText.replace(/^Namaste[^\.\n]*[.\n]?/i, (match) => (messages.some(m => m.sender === "bot") ? "" : match));
      pushMessage("bot", cleaned.trim());
    } catch (e: any) {
      pushMessage("bot", `⚠️ Error: ${e?.message ?? "Request failed"}`);
    } finally {
      setAnim("idle");
      setLoading(false);
    }
  };

  /* keyboard send */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* small responsive size helpers */
  const chatWidthDesktop = 420;
  const chatHeightDesktop = 620;

  return (
    <>
      {/* Floating button */}
      <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 9999 }}>
        <button
          aria-label={open ? "Close chat" : "Open chat"}
          onClick={() => setOpen((s) => !s)}
          className="rounded-full shadow-xl"
          style={{
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg,#062b3a,#07333f)",
            border: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <AvatarSVG state={anim} size={52} />
        </button>
      </div>

      {/* Overlay chat panel */}
      <div
        aria-hidden={!open}
        style={{
          position: "fixed",
          right: 18,
          bottom: open ? 18 : -9999,
          zIndex: 9998,
          width: "100%",
          maxWidth: open ? chatWidthDesktop : 0,
          transition: "all 220ms cubic-bezier(.2,.9,.2,1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Desktop / Tablet panel */}
        <div
          style={{
            display: "none",
          }}
        />

        {/* Mobile & Desktop unified inner container; use media queries below */}
        <div
          className="fynorra-chat-panel"
          style={{
            position: "fixed",
            right: 18,
            bottom: 18,
            zIndex: 9999,
            width: "calc(100% - 36px)",
            maxWidth: chatWidthDesktop,
            height: chatHeightDesktop,
            maxHeight: "calc(100vh - 36px)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(2,6,23,0.6)",
            background: "#07121a",
            display: open ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          {/* header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <AvatarSVG state="idle" size={36} />
              <div>
                <div style={{ color: "#e6fbff", fontWeight: 700 }}>Fynorra AI Assistant</div>
                <div style={{ color: "#9fbfc7", fontSize: 12 }}>{sessionId ? `Session: ${sessionId}` : "New session"}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setOpen(false); }} aria-label="Close chat" style={{ background: "transparent", border: "none", color: "#9fbfc7" }}>
                <X />
              </button>
            </div>
          </div>

          {/* messages */}
          <div ref={messagesRef} style={{ padding: 12, overflowY: "auto", flex: 1 }}>
            {messages.map((m) => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.sender === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                <div style={{
                  maxWidth: "82%",
                  background: m.sender === "user" ? "linear-gradient(90deg,#06b6d4,#0891a3)" : "linear-gradient(90deg,#0b2430,#07202a)",
                  color: "#fff",
                  padding: "10px 12px",
                  borderRadius: 14,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                  fontSize: 14,
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
                <div style={{ background: "linear-gradient(90deg,#0b2430,#07202a)", color: "#fff", padding: "8px 12px", borderRadius: 14 }}>
                  ⏳ Thinking...
                </div>
              </div>
            )}
          </div>

          {/* input area */}
          <div style={{ padding: 10, borderTop: "1px solid rgba(255,255,255,0.02)", display: "flex", gap: 8, alignItems: "center" }}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              onChange={onFileSelect}
              style={{ display: "none" }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Attach PDF / Image"
              style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.02)" }}
            >
              <Paperclip />
            </button>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type your message..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.03)",
                  background: "#061018",
                  color: "#dff8fb",
                }}
                aria-label="Chat message"
              />

              {file && (
                <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ color: "#cfeff4", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={removeFile} style={{ color: "#8fb", background: "transparent", border: "none", fontSize: 12 }}>Remove</button>
                    <button onClick={uploadFile} disabled={loading} style={{ fontSize: 12, background: "#075a63", color: "#fff", padding: "6px 8px", borderRadius: 8 }}>Upload</button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={sendMessage}
              disabled={loading || input.trim().length === 0}
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: input.trim() ? "#06b6d4" : "rgba(255,255,255,0.03)",
                border: "none",
                color: "#072",
              }}
              aria-label="Send message"
            >
              <SendHorizonal color="#052" />
            </button>
          </div>
        </div>
      </div>

      {/* Small responsive CSS so panel is full-screen on very small viewports */}
      <style jsx>{`
        @media (max-width: 640px) {
          .fynorra-chat-panel {
            right: 8px !important;
            left: 8px !important;
            bottom: 8px !important;
            width: calc(100% - 16px) !important;
            height: calc(100vh - 16px) !important;
            max-width: none !important;
            border-radius: 10px !important;
          }
        }
      `}</style>
    </>
  );
}
