import { Client } from 'pg'

import { getOneFromDb } from '../../../helpers/db/getOneFromDb'
import { checkIsUserDbRaw, UserDb } from '../types'
import { DbError } from '../../../types/dbError'
import { userRawToDb } from '../helpers/rawToDb'

export const getUserFromUsername = async (
  username: string,
  client: Client
): Promise<UserDb | null | DbError> => {
  try {
    const rawResult = await getOneFromDb(
      `SELECT id, username, email, profile_picture, password, created_at FROM Pulsepoint_User WHERE username = $1`,
      [username],
      client
    )

    if (rawResult === null) {
      return null
    }

    if (!checkIsUserDbRaw(rawResult)) {
      return {
        timestamp: new Date().getTime(),
        message: `Error while getting user from username. Wrong user type. username = ${username}`,
      }
    }

    const result = userRawToDb(rawResult)

    return result
  } catch (error) {
    return {
      timestamp: new Date().getTime(),
      message: `Error while getting user from username. username = ${username}`,
      error,
    }
  }
}
