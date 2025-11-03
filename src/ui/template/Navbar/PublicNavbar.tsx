'use client'
import { useLayoutEffect, useRef, useState } from 'react'

import { useUIContext } from '@/providers/UIProvider'
import type { InterfaceUser } from '@/types/user'
import Icon from '@/ui/components/base/Icon'

import { MobileMenu } from '../Menu/MobileMenu'
import SessionButton from '../SessionButton'
import { BrandName } from './BrandName'
import { NavLogo } from './Logo'

const PublicNavbar = ({ user }: { user?: Omit<InterfaceUser, 'password'> }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [navHeight, setNavHeight] = useState<number>(0)
  const navRef = useRef<HTMLDivElement | null>(null)

  const { scroll } = useUIContext()

  useLayoutEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight)
    }
  }, [])

  function handleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      scroll.allow()
    } else {
      setIsMenuOpen(true)
      scroll.block()
    }
  }

  return (
    <div className="w-full relative z-10">
      <div
        id="tdv-navbar"
        ref={navRef}
        className="w-full py-2 sm:py-3 md:py-4 px-2 md:px-4 lg:px-14 flex justify-center items-center bg-brand-primary-400"
      >
        <div className="container flex flex-row gap-6 justify-between items-center">
          <NavLogo />
          <span className="flex items-center sm:hidden -translate-x-3">
            <BrandName />
          </span>
          <span className="hidden md:flex justify-center items-center">
            <div className="text-white hover:text-brand-primary-900 hover:scale-105 font-medium mr-6 text-sm">
              <a
                href={`${process.env.NEXT_PUBLIC_APPLICATION_URL}/como-funciona`}
                className="text-shadow-sm"
              >
                Como funciona
              </a>
            </div>
            <SessionButton user={user} />
          </span>
          <span className="md:hidden">
            <Icon icon="menu" size="lg" className="text-white" onClick={handleMenu} />
          </span>
        </div>
      </div>
      {isMenuOpen && <MobileMenu onClose={handleMenu} translateHeight={navHeight} />}
    </div>
  )
}

export default PublicNavbar
