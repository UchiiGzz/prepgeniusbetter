"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, ArrowLeft, StopCircle, User, Bot } from "lucide-react";
import Link from "next/link";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function InterviewRoom() {
   // Start with an empty array, or a generic greeting
   const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hello. What type of role are you interviewing for today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // DIRECT API CALL FOR TESTING
      // This bypasses server actions to ensure connectivity works
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API Failed");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: `Error: ${error.message}. Check console.` 
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#05050A] text-white font-sans overflow-hidden flex-col">
      <header className="h-16 border-b border-white/5 bg-[#05050A]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} />
            </button>
          </Link>
          <div>
            <h1 className="font-bold text-sm md:text-base">Technical Interview</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wide">Live Session</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs md:text-sm text-red-400 font-medium px-3 py-1.5 rounded-full border border-red-500/20 hover:bg-red-500/10">
            End Session
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 ${
                message.role === "user" 
                  ? "bg-purple-600 text-white" 
                  : "bg-slate-800 text-slate-300 border border-white/10"
              }`}>
                {message.role === "user" ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 md:px-6 md:py-4 ${
                message.role === "user"
                  ? "bg-purple-600 text-white rounded-tr-sm"
                  : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm"
              }`}>
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex gap-4"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
              <Bot size={18} className="text-slate-400" />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 md:p-6 border-t border-white/5 bg-[#05050A]/80 backdrop-blur-xl shrink-0">
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-end gap-3 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-purple-500/50 transition-colors">
            <button className="p-3 rounded-xl bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white transition-colors">
              <Mic size={20} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your answer here..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none resize-none py-3 max-h-32 text-sm md:text-base"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-xl transition-all ${
                !input.trim() || isLoading
                  ? "bg-white/5 text-slate-600 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-500"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}