import { redirect } from 'next/navigation'

import type { SuccessResponse } from '@/types/apiPatterns'
import { WelcomeView } from '@/ui/pages/welcome'
import { getAppAuth } from '@/utils/auth/getAppAuth'

type Validation = {
  invitationId: string
  welcomeCompleted: false
  user: {
    name: string
    id: string
  }
}

const WelcomePage = async ({ params }: { params: { token: string } }) => {
  const token = params.token

  if (!token) {
    redirect('/')
  }

  async function validateInvitationToken() {
    const baseUrl = process.env.BACKEND_API

    if (!baseUrl) throw new Error('Application API url not defined')

    const appAuth = await getAppAuth()

    if (!appAuth || !appAuth.token) throw new Error('Application auth failed')

    const validationUrl = `${baseUrl}/users/validate-invite/${token}`

    try {
      const user = await fetch(validationUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': appAuth.token
        }
      }).then((res) => res.json())

      if (user.error) {
        throw Error('Convite não encontrado ou expirado')
      }

      const { data } = user as SuccessResponse<Validation>

      return data
    } catch (_err) {
      return undefined
    }
  }

  const invitation = await validateInvitationToken()

  if (!invitation) {
    // TODO: friendly message
    redirect('/')
  }
  if (invitation.welcomeCompleted) {
    redirect('/')
  }

  return <WelcomeView user={invitation.user} />
}

export default WelcomePage
