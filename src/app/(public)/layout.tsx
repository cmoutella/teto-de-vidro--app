import type { ReactNode } from 'react'

import PublicBasePage from '@/ui/template/PublicBasePage'
import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtClient'

async function Layout({ children }: { children: ReactNode }) {
  const userLoggedIn = await isUserAuthenticated({})

  return <PublicBasePage user={userLoggedIn}>{children}</PublicBasePage>
}

export default Layout
