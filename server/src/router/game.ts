import multer from 'multer'
import { Router } from 'express'
import { randomUUID } from 'node:crypto'

import { create, read, readAll, update, upload } from '../controller/game'
import { validationToken } from '../lib/jwt'

export default (router: Router) => {
  router.post('/games', validationToken, create)
  router.get('/games', readAll)
  router.get('/games/:game', read)
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
