import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { appCookies } from '@/config/cookies'
import type { UserAuthData } from '@/types/apiResponses'

import { isTokenValid } from './token'

/**
 * # SERVER AUTHENTICATION
 * ########################
 * Busca nos headers pelos cookies para validar a autenticação
 */

interface UserAuthenticatedOptions {
  shouldNoCookieRedirect?: boolean
  noCookieRedirect?: string
}

export function isUserAuthenticated(props?: UserAuthenticatedOptions) {
  const reqCookies = cookies()

  const authCookie = reqCookies.get(appCookies.auth)

  if (!authCookie && (props?.shouldNoCookieRedirect ?? true)) {
    redirect(props?.noCookieRedirect ?? '/')
  }

  if (!authCookie) {
    return
  }

  const data: UserAuthData = JSON.parse(authCookie.value)

  const authValid = isTokenValid(data.expireAt)

  if (!authValid) {
    return
  }

  return data
}
