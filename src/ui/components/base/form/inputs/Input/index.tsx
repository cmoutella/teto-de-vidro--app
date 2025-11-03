import type { ReactNode } from 'react'

import type { InputProps as InputHeadlessProps } from '@headlessui/react'
import InputRaw from '@raw/Input'
import FieldWrapper from '@raw/wrappers/Field'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import { afterSymbolPosition, formTheme, symbolPadding } from '@ui/base/shared/formTheme'
import cx from 'classnames'

export interface InputProps extends InputHeadlessProps {
  label?: string
  labelStyle?: string
  description?: string
  theme?: FormTheme
  themeSize?: FormSizes
  iconButton?: ReactNode
  fieldSymbol?: string | ReactNode
  error?: string
  requiredError?: boolean
  siblingHeight?: boolean
}

const Input = ({
  label,
  labelStyle,
  description,
  theme = 'light',
  themeSize = 'md',
  iconButton,
  siblingHeight,
  fieldSymbol,
  error,
  ...otherProps
}: InputProps) => {
  return (
    <FieldWrapper
      label={label}
      labelStyle={labelStyle}
      description={description}
      theme={theme}
      themeSize={themeSize}
      errorMessage={error}
      siblingHeight={siblingHeight}
    >
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
        requiredError={!!error}
        {...otherProps}
      />
      {iconButton && (
        <span
          className={cx(
            'absolute px-2.5 right-0 top-0',
            symbolPadding[themeSize],
            afterSymbolPosition[themeSize]
          )}
        >
          {iconButton}
        </span>
      )}
    </FieldWrapper>
  )
}

export default Input
