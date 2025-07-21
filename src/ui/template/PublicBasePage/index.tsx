import type { ReactNode } from 'react'

import PublicNavbar from '@ui/Navbar/PublicNavbar'

import type { InterfaceUser } from '@/types/user'

const PublicBasePage = ({
  children,
  user
}: {
  children: ReactNode
  user: Omit<InterfaceUser, 'password'> | null
}) => {
  return (
    <div className="w-full">
      <PublicNavbar user={user} />
      <div className="w-full overflow-x-hidden">{children}</div>
    </div>
  )
}

export default PublicBasePage
