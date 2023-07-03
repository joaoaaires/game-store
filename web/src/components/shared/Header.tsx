import { User } from 'lucide-react'
import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { HeaderUserMenu } from './HeaderUserMenu'

interface HeaderProps {
  full?: boolean
  activeBrowseGames?: boolean
  activeSearch?: boolean
}

export function Header({
  full = true,
  activeBrowseGames = true,
  activeSearch = true,
}: HeaderProps) {
  const user = getUser()

  if (!full) {
    return (
      <header className="flex items-center justify-center bg-white shadow-md">
        <div className="py-5">Your Company</div>
      </header>
    )
  }

  return (
    <div className="flex justify-between bg-white px-6 shadow-md">
      <div className="flex items-center">
        <div className="py-5">Your Company</div>
        <a href="/">
          <div className="mx-5">
            <p className="my-5">Browse Games</p>
            {activeBrowseGames ? (
              <div className="border-b-4 border-purple-500" />
            ) : (
              ''
            )}
          </div>
        </a>
        {activeSearch ? (
          <input
            type="text"
            placeholder="Search for games"
            className="rounded border-0 bg-gray-200 px-3 py-3 leading-relaxed shadow-sm placeholder:text-gray-400 focus:ring-0"
          />
        ) : (
          ''
        )}
      </div>
      <div className="flex items-center">
        {user ? (
          <div className="relative flex items-center">
            <User className="mr-2" />
            <p className="mr-2">{user.name}</p>
            <HeaderUserMenu />
          </div>
        ) : (
          <>
            <Link
              href="/access"
              className="mr-3 cursor-pointer rounded border-2 border-purple-500 bg-purple-500 px-3 py-3 leading-none text-white transition-colors hover:bg-purple-700"
            >
              Log in
            </Link>
            <Link
              href="/access"
              className="cursor-pointer rounded border-2 px-3 py-3 leading-none text-black transition-colors hover:bg-gray-200"
            >
              Registrer
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
