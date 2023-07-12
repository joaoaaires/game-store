'use client'

import { useSearch } from '@/hooks/useSearch'
import { usePathname } from 'next/navigation'

export function NavBarSearchInput() {
  const pathname = usePathname()

  const showNavBarSearchInput =
    pathname === '/' || pathname === '/games/library'

  const { search, setSearch } = useSearch()

  return showNavBarSearchInput ? (
    <input
      type="text"
      name="search"
      className="rounded border-0 bg-black-700 leading-relaxed shadow-sm placeholder:text-white focus:ring-0"
      placeholder="Pesquisar jogos"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  ) : (
    <></>
  )
}
