'use client'
import { authenticate } from "#/actions/users";
import Link from "next/link";
import { useFormState } from "react-dom";

export function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined)

  return (
    <form className="w-fit p-10 border rounded" action={dispatch}>
      <h1 className="mb-10 font-medium text-lg text-gray-600">Faça login para continuar</h1>
      <div className="grid gap-1 mb-4">
        <label htmlFor="email" className="text-gray-600">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="email@hotmail.com"
          className="max-w-xs h-9 px-2 text-sm placeholder:text-gray-300 border rounded"
        />
      </div>
      <div className="grid gap-1 mb-6">
        <label htmlFor="email" className="text-gray-600">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          className="max-w-xs h-9 px-2 text-sm placeholder:text-gray-300 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 mb-4  bg-violet-50 hover:bg-violet-100 border rounded"
      >
        Acessar
      </button>

      <p className="w-full">
        Ainda não tem uma conta? {' '}
        <Link href="/auth/register" className="text-violet-500 hover:underline">Crie gratuitamente.</Link>
      </p>
    </form>
  )
}