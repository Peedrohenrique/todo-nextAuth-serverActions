import NextAuth from "next-auth";
import { z } from "zod";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "#/actions/users";
import bcrypt from "bcrypt";

const credentialsSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

const providers = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error(parsedCredentials.error.message);
        }

        const { email, password } = parsedCredentials.data;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
};

export const { auth, signIn, signOut } = NextAuth(providers);
