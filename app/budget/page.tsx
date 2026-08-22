'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingDown,
  Sparkles,
  PieChart as PieIcon,
  BarChart3,
  LineChart as LineIcon,
  Check,
  Zap,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { trotStore } from '@/lib/store';

const CATEGORY_DATA = [
  { name: 'Hotels & Stays', value: 920, color: '#0F172A', pct: '38%' },
  { name: 'Transportation', value: 540, color: '#0D9488', pct: '22%' },
  { name: 'Food & Dining', value: 380, color: '#F97316', pct: '16%' },
  { name: 'Activities & Tours', value: 310, color: '#6366F1', pct: '13%' },
  { name: 'Shopping', value: 160, color: '#EC4899', pct: '7%' },
  { name: 'Miscellaneous', value: 90, color: '#64748B', pct: '4%' },
];

const DAILY_EXPENSE_DATA = [
  { day: 'Day 1', planned: 380, actual: 350, transport: 180, stay: 120, food: 50 },
  { day: 'Day 2', planned: 290, actual: 270, transport: 30, stay: 140, food: 60 },
  { day: 'Day 3', planned: 320, actual: 340, transport: 40, stay: 140, food: 90 },
  { day: 'Day 4', planned: 250, actual: 210, transport: 20, stay: 120, food: 40 },
  { day: 'Day 5', planned: 310, actual: 290, transport: 50, stay: 140, food: 70 },
  { day: 'Day 6', planned: 420, actual: 390, transport: 120, stay: 160, food: 80 },
  { day: 'Day 7', planned: 430, actual: 400, transport: 100, stay: 180, food: 90 },
];

const TIMELINE_DATA = [
  { day: 'Day 1', cumulative: 350, budgetLimit: 400 },
  { day: 'Day 2', cumulative: 620, budgetLimit: 800 },
  { day: 'Day 3', cumulative: 960, budgetLimit: 1200 },
  { day: 'Day 4', cumulative: 1170, budgetLimit: 1600 },
  { day: 'Day 5', cumulative: 1460, budgetLimit: 2000 },
  { day: 'Day 6', cumulative: 1850, budgetLimit: 2400 },
  { day: 'Day 7', cumulative: 2250, budgetLimit: 2800 },
];

export default function BudgetAnalysisPage() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalBudget = 2800;
  const currentTotal = isOptimized ? 2080 : 2400;
  const savings = totalBudget - currentTotal;

  const handleOptimizeBudget = () => {
    setOptimizing(true);
    setTimeout(() => {
      setIsOptimized(true);
      setOptimizing(false);
      setToastMessage('✨ AI Budget Optimization Applied! Saved $320 across stays and transport pass.');
      setTimeout(() => setToastMessage(null), 4000);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Toast Notification */}
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
            <DollarSign className="w-3.5 h-3.5" /> Real-Time Expense Analytics
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Budget Analysis & Optimization
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Active Trip: <strong>Bali Spiritual Retreat & Island Escapes (7 Days)</strong>
          </p>
        </div>

        <button
          onClick={handleOptimizeBudget}
          disabled={optimizing || isOptimized}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-navy-900 hover:from-teal-500 hover:to-navy-800 disabled:opacity-75 text-white font-extrabold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          {optimizing ? (
            <RefreshCw className="w-4 h-4 animate-spin text-teal-300" />
          ) : (
            <Sparkles className="w-4 h-4 text-sunset-400" />
          )}
          <span>{isOptimized ? '✓ Optimized with AI' : '✨ Optimize Budget'}</span>
        </button>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        <div className="p-4 rounded-3xl bg-navy-900 text-white shadow-soft col-span-2 sm:col-span-1 space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-300">Total Budget</div>
          <div className="text-xl font-black">${totalBudget}</div>
          <div className="text-[10px] text-teal-400 font-semibold">Max Ceiling</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Hotels & Stays</div>
          <div className="text-lg font-black text-navy-900">${isOptimized ? 740 : 920}</div>
          <div className="text-[10px] text-teal-700 font-semibold">{isOptimized ? '-$180' : '38% of total'}</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Transport</div>
          <div className="text-lg font-black text-navy-900">${isOptimized ? 460 : 540}</div>
          <div className="text-[10px] text-teal-700 font-semibold">{isOptimized ? '-$80' : '22% of total'}</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Food & Dining</div>
          <div className="text-lg font-black text-navy-900">$380</div>
          <div className="text-[10px] text-slate-400">16% of total</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Activities</div>
          <div className="text-lg font-black text-navy-900">$310</div>
          <div className="text-[10px] text-slate-400">13% of total</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Shopping</div>
          <div className="text-lg font-black text-navy-900">$160</div>
          <div className="text-[10px] text-slate-400">7% of total</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Miscellaneous</div>
          <div className="text-lg font-black text-navy-900">$90</div>
          <div className="text-[10px] text-slate-400">4% of total</div>
        </div>
      </div>

      {/* AI Suggestion Alert Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
            💡
          </div>
          <div>
            <div className="font-extrabold text-sm text-navy-900 flex items-center gap-2">
              AI Smart Savings Opportunity
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                High Impact
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Switching 2 nights in Ubud to <strong>"Bamboo Eco Sanctuary Villa"</strong> saves $180. Using the 72-Hour Unlimited Metro Pass in Tokyo saves $65.
            </p>
          </div>
        </div>

        {!isOptimized ? (
          <button
            onClick={handleOptimizeBudget}
            className="px-4 py-2 bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all whitespace-nowrap"
          >
            Apply Savings
          </button>
        ) : (
          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> $320 Saved
          </div>
        )}
      </div>

      {/* Charts Section: Pie & Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Pie Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-navy-900 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-teal-600" /> Expense Category Breakdown
            </h3>
            <span className="text-xs font-bold text-slate-400">Total: ${currentTotal}</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`$${value}`, 'Amount']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-100">
            {CATEGORY_DATA.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-slate-600 truncate">{c.name}:</span>
                <span className="font-extrabold text-navy-900 ml-auto">${c.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Day-Wise Bar Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-navy-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sunset-500" /> Planned vs Actual Daily Spend
            </h3>
            <span className="text-xs font-bold text-teal-700">Daily Avg: ${Math.round(currentTotal / 7)}</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DAILY_EXPENSE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="planned" fill="#CBD5E1" name="Planned ($)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="actual" fill="#0D9488" name="Actual / Optimized ($)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
            <span>✨ Day 4 & Day 5 optimized under budget ceiling.</span>
            <span className="font-bold text-teal-700">Healthy Margin</span>
          </div>
        </div>
      </div>

      {/* Cumulative Line Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-navy-900 flex items-center gap-2">
            <LineIcon className="w-4 h-4 text-indigo-600" /> Cumulative Expense Trajectory
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            Under Budget by ${savings}
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TIMELINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Line type="monotone" dataKey="budgetLimit" stroke="#EF4444" strokeDasharray="5 5" name="Budget Limit ($)" />
              <Line type="monotone" dataKey="cumulative" stroke="#0D9488" strokeWidth={3} dot={{ r: 4 }} name="Total Spent ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
