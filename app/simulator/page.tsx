'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GitCompare,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Check,
  TrendingUp,
  TrendingDown,
  CloudSun,
  DollarSign,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

export default function WhatIfSimulatorPage() {
  const [extraDays, setExtraDays] = useState(2);
  const [stayTier, setStayTier] = useState<'Standard' | 'Boutique' | 'Palace'>('Boutique');
  const [transitMode, setTransitMode] = useState<'Scenic Rail' | 'Flight' | 'Private Driver'>('Scenic Rail');
  const [applied, setApplied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const baseCost = 2400;
  const baseDays = 7;

  // Compute live modifications
  const dayDeltaCost = extraDays * 160;
  const stayDeltaCost = stayTier === 'Standard' ? -240 : stayTier === 'Boutique' ? 0 : 680;
  const transitDeltaCost = transitMode === 'Scenic Rail' ? -120 : transitMode === 'Flight' ? 0 : 210;

  const modifiedCost = baseCost + dayDeltaCost + stayDeltaCost + transitDeltaCost;
  const costDiff = modifiedCost - baseCost;

  const handleApply = () => {
    setApplied(true);
    setToastMessage('✨ Simulator modifications applied to active Bali itinerary!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700 mb-1">
            <GitCompare className="w-3.5 h-3.5" /> Scenario Experimentation Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            What-If Trip Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Test different trip durations, stay upgrades, and scenic transport modes with live cost diffs.
          </p>
        </div>

        <button
          onClick={handleApply}
          disabled={applied}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy-900 hover:bg-teal-700 disabled:opacity-80 text-white font-extrabold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          {applied ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-sunset-400" />}
          <span>{applied ? '✓ Changes Applied' : 'Apply Changes to Trip'}</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Extra Days */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
            <span>Extend Trip Duration</span>
            <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">+{extraDays} Days</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setExtraDays(Math.max(0, extraDays - 1))}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex-1 text-center font-extrabold text-sm text-navy-900">
              {baseDays + extraDays} Total Days
            </div>
            <button
              onClick={() => setExtraDays(Math.min(7, extraDays + 1))}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stay Tier */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Stay Comfort Tier</label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['Standard', 'Boutique', 'Palace'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setStayTier(tier)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  stayTier === tier
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Transit Mode */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Primary Transport Mode</label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['Scenic Rail', 'Flight', 'Private Driver'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTransitMode(mode)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  transitMode === mode
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Trip Plan */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Baseline</span>
              <h3 className="text-xl font-extrabold text-navy-900">Current Trip Plan</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              7 Days
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Destination & Route:</span>
              <span className="font-bold text-navy-900">Bali (Ubud → Canggu)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Accommodation Type:</span>
              <span className="font-bold text-navy-900">Boutique Eco Villa</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Transit Mode:</span>
              <span className="font-bold text-navy-900">Standard Flight & Taxi</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Activities Included:</span>
              <span className="font-bold text-navy-900">6 Major Excursions</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Weather Risk:</span>
              <span className="font-bold text-amber-600">Day 3 Rain (Outdoor)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Planned Spend</span>
            <span className="text-2xl font-black text-navy-900">${baseCost}</span>
          </div>
        </div>

        {/* Modified Simulated Trip */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-500/80 shadow-soft-lg space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-teal-500 text-navy-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl">
            Simulated Delta
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700">What-If Simulation</span>
              <h3 className="text-xl font-extrabold text-navy-900">Modified Trip Scenario</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              {baseDays + extraDays} Days
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Destination & Route:</span>
              <span className="font-bold text-teal-800">Bali (Ubud → Canggu → Sidemen + Nusa)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Accommodation Type:</span>
              <span className="font-bold text-teal-800">{stayTier} Luxury Retreat</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Transit Mode:</span>
              <span className="font-bold text-teal-800">{transitMode}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Activities Included:</span>
              <span className="font-bold text-teal-800">{6 + extraDays * 2} Major Excursions</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Weather Adaptation:</span>
              <span className="font-bold text-emerald-600">✓ 100% Weather Shielded</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 block">Simulated Spend</span>
              <span className="text-xs font-extrabold text-teal-700">
                {costDiff >= 0 ? `+$${costDiff}` : `-$${Math.abs(costDiff)}`} Net Difference
              </span>
            </div>
            <span className="text-2xl font-black text-navy-900">${modifiedCost}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
