'use client'

import { api } from '@/lib/api'
import { useCallback, useEffect, useState } from 'react'
import ObjectResponse from '../shared/core/object-response'
import { ItemListGame, ItemListGameModel } from './ItemListGame'

export function ListGame() {
  const [games, setGames] = useState<ItemListGameModel[] | null | undefined>(
    null,
  )

  const fetchGames = useCallback(async () => {
    const result = await api.get('/games')
    const response: ObjectResponse<ItemListGameModel[]> = result.data
    setGames(response.data)
  }, [])

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  return (
    <div className="flex flex-wrap">
      {games &&
        games.map((game) => <ItemListGame key={game.id} model={game} />)}
    </div>
  )
}
