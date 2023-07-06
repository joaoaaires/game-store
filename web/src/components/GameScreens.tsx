import Image from 'next/image'
import Game from './game/core/game'

interface GameScreensProps {
  game: Game
}

export function GameScreens({ game }: GameScreensProps) {
  return (
    <div className="flex flex-col gap-y-3">
      {game.screens &&
        game.screens.map((screen, index) => {
          return (
            <Image
              alt=""
              height={300}
              width={300}
              key={index}
              src={screen.screenUrl}
            />
          )
        })}
    </div>
  )
}
