import HuntView from '@pages/hunt/oneHunt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { appCookies } from '@/config/cookies'
import { authenticateApp } from '@/requests/server/app/authenticateApp'
import { getHuntById } from '@/requests/server/hunt/getById'
import type { AppAuthData } from '@/types/apiResponses'
import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

const HuntPage = async ({ params }: { params: { id: string } }) => {
  const reqCookies = await cookies()

  const userAuthData = isUserAuthenticated()

  if (!userAuthData) {
    redirect('/')
  }

  let appAuthToken
  const appAuthCookie = reqCookies.get(appCookies.app)

  if (!appAuthCookie) {
    appAuthToken = await authenticateApp()
  }

  const appCookieData: AppAuthData = appAuthCookie ? JSON.parse(appAuthCookie.value) : appAuthToken

  const hunt = await getHuntById(params.id, {
    userToken: userAuthData.token,
    appToken: appCookieData.token
  })

  if (!hunt) {
    redirect('/')
  }

  return <HuntView hunt={hunt} user={userAuthData.user} />
}

export default HuntPage
