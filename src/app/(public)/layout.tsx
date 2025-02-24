import type { ReactNode } from 'react'

import PublicBasePage from '@template/PublicBasePage.tsx'

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return <PublicBasePage>{children}</PublicBasePage>
}

export default PublicLayout
