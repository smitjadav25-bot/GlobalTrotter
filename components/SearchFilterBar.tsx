'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

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
    <div className="bg-cream rounded-card p-4 border border-light-cream space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-8 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring-blue"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-charcoal rounded-pill"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Primary Filter Dropdown */}
        {filterOptions && onFilterChange && (
          <div className="flex items-center gap-2">
            <select
              value={selectedFilter || 'ALL'}
              onChange={(e) => onFilterChange(e.target.value)}
              className="w-full md:w-auto px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs font-normal focus:outline-none focus:ring-2 focus:ring-ring-blue"
            >
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Secondary Filter Dropdown */}
        {secondaryFilterOptions && onSecondaryFilterChange && (
          <div className="flex items-center gap-2">
            <select
              value={selectedSecondaryFilter || 'ALL'}
              onChange={(e) => onSecondaryFilterChange(e.target.value)}
              className="w-full md:w-auto px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs font-normal focus:outline-none focus:ring-2 focus:ring-ring-blue"
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
              className="w-full md:w-auto px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs font-normal focus:outline-none focus:ring-2 focus:ring-ring-blue"
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
      <div className="flex items-center justify-between text-xs text-muted pt-1 border-t border-light-cream">
        <div>
          {totalResults !== undefined && (
            <span>
              Showing <span className="font-semibold text-charcoal">{totalResults}</span> {totalResults === 1 ? 'result' : 'results'}
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-charcoal hover:underline font-normal text-xs transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
