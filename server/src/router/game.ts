import multer from 'multer'
import { Router } from 'express'
import { randomUUID } from 'node:crypto'

import { create, readAll, update, upload } from '../controller/game'

export default (router: Router) => {
  router.post('/games', create)
  router.get('/games', readAll)
  router.put('/games/:id', update)

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
    uploadMulter.fields([
      { name: 'header' },
      { name: 'avatar' },
      { name: 'screen' },
      { name: 'build' },
    ]),
    upload,
  )
}
