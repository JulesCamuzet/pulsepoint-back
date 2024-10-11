import { Express } from 'express'
import { Client } from 'pg'

import { checkIsRegisterpayload } from './types'
import {
  getRegisterResponseDataFromErrorCode,
  RegisterRouteErrorCodes,
} from './types/errors'
import { checkRegisterPayload } from './utils/checkPayload'
import { registerModule } from '../../../modules/auth/register'

export const registerRoute = (app: Express, client: Client) => {
  app.post('/register', async (req, res) => {
    try {
      const payload = req.body

      if (!checkIsRegisterpayload(payload)) {
        const responseData = getRegisterResponseDataFromErrorCode(
          RegisterRouteErrorCodes.MISSING_PARAMS
        )

        res.status(responseData.status).send({
          message: responseData.message,
          code: responseData.code,
        })
        return
      }

      const checkPayloadResult = checkRegisterPayload(payload)

      if (checkPayloadResult.isError) {
        const responseData = getRegisterResponseDataFromErrorCode(
          checkPayloadResult.errorCode
        )

        res.status(responseData.status).send({
          message: responseData.message,
          code: responseData.code,
        })
        return
      }

      const insertUserResult = await registerModule(payload, client)

      if (insertUserResult.isError) {
        const responseData = getRegisterResponseDataFromErrorCode(
          insertUserResult.errorCode
        )

        res.status(responseData.status).send({
          message: responseData.message,
          code: responseData.code,
        })
        return
      }

      res.status(200).send({ userId: insertUserResult.result.userId })
      return
    } catch (error) {
      const responseData = getRegisterResponseDataFromErrorCode(
        RegisterRouteErrorCodes.UNKNOWN
      )

      res.status(responseData.status).send({
        message: responseData.message,
        code: responseData.code,
      })
      return
    }
  })
}
