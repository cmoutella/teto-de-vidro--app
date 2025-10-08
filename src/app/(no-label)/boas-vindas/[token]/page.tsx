import { redirect } from 'next/navigation'

import { validateInvitationToken } from '@/requests/user/validateInvitationToken'
import { WelcomeView } from '@/ui/pages/welcome'

const WelcomePage = async ({ params }: { params: { token: string } }) => {
  const token = params.token

  if (!token) {
    redirect('/')
  }

  const invitation = await validateInvitationToken(token)

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
