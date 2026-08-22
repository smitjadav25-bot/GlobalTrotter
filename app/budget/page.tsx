'use client';

import React, { useState } from 'react';
import {
  PieChart as PieChartIcon,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Hotel,
  Plane,
  Utensils,
  Camera,
  ShoppingBag,
  Layers,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from 'recharts';

const BUDGET_BREAKDOWN_DATA = [
  { name: 'Hotel & Stays', value: 950, color: '#1c1c1c' },
  { name: 'Transport & Rail', value: 480, color: 'rgba(28,28,28,0.75)' },
  { name: 'Food & Dining', value: 520, color: 'rgba(28,28,28,0.60)' },
  { name: 'Activities & Tours', value: 340, color: 'rgba(28,28,28,0.45)' },
  { name: 'Shopping', value: 210, color: 'rgba(28,28,28,0.30)' },
  { name: 'Misc & Contingency', value: 150, color: 'rgba(28,28,28,0.18)' },
];

const DAILY_EXPENSE_TREND = [
  { day: 'Day 1', spend: 320, budget: 350 },
  { day: 'Day 2', spend: 410, budget: 350 },
  { day: 'Day 3', spend: 280, budget: 350 },
  { day: 'Day 4', spend: 520, budget: 350 },
  { day: 'Day 5', spend: 390, budget: 350 },
  { day: 'Day 6', spend: 310, budget: 350 },
  { day: 'Day 7', spend: 420, budget: 350 },
];

export default function StandaloneBudgetPage() {
  const [optimized, setOptimized] = useState(false);
  const totalSpend = 2650;
  const targetBudget = 2400;
  const overBudgetAmount = totalSpend - targetBudget;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px] flex items-center gap-2.5">
          <PieChartIcon className="w-6 h-6 opacity-80" /> Budget Intelligence & Expense Analysis
        </h1>
        <p className="text-xs text-muted font-normal mt-1">
          Automated multi-currency cost tracking, category breakdowns, and AI savings recommendations.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-cream rounded-card p-5 border border-light-cream">
          <span className="text-[11px] font-normal uppercase tracking-wider text-muted">
            Total Estimated Spend
          </span>
          <div className="text-2xl font-semibold text-charcoal tracking-tight mt-1">
            ${totalSpend.toLocaleString()}
          </div>
          <span className="text-[11px] text-muted mt-0.5 block">Across 6 expense categories</span>
        </div>

        <div className="bg-cream rounded-card p-5 border border-light-cream">
          <span className="text-[11px] font-normal uppercase tracking-wider text-muted">
            Allocated Trip Budget
          </span>
          <div className="text-2xl font-semibold text-charcoal tracking-tight mt-1">
            ${targetBudget.toLocaleString()}
          </div>
          <span className="text-[11px] text-muted mt-0.5 block">Set by user</span>
        </div>

        <div className="bg-cream rounded-card p-5 border border-light-cream">
          <span className="text-[11px] font-normal uppercase tracking-wider text-muted">
            Variance Status
          </span>
          <div className="text-2xl font-semibold text-charcoal tracking-tight mt-1">
            +${overBudgetAmount}
          </div>
          <span className="text-[11px] text-muted mt-0.5 block">Over allocated budget</span>
        </div>

        <div className="bg-cream rounded-card p-5 border border-light-cream">
          <span className="text-[11px] font-normal uppercase tracking-wider text-muted">
            Average Daily Cost
          </span>
          <div className="text-2xl font-semibold text-charcoal tracking-tight mt-1">
            ${Math.round(totalSpend / 7)} / day
          </div>
          <span className="text-[11px] text-muted mt-0.5 block">For 7 itinerary days</span>
        </div>
      </div>

      {/* AI Suggestion Alert Card: Warm muted palette (no saturated red) */}
      <div className="bg-cream rounded-card p-5 sm:p-6 border border-charcoal-40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-charcoal text-off-white shrink-0 shadow-inset-btn">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-charcoal">
              AI Budget Optimization Available
            </h3>
            <p className="text-xs text-muted font-normal leading-relaxed max-w-2xl">
              You are currently <span className="font-semibold text-charcoal">${overBudgetAmount} over budget</span>.
              Switching from western hotels to traditional homestays in Kyoto and booking regional rail passes will save approximately <span className="font-semibold text-charcoal">$250</span> without sacrificing convenience.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOptimized(!optimized)}
          className="px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80 transition-opacity shrink-0"
        >
          {optimized ? (
            <>
              <Check className="w-3.5 h-3.5" /> Budget Optimized
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" /> Optimize Budget
            </>
          )}
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown Donut */}
        <div className="bg-cream rounded-card p-6 border border-light-cream space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-light-cream">
            <h3 className="text-sm font-semibold text-charcoal">Category Allocation</h3>
            <span className="text-xs text-muted font-normal">6 Expense Tiers</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={BUDGET_BREAKDOWN_DATA}
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {BUDGET_BREAKDOWN_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#f7f4ed" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`$${value}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: '#f7f4ed',
                    borderRadius: '8px',
                    borderColor: '#eceae4',
                    color: '#1c1c1c',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-light-cream text-xs text-muted font-normal">
            {BUDGET_BREAKDOWN_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-1.5 rounded bg-charcoal-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="font-semibold text-charcoal">${item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Expense Projection */}
        <div className="bg-cream rounded-card p-6 border border-light-cream space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-light-cream">
            <h3 className="text-sm font-semibold text-charcoal">Daily Spending Trajectory</h3>
            <span className="text-xs text-muted font-normal">Spend vs Daily Target</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_EXPENSE_TREND}>
                <defs>
                  <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1c1c1c" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1c1c1c" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#5f5f5d" fontSize={11} tickLine={false} />
                <YAxis stroke="#5f5f5d" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f7f4ed',
                    borderRadius: '8px',
                    borderColor: '#eceae4',
                    color: '#1c1c1c',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="#1c1c1c"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#spendGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded bg-charcoal-3 flex items-center justify-between text-xs text-muted font-normal">
            <span>Daily Budget Cap: $350</span>
            <span className="font-semibold text-charcoal">Day 4 Peak: Sightseeing & High-Speed Rail</span>
          </div>
        </div>
      </div>
    </div>
  );
}
