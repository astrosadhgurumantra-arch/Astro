import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, Sparkles, User, MessageCircle, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Consultation() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "model",
      text: "Hare Krishna. I am Astro Sadhguru Mantra, your Vedic Astrologer and spiritual guide. The stars have aligned to bring you here today.\n\nTell me, what areas of your destiny shall we inspect? Please select a question below or enter your birth details and questions about your **Life, Love, Relationships, or Wealth**.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const recommendedQueries = [
    "💫 When will my career & wealth houses align?",
    "💖 Who is my cosmic life partner?",
    "🪐 How is Saturn's Transit affecting my life?",
    "💎 Which Vedic gemstone should I wear for success?"
  ];

  // Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/consult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error("Divine planetary server temporarily unreachable.");
      }

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "model",
        text: data.text || "The cosmos remains silent on this matter. Ask another query, or consult directly on WhatsApp.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      setError("Unable to reach the spiritual servers. Please try again or direct-message Astro Sadhguru Mantra via WhatsApp for personal readings.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-msg-reset",
        role: "model",
        text: "Hare Krishna. Let us begin a fresh astrological inspection. What are you seeking guidance on today?",
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div 
        id="consultation-chat-panel"
        className="flex flex-col h-[600px] border border-slate-800 bg-slate-950/80 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md relative"
      >
        {/* Chat Panel Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse">
              ॐ
            </div>
            <div>
              <h4 className="text-amber-100 font-bold tracking-wide text-sm sm:text-base">Astro Sadhguru Mantra Live</h4>
              <span className="text-[10px] sm:text-xs text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                Vedic AI Assistant Active
              </span>
            </div>
          </div>
          <button
            id="reset-consultation-chat-btn"
            onClick={handleResetChat}
            className="text-slate-400 hover:text-amber-400 p-2 rounded-lg hover:bg-slate-800/50 transition-all cursor-pointer"
            title="Reset Spiritual Conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Chat message history container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => {
              const isAI = msg.role === "model";
              return (
                <motion.div
                  key={msg.id}
                  id={`chat-msg-row-${msg.id}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-start gap-3 ${isAI ? "justify-start" : "justify-end"}`}
                >
                  {isAI && (
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-[0_2px_8px_rgba(0,0,0,0.2)]
                      ${
                        isAI
                          ? "bg-slate-900/90 border border-slate-800 text-slate-100"
                          : "bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 font-medium"
                      }`}
                  >
                    {msg.text}
                  </div>

                  {!isAI && (
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isLoading && (
            <div id="chat-typing-row" className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              </div>
              <div className="bg-slate-900/60 border border-slate-800/60 text-slate-400 rounded-xl px-4 py-3 text-sm">
                <span className="flex items-center gap-1 font-mono text-xs">
                  Astro Sadhguru Mantra calculating planetary alignments
                  <span className="animate-[bounce_1.4s_infinite_100ms]">.</span>
                  <span className="animate-[bounce_1.4s_infinite_200ms]">.</span>
                  <span className="animate-[bounce_1.4s_infinite_300ms]">.</span>
                </span>
              </div>
            </div>
          )}

          {error && (
            <div id="chat-error-row" className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl flex items-center gap-2.5 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestion tags for quick selection */}
        {messages.length === 1 && !isLoading && (
          <div id="chat-suggestions-container" className="px-6 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recommendedQueries.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q.replace(/[^\w\s\?&,🪐💫💖💎]/g, "").trim())}
                className="text-left text-xs bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800/60 text-amber-100/80 hover:text-white px-3 py-2 rounded-lg transition-all cursor-pointer truncate"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Chat Input Field */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/20">
          <div className="flex gap-2">
            <input
              id="consultation-input-field"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(input);
              }}
              placeholder="Ask about Kundali, Love Synastry, Wealth, Shani Sade Sati..."
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/80 disabled:opacity-50"
            />
            <button
              id="send-consultation-btn"
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-sm flex items-center justify-center shadow-[0_2px_10px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Astro WhatsApp Prompt Footer */}
        <div className="px-6 py-2.5 bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border-t border-slate-900 text-center flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[10px] sm:text-xs text-slate-400 font-mono">
            Seek deep natal chart reviews? Join priority line on WhatsApp.
          </span>
          <a
            id="whatsapp-chat-redirect-btn"
            href="https://wa.me/918882195832?text=Hare%20Krishna%20Astro%20Sadhguru%20Mantra.%20I%20would%20like%20to%20receive%20a%20personal%20live%20consultation%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            WhatsApp Astro Sadhguru: +91 88821 95832
          </a>
        </div>
      </div>
    </div>
  );
}
