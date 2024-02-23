import Image from "next/image";
import { signOut } from "./auth/providers";

export async function UserSettings({ image }: { image?: string | null | undefined }) {
  
  return (
    <div className="flex items-center gap-4">
      <Image 
        src={image || '/user-40x40.jpg'} 
        alt={`Avatar de ${image}`} 
        width={40} 
        height={40}
        className="rounded-full" 
      />
      <form action={async () => {
        'use server'
        await signOut()
      }}>
        <button type="submit" className="hover:underline">Sign out</button>
      </form>
    </div>
  )
}