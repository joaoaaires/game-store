import { Router } from 'express'

import { create, update } from '../controller/game'

export default (router: Router) => {
  router.post('/games', create)
  router.put('/games/:id', update)
}
