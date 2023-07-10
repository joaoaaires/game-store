import { z } from 'zod'
import { Request, Response, Express } from 'express'
import moment from 'moment'

import { prisma } from '../lib/prisma'
import {
  generateObjectResponse,
  generateErrorResponse,
} from '../lib/object-response'
import { Game } from '../model'
import { Prisma } from '@prisma/client'

export async function create(req: Request, res: Response) {
  const result = generateBodySchema(req)

  if (!result.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorResponse(result.error.issues),
    })
  }

  const { sub } = JSON.parse(req.params.usuario)

  const newGame: Game = result.data

  const gameDb = await prisma.game.create({
    data: {
      userId: parseInt(sub),
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

export async function createValidation(req: Request, res: Response) {
  const result = generateBodySchema(req)

  if (!result.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorResponse(result.error.issues),
    })
  }

  const newGame = result.data

  return generateObjectResponse(res, {
    status: 200,
    data: newGame,
  })
}

export async function readAll(req: Request, res: Response) {
  const schemaParams = z.object({
    query: z.string().optional(),
    price: z.string().optional(),
    days: z.string().optional(),
    category: z.string().optional(),
    page: z.string().optional(),
    perPage: z.string().optional(),
    perUser: z.string().optional(),
  })

  const result = schemaParams.safeParse(req.query)

  if (!result.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorResponse(result.error.issues),
    })
  }

  const { query, price, days, category, page, perPage, perUser } = result.data

  let where = {}
  if (perUser && perUser === 'true') {
    let userId = 0
    const usuario = req.params.usuario
    if (usuario) {
      const { sub } = JSON.parse(usuario)
      userId = parseInt(sub)
    }

    where = {
      ...where,
      ...{
        userId,
      },
    }
  }
  if (query) where = { ...where, ...{ title: { contains: query } } }
  if (category) {
    where = {
      ...where,
      ...{ categories: { some: { categoryId: Number(category) } } },
    }
  }
  if (price) {
    where = {
      ...where,
      ...{
        prices: {
          some: {
            price: {
              lte: Number(price),
            },
          },
        },
      },
    }
  }
  if (days) {
    where = {
      ...where,
      ...{
        createAt: {
          gte: moment().subtract(Number(days), 'days').toISOString(),
          lte: moment().add(1, 'days').toISOString(),
        },
      },
    }
  }
  const pageNumber = Number(page ?? '0')
  const perPageNumber = Number(perPage ?? '10')

  const games = await prisma.game.findMany({
    skip: pageNumber * perPageNumber,
    take: perPageNumber,
    where,
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
      prices: true,
    },
    orderBy: {
      createAt: Prisma.SortOrder.desc,
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
        price:
          game.prices && game.prices.length ? Number(game.prices[0].price) : 0,
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
      message: generateErrorResponse(result.error.issues),
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

  let paidGame = false
  let showPrice = false
  const usuario = req.params.usuario
  if (usuario) {
    const { sub } = JSON.parse(usuario)
    showPrice = true
    paidGame = gameDb.userId === parseInt(sub)
  }

  console.log(showPrice)

  const gameFormatter = {
    id: gameDb.id,
    userId: gameDb.userId,
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
    prices: showPrice
      ? gameDb.prices.map((priceValue) => {
          const { id, price } = priceValue
          return { id, price: Number(price), paidGame }
        })
      : [],
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
      message: generateErrorResponse(resultParams.error.issues),
    })
  }

  const { id } = resultParams.data

  const resultBody = generateBodySchema(req)

  if (!resultBody.success) {
    return generateObjectResponse(res, {
      status: 400,
      message: generateErrorResponse(resultBody.error.issues),
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
          required_error: 'Título é obrigatório',
        })
        .nonempty({
          message: 'Título é obrigatório',
        }),
      shortDescription: z
        .string({
          required_error: 'Descrição curta é obrigatória',
        })
        .nonempty({
          message: 'Descrição curta é obrigatória',
        }),
      description: z
        .string({
          required_error: 'Descrição é obrigatória',
        })
        .nonempty({
          message: 'Descrição é obrigatória',
        }),
      actor: z
        .string({
          required_error: 'Ator é obrigatório',
        })
        .nonempty({
          message: 'Ator é obrigatório',
        }),
      avatarUrl: z
        .string({
          required_error: 'Avatar é obrigatório',
        })
        .nonempty({
          message: 'Avatar é obrigatório',
        }),
      headerUrl: z
        .string({
          required_error: 'Capa é obrigatório',
        })
        .nonempty({
          message: 'Capa é obrigatório',
        }),
      uurest: z
        .string({
          required_error: 'Url é obrigatória',
        })
        .nonempty({
          message: 'Url é obrigatória',
        }),
      categories: z
        .array(z.object({ id: z.number() }), {
          required_error: 'Categorias são obrigatórias',
        })
        .nonempty({
          message: 'Categorias são obrigatórias',
        }),
      systems: z
        .array(z.object({ id: z.number() }), {
          required_error: 'Sistemas operacionais são obrigatórias',
        })
        .nonempty({
          message: 'Sistemas operacionais são obrigatórias',
        }),
      screens: z
        .array(z.object({ screenUrl: z.string() }), {
          required_error: 'Screenshots são obrigatórias',
        })
        .nonempty({
          message: 'Screenshots são obrigatórias',
        }),
      builds: z
        .array(z.object({ buildNumber: z.number(), description: z.string() }), {
          required_error: 'Build é obrigatória',
        })
        .nonempty({
          message: 'Build  é obrigatória',
        }),
      prices: z
        .array(z.object({ price: z.number() }), {
          required_error: 'Preço é obrigatória',
        })
        .nonempty({
          message: 'Preço é obrigatória',
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
