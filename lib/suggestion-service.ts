import { Suggestion, SuggestionListResponse, SuggestionFilters, SuggestionStats, SuggestionCategory } from './types/suggestion';

// Sample data for development
const sampleCategories: SuggestionCategory[] = [
  {
    id: '1',
    name: 'AI Features',
    slug: 'ai-features',
    description: 'New AI capabilities and improvements',
    icon: 'Brain',
    color: '#7DF9FF',
    suggestionCount: 15,
  },
  {
    id: '2',
    name: 'Chatbot Enhancements',
    slug: 'chatbot-enhancements',
    description: 'Improvements to chatbot functionality',
    icon: 'Bot',
    color: '#FF6B6B',
    suggestionCount: 12,
  },
  {
    id: '3',
    name: 'User Interface',
    slug: 'user-interface',
    description: 'UI/UX improvements and new features',
    icon: 'Palette',
    color: '#4ECDC4',
    suggestionCount: 8,
  },
  {
    id: '4',
    name: 'Integration',
    slug: 'integration',
    description: 'Third-party integrations and APIs',
    icon: 'Link',
    color: '#45B7D1',
    suggestionCount: 10,
  },
  {
    id: '5',
    name: 'Performance',
    slug: 'performance',
    description: 'Speed and optimization improvements',
    icon: 'Zap',
    color: '#96CEB4',
    suggestionCount: 6,
  },
  {
    id: '6',
    name: 'Security',
    slug: 'security',
    description: 'Security features and enhancements',
    icon: 'Shield',
    color: '#FFEAA7',
    suggestionCount: 4,
  }
];

const sampleSuggestions: Suggestion[] = [
  {
    id: '1',
    title: 'Add Multi-Language Support for Chatbots',
    slug: 'add-multi-language-support-for-chatbots',
    description: 'Enable chatbots to understand and respond in multiple languages automatically. This would be incredibly useful for global businesses and international customer support.',
    detailedDescription: 'We need to implement automatic language detection and translation capabilities for our chatbots. This should include:\n\n- Automatic language detection from user input\n- Support for 50+ languages including major ones like Spanish, French, German, Chinese, Japanese\n- Real-time translation of responses\n- Ability to maintain context across language switches\n- Custom language training for industry-specific terminology',
    category: sampleCategories[1],
    status: 'open',
    priority: 'high',
    authorId: '1',
    author: {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: '/avatars/sarah.jpg',
      isVerified: true,
      suggestionCount: 5,
      totalUpvotes: 23,
    },
    upvotes: 156,
    downvotes: 3,
    totalVotes: 159,
    voters: ['user1', 'user2', 'user3'],
    tags: ['chatbot', 'multilingual', 'translation', 'global'],
    attachments: [],
    estimatedImpact: 'high',
    estimatedEffort: 'medium',
    createdAt: new Date('2024-12-15'),
    updatedAt: new Date('2024-12-20'),
  },
  {
    id: '2',
    title: 'Implement Real-time Collaboration for AI Training',
    slug: 'implement-real-time-collaboration-for-ai-training',
    description: 'Allow multiple team members to collaborate in real-time when training and fine-tuning AI models, similar to Google Docs but for AI development.',
    detailedDescription: 'Create a collaborative workspace where multiple data scientists and AI engineers can work together on model training:\n\n- Real-time editing of training parameters\n- Live monitoring of training progress\n- Comment and annotation system\n- Version control integration\n- Conflict resolution for simultaneous edits\n- Role-based permissions (viewer, editor, admin)',
    category: sampleCategories[0],
    status: 'planned',
    priority: 'medium',
    authorId: '2',
    author: {
      id: '2',
      name: 'Marcus Rodriguez',
      email: 'marcus@example.com',
      avatar: '/avatars/marcus.jpg',
      isVerified: true,
      suggestionCount: 8,
      totalUpvotes: 45,
    },
    upvotes: 89,
    downvotes: 1,
    totalVotes: 90,
    voters: ['user1', 'user4', 'user5'],
    tags: ['collaboration', 'ai-training', 'real-time', 'teamwork'],
    attachments: [],
    estimatedImpact: 'high',
    estimatedEffort: 'high',
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-18'),
    roadmapQuarter: 'Q2 2025',
  },
  {
    id: '3',
    title: 'Add Dark Mode to Dashboard',
    slug: 'add-dark-mode-to-dashboard',
    description: 'Implement a dark mode theme option for the main dashboard to reduce eye strain and provide a better user experience.',
    detailedDescription: 'Add a comprehensive dark mode implementation:\n\n- Toggle switch in user settings\n- Automatic detection based on system preferences\n- Consistent dark theme across all dashboard components\n- Customizable accent colors\n- Smooth transitions between light/dark modes\n- Remember user preference across sessions',
    category: sampleCategories[2],
    status: 'in-progress',
    priority: 'low',
    authorId: '3',
    author: {
      id: '3',
      name: 'Dr. Emily Watson',
      email: 'emily@example.com',
      avatar: '/avatars/emily.jpg',
      isVerified: true,
      suggestionCount: 12,
      totalUpvotes: 67,
    },
    upvotes: 234,
    downvotes: 2,
    totalVotes: 236,
    voters: ['user1', 'user2', 'user3', 'user4', 'user5'],
    tags: ['ui', 'dark-mode', 'accessibility', 'user-experience'],
    attachments: [],
    estimatedImpact: 'medium',
    estimatedEffort: 'low',
    createdAt: new Date('2024-12-05'),
    updatedAt: new Date('2024-12-22'),
    roadmapQuarter: 'Q1 2025',
  },
  {
    id: '4',
    title: 'Integrate with Salesforce CRM',
    slug: 'integrate-with-salesforce-crm',
    description: 'Create a seamless integration with Salesforce CRM to automatically sync customer data and conversation history.',
    detailedDescription: 'Build a comprehensive Salesforce integration:\n\n- Two-way data synchronization\n- Automatic lead and contact creation\n- Conversation history logging in Salesforce\n- Custom field mapping\n- Real-time updates\n- Bulk data import/export capabilities\n- Custom Salesforce objects support',
    category: sampleCategories[3],
    status: 'completed',
    priority: 'high',
    authorId: '1',
    author: {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: '/avatars/sarah.jpg',
      isVerified: true,
      suggestionCount: 5,
      totalUpvotes: 23,
    },
    upvotes: 312,
    downvotes: 5,
    totalVotes: 317,
    voters: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
    tags: ['integration', 'salesforce', 'crm', 'automation'],
    attachments: [],
    estimatedImpact: 'high',
    estimatedEffort: 'medium',
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-12-15'),
    implementedAt: new Date('2024-12-15'),
  },
  {
    id: '5',
    title: 'Add Voice-to-Text for Chatbot Input',
    slug: 'add-voice-to-text-for-chatbot-input',
    description: 'Allow users to speak to chatbots using voice input, with automatic speech-to-text conversion for a more natural interaction.',
    detailedDescription: 'Implement voice interaction capabilities:\n\n- Real-time speech-to-text conversion\n- Support for multiple languages and accents\n- Noise cancellation and audio processing\n- Voice activity detection\n- Custom wake words\n- Offline voice processing option\n- Accessibility features for users with disabilities',
    category: sampleCategories[1],
    status: 'open',
    priority: 'medium',
    authorId: '2',
    author: {
      id: '2',
      name: 'Marcus Rodriguez',
      email: 'marcus@example.com',
      avatar: '/avatars/marcus.jpg',
      isVerified: true,
      suggestionCount: 8,
      totalUpvotes: 45,
    },
    upvotes: 67,
    downvotes: 1,
    totalVotes: 68,
    voters: ['user1', 'user3'],
    tags: ['voice', 'speech-recognition', 'accessibility', 'chatbot'],
    attachments: [],
    estimatedImpact: 'medium',
    estimatedEffort: 'high',
    createdAt: new Date('2024-12-12'),
    updatedAt: new Date('2024-12-12'),
  },
  {
    id: '6',
    title: 'Implement Advanced Analytics Dashboard',
    slug: 'implement-advanced-analytics-dashboard',
    description: 'Create a comprehensive analytics dashboard with advanced metrics, custom reports, and data visualization for better business insights.',
    detailedDescription: 'Build an enterprise-grade analytics platform:\n\n- Real-time performance metrics\n- Custom report builder\n- Interactive data visualizations\n- Export capabilities (PDF, CSV, Excel)\n- Scheduled report delivery\n- Role-based access control\n- Integration with external BI tools\n- Predictive analytics features',
    category: sampleCategories[4],
    status: 'planned',
    priority: 'high',
    authorId: '3',
    author: {
      id: '3',
      name: 'Dr. Emily Watson',
      email: 'emily@example.com',
      avatar: '/avatars/emily.jpg',
      isVerified: true,
      suggestionCount: 12,
      totalUpvotes: 67,
    },
    upvotes: 145,
    downvotes: 2,
    totalVotes: 147,
    voters: ['user1', 'user2', 'user4', 'user5'],
    tags: ['analytics', 'dashboard', 'reporting', 'business-intelligence'],
    attachments: [],
    estimatedImpact: 'high',
    estimatedEffort: 'high',
    createdAt: new Date('2024-12-08'),
    updatedAt: new Date('2024-12-16'),
    roadmapQuarter: 'Q3 2025',
  }
];

export async function getSuggestions(filters: SuggestionFilters = {}): Promise<SuggestionListResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  let filteredSuggestions = [...sampleSuggestions];

  // Apply filters
  if (filters.category) {
    filteredSuggestions = filteredSuggestions.filter(suggestion => 
      suggestion.category.slug === filters.category
    );
  }

  if (filters.status) {
    filteredSuggestions = filteredSuggestions.filter(suggestion => 
      suggestion.status === filters.status
    );
  }

  if (filters.priority) {
    filteredSuggestions = filteredSuggestions.filter(suggestion => 
      suggestion.priority === filters.priority
    );
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredSuggestions = filteredSuggestions.filter(suggestion => 
      suggestion.title.toLowerCase().includes(searchTerm) ||
      suggestion.description.toLowerCase().includes(searchTerm) ||
      suggestion.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    filteredSuggestions = filteredSuggestions.filter(suggestion => 
      filters.tags!.some(tag => suggestion.tags.includes(tag))
    );
  }

  // Apply sorting
  switch (filters.sortBy) {
    case 'oldest':
      filteredSuggestions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      break;
    case 'recently-updated':
      filteredSuggestions.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
      break;
    case 'trending':
      // Sort by recent activity (votes in last 7 days)
      filteredSuggestions.sort((a, b) => b.totalVotes - a.totalVotes);
      break;
    case 'most-voted':
    default:
      filteredSuggestions.sort((a, b) => b.totalVotes - a.totalVotes);
      break;
  }

  // Apply pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedSuggestions = filteredSuggestions.slice(startIndex, endIndex);

  // Calculate stats
  const stats = await getSuggestionStats();

  return {
    suggestions: paginatedSuggestions,
    total: filteredSuggestions.length,
    page,
    limit,
    hasMore: endIndex < filteredSuggestions.length,
    stats,
  };
}

export async function getSuggestion(slug: string): Promise<Suggestion | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const suggestion = sampleSuggestions.find(s => s.slug === slug);
  if (!suggestion) return null;
  
  return suggestion;
}

export async function getSuggestionStats(): Promise<SuggestionStats> {
  await new Promise(resolve => setTimeout(resolve, 50));

  const totalSuggestions = sampleSuggestions.length;
  const openSuggestions = sampleSuggestions.filter(s => s.status === 'open').length;
  const completedSuggestions = sampleSuggestions.filter(s => s.status === 'completed').length;
  const totalVotes = sampleSuggestions.reduce((sum, s) => sum + s.totalVotes, 0);

  // Calculate top categories
  const categoryCounts: Record<string, number> = {};
  sampleSuggestions.forEach(suggestion => {
    const categoryId = suggestion.category.id;
    categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
  });
  const topCategories = Object.entries(categoryCounts)
    .map(([categoryId, count]) => ({
      category: sampleCategories.find(c => c.id === categoryId)!,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Calculate top contributors
  const authorCounts: Record<string, { author: any; suggestions: number; upvotes: number }> = {};
  sampleSuggestions.forEach(suggestion => {
    if (suggestion.author) {
      if (!authorCounts[suggestion.author.id]) {
        authorCounts[suggestion.author.id] = { 
          author: suggestion.author, 
          suggestions: 0, 
          upvotes: 0 
        };
      }
      authorCounts[suggestion.author.id].suggestions += 1;
      authorCounts[suggestion.author.id].upvotes += suggestion.upvotes;
    }
  });
  const topContributors = Object.values(authorCounts)
    .sort((a, b) => b.suggestions - a.suggestions)
    .slice(0, 5);

  // Recent activity (simulated)
  const recentActivity = [
    {
      type: 'suggestion' as const,
      data: sampleSuggestions[0],
      timestamp: new Date('2024-12-22T10:30:00Z')
    },
    {
      type: 'vote' as const,
      data: { suggestionId: '1', userId: 'user1' },
      timestamp: new Date('2024-12-22T09:15:00Z')
    },
    {
      type: 'comment' as const,
      data: { suggestionId: '2', userId: 'user2' },
      timestamp: new Date('2024-12-22T08:45:00Z')
    }
  ];

  return {
    totalSuggestions,
    openSuggestions,
    completedSuggestions,
    totalVotes,
    topCategories,
    topContributors,
    recentActivity,
  };
}

export async function getSuggestionCategories(): Promise<SuggestionCategory[]> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return sampleCategories;
}

export async function voteSuggestion(suggestionId: string, userId: string, voteType: 'up' | 'down'): Promise<{ success: boolean; newVoteCount: number }> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const suggestion = sampleSuggestions.find(s => s.id === suggestionId);
  if (!suggestion) {
    return { success: false, newVoteCount: 0 };
  }

  const hasVoted = suggestion.voters.includes(userId);
  
  if (hasVoted) {
    // Remove vote
    suggestion.voters = suggestion.voters.filter(v => v !== userId);
    suggestion.upvotes -= 1;
    suggestion.totalVotes -= 1;
  } else {
    // Add vote
    suggestion.voters.push(userId);
    if (voteType === 'up') {
      suggestion.upvotes += 1;
    } else {
      suggestion.downvotes += 1;
    }
    suggestion.totalVotes += 1;
  }

  return { 
    success: true, 
    newVoteCount: suggestion.totalVotes 
  };
}

export async function createSuggestion(suggestionData: {
  title: string;
  description: string;
  detailedDescription?: string;
  categoryId: string;
  tags: string[];
  authorId: string;
  author: any;
}): Promise<Suggestion> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const category = sampleCategories.find(c => c.id === suggestionData.categoryId);
  if (!category) {
    throw new Error('Category not found');
  }

  const newSuggestion: Suggestion = {
    id: (sampleSuggestions.length + 1).toString(),
    title: suggestionData.title,
    slug: suggestionData.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    description: suggestionData.description,
    detailedDescription: suggestionData.detailedDescription,
    category,
    status: 'open',
    priority: 'medium',
    authorId: suggestionData.authorId,
    author: suggestionData.author,
    upvotes: 0,
    downvotes: 0,
    totalVotes: 0,
    voters: [],
    tags: suggestionData.tags,
    attachments: [],
    estimatedImpact: 'medium',
    estimatedEffort: 'medium',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  sampleSuggestions.unshift(newSuggestion);
  return newSuggestion;
} 