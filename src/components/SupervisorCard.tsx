'use client';

import Link from 'next/link';
import { Supervisor } from '@/types/supervisor';
import VerificationBadge from './VerificationBadge';
import AvailabilityBadge from './AvailabilityBadge';
import FreshnessBadge from './FreshnessBadge';
import ShortlistButton from './ShortlistButton';

interface SupervisorCardProps {
  supervisor: Supervisor;
  activeSearchQuery?: string;
}

export default function SupervisorCard({ supervisor, activeSearchQuery = '' }: SupervisorCardProps) {
  // Count verified scope items
  const verifiedScopeCount = supervisor.verificationScope.filter((s) => s.isVerified).length;
  const totalScopeCount = supervisor.verificationScope.length;

  // Highlight helper for search keyword matches
  const isFieldMatched = (field: string) => {
    if (!activeSearchQuery.trim()) return false;
    return field.toLowerCase().includes(activeSearchQuery.toLowerCase());
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Top Banner / Verification Metadata Bar */}
      <div className="bg-slate-50/80 dark:bg-slate-800/40 px-5 py-3 border-b border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <VerificationBadge status={supervisor.verificationStatus} size="sm" />
          <FreshnessBadge freshness={supervisor.freshness} />
        </div>
        <AvailabilityBadge status={supervisor.availabilityStatus} quota={supervisor.quota} compact />
      </div>

      {/* Main Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Supervisor Header */}
        <div className="flex items-start justify-between gap-2.5 mb-3">
          <div className="flex items-start space-x-3.5 min-w-0 flex-1">
            <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-base shrink-0 shadow-inner">
              {supervisor.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-snug truncate hover:text-blue-600 transition-colors">
                <Link href={`/supervisors/${supervisor.id}`}>
                  {supervisor.name}
                </Link>
              </h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                {supervisor.academicTitle}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                {supervisor.roomLocation}
              </p>
            </div>
          </div>
          <ShortlistButton
            supervisorId={supervisor.id}
            supervisorName={supervisor.name}
            variant="icon"
          />
        </div>

        {/* Short Bio */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {supervisor.bio}
        </p>

        {/* Research Fit & Fields */}
        <div className="mb-4">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-1.5 flex items-center justify-between">
            <span>Bidang Minat Penelitian</span>
            <span className="text-[10px] lowercase font-normal text-slate-400">
              {supervisor.researchFields.length} bidang
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {supervisor.researchFields.map((field, idx) => {
              const matched = isFieldMatched(field);
              return (
                <span
                  key={idx}
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs transition-colors ${
                    matched
                      ? 'bg-blue-100 text-blue-900 font-semibold border border-blue-300 dark:bg-blue-900/60 dark:text-blue-200 dark:border-blue-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {field}
                </span>
              );
            })}
          </div>
        </div>

        {/* Verification Scope & Source Snapshot */}
        <div className="mb-4 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 mb-1 font-medium text-[11px]">
            <span className="flex items-center space-x-1">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Cakupan Verifikasi</span>
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {verifiedScopeCount}/{totalScopeCount} Dimensi Terverifikasi
            </span>
          </div>

          {/* Mini source citation */}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center space-x-1 mt-1">
            <span className="font-medium text-slate-600 dark:text-slate-300">Sumber:</span>
            <span className="truncate" title={supervisor.informationSources[0]?.title}>
              {supervisor.informationSources[0]?.title || 'Catatan institusi'}
            </span>
          </div>
        </div>

        {/* Recommended Next Action Preview */}
        <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-lg bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 mb-3">
            <div className="flex items-center space-x-1.5 text-blue-900 dark:text-blue-300 font-medium text-xs mb-1">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="truncate">Rekomendasi Tindak Lanjut</span>
            </div>
            <p className="text-xs text-blue-950/80 dark:text-blue-200/90 font-medium line-clamp-1">
              {supervisor.recommendedAction.headline}
            </p>
          </div>

          {/* Action Button */}
          <Link
            href={`/supervisors/${supervisor.id}`}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>Lihat Profil Verifikasi</span>
            <svg
              className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
