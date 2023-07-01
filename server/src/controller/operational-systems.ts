import { Request, Response } from 'express'

import { generateObjectResponse } from '../lib/object-response'
import { prisma } from '../lib/prisma'

export async function findAll(req: Request, res: Response) {
  const systems = await prisma.operationalSystems.findMany()

  return generateObjectResponse(res, {
    status: 200,
    data: systems.map((os) => {
      return {
        id: os.id,
        description: os.description,
      }
    }),
  })
}
