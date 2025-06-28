import { BlogPost as BlogPostType } from "@/lib/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Eye, 
  Heart, 
  Calendar, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook,
  Bookmark,
  MessageCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const shareUrl = `https://www.fynorra.com/blog/${post.slug}`;
  const shareText = `Check out this article: ${post.title}`;

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-500/10 hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-600/10 hover:text-blue-500'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-700/10 hover:text-blue-600'
    }
  ];

  return (
    <article className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-foreground/70">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground">{post.title}</li>
              </ol>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Author */}
              {post.author && (
                <div className="flex items-center gap-4">
                  <Image
                    src={post.author.avatar || '/avatars/default.jpg'}
                    alt={post.author.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{post.author.name}</p>
                    {post.author.role && (
                      <p className="text-sm text-foreground/70">{post.author.role}</p>
                    )}
                    {post.author.bio && (
                      <p className="text-sm text-foreground/60 mt-1">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-foreground/70">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min read
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {post.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  {post.likes} likes
                </span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto rounded-2xl shadow-2xl"
              priority
            />
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="bg-slate-800/30 border-slate-700/50">
                <CardContent className="p-8">
                  <div className="prose prose-invert prose-lg max-w-none">
                    {/* This would be the actual blog content */}
                    <div className="space-y-6 text-foreground/90 leading-relaxed">
                      <p>
                        This is where the full blog content would be rendered. In a real implementation,
                        this would contain the actual blog post content with proper formatting, headings,
                        images, code blocks, and other rich content.
                      </p>
                      
                      <h2>Introduction</h2>
                      <p>
                        {post.excerpt} This is an expanded version of the excerpt that provides more
                        context and detail about the topic being discussed.
                      </p>

                      <h2>Key Points</h2>
                      <ul>
                        <li>First key point about the topic</li>
                        <li>Second important consideration</li>
                        <li>Third critical insight</li>
                        <li>Fourth practical application</li>
                      </ul>

                      <h2>Implementation Details</h2>
                      <p>
                        Here we would dive deeper into the technical aspects, providing code examples,
                        step-by-step instructions, and practical guidance for implementing the solutions
                        discussed in this post.
                      </p>

                      <h2>Conclusion</h2>
                      <p>
                        A summary of the key takeaways and next steps for readers who want to implement
                        these solutions in their own projects.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Share */}
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share this post
                    </h3>
                    <div className="flex gap-2">
                      {shareLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors ${link.color}`}
                        >
                          <link.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Author Card */}
                {post.author && (
                  <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-4">About the Author</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src={post.author.avatar || '/avatars/default.jpg'}
                          alt={post.author.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-foreground">{post.author.name}</p>
                          <p className="text-sm text-foreground/70">{post.author.role}</p>
                        </div>
                      </div>
                      {post.author.bio && (
                        <p className="text-sm text-foreground/70 mb-4">{post.author.bio}</p>
                      )}
                      <div className="flex gap-2">
                        {post.author.socialLinks?.twitter && (
                          <a
                            href={post.author.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {post.author.socialLinks?.linkedin && (
                          <a
                            href={post.author.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-blue-600/10 hover:text-blue-500 transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save for later
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Leave a comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 