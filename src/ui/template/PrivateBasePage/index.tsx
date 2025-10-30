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
    <div className="w-full z-[1]">
      <PrivateNavbar user={user} />
      <div className="w-full overflow-x-hidden -z-[1]">{children}</div>
    </div>
  )
}

export default PrivateBasePage
