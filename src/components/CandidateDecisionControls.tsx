'use client';

import { useState } from 'react';
import {
  DECISION_STATUS_OPTIONS,
  DecisionStatus,
  useShortlist,
} from '@/context/ShortlistContext';

interface CandidateDecisionControlsProps {
  supervisorId: string;
  supervisorName: string;
  compact?: boolean;
}

const STATUS_BADGE_STYLES: Record<DecisionStatus, string> = {
  considering:
    'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  priority:
    'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700',
  contacted:
    'bg-indigo-50 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-700',
  'meeting-scheduled':
    'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700',
  'not-pursuing':
    'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
};

export default function CandidateDecisionControls({
  supervisorId,
  supervisorName,
  compact = false,
}: CandidateDecisionControlsProps) {
  const {
    isHydrated,
    getDecisionStatus,
    setDecisionStatus,
    getDecisionNote,
    setDecisionNote,
  } = useShortlist();

  const currentStatus: DecisionStatus = isHydrated
    ? getDecisionStatus(supervisorId)
    : 'considering';
  const savedNote = isHydrated ? getDecisionNote(supervisorId) : '';

  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [draftNote, setDraftNote] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  // Active editor value uses draftNote while editing, otherwise synced savedNote
  const editorValue = draftNote !== null ? draftNote : savedNote;
  const hasUnsavedChanges = draftNote !== null && draftNote.trim() !== savedNote.trim();

  const handleOpenNotes = () => {
    if (!isNoteOpen) {
      setDraftNote(savedNote);
      setIsNoteOpen(true);
      setJustSaved(false);
    } else {
      // Save any pending edits before collapsing to prevent accidental loss
      if (draftNote !== null && draftNote.trim() !== savedNote.trim()) {
        setDecisionNote(supervisorId, draftNote, false);
      }
      setDraftNote(null);
      setIsNoteOpen(false);
    }
  };

  const handleSaveNote = () => {
    setDecisionNote(supervisorId, editorValue, true);
    setDraftNote(null);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  };

  const handleBlurNote = () => {
    if (draftNote !== null && draftNote.trim() !== savedNote.trim()) {
      setDecisionNote(supervisorId, draftNote, false);
      setDraftNote(null);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1800);
    }
  };

  const handleClearNote = () => {
    setDecisionNote(supervisorId, '', true);
    setDraftNote('');
    setJustSaved(false);
  };

  return (
    <div
      data-decision-controls={supervisorId}
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 ${
        compact ? 'p-3 space-y-2.5' : 'p-3.5 space-y-2.5'
      }`}
    >
      {/* Status Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label
          htmlFor={`status-${supervisorId}-${compact ? 'cmp' : 'sl'}`}
          className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
        >
          Decision Status
        </label>
        <select
          id={`status-${supervisorId}-${compact ? 'cmp' : 'sl'}`}
          data-decision-status={supervisorId}
          aria-label={`Decision status for ${supervisorName}`}
          value={currentStatus}
          onChange={(e) =>
            setDecisionStatus(supervisorId, e.target.value as DecisionStatus, supervisorName)
          }
          className={`text-xs font-semibold px-2.5 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors ${STATUS_BADGE_STYLES[currentStatus]}`}
        >
          {DECISION_STATUS_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Notes Toggle & Preview */}
      <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            data-note-toggle={supervisorId}
            aria-expanded={isNoteOpen}
            onClick={handleOpenNotes}
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>
              {isNoteOpen
                ? 'Hide Note'
                : savedNote
                  ? 'Edit Decision Note'
                  : 'Add Decision Note'}
            </span>
          </button>

          {justSaved && (
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              Saved
            </span>
          )}
        </div>

        {/* Compact Preview when collapsed */}
        {!isNoteOpen && (
          <p
            data-note-preview={supervisorId}
            className={`mt-1.5 text-xs leading-relaxed ${
              savedNote
                ? 'text-slate-700 dark:text-slate-300 line-clamp-2'
                : 'text-slate-400 dark:text-slate-500 italic'
            }`}
          >
            {savedNote || 'No personal notes yet.'}
          </p>
        )}

        {/* Expandable Note Editor */}
        {isNoteOpen && (
          <div className="mt-2 space-y-2">
            <textarea
              data-note-input={supervisorId}
              aria-label={`Decision notes for ${supervisorName}`}
              rows={3}
              value={editorValue}
              onChange={(e) => setDraftNote(e.target.value)}
              onBlur={handleBlurNote}
              placeholder="Write your reasoning (e.g., strong methodology fit, confirm slot availability, discuss co-supervisor)..."
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400">
                {hasUnsavedChanges ? 'Auto-saves on blur or click Save' : 'Stored in browser'}
              </span>
              <div className="flex items-center space-x-1.5">
                {editorValue.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearNote}
                    className="px-2 py-1 rounded text-[11px] font-medium text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  data-note-save={supervisorId}
                  onClick={handleSaveNote}
                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
