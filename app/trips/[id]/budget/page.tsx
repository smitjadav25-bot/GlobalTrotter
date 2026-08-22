'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  PieChart as PieIcon,
  BarChart as BarIcon,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ArrowLeft,
  Calendar,
  MapPin,
  Loader2,
  Sliders,
  Eye,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { BudgetBreakdownDTO } from '@/lib/types';

const CATEGORY_COLORS: Record<string, string> = {
  SIGHTSEEING: '#0ea5e9', // Sky Blue
  FOOD: '#f59e0b',        // Amber
  ADVENTURE: '#10b981',   // Emerald
  RELAXATION: '#a855f7',  // Purple
  OTHER: '#64748b',       // Slate
};

export default function TripBudgetAnalyticsPage() {
  const params = useParams();
  const tripId = params.id as string;

  const [budget, setBudget] = useState<BudgetBreakdownDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/trips/${tripId}/budget`)
      .then((res) => res.json())
      .then((data) => {
        if (data.budget) setBudget(data.budget);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [tripId]);

  if (loading) {
    return (
      <div className="py-32 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
        <span className="text-sm font-semibold text-slate-500">Calculating budget analytics...</span>
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Budget data unavailable</h2>
        <Link href={`/trips/${tripId}/builder`} className="text-sm font-semibold text-coral hover:underline">
          Back to builder
        </Link>
      </div>
    );
  }

  const categoryChartData = budget.byCategory.filter((c) => c.total > 0);
  const dailyChartData = budget.byDay.map((d) => ({
    name: `D${d.dayNumber}`,
    date: d.date,
    total: d.total,
    isSpike: d.total > budget.averageCostPerDay * 1.5,
  }));

  const budgetUsagePercent = budget.budgetLimit
    ? Math.min(100, Math.round((budget.totalCost / budget.budgetLimit) * 100))
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href={`/trips/${tripId}/builder`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Builder
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Budget Breakdown & Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Automated spending insights for <span className="font-semibold text-slate-700">{budget.tripName}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/trips/${tripId}/builder`}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            Edit Activities
          </Link>
          <Link
            href={`/trips/${tripId}/view`}
            className="px-4 py-2 bg-coral hover:bg-coral-dark text-white rounded-xl text-xs font-bold shadow-md shadow-coral/20 transition-colors"
          >
            View Itinerary
          </Link>
        </div>
      </div>

      {/* Over-budget Alert Banner */}
      {budget.isOverBudget && budget.budgetLimit && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <div className="text-xs font-medium">
            <span className="font-bold">Budget Warning:</span> Total expenses (${budget.totalCost.toFixed(2)}) exceed your target budget limit (${budget.budgetLimit.toFixed(2)}) by ${(budget.totalCost - budget.budgetLimit).toFixed(2)}. Consider trimming high-cost activities.
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Spent</div>
          <div className="text-3xl font-black text-slate-900 mt-2">
            ${budget.totalCost.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1">Across {budget.totalDays} trip days</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Average</div>
          <div className="text-3xl font-black text-teal-600 mt-2">
            ${budget.averageCostPerDay.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1">Average per day expense</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Budget Limit</div>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {budget.budgetLimit ? `$${budget.budgetLimit.toFixed(2)}` : 'No Limit'}
          </div>
          {budgetUsagePercent !== null && (
            <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  budget.isOverBudget ? 'bg-rose-500' : 'bg-coral'
                }`}
                style={{ width: `${budgetUsagePercent}%` }}
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Destinations</div>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {budget.byCity.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Cities planned in itinerary</div>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Pie Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <PieIcon className="w-5 h-5 text-coral" />
            <h3 className="font-bold text-slate-900 text-base">Cost by Category</h3>
          </div>

          {categoryChartData.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400 py-16">
              No activity expenses recorded yet.
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      dataKey="total"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={45}
                      paddingAngle={4}
                    >
                      {categoryChartData.map((entry) => (
                        <Cell
                          key={`cell-${entry.category}`}
                          fill={CATEGORY_COLORS[entry.category] || '#94a3b8'}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Cost']}
                      contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend & Percentages */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                {budget.byCategory.map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[cat.category] || '#94a3b8' }}
                      />
                      <span className="font-medium text-slate-700 capitalize">
                        {cat.category.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-medium">{cat.percentage}%</span>
                      <span className="font-bold text-slate-900">${cat.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Daily Spending Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <BarIcon className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-slate-900 text-base">Daily Expense Distribution</h3>
            </div>
            <span className="text-xs text-slate-400">
              Avg: ${budget.averageCostPerDay.toFixed(2)}/day
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Day Cost']}
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                />
                <ReferenceLine
                  y={budget.averageCostPerDay}
                  stroke="#14b8a6"
                  strokeDasharray="4 4"
                  label={{ value: 'Avg', position: 'insideTopRight', fill: '#0d9488', fontSize: 10 }}
                />
                <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                  {dailyChartData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={entry.isSpike ? '#ff5a5f' : '#2dd4bf'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 mt-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400" /> Normal Day
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-coral" /> High Expense Day (&gt;1.5x Avg)
            </div>
          </div>
        </div>
      </div>

      {/* Spending by Destination Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
        <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-coral" /> Spending by Destination
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Destination</th>
                <th className="pb-3">Country</th>
                <th className="pb-3">Stops</th>
                <th className="pb-3 text-right">Total Cost</th>
                <th className="pb-3 text-right">% of Trip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {budget.byCity.map((city) => {
                const percent = budget.totalCost > 0 ? ((city.total / budget.totalCost) * 100).toFixed(1) : 0;
                return (
                  <tr key={city.cityName} className="hover:bg-slate-50/60">
                    <td className="py-3.5 font-bold text-slate-800">{city.cityName}</td>
                    <td className="py-3.5 text-slate-500 text-xs">{city.country}</td>
                    <td className="py-3.5 text-slate-600 text-xs">{city.stopsCount} stop</td>
                    <td className="py-3.5 font-bold text-teal-700 text-right">${city.total.toFixed(2)}</td>
                    <td className="py-3.5 text-slate-500 text-right text-xs font-semibold">{percent}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
