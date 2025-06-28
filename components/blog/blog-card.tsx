import { BlogPost } from "@/lib/types/blog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Eye, Heart, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card className="group bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      {/* Cover Image */}
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={post.coverImage || '/placeholder.jpg'}
          alt={post.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          priority={post.featured}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== window.location.origin + '/placeholder.jpg') {
              target.src = '/placeholder.jpg';
            }
          }}
        />
        {post.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-3">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Image
                src={post.author.avatar || '/avatars/default.jpg'}
                alt={post.author.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {post.author.name}
              </p>
              {post.author.role && (
                <p className="text-xs text-foreground/60 truncate">
                  {post.author.role}
                </p>
              )}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-foreground/60 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {post.likes}
            </span>
          </div>
        </div>

        {/* Read More Button */}
        <Link href={`/blog/${post.slug}`}>
          <Button 
            variant="outline" 
            className="w-full group/button text-sm border-primary/50 hover:bg-primary/10 hover:text-primary"
          >
            Read More 
            <ArrowRight className="h-4 w-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
} 