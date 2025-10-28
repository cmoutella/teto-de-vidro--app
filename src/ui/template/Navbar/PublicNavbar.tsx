import type { InterfaceUser } from '@/types/user'

import SessionButton from '../SessionButton'
import { BrandName } from './BrandName'
import { NavLogo } from './Logo'

const PublicNavbar = ({ user }: { user?: Omit<InterfaceUser, 'password'> }) => {
  return (
    <div className="w-full py-2 sm:py-3 md:py-4 px-2 md:px-4 lg:px-14 flex justify-center items-center bg-brand-primary-400">
      <div className="container flex flex-row gap-6 justify-between items-center">
        <NavLogo />
        <span className="flex items-center sm:hidden -translate-x-3">
          <BrandName />
        </span>
        <SessionButton user={user} />
      </div>
    </div>
  )
}

export default PublicNavbar
