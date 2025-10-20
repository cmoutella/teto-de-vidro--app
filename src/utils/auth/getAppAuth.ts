import { cookies } from 'next/headers'

import { appCookies } from '@/config/cookies'
import { authenticateApp } from '@/requests/server/app/authenticateApp'

import { isTokenValid } from './token'

export async function getAppAuth(): Promise<{ token: string } | undefined> {
  const rCookies = await cookies()

  const gotCookie = rCookies.get(appCookies.app)

  if (gotCookie) {
    const cookieData = JSON.parse(gotCookie.value)

    const isValid = isTokenValid(cookieData.expireAt)

    if (isValid) {
      return cookieData
    }
  }

  const auth = await authenticateApp()
  if (!auth || !auth.token) return

  return auth
}
