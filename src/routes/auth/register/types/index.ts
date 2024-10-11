export type RegisterPayload = {
  username: string
  email: string
  password: string
}

export const checkIsRegisterpayload = (val: any): val is RegisterPayload => {
  return (
    val &&
    typeof val.username === 'string' &&
    typeof val.email === 'string' &&
    typeof val.password === 'string'
  )
}
