import { Suggestion } from '@/lib/types/suggestion';

interface SuggestionSchemaProps {
  suggestion: Suggestion;
}

export function SuggestionSchema({ suggestion }: SuggestionSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "headline": suggestion.title,
    "articleBody": suggestion.description,
    "author": {
      "@type": "Person",
      "name": suggestion.author?.name || "Anonymous",
      "url": suggestion.author?.avatar || undefined
    },
    "datePublished": suggestion.createdAt.toISOString(),
    "dateModified": suggestion.updatedAt.toISOString(),
    "url": `https://fynorra.com/suggestions/${suggestion.slug}`,
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/VoteAction",
        "userInteractionCount": suggestion.totalVotes
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/LikeAction",
        "userInteractionCount": suggestion.upvotes
      }
    ],
    "keywords": suggestion.tags.join(", "),
    "genre": suggestion.category.name,
    "about": {
      "@type": "Thing",
      "name": "Feature Suggestion",
      "description": suggestion.category.description
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fynorra",
      "url": "https://fynorra.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 