// src/app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Fynorra',
  description: 'Create a new Fynorra account.',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#101820] to-[#1e1e2f] p-4">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
