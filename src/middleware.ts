import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decode } from "next-auth/jwt";

// Session durations must match auth.ts
const INACTIVITY_TIMEOUT_SECONDS = 60 * 60; // 1 hour

const ALL_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

interface DecodedToken {
  email?: string;
  id?: string;
  role?: string;
  createdAt?: number;
  lastActive?: number;
  maxLifetime?: number;
  iat?: number;
}

async function getVerifiedSession(
  req: NextRequest
): Promise<{ token: DecodedToken; cookieName: string } | null> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  for (const name of ALL_COOKIE_NAMES) {
    const val = req.cookies.get(name)?.value;
    if (!val) continue;
    try {
      const decoded = (await decode({
        token: val,
        secret,
        salt: name,
      })) as DecodedToken | null;
      if (decoded?.id && decoded?.role) {
        return { token: decoded, cookieName: name };
      }
    } catch {
      // Invalid token — try next cookie name
    }
  }
  return null;
}

function clearCookiesResponse(
  destination: string,
  req: NextRequest
): NextResponse {
  const response = NextResponse.redirect(new URL(destination, req.url));
  for (const name of ALL_COOKIE_NAMES) {
    response.cookies.delete(name);
  }
  return response;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isSuperAdminRoute = pathname.startsWith("/superadmin");

  if (!isAdminRoute && !isSuperAdminRoute) {
    return NextResponse.next();
  }

  const isAdminLogin = pathname === "/admin/login";
  const isSuperAdminLogin = pathname === "/superadmin/login";
  const isLoginPage = isAdminLogin || isSuperAdminLogin;

  const result = await getVerifiedSession(req);

  if (!result) {
    if (isLoginPage) return NextResponse.next();
    // Unauthenticated — redirect to appropriate login
    const loginUrl = isSuperAdminRoute
      ? "/superadmin/login"
      : "/admin/login";
    const redirectTo = new URL(loginUrl, req.url);
    if (!isLoginPage) {
      redirectTo.searchParams.set("callbackUrl", pathname);
    }
    return clearCookiesResponse(redirectTo.toString(), req);
  }

  const { token } = result;
  const now = Math.floor(Date.now() / 1000);

  // Check absolute session lifetime
  const maxLifetime = (token.maxLifetime as number) || 0;
  if (maxLifetime > 0 && now > maxLifetime) {
    const loginUrl = isSuperAdminRoute ? "/superadmin/login?reason=expired" : "/admin/login?reason=expired";
    return clearCookiesResponse(loginUrl, req);
  }

  // Check inactivity timeout
  const lastActive = (token.lastActive as number) || (token.iat as number) || 0;
  if (lastActive > 0 && now - lastActive > INACTIVITY_TIMEOUT_SECONDS) {
    const loginUrl = isSuperAdminRoute ? "/superadmin/login?reason=timeout" : "/admin/login?reason=timeout";
    return clearCookiesResponse(loginUrl, req);
  }

  const role = token.role as string;

  // Superadmin routes: only "superadmin" role allowed
  if (isSuperAdminRoute) {
    if (role !== "superadmin") {
      // Wrong role — redirect to admin login, not superadmin
      return clearCookiesResponse("/admin/login?reason=unauthorized", req);
    }
    // Authenticated superadmin on login page → dashboard
    if (isSuperAdminLogin) {
      return NextResponse.redirect(new URL("/superadmin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Admin routes: admin, content_manager, superadmin all allowed
  if (isAdminRoute) {
    const allowedRoles = ["admin", "superadmin", "content_manager"];
    if (!allowedRoles.includes(role)) {
      return clearCookiesResponse("/admin/login?reason=unauthorized", req);
    }
    // Authenticated user on admin login page → dashboard
    if (isAdminLogin) {
      // Superadmin → their own panel
      const dest = role === "superadmin" ? "/superadmin/dashboard" : "/admin/dashboard";
      return NextResponse.redirect(new URL(dest, req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/superadmin/:path*"],
};
