'use client';

import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function DashboardWelcome() {
  const { user, isLoaded } = useUser();

  // Get display name
  const getDisplayName = () => {
    if (!user) return 'there';
    return user.firstName || user.fullName || user.emailAddresses[0]?.emailAddress.split('@')[0] || 'there';
  };

  if (!isLoaded) {
    return (
      <div className="mb-8">
        <div className="h-8 bg-slate-700/50 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-slate-700/50 rounded animate-pulse w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-primary">{getDisplayName()}</span>! 👋
          </h1>
          <p className="text-slate-300 mb-4">
            Ready to share your next insight with the world? Start writing and grow your audience.
          </p>
        </div>
        <Link href="/dashboard/write">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Write New Post
          </Button>
        </Link>
      </div>
      
      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-white font-medium">Writing Tips</span>
          </div>
          <p className="text-slate-400 text-sm">
            Use clear headings, engaging introductions, and include relevant images to make your posts stand out.
          </p>
        </div>
        
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-white font-medium">Grow Your Audience</span>
          </div>
          <p className="text-slate-400 text-sm">
            Share your posts on social media and engage with your readers through comments to build a community.
          </p>
        </div>
        
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center space-x-2 mb-2">
            <Plus className="w-4 h-4 text-blue-400" />
            <span className="text-white font-medium">Consistency is Key</span>
          </div>
          <p className="text-slate-400 text-sm">
            Post regularly to keep your audience engaged and improve your blog's visibility in search results.
          </p>
        </div>
      </div>
    </div>
  );
} 