'use client';

import Link from 'next/link';
import { Supervisor } from '@/types/supervisor';
import VerificationBadge from '@/components/VerificationBadge';
import AvailabilityBadge from '@/components/AvailabilityBadge';
import FreshnessBadge from '@/components/FreshnessBadge';
import CandidateDecisionControls from '@/components/CandidateDecisionControls';
import {
  GuidanceTone,
  evaluateCandidateGuidance,
  findSharedItems,
  generateComparisonInsights,
} from '@/lib/decisionGuidance';

interface ComparisonViewProps {
  supervisors: Supervisor[];
  onRemoveFromComparison: (supervisorId: string) => void;
  onRemoveFromShortlist: (supervisorId: string, supervisorName: string) => void;
}

const TONE_BADGE_CLASSES: Record<GuidanceTone, string> = {
  emerald:
    'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700',
  indigo:
    'bg-indigo-50 text-indigo-800 border-indigo-300 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-700',
  amber:
    'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700',
  rose:
    'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700',
  slate:
    'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
};

export default function ComparisonView({
  supervisors,
  onRemoveFromComparison,
  onRemoveFromShortlist,
}: ComparisonViewProps) {
  const sharedFields = findSharedItems(supervisors.map((s) => s.researchFields));
  const sharedMethodologies = findSharedItems(supervisors.map((s) => s.methodologies));
  const decisionInsights = generateComparisonInsights(supervisors);
  const guidanceById = new Map(
    supervisors.map((sup) => [sup.id, evaluateCandidateGuidance(sup)])
  );

  return (
    <div className="space-y-6">
      {/* Explainable Decision Guidance Summary (Strictly Rule-Based, Data-Derived) */}
      <section
        aria-label="Key differences and decision guidance"
        data-testid="decision-guidance-summary"
        className="bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-200 font-bold text-sm">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Key Differences & Explainable Decision Guidance</span>
          </div>
          <span className="text-[11px] font-medium text-blue-700 dark:text-blue-300 bg-white/80 dark:bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
            Rule-based from verified profile data • No automated rankings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {decisionInsights.map((insight, idx) => (
            <div
              key={idx}
              className="bg-white/90 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 rounded-xl p-3.5 text-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {insight.title}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                    insight.category === 'factual'
                      ? 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                      : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                  }`}
                >
                  {insight.category === 'factual' ? 'Fact' : 'Advisory'}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {insight.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DESKTOP & TABLET: Aligned Side-by-Side Comparison Table */}
      <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left" data-testid="comparison-table">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
                <th className="sticky left-0 z-10 bg-slate-50 dark:bg-slate-800 w-48 lg:w-56 p-5 align-top text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700">
                  Comparison Criteria
                </th>
                {supervisors.map((sup) => (
                  <th
                    key={sup.id}
                    className="p-5 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800 min-w-[260px]"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {sup.avatarInitials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/supervisors/${sup.id}`}
                          className="font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug block"
                        >
                          {sup.name}
                        </Link>
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                          {sup.academicTitle}
                        </p>
                        <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                          {sup.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3 border-t border-slate-200/70 dark:border-slate-700/70 font-normal">
                      <Link
                        href={`/supervisors/${sup.id}`}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                      >
                        View Profile
                      </Link>
                      <button
                        type="button"
                        onClick={() => onRemoveFromComparison(sup.id)}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-600 transition-colors cursor-pointer"
                      >
                        Remove from Compare
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveFromShortlist(sup.id, sup.name)}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                        title="Remove from shortlist"
                      >
                        Unshortlist
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {/* SECTION: Your Decision Status & Notes */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td
                  colSpan={supervisors.length + 1}
                  className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400"
                >
                  Your Candidate Evaluation (Status & Personal Notes)
                </td>
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Decision Status & Notes
                </td>
                {supervisors.map((sup) => (
                  <td
                    key={sup.id}
                    className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800"
                  >
                    <CandidateDecisionControls
                      supervisorId={sup.id}
                      supervisorName={sup.name}
                      compact
                    />
                  </td>
                ))}
              </tr>

              {/* SECTION: Verification & Reliability */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td
                  colSpan={supervisors.length + 1}
                  className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400"
                >
                  Verification & Reliability
                </td>
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Verification Status
                </td>
                {supervisors.map((sup) => (
                  <td
                    key={sup.id}
                    className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <VerificationBadge status={sup.verificationStatus} size="sm" />
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sup.verificationStatusDescription}
                    </p>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Verification Scope
                </td>
                {supervisors.map((sup) => {
                  const verifiedCount = sup.verificationScope.filter((i) => i.isVerified).length;
                  return (
                    <td
                      key={sup.id}
                      className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {verifiedCount}/{sup.verificationScope.length} Dimensions Verified
                      </div>
                      <ul className="space-y-1">
                        {sup.verificationScope.map((scope) => (
                          <li key={scope.id} className="flex items-start space-x-1.5">
                            <span
                              className={`mt-0.5 font-bold ${
                                scope.isVerified
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-amber-600 dark:text-amber-400'
                              }`}
                            >
                              {scope.isVerified ? '✓' : '○'}
                            </span>
                            <span className="text-slate-600 dark:text-slate-300">
                              {scope.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Information Freshness & Sources
                </td>
                {supervisors.map((sup) => (
                  <td
                    key={sup.id}
                    className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <FreshnessBadge freshness={sup.freshness} />
                    <div className="text-slate-600 dark:text-slate-300">
                      {sup.freshness.freshnessLabel} ({sup.freshness.lastUpdatedDate})
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {sup.informationSources.length} source(s):{' '}
                      {sup.informationSources.map((src) => src.title).join('; ')}
                    </div>
                  </td>
                ))}
              </tr>

              {/* SECTION: Advising Availability */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td
                  colSpan={supervisors.length + 1}
                  className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400"
                >
                  Advising Availability & Capacity
                </td>
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Current Availability & Quota
                </td>
                {supervisors.map((sup) => (
                  <td
                    key={sup.id}
                    className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <AvailabilityBadge status={sup.availabilityStatus} quota={sup.quota} />
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      {sup.availabilityLabel}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Period: {sup.quota.semester}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Office Hours & Location
                </td>
                {supervisors.map((sup) => (
                  <td
                    key={sup.id}
                    className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800 space-y-1 text-slate-600 dark:text-slate-300"
                  >
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      {sup.officeHours}
                    </div>
                    <div>{sup.roomLocation}</div>
                  </td>
                ))}
              </tr>

              {/* SECTION: Academic & Research Profile */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td
                  colSpan={supervisors.length + 1}
                  className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400"
                >
                  Academic & Research Profile
                </td>
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Research Fields
                </td>
                {supervisors.map((sup) => (
                  <td
                    key={sup.id}
                    className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {sup.researchFields.map((field) => {
                        const isShared = sharedFields.has(field);
                        return (
                          <span
                            key={field}
                            className={`px-2 py-0.5 rounded text-[11px] border ${
                              isShared
                                ? 'bg-blue-50 text-blue-800 border-blue-300 font-semibold dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-700'
                                : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {field}
                            {isShared ? ' (Shared)' : ''}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Methodologies & Frameworks
                </td>
                {supervisors.map((sup) => (
                  <td
                    key={sup.id}
                    className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800"
                  >
                    <ul className="space-y-1.5">
                      {sup.methodologies.map((method) => {
                        const isShared = sharedMethodologies.has(method);
                        return (
                          <li
                            key={method}
                            className={
                              isShared
                                ? 'font-semibold text-blue-700 dark:text-blue-300'
                                : 'text-slate-600 dark:text-slate-300'
                            }
                          >
                            • {method}
                            {isShared ? ' (Shared)' : ''}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Active Thesis Focus Areas
                </td>
                {supervisors.map((sup) => (
                  <td
                    key={sup.id}
                    className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800"
                  >
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sup.thesisFocusAreas.map((topic) => (
                        <li key={topic}>• {topic}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* SECTION: Suggested Next Action (Advisory) */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td
                  colSpan={supervisors.length + 1}
                  className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400"
                >
                  Suggested Next Action (Advisory Guidance)
                </td>
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Advisory Next Step & Rationale
                </td>
                {supervisors.map((sup) => {
                  const guidance = guidanceById.get(sup.id)!;
                  const { suggestedAction } = guidance;
                  return (
                    <td
                      key={sup.id}
                      className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800 space-y-2.5"
                    >
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[11px] font-semibold ${TONE_BADGE_CLASSES[suggestedAction.tone]}`}
                      >
                        {suggestedAction.label}
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-800 dark:text-slate-200">Why:</strong>{' '}
                        {suggestedAction.rationale}
                      </p>
                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                          Profile Recommendation:
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                          {sup.recommendedAction.headline}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top">
                  Prerequisites & Action Link
                </td>
                {supervisors.map((sup) => {
                  const { suggestedAction } = guidanceById.get(sup.id)!;
                  return (
                    <td
                      key={sup.id}
                      className="p-4 align-top border-r last:border-r-0 border-slate-200 dark:border-slate-800 space-y-3"
                    >
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                        {sup.recommendedAction.prerequisites.map((pre) => (
                          <li key={pre}>• {pre}</li>
                        ))}
                      </ul>
                      <Link
                        href={suggestedAction.href}
                        data-suggested-action-link={sup.id}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                      >
                        <span>{suggestedAction.ctaLabel}</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE: Stacked Criterion-Aligned Cards (no horizontal overflow) */}
      <div className="md:hidden space-y-4" data-testid="comparison-mobile-cards">
        {supervisors.map((sup) => {
          const verifiedCount = sup.verificationScope.filter((i) => i.isVerified).length;
          const { suggestedAction } = guidanceById.get(sup.id)!;
          return (
            <div
              key={sup.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-start space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {sup.avatarInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/supervisors/${sup.id}`}
                      className="font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 block"
                    >
                      {sup.name}
                    </Link>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      {sup.academicTitle}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => onRemoveFromComparison(sup.id)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                  >
                    Remove from Compare
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveFromShortlist(sup.id, sup.name)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50"
                  >
                    Unshortlist
                  </button>
                </div>
              </div>

              {/* Mobile Criteria List */}
              <div className="p-4 divide-y divide-slate-100 dark:divide-slate-800 text-xs space-y-3">
                {/* Decision Status & Notes */}
                <div>
                  <CandidateDecisionControls
                    supervisorId={sup.id}
                    supervisorName={sup.name}
                    compact
                  />
                </div>

                <div className="pt-3 space-y-1.5">
                  <div className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                    Verification & Freshness
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <VerificationBadge status={sup.verificationStatus} size="sm" />
                    <FreshnessBadge freshness={sup.freshness} />
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Scope: <span className="font-semibold">{verifiedCount}/{sup.verificationScope.length}</span> dimensions verified
                  </div>
                </div>

                <div className="pt-3 space-y-1.5">
                  <div className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                    Availability
                  </div>
                  <AvailabilityBadge status={sup.availabilityStatus} quota={sup.quota} />
                  <div className="text-slate-700 dark:text-slate-200 font-medium">
                    {sup.availabilityLabel}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">{sup.officeHours}</div>
                </div>

                <div className="pt-3 space-y-1.5">
                  <div className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                    Research Fields & Methodologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {sup.researchFields.map((field) => (
                      <span
                        key={field}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px]"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 pt-1">
                    <span className="font-semibold">Methods:</span> {sup.methodologies.join(', ')}
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <div className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                    Suggested Next Action (Advisory)
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[11px] font-semibold ${TONE_BADGE_CLASSES[suggestedAction.tone]}`}
                  >
                    {suggestedAction.label}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-800 dark:text-slate-200">Why:</strong>{' '}
                    {suggestedAction.rationale}
                  </p>
                  <Link
                    href={suggestedAction.href}
                    className="inline-flex items-center justify-center w-full px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  >
                    {suggestedAction.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
