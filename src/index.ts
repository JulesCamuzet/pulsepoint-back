import Express from 'express'
import { Client } from 'pg'
import { configDotenv } from 'dotenv'

import { addRoutes } from './routes'
import bodyParser from 'body-parser'

configDotenv()

const app = Express()

app.use(bodyParser.json())

const port = process.env.PORT ?? '1234'

;(async () => {
  const client = new Client({
    user: process.env.DB_USER ?? 'root',
    host: process.env.DB_HOST ?? 'localhost',
    database: process.env.DB_NAME ?? 'database',
    password: process.env.DB_PASSWORD ?? 'password',
    port: Number(process.env.DB_PASSWORD) ?? 5432,
  })

  await client.connect()

  addRoutes(app, client)

  app.listen(port, () => {
    console.log('App is running on port ' + port)
  })
})()
