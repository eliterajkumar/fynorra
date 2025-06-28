'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2,
  Calendar,
  Clock
} from 'lucide-react';

export function DashboardStats() {
  const stats = [
    {
      title: 'Monthly Views',
      value: '12,847',
      change: '+23%',
      changeType: 'positive' as const,
      icon: Eye,
      trend: 'up'
    },
    {
      title: 'Engagement Rate',
      value: '8.7%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: Heart,
      trend: 'up'
    },
    {
      title: 'Avg. Read Time',
      value: '4.2 min',
      change: '-0.3 min',
      changeType: 'negative' as const,
      icon: Clock,
      trend: 'down'
    },
    {
      title: 'Social Shares',
      value: '1,234',
      change: '+45%',
      changeType: 'positive' as const,
      icon: Share2,
      trend: 'up'
    }
  ];

  const recentActivity = [
    {
      type: 'post',
      title: 'New post published',
      description: 'The Future of Web Development',
      time: '2 hours ago',
      status: 'published'
    },
    {
      type: 'comment',
      title: 'New comment received',
      description: 'Great insights on React hooks!',
      time: '4 hours ago',
      status: 'unread'
    },
    {
      type: 'like',
      title: 'Post reached milestone',
      description: '100+ likes on "TypeScript Best Practices"',
      time: '6 hours ago',
      status: 'milestone'
    },
    {
      type: 'share',
      title: 'Post shared',
      description: 'Your post was shared 15 times today',
      time: '8 hours ago',
      status: 'shared'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Stats */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Key Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">{stat.title}</p>
                    <p className="text-lg font-semibold text-white">{stat.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center space-x-1 ${
                    stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-700/30 transition-colors">
                <div className="flex-shrink-0">
                  {activity.type === 'post' && (
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-green-400" />
                    </div>
                  )}
                  {activity.type === 'comment' && (
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                    </div>
                  )}
                  {activity.type === 'like' && (
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-red-400" />
                    </div>
                  )}
                  {activity.type === 'share' && (
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-purple-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{activity.title}</p>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        activity.status === 'published' ? 'bg-green-500/20 text-green-400' :
                        activity.status === 'unread' ? 'bg-blue-500/20 text-blue-400' :
                        activity.status === 'milestone' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{activity.description}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-slate-700/30">
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-xs text-slate-400">Posts Published</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-700/30">
              <p className="text-2xl font-bold text-white">847</p>
              <p className="text-xs text-slate-400">New Views</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-700/30">
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-xs text-slate-400">New Likes</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-700/30">
              <p className="text-2xl font-bold text-white">23</p>
              <p className="text-xs text-slate-400">New Comments</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 