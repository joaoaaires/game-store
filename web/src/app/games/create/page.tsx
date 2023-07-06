import { Header } from '@/components/shared/Header'
import GameBody from './page-body'
import { redirect } from 'next/navigation'
import { getUser } from '@/util/auth'

export default function Game() {
  const user = getUser()
  if (!user?.isDev) {
    return redirect('/')
  }

  return (
    <>
      <Header activeBrowseGames={false} activeSearch={false} />
      <GameBody />
    </>
  )
}
