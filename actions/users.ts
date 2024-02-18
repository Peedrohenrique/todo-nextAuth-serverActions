'use server'
import { sql } from "@vercel/postgres"
import { z } from "zod"
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation"

const UserSchema = z.object({
    id: z.string(),
    name: z
    .string({ required_error: 'O nome é obrigatório'})
    .min(3, 'O nome deve conter no mínimo 3 caracteres'),
    email: z.string().email('Insira um e-mail válido'),
    password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
    image: z.string(),
    role: z.string()
})

const CreateUser = UserSchema.omit({ id: true, image: true, role: true})

type CreateUserState = {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
}

export async function createUser(state: CreateUserState, formData: FormData) {

    const validatedFields = CreateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Preencha todos os campos'
        }
    }

    const { name, email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)
    const githubImage = `https://github.com/${name}.png`
    const role = 'user'

    try {
        await sql`
        INSERT INTO users (name, email, password, image, role)
        VALUES (${name}, ${email}, ${hashedPassword}, ${githubImage}, ${role})
        `
    } catch (error) {
        return { message: 'Falha ao inserir usuário no banco de dados.'}
    }

    redirect('/auth/login')
}