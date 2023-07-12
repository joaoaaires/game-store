import { GameUpdate } from '@/components/GameUpdate'
import { getUser } from '@/util/auth'
import { redirect } from 'next/navigation'

interface UpdateProps {
  id: string
}

export default function Update({ params }: { params: UpdateProps }) {
  const id = parseInt(params.id)
  if (!id) {
    return redirect('/')
  }

  const user = getUser()
  if (!user?.isDev) {
    return redirect('/')
  }

  return <GameUpdate id={id} user={user} />
}
