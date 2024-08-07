import { auth } from "./auth/providers";
import { Logo } from "./logo";
import { Navlinks } from "./navlinks";
import { UserSettings } from "./user-settings";

export async function Header() {
  const session = await auth()
  const image = session?.user?.image
  const userName = session?.user?.name
  return (
    <header className="w-full max-w-3xl mx-auto my-6 px-6 py-8 border rounded-md bg-gray-50">
      <nav className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex-1">
        <Logo />
        </div>
        <div className="flex items-center justify-end gap-5">
          <Navlinks userName={userName ?? ""}/>
          <UserSettings image={image}/>
        </div>
      </nav>
    </header>
  )
}