'use client';
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Server error!" }]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-12 pt-12">
          <Bot className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Fynorra AI Chat</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Ask your queries and get instant assistance from our AI.
          </p>
        </header>

        {/* Chat UI */}
        <Card className="bg-slate-800/50 border-slate-700/50 shadow-xl p-4 sm:p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">Live Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[50vh] overflow-y-auto space-y-3 p-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-xl px-4 py-2 max-w-xs text-sm ${
                      msg.sender === "user"
                        ? "bg-cyan-600 text-black"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Section */}
            <div className="mt-4 flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-grow bg-slate-700 text-white px-4 py-2 rounded-l outline-none border border-slate-600"
              />
              <Button onClick={sendMessage} className="rounded-r bg-cyan-400 text-black hover:bg-cyan-300">
                <SendHorizonal className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
