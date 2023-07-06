'use client'

import Game from './game/core/game'

interface GameBuyProps {
  game: Game
}

export function GameBuy({ game }: GameBuyProps) {
  return (
    <>
      {game.prices &&
        game.prices.map((price, index) => {
          return (
            <div
              key={index}
              className="relative flex flex-col rounded bg-black-600 px-3 pb-6 pt-3 text-xl"
            >
              <div>Comprar {game.title}</div>
              <div className="absolute right-3 top-3/4 flex gap-x-2 rounded bg-black-900 p-2">
                <div className="rounded bg-black-800 px-2 py-1 font-bold text-teal-600">
                  R$ {price.price.toFixed(2)}
                </div>
                <div className="cursor-pointer rounded bg-teal-600 px-3 py-1 font-semibold uppercase hover:bg-teal-700">
                  Comprar
                </div>
              </div>
            </div>
          )
        })}
    </>
  )
}
