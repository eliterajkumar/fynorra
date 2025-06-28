export function GuestAuthorGuidelines() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
      <h3 className="text-xl font-bold text-white mb-6">Guest Author Guidelines</h3>
      
      <div className="space-y-6">
        {/* What We're Looking For */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">What We're Looking For</h4>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>AI implementation success stories and case studies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Business automation strategies and results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Chatbot development insights and best practices</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Industry-specific AI applications and trends</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Technical deep-dives into AI technologies</span>
            </li>
          </ul>
        </div>

        {/* Content Requirements */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Content Requirements</h4>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Minimum 500 words, maximum 3,000 words</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Original, unpublished content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Practical insights and actionable advice</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Real-world examples and case studies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Professional tone and high-quality writing</span>
            </li>
          </ul>
        </div>

        {/* Author Benefits */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Author Benefits</h4>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Reach our audience of 10,000+ tech professionals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Build your personal brand and thought leadership</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Include your bio and company information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Backlinks to your website and social profiles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Potential speaking and partnership opportunities</span>
            </li>
          </ul>
        </div>

        {/* What We Don't Accept */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">What We Don't Accept</h4>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Promotional content or product pitches</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Previously published content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Generic or low-quality articles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Content that violates our community guidelines</span>
            </li>
          </ul>
        </div>

        {/* Submission Process */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Submission Process</h4>
          <div className="space-y-3 text-slate-300">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">1</div>
              <span>Submit your article using the form</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">2</div>
              <span>Our editorial team reviews your submission (3-5 business days)</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">3</div>
              <span>We provide feedback and request any revisions if needed</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">4</div>
              <span>Your article is published with full attribution and promotion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 