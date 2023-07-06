import { GameDetail } from '@/components/GameDetail'

interface GameForUurestProps {
  uurest: string
}

export default function GameUurest({ params }: { params: GameForUurestProps }) {
  return <GameDetail uurest={params.uurest} />
}
