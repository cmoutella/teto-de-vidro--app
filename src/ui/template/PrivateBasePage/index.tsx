import type { ReactNode } from 'react'

import type { InterfaceUser } from '@/types/user'

import PrivateNavbar from '../Navbar/PrivateNavbar'

const PrivateBasePage = ({
  children,
  user
}: {
  children: ReactNode
  user?: Omit<InterfaceUser, 'password'>
}) => {
  return (
    <div className="w-full">
      <PrivateNavbar user={user} />
      <div className="w-full overflow-x-hidden">{children}</div>
    </div>
  )
}

export default PrivateBasePage
