import { Express } from 'express'
import { Client } from 'pg'

import { addAuthRoutes } from './routes/auth'

export const addRoutes = (app: Express, client: Client) => {
  addAuthRoutes(app, client)
}
