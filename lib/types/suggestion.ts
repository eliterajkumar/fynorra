export interface Suggestion {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription?: string;
  category: SuggestionCategory;
  status: SuggestionStatus;
  priority: SuggestionPriority;
  authorId: string;
  author?: SuggestionAuthor;
  upvotes: number;
  downvotes: number;
  totalVotes: number;
  voters: string[]; // user IDs who voted
  tags: string[];
  attachments?: string[]; // URLs to attached files/images
  estimatedImpact: 'low' | 'medium' | 'high';
  estimatedEffort: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  implementedAt?: Date;
  adminNotes?: string;
  roadmapQuarter?: string; // e.g., "Q1 2025"
}

export interface SuggestionAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isVerified: boolean;
  suggestionCount: number;
  totalUpvotes: number;
}

export interface SuggestionComment {
  id: string;
  suggestionId: string;
  authorId: string;
  author?: SuggestionAuthor;
  content: string;
  parentId?: string; // for nested comments
  likes: number;
  isAdminComment: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SuggestionCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  suggestionCount: number;
}

export type SuggestionStatus = 
  | 'open' 
  | 'under-review' 
  | 'planned' 
  | 'in-progress' 
  | 'completed' 
  | 'declined' 
  | 'duplicate';

export type SuggestionPriority = 'low' | 'medium' | 'high' | 'critical';

export interface SuggestionFilters {
  category?: string;
  status?: SuggestionStatus;
  priority?: SuggestionPriority;
  author?: string;
  search?: string;
  sortBy?: 'newest' | 'oldest' | 'most-voted' | 'trending' | 'recently-updated';
  tags?: string[];
}

export interface SuggestionStats {
  totalSuggestions: number;
  openSuggestions: number;
  completedSuggestions: number;
  totalVotes: number;
  topCategories: Array<{ category: SuggestionCategory; count: number }>;
  topContributors: Array<{ author: SuggestionAuthor; suggestions: number; upvotes: number }>;
  recentActivity: Array<{ type: 'suggestion' | 'comment' | 'vote'; data: any; timestamp: Date }>;
}

// For API responses
export interface SuggestionListResponse {
  suggestions: Suggestion[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  stats: SuggestionStats;
}

// SEO Schema types
export interface SuggestionSchema {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  name: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
  dateCreated: string;
  dateModified: string;
  url: string;
  interactionStatistic: {
    "@type": "InteractionCounter";
    interactionType: "https://schema.org/VoteAction";
    userInteractionCount: number;
  };
}

// Roadmap types
export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  quarter: string;
  status: 'planned' | 'in-progress' | 'completed';
  suggestions: string[]; // suggestion IDs
  progress: number; // 0-100
  estimatedRelease?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoadmapQuarter {
  quarter: string;
  year: number;
  items: RoadmapItem[];
  totalItems: number;
  completedItems: number;
} 