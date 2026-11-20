export type VerificationStatus = 'verified' | 'self-reported' | 'pending' | 'needs-update';

export type AvailabilityStatus = 'open' | 'limited' | 'full' | 'on-sabbatical';

export type ActionType = 
  | 'draft-proposal' 
  | 'email-inquiry' 
  | 'office-visit' 
  | 'waitlist' 
  | 'co-supervisor-required';

export interface ScopeItem {
  id: string;
  label: string;
  isVerified: boolean;
  notes: string;
}

export interface InformationSource {
  id: string;
  title: string;
  sourceType: 'institutional-portal' | 'official-registry' | 'direct-interview' | 'academic-profile';
  sourceTypeName: string;
  referenceCode?: string;
  dateRetrieved: string;
  authority: string;
  url?: string;
}

export interface QuotaInfo {
  total: number;
  filled: number;
  remaining: number;
  semester: string;
}

export interface RecommendedAction {
  headline: string;
  actionType: ActionType;
  actionTypeLabel: string;
  summary: string;
  actionSteps: string[];
  prerequisites: string[];
  contactEmail: string;
  preferredOfficeHours: string;
}

export interface InformationFreshness {
  lastUpdatedDate: string; // ISO format: YYYY-MM-DD
  daysAgo: number;
  category: 'fresh' | 'moderate' | 'stale';
  freshnessLabel: string;
}

export interface Supervisor {
  id: string;
  name: string;
  academicTitle: string;
  role: string;
  department: string;
  faculty: string;
  email: string;
  roomLocation: string;
  officeHours: string;
  avatarInitials: string;
  bio: string;
  researchFields: string[];
  thesisFocusAreas: string[];
  methodologies: string[];
  verificationStatus: VerificationStatus;
  verificationStatusLabel: string;
  verificationStatusDescription: string;
  verificationScope: ScopeItem[];
  informationSources: InformationSource[];
  freshness: InformationFreshness;
  availabilityStatus: AvailabilityStatus;
  availabilityLabel: string;
  quota: QuotaInfo;
  recommendedAction: RecommendedAction;
}

export interface FilterState {
  searchQuery: string;
  verificationStatus: VerificationStatus | 'all';
  researchField: string | 'all';
  availabilityStatus: AvailabilityStatus | 'all';
}
