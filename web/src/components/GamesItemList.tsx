'use client'

import Image from 'next/image'

export interface GamesItemListProps {
  id: number
  avatarUrl: string
  title: string
  shortDescription: string
  actor: string
  categories: { description: string }[]
  systems: { description: string }[]
  uurest: string
  price: number
}

export function GamesItemList({ item }: { item: GamesItemListProps }) {
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
        <div className="text-lg font-bold text-black-400 line-clamp-2">
          {item.price ? `R$ ${item.price.toFixed(2)}` : `Free`}
        </div>
        <div></div>
      </a>
    </div>
  )
}
