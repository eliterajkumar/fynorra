"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const router = useRouter();

  return (
    <div className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Button className="ml-4" onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
      </SignedIn>
    </div>
  );
}
