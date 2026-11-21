'use client';

import { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MOCK_SUPERVISORS } from '@/data/mockSupervisors';
import {
  MAX_COMPARE_COUNT,
  MIN_COMPARE_COUNT,
  useShortlist,
} from '@/context/ShortlistContext';
import ComparisonView from '@/components/ComparisonView';

function ComparePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    shortlistedIds,
    isHydrated,
    selectedCompareIds,
    removeFromShortlist,
    removeFromCompareSelection,
  } = useShortlist();

  const rawIdsParam = searchParams.get('ids');

  const {
    comparedSupervisors,
    invalidIds,
    notShortlistedIds,
    exceededMax,
  } = useMemo(() => {
    const requestedIds = rawIdsParam
      ? Array.from(
          new Set(
            rawIdsParam
              .split(',')
              .map((id) => id.trim())
              .filter(Boolean)
          )
        )
      : selectedCompareIds;

    const invalid: string[] = [];
    const notShortlisted: string[] = [];
    const validShortlisted: typeof MOCK_SUPERVISORS = [];

    for (const id of requestedIds) {
      const found = MOCK_SUPERVISORS.find((s) => s.id === id);
      if (!found) {
        invalid.push(id);
      } else if (!shortlistedIds.includes(id)) {
        notShortlisted.push(found.name);
      } else {
        validShortlisted.push(found);
      }
    }

    return {
      comparedSupervisors: validShortlisted.slice(0, MAX_COMPARE_COUNT),
      invalidIds: invalid,
      notShortlistedIds: notShortlisted,
      exceededMax: validShortlisted.length > MAX_COMPARE_COUNT,
    };
  }, [rawIdsParam, selectedCompareIds, shortlistedIds]);

  const handleRemoveFromComparison = (supervisorId: string) => {
    removeFromCompareSelection(supervisorId);
    const remainingIds = comparedSupervisors
      .map((s) => s.id)
      .filter((id) => id !== supervisorId);
    if (remainingIds.length > 0) {
      router.replace(`/compare?ids=${remainingIds.join(',')}`, { scroll: false });
    } else {
      router.replace('/compare', { scroll: false });
    }
  };

  const handleRemoveFromShortlist = (supervisorId: string, supervisorName: string) => {
    removeFromShortlist(supervisorId, supervisorName);
    removeFromCompareSelection(supervisorId);
    const remainingIds = comparedSupervisors
      .map((s) => s.id)
      .filter((id) => id !== supervisorId);
    if (remainingIds.length > 0) {
      router.replace(`/compare?ids=${remainingIds.join(',')}`, { scroll: false });
    } else {
      router.replace('/compare', { scroll: false });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-200 dark:border-blue-800">
              <span>Side-by-Side Decision Support</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Supervisor Comparison
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Compare your shortlisted thesis supervisors across verification reliability, advising
              capacity, research alignment, and recommended next actions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/shortlist"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Return to Shortlist</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Notices for invalid, removed, or capped IDs */}
      {isHydrated && (invalidIds.length > 0 || notShortlistedIds.length > 0 || exceededMax) && (
        <div
          role="alert"
          className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-xs text-amber-900 dark:text-amber-200 space-y-1"
        >
          {invalidIds.length > 0 && (
            <p>
              <strong>Unrecognized supervisor ID(s) skipped:</strong>{' '}
              <code className="font-mono">{invalidIds.join(', ')}</code>
            </p>
          )}
          {notShortlistedIds.length > 0 && (
            <p>
              <strong>Excluded because not in your current shortlist:</strong>{' '}
              {notShortlistedIds.join(', ')}. Comparison only includes supervisors currently saved
              in your shortlist.
            </p>
          )}
          {exceededMax && (
            <p>
              <strong>Maximum reached:</strong> Only the first {MAX_COMPARE_COUNT} selected
              supervisors are displayed for readability.
            </p>
          )}
        </div>
      )}

      {/* Main Content */}
      {!isHydrated ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading supervisor comparison...
          </p>
        </div>
      ) : comparedSupervisors.length < MIN_COMPARE_COUNT ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 sm:p-14 text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Select at least {MIN_COMPARE_COUNT} shortlisted supervisors to compare
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
            {comparedSupervisors.length === 1
              ? `Only 1 valid shortlisted supervisor (${comparedSupervisors[0].name}) is currently selected. Choose at least one more supervisor from your shortlist to view a side-by-side comparison.`
              : 'Choose 2 to 3 supervisors from your shortlist to compare their verification status, advising availability, research profile, and recommended next actions.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shortlist"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
            >
              <span>Go to Shortlist</span>
            </Link>
            {shortlistedIds.length < MIN_COMPARE_COUNT && (
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <span>Browse Supervisor Directory</span>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <ComparisonView
          supervisors={comparedSupervisors}
          onRemoveFromComparison={handleRemoveFromComparison}
          onRemoveFromShortlist={handleRemoveFromShortlist}
        />
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-slate-500 text-sm">
          Loading Supervisor Comparison...
        </div>
      }
    >
      <ComparePageContent />
    </Suspense>
  );
}
