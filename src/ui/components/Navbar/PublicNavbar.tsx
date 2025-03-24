import type { InterfaceUser } from '@/types/app'

import SessionButton from '../SessionButton'
import { NavLogo } from './Logo'

const PublicNavbar = ({ user }: { user: Omit<InterfaceUser, 'password'> | null }) => {
  return (
    <div className="w-full py-2 sm:py-3 md:py-4 sm:px-4 md:px-10 lg:px-14 flex justify-center items-center bg-brand-primary-400">
      <div className="container flex flex-row gap-6 justify-between items-center">
        <NavLogo />
        <SessionButton user={user} />
      </div>
    </div>
  )
}

export default PublicNavbar
