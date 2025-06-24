"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, SendHorizonal, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatPage(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPdfFile(file);
    setLoading(true);
    setMessages([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://3b6a-103-248-34-26.ngrok-free.app/rag/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed with status: ${res.status}`);
      }

      setMessages([
        {
          sender: "bot",
          text: `PDF "${file.name}" uploaded. You can now ask questions about its content.`,
        },
      ]);
    } catch (err: any) {
      setMessages([
        {
          sender: "bot",
          text: `❌ Failed to process PDF. ${err.message}. Please try another file.`,
        },
      ]);
      setPdfFile(null);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (): Promise<void> => {
    if (!input.trim() || loading || !pdfFile) return;

    const userMsg: Message = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const payload = { question: userMsg.text };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const res = await fetch("https://3b6a-103-248-34-26.ngrok-free.app/rag/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error (${res.status}): ${errorText}`);
      }

      const data: { answer?: string } = await res.json();
      const botReplyText: string = data.answer || "I received no answer. Please try rephrasing.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReplyText }]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            error.name === "AbortError"
              ? "⏳ Request timed out. The server might be busy. Please try again later."
              : `⚠️ Error: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <div className="flex flex-col flex-grow relative">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex flex-col h-full">
          <header className="text-center mb-8 sm:mb-12 pt-4 sm:pt-8">
            <Bot className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-cyan-400 mb-3 sm:mb-4 animate-bounce-slow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 sm:mb-4 leading-tight">
              Fynorra AI RAG Chat
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
              Upload a PDF and get instant answers from your document.
            </p>
          </header>
          <Card className="bg-slate-800/60 border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto flex-grow overflow-hidden flex flex-col w-full">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <CardTitle className="text-xl sm:text-2xl font-bold text-cyan-400">
                  Live Chat
                </CardTitle>
                {pdfFile && (
                  <p className="text-sm text-cyan-300 bg-cyan-900/50 px-2 py-1 rounded-md">
                    Active: <strong>{pdfFile.name}</strong>
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow min-h-0">
              <div className="flex-grow overflow-y-auto space-y-3 p-2 sm:p-3 custom-scrollbar rounded-lg bg-slate-800/50">
                {messages.length > 0 ? (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-xl px-4 py-2 text-sm sm:text-base max-w-[85%] sm:max-w-[75%] break-words shadow-md ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white"
                            : "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                    <label
                      htmlFor="pdf-upload"
                      className="flex items-center gap-2 cursor-pointer bg-slate-700 hover:bg-slate-600 text-cyan-300 font-bold py-3 px-5 rounded-xl transition-colors duration-200"
                    >
                      <Upload size={20} />
                      <span>{loading ? "Processing..." : "Upload a PDF"}</span>
                    </label>
                    <input
                      id="pdf-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={loading}
                    />
                    <p className="mt-4 text-sm">
                      Your document will be processed to answer your questions.
                    </p>
                  </div>
                )}
                {loading && messages.length > 0 && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl px-4 py-2 text-sm sm:text-base max-w-xs shadow-md">
                      ⏳ Thinking...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="mt-4 flex gap-2 flex-shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendMessage()}
                  placeholder={
                    !pdfFile
                      ? "Please upload a PDF to begin"
                      : loading
                      ? "AI is thinking..."
                      : "Ask a question about the PDF..."
                  }
                  disabled={loading || !pdfFile}
                  className="flex-grow bg-slate-700 text-white px-4 py-2 sm:py-3 rounded-xl outline-none border border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder-slate-400 transition-all duration-200 disabled:opacity-50"
                />
                <Button
                  onClick={sendMessage}
                  disabled={loading || !input.trim() || !pdfFile}
                  className="rounded-xl bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors duration-200 p-2 sm:p-3 shadow-lg disabled:opacity-50"
                >
                  <SendHorizonal className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #06b6d4;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0ea5e9;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}