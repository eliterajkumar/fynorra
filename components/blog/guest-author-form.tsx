'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const guestAuthorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().min(2, 'Company name is required'),
  title: z.string().min(2, 'Job title is required'),
  linkedin: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  articleTitle: z.string().min(10, 'Article title must be at least 10 characters'),
  articleSummary: z.string().min(50, 'Article summary must be at least 50 characters'),
  articleContent: z.string().min(500, 'Article content must be at least 500 characters'),
  category: z.enum(['ai-implementation', 'business-automation', 'chatbot-development', 'case-study', 'industry-insights', 'technical-deep-dive']),
  estimatedWordCount: z.string(),
  agreeToGuidelines: z.boolean().refine(val => val === true, 'You must agree to the guidelines'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

type GuestAuthorFormData = z.infer<typeof guestAuthorSchema>;

export function GuestAuthorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GuestAuthorFormData>({
    resolver: zodResolver(guestAuthorSchema),
  });

  const onSubmit = async (data: GuestAuthorFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would send the data to your API
      console.log('Guest author submission:', data);
      
      toast.success('Thank you for your submission! We\'ll review your article and get back to you within 3-5 business days.');
      
      // Reset form
      // You could add form reset logic here
      
    } catch (error) {
      toast.error('There was an error submitting your article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Author Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Author Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-slate-300">Full Name *</Label>
            <Input
              id="name"
              {...register('name')}
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email" className="text-slate-300">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="your.email@company.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company" className="text-slate-300">Company *</Label>
            <Input
              id="company"
              {...register('company')}
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="Your company name"
            />
            {errors.company && (
              <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="title" className="text-slate-300">Job Title *</Label>
            <Input
              id="title"
              {...register('title')}
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="e.g., CTO, AI Director, Product Manager"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="linkedin" className="text-slate-300">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            {...register('linkedin')}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="https://linkedin.com/in/yourprofile"
          />
          {errors.linkedin && (
            <p className="text-red-400 text-sm mt-1">{errors.linkedin.message}</p>
          )}
        </div>
      </div>

      {/* Article Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Article Information</h3>
        
        <div>
          <Label htmlFor="articleTitle" className="text-slate-300">Article Title *</Label>
          <Input
            id="articleTitle"
            {...register('articleTitle')}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="Enter your article title"
          />
          {errors.articleTitle && (
            <p className="text-red-400 text-sm mt-1">{errors.articleTitle.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="articleSummary" className="text-slate-300">Article Summary *</Label>
          <Textarea
            id="articleSummary"
            {...register('articleSummary')}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
            placeholder="Brief summary of your article (2-3 sentences)"
          />
          {errors.articleSummary && (
            <p className="text-red-400 text-sm mt-1">{errors.articleSummary.message}</p>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category" className="text-slate-300">Category *</Label>
            <Select onValueChange={(value) => setValue('category', value as any)}>
              <SelectTrigger className="bg-slate-700/60 border-slate-600 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="ai-implementation">AI Implementation</SelectItem>
                <SelectItem value="business-automation">Business Automation</SelectItem>
                <SelectItem value="chatbot-development">Chatbot Development</SelectItem>
                <SelectItem value="case-study">Case Study</SelectItem>
                <SelectItem value="industry-insights">Industry Insights</SelectItem>
                <SelectItem value="technical-deep-dive">Technical Deep Dive</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="estimatedWordCount" className="text-slate-300">Estimated Word Count *</Label>
            <Select onValueChange={(value) => setValue('estimatedWordCount', value)}>
              <SelectTrigger className="bg-slate-700/60 border-slate-600 text-white">
                <SelectValue placeholder="Select word count" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="500-1000">500-1,000 words</SelectItem>
                <SelectItem value="1000-1500">1,000-1,500 words</SelectItem>
                <SelectItem value="1500-2000">1,500-2,000 words</SelectItem>
                <SelectItem value="2000+">2,000+ words</SelectItem>
              </SelectContent>
            </Select>
            {errors.estimatedWordCount && (
              <p className="text-red-400 text-sm mt-1">{errors.estimatedWordCount.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="articleContent" className="text-slate-300">Article Content *</Label>
          <Textarea
            id="articleContent"
            {...register('articleContent')}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400 min-h-[200px]"
            placeholder="Paste your article content here. You can use Markdown formatting."
          />
          {errors.articleContent && (
            <p className="text-red-400 text-sm mt-1">{errors.articleContent.message}</p>
          )}
          <p className="text-slate-400 text-sm mt-2">
            Minimum 500 words. You can use Markdown formatting for headers, lists, links, etc.
          </p>
        </div>
      </div>

      {/* Agreements */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToGuidelines"
            onCheckedChange={(checked) => setValue('agreeToGuidelines', checked as boolean)}
            className="mt-1"
          />
          <div className="space-y-1">
            <Label htmlFor="agreeToGuidelines" className="text-slate-300 text-sm">
              I agree to the guest author guidelines and content standards
            </Label>
            {errors.agreeToGuidelines && (
              <p className="text-red-400 text-sm">{errors.agreeToGuidelines.message}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToTerms"
            onCheckedChange={(checked) => setValue('agreeToTerms', checked as boolean)}
            className="mt-1"
          />
          <div className="space-y-1">
            <Label htmlFor="agreeToTerms" className="text-slate-300 text-sm">
              I agree to the terms of publication and grant Fynorra the right to publish this content
            </Label>
            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm">{errors.agreeToTerms.message}</p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Article for Review'}
      </Button>
      
      <p className="text-slate-400 text-sm text-center">
        We'll review your submission and get back to you within 3-5 business days.
      </p>
    </form>
  );
} 