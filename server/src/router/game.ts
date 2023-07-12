import multer from 'multer'
import { Router } from 'express'
import { randomUUID } from 'node:crypto'

import {
  buy,
  create,
  createValidation,
  read,
  readAll,
  readById,
  update,
  upload,
} from '../controller/game'
import { validationToken, validationTokenWithOut } from '../lib/jwt'

export default (router: Router) => {
  router.post('/games', validationToken, create)
  router.post('/games/validation', validationToken, createValidation)
  router.get('/games', validationTokenWithOut, readAll)
  router.get('/games/:game', validationTokenWithOut, read)
  router.get('/games/:game/edit', validationToken, readById)
  router.put('/games/:game/buy', validationToken, buy)
  router.put('/games/:id', validationToken, update)

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/' + file.fieldname)
    },
    filename: function (req, file, cb) {
      // Extração da extensão do arquivo original:
      const extensaoArquivo = file.originalname.split('.')[1]

      // Cria um código randômico que será o nome do arquivo
      const novoNomeArquivo = randomUUID()

      // Indica o novo nome do arquivo:
      cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    },
  })

  const uploadMulter = multer({
    storage,
  })
  router.post(
    '/games/upload',
    validationToken,
    uploadMulter.fields([
      { name: 'header' },
      { name: 'avatar' },
      { name: 'screen' },
      { name: 'build' },
    ]),
    upload,
  )
}
