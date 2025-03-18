import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // const protectedRoutes = ["/auth/account/new", "/fanzone"];

  // Redirect to signin if not logged in
  if ([""].includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

// Ensure matcher is correctly set
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"], // ✅ Match all routes except Next.js internal ones
};
