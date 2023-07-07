import { redirect } from 'next/navigation'
import { getUser } from '@/util/auth'
import { GameCreate } from '@/components/GameCreate'

export default function Game() {
  const user = getUser()
  if (!user?.isDev) {
    return redirect('/')
  }

  return <GameCreate />
}
