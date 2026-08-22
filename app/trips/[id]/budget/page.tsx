'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  PieChart as PieIcon,
  BarChart as BarIcon,
  AlertTriangle,
  ArrowLeft,
  MapPin,
  Loader2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { BudgetBreakdownDTO } from '@/lib/types';

const CATEGORY_COLORS: Record<string, string> = {
  SIGHTSEEING: '#1c1c1c',
  FOOD: 'rgba(28,28,28,0.75)',
  ADVENTURE: 'rgba(28,28,28,0.60)',
  RELAXATION: 'rgba(28,28,28,0.45)',
  OTHER: 'rgba(28,28,28,0.30)',
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
      <div className="py-32 text-center flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
        <span className="text-xs font-normal text-muted">Calculating budget analytics...</span>
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-lg font-semibold text-charcoal">Budget data unavailable</h2>
        <Link href={`/trips/${tripId}/builder`} className="text-xs font-normal text-charcoal underline">
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
            className="inline-flex items-center gap-1 text-xs font-normal text-muted hover:text-charcoal mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Builder
          </Link>
          <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px]">
            Budget Breakdown & Analytics
          </h1>
          <p className="text-xs text-muted font-normal mt-0.5">
            Automated spending insights for <span className="font-semibold text-charcoal">{budget.tripName}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/trips/${tripId}/builder`}
            className="px-3.5 py-1.5 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal hover:bg-charcoal-4 transition-colors"
          >
            Edit Activities
          </Link>
          <Link
            href={`/trips/${tripId}/view`}
            className="px-4 py-1.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal active:opacity-80 transition-opacity"
          >
            View Itinerary
          </Link>
        </div>
      </div>

      {/* Over-budget Alert Banner (Warm neutral palette, no bright saturated red) */}
      {budget.isOverBudget && budget.budgetLimit && (
        <div className="p-4 rounded-card bg-cream border border-charcoal-40 flex items-center gap-3 text-charcoal">
          <AlertTriangle className="w-4 h-4 text-charcoal shrink-0" />
          <div className="text-xs font-normal">
            <span className="font-semibold">Budget Warning:</span> Total expenses (${budget.totalCost.toFixed(2)}) exceed your target budget limit (${budget.budgetLimit.toFixed(2)}) by ${(budget.totalCost - budget.budgetLimit).toFixed(2)}. Consider trimming high-cost activities.
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-cream rounded-card p-5 border border-light-cream">
          <div className="text-[11px] font-normal uppercase tracking-wider text-muted">Total Spent</div>
          <div className="text-2xl font-semibold text-charcoal mt-1">
            ${budget.totalCost.toFixed(2)}
          </div>
          <div className="text-xs text-muted mt-0.5">Across {budget.totalDays} trip days</div>
        </div>

        <div className="bg-cream rounded-card p-5 border border-light-cream">
          <div className="text-[11px] font-normal uppercase tracking-wider text-muted">Daily Average</div>
          <div className="text-2xl font-semibold text-charcoal mt-1">
            ${budget.averageCostPerDay.toFixed(2)}
          </div>
          <div className="text-xs text-muted mt-0.5">Average per day expense</div>
        </div>

        <div className="bg-cream rounded-card p-5 border border-light-cream">
          <div className="text-[11px] font-normal uppercase tracking-wider text-muted">Budget Limit</div>
          <div className="text-2xl font-semibold text-charcoal mt-1">
            {budget.budgetLimit ? `$${budget.budgetLimit.toFixed(2)}` : 'No Limit'}
          </div>
          {budgetUsagePercent !== null && (
            <div className="w-full bg-light-cream rounded-pill h-1.5 mt-2 overflow-hidden">
              <div
                className="h-full rounded-pill bg-charcoal transition-all"
                style={{ width: `${budgetUsagePercent}%` }}
              />
            </div>
          )}
        </div>

        <div className="bg-cream rounded-card p-5 border border-light-cream">
          <div className="text-[11px] font-normal uppercase tracking-wider text-muted">Destinations</div>
          <div className="text-2xl font-semibold text-charcoal mt-1">
            {budget.byCity.length}
          </div>
          <div className="text-xs text-muted mt-0.5">Cities planned in itinerary</div>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Pie Chart */}
        <div className="lg:col-span-5 bg-cream rounded-card p-6 border border-light-cream flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-light-cream">
            <PieIcon className="w-4 h-4 opacity-80" />
            <h3 className="font-semibold text-charcoal text-sm">Cost by Category</h3>
          </div>

          {categoryChartData.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-xs text-muted py-16">
              No activity expenses recorded yet.
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center">
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      dataKey="total"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      innerRadius={45}
                      paddingAngle={3}
                    >
                      {categoryChartData.map((entry) => (
                        <Cell
                          key={`cell-${entry.category}`}
                          fill={CATEGORY_COLORS[entry.category] || '#5f5f5d'}
                          stroke="#f7f4ed"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Cost']}
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

              {/* Legend & Percentages */}
              <div className="space-y-1.5 pt-3 border-t border-light-cream">
                {budget.byCategory.map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between text-xs text-muted font-normal">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded"
                        style={{ backgroundColor: CATEGORY_COLORS[cat.category] || '#5f5f5d' }}
                      />
                      <span className="capitalize text-charcoal">
                        {cat.category.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{cat.percentage}%</span>
                      <span className="font-semibold text-charcoal">${cat.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Daily Spending Bar Chart */}
        <div className="lg:col-span-7 bg-cream rounded-card p-6 border border-light-cream flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-light-cream">
            <div className="flex items-center gap-2">
              <BarIcon className="w-4 h-4 opacity-80" />
              <h3 className="font-semibold text-charcoal text-sm">Daily Expense Distribution</h3>
            </div>
            <span className="text-xs text-muted font-normal">
              Avg: ${budget.averageCostPerDay.toFixed(2)}/day
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eceae4" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#5f5f5d' }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#5f5f5d' }} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Day Cost']}
                  contentStyle={{
                    backgroundColor: '#f7f4ed',
                    borderRadius: '8px',
                    borderColor: '#eceae4',
                    color: '#1c1c1c',
                    fontSize: '12px',
                  }}
                />
                <ReferenceLine
                  y={budget.averageCostPerDay}
                  stroke="#1c1c1c"
                  strokeDasharray="4 4"
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {dailyChartData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={entry.isSpike ? '#1c1c1c' : 'rgba(28,28,28,0.5)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Spending by Destination Table */}
      <div className="bg-cream rounded-card p-6 border border-light-cream">
        <h3 className="font-semibold text-charcoal text-sm mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 opacity-70" /> Spending by Destination
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-light-cream text-[11px] font-normal text-muted uppercase tracking-wider">
                <th className="pb-2">Destination</th>
                <th className="pb-2">Country</th>
                <th className="pb-2">Stops</th>
                <th className="pb-2 text-right">Total Cost</th>
                <th className="pb-2 text-right">% of Trip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-cream">
              {budget.byCity.map((city) => {
                const percent = budget.totalCost > 0 ? ((city.total / budget.totalCost) * 100).toFixed(1) : 0;
                return (
                  <tr key={city.cityName} className="hover:bg-charcoal-3 transition-colors">
                    <td className="py-2.5 font-semibold text-charcoal">{city.cityName}</td>
                    <td className="py-2.5 text-muted">{city.country}</td>
                    <td className="py-2.5 text-muted">{city.stopsCount} stop</td>
                    <td className="py-2.5 font-semibold text-charcoal text-right">${city.total.toFixed(2)}</td>
                    <td className="py-2.5 text-muted text-right">{percent}%</td>
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
