import CreateHuntView from '@pages/hunt/create'
import { redirect } from 'next/navigation'

import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

const CreateHuntPage = () => {
  const userAuthData = isUserAuthenticated()

  if (!userAuthData) {
    redirect('/')
  }

  return <CreateHuntView user={userAuthData.user} />
}

export default CreateHuntPage
