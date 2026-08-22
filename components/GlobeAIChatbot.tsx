'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  ArrowRight,
  Maximize2,
  Minimize2,
  RefreshCw,
  MapPin,
  Hotel,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    href: string;
  };
  recommendationCard?: {
    title: string;
    subtitle: string;
    image: string;
    tag: string;
    href: string;
  };
}

const QUICK_PROMPTS = [
  'Optimize my trip',
  'Find cheap hotels',
  'Hidden places',
  'Packing list',
  'Local food',
  'Weather advice'
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'ai',
    text: "Hello Alex! I am Globe AI, your personal travel intelligence copilot. I can optimize your day-by-day itineraries, discover secret spots, check live weather adaptations, or find boutique stays. What are you planning today?",
    timestamp: 'Just now'
  }
];

export default function GlobeAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI Context Reasoning
    setTimeout(() => {
      let aiResponseText = '';
      let actionBtn: { label: string; href: string } | undefined = undefined;
      let recCard: Message['recommendationCard'] = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('optimize') || lower.includes('route')) {
        aiResponseText = "I analyzed your current trip to Bali! You have two free hours between 2:00 PM and 5:00 PM on Day 2. I recommend inserting a secret coffee tasting at Kintamani Volcano ridge or adjusting Day 3 to avoid the afternoon rain showers.";
        actionBtn = { label: '⚡ Apply AI Route Optimization', href: '/trips' };
      } else if (lower.includes('hotel') || lower.includes('stay') || lower.includes('cheap')) {
        aiResponseText = "Found 4 highly-rated boutique stays with AI Match scores above 95%. Switching to 'Bamboo Eco Sanctuary Villa' saves $280 while offering private river gorge views!";
        recCard = {
          title: 'Bamboo Eco Sanctuary Villa',
          subtitle: '$210/night • Ubud • AI Score 95%',
          image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
          tag: 'Sustainable Stay',
          href: '/explore/bali#stays'
        };
        actionBtn = { label: 'Browse All Stays', href: '/explore/bali' };
      } else if (lower.includes('hidden') || lower.includes('secret') || lower.includes('gems')) {
        aiResponseText = "Here is an exclusive hidden gem: Tukad Cepung Secret Cave Waterfall in Bali. Best visited between 9:00 AM and 11:30 AM when sunlight rays beam directly through the cavern ceiling.";
        recCard = {
          title: 'Tukad Cepung Secret Cave',
          subtitle: 'Very Low Crowds • $3 Entry • God Rays at 10 AM',
          image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
          tag: 'Secret Cave',
          href: '/explore/bali'
        };
      } else if (lower.includes('pack') || lower.includes('bag')) {
        aiResponseText = "Your Bali trip is 80% packed (12/15 items). You still need to pack: Universal Travel Adapter & Reef-Safe Sunscreen SPF 50+.";
        actionBtn = { label: 'Open Smart Packing Assistant', href: '/packing' };
      } else if (lower.includes('weather') || lower.includes('rain')) {
        aiResponseText = "🌧 Precipitation Alert: Light rain forecasted for Day 3 in Bali. I have prepared indoor alternatives including a Balinese Organic Cooking Masterclass in Ubud.";
        actionBtn = { label: '🌦 Adapt Itinerary for Weather', href: '/weather' };
      } else if (lower.includes('food') || lower.includes('eat')) {
        aiResponseText = "Must-try dish: Babi Guling Komplit or Nasi Campur Bali with spiced sate lilit at Ibu Oka 3, Ubud (AI Recommendation Score: 98/100).";
        recCard = {
          title: 'Warung Ibu Oka 3',
          subtitle: '$6 per plate • Traditional Balinese Spiced Pork',
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
          tag: 'Must Try Dish',
          href: '/explore/bali'
        };
      } else {
        aiResponseText = `I can craft a personalized AI journey for "${query}" with curated luxury stays, hidden places, and automated budget breakdowns.`;
        actionBtn = { label: `✨ Plan Trip for "${query}"`, href: `/planner?q=${encodeURIComponent(query)}` };
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: 'Just now',
        actionButton: actionBtn,
        recommendationCard: recCard
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-navy-900 text-white shadow-soft-xl hover:shadow-glow-teal hover:scale-105 active:scale-95 transition-all duration-200 border border-slate-700/50 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-sunset-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
            <span className="text-xs font-extrabold tracking-wide flex items-center gap-1">
              Ask Globe AI
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-navy-900 via-navy-800 to-teal-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <div className="text-xs font-extrabold flex items-center gap-1.5">
                  Globe AI
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                    Live Travel Copilot
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Context-Aware on Bali & Japan
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages(INITIAL_MESSAGES)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200/80 text-slate-700 hover:border-teal-500 hover:text-teal-700 hover:bg-teal-50/50 shadow-soft-xs transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-navy-900 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    🤖
                  </div>
                )}
                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-soft-xs ${
                      msg.sender === 'user'
                        ? 'bg-navy-900 text-white rounded-br-xs'
                        : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Recommendation Card */}
                  {msg.recommendationCard && (
                    <Link
                      href={msg.recommendationCard.href}
                      onClick={() => setIsOpen(false)}
                      className="block bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-soft hover:shadow-md transition-all group"
                    >
                      <div className="flex gap-2.5 items-center">
                        <img
                          src={msg.recommendationCard.image}
                          alt={msg.recommendationCard.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="overflow-hidden flex-1">
                          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-md">
                            {msg.recommendationCard.tag}
                          </span>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700 truncate mt-0.5">
                            {msg.recommendationCard.title}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {msg.recommendationCard.subtitle}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Optional Action Button */}
                  {msg.actionButton && (
                    <Link
                      href={msg.actionButton.href}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold border border-teal-200 transition-colors"
                    >
                      {msg.actionButton.label}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-xl bg-navy-900 text-white flex items-center justify-center text-xs flex-shrink-0">
                  🤖
                </div>
                <div className="bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl flex items-center gap-1 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Globe AI (e.g., 'Optimize my trip' or 'Cheap stays in Bali')..."
              className="flex-1 px-3.5 py-2 rounded-2xl bg-slate-100/90 border border-slate-200/80 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-2xl bg-navy-900 hover:bg-teal-700 disabled:opacity-40 text-white shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
