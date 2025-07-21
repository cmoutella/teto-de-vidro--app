import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { appCokies } from '@/config/cookies'
import { cookie } from '@/services/cookies'
import type { AuthData } from '@/types/apiResponses'

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

export async function isUserAuthenticated({
  shouldNoCookieRedirect = true,
  noCookieRedirect = '/'
}: UserAuthenticatedOptions) {
  const reqCookies = await cookies()

  const cookieService = cookie()
  const authCookie = cookieService.server.get(appCokies.auth, reqCookies)

  if (!authCookie && shouldNoCookieRedirect) {
    redirect(noCookieRedirect)
  }

  if (!authCookie) {
    return null
  }

  const data: AuthData = JSON.parse(authCookie.value)

  const authValid = isTokenValid(data.expireAt)

  return authValid ? data.user : null
}
