import Link from "next/link";

export default function RegisterForm() {

  return (
    <form className="w-96 p-10 border rounded">
      <h1 className="mb-9 font-medium text-lg text-gray-600 text-center">Crie uma conta para continuar</h1>

      <div className="flex justify-center mb-4">
        <button >
          <input
            className="rounded-full w-20"
            name="image"
            type="image"
            src="https://img.freepik.com/fotos-gratis/ilustracao-3d-de-um-adolescente-com-um-rosto-engracado-e-oculos_1142-50955.jpg"
            alt="Imagem de perfil"
          />
        </button>
      </div>

      <div className="grid gap-1 mb-4">
        <label htmlFor="name" className="text-gray-600">Nome</label>
        <input
          type="text"
          name="name"
          placeholder="seu nome aqui"
          className="max-w-xs h-9 px-2 text-sm placeholder:text-gray-300 border rounded"
        />
      </div>

      <div className="grid gap-1 mb-4">
        <label htmlFor="email" className="text-gray-600">E-mail</label>
        <input
          type="text"
          name="email"
          placeholder="email@hotmail.com"
          className="max-w-xs h-9 px-2 text-sm placeholder:text-gray-300 border rounded"
        />
      </div>
      <div className="grid gap-1 mb-6">
        <label htmlFor="password" className="text-gray-600">Senha</label>
        <input
          type="password"
          name="password"
          placeholder="**********"
          className="max-w-xs h-9 px-2 text-sm placeholder:text-gray-300 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 mb-4  bg-violet-50 hover:bg-violet-100 border rounded"
      >
        Criar conta
      </button>
      <p className="w-full">
        Já tem uma conta? {' '}
        <Link href="/auth/login" className="text-violet-500 hover:underline">Faça login</Link>
      </p>
    </form>
  )
}
