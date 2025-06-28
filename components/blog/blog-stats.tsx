import { BlogStats as BlogStatsType } from "@/lib/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Eye, Heart, Clock, TrendingUp } from "lucide-react";

interface BlogStatsProps {
  stats: BlogStatsType;
}

export function BlogStats({ stats }: BlogStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const statItems = [
    {
      icon: FileText,
      label: 'Total Posts',
      value: stats.totalPosts.toString(),
      color: 'text-blue-400',
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: formatNumber(stats.totalViews),
      color: 'text-green-400',
    },
    {
      icon: Heart,
      label: 'Total Likes',
      value: formatNumber(stats.totalLikes),
      color: 'text-red-400',
    },
    {
      icon: Clock,
      label: 'Avg. Read Time',
      value: `${stats.averageReadTime} min`,
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {statItems.map((item) => (
        <Card key={item.label} className="bg-slate-800/30 border-slate-700/50 text-center">
          <CardContent className="p-4">
            <div className={`mx-auto w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mb-3`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {item.value}
            </div>
            <div className="text-sm text-foreground/70">
              {item.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 