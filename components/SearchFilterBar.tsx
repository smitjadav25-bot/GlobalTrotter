'use client';

import React from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  filterOptions?: FilterOption[];
  selectedFilter?: string;
  onFilterChange?: (value: string) => void;
  secondaryFilterOptions?: FilterOption[];
  selectedSecondaryFilter?: string;
  onSecondaryFilterChange?: (value: string) => void;
  sortOptions?: FilterOption[];
  selectedSort?: string;
  onSortChange?: (value: string) => void;
  totalResults?: number;
}

export default function SearchFilterBar({
  searchQuery,
  onSearchChange,
  placeholder = 'Search...',
  filterOptions,
  selectedFilter,
  onFilterChange,
  secondaryFilterOptions,
  selectedSecondaryFilter,
  onSecondaryFilterChange,
  sortOptions,
  selectedSort,
  onSortChange,
  totalResults,
}: SearchFilterBarProps) {
  const hasActiveFilters =
    (selectedFilter && selectedFilter !== 'ALL') ||
    (selectedSecondaryFilter && selectedSecondaryFilter !== 'ALL') ||
    searchQuery.trim().length > 0;

  const handleReset = () => {
    onSearchChange('');
    if (onFilterChange) onFilterChange('ALL');
    if (onSecondaryFilterChange) onSecondaryFilterChange('ALL');
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-soft space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 transition-all text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Primary Filter Dropdown (e.g. Region or Type) */}
        {filterOptions && onFilterChange && (
          <div className="flex items-center gap-2">
            <select
              value={selectedFilter || 'ALL'}
              onChange={(e) => onFilterChange(e.target.value)}
              className="w-full md:w-auto px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-coral/40"
            >
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Secondary Filter Dropdown (e.g. Cost Range) */}
        {secondaryFilterOptions && onSecondaryFilterChange && (
          <div className="flex items-center gap-2">
            <select
              value={selectedSecondaryFilter || 'ALL'}
              onChange={(e) => onSecondaryFilterChange(e.target.value)}
              className="w-full md:w-auto px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-coral/40"
            >
              {secondaryFilterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sort Dropdown */}
        {sortOptions && onSortChange && (
          <div className="flex items-center gap-2">
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full md:w-auto px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-coral/40"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Meta Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
        <div>
          {totalResults !== undefined && (
            <span>
              Showing <span className="font-bold text-slate-800">{totalResults}</span> {totalResults === 1 ? 'result' : 'results'}
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-coral hover:text-coral-dark font-semibold text-xs transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
