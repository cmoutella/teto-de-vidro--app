import type { ReactNode } from 'react'

import type { InputProps as InputHeadlessProps } from '@headlessui/react'
import InputRaw from '@raw/Input'
import FieldWrapper from '@raw/wrappers/Field'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import { formTheme, symbolPadding } from '@ui/base/shared/formTheme'
import cx from 'classnames'

interface InputProps extends InputHeadlessProps {
  label?: string
  description?: string
  theme?: FormTheme
  themeSize?: FormSizes
  iconButton?: ReactNode
  fieldSymbol?: string | ReactNode
}

const Input = ({
  label,
  description,
  theme = 'light',
  themeSize = 'md',
  iconButton,
  fieldSymbol,
  ...otherProps
}: InputProps) => {
  return (
    <FieldWrapper label={label} description={description} theme={theme} themeSize={themeSize}>
      {fieldSymbol && (
        <span
          className={cx(
            'absolute px-2.5 -translate-y-[1px]',
            formTheme[theme].input,
            symbolPadding[themeSize]
          )}
        >
          {fieldSymbol}
        </span>
      )}
      <InputRaw
        theme={theme}
        themeSize={themeSize}
        hasBeforeSymbol={!!fieldSymbol}
        hasAfterSymbol={!!iconButton}
        {...otherProps}
      />
      {iconButton && (
        <span className={cx('absolute px-2.5 right-0 top-0', symbolPadding[themeSize])}>
          {iconButton}
        </span>
      )}
    </FieldWrapper>
  )
}

export default Input
