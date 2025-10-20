import HuntView from '@pages/hunt/oneHunt'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { appCookies } from '@/config/cookies'
import { getHuntById } from '@/requests/client/hunt/getById'
import { cookie } from '@/services/cookies'
import type { UserAuthData } from '@/types/apiResponses'

const HuntPage = async ({ params }: { params: { id: string } }) => {
  const reqCookies = await cookies()

  const cookieService = cookie()
  const authCookie = cookieService.server.get(appCookies.auth, reqCookies)

  const data: UserAuthData = JSON.parse((authCookie as RequestCookie).value)

  const hunt = await getHuntById(params.id, { token: data.token })

  if (!hunt) {
    redirect('/')
  }

  return <HuntView hunt={hunt} />
}

export default HuntPage
