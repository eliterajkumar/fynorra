"use client";

import { BlogPost } from "@/lib/types/blog";
import { BlogCard } from "./blog-card";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogListProps {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  currentFilters: Record<string, string | undefined>;
}

export function BlogList({ posts, total, page, limit, hasMore, currentFilters }: BlogListProps) {
  const totalPages = Math.ceil(total / limit);

  const buildPageUrl = (newPage: number) => {
    const params = new URLSearchParams();
    
    // Add current filters
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value && key !== 'page') {
        params.set(key, value);
      }
    });
    
    // Add new page
    if (newPage > 1) {
      params.set('page', newPage.toString());
    }
    
    const queryString = params.toString();
    return `/blog${queryString ? `?${queryString}` : ''}`;
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-4">No posts found</h3>
          <p className="text-foreground/70 mb-6">
            Try adjusting your filters or check back later for new content.
          </p>
          <Link href="/blog">
            <Button variant="outline">
              Clear Filters
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {total === 1 ? '1 post found' : `${total} posts found`}
          </h2>
          {Object.keys(currentFilters).length > 0 && (
            <p className="text-sm text-foreground/70 mt-1">
              Showing results for your filters
            </p>
          )}
        </div>
        
        {totalPages > 1 && (
          <div className="text-sm text-foreground/70">
            Page {page} of {totalPages}
          </div>
        )}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          {page > 1 && (
            <Link href={buildPageUrl(page - 1)}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            </Link>
          )}
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <Link key={pageNum} href={buildPageUrl(pageNum)}>
                  <Button
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                    className="w-10 h-10"
                  >
                    {pageNum}
                  </Button>
                </Link>
              );
            })}
          </div>
          
          {hasMore && (
            <Link href={buildPageUrl(page + 1)}>
              <Button variant="outline" size="sm">
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
} 