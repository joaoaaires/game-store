'use client'

import { useCallback, useEffect, useState } from 'react'
import Game from './game/core/game'
import { api } from '@/lib/api'
import ObjectResponse from './shared/core/object-response'
import Image from 'next/image'
import { GameDetailInfo } from './GameDetailInfo'
import { GameScreens } from './GameScreens'
import { GameBuy } from './GameBuy'

export function GameDetail({ uurest }: { uurest: string }) {
  const [game, setGame] = useState<Game | null | undefined>(null)
  const [error, setError] = useState<string | null | undefined>(null)

  const fetchGame = useCallback(async () => {
    try {
      const result = await api.get(`/games/${uurest}`)
      const response: ObjectResponse<Game> = result.data
      setGame(response.data)
    } catch (e) {
      console.log(e)
      setError('Game not found!')
    }
  }, [uurest])

  useEffect(() => {
    fetchGame()
  }, [fetchGame])

  if (!game) {
    return (
      <div className="flex h-full items-center justify-center bg-black-500 text-2xl font-semibold">
        {error || `Carregando...`}
      </div>
    )
  }

  return (
    <div className="flex h-auto bg-black-500 lg:px-[12rem] xl:px-[22rem] 2xl:px-[28rem]">
      <div className="bg-black-800 text-white">
        <div className="px-3 py-6 text-2xl font-bold text-teal-600">
          {game.title}
        </div>
        <div className="flex">
          <div className="flex-1">
            <Image
              src={game.headerUrl}
              alt=""
              width={600}
              height={360}
              className="aspect-video h-auto w-auto object-cover"
            />
          </div>
          <div className="basis-80 text-justify">
            <div className="px-3">{game.shortDescription}</div>
            <div className="p-3">
              <GameDetailInfo game={game} />
            </div>
          </div>
        </div>
        <div className="p-3 pt-6 text-justify">{game.description}</div>
        <div className="flex gap-x-3 px-3">
          <div className="flex-1">
            <GameBuy game={game} />
          </div>
          <div className="basis-60">
            <GameScreens game={game} />
          </div>
        </div>
        <div className="h-10"></div>
      </div>
    </div>
  )
}
