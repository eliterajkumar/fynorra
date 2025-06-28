import { Metadata } from 'next';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { UserProfile } from '@/components/dashboard/user-profile';

export const metadata: Metadata = {
  title: 'Profile - Fynorra Blog Platform',
  description: 'Manage your profile and account settings on Fynorra.',
  keywords: [
    'profile',
    'account settings',
    'user profile',
    'Fynorra profile'
  ],
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-slate-300">
            Manage your account information and preferences
          </p>
        </div>

        <UserProfile />
      </main>
    </div>
  );
} 