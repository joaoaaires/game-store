import { Request, Response, Router } from 'express'

import authentication from './authentication'
import category from './category'
import operationalSystems from './operational-systems'
import game from './game'

export default (): Router => {
  const router = Router()

  authentication(router)
  category(router)
  operationalSystems(router)
  game(router)

  router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ success: true })
  })

  return router
}
