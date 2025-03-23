import PrivateHomeView from '@pages/home/privateHome'
import PublicHomeView from '@pages/home/publicHome'
import { getAllHuntsByUser } from '@requests/hunt/getAllHuntsByUser'
import { cookies } from 'next/headers'

import { appCokies } from '@/config/cookies'
import { cookie } from '@/services/cookies'
import type { UserAuth } from '@/types/apiResponses'
import { isTokenValid } from '@/utils/auth/token'

export default async function Home() {
  const reqCookies = await cookies()

  const cookieService = cookie()
  const authCookie = cookieService.server.get(appCokies.auth, reqCookies)

  if (!authCookie) {
    return <PublicHomeView />
  }

  const data: UserAuth = JSON.parse(authCookie.value)

  const authValid = isTokenValid(data.expireAt)

  if (!authValid) {
    return <PublicHomeView />
  }

  const response = await getAllHuntsByUser(data.user.id, 1, 1)

  return <PrivateHomeView user={data.user} hunts={response ?? []} />
}
