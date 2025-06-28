# 👨‍💻 Contributing to Fynorra Suggestion System
## Developer Onboarding & Contribution Guidelines

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Development Setup](#development-setup)
4. [Development Workflow](#development-workflow)
5. [Testing Guidelines](#testing-guidelines)
6. [Code Standards](#code-standards)
7. [Feature Development](#feature-development)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)
10. [Resources](#resources)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.17+ (LTS recommended)
- **npm** 9+ or **yarn** 1.22+
- **Git** 2.30+
- **VS Code** (recommended editor)

### One-Command Setup
```bash
# Clone the repository
git clone https://github.com/fynorra/fynorra-suggestion-system.git
cd fynorra-suggestion-system

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application running!

---

## 📁 Project Structure

```
fynorra-suggestion-system/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── suggestions/          # Suggestion endpoints
│   │   └── categories/           # Category endpoints
│   ├── suggestions/              # Suggestion pages
│   │   ├── page.tsx             # Main suggestions list
│   │   ├── [slug]/              # Individual suggestion
│   │   └── new/                 # New suggestion form
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # React components
│   ├── suggestions/             # Suggestion-specific components
│   ├── ui/                      # Reusable UI components
│   └── seo/                     # SEO components
├── lib/                         # Utility functions & services
│   ├── suggestion-service.ts    # Suggestion business logic
│   ├── category-service.ts      # Category management
│   └── utils.ts                 # Helper functions
├── types/                       # TypeScript type definitions
│   └── index.ts                 # Main type exports
├── docs/                        # Documentation
├── public/                      # Static assets
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

### Key Directories Explained

#### `/app` - Next.js App Router
- **`/api`** - RESTful API endpoints
- **`/suggestions`** - Suggestion-related pages
- **`layout.tsx`** - Root layout with metadata
- **`page.tsx`** - Homepage component

#### `/components` - React Components
- **`/suggestions`** - Suggestion-specific components
- **`/ui`** - Reusable UI components (buttons, forms, etc.)
- **`/seo`** - SEO and structured data components

#### `/lib` - Business Logic & Services
- **`suggestion-service.ts`** - Core suggestion operations
- **`category-service.ts`** - Category management
- **`utils.ts`** - Helper functions and utilities

---

## 🛠️ Development Setup

### 1. Environment Setup

#### Install Node.js
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Or download from nodejs.org
```

#### Install Dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 2. Environment Variables

Create `.env.local` file:
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fynorra"

# Authentication (Phase 2)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email Service (Phase 2)
RESEND_API_KEY="your-resend-api-key"

# Analytics
NEXT_PUBLIC_GA_ID="your-google-analytics-id"
```

### 3. Database Setup

#### PostgreSQL Setup
```bash
# Install PostgreSQL
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Create database
createdb fynorra_suggestions
```

#### Database Schema
```sql
-- Run this in your PostgreSQL database
CREATE TABLE suggestions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  detailed_description TEXT,
  category_id INTEGER REFERENCES categories(id),
  status VARCHAR(50) DEFAULT 'open',
  priority VARCHAR(50) DEFAULT 'medium',
  author_id VARCHAR(255),
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  tags TEXT[],
  estimated_impact VARCHAR(50),
  estimated_effort VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  color VARCHAR(50),
  suggestion_count INTEGER DEFAULT 0
);
```

### 4. VS Code Setup

#### Recommended Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

#### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

---

## 🔄 Development Workflow

### 1. Git Workflow

#### Branch Naming Convention
```bash
# Feature branches
feature/user-authentication
feature/comments-system
feature/admin-dashboard

# Bug fixes
fix/voting-bug
fix/seo-meta-tags

# Hotfixes
hotfix/security-patch
```

#### Commit Message Format
```bash
# Format: type(scope): description

# Examples:
feat(suggestions): add voting functionality
fix(ui): resolve mobile layout issues
docs(api): update endpoint documentation
refactor(components): extract reusable button component
test(suggestions): add unit tests for voting
```

#### Pull Request Process
1. **Create feature branch** from `main`
2. **Develop feature** with tests
3. **Run linting and tests** locally
4. **Create pull request** with description
5. **Code review** by team members
6. **Merge** after approval

### 2. Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Format code
npm run format
```

### 3. Development Tips

#### Hot Reloading
- Next.js provides fast refresh for React components
- API routes auto-reload on changes
- CSS changes are hot-reloaded

#### Debugging
```bash
# Debug with VS Code
# Add to .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal"
    }
  ]
}
```

---

## 🧪 Testing Guidelines

### 1. Testing Strategy

#### Unit Tests
- **Components** - Test individual React components
- **Services** - Test business logic functions
- **Utilities** - Test helper functions

#### Integration Tests
- **API Routes** - Test API endpoints
- **Database** - Test database operations
- **Authentication** - Test auth flows

#### E2E Tests
- **User Flows** - Test complete user journeys
- **Critical Paths** - Test important features

### 2. Testing Setup

#### Jest Configuration
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

#### Test Examples

```typescript
// components/suggestions/suggestion-card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { SuggestionCard } from './suggestion-card'

describe('SuggestionCard', () => {
  const mockSuggestion = {
    id: '1',
    title: 'Add Dark Mode',
    description: 'Implement dark mode theme',
    upvotes: 10,
    downvotes: 2,
  }

  it('renders suggestion title and description', () => {
    render(<SuggestionCard suggestion={mockSuggestion} />)
    
    expect(screen.getByText('Add Dark Mode')).toBeInTheDocument()
    expect(screen.getByText('Implement dark mode theme')).toBeInTheDocument()
  })

  it('handles vote button clicks', () => {
    const mockOnVote = jest.fn()
    render(<SuggestionCard suggestion={mockSuggestion} onVote={mockOnVote} />)
    
    const upvoteButton = screen.getByLabelText('Upvote')
    fireEvent.click(upvoteButton)
    
    expect(mockOnVote).toHaveBeenCalledWith('1', 'up')
  })
})
```

```typescript
// lib/suggestion-service.test.ts
import { getSuggestions, createSuggestion } from './suggestion-service'

describe('SuggestionService', () => {
  it('fetches suggestions with filters', async () => {
    const filters = { category: 'ai-features', page: 1, limit: 10 }
    const result = await getSuggestions(filters)
    
    expect(result.suggestions).toBeDefined()
    expect(result.total).toBeGreaterThan(0)
  })

  it('creates new suggestion', async () => {
    const suggestionData = {
      title: 'Test Suggestion',
      description: 'Test description',
      categoryId: '1',
    }
    
    const result = await createSuggestion(suggestionData)
    
    expect(result.title).toBe('Test Suggestion')
    expect(result.slug).toBeDefined()
  })
})
```

### 3. Testing Best Practices

#### Component Testing
- Test user interactions (clicks, form submissions)
- Test accessibility (ARIA labels, keyboard navigation)
- Test error states and loading states
- Mock external dependencies

#### API Testing
- Test successful responses
- Test error handling
- Test input validation
- Test authentication/authorization

#### Database Testing
- Use test database
- Clean up after tests
- Test transactions and rollbacks
- Mock external services

---

## 📝 Code Standards

### 1. TypeScript Guidelines

#### Type Definitions
```typescript
// Always define interfaces for data structures
interface Suggestion {
  id: string
  title: string
  slug: string
  description: string
  // ... other properties
}

// Use type unions for specific values
type SuggestionStatus = 'open' | 'under-review' | 'planned' | 'completed'

// Use generics for reusable components
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  onItemClick?: (item: T) => void
}
```

#### Function Signatures
```typescript
// Use explicit return types for complex functions
async function getSuggestions(filters: SuggestionFilters): Promise<SuggestionResponse> {
  // implementation
}

// Use arrow functions for components
const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, onVote }) => {
  // component logic
}
```

### 2. React Guidelines

#### Component Structure
```typescript
// 1. Imports
import React from 'react'
import { Suggestion } from '@/types'

// 2. Types
interface SuggestionCardProps {
  suggestion: Suggestion
  onVote?: (id: string, voteType: 'up' | 'down') => void
}

// 3. Component
export const SuggestionCard: React.FC<SuggestionCardProps> = ({ 
  suggestion, 
  onVote 
}) => {
  // 4. Hooks
  const [isVoting, setIsVoting] = useState(false)

  // 5. Event handlers
  const handleVote = async (voteType: 'up' | 'down') => {
    setIsVoting(true)
    try {
      await onVote?.(suggestion.id, voteType)
    } finally {
      setIsVoting(false)
    }
  }

  // 6. Render
  return (
    <article className="suggestion-card">
      {/* JSX */}
    </article>
  )
}
```

#### Hooks Guidelines
```typescript
// Use custom hooks for reusable logic
function useSuggestions(filters: SuggestionFilters) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true)
      try {
        const data = await getSuggestions(filters)
        setSuggestions(data.suggestions)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [filters])

  return { suggestions, loading, error }
}
```

### 3. CSS Guidelines

#### Tailwind CSS
```typescript
// Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900">Suggestions</h2>
  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
    Add Suggestion
  </button>
</div>

// Extract common patterns to components
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
    {children}
  </div>
)
```

#### CSS Modules (if needed)
```css
/* components/SuggestionCard.module.css */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### 4. Naming Conventions

#### Files and Folders
```bash
# Components: PascalCase
SuggestionCard.tsx
VoteButton.tsx
NewSuggestionForm.tsx

# Pages: kebab-case (Next.js convention)
suggestions/
  page.tsx
  [slug]/
    page.tsx
  new/
    page.tsx

# Utilities: camelCase
suggestion-service.ts
category-service.ts
utils.ts

# Types: PascalCase
types/
  index.ts
  suggestion.ts
  user.ts
```

#### Variables and Functions
```typescript
// Variables: camelCase
const suggestionList = []
const isLoading = false
const userPreferences = {}

// Functions: camelCase
function getSuggestions() {}
function handleVote() {}
function formatDate() {}

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.fynorra.com'
const MAX_SUGGESTIONS_PER_PAGE = 12
```

---

## 🚀 Feature Development

### 1. Feature Planning

#### Before Starting
1. **Define requirements** - What should the feature do?
2. **Design UI/UX** - How should it look and feel?
3. **Plan API changes** - What endpoints are needed?
4. **Consider SEO** - How does it affect search?
5. **Plan testing** - What tests are needed?

#### Feature Checklist
- [ ] **Requirements documented**
- [ ] **UI/UX designed**
- [ ] **API endpoints planned**
- [ ] **Database schema updated**
- [ ] **Components created**
- [ ] **Tests written**
- [ ] **SEO optimized**
- [ ] **Documentation updated**

### 2. Development Process

#### Step 1: Setup
```bash
# Create feature branch
git checkout -b feature/new-feature

# Install new dependencies (if needed)
npm install new-package
```

#### Step 2: Development
```bash
# Start development server
npm run dev

# Run tests in watch mode
npm run test:watch

# Check types
npm run type-check
```

#### Step 3: Testing
```bash
# Run all tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

#### Step 4: Review
```bash
# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

### 3. Common Patterns

#### API Route Pattern
```typescript
// app/api/suggestions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSuggestions, createSuggestion } from '@/lib/suggestion-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
      category: searchParams.get('category'),
      status: searchParams.get('status'),
    }

    const result = await getSuggestions(filters)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const suggestion = await createSuggestion(body)
    return NextResponse.json(suggestion, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create suggestion' },
      { status: 500 }
    )
  }
}
```

#### Component Pattern
```typescript
// components/suggestions/SuggestionList.tsx
'use client'

import { useState, useEffect } from 'react'
import { Suggestion } from '@/types'
import { SuggestionCard } from './SuggestionCard'
import { SuggestionFilters } from './SuggestionFilters'
import { useSuggestions } from '@/hooks/useSuggestions'

interface SuggestionListProps {
  initialSuggestions?: Suggestion[]
}

export const SuggestionList: React.FC<SuggestionListProps> = ({ 
  initialSuggestions = [] 
}) => {
  const [filters, setFilters] = useState({})
  const { suggestions, loading, error } = useSuggestions(filters)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-6">
      <SuggestionFilters onFiltersChange={setFilters} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {suggestions.map(suggestion => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </div>
  )
}
```

---

## 🚀 Deployment

### 1. Production Build

```bash
# Build the application
npm run build

# Test the production build
npm start
```

### 2. Environment Variables

#### Production Environment
```bash
# .env.production
DATABASE_URL="postgresql://user:pass@host:5432/fynorra_prod"
NEXTAUTH_SECRET="production-secret-key"
NEXTAUTH_URL="https://fynorra.com"
RESEND_API_KEY="production-api-key"
```

### 3. Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 4. Monitoring

#### Error Tracking
```typescript
// lib/error-tracking.ts
import * as Sentry from '@sentry/nextjs'

export function trackError(error: Error, context?: any) {
  Sentry.captureException(error, {
    extra: context,
  })
}
```

#### Performance Monitoring
```typescript
// lib/analytics.ts
export function trackEvent(event: string, properties?: any) {
  // Send to analytics service
  console.log('Event:', event, properties)
}
```

---

## 🔧 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear node_modules
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Check types
npm run type-check

# Fix common issues
npm run lint:fix
```

#### Database Issues
```bash
# Check database connection
psql $DATABASE_URL -c "SELECT 1"

# Reset database (development only)
npm run db:reset
```

#### Performance Issues
```bash
# Analyze bundle size
npm run analyze

# Check Core Web Vitals
npm run lighthouse
```

### Debug Commands

```bash
# Debug Next.js
DEBUG=* npm run dev

# Debug database queries
DEBUG=prisma:* npm run dev

# Profile performance
npm run profile
```

---

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Tools
- [VS Code](https://code.visualstudio.com)
- [Postman](https://www.postman.com) - API testing
- [DBeaver](https://dbeaver.io) - Database management
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [React Discord](https://discord.gg/react)
- [TypeScript Discord](https://discord.gg/typescript)

### Learning Resources
- [Next.js Tutorial](https://nextjs.org/learn)
- [React Patterns](https://reactpatterns.com)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript)

---

## 🤝 Getting Help

### Before Asking
1. **Check documentation** - This guide and project docs
2. **Search issues** - Look for similar problems
3. **Try debugging** - Use browser dev tools and logs
4. **Reproduce issue** - Create minimal reproduction

### Asking for Help
1. **Describe the problem** - What are you trying to do?
2. **Show your code** - Relevant code snippets
3. **Include error messages** - Full error stack traces
4. **Provide context** - Environment, steps to reproduce

### Contact
- **Issues** - [GitHub Issues](https://github.com/fynorra/fynorra-suggestion-system/issues)
- **Discussions** - [GitHub Discussions](https://github.com/fynorra/fynorra-suggestion-system/discussions)
- **Email** - dev@fynorra.com

---

*Contributing Guide Version: 1.0*  
*Last Updated: December 2024*  
*Next Review: March 2025* 