import { redirect } from 'next/navigation'
import { getUser } from '@/util/auth'
import { GamesLibrary } from '@/components/GamesLibrary'

export default function Library() {
  const user = getUser()
  if (!user) {
    return redirect('/')
  }

  return <GamesLibrary />
}
