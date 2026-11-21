'use client';

import { useState } from 'react';

interface InteractivePrerequisitesProps {
  prerequisites: string[];
  supervisorName: string;
  isSabbatical?: boolean;
}

export default function InteractivePrerequisites({
  prerequisites,
  supervisorName,
  isSabbatical = false,
}: InteractivePrerequisitesProps) {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) => {
    if (isSabbatical) return;
    setCheckedState((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const totalCount = prerequisites.length;
  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;

  return (
    <div className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10 space-y-3">
      {/* Header & Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-semibold text-blue-200 text-xs sm:text-sm flex items-center space-x-1.5">
          <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span>Required Coursework & Prerequisites</span>
        </div>

        {!isSabbatical && totalCount > 0 && (
          <span
            className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded transition-colors ${
              isAllCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                : 'bg-white/10 text-blue-200 border border-white/15'
            }`}
          >
            {completedCount}/{totalCount} Completed
          </span>
        )}
      </div>

      <p className="text-[11px] text-blue-200/80 leading-relaxed">
        {isSabbatical
          ? 'Persyaratan pendaftaran tidak aktif untuk dosen dalam status cuti akademik.'
          : `Centang setiap syarat yang telah Anda penuhi untuk mengevaluasi kesiapan Anda sebelum menghubungi ${supervisorName}.`}
      </p>

      {/* Interactive Checkbox List */}
      <div className="space-y-2 pt-1">
        {prerequisites.map((req, idx) => {
          const isChecked = !!checkedState[idx];
          return (
            <label
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`flex items-start space-x-3 p-2.5 rounded-lg border text-xs cursor-pointer select-none transition-all ${
                isSabbatical
                  ? 'opacity-60 cursor-not-allowed bg-slate-900/40 border-white/5'
                  : isChecked
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100 shadow-sm'
                  : 'bg-slate-900/40 border-white/10 text-slate-200 hover:bg-slate-900/60 hover:border-white/20'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}} // Handled by label click
                disabled={isSabbatical}
                className="w-4 h-4 mt-0.5 rounded border-slate-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 shrink-0 cursor-pointer"
              />
              <span className={`leading-relaxed ${isChecked ? 'line-through opacity-85 text-emerald-200' : ''}`}>
                {req}
              </span>
            </label>
          );
        })}
      </div>

      {/* Completion Banner */}
      {!isSabbatical && isAllCompleted && (
        <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center space-x-2">
          <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">
            Semua prasyarat mandiri telah Anda konfirmasi terpenuhi. Anda siap melanjutkan ke tahap penyusunan draf email / proposal.
          </span>
        </div>
      )}

      {/* Disclaimer */}
      <div className="text-[10px] text-blue-300/60 pt-1 flex items-start space-x-1.5 border-t border-white/5">
        <svg className="w-3.5 h-3.5 text-blue-400/70 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          <strong>Catatan Penilaian Mandiri:</strong> Fitur centang ini bersifat evaluasi personal mahasiswa. SVH tidak memvalidasi transkrip resmi secara otomatis. Kelayakan definitif ditentukan oleh Biro Akademik dan Dosen Pembimbing.
        </span>
      </div>
    </div>
  );
}
