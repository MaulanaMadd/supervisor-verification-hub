'use client';

import { useShortlist } from '@/context/ShortlistContext';

interface ShortlistButtonProps {
  supervisorId: string;
  supervisorName: string;
  variant?: 'icon' | 'button';
  className?: string;
}

export default function ShortlistButton({
  supervisorId,
  supervisorName,
  variant = 'icon',
  className = '',
}: ShortlistButtonProps) {
  const { isHydrated, isShortlisted, toggleShortlist } = useShortlist();
  const saved = isHydrated && isShortlisted(supervisorId);

  const label = saved
    ? `Remove ${supervisorName} from shortlist`
    : `Save ${supervisorName} to shortlist`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleShortlist(supervisorId, supervisorName);
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={label}
        title={label}
        data-shortlisted={saved ? 'true' : 'false'}
        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border shrink-0 cursor-pointer ${
          saved
            ? 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-900/60 shadow-sm'
            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700'
        } ${className}`}
      >
        <svg
          className={`w-4 h-4 transition-transform ${saved ? 'text-blue-600 dark:text-blue-400 scale-105' : 'text-slate-400'}`}
          fill={saved ? 'currentColor' : 'none'}
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
        <span>{saved ? 'Shortlisted' : 'Save to Shortlist'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      data-shortlisted={saved ? 'true' : 'false'}
      className={`p-2 rounded-lg border transition-all shrink-0 cursor-pointer ${
        saved
          ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/60'
          : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:text-blue-400'
      } ${className}`}
    >
      <svg
        className="w-4 h-4"
        fill={saved ? 'currentColor' : 'none'}
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
    </button>
  );
}
