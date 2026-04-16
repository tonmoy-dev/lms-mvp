import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/learn", "/instructor"];
const authPaths = ["/signin", "/register"];

/** Default export is required for Next.js 16 proxy static analysis (`export function proxy` is not detected). */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.get("devpath_auth")?.value === "1";

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPath = authPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
