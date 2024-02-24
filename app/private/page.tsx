import { auth } from "../auth/providers";
import { TodoForm } from "./create-todo";

export default async function PrivatePage() {
  const session = await auth()
  const name = session?.user?.name;
  const id = session?.user?.id
  const firstName = name?.split(" ")[0];
  return (
    <main className="w-full max-w-3xl mx-auto p-10 border rounded-md">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-medium text-gray-600 mb-6">
          Olá <strong>{firstName}</strong>, vamos adicionar uma tarefa?
        </h1>
        <TodoForm user_id={id}/>
      </div>
    </main>
  )
}