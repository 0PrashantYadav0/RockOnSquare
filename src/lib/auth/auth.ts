import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { checkRateLimit, clearRateLimit } from "@/lib/utils";
import { prisma } from "@/lib/db/prisma";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Session durations (seconds)
const SESSION_DURATIONS = {
  admin: 24 * 60 * 60,       // 24 hours
  superadmin: 7 * 24 * 60 * 60, // 7 days
  content_manager: 24 * 60 * 60,
} as const;

// Inactivity timeout (applies to all roles)
const INACTIVITY_TIMEOUT_SECONDS = 60 * 60; // 1 hour inactivity = re-login

const useSecureCookies = process.env.NODE_ENV === "production";
const cookiePrefix = useSecureCookies ? "__Secure-" : "";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    // maxAge is overridden per-role in jwt callback; set max possible here
    maxAge: SESSION_DURATIONS.superadmin,
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    Credentials({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        panel: { label: "Panel", type: "text" }, // "admin" | "superadmin"
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const panel = (credentials?.panel as string) || "admin";
        const normalizedEmail = email.trim().toLowerCase();

        // Rate limiting: 5 failed attempts per 15 minutes per email
        const rateLimitKey = `admin-login:${normalizedEmail}`;
        const rateCheck = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
        if (!rateCheck.allowed) {
          throw new Error(
            "Too many login attempts. Please try again after 15 minutes."
          );
        }

        // Look up user in database
        let user;
        try {
          user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
          });
        } catch {
          // DB unavailable — reject with generic message
          return null;
        }

        if (!user || !user.isActive) return null;

        // Enforce role access by panel
        if (panel === "superadmin" && user.role !== "superadmin") {
          return null;
        }
        if (panel === "admin" && !["admin", "superadmin", "content_manager"].includes(user.role)) {
          return null;
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        clearRateLimit(rateLimitKey);

        // Update last login timestamp
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          });
        } catch {
          // Non-fatal
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);

      if (user) {
        // Initial sign-in: set role-based session lifetime
        const role = (user.role as string) || "admin";
        const lifetimeSeconds =
          SESSION_DURATIONS[role as keyof typeof SESSION_DURATIONS] ??
          SESSION_DURATIONS.admin;

        token.id = user.id;
        token.email = user.email ?? "";
        token.role = role;
        token.createdAt = now;
        token.lastActive = now;
        token.maxLifetime = now + lifetimeSeconds;
        return token;
      }

      // Subsequent requests: enforce expiry server-side
      const createdAt = (token.createdAt as number) || now;
      const lastActive = (token.lastActive as number) || now;
      const maxLifetime = (token.maxLifetime as number) || now + SESSION_DURATIONS.admin;

      // 1. Absolute maximum lifetime (role-based)
      if (now > maxLifetime) {
        return null; // Force re-login
      }

      // 2. Inactivity timeout
      if (now - lastActive > INACTIVITY_TIMEOUT_SECONDS) {
        return null;
      }

      // 3. Verify user is still active in DB (check every 5 minutes)
      const lastActiveAge = now - lastActive;
      if (lastActiveAge > 5 * 60) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { isActive: true, role: true },
          });
          if (!dbUser || !dbUser.isActive) {
            return null; // Account disabled
          }
          // Role may have changed
          token.role = dbUser.role;
        } catch {
          // DB error — allow token to proceed but don't update
        }
      }

      // Refresh last activity timestamp
      token.lastActive = now;
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.maxLifetime = token.maxLifetime as number;
      }
      return session;
    },
  },
});
