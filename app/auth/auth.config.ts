import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: '/auth/login'},
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
    jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    session({ session, token }) {
      if (token.role) session.user.role = token.role
      return session
    }
  },
  providers: [],
} as NextAuthConfig;
