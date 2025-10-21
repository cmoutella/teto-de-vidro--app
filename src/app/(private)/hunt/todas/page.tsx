import { DEFAULT_HUNT_LIST_PER_PAGE } from '@pages/hunt/consts/perPage'
import ListHuntView from '@pages/hunt/list'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { appCookies } from '@/config/cookies'
import { authenticateApp } from '@/requests/server/app/authenticateApp'
import { getAllHuntsByUser } from '@/requests/server/hunt/getAllHuntsByUser'
import type { AppAuthData } from '@/types/apiResponses'
import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

async function ListHuntsPage() {
  const userLoggedIn = await isUserAuthenticated()

  if (!userLoggedIn || userLoggedIn === null) {
    redirect('/login')
    return <></>
  }

  let appAuthToken

  const reqCookies = cookies()
  const appAuthCookie = reqCookies.get(appCookies.app)

  if (!appAuthCookie) {
    appAuthToken = await authenticateApp()
  }

  const appCookieData: AppAuthData = appAuthCookie ? JSON.parse(appAuthCookie.value) : appAuthToken

  const response = await getAllHuntsByUser(userLoggedIn.user.id, 1, DEFAULT_HUNT_LIST_PER_PAGE, {
    userToken: userLoggedIn.token,
    appToken: appCookieData.token
  })

  return <ListHuntView hunts={(response?.list as never) ?? []} />
}

export default ListHuntsPage
