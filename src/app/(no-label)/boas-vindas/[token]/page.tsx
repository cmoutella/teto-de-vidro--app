import { redirect } from 'next/navigation'

import type { SuccessResponse } from '@/types/apiPatterns'
import { WelcomeView } from '@/ui/pages/welcome'

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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL
    const appToken = process.env.NEXT_PUBLIC_BASE_APP_KEY

    if (!baseUrl) throw new Error('Application API url not defined')

    const validationUrl = `${baseUrl}/users/validate-invite/${token}`

    try {
      const user = await fetch(validationUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${appToken}`
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
