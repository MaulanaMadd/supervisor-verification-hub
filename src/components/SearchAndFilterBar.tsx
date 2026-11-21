'use client';

import { VerificationStatus, AvailabilityStatus } from '@/types/supervisor';

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: VerificationStatus | 'all';
  onStatusFilterChange: (status: VerificationStatus | 'all') => void;
  fieldFilter: string;
  onFieldFilterChange: (field: string) => void;
  availabilityFilter: AvailabilityStatus | 'all';
  onAvailabilityFilterChange: (availability: AvailabilityStatus | 'all') => void;
  availableFields: string[];
  totalResults: number;
  totalSupervisors: number;
  onResetFilters: () => void;
}

export default function SearchAndFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  fieldFilter,
  onFieldFilterChange,
  availabilityFilter,
  onAvailabilityFilterChange,
  availableFields,
  totalResults,
  totalSupervisors,
  onResetFilters,
}: SearchAndFilterBarProps) {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'all' ||
    fieldFilter !== 'All Fields' ||
    availabilityFilter !== 'all';

  const statusOptions: { value: VerificationStatus | 'all'; label: string; countBadge?: string }[] = [
    { value: 'all', label: 'All Statuses' },
    { value: 'verified', label: 'Officially Verified' },
    { value: 'self-reported', label: 'Self-Reported' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'needs-update', label: 'Needs Update' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Row 1: Search Input & Quick Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input container (non-form so Enter can never trigger native GET /? navigation) */}
        <div
          role="search"
          className="relative flex-1"
        >
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            autoComplete="off"
            placeholder="Search by supervisor name, title, or research topic (e.g., TOGAF, COBIT, UX, Process Mining)..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Research Field Dropdown */}
        <div className="sm:w-64">
          <select
            value={fieldFilter}
            onChange={(e) => onFieldFilterChange(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          >
            {availableFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Verification Status Pills & Availability Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        {/* Verification Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 hidden lg:inline">
            Verification:
          </span>
          {statusOptions.map((opt) => {
            const isActive = statusFilter === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => onStatusFilterChange(opt.value)}
                className={`px-3 py-2 min-h-[34px] rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Availability Filter Toggle */}
        <div className="flex items-center space-x-2">
          <select
            value={availabilityFilter}
            onChange={(e) => onAvailabilityFilterChange(e.target.value as AvailabilityStatus | 'all')}
            className="py-2 px-3 min-h-[34px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Advising Statuses</option>
            <option value="open">Accepting Students Only</option>
            <option value="limited">Limited Slots</option>
            <option value="full">Quota Full</option>
            <option value="on-sabbatical">On Sabbatical</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium px-2.5 py-2 min-h-[34px] flex items-center space-x-1 cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
        <div>
          Showing <span className="font-semibold text-slate-800 dark:text-slate-200">{totalResults}</span> of{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200">{totalSupervisors}</span> potential thesis supervisors
        </div>
        {hasActiveFilters && (
          <span className="text-[11px] bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
            Filtered view
          </span>
        )}
      </div>
    </div>
  );
}
