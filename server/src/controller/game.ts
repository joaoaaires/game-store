import { z } from 'zod'
import { generateErrorMessage } from 'zod-error'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { generateObjectResponse } from '../lib/object-response'
import { Game } from '../model'

export async function create(req: Request, res: Response) {
  const result = generateBodySchema(req)

  if (!result.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorMessage(result.error.issues),
    })
  }

  const newGame: Game = result.data

  const gameDb = await prisma.game.create({
    data: {
      title: newGame.title,
      shortDescription: newGame.shortDescription,
      description: newGame.description,
      actor: newGame.actor,
      avatarUrl: newGame.avatarUrl,
      headerUrl: newGame.headerUrl,
      uurest: newGame.uurest,
      categories: {
        create: newGame.categories.map((category) => {
          return {
            category: {
              connect: {
                id: category.id,
              },
            },
          }
        }),
      },
      systems: {
        create: newGame.systems.map((os) => {
          return {
            OperationalSystems: {
              connect: {
                id: os.id,
              },
            },
          }
        }),
      },
      screens: {
        create: newGame.screens.map((screen) => {
          return {
            screenUrl: screen.screenUrl,
          }
        }),
      },
      builds: {
        create: newGame.builds.map((build) => {
          return {
            buildNumber: build.buildNumber,
            description: build.description,
          }
        }),
      },
      prices: {
        create: newGame.prices.map((price) => {
          return {
            price: price.price,
          }
        }),
      },
    },
  })

  return generateObjectResponse(res, {
    status: 200,
    data: gameDb,
  })
}

export async function update(req: Request, res: Response) {
  const resultParams = generateParamsSchema(req)

  if (!resultParams.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorMessage(resultParams.error.issues),
    })
  }

  const { id } = resultParams.data

  const resultBody = generateBodySchema(req)

  if (!resultBody.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorMessage(resultBody.error.issues),
    })
  }

  const newGame: Game = resultBody.data

  let game = await prisma.game.findFirst({
    where: {
      id: parseInt(id),
    },
  })

  if (!game) {
    return generateObjectResponse(res, {
      status: 400,
      message: 'game-not-exist',
    })
  }

  game = await prisma.game.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: newGame.title,
      shortDescription: newGame.shortDescription,
      description: newGame.description,
      actor: newGame.actor,
      avatarUrl: newGame.avatarUrl,
      headerUrl: newGame.headerUrl,
      uurest: newGame.uurest,
      categories: {
        deleteMany: {},
        create: newGame.categories.map((category) => {
          return {
            category: {
              connect: {
                id: category.id,
              },
            },
          }
        }),
      },
      systems: {
        deleteMany: {},
        create: newGame.systems.map((os) => {
          return {
            OperationalSystems: {
              connect: {
                id: os.id,
              },
            },
          }
        }),
      },
      screens: {
        deleteMany: {},
        create: newGame.screens.map((screen) => {
          return {
            screenUrl: screen.screenUrl,
          }
        }),
      },
      builds: {
        deleteMany: {},
        create: newGame.builds.map((build) => {
          return {
            buildNumber: build.buildNumber,
            description: build.description,
          }
        }),
      },
      prices: {
        deleteMany: {},
        create: newGame.prices.map((price) => {
          return {
            price: price.price,
          }
        }),
      },
    },
  })

  return generateObjectResponse(res, {
    status: 200,
    data: game,
  })
}

function generateBodySchema(req: Request): z.SafeParseReturnType<Game, Game> {
  return z
    .object({
      title: z
        .string({
          required_error: 'title-is-required',
        })
        .nonempty({
          message: 'title-is-empty',
        }),
      shortDescription: z
        .string({
          required_error: 'short-description-is-required',
        })
        .nonempty({
          message: 'short-description-is-empty',
        }),
      description: z
        .string({
          required_error: 'description-is-required',
        })
        .nonempty({
          message: 'description-is-empty',
        }),
      actor: z
        .string({
          required_error: 'actor-is-required',
        })
        .nonempty({
          message: 'actor-is-empty',
        }),
      avatarUrl: z
        .string({
          required_error: 'avatar-url-is-required',
        })
        .nonempty({
          message: 'avatar-url-is-empty',
        }),
      headerUrl: z
        .string({
          required_error: 'header-url-is-required',
        })
        .nonempty({
          message: 'header-url-is-empty',
        }),
      uurest: z
        .string({
          required_error: 'uurest-is-required',
        })
        .nonempty({
          message: 'uurest-is-empty',
        }),
      categories: z
        .array(z.object({ id: z.number() }), {
          required_error: 'categories-is-required',
        })
        .nonempty({
          message: 'categories-is-empty',
        }),
      systems: z
        .array(z.object({ id: z.number() }), {
          required_error: 'systems-is-required',
        })
        .nonempty({
          message: 'systems-is-empty',
        }),
      screens: z
        .array(z.object({ screenUrl: z.string() }), {
          required_error: 'screens-is-required',
        })
        .nonempty({
          message: 'screens-is-empty',
        }),
      builds: z
        .array(z.object({ buildNumber: z.number(), description: z.string() }), {
          required_error: 'builds-is-required',
        })
        .nonempty({
          message: 'builds-is-empty',
        }),
      prices: z
        .array(z.object({ price: z.number() }), {
          required_error: 'prices-is-required',
        })
        .nonempty({
          message: 'prices-is-empty',
        }),
    })
    .safeParse(req.body)
}

function generateParamsSchema(
  req: Request,
): z.SafeParseReturnType<{ id: string }, { id: string }> {
  return z
    .object({
      id: z.string().nonempty(),
    })
    .safeParse(req.params)
}
