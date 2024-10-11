import { Client } from 'pg'

import { DbError } from '../../../types/dbError'
import { insertIntoDb } from '../../../helpers/db/insertIntoDb'
import { InsertUserInput } from './types'

export const insertUserIntoDb = async (
  userData: InsertUserInput,
  client: Client
): Promise<{ id: string } | DbError> => {
  try {
    await insertIntoDb(
      `INSERT INTO Pulsepoint_User (id, username, email, password, profile_picture) values ($1, $2, $3, $4, $5)`,
      [
        userData.id,
        userData.username,
        userData.email,
        userData.password,
        userData.profilePicture,
      ],
      client
    )

    return { id: userData.id }
  } catch (error) {
    return {
      error,
      timestamp: new Date().getTime(),
      message: `An error has occured while inserted user.
      email : ${userData.email},
      username: ${userData.username},
      id: ${userData.id}
      `,
    }
  }
}
