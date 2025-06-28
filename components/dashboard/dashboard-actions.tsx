'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  BarChart3, 
  Settings, 
  Upload, 
  Calendar,
  BookOpen,
  Share2
} from 'lucide-react';
import Link from 'next/link';

export function DashboardActions() {
  const actions = [
    {
      title: 'Write New Post',
      description: 'Start writing your next blog post',
      icon: Plus,
      href: '/dashboard/write',
      color: 'bg-primary hover:bg-primary/90',
      badge: null
    },
    {
      title: 'Edit Drafts',
      description: 'Continue working on your drafts',
      icon: Edit,
      href: '/dashboard/drafts',
      color: 'bg-blue-600 hover:bg-blue-700',
      badge: '3 drafts'
    },
    {
      title: 'View Analytics',
      description: 'Check your post performance',
      icon: BarChart3,
      href: '/dashboard/analytics',
      color: 'bg-green-600 hover:bg-green-700',
      badge: null
    },
    {
      title: 'Manage Posts',
      description: 'Edit and organize your published posts',
      icon: BookOpen,
      href: '/dashboard/posts',
      color: 'bg-purple-600 hover:bg-purple-700',
      badge: '12 posts'
    },
    {
      title: 'Schedule Post',
      description: 'Set up future publication',
      icon: Calendar,
      href: '/dashboard/schedule',
      color: 'bg-orange-600 hover:bg-orange-700',
      badge: null
    },
    {
      title: 'Import Content',
      description: 'Import from other platforms',
      icon: Upload,
      href: '/dashboard/import',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      badge: null
    }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Quick Actions
          <Link href="/dashboard/settings">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.href}>
                <div className="group relative p-4 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-200 hover:bg-slate-800/30">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${action.color} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                          {action.title}
                        </h3>
                        {action.badge && (
                          <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Additional Actions */}
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/profile">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
            </Link>
            <Link href="/dashboard/backup">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Upload className="w-4 h-4 mr-2" />
                Backup Data
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 