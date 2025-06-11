"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar"; // Assuming these components are also TypeScript-compatible
import { Footer } from "@/components/layout/footer"; // Assuming these components are also TypeScript-compatible
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the type for a single message object
interface Message {
  sender: "user" | "bot"; // Sender can only be 'user' or 'bot'
  text: string;
}

export default function ChatPage(): JSX.Element { // Explicitly type the functional component
  // State to store chat messages, typed as an array of Message objects
  const [messages, setMessages] = useState<Message[]>([]);
  // State for the input field value
  const [input, setInput] = useState<string>("");
  // State to manage loading indicator during API calls
  const [loading, setLoading] = useState<boolean>(false);
  // Ref to automatically scroll to the latest message
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // State for persistent chat ID, initialized as null
  const [chatId, setChatId] = useState<string | null>(null);

  // Effect hook to scroll to the bottom of the chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Dependency array: runs when 'messages' state changes

  // Function to send a message to the backend API
  const sendMessage = async (): Promise<void> => {
    // Prevent sending empty messages or multiple messages while loading
    if (!input.trim() || loading) return;

    const userMsg: Message = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]); // Add user's message to chat
    setInput(""); // Clear input field
    setLoading(true); // Set loading state to true

    try {
      // Prepare the payload for the API request, including chat_id
      const payload = {
        question: userMsg.text,
        chat_id: chatId,
      };

      // Make the API call to your FastAPI backend
      const res = await fetch("https://c9a7-103-248-34-26.ngrok-free.app/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Parse the JSON response
      const data: { answer?: string; chat_id?: string } = await res.json();
      // Extract bot's reply or provide a fallback
      const botReply: string = data.answer || "❌ No response from assistant.";
      // Add bot's reply to chat messages
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      // Update chat_id from response, or keep the existing one if none returned
      setChatId(data.chat_id || chatId);
    } catch (error) {
      console.error("Chat API error:", error); // Log detailed error for debugging
      // Display a user-friendly error message in the chat
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error! Please try again." },
      ]);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    // Main container for the page layout
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar /> {/* Navigation bar component */}

      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header section with Fynorra AI Chat title and description */}
        <header className="text-center mb-8 sm:mb-12 pt-4 sm:pt-8">
          <Bot className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-cyan-400 mb-3 sm:mb-4 animate-bounce-slow" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 sm:mb-4 leading-tight">
            Fynorra AI Chat
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Ask your queries and get instant assistance from our intelligent AI.
          </p>
        </header>

        {/* Chat Card component */}
        <Card className="bg-slate-800/60 border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-bold text-cyan-400">
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            {/* Chat messages display area with responsive height and custom scrollbar */}
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
              {/* Loading indicator message */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl px-4 py-2 text-sm sm:text-base max-w-xs shadow-md">
                    ⏳ Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} /> {/* Reference for auto-scrolling */}
            </div>

            {/* Input section for typing messages */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendMessage()}
                placeholder={loading ? "AI is typing..." : "Type your message..."}
                disabled={loading} // Disable input while loading
                className="flex-grow bg-slate-700 text-white px-4 py-2 sm:py-3 rounded-xl outline-none border border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder-slate-400 transition-all duration-200"
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()} // Disable button while loading or input is empty
                className="rounded-xl bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors duration-200 p-2 sm:p-3 shadow-lg"
              >
                <SendHorizonal className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer /> {/* Footer component */}

      {/* Custom CSS for scrollbar styling and animation */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #06b6d4; /* Tailwind cyan-500 */
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0ea5e9; /* Tailwind cyan-600 */
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
