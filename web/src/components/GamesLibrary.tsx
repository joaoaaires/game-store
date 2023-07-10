'use client'

import { useCallback, useEffect, useState } from 'react'
import { GamesItemList, GamesItemListProps } from './GamesItemList'
import { api } from '@/lib/api'
import ObjectResponse from './shared/core/object-response'
import { useSearch } from '@/hooks/useSearch'
import Cookie from 'js-cookie'
import { useFilterGames } from '@/hooks/useFilterGames'
import { useDebounce } from '@/hooks/useDebounce'

export function GamesLibrary() {
  const [games, setGames] = useState<GamesItemListProps[]>([])

  const { search } = useSearch()
  const { filter } = useFilterGames()

  const debouncedSearch = useDebounce(search, 300)

  const fetchGames = useCallback(async () => {
    let params = debouncedSearch ? { query: debouncedSearch } : {}
    filter.perPage = 500
    filter.perUser = true
    params = { ...params, ...filter }

    const token = Cookie.get('token')
    const headers = token
      ? {
          Authorization: `${token}`,
        }
      : {}

    const result = await api.get('/games', { params, headers })
    const response: ObjectResponse<GamesItemListProps[]> = result.data
    setGames(response.data ?? [])
  }, [debouncedSearch, filter])

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  if (!games.length) {
    return (
      <div className="flex h-full bg-black-400 lg:px-[6rem] xl:px-[16rem] 2xl:px-[22rem]">
        <div className="flex h-full w-full flex-col bg-white p-4">
          <div className="mb-4 text-2xl font-bold text-teal-600">
            Meus Jogos
          </div>
          <div className="flex flex-1 items-center justify-center text-2xl">
            Você ainda não possui jogos!
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full bg-black-400 lg:px-[6rem] xl:px-[16rem] 2xl:px-[22rem]">
      <div className="flex h-full w-full flex-col bg-white p-4">
        <div className="text-2xl font-bold text-teal-600">Meus Jogos</div>
        <div className="flex flex-wrap overflow-hidden">
          {games &&
            games.map((game) => <GamesItemList key={game.id} item={game} />)}
        </div>
      </div>
    </div>
  )
}
