export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorId: string;
  author?: BlogAuthor;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  readTime: number; // in minutes
  views: number;
  likes: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface BlogComment {
  id: string;
  blogId: string;
  authorId: string;
  author?: BlogAuthor;
  content: string;
  parentId?: string; // for nested comments
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  averageReadTime: number;
  topTags: Array<{ tag: string; count: number }>;
  topAuthors: Array<{ author: BlogAuthor; posts: number }>;
}

// For API responses
export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  status?: 'draft' | 'published' | 'archived';
  featured?: boolean;
  search?: string;
  sortBy?: 'newest' | 'oldest' | 'popular' | 'trending';
}

// SEO Schema types
export interface BlogPostSchema {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
    url?: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
  mainEntityOfPage: string;
  articleSection?: string;
  keywords?: string;
} 