import { Fragment } from 'react'

import type { InputProps as InputHeadlessProps } from '@headlessui/react'
import { Input as InputHeadless } from '@headlessui/react'
import {
  baseInputStyle,
  formTheme,
  iSizes,
  type FormSizes,
  type FormTheme
} from '@ui/base/shared/formTheme'
import cx from 'classnames'

interface InputProps extends InputHeadlessProps {
  theme?: FormTheme
  themeSize?: FormSizes
  hasBeforeSymbol?: boolean
  hasAfterSymbol?: boolean
}

const InputRaw = ({
  theme = 'light',
  themeSize = 'md',
  hasBeforeSymbol,
  hasAfterSymbol,
  ...otherProps
}: InputProps) => {
  return (
    <InputHeadless as={Fragment} {...otherProps}>
      {({ focus, hover }: { focus: boolean; hover: boolean }) => (
        <input
          className={cx(
            'border px-2.5 bg-white',
            formTheme[theme].wrapper,
            formTheme[theme].input,
            baseInputStyle,
            iSizes[themeSize],
            focus && 'bg-brand-primary-100',
            hover && 'shadow',
            {
              'pl-8': hasBeforeSymbol,
              'pl-2.5': !hasBeforeSymbol
            },
            {
              'pr-10': hasAfterSymbol,
              'pr-2.5': !hasAfterSymbol
            }
          )}
        />
      )}
    </InputHeadless>
  )
}

export default InputRaw
