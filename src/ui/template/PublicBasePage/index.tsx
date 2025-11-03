import type { ReactNode } from 'react'

import type { InterfaceUser } from '@/types/user'

import PublicFooter from '../Footer'
import PublicNavbar from '../Navbar/PublicNavbar'

const PublicBasePage = ({
  children,
  user
}: {
  children: ReactNode
  user?: Omit<InterfaceUser, 'password'>
}) => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <PublicNavbar user={user} />
      <div className="w-full flex-grow overflow-x-hidden">{children}</div>
      <PublicFooter />
    </div>
  )
}

export default PublicBasePage
