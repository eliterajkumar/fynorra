'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2, 
  Edit, 
  MoreVertical,
  Calendar,
  Clock,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export function RecentPosts() {
  const posts = [
    {
      id: 1,
      title: 'The Future of Web Development: What to Expect in 2024',
      excerpt: 'Explore the latest trends and technologies that will shape web development in the coming year...',
      status: 'published',
      publishedAt: '2024-01-15',
      readTime: '8 min read',
      views: 2847,
      likes: 156,
      comments: 23,
      shares: 45,
      trending: true,
      tags: ['Web Development', 'Trends', '2024']
    },
    {
      id: 2,
      title: 'Mastering TypeScript: Advanced Patterns and Best Practices',
      excerpt: 'Dive deep into advanced TypeScript patterns that will make your code more robust and maintainable...',
      status: 'published',
      publishedAt: '2024-01-12',
      readTime: '12 min read',
      views: 1923,
      likes: 98,
      comments: 15,
      shares: 28,
      trending: false,
      tags: ['TypeScript', 'Programming', 'Best Practices']
    },
    {
      id: 3,
      title: 'Building Scalable React Applications with Modern Architecture',
      excerpt: 'Learn how to structure your React applications for scale and maintainability...',
      status: 'draft',
      publishedAt: null,
      readTime: '10 min read',
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      trending: false,
      tags: ['React', 'Architecture', 'Scalability']
    },
    {
      id: 4,
      title: 'The Complete Guide to CSS Grid Layout',
      excerpt: 'Master CSS Grid Layout with practical examples and real-world use cases...',
      status: 'published',
      publishedAt: '2024-01-08',
      readTime: '15 min read',
      views: 3421,
      likes: 234,
      comments: 42,
      shares: 67,
      trending: true,
      tags: ['CSS', 'Grid', 'Layout']
    },
    {
      id: 5,
      title: 'Optimizing Performance in Next.js Applications',
      excerpt: 'Discover techniques to improve the performance of your Next.js applications...',
      status: 'scheduled',
      publishedAt: '2024-01-20',
      readTime: '9 min read',
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      trending: false,
      tags: ['Next.js', 'Performance', 'Optimization']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Recent Posts</CardTitle>
        <Link href="/dashboard/posts">
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-white hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    {post.trending && (
                      <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <Badge className={`text-xs ${getStatusColor(post.status)}`}>
                      {post.status}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-slate-500 mb-3">
                    {post.publishedAt && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="w-3 h-3" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {post.status === 'draft' && (
                    <Link href={`/dashboard/write?id=${post.id}`}>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                  )}
                  {post.status === 'published' && (
                    <Link href={`/posts/${post.id}`}>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        View
                      </Button>
                    </Link>
                  )}
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 