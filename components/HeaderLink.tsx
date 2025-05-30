'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  {
    title: 'Thánh Ca',
    href: '/hymns',
  },
  {
    title: 'TVCHH',
    href: '/tvchh',
  },
]

export function HeaderLink() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return (pathname.startsWith(href)) || (pathname === '/' && href === '/hymns')
  }

  return (
    <nav className="flex flex-row md:flex-col gap-4 md:gap-1">
      {links.map(({ href, title }) => (
        <Link key={href} href={href} className={
          [
            isActive(href)
              ? 'font-bold text-black'
              : 'font-medium text-gray-600 hover:underline',
            'relative text-sm text-right hover:text-black'
          ].join(' ')
        }>
          {isActive(href) && <span className="hidden md:inline pr-2">✦</span>}
          {title}
        </Link>
      ))}
    </nav>
  )
}
