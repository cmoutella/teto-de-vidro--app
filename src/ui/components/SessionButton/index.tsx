'use client'
import cx from 'classnames'

import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtClient'

import { logout } from '@/utils/auth/logout'
import { useRouter } from 'next/navigation'
import type { ButtonProps } from '../base/Button'
import Button from '../base/Button'
import { btnBorderRadius, btnSize } from '../base/shared/buttonTheme'

const SessionButton = ({
  size = 'medium',
  fullWidth
}: Omit<ButtonProps, 'borderRadius' | 'label' | 'uiType'>) => {
  const user = isUserAuthenticated()

  const router = useRouter()

  const handleClick = () => {
    user ? router.push('/login') : logout()
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
