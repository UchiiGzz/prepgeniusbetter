"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  ArrowLeft,
  Bot,
  HelpCircle,
  SkipForward,
  BarChart2,
  RotateCcw,
  Sparkles,
  Mic,
  StopCircle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
};

// Simple markdown-like parser for bolding and lists
const formatMessage = (content: string) => {
  return content.split('\n').map((line, i) => {
    // Handle simple bolding
    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    return (
      <p key={i} className="mb-1 last:mb-0" dangerouslySetInnerHTML={{ __html: formattedLine }} />
    );
  });
};

export default function InterviewRoom() {
  const searchParams = useSearchParams();

  const sessionType = searchParams.get("type") || "General";
  const sessionLevel = searchParams.get("level") || "Mid-Level";

  const getInitialMessage = useCallback(
    () => ({
      id: "1",
      role: "assistant" as const,
      content: `Hello. Ready to practice for a **${sessionLevel} level ${sessionType} interview**? Let's begin when you are ready.`,
      timestamp: new Date(),
    }),
    [sessionLevel, sessionType]
  );

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => {
      setMessages([getInitialMessage()]);
      setInput("");
      setIsRestarting(false);
    }, 500);
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          config: { type: sessionType, level: sessionLevel },
        }),
      });

      if (!response.ok) throw new Error("API Failed");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Connection issue. Please check your internet and try again.",
          timestamp: new Date(),
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleAction = async (action: string) => {
    if (isLoading) return;

    setIsLoading(true);
    let prompt = "";

    if (action === "stuck") {
      prompt = "I'm stuck. Can you give me a hint?";
    } else if (action === "skip") {
      prompt = "Let's skip this question. Ask me the next one.";
    } else if (action === "analyze") {
      prompt = "Analyze my last answer in detail. Give me a score out of 10 and suggestions for improvement.";
    }

    if (prompt) {
      // Add visual feedback for the action
      if (action === "analyze") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "user",
            content: "📊 Analyze my last answer.",
          },
        ]);
      }

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, { role: "user", content: prompt }],
            config: { type: sessionType, level: sessionLevel },
          }),
        });
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.reply,
          },
        ]);
      } catch (e) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Failed to process request.",
          },
        ]);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#030308] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="h-16 border-b border-white/[0.05] bg-[#030308]/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/[0.05] border border-transparent hover:border-white/[0.1] transition-all"
            >
              <ArrowLeft size={20} className="text-slate-400" />
            </motion.button>
          </Link>

          <div className="h-6 w-px bg-white/10" />

          <div>
            <h1 className="font-semibold text-sm text-white">
              {sessionType} Interview
            </h1>
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {sessionLevel} Level • Session Active
              </span>
            </div>
          </div>
        </div>

        <motion.button
          onClick={handleRestart}
          disabled={isRestarting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 text-xs bg-white/[0.03] rounded-full border border-white/[0.08] hover:border-purple-500/30 hover:text-purple-400 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <motion.div
            animate={isRestarting ? { rotate: -360 } : { rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <RotateCcw size={14} />
          </motion.div>
          Restart
        </motion.button>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8 relative">
        <div className="max-w-2xl mx-auto space-y-6">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role !== "user" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-purple-900/20">
                    <Bot size={16} className="text-white" />
                  </div>
                )}

                <div
                  className={`flex flex-col max-w-[85%] ${
                    message.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <motion.div
                    className={`px-5 py-3.5 shadow-xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl rounded-tr-md"
                        : "bg-white/[0.03] border border-white/[0.06] text-slate-300 rounded-2xl rounded-tl-md"
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap prose prose-invert prose-sm max-w-none">
                      {formatMessage(message.content)}
                    </div>
                  </motion.div>

                  {message.timestamp && (
                    <span className="text-[10px] text-slate-600 mt-1.5 px-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading Indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] px-5 py-4 rounded-2xl rounded-tl-md">
                  <div className="flex gap-1.5 items-center h-5">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* Footer Input Area */}
      <div className="p-4 md:p-6 border-t border-white/[0.05] bg-[#030308]/90 backdrop-blur-xl shrink-0 z-20">
        <div className="max-w-2xl mx-auto space-y-3">
          {/* Action Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction("stuck")}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-slate-300 hover:bg-white/[0.06] hover:border-purple-500/20 transition-all disabled:opacity-30 shrink-0"
            >
              <HelpCircle size={14} className="text-purple-400" />
              Hint
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction("skip")}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-slate-300 hover:bg-white/[0.06] hover:border-purple-500/20 transition-all disabled:opacity-30 shrink-0"
            >
              <SkipForward size={14} className="text-blue-400" />
              Skip
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(139,92,246,0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction("analyze")}
              disabled={isLoading || messages.length < 3}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold hover:bg-purple-500/20 transition-all disabled:opacity-30 shrink-0"
            >
              <BarChart2 size={14} />
              Analyze Answer
            </motion.button>
          </div>

          {/* Input Box */}
          <div className="flex items-end gap-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-2 transition-all focus-within:border-purple-500/30 focus-within:bg-white/[0.04]">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your response..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none resize-none py-2.5 px-3 max-h-32 text-sm leading-relaxed"
              rows={1}
              disabled={isLoading}
            />

            <motion.button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-xl transition-all ${
                !input.trim() || isLoading
                  ? "bg-white/[0.03] text-slate-600"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/20"
              }`}
            >
              <Send size={18} />
            </motion.button>
          </div>

          <p className="text-center text-[10px] text-slate-600">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-500">Enter</kbd> to send • <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-500">Shift + Enter</kbd> for new line
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}