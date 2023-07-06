import decode from 'jwt-decode'
import Cookie from 'js-cookie'
import User from './user'

export function getUserUseClient(): User | null {
  const token = Cookie.get('token')

  if (!token) {
    return null
  }

  const user: User = decode(token)

  return user
}
