# 🔌 Suggestion System API Documentation
## Fynorra AI Platform - RESTful API Reference

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL & Headers](#base-url--headers)
4. [Endpoints](#endpoints)
5. [Data Models](#data-models)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Examples](#examples)
9. [SDK Examples](#sdk-examples)
10. [Webhooks](#webhooks)

---

## 🎯 Overview

The Fynorra Suggestion System API provides a comprehensive RESTful interface for managing feature suggestions, voting, and community engagement. This API enables seamless integration with frontend applications, mobile apps, and third-party services.

### API Version
- **Current Version:** v1.0
- **Base URL:** `https://fynorra.com/api`
- **Content Type:** `application/json`

### Features
- ✅ **CRUD Operations** for suggestions
- ✅ **Voting System** with real-time updates
- ✅ **Advanced Filtering** and pagination
- ✅ **Category Management** for organization
- ✅ **User Authentication** (Phase 2)
- ✅ **Real-time Updates** via WebSocket (Phase 2)

---

## 🔐 Authentication

### Current Implementation
Currently, the API operates without authentication for demonstration purposes. In production, implement one of the following:

#### JWT Authentication (Recommended)
```bash
# Request Header
Authorization: Bearer <jwt_token>

# Token Format
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ
```

#### API Key Authentication
```bash
# Request Header
X-API-Key: <your_api_key>
```

#### Session-based Authentication
```bash
# Cookie-based (for web applications)
Cookie: session=<session_token>
```

### Authentication Endpoints (Phase 2)
```typescript
// Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Register
POST /api/auth/register
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}

// Refresh Token
POST /api/auth/refresh
{
  "refreshToken": "refresh_token_here"
}
```

---

## 🌐 Base URL & Headers

### Base URL
```
Production: https://fynorra.com/api
Development: http://localhost:3000/api
```

### Standard Headers
```typescript
{
  "Content-Type": "application/json",
  "Accept": "application/json",
  "User-Agent": "Fynorra-API-Client/1.0"
}
```

### Authenticated Headers
```typescript
{
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": "Bearer <jwt_token>",
  "User-Agent": "Fynorra-API-Client/1.0"
}
```

---

## 🔗 Endpoints

### Suggestions

#### Get All Suggestions
```http
GET /api/suggestions
```

**Query Parameters:**
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | number | Page number for pagination | 1 |
| `limit` | number | Items per page (max 50) | 12 |
| `category` | string | Filter by category slug | - |
| `status` | string | Filter by status | - |
| `priority` | string | Filter by priority | - |
| `sortBy` | string | Sort order | `most-voted` |
| `search` | string | Search in title/description | - |
| `tags` | string | Comma-separated tags | - |

**Response:**
```typescript
{
  "suggestions": Suggestion[],
  "total": number,
  "page": number,
  "limit": number,
  "hasMore": boolean,
  "stats": SuggestionStats
}
```

**Example Request:**
```bash
curl -X GET "https://fynorra.com/api/suggestions?page=1&limit=12&category=ai-features&sortBy=most-voted"
```

#### Get Single Suggestion
```http
GET /api/suggestions/{slug}
```

**Response:**
```typescript
Suggestion
```

**Example Request:**
```bash
curl -X GET "https://fynorra.com/api/suggestions/add-multi-language-support-for-chatbots"
```

#### Create New Suggestion
```http
POST /api/suggestions
```

**Request Body:**
```typescript
{
  "title": string,           // Required
  "description": string,     // Required
  "detailedDescription"?: string,
  "categoryId": string,      // Required
  "tags"?: string[],
  "estimatedImpact"?: "low" | "medium" | "high",
  "estimatedEffort"?: "low" | "medium" | "high"
}
```

**Response:**
```typescript
Suggestion
```

**Example Request:**
```bash
curl -X POST "https://fynorra.com/api/suggestions" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Add Dark Mode Support",
    "description": "Implement dark mode theme for better user experience",
    "categoryId": "3",
    "tags": ["ui", "dark-mode", "accessibility"],
    "estimatedImpact": "medium",
    "estimatedEffort": "low"
  }'
```

#### Update Suggestion
```http
PATCH /api/suggestions/{id}
```

**Request Body:**
```typescript
{
  "title"?: string,
  "description"?: string,
  "detailedDescription"?: string,
  "categoryId"?: string,
  "tags"?: string[],
  "status"?: SuggestionStatus,
  "priority"?: SuggestionPriority,
  "estimatedImpact"?: "low" | "medium" | "high",
  "estimatedEffort"?: "low" | "medium" | "high"
}
```

**Response:**
```typescript
Suggestion
```

#### Delete Suggestion
```http
DELETE /api/suggestions/{id}
```

**Response:**
```typescript
{
  "success": boolean,
  "message": string
}
```

### Voting

#### Vote on Suggestion
```http
POST /api/suggestions/{id}/vote
```

**Request Body:**
```typescript
{
  "voteType": "up" | "down"
}
```

**Response:**
```typescript
{
  "success": boolean,
  "newVoteCount": number,
  "userVote": "up" | "down" | null
}
```

**Example Request:**
```bash
curl -X POST "https://fynorra.com/api/suggestions/1/vote" \
  -H "Content-Type: application/json" \
  -d '{"voteType": "up"}'
```

#### Get User Votes
```http
GET /api/suggestions/{id}/votes
```

**Response:**
```typescript
{
  "upvotes": number,
  "downvotes": number,
  "totalVotes": number,
  "userVote": "up" | "down" | null
}
```

### Categories

#### Get All Categories
```http
GET /api/suggestions/categories
```

**Response:**
```typescript
SuggestionCategory[]
```

#### Get Category Details
```http
GET /api/suggestions/categories/{slug}
```

**Response:**
```typescript
SuggestionCategory & {
  "suggestions": Suggestion[],
  "stats": {
    "totalSuggestions": number,
    "openSuggestions": number,
    "completedSuggestions": number
  }
}
```

### Statistics

#### Get Suggestion Stats
```http
GET /api/suggestions/stats
```

**Response:**
```typescript
SuggestionStats
```

#### Get Trending Suggestions
```http
GET /api/suggestions/trending
```

**Query Parameters:**
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `period` | string | Time period: `week`, `month`, `year` | `week` |
| `limit` | number | Number of suggestions | 10 |

**Response:**
```typescript
{
  "suggestions": Suggestion[],
  "period": string,
  "totalVotes": number
}
```

---

## 📊 Data Models

### Suggestion
```typescript
interface Suggestion {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription?: string;
  category: SuggestionCategory;
  status: SuggestionStatus;
  priority: SuggestionPriority;
  authorId: string;
  author?: SuggestionAuthor;
  upvotes: number;
  downvotes: number;
  totalVotes: number;
  voters: string[];
  tags: string[];
  attachments?: string[];
  estimatedImpact: 'low' | 'medium' | 'high';
  estimatedEffort: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  implementedAt?: Date;
  adminNotes?: string;
  roadmapQuarter?: string;
}
```

### SuggestionAuthor
```typescript
interface SuggestionAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isVerified: boolean;
  suggestionCount: number;
  totalUpvotes: number;
}
```

### SuggestionCategory
```typescript
interface SuggestionCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  suggestionCount: number;
}
```

### SuggestionStatus
```typescript
type SuggestionStatus = 
  | 'open' 
  | 'under-review' 
  | 'planned' 
  | 'in-progress' 
  | 'completed' 
  | 'declined' 
  | 'duplicate';
```

### SuggestionPriority
```typescript
type SuggestionPriority = 'low' | 'medium' | 'high' | 'critical';
```

### SuggestionStats
```typescript
interface SuggestionStats {
  totalSuggestions: number;
  openSuggestions: number;
  completedSuggestions: number;
  totalVotes: number;
  topCategories: Array<{ category: SuggestionCategory; count: number }>;
  topContributors: Array<{ author: SuggestionAuthor; suggestions: number; upvotes: number }>;
  recentActivity: Array<{ type: 'suggestion' | 'comment' | 'vote'; data: any; timestamp: Date }>;
}
```

### SuggestionFilters
```typescript
interface SuggestionFilters {
  category?: string;
  status?: SuggestionStatus;
  priority?: SuggestionPriority;
  author?: string;
  search?: string;
  sortBy?: 'newest' | 'oldest' | 'most-voted' | 'trending' | 'recently-updated';
  tags?: string[];
  page?: number;
  limit?: number;
}
```

---

## ⚠️ Error Handling

### Error Response Format
```typescript
{
  "error": {
    "code": string,
    "message": string,
    "details"?: any,
    "timestamp": string
  }
}
```

### HTTP Status Codes

| Code | Description | Example |
|------|-------------|---------|
| 200 | Success | Suggestion retrieved successfully |
| 201 | Created | New suggestion created |
| 400 | Bad Request | Invalid request body |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Suggestion not found |
| 409 | Conflict | Duplicate suggestion |
| 422 | Validation Error | Invalid data format |
| 429 | Rate Limited | Too many requests |
| 500 | Internal Server Error | Server error |

### Common Error Codes

#### Validation Errors (422)
```typescript
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "title": ["Title is required"],
      "description": ["Description must be at least 10 characters"]
    }
  }
}
```

#### Not Found (404)
```typescript
{
  "error": {
    "code": "SUGGESTION_NOT_FOUND",
    "message": "Suggestion with ID '123' not found"
  }
}
```

#### Unauthorized (401)
```typescript
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

#### Rate Limited (429)
```typescript
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please try again in 60 seconds",
    "details": {
      "retryAfter": 60
    }
  }
}
```

---

## 🚦 Rate Limiting

### Rate Limits
- **Anonymous Users:** 100 requests per hour
- **Authenticated Users:** 1000 requests per hour
- **Voting:** 10 votes per minute per user
- **Suggestion Creation:** 5 suggestions per hour per user

### Rate Limit Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
Retry-After: 60
```

### Handling Rate Limits
```typescript
// Check rate limit headers
const remaining = response.headers.get('X-RateLimit-Remaining');
const reset = response.headers.get('X-RateLimit-Reset');

if (response.status === 429) {
  const retryAfter = response.headers.get('Retry-After');
  // Wait for retryAfter seconds before retrying
}
```

---

## 💡 Examples

### JavaScript/TypeScript

#### Fetch API
```typescript
class SuggestionAPI {
  private baseURL = 'https://fynorra.com/api';

  async getSuggestions(filters: SuggestionFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });

    const response = await fetch(`${this.baseURL}/suggestions?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async createSuggestion(suggestionData: CreateSuggestionRequest) {
    const response = await fetch(`${this.baseURL}/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(suggestionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  }

  async voteOnSuggestion(suggestionId: string, voteType: 'up' | 'down') {
    const response = await fetch(`${this.baseURL}/suggestions/${suggestionId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voteType }),
    });

    return response.json();
  }
}

// Usage
const api = new SuggestionAPI();

// Get suggestions
const suggestions = await api.getSuggestions({
  category: 'ai-features',
  sortBy: 'most-voted',
  page: 1,
  limit: 12
});

// Create suggestion
const newSuggestion = await api.createSuggestion({
  title: 'Add Dark Mode Support',
  description: 'Implement dark mode theme for better user experience',
  categoryId: '3',
  tags: ['ui', 'dark-mode']
});

// Vote on suggestion
const voteResult = await api.voteOnSuggestion('123', 'up');
```

#### Axios
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fynorra.com/api',
  timeout: 10000,
});

// Request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle authentication error
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const suggestionAPI = {
  getSuggestions: (filters: SuggestionFilters) => 
    api.get('/suggestions', { params: filters }),
  
  createSuggestion: (data: CreateSuggestionRequest) => 
    api.post('/suggestions', data),
  
  voteOnSuggestion: (id: string, voteType: 'up' | 'down') => 
    api.post(`/suggestions/${id}/vote`, { voteType }),
};
```

### Python

#### Requests Library
```python
import requests
import json
from typing import Dict, Any, Optional

class SuggestionAPI:
    def __init__(self, base_url: str = "https://fynorra.com/api"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    
    def set_auth_token(self, token: str):
        self.session.headers.update({'Authorization': f'Bearer {token}'})
    
    def get_suggestions(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Get suggestions with optional filtering"""
        response = self.session.get(f"{self.base_url}/suggestions", params=filters)
        response.raise_for_status()
        return response.json()
    
    def create_suggestion(self, suggestion_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new suggestion"""
        response = self.session.post(
            f"{self.base_url}/suggestions",
            json=suggestion_data
        )
        response.raise_for_status()
        return response.json()
    
    def vote_on_suggestion(self, suggestion_id: str, vote_type: str) -> Dict[str, Any]:
        """Vote on a suggestion"""
        response = self.session.post(
            f"{self.base_url}/suggestions/{suggestion_id}/vote",
            json={"voteType": vote_type}
        )
        response.raise_for_status()
        return response.json()

# Usage
api = SuggestionAPI()

# Get suggestions
suggestions = api.get_suggestions({
    'category': 'ai-features',
    'sortBy': 'most-voted',
    'page': 1,
    'limit': 12
})

# Create suggestion
new_suggestion = api.create_suggestion({
    'title': 'Add Dark Mode Support',
    'description': 'Implement dark mode theme for better user experience',
    'categoryId': '3',
    'tags': ['ui', 'dark-mode']
})

# Vote on suggestion
vote_result = api.vote_on_suggestion('123', 'up')
```

### cURL Examples

#### Get Suggestions
```bash
# Get all suggestions
curl -X GET "https://fynorra.com/api/suggestions"

# Get suggestions with filters
curl -X GET "https://fynorra.com/api/suggestions?category=ai-features&sortBy=most-voted&page=1&limit=12"

# Search suggestions
curl -X GET "https://fynorra.com/api/suggestions?search=dark+mode"
```

#### Create Suggestion
```bash
curl -X POST "https://fynorra.com/api/suggestions" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Add Dark Mode Support",
    "description": "Implement dark mode theme for better user experience",
    "categoryId": "3",
    "tags": ["ui", "dark-mode", "accessibility"],
    "estimatedImpact": "medium",
    "estimatedEffort": "low"
  }'
```

#### Vote on Suggestion
```bash
curl -X POST "https://fynorra.com/api/suggestions/123/vote" \
  -H "Content-Type: application/json" \
  -d '{"voteType": "up"}'
```

---

## 🔌 SDK Examples

### React Hook
```typescript
import { useState, useEffect } from 'react';

interface UseSuggestionsOptions {
  filters?: SuggestionFilters;
  autoFetch?: boolean;
}

export function useSuggestions(options: UseSuggestionsOptions = {}) {
  const { filters = {}, autoFetch = true } = options;
  
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<SuggestionStats | null>(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });

      const response = await fetch(`/api/suggestions?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      
      const data = await response.json();
      setSuggestions(data.suggestions);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchSuggestions();
    }
  }, [JSON.stringify(filters), autoFetch]);

  return {
    suggestions,
    loading,
    error,
    stats,
    refetch: fetchSuggestions,
  };
}

// Usage in component
function SuggestionsList() {
  const { suggestions, loading, error, stats } = useSuggestions({
    filters: { category: 'ai-features', sortBy: 'most-voted' }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {suggestions.map(suggestion => (
        <SuggestionCard key={suggestion.id} suggestion={suggestion} />
      ))}
    </div>
  );
}
```

### Vue.js Composition API
```typescript
import { ref, computed, onMounted } from 'vue';

export function useSuggestions(filters = {}) {
  const suggestions = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const stats = ref(null);

  const fetchSuggestions = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });

      const response = await fetch(`/api/suggestions?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      
      const data = await response.json();
      suggestions.value = data.suggestions;
      stats.value = data.stats;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchSuggestions);

  return {
    suggestions,
    loading,
    error,
    stats,
    refetch: fetchSuggestions,
  };
}
```

---

## 🔔 Webhooks (Phase 2)

### Webhook Events
```typescript
type WebhookEvent = 
  | 'suggestion.created'
  | 'suggestion.updated'
  | 'suggestion.status_changed'
  | 'suggestion.voted'
  | 'comment.created'
  | 'user.registered';
```

### Webhook Payload
```typescript
interface WebhookPayload {
  event: WebhookEvent;
  timestamp: string;
  data: any;
  signature: string;
}
```

### Webhook Configuration
```http
POST /api/webhooks
{
  "url": "https://your-app.com/webhooks/fynorra",
  "events": ["suggestion.created", "suggestion.voted"],
  "secret": "your_webhook_secret"
}
```

### Webhook Verification
```typescript
function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

---

## 📚 Additional Resources

### Documentation
- [Suggestion System Guide](./SEO_SUGGESTION_SYSTEM_GUIDE.md)
- [Phase 2 Roadmap](./ROADMAP_PHASE2_TASKS.md)
- [Integration Examples](./integration-examples.md)

### Support
- **API Status:** [status.fynorra.com](https://status.fynorra.com)
- **Documentation:** [docs.fynorra.com](https://docs.fynorra.com)
- **Support:** [support@fynorra.com](mailto:support@fynorra.com)

### SDKs & Libraries
- **JavaScript/TypeScript:** [@fynorra/suggestion-sdk](https://npmjs.com/package/@fynorra/suggestion-sdk)
- **Python:** [fynorra-suggestions](https://pypi.org/project/fynorra-suggestions)
- **React:** [@fynorra/react-suggestions](https://npmjs.com/package/@fynorra/react-suggestions)

---

*API Documentation Version: 1.0*  
*Last Updated: December 2024*  
*Next Review: March 2025* 