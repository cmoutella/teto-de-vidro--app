import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { appCokies } from '@/config/cookies'
import { cookie } from '@/services/cookies'
import type { UserAuth } from '@/types/apiResponses'

import { isTokenValid } from './token'

/**
 * # SERVER AUTHENTICATION
 * ########################
 * Busca nos headers pelos cookies para validar a autenticação
 */

export async function isUserAuthenticated() {
  const reqCookies = await cookies()

  const cookieService = cookie()
  const authCookie = cookieService.server.get(appCokies.auth, reqCookies)

  if (!authCookie) {
    redirect('/')
  }

  const data: UserAuth = JSON.parse(authCookie.value)

  const authValid = isTokenValid(data.expireAt)

  return authValid ? data.user : null
}
