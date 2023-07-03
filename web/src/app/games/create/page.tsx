import { Header } from '@/components/shared/Header'
import GameBody from './page-body'

export default function Game() {
  return (
    <>
      <Header activeBrowseGames={false} activeSearch={false} />
      <GameBody />
    </>
  )
}
