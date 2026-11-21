'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { MOCK_SUPERVISORS } from '@/data/mockSupervisors';

export const SHORTLIST_STORAGE_KEY = 'svh-shortlist';
export const DECISION_STATUS_STORAGE_KEY = 'svh-decision-statuses';
export const DECISION_NOTES_STORAGE_KEY = 'svh-decision-notes';

export const MIN_COMPARE_COUNT = 2;
export const MAX_COMPARE_COUNT = 3;

export type DecisionStatus =
  | 'considering'
  | 'priority'
  | 'contacted'
  | 'meeting-scheduled'
  | 'not-pursuing';

export const DECISION_STATUS_OPTIONS: { value: DecisionStatus; label: string }[] = [
  { value: 'considering', label: 'Considering' },
  { value: 'priority', label: 'Priority Candidate' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'meeting-scheduled', label: 'Meeting Scheduled' },
  { value: 'not-pursuing', label: 'Not Pursuing' },
];

const VALID_DECISION_STATUSES = new Set<DecisionStatus>(
  DECISION_STATUS_OPTIONS.map((opt) => opt.value)
);
const VALID_SUPERVISOR_IDS = new Set(MOCK_SUPERVISORS.map((s) => s.id));

const EMPTY_IDS: string[] = [];
const EMPTY_STATUSES: Record<string, DecisionStatus> = {};
const EMPTY_NOTES: Record<string, string> = {};

// --- External store: Shortlist IDs ---
const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined = undefined;
let cachedIds: string[] = EMPTY_IDS;

let cachedStatusRaw: string | null | undefined = undefined;
let cachedStatuses: Record<string, DecisionStatus> = EMPTY_STATUSES;

let cachedNotesRaw: string | null | undefined = undefined;
let cachedNotes: Record<string, string> = EMPTY_NOTES;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function parseShortlistRaw(raw: string | null): string[] {
  if (!raw) return EMPTY_IDS;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_IDS;
    const seen = new Set<string>();
    const valid: string[] = [];
    for (const item of parsed) {
      if (typeof item === 'string' && VALID_SUPERVISOR_IDS.has(item) && !seen.has(item)) {
        seen.add(item);
        valid.push(item);
      }
    }
    return valid.length > 0 ? valid : EMPTY_IDS;
  } catch {
    return EMPTY_IDS;
  }
}

function parseStatusesRaw(raw: string | null): Record<string, DecisionStatus> {
  if (!raw) return EMPTY_STATUSES;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return EMPTY_STATUSES;
    const result: Record<string, DecisionStatus> = {};
    let hasAny = false;
    for (const [id, status] of Object.entries(parsed as Record<string, unknown>)) {
      if (
        VALID_SUPERVISOR_IDS.has(id) &&
        typeof status === 'string' &&
        VALID_DECISION_STATUSES.has(status as DecisionStatus)
      ) {
        result[id] = status as DecisionStatus;
        hasAny = true;
      }
    }
    return hasAny ? result : EMPTY_STATUSES;
  } catch {
    return EMPTY_STATUSES;
  }
}

function parseNotesRaw(raw: string | null): Record<string, string> {
  if (!raw) return EMPTY_NOTES;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return EMPTY_NOTES;
    const result: Record<string, string> = {};
    let hasAny = false;
    for (const [id, note] of Object.entries(parsed as Record<string, unknown>)) {
      if (VALID_SUPERVISOR_IDS.has(id) && typeof note === 'string' && note.trim().length > 0) {
        result[id] = note;
        hasAny = true;
      }
    }
    return hasAny ? result : EMPTY_NOTES;
  } catch {
    return EMPTY_NOTES;
  }
}

function getClientSnapshot(): string[] {
  if (typeof window === 'undefined') return EMPTY_IDS;
  try {
    const raw = window.localStorage.getItem(SHORTLIST_STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedIds = parseShortlistRaw(raw);
    }
    return cachedIds;
  } catch {
    return cachedIds;
  }
}

function getClientStatusesSnapshot(): Record<string, DecisionStatus> {
  if (typeof window === 'undefined') return EMPTY_STATUSES;
  try {
    const raw = window.localStorage.getItem(DECISION_STATUS_STORAGE_KEY);
    if (raw !== cachedStatusRaw) {
      cachedStatusRaw = raw;
      cachedStatuses = parseStatusesRaw(raw);
    }
    return cachedStatuses;
  } catch {
    return cachedStatuses;
  }
}

function getClientNotesSnapshot(): Record<string, string> {
  if (typeof window === 'undefined') return EMPTY_NOTES;
  try {
    const raw = window.localStorage.getItem(DECISION_NOTES_STORAGE_KEY);
    if (raw !== cachedNotesRaw) {
      cachedNotesRaw = raw;
      cachedNotes = parseNotesRaw(raw);
    }
    return cachedNotes;
  } catch {
    return cachedNotes;
  }
}

function getServerSnapshot(): string[] {
  return EMPTY_IDS;
}

function getServerStatusesSnapshot(): Record<string, DecisionStatus> {
  return EMPTY_STATUSES;
}

function getServerNotesSnapshot(): Record<string, string> {
  return EMPTY_NOTES;
}

function subscribeStore(callback: () => void): () => void {
  listeners.add(callback);

  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === null ||
      event.key === SHORTLIST_STORAGE_KEY ||
      event.key === DECISION_STATUS_STORAGE_KEY ||
      event.key === DECISION_NOTES_STORAGE_KEY
    ) {
      cachedRaw = undefined;
      cachedStatusRaw = undefined;
      cachedNotesRaw = undefined;
      callback();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }

  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
  };
}

function writeShortlistIds(nextIds: string[]) {
  const uniqueValid = Array.from(new Set(nextIds)).filter((id) => VALID_SUPERVISOR_IDS.has(id));
  const serialized = JSON.stringify(uniqueValid);
  cachedRaw = serialized;
  cachedIds = uniqueValid.length > 0 ? uniqueValid : EMPTY_IDS;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(SHORTLIST_STORAGE_KEY, serialized);
    } catch {
      // Gracefully ignore storage errors; in-memory state still updates
    }
  }
  emitChange();
}

function writeDecisionStatuses(nextMap: Record<string, DecisionStatus>) {
  const serialized = JSON.stringify(nextMap);
  cachedStatusRaw = serialized;
  cachedStatuses = Object.keys(nextMap).length > 0 ? nextMap : EMPTY_STATUSES;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(DECISION_STATUS_STORAGE_KEY, serialized);
    } catch {
      // Gracefully ignore storage errors
    }
  }
  emitChange();
}

function writeDecisionNotes(nextMap: Record<string, string>) {
  const serialized = JSON.stringify(nextMap);
  cachedNotesRaw = serialized;
  cachedNotes = Object.keys(nextMap).length > 0 ? nextMap : EMPTY_NOTES;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(DECISION_NOTES_STORAGE_KEY, serialized);
    } catch {
      // Gracefully ignore storage errors
    }
  }
  emitChange();
}

function cleanupCandidateMetadata(removedIds: string[]) {
  if (removedIds.length === 0) return;
  const removeSet = new Set(removedIds);

  const currentStatuses = getClientStatusesSnapshot();
  let statusChanged = false;
  const nextStatuses: Record<string, DecisionStatus> = {};
  for (const [id, status] of Object.entries(currentStatuses)) {
    if (removeSet.has(id)) {
      statusChanged = true;
    } else {
      nextStatuses[id] = status;
    }
  }
  if (statusChanged) {
    writeDecisionStatuses(nextStatuses);
  }

  const currentNotes = getClientNotesSnapshot();
  let notesChanged = false;
  const nextNotes: Record<string, string> = {};
  for (const [id, note] of Object.entries(currentNotes)) {
    if (removeSet.has(id)) {
      notesChanged = true;
    } else {
      nextNotes[id] = note;
    }
  }
  if (notesChanged) {
    writeDecisionNotes(nextNotes);
  }
}

const subscribeHydrated = () => () => {};
const getClientHydrated = () => true;
const getServerHydrated = () => false;

interface FeedbackToast {
  message: string;
  type: 'added' | 'removed';
}

interface ShortlistContextValue {
  shortlistedIds: string[];
  count: number;
  isHydrated: boolean;
  isShortlisted: (supervisorId: string) => boolean;
  addToShortlist: (supervisorId: string, supervisorName?: string) => void;
  removeFromShortlist: (supervisorId: string, supervisorName?: string) => void;
  toggleShortlist: (supervisorId: string, supervisorName?: string) => void;
  clearShortlist: () => void;
  selectedCompareIds: string[];
  isSelectedForCompare: (supervisorId: string) => boolean;
  toggleCompareSelection: (
    supervisorId: string
  ) => 'selected' | 'deselected' | 'limit-reached' | 'not-shortlisted';
  removeFromCompareSelection: (supervisorId: string) => void;
  clearCompareSelection: () => void;
  decisionStatuses: Record<string, DecisionStatus>;
  getDecisionStatus: (supervisorId: string) => DecisionStatus;
  setDecisionStatus: (
    supervisorId: string,
    status: DecisionStatus,
    supervisorName?: string
  ) => void;
  decisionNotes: Record<string, string>;
  getDecisionNote: (supervisorId: string) => string;
  setDecisionNote: (supervisorId: string, note: string, notify?: boolean) => void;
}

const ShortlistContext = createContext<ShortlistContextValue | null>(null);

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const shortlistedIds = useSyncExternalStore(
    subscribeStore,
    getClientSnapshot,
    getServerSnapshot
  );
  const decisionStatuses = useSyncExternalStore(
    subscribeStore,
    getClientStatusesSnapshot,
    getServerStatusesSnapshot
  );
  const decisionNotes = useSyncExternalStore(
    subscribeStore,
    getClientNotesSnapshot,
    getServerNotesSnapshot
  );
  const isHydrated = useSyncExternalStore(
    subscribeHydrated,
    getClientHydrated,
    getServerHydrated
  );

  const [feedback, setFeedback] = useState<FeedbackToast | null>(null);
  const [rawCompareIds, setRawCompareIds] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derive valid comparison selections strictly from currently shortlisted IDs
  const selectedCompareIds = rawCompareIds.filter((id) => shortlistedIds.includes(id));

  const showFeedback = useCallback((message: string, type: 'added' | 'removed') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setFeedback({ message, type });
    timerRef.current = setTimeout(() => {
      setFeedback(null);
      timerRef.current = null;
    }, 2600);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const isSelectedForCompare = useCallback(
    (supervisorId: string) => selectedCompareIds.includes(supervisorId),
    [selectedCompareIds]
  );

  const toggleCompareSelection = useCallback(
    (supervisorId: string): 'selected' | 'deselected' | 'limit-reached' | 'not-shortlisted' => {
      if (!shortlistedIds.includes(supervisorId)) {
        return 'not-shortlisted';
      }
      if (selectedCompareIds.includes(supervisorId)) {
        setRawCompareIds((prev) => prev.filter((id) => id !== supervisorId));
        return 'deselected';
      }
      if (selectedCompareIds.length >= MAX_COMPARE_COUNT) {
        return 'limit-reached';
      }
      setRawCompareIds((prev) => [
        ...prev.filter((id) => shortlistedIds.includes(id) && id !== supervisorId),
        supervisorId,
      ]);
      return 'selected';
    },
    [shortlistedIds, selectedCompareIds]
  );

  const removeFromCompareSelection = useCallback((supervisorId: string) => {
    setRawCompareIds((prev) => prev.filter((id) => id !== supervisorId));
  }, []);

  const clearCompareSelection = useCallback(() => {
    setRawCompareIds([]);
  }, []);

  const isShortlisted = useCallback(
    (supervisorId: string) => shortlistedIds.includes(supervisorId),
    [shortlistedIds]
  );

  const addToShortlist = useCallback(
    (supervisorId: string, supervisorName?: string) => {
      const current = getClientSnapshot();
      if (current.includes(supervisorId)) return;
      writeShortlistIds([...current, supervisorId]);
      showFeedback(
        supervisorName ? `Saved ${supervisorName} to shortlist` : 'Saved to shortlist',
        'added'
      );
    },
    [showFeedback]
  );

  const removeFromShortlist = useCallback(
    (supervisorId: string, supervisorName?: string) => {
      const current = getClientSnapshot();
      if (!current.includes(supervisorId)) return;
      writeShortlistIds(current.filter((id) => id !== supervisorId));
      cleanupCandidateMetadata([supervisorId]);
      showFeedback(
        supervisorName ? `Removed ${supervisorName} from shortlist` : 'Removed from shortlist',
        'removed'
      );
    },
    [showFeedback]
  );

  const toggleShortlist = useCallback(
    (supervisorId: string, supervisorName?: string) => {
      const current = getClientSnapshot();
      if (current.includes(supervisorId)) {
        removeFromShortlist(supervisorId, supervisorName);
      } else {
        addToShortlist(supervisorId, supervisorName);
      }
    },
    [addToShortlist, removeFromShortlist]
  );

  const clearShortlist = useCallback(() => {
    const current = getClientSnapshot();
    writeShortlistIds([]);
    cleanupCandidateMetadata(current);
    showFeedback('Cleared all shortlisted supervisors', 'removed');
  }, [showFeedback]);

  const getDecisionStatus = useCallback(
    (supervisorId: string): DecisionStatus => decisionStatuses[supervisorId] ?? 'considering',
    [decisionStatuses]
  );

  const setDecisionStatus = useCallback(
    (supervisorId: string, status: DecisionStatus, supervisorName?: string) => {
      if (!VALID_SUPERVISOR_IDS.has(supervisorId) || !VALID_DECISION_STATUSES.has(status)) return;
      const current = getClientStatusesSnapshot();
      const next: Record<string, DecisionStatus> = { ...current, [supervisorId]: status };
      writeDecisionStatuses(next);
      const label = DECISION_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
      showFeedback(
        supervisorName ? `Updated ${supervisorName} status to ${label}` : `Status set to ${label}`,
        'added'
      );
    },
    [showFeedback]
  );

  const getDecisionNote = useCallback(
    (supervisorId: string): string => decisionNotes[supervisorId] ?? '',
    [decisionNotes]
  );

  const setDecisionNote = useCallback(
    (supervisorId: string, note: string, notify = false) => {
      if (!VALID_SUPERVISOR_IDS.has(supervisorId)) return;
      const current = getClientNotesSnapshot();
      const next: Record<string, string> = { ...current };
      const trimmed = note.trim();
      if (trimmed.length === 0) {
        delete next[supervisorId];
      } else {
        next[supervisorId] = note;
      }
      writeDecisionNotes(next);
      if (notify) {
        showFeedback(trimmed.length > 0 ? 'Decision note saved' : 'Decision note cleared', 'added');
      }
    },
    [showFeedback]
  );

  return (
    <ShortlistContext.Provider
      value={{
        shortlistedIds,
        count: shortlistedIds.length,
        isHydrated,
        isShortlisted,
        addToShortlist,
        removeFromShortlist,
        toggleShortlist,
        clearShortlist,
        selectedCompareIds,
        isSelectedForCompare,
        toggleCompareSelection,
        removeFromCompareSelection,
        clearCompareSelection,
        decisionStatuses,
        getDecisionStatus,
        setDecisionStatus,
        decisionNotes,
        getDecisionNote,
        setDecisionNote,
      }}
    >
      {children}

      {/* Subtle accessible toast feedback */}
      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm animate-fade-in"
        >
          <div
            className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl shadow-lg border text-xs font-medium backdrop-blur-sm ${
              feedback.type === 'added'
                ? 'bg-slate-900/95 text-white border-blue-500/40 dark:bg-blue-950/95 dark:border-blue-700'
                : 'bg-slate-800/95 text-slate-100 border-slate-700 dark:bg-slate-900/95'
            }`}
          >
            <svg
              className={`w-4 h-4 shrink-0 ${
                feedback.type === 'added' ? 'text-blue-400' : 'text-slate-400'
              }`}
              fill={feedback.type === 'added' ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span className="truncate">{feedback.message}</span>
          </div>
        </div>
      )}
    </ShortlistContext.Provider>
  );
}

export function useShortlist(): ShortlistContextValue {
  const ctx = useContext(ShortlistContext);
  if (!ctx) {
    throw new Error('useShortlist must be used within a ShortlistProvider');
  }
  return ctx;
}
