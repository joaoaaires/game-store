import { Header } from '@/components/shared/Header'
import GameDetailBody from './page-body'

interface GameForUurestProps {
  uurest: string
}

export default function GameDetail({ params }: { params: GameForUurestProps }) {
  return (
    <div className="flex h-screen flex-col">
      <Header activeBrowseGames={false} activeSearch={false} />
      <GameDetailBody uurest={params.uurest} />
    </div>
  )
}
