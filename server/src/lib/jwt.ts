import { SignJWT } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function generateToken(params: {
  id: number
  name: string
  email: string
  isDev: boolean
}) {
  return await new SignJWT({
    name: params.name,
    email: params.email,
    isDev: params.isDev,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(`${params.id}`)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}
