export type ModuleAndUtilsOutput<ResultType, ErrorCodeEnum> =
  | {
      isError: true
      errorCode: ErrorCodeEnum
    }
  | {
      isError: false
      result: ResultType
    }
