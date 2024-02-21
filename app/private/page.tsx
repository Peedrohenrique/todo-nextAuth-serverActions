import { auth } from "../auth/providers";
import { TodoForm } from "./create-todo";

export default async function PrivatePage() {
  const session = await auth()
  const name = session?.user?.name
  return (
    <main className="w-full max-w-3xl mx-auto p-10 border rounded-md">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-medium text-gray-600 mb-6">
          Olá <strong>{name}</strong>, seja bem vindo(a) a área privada.
        </h1>
        <pre className="p-10 bg-gray-900 rounded-md my-10 text-gray-50">{JSON.stringify(session, null, 2)}</pre>
        <TodoForm />
      </div>
    </main>
  )
}