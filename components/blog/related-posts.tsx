import { BlogPost } from "@/lib/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostSlug: string;
}

export function RelatedPosts({ posts, currentPostSlug }: RelatedPostsProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Related Articles
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Explore more insights and tutorials related to this topic
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card 
            key={post.id} 
            className="group bg-slate-800/30 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
          >
            {/* Cover Image */}
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <CardHeader className="flex-grow">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.tags.length - 2} more
                  </Badge>
                )}
              </div>

              {/* Title */}
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-3">
                {post.title}
              </CardTitle>

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
                    <Clock className="h-3 w-3" />
                    {post.readTime} min read
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {post.views.toLocaleString()}
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
        ))}
      </div>

      {/* View All Posts CTA */}
      <div className="text-center mt-12">
        <Link href="/blog">
          <Button size="lg" className="group">
            View All Blog Posts
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
} 