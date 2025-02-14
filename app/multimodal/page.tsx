"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function ChatbotPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { user: true, text: input }, { user: false, text: "Processing..." }]);
    setInput("");
    setTimeout(() => {
      setMessages((msgs) => [...msgs.slice(0, -1), { user: false, text: "Hello! I'm your AI assistant." }]);
    }, 1500);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Conversational AI & Chatbot</h2>
        <div className="flex h-[400px] bg-white rounded-lg shadow-md overflow-hidden">
          {/* Chat History Sidebar */}
          <aside className="w-1/6 bg-gray-900 text-white p-4">
            <h2 className="text-lg font-bold">Chat History</h2>
            <Button className="mt-2 w-full">Chat #1</Button>
            <Button className="mt-2 w-full">Chat #2</Button>
          </aside>
          {/* Chat Section */}
          <div className="flex-1 flex flex-col bg-gray-100 p-4">
            <header className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold">Chat AI</h2>
              <Avatar className="w-10 h-10">
                <img src="/ai-avatar.png" alt="AI Avatar" className="w-full h-full rounded-full" />
              </Avatar>
            </header>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-2">
              {messages.map((msg, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-2 my-2 rounded-lg ${msg.user ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>
            {/* Input Field */}
            <footer className="flex items-center gap-2 border-t pt-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1" />
              <Button onClick={sendMessage} className="bg-blue-600">Send</Button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
