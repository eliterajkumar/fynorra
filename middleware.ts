import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in", 
  "/sign-up", 
  "/models", 
  "/contact", 
  "/the-ai-codex", 
  "/services/ai-consulting",
  "/services/ai-integration",
  "/services/computer-vision",
  "/services/machine-learning",
  "/services/nlp",
  "/services/predictive-analytics"
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const currentURL = new URL(req.url);

  // ✅ Allow static assets (CSS, images, etc.)
  if (
    currentURL.pathname.startsWith("/_next/") ||
    currentURL.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // ✅ Redirect logged-in users away from auth pages
  if (userId && ["/sign-in", "/sign-up"].includes(currentURL.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Allow public pages even after login
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

// ✅ Fix CSS & Page loading issue
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], 
};
