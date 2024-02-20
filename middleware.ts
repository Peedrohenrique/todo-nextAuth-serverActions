import NextAuth from "next-auth";
import { authConfig } from "#/app/auth/auth.config";

export default NextAuth(authConfig).auth;