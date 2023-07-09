import fs from 'fs'
import cors from 'cors'
import express, { Express } from 'express'

import router from './router'
import { resolve } from 'node:path'

const app: Express = express()

try {
  const folderName = 'uploads'
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
  const foldersName = [
    'uploads/avatar',
    'uploads/build',
    'uploads/header',
    'uploads/screen',
  ]
  foldersName.forEach((fn) => {
    if (!fs.existsSync(fn)) {
      fs.mkdirSync(fn)
    }
  })
} catch (err) {
  console.error(err)
}

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(resolve(__dirname, '../uploads')))

app.use(router())

app.listen(3333, () => {
  console.log('Server is running at http://localhost:3333')
})
