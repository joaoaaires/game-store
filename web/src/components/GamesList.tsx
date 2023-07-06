'use client'

import { useCallback, useEffect, useState } from 'react'
import { GamesItemList, GamesItemListProps } from './GamesItemList'
import ObjectResponse from './shared/core/object-response'
import { api } from '@/lib/api'
import { useSearch } from '@/hooks/useSearch'
import { useDebounce } from '@/hooks/useDebounce'
import { useFilterGames } from '@/hooks/useFilterGames'

export function GamesList() {
  const [games, setGames] = useState<GamesItemListProps[] | null | undefined>(
    null,
  )

  const { search } = useSearch()
  const { filter } = useFilterGames()

  const debouncedSearch = useDebounce(search, 300)

  const fetchGames = useCallback(async () => {
    let params = debouncedSearch ? { query: debouncedSearch } : {}
    params = { ...params, ...filter }
    const result = await api.get('/games', { params })
    const response: ObjectResponse<GamesItemListProps[]> = result.data
    setGames(response.data)
  }, [debouncedSearch, filter])

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  return (
    <div className="flex flex-wrap overflow-hidden">
      {games &&
        games.map((game) => <GamesItemList key={game.id} item={game} />)}
    </div>
  )
}
