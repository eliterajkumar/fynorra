'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  User, 
  BookOpen, 
  BarChart3,
  Plus
} from 'lucide-react';
import { useUser, SignOutButton } from '@clerk/nextjs';

export function DashboardHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isLoaded } = useUser();

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || user.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase() || 'U';
  };

  // Get display name
  const getDisplayName = () => {
    if (!user) return 'User';
    return user.fullName || user.emailAddresses[0]?.emailAddress || 'User';
  };

  // Get email
  const getEmail = () => {
    if (!user) return '';
    return user.emailAddresses[0]?.emailAddress || '';
  };

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white">
                <span className="text-primary">Fynorra</span> Blog
              </h1>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/dashboard" 
                className="text-white hover:text-primary transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/write" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                Write
              </Link>
              <Link 
                href="/dashboard/posts" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                My Posts
              </Link>
              <Link 
                href="/dashboard/analytics" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                Analytics
              </Link>
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your posts..."
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-primary w-64"
              />
            </div>

            {/* Write Button */}
            <Link href="/dashboard/write">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Write
              </Button>
            </Link>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>

            {/* Profile Section */}
            {isLoaded && (
              <div className="flex items-center space-x-2">
                {/* Custom Profile Dropdown */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-slate-300 hover:text-white"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      {user?.imageUrl ? (
                        <img 
                          src={user.imageUrl} 
                          alt={getDisplayName()}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-primary font-semibold text-sm">
                          {getUserInitials()}
                        </span>
                      )}
                    </div>
                    <span className="hidden md:block">{getDisplayName()}</span>
                  </Button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm font-medium text-white">{getDisplayName()}</p>
                        <p className="text-sm text-slate-400">{getEmail()}</p>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          href="/dashboard/profile"
                          className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </Link>
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </Link>
                        <Link
                          href="/dashboard/analytics"
                          className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <BarChart3 className="w-4 h-4 mr-3" />
                          Analytics
                        </Link>
                      </div>
                      
                      <div className="border-t border-slate-700 pt-2">
                        <SignOutButton>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300">
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign out
                          </button>
                        </SignOutButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 