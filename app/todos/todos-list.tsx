import { getFilteredTodos } from "#/actions/todos"
import { auth } from "../auth/providers";
import { CheckTodo } from "./check-todo"
import { DeleteTodo } from "./delete-todo"



export async function TodosList({ query }: {query: string}) {

  const session = await auth();
  
  const id = session?.user?.id

  const todos = await getFilteredTodos(query, String(id))

  return (
    <div>
      {todos.length === 0 ? (
        <p className="w-80 min-h-80 p-8 border rounded-md bg-violet-50">Nenhum resultado encontrado.</p>
      ) : (
        <ul className="w-80 min-h-80 p-8 border rounded-md bg-violet-50">
          {todos.map(todo => (
            <li key={todo.id} className="mb-1">
              <label className="flex items-center gap-2">
                <CheckTodo>{todo.todo}</CheckTodo>
                <DeleteTodo id={todo.id}/>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}