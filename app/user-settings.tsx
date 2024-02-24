import Image from "next/image";
import { signOut } from "./auth/providers";

export async function UserSettings({
  image,
}: {
  image?: string | null | undefined;
}) {
  return (
    <>
      {image && (
        <div className="flex items-center gap-5">
           <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit" className="hover:underline text-gray-600">
              Sair
            </button>
          </form>
          
          <Image
            src={image || "/user-40x40.jpg"}
            alt={`Avatar de ${image}`}
            width={40}
            height={40}
            className="rounded-full"
          />
         
        </div>
      )}
    </>
  );
}
