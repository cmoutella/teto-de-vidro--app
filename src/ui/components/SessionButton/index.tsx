'use client'
import cx from 'classnames'
import { useRouter } from 'next/navigation'

import type { InterfaceUser } from '@/types/app'
import { logout } from '@/utils/auth/logout'

import type { ButtonProps } from '../base/Button'
import Button from '../base/Button'
import { btnBorderRadius, btnSize } from '../base/shared/buttonTheme'

interface SessionButtonProps extends Omit<ButtonProps, 'borderRadius' | 'label' | 'uiType'> {
  user: Omit<InterfaceUser, 'password'> | null
}

const SessionButton = ({ size = 'medium', fullWidth, user }: SessionButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    !user ? router.push('/login') : logout()
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
