import { Request, Response } from 'express'

import { generateObjectResponse } from '../lib/object-response'
import { prisma } from '../lib/prisma'

export async function findAll(req: Request, res: Response) {
  const categories = await prisma.category.findMany()

  return generateObjectResponse(res, {
    status: 200,
    data: categories.map((category) => {
      return {
        id: category.id,
        description: category.description,
      }
    }),
  })
}
