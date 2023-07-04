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
    const { payload, protectedHeader } = await jwtVerify(authorization, secret)

    console.log(protectedHeader)
    console.log(payload)

    return next()
  } catch (e) {
    console.log(e)
    return generateObjectResponse(res, {
      status: 401,
      message: 'Not Authorization',
    })
  }

  /*
  jwt.verify(req.headers.authorization, 'shhhhh', function (err, usuario) {
    if (err) throw err

    console.log('usuario -> ', usuario)

    if (usuario) {
      req.params.usuario = usuario
      return next()
    } else {
      return res.status(401).send('Not Authorization')
    }
  })
  */
}
