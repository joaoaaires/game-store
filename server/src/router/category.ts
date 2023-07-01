import { Router } from 'express'

import { findAll } from '../controller/category'

export default (router: Router) => {
  router.get('/categories', findAll)
}
