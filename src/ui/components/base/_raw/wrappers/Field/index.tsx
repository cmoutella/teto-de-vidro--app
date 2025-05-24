import type { ReactNode } from 'react'

import type { InputProps as InputHeadlessProps } from '@headlessui/react'
import {
  Description as DescriptionHeadless,
  Field as FieldHeadless,
  Label as LabelHeadless
} from '@headlessui/react'
import cx from 'classnames'

import { formTheme, type FormSizes, type FormTheme } from '../../../shared/formTheme'

interface InputProps extends InputHeadlessProps {
  label?: string
  description?: string
  theme?: FormTheme
  themeSize?: FormSizes
  errorMessage?: string
  children: ReactNode
  siblingHeight?: boolean
  actionButton?: ReactNode
}

const FieldWrapper = ({
  label,
  description,
  theme = 'light',
  children,
  errorMessage,
  siblingHeight = false,
  actionButton
}: InputProps) => {
  return (
    <FieldHeadless className="flex flex-col gap-3 w-full h-full justify-between">
      {(label || description) && (
        <span>
          {label && (
            <LabelHeadless className={cx(formTheme[theme].label, 'uppercase max-w-36')}>
              {label}
            </LabelHeadless>
          )}
          {(description || siblingHeight) && (
            <DescriptionHeadless
              className={cx(formTheme[theme].helpText, {
                invisible: !description && siblingHeight
              })}
            >
              {!description && siblingHeight ? '_' : description}
            </DescriptionHeadless>
          )}
        </span>
      )}
      <div className="relative w-full flex gap-4">
        {children}
        {!!actionButton && actionButton}
      </div>
      <div
        className={cx('text-sm text-red-600 -my-2.5', {
          invisible: !errorMessage
        })}
      >
        {errorMessage ?? '_'}
      </div>
    </FieldHeadless>
  )
}

export default FieldWrapper
