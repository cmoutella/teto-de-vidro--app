import type { SelectProps as SelectHeadlessProps } from '@headlessui/react'
import { Select as SelectHeadless } from '@headlessui/react'
import cx from 'classnames'

import type { FormSizes, FormTheme } from '../../shared/formTheme'
import { baseInputStyle, formTheme, iSizes } from '../../shared/formTheme'

export interface Option {
  label: string
  value: string
  onClick?: () => void
}

export interface DropdownSelectProps extends SelectHeadlessProps {
  options: Option[]
  theme?: FormTheme
  themeSize?: FormSizes
  selected?: string
}

const SelectRaw = ({
  options,
  selected,
  theme = 'light',
  themeSize = 'md',
  ...otherProps
}: DropdownSelectProps) => {
  return (
    <SelectHeadless
      value={selected}
      className={cx(
        formTheme[theme].input,
        iSizes[themeSize],
        baseInputStyle,
        'focus:outline-none focus:bg-transparent active:bg-transparent w-full'
      )}
      {...otherProps}
    >
      {options.map((opt) => {
        return (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        )
      })}
    </SelectHeadless>
  )
}

export default SelectRaw
