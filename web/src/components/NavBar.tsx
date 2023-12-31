'use client'

import Link from 'next/link'
import { ChevronDown, User2, Library, Gamepad2, LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import Logo from '../assets/logo.svg'
import Image from 'next/image'
import User from '@/util/user'
import { NavBarDropdown } from './NavBarDropdown'
import { NavBarSearchInput } from './NavBarSearchInput'
import { useSearch } from '@/hooks/useSearch'
import { getUserUseClient } from '@/util/authUseClient'
import { useState, useEffect, useCallback } from 'react'

export function NavBar() {
  const router = useRouter()
  const pathname = usePathname()
  const showNavBar = pathname !== '/accounts'
  const activeBrowseGames = pathname === '/'
  const showNavBarSearchInput =
    pathname === '/' || pathname === '/games/library'
  const [user, setUser] = useState<User | null>(null)
  const { setSearch } = useSearch()

  const fetchUser = useCallback(() => {
    const user = getUserUseClient()
    setUser(user)
  }, [setUser])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  function handlerGoToHome() {
    setSearch('')
    router.push('/')
  }

  if (!showNavBar) {
    return <></>
  }

  return (
    <nav className="z-50 bg-black-800 text-white shadow-md">
      <div className="flex h-auto flex-col items-center justify-between px-6 md:h-[56px] md:flex-row">
        {/* Left */}
        <div className="flex flex-col items-center gap-y-2 md:flex-row">
          {/* Logo */}
          <Image src={Logo} alt="" className="h-12 w-12" />
          {/* Buttom Home */}
          <button
            onClick={handlerGoToHome}
            className="relative mx-6 hidden py-4 md:flex "
          >
            Lista de Jogos
            {activeBrowseGames ? (
              <div className="absolute right-0 top-[52px] h-1 w-full bg-teal-600" />
            ) : (
              <></>
            )}
          </button>
          {/* Input Filter */}
          {showNavBarSearchInput ? <NavBarSearchInput /> : <></>}
        </div>
        {/* Right */}
        <div className="flex gap-3">
          {user ? (
            <>
              <User2 className="my-auto" />
              <p className="my-auto">{user.name}</p>
              <NavBarDropdown
                className="rounded p-2 transition-colors hover:bg-black-700"
                items={[
                  {
                    path: '/games/library',
                    title: 'Meus jogos',
                    subTitle: 'Seus jogos aqui',
                    icon: Library,
                  },
                  user.isDev
                    ? {
                        path: '/games/create',
                        title: 'Criar novo jogo',
                        subTitle: 'Estúdio de criação',
                        icon: Gamepad2,
                      }
                    : null,
                  {
                    path: '/api/logout',
                    title: 'Sair',
                    subTitle: 'Até logo',
                    icon: LogOut,
                  },
                ]}
              >
                <ChevronDown />
              </NavBarDropdown>
            </>
          ) : (
            <>
              <Link
                href="/accounts"
                className="rounded bg-teal-600 px-3 py-2 text-white transition-colors hover:bg-teal-700"
              >
                Entrar
              </Link>
              <Link
                href="/accounts"
                className="rounded  px-3 py-2  transition-colors hover:bg-black-700"
              >
                Registrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
