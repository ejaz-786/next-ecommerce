import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/products", "/cart", "/profile"];
const publicRoutes = ["/", "/login"];
const authRoutes = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // Check if the route is protected
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isPublic = publicRoutes.some(
    (route) =>
      route === "/"
        ? pathname === "/"
        : pathname === route || pathname.startsWith(`${route}/`),
  );

  // If there's no token
  if (!token) {
    // Allow public routes
    if (isPublic) {
      return NextResponse.next();
    }
    // Redirect to login for protected routes
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Redirect to products for auth routes
    if (isAuthRoute) {
      return NextResponse.next();
    }
  }

  // If there's a token
  if (token) {
    // Redirect from login to products if already authenticated
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
    // Allow access to protected routes
    if (isProtected) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static assets, images, etc.
    "/((?!_next|_vercel|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/api/:path*",
  ],
};
