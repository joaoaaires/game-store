import { AppWindow } from 'lucide-react'
import { useRouter } from 'next/navigation'

export interface ItemListGameModel {
  id: number
  avatarUrl: string
  title: string
  shortDescription: string
  actor: string
  categories: { description: string }[]
  systems: { description: string }[]
  uurest: string
}

export function ItemListGame({ model }: { model: ItemListGameModel }) {
  const router = useRouter()

  function handlerShowGame() {
    const uurest = model.uurest
    if (uurest) {
      router.push(`/games/${uurest}`)
    }
  }

  return (
    <div className="h-[400px] basis-1/5 p-3">
      <div
        onClick={handlerShowGame}
        className="flex h-full cursor-pointer flex-col rounded border p-2 shadow-md hover:bg-gray-200"
      >
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
