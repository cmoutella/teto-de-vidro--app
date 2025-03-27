import { Fragment } from 'react'

import type { SelectProps as SelectHeadlessProps } from '@headlessui/react'
import { Select as SelectHeadless } from '@headlessui/react'
import cx from 'classnames'

import type { FormSizes, FormTheme } from '../../shared/formTheme'
import { baseInputStyle, formTheme, iSizes, symbolPadding } from '../../shared/formTheme'

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
    <div className="w-full relative">
      <SelectHeadless as={Fragment} value={selected} {...otherProps}>
        {({ focus, hover }) => (
          <select
            className={cx(
              'border px-2.5 bg-white appearance-none',
              formTheme[theme].wrapper,
              formTheme[theme].input,
              baseInputStyle,
              iSizes[themeSize],
              focus && 'bg-brand-primary-100',
              hover && 'shadow'
            )}
          >
            {options.map((opt) => {
              return (
                <option value={opt.value} key={opt.value}>
                  {opt.label}
                </option>
              )
            })}
          </select>
        )}
      </SelectHeadless>
      <span
        className={cx(
          'absolute right-2 top-0 -translate-y-[2px] font-sm',
          symbolPadding[themeSize]
        )}
      >
        {/* TODO: ICON chevron donw */}V
      </span>
    </div>
  )
}

export default SelectRaw
