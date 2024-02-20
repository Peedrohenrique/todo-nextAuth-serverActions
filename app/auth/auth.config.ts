import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPrivateRoutes = nextUrl.pathname.startsWith("/private");
      const isAuthRoutes = nextUrl.pathname.startsWith("/auth");

      if (!isAuthRoutes && isPrivateRoutes) {
        return false;
      }

      if (isLoggedIn && isAuthRoutes) {
        return Response.redirect(new URL("/private", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} as NextAuthConfig;
