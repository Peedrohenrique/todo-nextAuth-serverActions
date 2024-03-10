"use server";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { User } from "#/types/user";
import { signIn } from "#/app/auth/providers";
import { revalidatePath } from "next/cache";


const UserSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, "O nome deve conter no mínimo 3 caracteres"),
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  image: z.string(),
  role: z.string(),
});

const CreateUser = UserSchema.omit({ id: true, role: true });

type CreateUserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function createUser(state: CreateUserState, formData: FormData) {

  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    image: formData.get("image"),
  
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Preencha todos os campos",
    };
  }

  const { name, email, password, image } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "user";

  try {
    await sql`
        INSERT INTO users (name, email, password, image, role)
        VALUES (${name}, ${email}, ${hashedPassword}, ${image}, ${role})
        `;
  } catch (error) {
    return { message: "Falha ao inserir usuário no banco de dados." };
  }


  // Após inserir o usuário, faça o login automaticamente
  await signIn("credentials", { email, password });

  
  revalidatePath("/todos");
  redirect("/todos");
 
}

export async function getUserByEmail(email: string) {
  try {
    const { rows } =
      await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    return rows[0];
  } catch (error) {
    throw new Error("Este usuário não existe.");
  }
}


type LoginUserState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
};

const LoginSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export async function authenticate(
  state: LoginUserState,
  formData: FormData
): Promise<LoginUserState> {

  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn("credentials", Object.fromEntries(formData));
    
    revalidatePath("/todos");
    redirect("/todos");
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      "CredentialsSignin";
    }
    throw error;
  }
}
