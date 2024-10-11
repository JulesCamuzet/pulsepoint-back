import { Express } from 'express'
import { Client } from 'pg'

import { registerRoute } from './register'

export const addAuthRoutes = (app: Express, client: Client) => {
  registerRoute(app, client)
}
