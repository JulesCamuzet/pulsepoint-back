import { checkEmailFormat } from '../../../../helpers/format/email'
import { checkPasswordFormat } from '../../../../helpers/format/password'
import { checkUsernameFormat } from '../../../../helpers/format/username'
import { ModuleAndUtilsOutput } from '../../../../types/moduleAndUtilsOutput'
import { RegisterPayload } from '../types'
import { RegisterCheckPayloadErrorCodes } from './types/errors'

export const checkRegisterPayload = (
  payload: RegisterPayload
): ModuleAndUtilsOutput<true, RegisterCheckPayloadErrorCodes> => {
  if (!checkUsernameFormat(payload.username)) {
    return {
      isError: true,
      errorCode: RegisterCheckPayloadErrorCodes.WRONG_USERNAME_FORMAT,
    }
  }

  if (!checkEmailFormat(payload.email)) {
    return {
      isError: true,
      errorCode: RegisterCheckPayloadErrorCodes.WRONG_EMAIL_FORMAT,
    }
  }

  if (!checkPasswordFormat(payload.password)) {
    return {
      isError: true,
      errorCode: RegisterCheckPayloadErrorCodes.WRONG_PASSWORD_FORMAT,
    }
  }

  return {
    isError: false,
    result: true,
  }
}
