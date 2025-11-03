import PrivateHomeView from '@pages/home/privateHome'
import PublicHomeView from '@pages/home/publicHome'
import { cookies } from 'next/headers'

import { appCookies } from '@/config/cookies'
import { authenticateApp } from '@/requests/server/app/authenticateApp'
import { getAllHuntsByUser } from '@/requests/server/hunt/getAllHuntsByUser'
import type { AppAuthData } from '@/types/apiResponses'
import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

export default async function Home() {
  const reqCookies = cookies()

  let appAuthToken

  const userAuthData = isUserAuthenticated({ shouldNoCookieRedirect: false })

  if (!userAuthData) {
    return <PublicHomeView />
  }

  const appAuthCookie = reqCookies.get(appCookies.app)
  if (!appAuthCookie) {
    appAuthToken = await authenticateApp()
  }
  const appData: AppAuthData = appAuthCookie ? JSON.parse(appAuthCookie.value) : appAuthToken

  const response = await getAllHuntsByUser(userAuthData.user.id, 1, 1, {
    userToken: userAuthData.token,
    appToken: appData.token
  })

  return <PrivateHomeView user={userAuthData.user} hunts={response?.list ?? []} />
}
