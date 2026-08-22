'use client';

import React, { useState } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Compass,
  ArrowRight,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionLink?: {
    label: string;
    href: string;
  };
}

const QUICK_PROMPTS = [
  'Plan a 5-day budget trip to Tokyo 🇯🇵',
  'Find hidden gem cafes in Paris 🥐',
  'How do I keep my multi-city trip under $1,500? 💰',
  'Suggest romantic sunset spots in Bali 🌅',
];

export default function AskGlobeAiModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "👋 Hi there! I'm Globe AI, your personal multi-city travel co-pilot. Where are you thinking of traveling next?",
      timestamp: 'Just now',
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      let actionLink: { label: string; href: string } | undefined;

      if (query.toLowerCase().includes('tokyo') || query.toLowerCase().includes('japan')) {
        aiResponseText = `🗾 For Tokyo, I recommend starting in **Shinjuku** for vibrant neon streets and Omoide Yokocho, spending Day 2 in historic **Asakusa & Ueno**, and taking Day 3 for **Shibuya & Harajuku**. Estimated daily budget is ~$110/day.`;
        actionLink = { label: 'Open in Full AI Planner', href: '/ai-planner' };
      } else if (query.toLowerCase().includes('budget') || query.toLowerCase().includes('cost')) {
        aiResponseText = `💡 Tip: Save up to 35% on multi-city travel by booking regional high-speed rail passes (like the JR Pass or Eurail) and opting for centrally-located boutique homestays instead of large hotels.`;
        actionLink = { label: 'View Budget Optimizer', href: '/budget' };
      } else if (query.toLowerCase().includes('paris')) {
        aiResponseText = `🥐 In Paris, explore the charming cobblestones of **Le Marais**, grab fresh croissants at Du Pain et des Idées, and catch sunset at the steps of Sacré-Cœur with an accordion serenade.`;
        actionLink = { label: 'Explore Paris on Map', href: '/map' };
      } else {
        aiResponseText = `✨ That sounds like an unforgettable journey! I can assemble a custom day-by-day itinerary with verified stops, duration pacing, and budget breakdown.`;
        actionLink = { label: 'Launch AI Trip Wizard', href: '/ai-planner' };
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLink,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Ask Globe AI"
        className="fixed bottom-20 sm:bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-teal-500 to-navy-800 hover:from-teal-600 hover:to-navy-900 text-white rounded-full shadow-lg hover:shadow-glow-teal hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2.5 font-bold text-xs tracking-wide border border-teal-400/30"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-400"></span>
        </span>
        <Bot className="w-4 h-4 text-teal-200" />
        <span>Ask Globe AI</span>
      </button>

      {/* Slide-out Chat Panel Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full sm:max-w-md h-[85vh] sm:h-[600px] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-right-6 duration-300"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-navy-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white">Globe AI Assistant</h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
                      Beta
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">Always-on smart travel companion</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-light dark:bg-slate-950/50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      m.sender === 'user'
                        ? 'bg-sunset-500 text-white rounded-br-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.actionLink && (
                      <Link
                        href={m.actionLink.href}
                        onClick={() => setIsOpen(false)}
                        className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 rounded-xl text-[11px] font-bold hover:bg-teal-100 transition-colors"
                      >
                        <Sparkles className="w-3 h-3" />
                        {m.actionLink.label}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl w-24">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Quick Chips */}
            <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about cities, budgets, routes..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
