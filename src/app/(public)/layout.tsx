import type { ReactNode } from 'react'

import PublicBasePage from '@/ui/template/PublicBasePage'

const Layout = ({ children }: { children: ReactNode }) => {
  return <PublicBasePage>{children}</PublicBasePage>
}

export default Layout
