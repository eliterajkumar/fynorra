"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the type for a single message object
interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatPage(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (): Promise<void> => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const payload = {
        question: userMsg.text,
        chat_id: chatId,
      };

      // Set a timeout for the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60-second timeout

      const res = await fetch("https://66ba-103-248-34-26.ngrok-free.app/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal, // Connect the abort controller to the fetch request
      });

      clearTimeout(timeoutId); // Clear the timeout if the fetch completes in time

      if (!res.ok) { // Check for HTTP errors (e.g., 500, 503)
        const errorText = await res.text();
        console.error("API HTTP Error:", res.status, errorText);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `⚠️ API Error (${res.status})! Please try again.` },
        ]);
        return;
      }

      const data: { answer?: string; chat_id?: string; type?: string; error_detail?: string } = await res.json();
      
      let botReply: string = data.answer || ""; // Initialize with empty string
      
      // Better handling for different 'type' responses from backend
      if (data.type === "no_info") {
          botReply = data.answer || "I don't have enough information from Fynorra's knowledge base to answer that. Could you please rephrase, or ask about our core services like chatbots, automation, or software development?";
      } else if (data.type === "error") {
          botReply = data.answer || "Apologies! A critical error occurred. Please try again or contact support if the issue persists.";
          console.error("Backend returned error type:", data.error_detail);
      } else if (data.type === "db_connection_error") {
          botReply = data.answer || "I'm sorry, I'm having trouble connecting to my database right now. Please try again in a moment.";
          console.error("Backend returned DB connection error:", data.error_detail);
      } else if (!botReply.trim()) { // If 'answer' is empty or just whitespace
          botReply = "❌ I received an empty response. Please try rephrasing your question or ask about Fynorra's services.";
      }


      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      if (data.chat_id) {
        setChatId(data.chat_id); // Update chat_id from response
      }
    } catch (error: any) { // Catch any errors, including network errors or aborts
      if (error.name === 'AbortError') {
          setMessages((prev) => [
              ...prev,
              { sender: "bot", text: "⏳ Request timed out. Please try again later." },
          ]);
          console.error("Fetch request timed out:", error);
      } else {
          setMessages((prev) => [
              ...prev,
              { sender: "bot", text: "⚠️ Network error! Please check your connection or server status." },
          ]);
          console.error("General fetch error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <header className="text-center mb-8 sm:mb-12 pt-4 sm:pt-8">
          <Bot className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-cyan-400 mb-3 sm:mb-4 animate-bounce-slow" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 sm:mb-4 leading-tight">
            Fynorra AI Chat
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Ask your queries and get instant assistance from our intelligent AI.
          </p>
        </header>

        <Card className="bg-slate-800/60 border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-bold text-cyan-400">
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="flex-grow min-h-[40vh] max-h-[60vh] md:max-h-[70vh] overflow-y-auto space-y-3 p-2 sm:p-3 custom-scrollbar rounded-lg bg-slate-800/50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-xl px-4 py-2 text-sm sm:text-base max-w-[85%] sm:max-w-[75%] break-words shadow-md
                      ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white"
                          : "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl px-4 py-2 text-sm sm:text-base max-w-xs shadow-md">
                    ⏳ Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendMessage()}
                placeholder={loading ? "AI is typing..." : "Type your message..."}
                disabled={loading}
                className="flex-grow bg-slate-700 text-white px-4 py-2 sm:py-3 rounded-xl outline-none border border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder-slate-400 transition-all duration-200"
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="rounded-xl bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors duration-200 p-2 sm:p-3 shadow-lg"
              >
                <SendHorizonal className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #06b6d4; /* cyan-500 */
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0ea5e9; /* cyan-600 */
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
