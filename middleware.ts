import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ✅ Public routes (make sure all start with '/')
const publicRoutes = [
  "/",
  "/about",
  "/custom-ai-solutions",
  "/ai-platform",
  "/for-businesses",
  "/contact",
  "/login",
  "/services",
  "/privacy-policy",
  "/terms-of-service",
  "/learning",
  "/cloud-devops", 
  "/case-studies",
  "/blog",
  "/about-us",
  "/software-development",
  "/whitepapers",
];

const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const currentURL = new URL(req.url);

  // ✅ Allow static files and Next.js internals
  if (
    currentURL.pathname.startsWith("/_next/") ||
    currentURL.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ✅ Redirect logged-in users away from auth pages
  if (userId && ["/sign-in", "/sign-up"].includes(currentURL.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Redirect unauthenticated users from protected routes
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

// ✅ Middleware config: run on all routes except API and static files
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
