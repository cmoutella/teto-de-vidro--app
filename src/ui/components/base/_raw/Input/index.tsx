import type { InputProps as InputHeadlessProps } from '@headlessui/react'
import { Input as InputHeadless } from '@headlessui/react'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import { baseInputStyle, formTheme, iSizes } from '@ui/base/shared/formTheme'
import cx from 'classnames'

interface InputProps extends InputHeadlessProps {
  theme?: FormTheme
  themeSize?: FormSizes
}

const InputRaw = ({ theme = 'light', themeSize = 'md', ...otherProps }: InputProps) => {
  return (
    <InputHeadless
      className={cx(
        formTheme[theme].input,
        baseInputStyle,
        iSizes[themeSize],
        'focus:outline-none focus:bg-transparent active:bg-transparent w-full placeholder:text-brand-gray-400'
      )}
      {...otherProps}
    />
  )
}

export default InputRaw
