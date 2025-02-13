import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in", 
  "/sign-up", 
  "/models", 
  "/contact", 
  "/the-ai-codex", // ✅ Added public routes
  "/services",
  "/ai-consulting", // ✅ Added public routes
  "/ai-integration", // ✅ Added public routes
  "/computer-vision", // ✅ Added public routes
  "/machine-learning", // ✅ Added public routes
  "/nlp", // ✅ Added public routes
  "/predictive-analytics" // ✅ Added public routes (No comma on last element)
]);


export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const currentURL = new URL(req.url);

  // ✅ Redirect logged-in users away from auth pages (except home)
  if (userId && isPublicRoute(req) && currentURL.pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Allow public pages, block protected ones
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], 
};
