import type { ReactNode } from 'react'

import type { InterfaceUser } from '@/types/user'

import PublicNavbar from '../Navbar/PublicNavbar'

const PublicBasePage = ({
  children,
  user
}: {
  children: ReactNode
  user?: Omit<InterfaceUser, 'password'>
}) => {
  return (
    <div className="w-full">
      <PublicNavbar user={user} />
      <div className="w-full overflow-x-hidden">{children}</div>
    </div>
  )
}

export default PublicBasePage
