import { UserDb, UserDbRaw } from '../types'

export const userRawToDb = (userRaw: UserDbRaw): UserDb => {
  return {
    id: userRaw.id,
    username: userRaw.username,
    email: userRaw.email,
    profilePicture: userRaw.profile_picture,
    password: userRaw.password,
    createdAt: userRaw.created_at,
  }
}
