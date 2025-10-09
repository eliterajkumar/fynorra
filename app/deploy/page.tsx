'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check, Code, Globe } from 'lucide-react'

export default function DeployPage() {
  const [apiKey, setApiKey] = useState(() => `sk-${Math.random().toString(36).slice(2, 10)}-${Math.random().toString(36).slice(2, 10)}`)
  const [copied, setCopied] = useState(false)
  const [copiedEmbed, setCopiedEmbed] = useState(false)
  const [webhook, setWebhook] = useState('')
  const [saved, setSaved] = useState(false)

  const copyToClipboard = async (text: string, type: 'key' | 'embed') => {
    await navigator.clipboard.writeText(text)
    if (type === 'key') {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      setCopiedEmbed(true)
      setTimeout(() => setCopiedEmbed(false), 2000)
    }
  }

  const saveWebhook = () => {
    if (!webhook.trim()) return
    // TODO: connect to /api/webhook
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const embedCode = `<script src="https://yourdomain.com/widget.js" data-key="${apiKey}"></script>`

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 overflow-auto ml-0 md:ml-64">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">⚙️ Deploy / Integrate</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                Connect your AI Assistant via API, embed, or webhooks.
              </p>
            </div>
          </div>

          {/* API Key Section */}
          <Card>
            <CardHeader>
              <CardTitle>API Key</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input value={apiKey} readOnly className="flex-1 font-mono" />
                <Button onClick={() => copyToClipboard(apiKey, 'key')} variant="outline">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Use this key to authenticate requests to your assistant's API.
              </p>
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    const newKey = `sk-${Math.random().toString(36).slice(2, 10)}-${Math.random().toString(36).slice(2, 10)}`
                    setApiKey(newKey)
                  }}
                  variant="ghost"
                  className="text-xs"
                >
                  Regenerate Key
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Embed Widget Section */}
          <Card>
            <CardHeader>
              <CardTitle>Embed Widget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-md border dark:border-slate-700 p-4 font-mono text-xs overflow-auto">
                {embedCode}
              </div>

              <div className="flex justify-between items-center">
                <Button onClick={() => copyToClipboard(embedCode, 'embed')} variant="outline">
                  {copiedEmbed ? <Check className="h-4 w-4 text-green-500 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Embed Code
                </Button>
                <Button
                  variant="default"
                  onClick={() => window.open('https://yourdomain.com/widget-preview', '_blank')}
                  className="flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" /> Preview Widget
                </Button>
              </div>

              <p className="text-sm text-gray-500 dark:text-slate-400">
                Add this script before the closing <code>&lt;/body&gt;</code> tag on your site to enable instant chat.
              </p>
            </CardContent>
          </Card>

          {/* Webhook Setup */}
          <Card>
            <CardHeader>
              <CardTitle>Webhook Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Receive real-time events for training completions, user interactions, and analytics.
              </p>

              <div className="flex items-center gap-3">
                <Input
                  placeholder="https://yourdomain.com/webhook"
                  value={webhook}
                  onChange={(e) => setWebhook(e.target.value)}
                />
                <Button onClick={saveWebhook} disabled={!webhook.trim()}>
                  {saved ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                  {saved ? 'Saved!' : 'Save'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Code Example Section */}
          <Card>
            <CardHeader>
              <CardTitle>Example API Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 dark:bg-slate-800 border dark:border-slate-700 rounded-md p-4 font-mono text-xs overflow-auto">
{`curl -X POST https://api.yourdomain.com/v1/chat \\
 -H "Authorization: Bearer ${apiKey}" \\
 -H "Content-Type: application/json" \\
 -d '{
  "assistant_id": "asst_001",
  "message": "Summarize uploaded company policy."
 }'`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
