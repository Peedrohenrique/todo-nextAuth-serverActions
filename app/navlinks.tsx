'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navlinks = [
  { name: 'Home', href: '/' },
  { name: 'Tarefas', href: '/todos' },
  { name: 'Cadastrar', href: '/auth/register' },
];

const navlinksPrivate = [
  { name: 'Home', href: '/' },
  { name: 'Tarefas', href: '/todos' },
  { name: 'NovaTarefa', href: '/private' },
];

export function Navlinks({ userName }: { userName: string  }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-left justify-start gap-5">
      {userName ? (
        navlinksPrivate.map(navLink => {
          const isActive = pathname === navLink.href;
          return (
            <li key={navLink.name}>
              <Link 
                href={navLink.href} 
                className={`${isActive ? 'text-violet-500' : 'text-gray-600'}`}
              >
                {navLink.name}
              </Link>
            </li>
          );
        })
      ) : (
        navlinks.map(navLink => {
          const isActive = pathname === navLink.href;
          return (
            <li key={navLink.name}>
              <Link 
                href={navLink.href} 
                className={`${isActive ? 'text-violet-500' : 'text-gray-600'}`}
              >
                {navLink.name}
              </Link>
            </li>
          );
        })
      )}
    </ul>
  );
}
