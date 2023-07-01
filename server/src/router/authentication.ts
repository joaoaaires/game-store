import { Router } from 'express'

import { signIn, signUp } from '../controller/authentication'

export default (router: Router) => {
  router.post('/signUp', signUp)
  router.post('/signIn', signIn)
}
