import cx from 'classnames'
import Link from 'next/link'

import { logout } from '@/utils/auth/logout'
import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtClient'

import type { ButtonProps } from '../base/Button'
import Button from '../base/Button'
import { btnBorderRadius, btnSize } from '../base/shared/buttonTheme'

const SessionButton = ({
  size = 'medium',
  fullWidth
}: Omit<ButtonProps, 'borderRadius' | 'label' | 'uiType'>) => {
  const user = isUserAuthenticated()

  if (!user) {
    return (
      <Link
        href={'/login'}
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
      >
        Entrar
      </Link>
    )
  } else {
    return <Button onClick={logout} label="Sair" />
  }
}

export default SessionButton
