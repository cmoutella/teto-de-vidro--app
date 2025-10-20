import PrivateHomeView from '@pages/home/privateHome'
import PublicHomeView from '@pages/home/publicHome'
import { cookies } from 'next/headers'

import { appCookies } from '@/config/cookies'
import { authenticateApp } from '@/requests/server/app/authenticateApp'
import { getAllHuntsByUser } from '@/requests/server/hunt/getAllHuntsByUser'
import type { AppAuthData, UserAuthData } from '@/types/apiResponses'
import { isTokenValid } from '@/utils/auth/token'

export default async function Home() {
  const reqCookies = await cookies()

  let appAuthToken

  const userAuthCookie = reqCookies.get(appCookies.auth)
  const appAuthCookie = reqCookies.get(appCookies.app)

  if (!appAuthCookie) {
    appAuthToken = await authenticateApp()
  }
  if (!userAuthCookie) {
    return <PublicHomeView />
  }

  const userCookieData: UserAuthData = JSON.parse(userAuthCookie.value)
  const appCookieData: AppAuthData = appAuthCookie ? JSON.parse(appAuthCookie.value) : appAuthToken

  const authValid = isTokenValid(userCookieData.expireAt)

  if (!authValid) {
    return <PublicHomeView />
  }

  const response = await getAllHuntsByUser(userCookieData.user.id, 1, 1, {
    userToken: userCookieData.token,
    appToken: appCookieData.token
  })

  return <PrivateHomeView user={userCookieData.user} hunts={response?.list ?? []} />
}
