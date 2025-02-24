'use client'

import type { ReactNode } from 'react'

import type { ButtonProps as ButtonHeadlessProps } from '@headlessui/react'
import { Button as ButtonHeadless } from '@headlessui/react'
import cx from 'classnames'

import type { ButtonRadius, ButtonSize } from '../shared/buttonTheme'
import { btnBorderRadius, btnSize, roundedBtnSize } from '../shared/buttonTheme'

export interface ButtonProps extends ButtonHeadlessProps {
  size?: ButtonSize
  label: string | ReactNode
  fullWidth?: boolean
  borderRadius?: ButtonRadius
  rounded?: boolean
  flat?: boolean
}

const Button = ({
  size = 'medium',
  borderRadius = 'md',
  flat = false,
  label,
  fullWidth,
  rounded,
  className,
  disabled,
  ...otherProps
}: ButtonProps) => {
  const bSize = rounded ? roundedBtnSize[size] : btnSize[size]

  return (
    <ButtonHeadless
      className={cx(
        { 'cursor-pointer': !disabled },
        bSize,
        {
          'w-full': fullWidth
        },
        {
          'hover:drop-shadow-md active:shadow-inner': !flat && !disabled
        },
        btnBorderRadius[borderRadius],
        { 'rounded-full': rounded },
        { 'flex justify-center items-center': rounded },
        className
      )}
      disabled={disabled}
      {...otherProps}
    >
      {label}
    </ButtonHeadless>
  )
}

export default Button
