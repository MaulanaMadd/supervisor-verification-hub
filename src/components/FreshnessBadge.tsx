import { InformationFreshness } from '@/types/supervisor';

interface FreshnessBadgeProps {
  freshness: InformationFreshness;
}

export default function FreshnessBadge({ freshness }: FreshnessBadgeProps) {
  const configs = {
    fresh: {
      textClass: 'text-emerald-700 dark:text-emerald-400',
      bgClass: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800',
      iconColor: 'text-emerald-500',
      label: 'Fresh data',
    },
    moderate: {
      textClass: 'text-amber-700 dark:text-amber-400',
      bgClass: 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800',
      iconColor: 'text-amber-500',
      label: 'Moderate age',
    },
    stale: {
      textClass: 'text-rose-700 dark:text-rose-400',
      bgClass: 'bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800',
      iconColor: 'text-rose-500',
      label: 'Outdated / Stale',
    },
  };

  const config = configs[freshness.category];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${config.bgClass} ${config.textClass}`}
      title={`Last verified on ${freshness.lastUpdatedDate} (${freshness.daysAgo} days ago)`}
    >
      <svg
        className={`w-3 h-3 mr-1 ${config.iconColor}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Verified {freshness.daysAgo === 0 ? 'today' : `${freshness.daysAgo}d ago`}</span>
    </span>
  );
}
