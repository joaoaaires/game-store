import { z } from 'zod'
import { ErrorMessageOptions, generateErrorMessage } from 'zod-error'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { generateObjectResponse } from '../lib/object-response'
import { generateToken } from '../lib/jwt'

const options: ErrorMessageOptions = {
  delimiter: {
    error: '#',
  },
  transform: ({ messageComponent }) => `${messageComponent}`,
}

export async function signUp(req: Request, res: Response) {
  const result = generateBodySchemaSignUp(req)

  if (!result.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorMessage(result.error.issues, options),
    })
  }

  const { name, email, password } = result.data

  let user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (user) {
    return generateObjectResponse(res, {
      status: 400,
      message: 'Usuário já existe',
    })
  }

  user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })

  const { id, isDev, createAt, updateAt } = user
  const token = await generateToken({ id, name, email, isDev })
  const userResponse = { id, email, token, createAt, updateAt }

  return generateObjectResponse(res, {
    status: 200,
    data: userResponse,
  })
}

export async function signIn(req: Request, res: Response) {
  const result = generateBodySchemaSignIn(req)

  if (!result.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorMessage(result.error.issues, options),
    })
  }

  const { email, password } = result.data

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    return generateObjectResponse(res, {
      status: 400,
      message:
        'Não encontramos uma conta com esse endereço de email ou senha não coresponde a mesma cadastrada.',
    })
  }

  if (user.password !== password) {
    return generateObjectResponse(res, {
      status: 400,
      message:
        'Não encontramos uma conta com esse endereço de email ou senha não coresponde a mesma cadastrada.',
    })
  }

  const { id, name, isDev, createAt, updateAt } = user
  const token = await generateToken({ id, name, email, isDev })
  const userResponse = { id, email, token, createAt, updateAt }

  return generateObjectResponse(res, {
    status: 200,
    data: userResponse,
  })
}

function generateBodySchemaSignUp(req: Request): z.SafeParseReturnType<
  {
    name: string
    email: string
    password: string
  },
  {
    name: string
    email: string
    password: string
  }
> {
  return z
    .object({
      name: z
        .string({
          required_error: 'Nome é obrigatório',
        })
        .nonempty({
          message: 'Nome é obrigatório',
        }),
      email: z
        .string({
          required_error: 'E-mail é obrigatório',
        })
        .nonempty({
          message: 'E-mail é obrigatório',
        }),
      password: z
        .string({
          required_error: 'Senha é obrigatória',
        })
        .nonempty({
          message: 'Senha é obrigatória',
        }),
    })
    .safeParse(req.body)
}

function generateBodySchemaSignIn(req: Request): z.SafeParseReturnType<
  {
    email: string
    password: string
  },
  {
    email: string
    password: string
  }
> {
  return z
    .object({
      email: z
        .string({
          required_error: 'E-mail é obrigatório',
        })
        .nonempty({
          message: 'E-mail é obrigatório',
        }),
      password: z
        .string({
          required_error: 'Senha é obrigatória',
        })
        .nonempty({
          message: 'Senha é obrigatória',
        }),
    })
    .safeParse(req.body)
}
