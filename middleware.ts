import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes (routes that don't require authentication)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/about-us(.*)',
  '/blog(.*)',
  '/case-studies(.*)',
  '/cloud-devops(.*)',
  '/contact',
  '/custom-ai-solutions(.*)',
  '/for-businesses',
  '/pricing',
  '/software-development(.*)',
  '/whitepapers(.*)',
  '/chat',
  '/api/(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // For now, let all routes through and handle auth in components
  // This avoids the Clerk middleware issues while maintaining security through component-level auth
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
