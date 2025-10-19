/* eslint-disable react-hooks/rules-of-hooks */

import storage from '@/services/storage'
import type { AuthData } from '@/types/apiResponses'
import type { SessionUser } from '@/types/user'
import { isTokenValid } from '@/utils/auth/token'

export interface UserResponse {
  appToken: string
}

export function getUserFn(): SessionUser {
  const currAuth: AuthData = storage().getToken()
  if (!currAuth || !currAuth.user) return undefined

  const authIsValid = isTokenValid(currAuth.expireAt)

  if (authIsValid) return currAuth.user

  storage().clearToken()
  return undefined
}
