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
        return false; // Redirecionar usuários não autenticados para a página de login
      }

      if (isLoggedIn && isAuthRoutes) {
        return "/private"; // Redirecionar usuários autenticados para a página privada
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
