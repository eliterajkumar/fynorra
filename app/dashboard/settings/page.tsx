import { Metadata } from 'next';
import { UserSettings } from '@/components/dashboard/user-settings';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Settings - Fynorra Dashboard',
  description: 'Manage your account settings and preferences on Fynorra.',
};

export default function SettingsPage() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <UserSettings />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 