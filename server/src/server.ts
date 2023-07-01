import cors from 'cors'
import express, { Express } from 'express'

import router from './router'

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(router())

app.listen(3333, () => {
  console.log('Server is running at http://localhost:3333')
})
