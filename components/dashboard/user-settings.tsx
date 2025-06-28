'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Mail, 
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Save,
  X
} from 'lucide-react';

export function UserSettings() {
  const { user, isLoaded } = useUser();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    blogUpdates: true,
    comments: true,
    mentions: true
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showLastSeen: true,
    allowComments: true
  });
  const [theme, setTheme] = useState('dark');

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-700/50 rounded w-1/4"></div>
              <div className="h-8 bg-slate-700/50 rounded w-1/2"></div>
              <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-6 text-center">
          <p className="text-slate-400">Please sign in to access settings.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary" />
            <CardTitle className="text-white">Notification Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-slate-400 text-sm">Receive notifications via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Push Notifications</p>
              <p className="text-slate-400 text-sm">Receive browser push notifications</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Blog Updates</p>
              <p className="text-slate-400 text-sm">Get notified about new blog features</p>
            </div>
            <Switch
              checked={notifications.blogUpdates}
              onCheckedChange={(checked) => setNotifications({...notifications, blogUpdates: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Comment Notifications</p>
              <p className="text-slate-400 text-sm">Get notified when someone comments on your posts</p>
            </div>
            <Switch
              checked={notifications.comments}
              onCheckedChange={(checked) => setNotifications({...notifications, comments: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Mention Notifications</p>
              <p className="text-slate-400 text-sm">Get notified when someone mentions you</p>
            </div>
            <Switch
              checked={notifications.mentions}
              onCheckedChange={(checked) => setNotifications({...notifications, mentions: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle className="text-white">Privacy Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Public Profile</p>
              <p className="text-slate-400 text-sm">Allow others to view your profile</p>
            </div>
            <Switch
              checked={privacy.profilePublic}
              onCheckedChange={(checked) => setPrivacy({...privacy, profilePublic: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Show Email</p>
              <p className="text-slate-400 text-sm">Display your email on your profile</p>
            </div>
            <Switch
              checked={privacy.showEmail}
              onCheckedChange={(checked) => setPrivacy({...privacy, showEmail: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Show Last Seen</p>
              <p className="text-slate-400 text-sm">Show when you were last active</p>
            </div>
            <Switch
              checked={privacy.showLastSeen}
              onCheckedChange={(checked) => setPrivacy({...privacy, showLastSeen: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Allow Comments</p>
              <p className="text-slate-400 text-sm">Allow others to comment on your posts</p>
            </div>
            <Switch
              checked={privacy.allowComments}
              onCheckedChange={(checked) => setPrivacy({...privacy, allowComments: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-primary" />
            <CardTitle className="text-white">Appearance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-white font-medium mb-3">Theme</p>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  className={theme === 'light' ? 'bg-primary' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  className={theme === 'dark' ? 'bg-primary' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  className={theme === 'system' ? 'bg-primary' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}
                  onClick={() => setTheme('system')}
                >
                  System
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-primary" />
            <CardTitle className="text-white">Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-white font-medium">Email Address</p>
                <p className="text-slate-400 text-sm">{user.emailAddresses[0]?.emailAddress}</p>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-400">Verified</Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-slate-400 text-sm">Add an extra layer of security</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              Enable
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-white font-medium">Active Sessions</p>
                <p className="text-slate-400 text-sm">Manage your active sessions</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              View All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
} 