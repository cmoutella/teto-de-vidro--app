import type { ReactNode } from 'react'

import PrivateNavbar from '@ui/Navbar/PrivateNavbar'

import type { InterfaceUser } from '@/types/user'

const PrivateBasePage = ({
  children,
  user
}: {
  children: ReactNode
  user: Omit<InterfaceUser, 'password'> | null
}) => {
  return (
    <div className="w-full">
      <PrivateNavbar user={user} />
      <div className="w-full overflow-x-hidden">{children}</div>
    </div>
  )
}

export default PrivateBasePage
