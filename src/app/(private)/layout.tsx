import type { ReactNode } from 'react'

import PrivateBasePage from '@template/PrivateBasePage'
import { redirect } from 'next/navigation'

import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

async function PrivateLayout({ children }: { children: ReactNode }) {
  const userAuthData = await isUserAuthenticated()

  if (!userAuthData) {
    redirect('/')
  }

  return <PrivateBasePage user={userAuthData.user}>{children}</PrivateBasePage>
}

export default PrivateLayout
