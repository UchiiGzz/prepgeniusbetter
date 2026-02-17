"use client";

import { useState } from "react";
import { generateAIResponse } from "@/app/actions/interview"; // Adjust path if needed

export default function TestAIPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    // Call the Server Action
    const result = await generateAIResponse(input, "Technical");

    if (result.success) {
      setResponse(result.reply || "No reply received.");
    } else {
      setResponse("Error connecting to AI.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-white p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold mb-4">AI Connection Test (Groq)</h1>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something like: 'I want to talk about React'"
            className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-white outline-none focus:border-purple-500"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2 bg-purple-600 rounded-lg font-bold hover:bg-purple-500 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>

        {response && (
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-slate-300">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}