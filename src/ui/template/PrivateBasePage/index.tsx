import type { ReactNode } from 'react'

import PrivateNavbar from '@ui/Navbar/PrivateNavbar'

import type { InterfaceUser } from '@/types/user'
import { MenuDesktop } from '@/ui/components/MainMenu'

const PrivateBasePage = ({
  children,
  user
}: {
  children: ReactNode
  user: Omit<InterfaceUser, 'password'> | null
}) => {
  /**
   * MENU WIDTH
   * column size 1/8
   * 12.5%
   */

  const menuWidth = 'w-[12.5%]'

  return (
    <div className="w-full fixed top-0">
      <PrivateNavbar user={user} />
      <div className="w-full h-screen overflow-x-hidden md:grid md:grid-cols-8">
        <div className="hidden relative h-full md:block md:col-span-1">
          <div className={`fixed h-full ${menuWidth}`}>
            <MenuDesktop />
          </div>
        </div>
        <div className="md:col-span-7 pb-16">{children}</div>
      </div>
    </div>
  )
}

export default PrivateBasePage
