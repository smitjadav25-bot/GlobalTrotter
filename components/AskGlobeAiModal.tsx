'use client';

import React, { useState } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ArrowRight,
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
  'Plan a 5-day budget trip to Tokyo',
  'Find quiet cafes in Paris',
  'Keep multi-city trip under $1,500',
  'Suggest sunset spots in Kyoto',
];

export default function AskGlobeAiModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello! I'm Globe AI, your multi-city travel co-pilot. Where are you planning to travel next?",
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
        aiResponseText = `For Tokyo, I recommend Day 1 in Shinjuku, Day 2 in historic Asakusa & Ueno, and Day 3 in Shibuya. Estimated daily budget is ~$110/day.`;
        actionLink = { label: 'Open in Full AI Planner', href: '/ai-planner' };
      } else if (query.toLowerCase().includes('budget') || query.toLowerCase().includes('cost')) {
        aiResponseText = `Tip: Save up to 35% on multi-city travel by booking regional high-speed rail passes and opting for centrally-located boutique homestays.`;
        actionLink = { label: 'View Budget Optimizer', href: '/budget' };
      } else {
        aiResponseText = `I can assemble a custom day-by-day itinerary with verified stops, duration pacing, and budget breakdown.`;
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
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button with Signature Inset Shadow */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Ask Globe AI"
        className="fixed bottom-20 sm:bottom-6 right-6 z-40 px-3.5 py-2.5 bg-charcoal text-off-white rounded-pill shadow-inset-btn active:opacity-80 focus:shadow-focus-soft transition-opacity flex items-center gap-2 text-xs font-normal"
      >
        <Bot className="w-4 h-4 opacity-90" />
        <span>Ask Globe AI</span>
      </button>

      {/* Slide-out Chat Panel Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 bg-charcoal-40 backdrop-blur-xs">
          <div
            className="w-full sm:max-w-md h-[80vh] sm:h-[560px] bg-cream rounded-t-card sm:rounded-card border border-light-cream flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-4 bg-cream border-b border-light-cream flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-charcoal text-off-white flex items-center justify-center shadow-inset-btn">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-charcoal">Globe AI Assistant</h3>
                  <p className="text-[11px] text-muted">Smart travel planning assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-muted hover:text-charcoal hover:bg-charcoal-4"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-card text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-charcoal text-off-white'
                        : 'bg-cream text-charcoal border border-light-cream'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.actionLink && (
                      <Link
                        href={m.actionLink.href}
                        onClick={() => setIsOpen(false)}
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-charcoal hover:underline"
                      >
                        <Sparkles className="w-3 h-3" />
                        {m.actionLink.label}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                  <span className="text-[10px] text-muted mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-2.5 bg-cream border border-light-cream rounded-card w-20">
                  <div className="w-1.5 h-1.5 rounded-pill bg-charcoal animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-pill bg-charcoal animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-pill bg-charcoal animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Quick Chips */}
            <div className="p-2 bg-cream border-t border-light-cream flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 bg-cream text-charcoal border border-light-cream rounded-pill text-[11px] font-normal whitespace-nowrap shrink-0 hover:bg-charcoal-4"
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
              className="p-3 bg-cream border-t border-light-cream flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about cities, budgets, routes..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring-blue"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-3 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
