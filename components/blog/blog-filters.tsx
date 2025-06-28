"use client";

import { BlogCategory } from "@/lib/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Tag, User, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogFiltersProps {
  categories: BlogCategory[];
  currentFilters: Record<string, string | undefined>;
}

export function BlogFilters({ categories, currentFilters }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(currentFilters.category || '');
  const [selectedAuthor, setSelectedAuthor] = useState(currentFilters.author || '');
  const [selectedTag, setSelectedTag] = useState(currentFilters.tag || '');

  // Sample tags and authors for demo
  const popularTags = [
    'AI', 'Chatbots', 'Machine Learning', 'Tutorial', 'Case Study', 
    'Enterprise', 'DevOps', 'Cloud', 'NLP', 'Automation'
  ];

  const authors = [
    { id: '1', name: 'Sarah Chen' },
    { id: '2', name: 'Marcus Rodriguez' },
    { id: '3', name: 'Dr. Emily Watson' },
  ];

  const updateFilters = (newFilters: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Clear existing filters
    ['search', 'category', 'author', 'tag', 'page'].forEach(key => {
      params.delete(key);
    });
    
    // Add new filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    
    router.push(`/blog?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedAuthor('');
    setSelectedTag('');
    router.push('/blog');
  };

  const hasActiveFilters = Object.values(currentFilters).some(value => value && value !== 'page');

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateFilters({ search: searchTerm });
                }
              }}
              className="bg-slate-800/50 border-slate-700 text-foreground placeholder:text-foreground/50"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
              onClick={() => updateFilters({ search: searchTerm })}
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant={selectedCategory === '' ? 'default' : 'outline'}
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              setSelectedCategory('');
              updateFilters({ category: undefined });
            }}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.slug ? 'default' : 'outline'}
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                setSelectedCategory(category.slug);
                updateFilters({ category: category.slug });
              }}
            >
              <div 
                className="w-3 h-3 rounded-full mr-3" 
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => {
                  setSelectedTag(selectedTag === tag ? '' : tag);
                  updateFilters({ tag: selectedTag === tag ? undefined : tag });
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Authors */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Authors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant={selectedAuthor === '' ? 'default' : 'outline'}
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              setSelectedAuthor('');
              updateFilters({ author: undefined });
            }}
          >
            All Authors
          </Button>
          {authors.map((author) => (
            <Button
              key={author.id}
              variant={selectedAuthor === author.name ? 'default' : 'outline'}
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                setSelectedAuthor(author.name);
                updateFilters({ author: author.name });
              }}
            >
              {author.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Sort Options */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Sort By
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { value: 'newest', label: 'Newest First' },
            { value: 'oldest', label: 'Oldest First' },
            { value: 'popular', label: 'Most Popular' },
            { value: 'trending', label: 'Trending' },
          ].map((option) => (
            <Button
              key={option.value}
              variant={currentFilters.sort === option.value ? 'default' : 'outline'}
              size="sm"
              className="w-full justify-start"
              onClick={() => updateFilters({ sort: option.value })}
            >
              {option.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="pt-6">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 