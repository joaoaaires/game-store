import { MouseEventHandler } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import Game from '../core/game'

dayjs.locale(ptBR)
dayjs.extend(relativeTime)

interface MoreInfoProps {
  handlerShowInfo: MouseEventHandler<HTMLButtonElement>
  showInfo: boolean
  game: Game
}

export function MoreInfo({ handlerShowInfo, showInfo, game }: MoreInfoProps) {
  const moreInfoChildLeftClassName =
    'flex basis-1/5 items-end justify-end font-bold'
  const moreInfoChildRightClassName = 'pl-2'

  return (
    <>
      <button
        onClick={handlerShowInfo}
        type="button"
        className="flex w-full justify-between rounded bg-gray-200 px-3 py-2 hover:bg-gray-500 hover:text-white"
      >
        <div className="flex gap-2">
          <div className="font-bold">More Info</div>
        </div>
        {showInfo ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div className={`${showInfo ? 'flex flex-col' : 'hidden'}`}>
        <div className="flex">
          <div className={moreInfoChildLeftClassName}>Updated at</div>
          <div className={moreInfoChildRightClassName}>
            {dayjs(game.updateAt).toNow(true)} atrás
          </div>
        </div>
        <div className="flex">
          <div className={moreInfoChildLeftClassName}>Created at</div>
          <div className={moreInfoChildRightClassName}>
            {dayjs(game.createAt).format('D[ de ]MMMM[, ]YYYY')}
          </div>
        </div>
        <div className="flex">
          <div className={moreInfoChildLeftClassName}>Os</div>
          <div className={moreInfoChildRightClassName}>
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
        </div>
        <div className="flex">
          <div className={moreInfoChildLeftClassName}>Author</div>
          <div className={moreInfoChildRightClassName}>{game.actor}</div>
        </div>
        <div className="flex">
          <div className={moreInfoChildLeftClassName}>Genre</div>
          <div className={moreInfoChildRightClassName}>
            {game.categories &&
              game.categories.map((category, index) => {
                const size = game.categories.length
                if (size === 1) {
                  return category.description
                } else {
                  if (index === size - 1) {
                    return `and ${category.description}`
                  } else {
                    return `${category.description} `
                  }
                }
              })}
          </div>
        </div>
      </div>
    </>
  )
}
