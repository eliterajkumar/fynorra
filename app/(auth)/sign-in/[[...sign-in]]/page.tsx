"use client"; // ✅ Mark this as a Client Component

import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard"); // ✅ Redirect if user is signed in
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}
