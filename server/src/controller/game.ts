import { z } from 'zod'
import { generateErrorMessage } from 'zod-error'
import { Request, Response, Express } from 'express'

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
            operationalSystems: {
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

export async function readAll(req: Request, res: Response) {
  const games = await prisma.game.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      systems: {
        include: {
          operationalSystems: true,
        },
      },
    },
  })

  return generateObjectResponse(res, {
    status: 200,
    data: games.map((game) => {
      return {
        id: game.id,
        avatarUrl: game.avatarUrl,
        title: game.title,
        shortDescription: game.shortDescription,
        actor: game.actor,
        uurest: game.uurest,
        categories: game.categories.map((category) => {
          const categoryChild = category.category
          const { description } = categoryChild
          return { description }
        }),
        systems: game.systems.map((system) => {
          const systemChild = system.operationalSystems
          const { description } = systemChild
          return { description }
        }),
      }
    }),
  })
}

export async function read(req: Request, res: Response) {
  const schemaParams = z.object({
    game: z
      .string({
        required_error: 'params-is-required',
      })
      .nonempty({
        message: 'params-is-empty',
      }),
  })

  const result = schemaParams.safeParse(req.params)

  if (!result.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorMessage(result.error.issues),
    })
  }

  const { game } = result.data

  const id = Number(game)
  const gameDb = await prisma.game.findFirst({
    where: id ? { id } : { uurest: game },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      systems: {
        include: {
          operationalSystems: true,
        },
      },
      screens: true,
      prices: true,
      builds: true,
    },
  })

  if (!gameDb) {
    return generateObjectResponse(res, {
      status: 400,
      message: 'game-not-found',
    })
  }

  const gameFormatter = {
    id: gameDb.id,
    title: gameDb.title,
    shortDescription: gameDb.shortDescription,
    description: gameDb.description,
    actor: gameDb.actor,
    avatarUrl: gameDb.avatarUrl,
    headerUrl: gameDb.headerUrl,
    uurest: gameDb.uurest,
    createAt: gameDb.createAt,
    updateAt: gameDb.updateAt,
    categories: gameDb.categories.map((category) => {
      const categoryChild = category.category
      const { id, description } = categoryChild
      return { id, description }
    }),
    systems: gameDb.systems.map((system) => {
      const systemChild = system.operationalSystems
      const { id, description } = systemChild
      return { id, description }
    }),
    screens: gameDb.screens.map((screen) => {
      const { id, screenUrl } = screen
      return { id, screenUrl }
    }),
    prices: gameDb.prices.map((priceValue) => {
      const { id, price } = priceValue
      return { id, price: Number(price) }
    }),
    builds: gameDb.builds.map((build) => {
      const { id, buildNumber, description } = build
      return { id, buildNumber, description }
    }),
  }

  return generateObjectResponse(res, {
    status: 200,
    data: gameFormatter,
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
            operationalSystems: {
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

export async function upload(req: Request, res: Response) {
  const { header, avatar, screen, build } = req.files as {
    header: Express.Multer.File[] | null | undefined
    avatar: Express.Multer.File[] | null | undefined
    screen: Express.Multer.File[] | null | undefined
    build: Express.Multer.File[] | null | undefined
  }

  let files: Express.Multer.File[] = []
  if (header) files = files.concat(header)
  if (avatar) files = files.concat(avatar)
  if (screen) files = files.concat(screen)
  if (build) files = files.concat(build)

  return generateObjectResponse(res, {
    status: 200,
    data: files.map((file) => {
      if (!file) return null
      const fullUrl = req.protocol
        .concat('://')
        .concat(req.hostname)
        .concat(':')
        .concat('3333')
      const fileUrl = new URL(
        `/${file.destination}/${file.filename}`,
        fullUrl,
      ).toString()
      return { type: file.fieldname, url: fileUrl }
    }),
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
