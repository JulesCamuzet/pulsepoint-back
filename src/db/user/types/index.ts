export type UserDb = {
  id: string
  username: string
  email: string
  profilePicture: string | null
  password: string
  createdAt: Date
}

export type UserDbRaw = {
  id: string
  username: string
  email: string
  profile_picture: string
  password: string
  created_at: Date
}

export const checkIsUserDb = (val: any): val is UserDb => {
  return (
    val &&
    typeof val.id === 'string' &&
    typeof val.username === 'string' &&
    typeof val.email === 'string' &&
    (typeof val.profilepicture === 'string' || val.profilepicture === null) &&
    typeof val.password === 'string' &&
    val.createdat instanceof Date
  )
}

export const checkIsUserDbRaw = (val: any): val is UserDbRaw => {
  return (
    val &&
    typeof val.id === 'string' &&
    typeof val.username === 'string' &&
    typeof val.email === 'string' &&
    (typeof val.profile_picture === 'string' || val.profile_picture === null) &&
    typeof val.password === 'string' &&
    val.created_at instanceof Date
  )
}
