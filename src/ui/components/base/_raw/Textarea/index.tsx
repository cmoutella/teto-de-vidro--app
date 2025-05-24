import { Fragment } from 'react'

import type { TextareaProps as TextareaHeadlessProps } from '@headlessui/react'
import { Textarea as TextareaHeadless } from '@headlessui/react'
import cx from 'classnames'

import {
  baseInputStyle,
  formTheme,
  iSizes,
  type FormSizes,
  type FormTheme
} from '../../shared/formTheme'

export interface TextAreaRawProps extends TextareaHeadlessProps {
  name: string
  maxRows?: number
  theme?: FormTheme
  themeSize?: FormSizes
}

export function TextAreaRaw({
  name,
  maxRows = 3,
  theme = 'light',
  themeSize = 'md',
  ...props
}: TextAreaRawProps) {
  return (
    <TextareaHeadless rows={maxRows} as={Fragment} {...props}>
      {({ focus, hover }) => (
        <textarea
          name={name}
          className={cx(
            'border p-2.5 bg-white min-h-24',
            formTheme[theme].wrapper,
            formTheme[theme].input,
            baseInputStyle,
            iSizes[themeSize],
            focus && 'bg-brand-primary-100',
            hover && 'shadow',
            {
              'border-brand-primary-500': focus,
              'border-brand-primary-400': hover
            }
          )}
        ></textarea>
      )}
    </TextareaHeadless>
  )
}
