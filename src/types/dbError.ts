export type DbError = {
  timestamp: number
  message: string
  error?: unknown
}

export const checkIsDbError = (val: any): val is DbError => {
  return (
    val &&
    typeof val.timestamp === 'number' &&
    typeof val.message === 'string' &&
    (typeof val.error === 'undefined' || val.error)
  )
}
