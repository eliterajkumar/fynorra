import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in", "/sign-up"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const currentURL = new URL(req.url);

  // ✅ Fix: Only redirect to /dashboard if user is on sign-in or sign-up pages, NOT home (/)
  if (userId && isPublicRoute(req) && currentURL.pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Fix: If user is NOT logged in & tries to access protected pages, send to home ("/"), not "/sign-in"
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home, not sign-in
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Apply middleware to all pages except API, static files, and Next.js internals
};
