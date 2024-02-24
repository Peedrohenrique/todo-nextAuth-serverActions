'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navlinks = [
  { name: 'Home', href: '/' },
  { name: 'Tarefas', href: '/todos' },
  { name: 'Cadastrar', href: '/private' },
];

export function Navlinks() {
  const pathname = usePathname()

  return (
    <ul className="flex items-left justify-start gap-5">
      {navlinks.map(link => {
        const isActive = pathname === link.href
        return (
          <li key={link.name}>
            <Link 
              href={link.href} 
              className={`${isActive ? 'text-violet-500' : 'text-gray-600'}`}
            >
              {link.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}