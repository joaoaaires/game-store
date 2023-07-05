'use client'

import Game from '@/components/game/core/game'
import BuyGame from '@/components/game/detail/BuyGame'
import { DescriptionDownloadable } from '@/components/game/detail/DescriptionDownloadable'
import { MoreInfo } from '@/components/game/detail/MoreInfo'
import { PriceBuy } from '@/components/game/detail/PriceBuy'
import { Screens } from '@/components/game/detail/Screens'
import ObjectResponse from '@/components/shared/core/object-response'
import { api } from '@/lib/api'
import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'

export default function GameDetailBody({ uurest }: { uurest: string }) {
  const [game, setGame] = useState<Game | null | undefined>(null)
  const [error, setError] = useState<string | null | undefined>(null)
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [showModelBuy, setShowModelBuy] = useState(false)

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

  function handlerShowInfo() {
    setShowInfo(!showInfo)
  }

  if (!game) {
    return (
      <div className="flex flex-1 px-[32rem]">
        <div className="flex w-full items-center justify-center bg-white px-3 pt-3 text-xl font-bold">
          {error || `Carregando...`}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 px-[32rem]">
      <div className="w-full bg-white">
        <Image
          src={game.headerUrl}
          alt=""
          width={600}
          height={360}
          className="aspect-video h-[280px] w-full object-cover"
        />
        <div className="p-3">
          <DescriptionDownloadable game={game} />
        </div>
        <div className="p-3">
          <PriceBuy setShowModelBuy={setShowModelBuy} game={game} />
        </div>
        <div className="p-3">
          <BuyGame
            setShowModelBuy={setShowModelBuy}
            showModelBuy={showModelBuy}
            game={game}
          />
        </div>
        <div className="flex">
          <div className="flex-1">
            <div className="p-3">{game.description}</div>
            <div className="p-3">
              <MoreInfo
                handlerShowInfo={handlerShowInfo}
                showInfo={showInfo}
                game={game}
              />
            </div>
          </div>
          <div className="basis-1/3 py-3">
            <Screens game={game} />
          </div>
        </div>
      </div>
    </div>
  )
}
