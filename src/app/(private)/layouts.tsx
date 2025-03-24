import type { ReactNode } from 'react'

import PrivateBasePage from '@template/PrivateBasePage'

import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

async function PrivateLayout({ children }: { children: ReactNode }) {
  const userLoggedIn = await isUserAuthenticated({})

  return <PrivateBasePage user={userLoggedIn}>{children}</PrivateBasePage>
}

export default PrivateLayout
