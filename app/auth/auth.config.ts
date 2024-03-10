import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: '/auth/login'},
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPrivateRoutes = nextUrl.pathname.startsWith("/private");
      const isAuthRoutes = nextUrl.pathname.startsWith("/auth");
      const isTodosRoute = nextUrl.pathname.startsWith("/todos");

      if (!isLoggedIn && (isPrivateRoutes || isTodosRoute)) {
        return false;
      }

      if (isLoggedIn && isAuthRoutes) {
        return Response.redirect(new URL('/todos', nextUrl))
      }

      return true;
      
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      if (user) token.id = user.id;
      return token
    },
    session({ session, token }) {
      if (token.role) session.user.role = token.role
      if (token.id) session.user.id = token.id
      return session
    }
  },
  providers: [],
} as NextAuthConfig;
