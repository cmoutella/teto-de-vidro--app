import type { ReactNode } from 'react'

import PrivateNavbar from '@ui/Navbar/PrivateNavbar'

import type { InterfaceUser } from '@/types/app'

const PrivateBasePage = ({
  children,
  user
}: {
  children: ReactNode
  user: Omit<InterfaceUser, 'password'> | null
}) => {
  return (
    <div className="w-full min-h-full">
      <PrivateNavbar user={user} />
      <div className="w-full">{children}</div>
    </div>
  )
}

export default PrivateBasePage
