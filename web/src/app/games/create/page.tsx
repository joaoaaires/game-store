import { Header } from '@/components/shared/Header'
import GameBody from './page-body'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

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
