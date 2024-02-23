import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: '/auth/login'},
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPrivateRoutes = nextUrl.pathname.startsWith("/private");
      const isAuthRoutes = nextUrl.pathname.startsWith("/auth");

      if (!isLoggedIn && isPrivateRoutes) {
        return false; // Redirecionar usuários não autenticados para a página de login
      }

      if (isLoggedIn && isAuthRoutes) {
        return "/private"; // Redirecionar usuários autenticados para a página privada
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
