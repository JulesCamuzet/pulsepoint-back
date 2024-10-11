import { RegisterModuleErrorCodes } from '../../../../../modules/auth/register/types/errors'
import { ResponseData } from '../../../../../types/responseData'
import { RegisterCheckPayloadErrorCodes } from '../../utils/types/errors'

export enum RegisterRouteErrorCodes {
  MISSING_PARAMS = 'MISSING_PARAMS',
  UNKNOWN = 'UNKNOWN',
}

type RegisterErrorCode =
  | RegisterRouteErrorCodes
  | RegisterCheckPayloadErrorCodes
  | RegisterModuleErrorCodes

const registerMapErrorCodesAndResponseData: Record<
  RegisterErrorCode,
  ResponseData
> = {
  [RegisterRouteErrorCodes.MISSING_PARAMS]: {
    status: 400,
    code: 'MISSING_PARAMS',
    message: 'At least one parameter is missing.',
  },
  [RegisterRouteErrorCodes.UNKNOWN]: {
    status: 400,
    code: 'UNKNOWN',
    message: 'An unknown error has occured.',
  },
  [RegisterCheckPayloadErrorCodes.WRONG_EMAIL_FORMAT]: {
    status: 400,
    code: 'WRONG_EMAIL_FORMAT',
    message: 'The format of the email is wrong.',
  },
  [RegisterCheckPayloadErrorCodes.WRONG_PASSWORD_FORMAT]: {
    status: 400,
    code: 'WRONG_PASSWORD_FORMAT',
    message: 'The format of the password is wrong.',
  },
  [RegisterCheckPayloadErrorCodes.WRONG_USERNAME_FORMAT]: {
    status: 400,
    code: 'WRONG_USERNAME_FORMAT',
    message: 'The format of the username is wrong.',
  },
  [RegisterModuleErrorCodes.UNKNOWN]: {
    status: 400,
    code: 'UNKNOWN',
    message: 'An unknown error has occured.',
  },
  [RegisterModuleErrorCodes.DB_ERROR]: {
    status: 400,
    code: 'UNKNOWN',
    message: 'An unknown error has occured.',
  },
  [RegisterModuleErrorCodes.EMAIL_ALREADY_USED]: {
    status: 403,
    code: 'EMAIL_ALREADY_USED',
    message: 'This email is already used.',
  },
  [RegisterModuleErrorCodes.USERNAME_ALREADY_USED]: {
    status: 403,
    code: 'USERNAME_ALREADY_USED',
    message: 'This username is already used.',
  },
}

export const getRegisterResponseDataFromErrorCode = (
  code: RegisterErrorCode
) => {
  return registerMapErrorCodesAndResponseData[code]
}
