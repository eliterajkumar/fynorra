import { BlogPost, BlogListResponse, BlogFilters, BlogStats, BlogCategory } from './types/blog';

// Sample data for development
const sampleAuthors = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@fynorra.com',
    avatar: '/avatars/sarah.jpg',
    bio: 'AI Research Lead at Fynorra',
    role: 'AI Research Lead',
    socialLinks: {
      twitter: 'https://twitter.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen',
    }
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus@fynorra.com',
    avatar: '/avatars/marcus.jpg',
    bio: 'Senior Software Engineer specializing in cloud solutions',
    role: 'Senior Software Engineer',
    socialLinks: {
      github: 'https://github.com/marcusrodriguez',
      linkedin: 'https://linkedin.com/in/marcusrodriguez',
    }
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    email: 'emily@fynorra.com',
    avatar: '/avatars/emily.jpg',
    bio: 'Machine Learning Specialist with 10+ years in AI',
    role: 'ML Specialist',
    socialLinks: {
      twitter: 'https://twitter.com/emilywatson',
      linkedin: 'https://linkedin.com/in/emilywatson',
    }
  }
];

const sampleCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    description: 'Latest developments in AI and ML',
    color: '#7DF9FF',
    icon: 'Brain',
  },
  {
    id: '2',
    name: 'Chatbot Development',
    slug: 'chatbot-development',
    description: 'Custom chatbot solutions and tutorials',
    color: '#FF6B6B',
    icon: 'Bot',
  },
  {
    id: '3',
    name: 'Software Development',
    slug: 'software-development',
    description: 'Best practices in software engineering',
    color: '#4ECDC4',
    icon: 'Code',
  },
  {
    id: '4',
    name: 'Cloud & DevOps',
    slug: 'cloud-devops',
    description: 'Cloud infrastructure and DevOps practices',
    color: '#45B7D1',
    icon: 'Cloud',
  },
  {
    id: '5',
    name: 'Case Studies',
    slug: 'case-studies',
    description: 'Real-world implementations and results',
    color: '#96CEB4',
    icon: 'FileText',
  },
  {
    id: '6',
    name: 'Industry Insights',
    slug: 'industry-insights',
    description: 'Trends and analysis in technology',
    color: '#FFEAA7',
    icon: 'TrendingUp',
  }
];

const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Custom AI Chatbots: A Complete Guide',
    slug: 'building-custom-ai-chatbots-complete-guide',
    excerpt: 'Learn how to build intelligent chatbots that understand context, handle complex queries, and provide exceptional user experiences.',
    content: 'Full blog content here...',
    coverImage: '/blog/custom-ai-chatbots.jpg',
    authorId: '1',
    author: sampleAuthors[0],
    tags: ['AI', 'Chatbots', 'Machine Learning', 'Tutorial'],
    status: 'published',
    featured: true,
    readTime: 8,
    views: 1247,
    likes: 89,
    publishedAt: new Date('2024-12-15'),
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-15'),
    seoTitle: 'Custom AI Chatbot Development Guide - Fynorra',
    seoDescription: 'Complete guide to building custom AI chatbots with natural language processing and machine learning.',
    seoKeywords: ['AI chatbot', 'custom chatbot', 'chatbot development', 'NLP', 'machine learning'],
  },
  {
    id: '2',
    title: 'Enterprise AI Integration: Best Practices for 2025',
    slug: 'enterprise-ai-integration-best-practices-2025',
    excerpt: 'Discover the key strategies and best practices for successfully integrating AI solutions into enterprise environments.',
    content: 'Full blog content here...',
    coverImage: '/blog/enterprise-ai-integration.jpg',
    authorId: '2',
    author: sampleAuthors[1],
    tags: ['Enterprise AI', 'Integration', 'Best Practices', '2025'],
    status: 'published',
    featured: true,
    readTime: 12,
    views: 892,
    likes: 67,
    publishedAt: new Date('2024-12-12'),
    createdAt: new Date('2024-12-08'),
    updatedAt: new Date('2024-12-12'),
    seoTitle: 'Enterprise AI Integration Best Practices 2025 - Fynorra',
    seoDescription: 'Comprehensive guide to enterprise AI integration with proven strategies and best practices.',
    seoKeywords: ['enterprise AI', 'AI integration', 'best practices', 'enterprise software'],
  },
  {
    id: '3',
    title: 'How We Built a Scalable Chatbot for 10M+ Users',
    slug: 'scalable-chatbot-10m-users-case-study',
    excerpt: 'A detailed case study on how Fynorra designed and deployed a chatbot system that handles millions of conversations.',
    content: 'Full blog content here...',
    coverImage: '/blog/scalable-chatbot-case-study.jpg',
    authorId: '3',
    author: sampleAuthors[2],
    tags: ['Case Study', 'Scalability', 'Chatbot', 'Performance'],
    status: 'published',
    featured: false,
    readTime: 15,
    views: 1567,
    likes: 123,
    publishedAt: new Date('2024-12-10'),
    createdAt: new Date('2024-12-05'),
    updatedAt: new Date('2024-12-10'),
    seoTitle: 'Scalable Chatbot Case Study: 10M+ Users - Fynorra',
    seoDescription: 'Real-world case study on building and scaling a chatbot system for millions of users.',
    seoKeywords: ['chatbot case study', 'scalable chatbot', 'performance optimization', 'user scaling'],
  },
  {
    id: '4',
    title: 'The Future of AI in Healthcare: Opportunities and Challenges',
    slug: 'future-ai-healthcare-opportunities-challenges',
    excerpt: 'Exploring how AI is transforming healthcare delivery, from diagnosis to patient care, and the challenges we must address.',
    content: 'Full blog content here...',
    coverImage: '/blog/ai-healthcare-future.jpg',
    authorId: '1',
    author: sampleAuthors[0],
    tags: ['Healthcare AI', 'Future Trends', 'Medical Technology', 'AI Ethics'],
    status: 'published',
    featured: false,
    readTime: 10,
    views: 743,
    likes: 56,
    publishedAt: new Date('2024-12-08'),
    createdAt: new Date('2024-12-03'),
    updatedAt: new Date('2024-12-08'),
    seoTitle: 'AI in Healthcare: Future Opportunities and Challenges - Fynorra',
    seoDescription: 'Comprehensive analysis of AI applications in healthcare and the challenges ahead.',
    seoKeywords: ['AI healthcare', 'medical AI', 'healthcare technology', 'AI ethics'],
  },
  {
    id: '5',
    title: 'DevOps Automation with AI: Streamlining Your Pipeline',
    slug: 'devops-automation-ai-streamlining-pipeline',
    excerpt: 'Learn how to leverage AI to automate your DevOps pipeline, reduce manual work, and improve deployment reliability.',
    content: 'Full blog content here...',
    coverImage: '/blog/devops-ai-automation.jpg',
    authorId: '2',
    author: sampleAuthors[1],
    tags: ['DevOps', 'Automation', 'AI', 'CI/CD'],
    status: 'published',
    featured: false,
    readTime: 9,
    views: 634,
    likes: 45,
    publishedAt: new Date('2024-12-05'),
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-05'),
    seoTitle: 'DevOps Automation with AI: Pipeline Optimization - Fynorra',
    seoDescription: 'Guide to implementing AI-powered automation in DevOps pipelines for improved efficiency.',
    seoKeywords: ['DevOps automation', 'AI automation', 'CI/CD', 'pipeline optimization'],
  },
  {
    id: '6',
    title: 'Natural Language Processing: From Theory to Production',
    slug: 'natural-language-processing-theory-production',
    excerpt: 'A practical guide to implementing NLP solutions, from understanding the basics to deploying production-ready systems.',
    content: 'Full blog content here...',
    coverImage: '/blog/nlp-theory-production.jpg',
    authorId: '3',
    author: sampleAuthors[2],
    tags: ['NLP', 'Machine Learning', 'Production', 'Tutorial'],
    status: 'published',
    featured: false,
    readTime: 14,
    views: 892,
    likes: 78,
    publishedAt: new Date('2024-12-03'),
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-12-03'),
    seoTitle: 'NLP Implementation: From Theory to Production - Fynorra',
    seoDescription: 'Comprehensive guide to implementing natural language processing solutions in production environments.',
    seoKeywords: ['NLP', 'natural language processing', 'machine learning', 'production deployment'],
  }
];

export async function getBlogPosts(filters: BlogFilters = {}): Promise<BlogListResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  let filteredPosts = [...samplePosts];

  // Apply filters
  if (filters.category) {
    const category = sampleCategories.find(c => c.slug === filters.category);
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(tag => 
          category.name.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(category.name.toLowerCase())
        )
      );
    }
  }

  if (filters.tag) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags.some(tag => 
        tag.toLowerCase().includes(filters.tag!.toLowerCase())
      )
    );
  }

  if (filters.author) {
    filteredPosts = filteredPosts.filter(post => 
      post.author?.name.toLowerCase().includes(filters.author!.toLowerCase())
    );
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  if (filters.featured) {
    filteredPosts = filteredPosts.filter(post => post.featured);
  }

  // Apply sorting
  switch (filters.sortBy) {
    case 'oldest':
      filteredPosts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      break;
    case 'popular':
      filteredPosts.sort((a, b) => b.views - a.views);
      break;
    case 'trending':
      filteredPosts.sort((a, b) => b.likes - a.likes);
      break;
    default: // newest
      filteredPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Apply pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    page,
    limit,
    hasMore: endIndex < filteredPosts.length,
  };
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const post = samplePosts.find(p => p.slug === slug);
  if (!post) return null;

  // Increment views (in real app, this would be in database)
  post.views += 1;
  
  return post;
}

export async function getBlogStats(): Promise<BlogStats> {
  await new Promise(resolve => setTimeout(resolve, 50));

  const totalPosts = samplePosts.length;
  const totalViews = samplePosts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = samplePosts.reduce((sum, post) => sum + post.likes, 0);
  const averageReadTime = Math.round(
    samplePosts.reduce((sum, post) => sum + post.readTime, 0) / totalPosts
  );

  // Calculate top tags
  const tagCounts: Record<string, number> = {};
  samplePosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const topTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Calculate top authors
  const authorCounts: Record<string, { author: typeof sampleAuthors[0]; posts: number }> = {};
  samplePosts.forEach(post => {
    if (post.author) {
      if (!authorCounts[post.author.id]) {
        authorCounts[post.author.id] = { author: post.author, posts: 0 };
      }
      authorCounts[post.author.id].posts += 1;
    }
  });
  const topAuthors = Object.values(authorCounts)
    .sort((a, b) => b.posts - a.posts)
    .slice(0, 5);

  return {
    totalPosts,
    totalViews,
    totalLikes,
    averageReadTime,
    topTags,
    topAuthors,
  };
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return sampleCategories;
}

export async function getRelatedPosts(currentPostId: string, limit: number = 3): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const currentPost = samplePosts.find(p => p.id === currentPostId);
  if (!currentPost) return [];

  // Find posts with similar tags
  const relatedPosts = samplePosts
    .filter(p => p.id !== currentPostId)
    .map(post => ({
      post,
      score: post.tags.filter(tag => currentPost.tags.includes(tag)).length
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);

  return relatedPosts;
} 