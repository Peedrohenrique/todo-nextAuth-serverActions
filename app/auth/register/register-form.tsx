'use client'
import { createUser } from "#/actions/users";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import ImageModal from "./ImageModal";

export default function RegisterForm() {
  const errorsState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createUser, errorsState);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageSelect = (selectedImageUrl: string) => {
    setImageUrl(selectedImageUrl);
  };

  const images = [
    "https://img.freepik.com/fotos-gratis/ilustracao-3d-de-um-adolescente-com-um-rosto-engracado-e-oculos_1142-50955.jpg?t=st=1708811528~exp=1708815128~hmac=cd3604cb5740f3ca636fd858809b7b2e3e43fc1b3d24b8ad73418db03206acbc&w=360",
    "https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671116.jpg?t=st=1708811564~exp=1708815164~hmac=71e36c63aa5fa519f76a47dc458ab62b825129588280cdfa08fc803a7a7b26d0&w=360",
    "https://img.freepik.com/fotos-gratis/ilustracao-3d-de-uma-menina-bonita-com-jaqueta-verde_1142-42111.jpg?t=st=1708811581~exp=1708815181~hmac=064a41e3fe1362ab0e2f72a9d45f535e1643a32499692b646a708a4988fd6831&w=360",
"https://img.freepik.com/fotos-gratis/ilustracao-3d-de-uma-garota-de-desenho-animado-bonita-em-uma-jaqueta-azul-e-oculos_1142-41044.jpg?t=st=1708812481~exp=1708816081~hmac=0a2b43de44fd435fe1d01c3411945057d649603033dd0e56be5e1a1f33dd1e59&w=360",
"https://img.freepik.com/fotos-premium/linda-garota-design-de-personagem-3d-avatar-de-garota-de-desenho-animado_432516-5513.jpg?w=360",
"https://img.freepik.com/fotos-premium/uma-garota-de-desenho-animado-com-cabelos-cacheados-e-oculos_846334-480.jpg?w=360",
"https://img.freepik.com/fotos-premium/mulheres-felizes-sorrindo_68067-535.jpg?w=360",
"https://img.freepik.com/fotos-gratis/visao-do-empresario-3d_23-2150709814.jpg?w=360&t=st=1708812774~exp=1708813374~hmac=c17606f9b41d07b58a48b6b11cb4c91feae45b52698b184c1dec9074e807b410",
"https://img.freepik.com/fotos-gratis/retrato-3d-de-pessoas_23-2150793997.jpg?w=360&t=st=1708812779~exp=1708813379~hmac=b3fdea8f0222ca1e470aa85b8b3645fa0967f9e67fef24d9483f6e65c64478d7",
"https://img.freepik.com/fotos-gratis/um-possum-bonito-a-usar-roupas_23-2150953269.jpg?w=360&t=st=1708812786~exp=1708813386~hmac=522657fafd41eb89684feaffc7d0fe35232dbf5df822a9d22f7262f26cc988ac",
"https://img.freepik.com/vetores-gratis/homem-misterioso-da-mafia-fumando-um-cigarro_52683-34828.jpg?w=360&t=st=1708812790~exp=1708813390~hmac=0215d6b80717ab71f41ccbd42409e055b9932b2d31789e2db74c798836ce5ef1",
"https://img.freepik.com/fotos-gratis/visao-do-empresario-3d-tirando-selfie_23-2150709934.jpg?w=360&t=st=1708812796~exp=1708813396~hmac=0a24958370fdb715899f949f54db38c2ece6ee7aa6b9513884106ca1c6279bb6",
"https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671122.jpg?w=360&t=st=1708812804~exp=1708813404~hmac=f9792638faf59eb160c7a9e7a119c9af6365221bdcde4dceb27a692750aa7914",
"https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-usando-oculos-renderizacao-3d_1142-43632.jpg?w=360&t=st=1708812810~exp=1708813410~hmac=f746058785452740c2df7552a3aa730e8bdf657dc853caedb37f1d95931abeb8",
"https://img.freepik.com/fotos-gratis/ilustracao-3d-de-um-jovem-com-barba-e-bigode_1142-51070.jpg?w=360&t=st=1708812817~exp=1708813417~hmac=059a7946ff19f8cfcfb3aba1f5184aed701f35a0ac63ed8764ffd1de97f25301",
"https://img.freepik.com/fotos-premium/personagem-de-desenho-animado-de-garota-de-estilo-gotico-3d-lindo-cabelo-preto-parece-quarta-feira-adams_888396-1297.jpg?w=360",
"https://img.freepik.com/fotos-gratis/retrato-de-um-jovem-empresario-com-bigode-e-oculos-renderizacao-3d_1142-51509.jpg?w=360&t=st=1708812824~exp=1708813424~hmac=17adc15ccfad5c08a2a7a16eadb344f3a04015c5806e0bafa52aa6e65660a480",
"https://img.freepik.com/fotos-gratis/ilustracao-3d-de-uma-garota-bonita-de-desenho-animado-com-cabelo-castanho-e-oculos_1142-40907.jpg?w=360&t=st=1708812826~exp=1708813426~hmac=ed657e7b50802e7f95b9f9c209c8c24b1bf03fab1497641d120b9a0f299336eb",
"https://img.freepik.com/fotos-gratis/ilustracao-3d-de-um-menino-de-desenho-animado-bonito-com-mochila-nas-costas_1142-40542.jpg?w=360&t=st=1708812829~exp=1708813429~hmac=86dfb7a4a737d0fc5f36b71e142fb3bfab5164f76bafc8c7d18f64d01d0f5981",
"https://img.freepik.com/fotos-gratis/vista-do-homem-3d-tirando-selfie_23-2150709938.jpg?w=360&t=st=1708812834~exp=1708813434~hmac=e5f0313983ca8bbeb0ad24fd2879f0ce89b964dace3194b12329052d249c797a",
"https://img.freepik.com/fotos-gratis/ilustracao-3d-de-um-menino-usando-um-bone-e-oculos-com-mochila_1142-41130.jpg?w=360&t=st=1708813004~exp=1708813604~hmac=6e1836d69f97c47d1c70722763c49ee94126513fb9606c2a09144de8d7811a0d",
"https://img.freepik.com/fotos-gratis/retrato-de-homem-feliz-com-oculos-e-camisa-branca_1142-54586.jpg?w=360&t=st=1708813020~exp=1708813620~hmac=233b00154a71dda6ecec5f3adaf061b2307507ff0b1fded205f8e5e7af30bfbe",
"https://img.freepik.com/fotos-gratis/retrato-de-um-menino-sorridente-com-um-capacete-e-oculos-de-sol-renderizacao-3d_1142-41369.jpg?w=360&t=st=1708813073~exp=1708813673~hmac=3e2fc1178d71d0d9bb992947fd32347e1437bf9260a1b794b27c608cdaa211bb",
  ];


  return (
    <form className="w-96 p-10 border rounded" action={dispatch}>
      <h1 className="mb-9 font-medium text-lg text-gray-600 text-center">Crie uma conta para continuar</h1>

      <div className="flex justify-center mb-4">
        <button onClick={openModal}>
          <input
            type="image"
            name="image"
            className="rounded-full w-20"
            src={imageUrl || "https://www.ccj.ufpb.br/dcj/contents/imagens/mega-icon-pack/clique-aqui.jpg/@@images/image.jpeg"}
            alt="Imagem de perfil"
            value={imageUrl}
          />
        </button>
      </div>
      <input 
    type="hidden" 
    name="image" 
    value={imageUrl}
  />
      <div className="grid gap-1 mb-4">
        <label htmlFor="name" className="text-gray-600">Nome</label>
        <input
          type="text"
          name="name"
          placeholder="seu nome aqui"
          className="max-w-xs h-9 px-2 text-sm placeholder:text-gray-300 border rounded"
        />
        {state.errors?.name && state.errors.name.map(error => (
          <p key={error} className="text-sm text-red-500">{error}</p>
        ))}
      </div>

      <div className="grid gap-1 mb-4">
        <label htmlFor="email" className="text-gray-600">E-mail</label>
        <input
          type="text"
          name="email"
          placeholder="email@hotmail.com"
          className="max-w-xs h-9 px-2 text-sm placeholder:text-gray-300 border rounded"
        />
        {state.errors?.email && state.errors.email.map(error => (
          <p key={error} className="text-sm text-red-500">{error}</p>
        ))}
      </div>
      <div className="grid gap-1 mb-6">
        <label htmlFor="password" className="text-gray-600">Senha</label>
        <input
          type="password"
          name="password"
          placeholder="**********"
          className="max-w-xs h-9 px-2 text-sm placeholder:text-gray-300 border rounded"
        />
        {state.errors?.password && state.errors.password.map(error => (
          <p key={error} className="text-sm text-red-500">{error}</p>
        ))}
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

      <ImageModal
        isOpen={isModalOpen}
        images={images}
        onClose={closeModal}
        onSelect={handleImageSelect}
      />
      
    </form>
  )
}
