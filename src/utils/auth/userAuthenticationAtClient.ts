import authStorage from '@/services/storage'

import { isTokenValid } from './token'

/**
 * # CLIENT AUTHENTICATION
 * ########################
 * Busca nos cookies do browser para validar a autenticação
 */

export function isUserAuthenticated() {
  const storage = authStorage()

  const authCookie = storage.getToken()

  if (!authCookie) {
    return null
  }

  const authValid = isTokenValid(authCookie.expireAt)

  return authValid ? authCookie.user : null
}
