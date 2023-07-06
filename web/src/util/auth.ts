import decode from 'jwt-decode'
import { cookies } from 'next/headers'
import User from './user'

export function getUser(): User | null {
  const token = cookies().get('token')?.value

  if (!token) {
    return null
  }

  const user: User = decode(token)

  return user
}
