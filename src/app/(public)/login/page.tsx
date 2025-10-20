import LoginView from '@pages/login'
import { redirect } from 'next/navigation'

import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

const LoginPage = async () => {
  const userAuthData = await isUserAuthenticated()

  if (userAuthData) {
    redirect('/')
  }

  return <LoginView />
}

export default LoginPage
