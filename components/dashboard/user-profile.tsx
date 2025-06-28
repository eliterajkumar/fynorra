'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Edit, 
  Save, 
  X,
  Camera,
  Globe,
  MapPin,
  Briefcase,
  BookOpen
} from 'lucide-react';

export function UserProfile() {
  const { user, isLoaded } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          <p className="text-slate-400">Please sign in to view your profile.</p>
        </CardContent>
      </Card>
    );
  }

  const getUserInitials = () => {
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
  };

  const getDisplayName = () => {
    return user.fullName || user.emailAddresses[0]?.emailAddress || 'User';
  };

  const getEmail = () => {
    return user.emailAddresses[0]?.emailAddress || '';
  };

  const getCreatedDate = () => {
    return user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown';
  };

  const getLastSignIn = () => {
    return user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : 'Unknown';
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Profile Information</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                  {user.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={getDisplayName()}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-primary font-bold text-2xl">
                      {getUserInitials()}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 w-8 h-8 p-0 border-slate-600 bg-slate-800"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-400 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <p className="text-white font-medium mt-1">{getDisplayName()}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-400 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <p className="text-white font-medium mt-1">{getEmail()}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-400 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Member Since
                  </label>
                  <p className="text-white font-medium mt-1">{getCreatedDate()}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-400 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Last Sign In
                  </label>
                  <p className="text-white font-medium mt-1">{getLastSignIn()}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Status */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white">Account Active</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400">Verified</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-white">Email Verification</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400">Verified</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span className="text-white">Blog Author</span>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Shield className="w-4 h-4 mr-2" />
              Security Settings
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Globe className="w-4 h-4 mr-2" />
              Privacy Settings
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <BookOpen className="w-4 h-4 mr-2" />
              My Posts
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Briefcase className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <MapPin className="w-4 h-4 mr-2" />
              Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 