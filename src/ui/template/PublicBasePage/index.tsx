import type { ReactNode } from 'react'

import PublicNavbar from '@ui/Navbar/PublicNavbar'

import type { InterfaceUser } from '@/types/app'

const PublicBasePage = ({
  children,
  user
}: {
  children: ReactNode
  user: Omit<InterfaceUser, 'password'> | null
}) => {
  return (
    <div className="w-full min-h-full">
      <PublicNavbar user={user} />
      {children}
    </div>
  )
}

export default PublicBasePage
