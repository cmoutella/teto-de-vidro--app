import type { ReactNode } from 'react'

import PublicNavbar from '@ui/Navbar/PublicNavbar'

const PublicBasePage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-full">
      <PublicNavbar />
      {children}
    </div>
  )
}

export default PublicBasePage
