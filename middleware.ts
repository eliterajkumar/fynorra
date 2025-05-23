import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes (routes that don't require authentication)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/about-us',
  '/blog(.*)', // Allow access to blog posts and categories
  '/case-studies(.*)',
  '/cloud-devops(.*)',
  '/contact',
  '/custom-ai-solutions(.*)',
  '/for-businesses',
  '/pricing',
  '/software-development(.*)',
  '/whitepapers(.*)',
  '/api/(.*)', // Assuming API routes might be public or handle their own auth
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect(); // Protect all other routes
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
