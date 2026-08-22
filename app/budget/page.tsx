'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PieChart as PieIcon,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  Plane,
  Utensils,
  Camera,
  ShoppingBag,
  HelpCircle,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

const INITIAL_CATEGORY_DATA = [
  { name: 'Hotel & Stays', value: 14200, color: '#1E293B', icon: Building2 },
  { name: 'Transport & Flights', value: 8900, color: '#14B8A6', icon: Plane },
  { name: 'Food & Dining', value: 6400, color: '#F97316', icon: Utensils },
  { name: 'Activities & Tours', value: 4100, color: '#8B5CF6', icon: Camera },
  { name: 'Shopping & Souvenirs', value: 2600, color: '#EC4899', icon: ShoppingBag },
  { name: 'Misc & Buffer', value: 1800, color: '#64748B', icon: HelpCircle },
];

const DAILY_CUMULATIVE_DATA = [
  { day: 'Day 1', actual: 4200, target: 4500 },
  { day: 'Day 2', actual: 8600, target: 9000 },
  { day: 'Day 3', actual: 14800, target: 13500 },
  { day: 'Day 4', actual: 19400, target: 18000 },
  { day: 'Day 5', actual: 24600, target: 22500 },
  { day: 'Day 6', actual: 31200, target: 27000 },
  { day: 'Day 7', actual: 38000, target: 34800 },
];

export default function BudgetOverviewPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORY_DATA);
  const [isOptimized, setIsOptimized] = useState(false);
  const [optimizing, setOptimizing] = useState(false);

  const totalSpent = categories.reduce((sum, c) => sum + c.value, 0);
  const targetBudget = 34800;
  const isOverBudget = totalSpent > targetBudget;
  const overAmount = totalSpent - targetBudget;

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setCategories((prev) =>
        prev.map((c) => {
          if (c.name === 'Hotel & Stays') return { ...c, value: c.value - 2000 };
          if (c.name === 'Transport & Flights') return { ...c, value: c.value - 1200 };
          return c;
        })
      );
      setIsOptimized(true);
      setOptimizing(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <PieIcon className="w-7 h-7 text-sunset-500" /> Travel Budget Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time analytics, categorical expense breakdowns, and AI cost optimization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/ai-planner"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Plan AI Budget
          </Link>
        </div>
      </div>

      {/* KPI Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-card-dark rounded-card p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Projected Spend</span>
          <div className="text-2xl font-black text-navy-900 dark:text-white">₹{totalSpent.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500">Across 6 travel categories</p>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-card p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Allocated Target</span>
          <div className="text-2xl font-black text-teal-600 dark:text-teal-400">₹{targetBudget.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500">Target budget limit</p>
        </div>

        <div className={`rounded-card p-5 border shadow-soft space-y-1 ${
          isOverBudget
            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
            : 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800'
        }`}>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Variance Status</span>
          <div className={`text-2xl font-black ${isOverBudget ? 'text-rose-600 dark:text-rose-400' : 'text-teal-600 dark:text-teal-400'}`}>
            {isOverBudget ? `+₹${overAmount.toLocaleString()} Over` : 'Within Budget Target'}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isOverBudget ? 'AI recommendations available' : 'Budget is healthy & balanced'}
          </p>
        </div>
      </div>

      {/* AI Suggestion Card per prompt spec */}
      <div className="relative rounded-card overflow-hidden bg-gradient-to-r from-sunset-500 via-sunset-600 to-teal-700 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Globe AI Budget Co-Pilot
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {isOptimized
                ? "🎉 Budget Optimized Successfully!"
                : "You're ₹3,200 over budget. Switch to a boutique homestay to save ₹2,000."}
            </h2>
            <p className="text-xs text-white/90 leading-relaxed">
              {isOptimized
                ? "We swapped central commercial hotels for highly-rated private machiyas in Kyoto and bundled regional express train tickets, bringing your total expenditure right on target."
                : "Our algorithm identified equivalent 4.8★ rated stays in nearby residential districts (saving ₹2,000) and off-peak train transfers (saving ₹1,200)."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleOptimize}
            disabled={isOptimized || optimizing}
            className="px-6 py-3 bg-white text-navy-900 hover:bg-slate-100 disabled:bg-white/80 rounded-2xl text-xs font-black shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center gap-2"
          >
            {optimizing ? (
              <>
                <div className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                Optimizing Budget...
              </>
            ) : isOptimized ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Optimized
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-sunset-500" /> Optimize Budget
              </>
            )}
          </button>
        </div>
      </div>

      {/* Charts Grid: Recharts Pie & Area Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown (Pie) */}
        <div className="bg-white dark:bg-card-dark rounded-card p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-900 dark:text-white">Expense Distribution by Category</h3>
            <span className="text-xs text-slate-400 font-medium">6 Categories</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-md" style={{ backgroundColor: cat.color }} />
                <div className="truncate">
                  <div className="font-semibold text-slate-700 dark:text-slate-300 truncate">{cat.name}</div>
                  <div className="text-[11px] text-slate-400 font-bold">₹{cat.value.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Cumulative Burn (Area Chart) */}
        <div className="bg-white dark:bg-card-dark rounded-card p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-900 dark:text-white">Cumulative Burn vs. Target</h3>
            <span className="text-xs text-teal-600 dark:text-teal-400 font-bold">7-Day Trajectory</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_CUMULATIVE_DATA}>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip formatter={(val: any) => [`₹${Number(val).toLocaleString()}`]} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="actual"
                  name="Projected Spend"
                  stroke="#F97316"
                  fill="#F9731620"
                  strokeWidth={2.5}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Planned Ceiling"
                  stroke="#14B8A6"
                  fill="#14B8A610"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center pt-2">
            Spending pace is heaviest on Days 3 & 4 due to bullet train transit and multi-course dining in Kyoto.
          </p>
        </div>
      </div>
    </div>
  );
}
