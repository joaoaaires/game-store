'use client'

import { MouseEvent } from 'react'
import { Edit } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export interface GamesItemListProps {
  id: number
  userId: number
  avatarUrl: string
  title: string
  shortDescription: string
  actor: string
  categories: { description: string }[]
  systems: { description: string }[]
  uurest: string
  price: number
}

export function GamesItemList({
  item,
  showUpdateGame,
}: {
  item: GamesItemListProps
  showUpdateGame: boolean
}) {
  const router = useRouter()

  function handlerUpdateGame(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    router.push(`/games/update/${item.id}`)
  }

  return (
    <div className="w-full p-3 sm:basis-1/2 md:basis-1/3  lg:basis-1/5">
      <a
        href={`/games/${item.uurest}`}
        className="flex h-full cursor-pointer flex-col rounded bg-black-800 p-2 text-teal-600 shadow-md shadow-black-400 hover:bg-black-700"
      >
        <Image
          src={item.avatarUrl}
          width={200}
          height={200}
          alt=""
          className="object-nonen h-auto w-auto rounded"
        />
        <div className="font-semibold">{item.title}</div>
        <div className="text-sm text-black-200 line-clamp-2">
          {item.shortDescription}
        </div>
        <div className="text-xs text-black-400">{item.actor}</div>
        <div className="text-xs text-black-400 line-clamp-2">
          {item.categories.map((category) => category.description).join(', ')}
        </div>
        <div className="flex justify-between text-lg font-bold text-black-400 line-clamp-2">
          {item.price ? `R$ ${item.price.toFixed(2)}` : `Free`}
          {showUpdateGame ? (
            <button onClick={handlerUpdateGame}>
              <Edit className="hover:text-white" />
            </button>
          ) : (
            <></>
          )}
        </div>
        <div></div>
      </a>
    </div>
  )
}
