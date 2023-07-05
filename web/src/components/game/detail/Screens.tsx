import Image from 'next/image'
import Game from '../core/game'

interface ScreensProps {
  game: Game
}

export function Screens({ game }: ScreensProps) {
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
