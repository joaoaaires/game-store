import { User } from 'lucide-react'
import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { MenuRight } from './MenuRight'

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

  return (
    <div className="z-50 h-[56px] bg-white shadow">
      {!full ? (
        <div className="flex items-center justify-center">
          <div className="py-4">Your Company</div>
        </div>
      ) : (
        <div className="flex items-center justify-between px-6">
          {/* Left */}
          <div className="flex">
            {/* Logo */}
            <div className="py-4">Your Company</div>
            {/* Buttom Home */}
            <Link href="/" className="relative mx-5 py-4">
              Browse Games
              {activeBrowseGames ? (
                <div className="absolute right-0 top-[52px] h-1 w-full bg-purple-500" />
              ) : (
                ''
              )}
            </Link>
            {/* Input Filter */}
            {activeSearch ? (
              <input
                type="text"
                className="my-auto rounded border-0 bg-gray-200 leading-relaxed shadow-sm placeholder:text-gray-400 focus:ring-0"
                placeholder="Search for games"
              />
            ) : (
              ''
            )}
          </div>
          {/* Right */}
          <div className="flex gap-3">
            {user ? (
              <>
                <User className="my-auto" />
                <p className="my-auto">{user.name}</p>
                <MenuRight isDev={user.isDev} />
              </>
            ) : (
              <>
                <Link
                  href="/accounts"
                  className="rounded bg-purple-500 px-3 py-2 text-white transition-colors hover:bg-purple-700"
                >
                  Log in
                </Link>
                <Link
                  href="/accounts"
                  className="rounded  px-3 py-2  transition-colors hover:bg-gray-200"
                >
                  Registrer
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
