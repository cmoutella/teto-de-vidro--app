import type { ReactNode } from 'react'

import InputRaw from '@raw/Input'
import FieldWrapper from '@raw/wrappers/Field'
import { afterSymbolPosition, formTheme, symbolPadding } from '@ui/base/shared/formTheme'
import cx from 'classnames'

import type { InputProps } from '../Input'

interface InputAndActionButtonProps extends InputProps {
  button: ReactNode
}

const InputAndActionButton = ({
  label,
  description,
  theme = 'light',
  themeSize = 'md',
  iconButton,
  siblingHeight,
  fieldSymbol,
  error,
  button,
  ...otherProps
}: InputAndActionButtonProps) => {
  return (
    <FieldWrapper
      label={label}
      description={description}
      theme={theme}
      themeSize={themeSize}
      errorMessage={error}
      siblingHeight={siblingHeight}
      actionButton={button}
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

export default InputAndActionButton
