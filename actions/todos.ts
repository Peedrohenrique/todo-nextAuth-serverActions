"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const TodoSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  todo: z.string(),
  created_at: z.string(),
});

const CreateTodo = TodoSchema.omit({ id: true, created_at: true });

//Buscando tarefa do usuário logado no sistema com filtro.
export async function getFilteredTodos(query: string, userId: string) {
  try {
    const { rows } = await sql`
      SELECT *
      FROM todos
      WHERE user_id = ${userId}
      AND todo ILIKE ${`%${query}%`}
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    throw new Error("Falha ao buscar tarefa no banco de dados.");
  }
}


// Criando tarefa do usuário logado no sistema.
export async function createTodo(formData: FormData) {
  const { todo, user_id } = CreateTodo.parse({
    todo: formData.get("todo"),
    user_id: formData.get("user_id"),
  });

  const date = new Date().toISOString();
  
  try {
    await sql`INSERT INTO todos (user_id, todo, created_at) VALUES (${user_id}, ${todo}, ${date})`;
  } catch (error) {
    return { message: "Falha ao criar tarefa." };
  }

  revalidatePath("/todos");
  redirect("/todos");
}

//Editando tarefa do usuário logado no sistema.
export async function updateTodo(
  userId: string,
  todoId: string,
  updatedTodo: { todo: string }
) {
  try {
    const result =
      await sql`UPDATE todos SET todo = ${updatedTodo.todo} WHERE id = ${todoId} AND user_id = ${userId} RETURNING *`;
    if (result.rows && result.rows.length > 0) {
      return { message: "Tarefa atualizada com sucesso" };
    } else {
      return { message: "Não foi possível atualizar a tarefa" };
    }
  } catch (error) {
    console.error("Erro ao atualizar a tarefa:", error);
    return { message: "Erro ao atualizar a tarefa" };
  }
}

//Apagando tarefa do usuário logado no sistema
export async function deleteTodo(id: string) {
  try {
    await sql`DELETE FROM todos WHERE id = ${id}`;
  } catch (error) {
    return { message: "Erro ao excluir a tarefa do banco de dados" };
  }

  revalidatePath("/todos");
}
