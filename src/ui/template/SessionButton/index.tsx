'use client'

import cx from 'classnames'
import { useRouter } from 'next/navigation'

import { useSessionContext } from '@/providers/AuthProvider'
import type { InterfaceUser } from '@/types/user'
import type { ButtonProps } from '@/ui/components/base/Button'
import Button from '@/ui/components/base/Button'
import { btnBorderRadius, btnSize } from '@/ui/components/base/shared/buttonTheme'

interface SessionButtonProps extends Omit<ButtonProps, 'borderRadius' | 'label' | 'uiType'> {
  user?: Omit<InterfaceUser, 'password'>
}

const SessionButton = ({ size = 'medium', fullWidth, user }: SessionButtonProps) => {
  const router = useRouter()

  const { logout } = useSessionContext()

  function handleLogout() {
    logout()
  }

  const handleClick = () => {
    !user ? router.push('/login') : handleLogout()
  }

  return (
    <Button
      className={cx(
        btnBorderRadius.md,
        btnSize[size],
        {
          'w-full': fullWidth
        },
        'border border-2',
        'bg-transparent border-white hover:bg-brand-primary-600 hover:border-brand-primary-600',
        'text-white hover:text-white',
        'text-center tracking-wide flex justify-center items-center'
      )}
      onClick={handleClick}
      label={user ? 'Sair' : 'Entrar'}
    />
  )
}

export default SessionButton
