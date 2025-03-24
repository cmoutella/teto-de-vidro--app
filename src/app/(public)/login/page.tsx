import LoginView from '@pages/login'
import { redirect } from 'next/navigation'

import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

const LoginPage = async () => {
  const userSignedIn = await isUserAuthenticated({ shouldNoCookieRedirect: false })

  console.log('user', userSignedIn)

  if (userSignedIn?.id) {
    redirect('/')
  }

  return <LoginView />
}

export default LoginPage
