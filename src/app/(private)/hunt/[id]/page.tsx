import HuntView from '@pages/hunt/oneHunt'
import { getHuntById } from '@requests/hunt/getById'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { appCokies } from '@/config/cookies'
import { cookie } from '@/services/cookies'
import type { UserAuth } from '@/types/apiResponses'

const HuntPage = async ({ params }: { params: { id: string } }) => {
  const reqCookies = await cookies()

  const cookieService = cookie()
  const authCookie = cookieService.server.get(appCokies.auth, reqCookies)

  const data: UserAuth = JSON.parse((authCookie as RequestCookie).value)

  const hunt = await getHuntById(params.id, { token: data.token })

  if (!hunt) {
    redirect('/')
  }

  return <HuntView hunt={hunt} />
}

export default HuntPage
