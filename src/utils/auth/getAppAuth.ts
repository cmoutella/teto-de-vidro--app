import { cookies } from 'next/headers'

import { appCokies } from '@/config/cookies'
import { authenticateApp } from '@/requests/server/app/authenticateApp'

export async function getAppAuth(): Promise<{ token: string } | undefined> {
  const reqCookies = await cookies()

  const gotCookie = reqCookies.get(appCokies.app)
  if (gotCookie) {
    const cookieData = JSON.parse(gotCookie.value)
    return cookieData
  }

  const auth = await authenticateApp()
  if (!auth || !auth.token) return

  return { token: auth.token }
}
