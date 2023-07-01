import { Router } from 'express'

import { findAll } from '../controller/operational-systems'

export default (router: Router) => {
  router.get('/systems', findAll)
}
