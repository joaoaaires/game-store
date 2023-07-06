import Game from './game/core/game'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale(ptBR)
dayjs.extend(relativeTime)

interface GameDetailInfoProps {
  game: Game
}

export function GameDetailInfo({ game }: GameDetailInfoProps) {
  const moreInfoChildLeftClassName = 'flex font-bold uppercase'
  const moreInfoChildRightClassName = 'pl-2'

  return (
    <div className="text-sm">
      <div className="flex flex-col py-3">
        <div className="flex">
          <div className={moreInfoChildLeftClassName}>DATA DE LANÇAMENTO:</div>
          <div className={moreInfoChildRightClassName}>
            {dayjs(game.createAt).format('D[ de ]MMMM[, ]YYYY')}
          </div>
        </div>
        <div className="flex">
          <div className={moreInfoChildLeftClassName}>DESENVOLVEDOR:</div>
          <div className={moreInfoChildRightClassName}>{game.actor}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div
          className={`${moreInfoChildLeftClassName} mb-1 font-normal normal-case`}
        >
          Categorias:
        </div>
        <div className="flex">
          {game.categories &&
            game.categories.map((category, index) => {
              return (
                <div
                  key={index}
                  className="mr-2 rounded bg-teal-600 px-2 py-1 font-semibold"
                >
                  {category.description}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
