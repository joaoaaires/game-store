import { z } from 'zod'
import { generateErrorMessage } from 'zod-error'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { generateObjectResponse } from '../lib/object-response'
import { UserSignUp, UserSignIn } from '../model'
import { generateToken } from '../lib/jwt'

export async function signUp(req: Request, res: Response) {
  const result = generateBodySchemaSignUp(req)

  if (!result.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorMessage(result.error.issues),
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
      message: 'user-exist',
    })
  }

  user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })

  const { id, createAt, updateAt } = user
  const token = await generateToken({ id, name, email })
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
      message: generateErrorMessage(result.error.issues),
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
      message: 'fields-invalid',
    })
  }

  if (user.password !== password) {
    return generateObjectResponse(res, {
      status: 400,
      message: 'fields-invalid',
    })
  }

  const { id, name, createAt, updateAt } = user
  const token = await generateToken({ id, name, email })
  const userResponse = { id, email, token, createAt, updateAt }

  return generateObjectResponse(res, {
    status: 200,
    data: userResponse,
  })
}

function generateBodySchemaSignUp(
  req: Request,
): z.SafeParseReturnType<UserSignUp, UserSignUp> {
  return z
    .object({
      name: z
        .string({
          required_error: 'name-is-required',
        })
        .nonempty({
          message: 'name-is-empty',
        }),
      email: z
        .string({
          required_error: 'email-is-required',
        })
        .nonempty({
          message: 'email-is-empty',
        }),
      password: z
        .string({
          required_error: 'password-is-required',
        })
        .nonempty({
          message: 'password-is-empty',
        }),
    })
    .safeParse(req.body)
}

function generateBodySchemaSignIn(
  req: Request,
): z.SafeParseReturnType<UserSignIn, UserSignIn> {
  return z
    .object({
      email: z
        .string({
          required_error: 'email-is-required',
        })
        .nonempty({
          message: 'email-is-empty',
        }),
      password: z
        .string({
          required_error: 'password-is-required',
        })
        .nonempty({
          message: 'password-is-empty',
        }),
    })
    .safeParse(req.body)
}
