import { useState } from 'react'

import type { InterfaceUser } from '@/types/user'
import Icon from '@/ui/components/base/Icon'

import { MobileMenu } from '../Menu/MobileMenu'
import SessionButton from '../SessionButton'
import { BrandName } from './BrandName'
import { NavLogo } from './Logo'

const PublicNavbar = ({ user }: { user?: Omit<InterfaceUser, 'password'> }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <div className="w-full relative z-10">
      <div className="w-full py-2 sm:py-3 md:py-4 px-2 md:px-4 lg:px-14 flex justify-center items-center bg-brand-primary-400">
        <div className="container flex flex-row gap-6 justify-between items-center">
          <NavLogo />
          <span className="flex items-center sm:hidden -translate-x-3">
            <BrandName />
          </span>
          <span className="hidden md:block">
            <SessionButton user={user} />
          </span>
          <span className="md:hidden">
            <Icon
              icon="menu"
              size="lg"
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </span>
        </div>
      </div>
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </div>
  )
}

export default PublicNavbar
