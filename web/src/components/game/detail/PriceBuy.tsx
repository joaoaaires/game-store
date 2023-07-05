import Game from '../core/game'

interface PriceBuyProps {
  setShowModelBuy: (option: boolean) => void
  game: Game
}

export function PriceBuy({ game, setShowModelBuy }: PriceBuyProps) {
  return (
    <div className="text-lg">
      <button
        onClick={() => setShowModelBuy(true)}
        className="rounded bg-purple-500 p-3 uppercase text-white transition-colors hover:bg-purple-700"
      >
        COMPRAR
      </button>{' '}
      R${' '}
      {game.prices &&
        game.prices.map((price, index) => {
          return <span key={index}>{price.price}</span>
        })}{' '}
      BR
    </div>
  )
}
