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
  children: ReactNode
}

const FieldWrapper = ({ label, description, theme = 'light', children }: InputProps) => {
  return (
    <FieldHeadless className="flex flex-col gap-3 w-full">
      {(label || description) && (
        <span>
          {label && (
            <LabelHeadless className={cx(formTheme[theme].label, 'uppercase whitespace-nowrap')}>
              {label}
            </LabelHeadless>
          )}
          {description && (
            <DescriptionHeadless className={cx(formTheme[theme].helpText)}>
              {description}
            </DescriptionHeadless>
          )}
        </span>
      )}
      <div className="relative w-full">{children}</div>
    </FieldHeadless>
  )
}

export default FieldWrapper
