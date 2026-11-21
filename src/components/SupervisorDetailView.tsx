'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Supervisor } from '@/types/supervisor';
import VerificationBadge from './VerificationBadge';
import AvailabilityBadge from './AvailabilityBadge';
import FreshnessBadge from './FreshnessBadge';
import InteractivePrerequisites from './InteractivePrerequisites';
import InquiryEmailModal from './InquiryEmailModal';
import OfficeConsultationModal from './OfficeConsultationModal';
import CoSupervisorModal from './CoSupervisorModal';
import ShortlistButton from './ShortlistButton';

interface SupervisorDetailViewProps {
  supervisor: Supervisor;
}

export default function SupervisorDetailView({ supervisor }: SupervisorDetailViewProps) {
  const verifiedScopeCount = supervisor.verificationScope.filter((s) => s.isVerified).length;
  const totalScopeCount = supervisor.verificationScope.length;

  // Modal states
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalMode, setEmailModalMode] = useState<'draft-proposal' | 'email-inquiry'>('draft-proposal');
  const [isOfficeModalOpen, setIsOfficeModalOpen] = useState(false);
  const [isCoSupervisorModalOpen, setIsCoSupervisorModalOpen] = useState(false);

  const actionType = supervisor.recommendedAction.actionType;
  const isSabbatical = supervisor.availabilityStatus === 'on-sabbatical' || actionType === 'waitlist';
  const primaryField = supervisor.researchFields[0] || 'Sistem Informasi';

  const handleOpenEmailModal = (mode: 'draft-proposal' | 'email-inquiry') => {
    setEmailModalMode(mode);
    setIsEmailModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium group transition-colors"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Supervisor Directory</span>
        </Link>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Profile ID:</span>
          <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-600 dark:text-slate-300">
            {supervisor.id}
          </code>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Verification Status Header Ribbon */}
        <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <VerificationBadge status={supervisor.verificationStatus} size="lg" />
            <FreshnessBadge freshness={supervisor.freshness} />
          </div>
          <AvailabilityBadge status={supervisor.availabilityStatus} quota={supervisor.quota} />
        </div>

        {/* Profile Info */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              {supervisor.avatarInitials}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                    {supervisor.name}
                  </h1>
                  <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 mt-1">
                    {supervisor.academicTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {supervisor.role} • {supervisor.department}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {supervisor.faculty}
                  </p>
                </div>
                <ShortlistButton
                  supervisorId={supervisor.id}
                  supervisorName={supervisor.name}
                  variant="button"
                />
              </div>
            </div>
          </div>

          {/* Quick Contact & Office Hours Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 font-medium mb-1 flex items-center space-x-1">
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Office Location</span>
              </div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {supervisor.roomLocation}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 font-medium mb-1 flex items-center space-x-1">
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Office Hours Consultation</span>
              </div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {supervisor.officeHours}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 font-medium mb-1 flex items-center space-x-1">
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Official Institutional Email</span>
              </div>
              <div className="font-mono text-blue-600 dark:text-blue-400 font-medium truncate">
                <a href={`mailto:${supervisor.email}`} className="hover:underline">
                  {supervisor.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HIGHLIGHT: Adaptive Action Execution Hub Card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold uppercase tracking-wider border border-blue-700">
              <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Recommended Next Action for Students</span>
            </div>

            <span className="text-xs bg-white/10 px-2.5 py-1 rounded text-blue-100 font-mono">
              Action: {supervisor.recommendedAction.actionTypeLabel}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {supervisor.recommendedAction.headline}
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            {supervisor.recommendedAction.summary}
          </p>
        </div>

        {/* Step by step action roadmap */}
        <div className="bg-slate-900/60 rounded-xl p-5 border border-blue-700/50 space-y-3">
          <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
            Action Steps Before Contacting Supervisor:
          </div>
          <ol className="space-y-2.5 text-xs sm:text-sm text-slate-100">
            {supervisor.recommendedAction.actionSteps.map((step, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Dynamic Action Execution CTA Area */}
        <div className="p-5 rounded-xl bg-white/10 border border-white/15 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Action Execution Hub
              </div>
              <p className="text-xs text-blue-100/90 mt-0.5">
                {isSabbatical
                  ? 'Dosen sedang cuti akademik. Silakan jelajahi alternatif pembimbing di bidang riset yang sama.'
                  : 'Gunakan panduan dan template terstruktur untuk memulai kontak resmi secara profesional.'}
              </p>
            </div>

            {/* ADAPTIVE BUTTONS BASED ON ACTION TYPE */}
            <div>
              {actionType === 'draft-proposal' && (
                <button
                  type="button"
                  onClick={() => handleOpenEmailModal('draft-proposal')}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/30 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Siapkan Draf Pre-Proposal & Email Inkuiri</span>
                </button>
              )}

              {actionType === 'email-inquiry' && (
                <button
                  type="button"
                  onClick={() => handleOpenEmailModal('email-inquiry')}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/30 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Buka Generator Email Bimbingan Skripsi</span>
                </button>
              )}

              {actionType === 'office-visit' && (
                <button
                  type="button"
                  onClick={() => setIsOfficeModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/30 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Buka Panduan & Checklist Konsultasi</span>
                </button>
              )}

              {actionType === 'co-supervisor-required' && (
                <button
                  type="button"
                  onClick={() => setIsCoSupervisorModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-lg shadow-amber-500/30 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Panduan Pemilihan Co-Supervisor</span>
                </button>
              )}

              {/* Sabbatical / Waitlist: Strictly NO email inquiry CTA */}
              {isSabbatical && (
                <Link
                  href={`/?field=${encodeURIComponent(primaryField)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-blue-50 text-xs font-bold shadow-md transition-colors"
                >
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Cari Dosen Alternatif di Bidang {primaryField}</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Prerequisite Self-Assessment Checklist */}
        <InteractivePrerequisites
          prerequisites={supervisor.recommendedAction.prerequisites}
          supervisorName={supervisor.name}
          isSabbatical={isSabbatical}
        />
      </div>

      {/* Two Column Grid: Verification Scope & Information Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Scope Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Verification Scope</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Audit dimensions checked by faculty verification officers
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-1 rounded">
                {verifiedScopeCount} of {totalScopeCount} Confirmed
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {supervisor.verificationScope.map((scope) => (
              <div
                key={scope.id}
                className={`p-3 rounded-xl border text-xs ${
                  scope.isVerified
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-800/60'
                    : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
                    {scope.isVerified ? (
                      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    <span>{scope.label}</span>
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      scope.isVerified
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {scope.isVerified ? 'Verified' : 'Unverified / Self-Reported'}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 pl-5 text-[11px] leading-relaxed">
                  {scope.notes}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Verification Policy:</span>{' '}
            {supervisor.verificationStatusDescription}
          </div>
        </div>

        {/* Information Sources & Freshness Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Information Sources & Freshness</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Traceable evidence records verifying this profile
              </p>
            </div>
            <FreshnessBadge freshness={supervisor.freshness} />
          </div>

          <div className="space-y-3">
            {supervisor.informationSources.map((source) => (
              <div
                key={source.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-xs"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    {source.title}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 shrink-0">
                    {source.sourceTypeName}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5 mt-1">
                  <div>
                    <span className="font-medium text-slate-600 dark:text-slate-300">Auditing Authority:</span> {source.authority}
                  </div>
                  {source.referenceCode && (
                    <div>
                      <span className="font-medium text-slate-600 dark:text-slate-300">Reference:</span>{' '}
                      <span className="font-mono text-slate-600 dark:text-slate-300">{source.referenceCode}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-slate-600 dark:text-slate-300">Retrieved:</span> {source.dateRetrieved}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Audit Timestamp Summary */}
          <div className="mt-4 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 text-xs border border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-300">Last Verified Audit Date:</span>
            <span className="font-semibold text-blue-700 dark:text-blue-300 font-mono">
              {supervisor.freshness.lastUpdatedDate} ({supervisor.freshness.freshnessLabel})
            </span>
          </div>
        </div>
      </div>

      {/* Research Fit, Focus Areas & Methodologies */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
            Research Fit & Thesis Focus Areas
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Evaluate your thesis topic match against verified themes and target methodologies
          </p>
        </div>

        {/* Primary Research Fields */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Primary Research Fields
          </div>
          <div className="flex flex-wrap gap-2">
            {supervisor.researchFields.map((field, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
              >
                {field}
              </span>
            ))}
          </div>
        </div>

        {/* Thesis Topic Examples */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Recommended Thesis Focus Areas & Past Examples
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {supervisor.thesisFocusAreas.map((topic, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
              >
                <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0 mt-0.5">✦</span>
                <span className="leading-relaxed">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Methodologies */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Expected Methodological Frameworks
          </div>
          <div className="flex flex-wrap gap-2">
            {supervisor.methodologies.map((meth, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {meth}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Advising Quota & Capacity Status */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Advising Quota & Capacity Breakdown
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Department quota allocation for {supervisor.quota.semester}
            </p>
          </div>
          <AvailabilityBadge status={supervisor.availabilityStatus} quota={supervisor.quota} />
        </div>

        {supervisor.quota.total > 0 ? (
          <div className="space-y-3">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden flex">
              <div
                className="bg-blue-600 h-full transition-all duration-500"
                style={{
                  width: `${(supervisor.quota.filled / supervisor.quota.total) * 100}%`,
                }}
                title={`${supervisor.quota.filled} slots filled`}
              />
              <div
                className="bg-emerald-500/80 h-full transition-all duration-500"
                style={{
                  width: `${(supervisor.quota.remaining / supervisor.quota.total) * 100}%`,
                }}
                title={`${supervisor.quota.remaining} slots open`}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                <span>Occupied Slots: {supervisor.quota.filled}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  Available Slots: {supervisor.quota.remaining}
                </span>
              </span>
              <span>Total Cap: {supervisor.quota.total} Students</span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300">
            Advising quota is currently inactive (0 slots) due to faculty leave or overseas fellowship.
          </div>
        )}
      </div>

      {/* Render Modals */}
      <InquiryEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        supervisor={supervisor}
        mode={emailModalMode}
      />

      <OfficeConsultationModal
        isOpen={isOfficeModalOpen}
        onClose={() => setIsOfficeModalOpen(false)}
        supervisor={supervisor}
      />

      <CoSupervisorModal
        isOpen={isCoSupervisorModalOpen}
        onClose={() => setIsCoSupervisorModalOpen(false)}
        supervisor={supervisor}
      />
    </div>
  );
}
