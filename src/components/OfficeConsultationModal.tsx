'use client';

import { useState } from 'react';
import { Supervisor } from '@/types/supervisor';

interface OfficeConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  supervisor: Supervisor;
}

const DEFAULT_PREPARATION_ITEMS = [
  'Menyusun 1 lembar ringkasan latar belakang masalah dan rumusan pertanyaan penelitian (Research Questions).',
  'Mengidentifikasi ketersediaan calon dataset, studi kasus organisasi/perusahaan, atau domain bisnis target.',
  'Membawa transkrip nilai akademik sementara untuk memverifikasi pemenuhan mata kuliah prasyarat skripsi.',
  'Menyiapkan minimal 3 pertanyaan spesifik terkait batasan ruang lingkup riset untuk didiskusikan.',
];

export default function OfficeConsultationModal({
  isOpen,
  onClose,
  supervisor,
}: OfficeConsultationModalProps) {
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [copiedSchedule, setCopiedSchedule] = useState(false);

  if (!isOpen) return null;

  const toggleItem = (idx: number) => {
    setChecklist((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const totalItems = DEFAULT_PREPARATION_ITEMS.length;
  const completedItems = Object.values(checklist).filter(Boolean).length;
  const isAllReady = totalItems > 0 && completedItems === totalItems;

  const scheduleInfo = `Dosen: ${supervisor.name}\nRuangan: ${supervisor.roomLocation}\nJam Konsultasi: ${supervisor.officeHours}\nKontak: ${supervisor.email}`;

  const handleCopySchedule = async () => {
    try {
      await navigator.clipboard.writeText(scheduleInfo);
      setCopiedSchedule(true);
      setTimeout(() => setCopiedSchedule(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Optional notification email to confirm visit beforehand
  const notificationSubject = `[SVH-Konsultasi Skripsi] Konfirmasi Kehadiran Konsultasi Jam Kantor - ${supervisor.name}`;
  const notificationBody = `Yth. Bapak/Ibu ${supervisor.name},\n\nPerkenalkan saya mahasiswa Program Studi Sistem Informasi. Melalui email ini, saya bermaksud mengonfirmasi rencana kedatangan saya untuk berkonsultasi mengenai rencana penelitian tugas akhir pada jadwal jam kantor Bapak/Ibu (${supervisor.officeHours}) di ruangan ${supervisor.roomLocation}.\n\nSaya telah menyiapkan lembar ringkasan masalah dan transkrip akademik prasyarat.\n\nTerima kasih atas waktu dan kesempatan yang diberikan.\n\nHormat saya,\n[Nama Mahasiswa]\nNIM: [NIM]`;
  const notificationMailto = `mailto:${supervisor.email}?subject=${encodeURIComponent(notificationSubject)}&body=${encodeURIComponent(notificationBody)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Perencana Konsultasi Tatap Muka"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold">Perencana Konsultasi Tatap Muka</h2>
              <p className="text-xs text-blue-100">
                Panduan Konsultasi Tatap Muka: {supervisor.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Tutup dialog"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Important advisory notice */}
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-2.5">
            <svg className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="leading-relaxed">
              <strong>Catatan Penting:</strong> SVH bukan sistem reservasi otomatis. Konsultasi tatap muka dilakukan langsung di ruangan dosen pada jam kantor yang tersedia, atau Anda dapat mengirimkan email notifikasi awal sebelum berkunjung.
            </div>
          </div>

          {/* Schedule & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="text-slate-500 dark:text-slate-400 font-medium mb-1 flex items-center space-x-1.5">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Lokasi Ruang Kerja</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {supervisor.roomLocation}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Gedung Fakultas Ilmu Komputer / Sistem Informasi
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="text-slate-500 dark:text-slate-400 font-medium mb-1 flex items-center space-x-1.5">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Jadwal Jam Kantor Resmi</span>
              </div>
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
                {supervisor.officeHours}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Waktu prioritas bimbingan tatap muka
              </p>
            </div>
          </div>

          {/* Preparation Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>Checklist Persiapan Sebelum Menemui Dosen</span>
              </h3>
              <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                isAllReady
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}>
                {completedItems}/{totalItems} Siap
              </span>
            </div>

            <div className="space-y-2">
              {DEFAULT_PREPARATION_ITEMS.map((item, idx) => {
                const checked = !!checklist[idx];
                return (
                  <label
                    key={idx}
                    onClick={() => toggleItem(idx)}
                    className={`flex items-start space-x-3 p-3 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                      checked
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60 text-slate-900 dark:text-emerald-100'
                        : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="w-4 h-4 mt-0.5 rounded border-slate-400 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                    />
                    <span className={`leading-relaxed ${checked ? 'line-through opacity-85 text-emerald-800 dark:text-emerald-300' : ''}`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>

            {isAllReady && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center space-x-2">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">
                  Luar biasa! Dokumen dan bahan persiapan Anda telah lengkap untuk konsultasi tatap muka langsung.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopySchedule}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{copiedSchedule ? '✓ Jadwal Tersalin' : 'Salin Jadwal & Lokasi'}</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Tutup
            </button>

            <a
              href={notificationMailto}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center space-x-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Kirim Email Konfirmasi Kehadiran</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
