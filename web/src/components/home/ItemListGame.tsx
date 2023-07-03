import { AppWindow } from 'lucide-react'

export interface ItemListGameModel {
  id: number
  avatarUrl: string
  title: string
  shortDescription: string
  actor: string
  categories: { description: string }[]
  systems: { description: string }[]
}

export function ItemListGame({ model }: { model: ItemListGameModel }) {
  return (
    <div className="h-[400px] basis-1/5 p-3">
      <div className="flex h-full flex-col rounded border p-2 shadow-md">
        <div className="flex-1 bg-slate-500">TESTE</div>
        <div className="font-semibold">{model.title}</div>
        <div className="text-sm text-gray-500">{model.shortDescription}</div>
        <div className="text-sm text-gray-500">{model.actor}</div>
        <div className="text-xs text-gray-500">Game Genre</div>
        <div>
          <AppWindow />
        </div>
      </div>
    </div>
  )
}
