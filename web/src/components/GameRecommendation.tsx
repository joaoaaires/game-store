'use client'

import { useState, useCallback, useEffect } from 'react'
import Game from './game/core/game'
import { GamesItemListProps } from './GamesItemList'
import { FilterGames } from '@/contexts/filterGames'
import { api } from '@/lib/api'
import ObjectResponse from './shared/core/object-response'
import Image from 'next/image'

interface GameRecommendationProps {
  game: Game
}

export function GameRecommendation({ game }: GameRecommendationProps) {
  const [games, setGames] = useState<GamesItemListProps[] | null | undefined>(
    null,
  )

  const fetchGames = useCallback(async () => {
    const system = game.systems[0].id
    const category = game.categories[0].id
    const params: FilterGames = {
      category: `${category}`,
      system: `${system}`,
      perPage: 5,
    }
    const result = await api.get('/games', { params })
    const response: ObjectResponse<GamesItemListProps[]> = result.data
    setGames(response.data?.filter((g) => `${g.id}` !== `${game.id}`))
  }, [game])

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  return (
    <div className="flex flex-col gap-y-2 py-1 text-lg font-semibold text-teal-600">
      Jogos Recomendados
      <div className="flex flex-row gap-x-1 text-xs">
        {games &&
          games.map((g, index) => {
            return (
              <a
                href={`/games/${g.uurest}`}
                key={index}
                className="basis-1/4 cursor-pointer rounded bg-black-600 p-1 font-normal text-white"
              >
                <Image
                  src={g.avatarUrl}
                  width={200}
                  height={200}
                  alt=""
                  className="object-nonen h-auto w-auto rounded"
                />
                <div className="line-clamp-2">{g.title}</div>
              </a>
            )
          })}
      </div>
    </div>
  )
}
