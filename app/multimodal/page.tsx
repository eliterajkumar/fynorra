// pages/index.tsx (ya aapka page file)
"use client";
import React, { useState, FormEvent } from "react";
import { sendMessageToChatbot } from "@/lib/api";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string[]>(["Chat #1", "Chat #2"]);
  const [currentChat, setCurrentChat] = useState<string>("Chat #1");

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // User ka message add karein
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // Backend se response lein
      const botResponse = await sendMessageToChatbot(input);
      const botMessage: Message = { sender: "bot", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { sender: "bot", text: "Sorry, something went wrong." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-white shadow">
        <h1 className="text-xl font-bold text-center">Conversational AI & Chatbot</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat History Sidebar */}
        <div className="w-1/5 bg-gray-800 text-white p-4">
          <h2 className="text-lg font-semibold mb-4">Chat History</h2>
          <ul>
            {chatHistory.map((chat, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer rounded ${
                  currentChat === chat ? "bg-gray-600" : "hover:bg-gray-700"
                }`}
                onClick={() => setCurrentChat(chat)}
              >
                {chat}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Chat AI</h2>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-md ${
                    msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white shadow flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;