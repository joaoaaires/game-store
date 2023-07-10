import { SignJWT, jwtVerify } from 'jose'
import { Request, Response, NextFunction } from 'express'
import { generateObjectResponse } from './object-response'

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

export async function validationToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization

  if (!authorization) {
    return generateObjectResponse(res, {
      status: 401,
      message: 'Not Authenticated',
    })
  }

  try {
    const { payload } = await jwtVerify(authorization, secret)

    req.params.usuario = JSON.stringify(payload)
    return next()
  } catch (e) {
    console.log(e)
    return generateObjectResponse(res, {
      status: 401,
      message: 'Not Authorization',
    })
  }
}

export async function validationTokenWithOut(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization

  if (!authorization) {
    return next()
  }

  try {
    const { payload } = await jwtVerify(authorization, secret)

    req.params.usuario = JSON.stringify(payload)
    return next()
  } catch (e) {
    console.log(e)
    return next()
  }
}
