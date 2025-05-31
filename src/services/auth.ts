/* eslint-disable react-hooks/rules-of-hooks */

import storage from '@/services/storage'
import type { UserAuth } from '@/types/apiResponses'
import type { SessionUser } from '@/types/app'
import { isTokenValid } from '@/utils/auth/token'

export interface UserResponse {
  appToken: string
}

export function getUserFn(): SessionUser {
  const currAuth: UserAuth = storage().getToken()
  if (!currAuth || !currAuth.user) return undefined

  const authIsValid = isTokenValid(currAuth.expireAt)

  if (authIsValid) return currAuth.user

  storage().clearToken()
  return undefined
}

export async function validateAuthentication(loginAuth?: UserAuth) {
  const store = storage()
  const currAuth: UserAuth = store.getToken()

  const auth: UserAuth = loginAuth ?? currAuth

  if (!auth) {
    store.clearToken()
    throw new Error('Não foi possivel confirmar suas credenciais')
  }
  const authIsValid = isTokenValid(auth.expireAt)

  if (!authIsValid) {
    store.clearToken()
    throw new Error('Não foi possivel confirmar suas credenciais')
  }

  await store.setToken(auth)

  return auth.user
}
