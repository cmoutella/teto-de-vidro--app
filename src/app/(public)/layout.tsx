import type { ReactNode } from 'react'

import PublicBasePage from '@/ui/template/PublicBasePage'
import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

async function Layout({ children }: { children: ReactNode }) {
  const userAuthData = await isUserAuthenticated({ shouldNoCookieRedirect: false })

  return <PublicBasePage user={userAuthData?.user}>{children}</PublicBasePage>
}

export default Layout
