'use client'

import { useCallback, useEffect, useState } from 'react'
import { GamesItemList, GamesItemListProps } from './GamesItemList'
import ObjectResponse from './shared/core/object-response'
import { api } from '@/lib/api'
import { useSearch } from '@/hooks/useSearch'
import { useDebounce } from '@/hooks/useDebounce'
import { useFilterGames } from '@/hooks/useFilterGames'
import { FilterGames } from '@/contexts/filterGames'

export function GamesList() {
  const [searchTmp, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(useSearch().search, 300)
  const [filterTmp, setFilter] = useState<FilterGames | null>(null)
  const { filter } = useFilterGames()
  const [games, setGames] = useState<GamesItemListProps[]>([])
  const [page, setPage] = useState(0)

  const fetchGames = useCallback(
    async (search: string, filter: FilterGames, page: number) => {
      try {
        console.log({ page, perPage: 12 })
        let params = search ? { query: search } : {}
        params = { ...params, ...{ page, perPage: 12 } }
        params = { ...params, ...filter }
        const result = await api.get('/games', { params })
        const response: ObjectResponse<GamesItemListProps[]> = result.data
        const dataNotNull = response.data ?? []
        if (page === 0) {
          setGames(dataNotNull)
        } else {
          setGames((prevGames) => [...prevGames, ...dataNotNull])
        }
      } catch (error) {
        console.log(error)
      } finally {
        setSearch(search)
        setFilter(filter)
      }
    },
    [],
  )

  const fetchScrollGames = useCallback(() => {
    const elementMyScroll = document.getElementById('myscroll')
    if (elementMyScroll) {
      if (
        elementMyScroll.offsetHeight + elementMyScroll.scrollTop >=
        elementMyScroll.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1)
      }
    }
  }, [])

  useEffect(() => {
    if (debouncedSearch !== searchTmp) setPage(0)
    if (filter !== filterTmp) setPage(0)
    fetchGames(debouncedSearch, filter, page)
    const elementMyScroll = document.getElementById('myscroll')
    if (elementMyScroll) {
      elementMyScroll.addEventListener('scroll', fetchScrollGames)
      return () =>
        elementMyScroll.removeEventListener('scroll', fetchScrollGames)
    }
  }, [
    debouncedSearch,
    searchTmp,
    filter,
    filterTmp,
    setPage,
    page,
    fetchGames,
    fetchScrollGames,
  ])

  return (
    <div className="flex flex-wrap overflow-hidden">
      {games.map((game) => (
        <GamesItemList key={game.id} item={game} showUpdateGame={false} />
      ))}
    </div>
  )
}
