import type { ReactNode } from 'react'

import type { InterfaceUser } from '@/types/user'
import { ServerMenuDesktop } from '@/ui/components/MainMenu'

import PrivateNavbar from '../Navbar/PrivateNavbar'

const PrivateBasePage = ({
  children,
  user
}: {
  children: ReactNode
  user?: Omit<InterfaceUser, 'password'>
}) => {
  /**
   * MENU WIDTH
   * column size 1/8
   * 12.5%
   */

  const menuWidth = 'w-[12.5%]'

  return (
    <div className="w-full fixed top-0 z-[1]">
      <PrivateNavbar user={user} />
      <div className="w-full h-screen overflow-x-hidden md:grid md:grid-cols-8">
        <div className="hidden relative h-full md:block md:col-span-1">
          <div className={`fixed h-full ${menuWidth}`}>
            <ServerMenuDesktop />
          </div>
        </div>
        <div className="w-full md:col-span-7 pb-16 overflow-x-hidden -z-[1]">{children}</div>
      </div>
    </div>
  )
}

export default PrivateBasePage
