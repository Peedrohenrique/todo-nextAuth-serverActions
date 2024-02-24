import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full max-w-3xl mx-auto p-10 border rounded-md bg-gray-100">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bem-vindo ao Minhas Tarefas!</h1>
        <p className="text-lg text-gray-600 mb-8">Organize suas tarefas de forma simples e eficiente.</p>
        <Link href="/todos" className="flex items-center justify-center px-6 py-3 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors duration-300 ease-in-out">
            Ver Tarefas
        </Link>
      </div>
    </main>
  );
}
