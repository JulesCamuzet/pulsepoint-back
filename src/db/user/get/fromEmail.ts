import { Client } from 'pg'

import { DbError } from '../../../types/dbError'
import { checkIsUserDbRaw, UserDb } from '../types'
import { getOneFromDb } from '../../../helpers/db/getOneFromDb'
import { userRawToDb } from '../helpers/rawToDb'

export const getUserFromEmail = async (
  email: string,
  client: Client
): Promise<DbError | null | UserDb> => {
  try {
    const rawResult = await getOneFromDb(
      `SELECT id, username, email, profile_picture, password, created_at FROM pulsepoint_user WHERE email = $1`,
      [email],
      client
    )

    if (rawResult === null) {
      return null
    }

    if (!checkIsUserDbRaw(rawResult)) {
      return {
        timestamp: new Date().getTime(),
        message: `Error while getting user from email. Wrong user type.\nemail = ${email}`,
      }
    }

    const result = userRawToDb(rawResult)

    return result
  } catch (error) {
    return {
      timestamp: new Date().getTime(),
      message: `Error while getting user from email.\email = ${email}`,
      error,
    }
  }
}
