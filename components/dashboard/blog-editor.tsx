'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Link, 
  Image, 
  Eye,
  Save,
  Send,
  Settings,
  Tag
} from 'lucide-react';
import { toast } from 'sonner';

export function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    { value: 'ai-implementation', label: 'AI Implementation' },
    { value: 'business-automation', label: 'Business Automation' },
    { value: 'chatbot-development', label: 'Chatbot Development' },
    { value: 'case-study', label: 'Case Study' },
    { value: 'industry-insights', label: 'Industry Insights' },
    { value: 'technical-deep-dive', label: 'Technical Deep Dive' },
  ];

  const formatText = (format: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      case 'ordered-list':
        formattedText = `1. ${selectedText}`;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formattedText.length);
    }, 0);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Draft saved successfully!');
    } catch (error) {
      toast.error('Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const publishPost = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in the title and content');
      return;
    }

    setIsPublishing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Post published successfully!');
      // Redirect to the published post
    } catch (error) {
      toast.error('Failed to publish post');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
        {/* Editor Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Create New Post</h2>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="text-slate-300 hover:text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide Preview' : 'Preview'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={saveDraft}
                disabled={isSaving}
                className="text-slate-300 hover:text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                onClick={publishPost}
                disabled={isPublishing}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                {isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>

          {/* Title Input */}
          <div className="mb-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write your title here..."
              className="text-2xl font-bold bg-transparent border-none text-white placeholder:text-slate-400 focus:outline-none focus:ring-0 p-0"
            />
          </div>

          {/* Post Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-slate-300 text-sm">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-slate-700/60 border-slate-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-slate-300 text-sm">Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add tag..."
                  className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
                />
                <Button onClick={addTag} size="sm" variant="outline">
                  <Tag className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <Label className="text-slate-300 text-sm">Excerpt</Label>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of your post..."
                className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="p-6">
          {!showPreview ? (
            <>
              {/* Formatting Toolbar */}
              <div className="flex items-center space-x-2 mb-4 p-2 bg-slate-700/30 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('bold')}
                  className="text-slate-300 hover:text-white"
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('italic')}
                  className="text-slate-300 hover:text-white"
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-slate-600"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('list')}
                  className="text-slate-300 hover:text-white"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('ordered-list')}
                  className="text-slate-300 hover:text-white"
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-slate-600"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('quote')}
                  className="text-slate-300 hover:text-white"
                >
                  <Quote className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('link')}
                  className="text-slate-300 hover:text-white"
                >
                  <Link className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white"
                >
                  <Image className="w-4 h-4" />
                </Button>
              </div>

              {/* Content Editor */}
              <Textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your story here... You can use Markdown formatting."
                className="min-h-[500px] bg-transparent border-none text-white placeholder:text-slate-400 focus:outline-none focus:ring-0 p-0 text-lg leading-relaxed resize-none"
              />
            </>
          ) : (
            /* Preview Mode */
            <div className="prose prose-invert max-w-none">
              <h1 className="text-3xl font-bold text-white mb-6">{title || 'Untitled Post'}</h1>
              <div className="text-slate-300 leading-relaxed">
                {content || 'Start writing to see the preview...'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 