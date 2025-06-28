'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageSquare, 
  Users, 
  Clock,
  FileText,
  Calendar
} from 'lucide-react';

export function QuickStats() {
  const stats = [
    {
      title: 'Published Posts',
      value: '0',
      change: 'Start writing!',
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
      icon: FileText,
      description: 'Your blog posts'
    },
    {
      title: 'Draft Posts',
      value: '0',
      change: 'Create drafts',
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
      icon: Calendar,
      description: 'Work in progress'
    },
    {
      title: 'Total Views',
      value: '0',
      change: 'No posts yet',
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
      icon: Eye,
      description: 'All time'
    },
    {
      title: 'Total Likes',
      value: '0',
      change: 'No posts yet',
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
      icon: Heart,
      description: 'All time'
    },
    {
      title: 'Comments',
      value: '0',
      change: 'No posts yet',
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
      icon: MessageSquare,
      description: 'All time'
    },
    {
      title: 'Followers',
      value: '0',
      change: 'Start sharing!',
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
      icon: Users,
      description: 'Your audience'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 
                  stat.changeType === 'negative' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-slate-400">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 