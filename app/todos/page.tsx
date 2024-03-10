import { auth } from "../auth/providers";
import { SearchTodos } from "./search-todos";
import { TodosList } from "./todos-list";

export default async function TodosPage({ searchParams}: { searchParams?: { query?: string}}) {
  const query = searchParams?.query || ""
  const session = await auth()
  const name = session?.user?.name
  const firstName = name?.split(" ")[0];

  return (
    <main className="w-full max-w-3xl mx-auto p-10 border rounded-md">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-medium text-gray-600 mb-10">
          <strong>{firstName}</strong>, seja bem vindo(a).
        </h1>
        <SearchTodos />
        <TodosList query={query}/>
      </div>
  </main>
  )
}