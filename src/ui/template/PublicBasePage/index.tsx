import type { ReactNode } from 'react'

import PublicNavbar from '@ui/Navbar/PublicNavbar'

interface PublicBasePageProps {
  children: ReactNode
}

const PublicBasePage = ({ children }: PublicBasePageProps) => {
  return (
    <div className="w-full min-h-full">
      <PublicNavbar />
      {children}
    </div>
  )
}

export default PublicBasePage
