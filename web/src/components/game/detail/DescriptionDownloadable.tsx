import Game from '../core/game'

interface DescriptionDownloadableProps {
  game: Game
}

export function DescriptionDownloadable({
  game,
}: DescriptionDownloadableProps) {
  return (
    <div className="text-sm">
      A downloadable game for{' '}
      {game.systems &&
        game.systems.map((system, index) => {
          const size = game.systems.length
          if (size === 1) {
            return system.description
          } else {
            if (index === size - 1) {
              return `and ${system.description}`
            } else {
              return `${system.description} `
            }
          }
        })}
    </div>
  )
}
