// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Navbar } from "@/components/layout/navbar";
// import { Footer } from "@/components/layout/footer";
// import { Bot, SendHorizonal, Paperclip, Plus, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface Message {
//   sender: "user" | "bot";
//   text: string;
//   id?: string | number;
//   createdAt?: number;
// }

// interface Conversation {
//   id: string;
//   title: string;
//   messages: Message[];
//   updatedAt: number;
// }

// const WEBHOOK_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000/rag/chat";
// const UPLOAD_URL = WEBHOOK_URL.replace("/chat", "/upload");

// export default function ChatPage(): JSX.Element {
//   // conversations (seed)
//   const [conversations, setConversations] = useState<Conversation[]>(() =>
//     [
//       {
//         id: "conv-demo",
//         title: "Fynorra Demo",
//         messages: [
//           { id: 1, sender: "bot", text: "👋 Namaste! I’m Fynorra AI Sales Assistant. How can I help you today?", createdAt: Date.now() - 1000 },
//         ],
//         updatedAt: Date.now() - 1000,
//       },
//     ]
//   );

//   const [activeConvId, setActiveConvId] = useState<string>(conversations[0].id);
//   const activeConv = conversations.find((c) => c.id === activeConvId)!;

//   // UI state
//   const [input, setInput] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [sessionHasGreeted, setSessionHasGreeted] = useState<boolean>(!!activeConv.messages.find(m => m.sender === "bot")); // true if initial seed
//   const [leftOpen, setLeftOpen] = useState<boolean>(false); // for mobile

//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const messagesContainerRef = useRef<HTMLDivElement | null>(null);
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => scrollToBottom("auto"), [activeConv.messages]);

//   function updateActiveConv(updater: (prev: Conversation) => Conversation) {
//     setConversations((prev) => prev.map((c) => (c.id === activeConvId ? updater(c) : c)));
//   }

//   function addMessageToActive(msg: Message) {
//     setConversations((prev) =>
//       prev.map((c) =>
//         c.id === activeConvId
//           ? { ...c, messages: [...c.messages, { ...msg, id: Date.now(), createdAt: Date.now() }], updatedAt: Date.now() }
//           : c
//       )
//     );
//   }

//   function scrollToBottom(behavior: ScrollBehavior = "smooth") {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTo({ top: messagesContainerRef.current.scrollHeight, behavior });
//       return;
//     }
//     bottomRef.current?.scrollIntoView({ behavior });
//   }

//   // file select (just select, don't upload)
//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0] ?? null;
//     if (!f) return;
//     const allowed = ["application/pdf", "image/jpeg", "image/png"];
//     if (!allowed.includes(f.type)) {
//       addMessageToActive({ sender: "bot", text: "⚠️ Please upload only PDF or JPG/PNG files." });
//       return;
//     }
//     setFile(f);
//     addMessageToActive({ sender: "bot", text: `📎 File selected: ${f.name}. Click Upload to send it.` });
//   };

//   const removeFile = () => {
//     setFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   // upload file (store/index only) - backend should accept upload_only form flag
//   const uploadFile = async () => {
//     if (!file) {
//       addMessageToActive({ sender: "bot", text: "No file selected to upload." });
//       return;
//     }
//     if (loading) return;
//     setLoading(true);
//     try {
//       const form = new FormData();
//       form.append("file", file);
//       form.append("upload_only", "1");
//       if (sessionId) form.append("session_id", sessionId);

//       let res = await fetch(UPLOAD_URL, { method: "POST", body: form });
//       if (!res.ok) res = await fetch(WEBHOOK_URL, { method: "POST", body: form }); // fallback

//       if (!res.ok) {
//         const err = await res.text();
//         throw new Error(err || `Upload failed ${res.status}`);
//       }
//       const data = await res.json();
//       const ack = data?.message ?? "File uploaded. Ask me to analyze it when ready.";
//       if (data?.session_id && !sessionId) setSessionId(data.session_id);
//       addMessageToActive({ sender: "bot", text: ack });
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (e: any) {
//       addMessageToActive({ sender: "bot", text: `⚠️ Upload error: ${e?.message ?? "failed"}` });
//     } finally {
//       setLoading(false);
//       scrollToBottom("smooth");
//     }
//   };

//   // main send (LLM call). Only sends user text. If you want to send a file with message change logic.
//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     if (loading) return;

//     const text = input.trim();
//     // add user bubble locally first
//     addMessageToActive({ sender: "user", text });
//     setInput("");
//     setLoading(true);

//     try {
//       const payload: any = { message: text, source: "web_chat" };
//       if (sessionId) payload.session_id = sessionId;

//       const res = await fetch(WEBHOOK_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(errText || `Server ${res.status}`);
//       }

//       const data = await res.json();
//       let botText: string = data?.reply ?? "Sorry, no response.";

//       // defensive: strip greeting if repeated
//       if (sessionHasGreeted && /^Namaste\b/i.test(botText)) {
//         botText = botText.replace(/^Namaste[^\.\n]*[.\n]?/i, "").trim();
//       } else if (!sessionHasGreeted && /^Namaste\b/i.test(botText)) {
//         setSessionHasGreeted(true);
//       }

//       if (data?.session_id && !sessionId) setSessionId(data.session_id);

//       addMessageToActive({ sender: "bot", text: botText });
//       // lead detection or other fields may be returned in data; handle as needed
//     } catch (e: any) {
//       addMessageToActive({ sender: "bot", text: `⚠️ Error: ${e?.message ?? "Connection failed"}` });
//     } finally {
//       setLoading(false);
//       scrollToBottom("smooth");
//     }
//   };

//   // create new conversation
//   const startNewConversation = () => {
//     const id = `conv-${Date.now()}`;
//     const conv: Conversation = {
//       id,
//       title: "New conversation",
//       messages: [{ id: Date.now() + 1, sender: "bot", text: "👋 Namaste! I’m Fynorra AI Sales Assistant. How can I help you today?", createdAt: Date.now() }],
//       updatedAt: Date.now(),
//     };
//     setConversations((prev) => [conv, ...prev]);
//     setActiveConvId(id);
//     setSessionHasGreeted(true);
//     setSessionId(null);
//   };

//   // switch conv
//   const switchConversation = (id: string) => {
//     setActiveConvId(id);
//     setLeftOpen(false);
//     // mark greeting status based on existing conv
//     const conv = conversations.find((c) => c.id === id);
//     setSessionHasGreeted(!!conv?.messages.find(m => m.sender === "bot"));
//   };

//   // compute left list items
//   const convList = conversations
//     .slice()
//     .sort((a, b) => b.updatedAt - a.updatedAt)
//     .map((c) => ({
//       id: c.id,
//       title: c.title,
//       snippet: c.messages.length ? c.messages[c.messages.length - 1].text : "",
//       updatedAt: c.updatedAt,
//     }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f1724] to-[#111827] text-slate-50">
//       <Navbar />

//       <main className="max-w-7xl mx-auto p-4 lg:p-6">
//         <div className="flex gap-4 h-[75vh] lg:h-[78vh]">
//           {/* LEFT: conversation list */}
//           <aside
//             className={`bg-slate-900/60 border border-slate-700/40 rounded-xl p-2 transition-all ${
//               leftOpen ? "w-72 block" : "w-72 hidden lg:block"
//             }`}
//             style={{ minWidth: 220 }}
//           >
//             <div className="flex items-center justify-between mb-3 px-2">
//               <div className="font-semibold">Conversations</div>
//               <div className="flex items-center gap-2">
//                 <button onClick={startNewConversation} className="px-2 py-1 bg-slate-700 rounded text-xs"> <Plus className="w-4 h-4 inline" /> New</button>
//                 <button onClick={() => setLeftOpen((s) => !s)} className="lg:hidden p-1">
//                   <Menu className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-2 overflow-auto h-[calc(75vh-90px)]">
//               {convList.map((c) => (
//                 <div
//                   key={c.id}
//                   onClick={() => switchConversation(c.id)}
//                   className={`p-3 rounded-md cursor-pointer hover:bg-slate-700/30 ${c.id === activeConvId ? "bg-slate-700/40" : ""}`}
//                 >
//                   <div className="font-medium text-sm truncate">{c.title}</div>
//                   <div className="text-xs text-slate-400 truncate">{c.snippet}</div>
//                 </div>
//               ))}
//             </div>
//           </aside>

//           {/* RIGHT: chat pane */}
//           <section className="flex-1 flex flex-col rounded-xl overflow-hidden border border-slate-700/40 bg-gradient-to-b from-slate-800/50 to-transparent">
//             {/* header */}
//             <div className="px-4 py-3 border-b border-slate-700/30 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <button className="lg:hidden p-2" onClick={() => setLeftOpen((s) => !s)}>
//                   <Menu className="w-5 h-5" />
//                 </button>
//                 <Bot className="w-7 h-7 text-cyan-400" />
//                 <div>
//                   <div className="font-bold">Fynorra AI Assistant</div>
//                   <div className="text-xs text-slate-400">{activeConv.title}</div>
//                 </div>
//               </div>
//               <div className="text-xs text-slate-400">{sessionId ? `Session: ${sessionId}` : "New session"}</div>
//             </div>

//             {/* messages */}
//             <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
//               {activeConv.messages.map((m) => (
//                 <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
//                   <div className={`rounded-2xl px-4 py-2 text-sm max-w-[85%] break-words shadow-md ${
//                     m.sender === "user" ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white" : "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
//                   }`}>
//                     {m.text}
//                   </div>
//                 </div>
//               ))}
//               {loading && (
//                 <div className="flex justify-start">
//                   <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-2xl px-4 py-2 text-sm shadow-md">⏳ Thinking...</div>
//                 </div>
//               )}
//               <div ref={bottomRef} />
//             </div>

//             {/* input area */}
//             <div className="p-3 border-t border-slate-700/30 bg-slate-800/60">
//               <div className="flex items-center gap-3">
//                 <input ref={fileInputRef} type="file" accept=".pdf,image/*" onChange={handleFileSelect} className="hidden" />
//                 <button onClick={() => fileInputRef.current?.click()} title="Attach file" className="p-2 rounded-full bg-slate-700 hover:bg-slate-600">
//                   <Paperclip className="w-5 h-5 text-cyan-300" />
//                 </button>

//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                   placeholder="Type your message..."
//                   className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-xl outline-none border border-slate-600 focus:border-cyan-400"
//                 />

//                 {file && (
//                   <button onClick={uploadFile} disabled={loading} className="px-3 py-2 bg-slate-600 rounded text-xs mr-2">
//                     Upload
//                   </button>
//                 )}

//                 <Button onClick={sendMessage} disabled={loading || !input.trim()} className="rounded-xl bg-cyan-500 text-slate-900 hover:bg-cyan-400">
//                   <SendHorizonal className="w-5 h-5" />
//                 </Button>
//               </div>

//               {file && (
//                 <div className="mt-2 text-xs text-slate-300 flex items-center justify-between gap-2">
//                   <div className="truncate max-w-xs">{file.name}</div>
//                   <div className="flex items-center gap-2">
//                     <button onClick={removeFile} className="underline">Remove</button>
//                     <div className="text-[10px] text-slate-400">Selected file — click Upload to send</div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>
//       </main>

//       <Footer />

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.12); border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6,182,212,0.18); }
//         @media (max-width: 1024px) {
//           aside { display: none; } /* handled via class toggle */
//         }
//       `}</style>
//     </div>
//   );
// }
