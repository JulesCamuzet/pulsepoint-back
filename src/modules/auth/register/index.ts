import { Client } from 'pg'

import { RegisterPayload } from '../../../routes/auth/register/types'
import { getUserFromUsername } from '../../../db/user/get/fromUsername'
import { checkIsDbError } from '../../../types/dbError'
import { RegisterModuleErrorCodes } from './types/errors'
import { getUserFromEmail } from '../../../db/user/get/fromEmail'
import { generateId } from '../../../helpers/id/generateId'
import { hashPassword } from '../../../helpers/password/hashPassword'
import { insertUserIntoDb } from '../../../db/user/insert'
import { ModuleAndUtilsOutput } from '../../../types/moduleAndUtilsOutput'
import { RegisterModuleOutput } from './types'

export const registerModule = async (
  payload: RegisterPayload,
  client: Client
): Promise<
  ModuleAndUtilsOutput<RegisterModuleOutput, RegisterModuleErrorCodes>
> => {
  try {
    const userFromUsername = await getUserFromUsername(payload.username, client)

    if (checkIsDbError(userFromUsername)) {
      console.error(userFromUsername)
      return { isError: true, errorCode: RegisterModuleErrorCodes.DB_ERROR }
    }

    if (userFromUsername) {
      return {
        isError: true,
        errorCode: RegisterModuleErrorCodes.USERNAME_ALREADY_USED,
      }
    }

    const userFromEmail = await getUserFromEmail(payload.email, client)

    if (checkIsDbError(userFromEmail)) {
      console.error(userFromEmail)
      return { isError: true, errorCode: RegisterModuleErrorCodes.DB_ERROR }
    }

    if (userFromEmail) {
      return {
        isError: true,
        errorCode: RegisterModuleErrorCodes.EMAIL_ALREADY_USED,
      }
    }

    const id = generateId()

    const hashedPassword = hashPassword(payload.password)
    const insertUserResult = await insertUserIntoDb(
      {
        id,
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
        profilePicture: null,
      },
      client
    )

    if (checkIsDbError(insertUserResult)) {
      console.error(insertUserResult)
      return { isError: true, errorCode: RegisterModuleErrorCodes.DB_ERROR }
    }

    return { isError: false, result: { userId: id } }
  } catch (error) {
    console.error(error)
    return { isError: true, errorCode: RegisterModuleErrorCodes.UNKNOWN }
  }
}
