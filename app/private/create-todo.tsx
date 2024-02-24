import { createTodo } from "#/actions/todos";

export function TodoForm({ user_id }: any) {

  return (

    <form action={createTodo}  className="w-80 p-6 border roudned-mg bg-violet-50 rounded">

      <span>Nova tarefa</span>

      <input 
        type="text" 
        name="todo" 
        placeholder="Passear com o pet..."
        className="block w-full p-2 mt-2 border rounded"
      />

      <input 
    type="hidden" 
    name="user_id" 
    value={user_id}
  />

      <button 
        type="submit" 
        className="px-4 py-2 mt-4 bg-violet-100 hover:bg-violet-200 border rounded"
      >
        Adicionar todo
      </button>

    </form>
  )
}