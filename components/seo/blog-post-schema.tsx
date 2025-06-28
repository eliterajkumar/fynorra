import { BlogPost } from "@/lib/types/blog";

interface BlogPostSchemaProps {
  post: BlogPost;
}

export function BlogPostSchema({ post }: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.seoDescription || post.excerpt,
    "image": post.coverImage,
    "author": post.author ? {
      "@type": "Person",
      "name": post.author.name,
      "url": post.author.socialLinks?.linkedin || undefined,
      "jobTitle": post.author.role,
      "worksFor": {
        "@type": "Organization",
        "name": "Fynorra"
      }
    } : {
      "@type": "Person",
      "name": "Fynorra Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fynorra",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.fynorra.com/logo.jpeg"
      },
      "url": "https://www.fynorra.com"
    },
    "datePublished": post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.fynorra.com/blog/${post.slug}`
    },
    "url": `https://www.fynorra.com/blog/${post.slug}`,
    "articleSection": post.tags.length > 0 ? post.tags[0] : "Technology",
    "keywords": post.seoKeywords?.join(", ") || post.tags.join(", "),
    "wordCount": post.content.length,
    "timeRequired": `PT${post.readTime}M`,
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ViewAction",
        "userInteractionCount": post.views
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/LikeAction",
        "userInteractionCount": post.likes
      }
    ],
    "potentialAction": {
      "@type": "ReadAction",
      "target": `https://www.fynorra.com/blog/${post.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
} 