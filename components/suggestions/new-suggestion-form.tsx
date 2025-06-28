'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SuggestionCategory } from '@/lib/types/suggestion';

interface NewSuggestionFormProps {
  categories: SuggestionCategory[];
}

export function NewSuggestionForm({ categories }: NewSuggestionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    categoryId: '',
    tags: '',
    estimatedImpact: 'medium',
    estimatedEffort: 'medium',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would submit to your API
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          authorId: 'user1', // In real app, get from auth
          author: {
            id: 'user1',
            name: 'Current User',
            email: 'user@example.com',
            avatar: '/avatars/default.jpg',
            isVerified: true,
            suggestionCount: 0,
            totalUpvotes: 0,
          }
        }),
      });

      if (response.ok) {
        const suggestion = await response.json();
        router.push(`/suggestions/${suggestion.slug}`);
      } else {
        throw new Error('Failed to submit suggestion');
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert('Failed to submit suggestion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Suggestion Title *
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., Add Multi-Language Support for Chatbots"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxLength={100}
        />
        <p className="text-sm text-gray-500 mt-1">
          Be clear and concise. Maximum 100 characters.
        </p>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          id="category"
          required
          value={formData.categoryId}
          onChange={(e) => handleInputChange('categoryId', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} - {category.description}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Brief Description *
        </label>
        <textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Provide a brief overview of your suggestion..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxLength={300}
        />
        <p className="text-sm text-gray-500 mt-1">
          {formData.description.length}/300 characters
        </p>
      </div>

      {/* Detailed Description */}
      <div>
        <label htmlFor="detailedDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Detailed Description
        </label>
        <textarea
          id="detailedDescription"
          value={formData.detailedDescription}
          onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
          placeholder="Provide more details about your suggestion, including use cases, implementation ideas, and benefits..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">
          Optional: Add more context, use cases, or implementation details.
        </p>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          value={formData.tags}
          onChange={(e) => handleInputChange('tags', e.target.value)}
          placeholder="chatbot, ai, integration, ui (comma-separated)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">
          Add relevant tags to help others find your suggestion. Separate with commas.
        </p>
      </div>

      {/* Impact and Effort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="estimatedImpact" className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Impact
          </label>
          <select
            id="estimatedImpact"
            value={formData.estimatedImpact}
            onChange={(e) => handleInputChange('estimatedImpact', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low - Nice to have</option>
            <option value="medium">Medium - Important improvement</option>
            <option value="high">High - Critical feature</option>
          </select>
        </div>

        <div>
          <label htmlFor="estimatedEffort" className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Effort
          </label>
          <select
            id="estimatedEffort"
            value={formData.estimatedEffort}
            onChange={(e) => handleInputChange('estimatedEffort', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low - Quick implementation</option>
            <option value="medium">Medium - Moderate complexity</option>
            <option value="high">High - Complex feature</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <a
          href="/suggestions"
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          ← Back to Suggestions
        </a>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          ) : (
            'Submit Suggestion'
          )}
        </button>
      </div>
    </form>
  );
} 