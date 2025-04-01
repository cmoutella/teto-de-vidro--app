import { Fragment } from 'react'

import type { SelectProps as SelectHeadlessProps } from '@headlessui/react'
import { Select as SelectHeadless } from '@headlessui/react'
import cx from 'classnames'

import Icon from '../../Icon'
import type { FormSizes, FormTheme } from '../../shared/formTheme'
import {
  afterSymbolPosition,
  baseInputStyle,
  formTheme,
  iSizes,
  symbolPadding
} from '../../shared/formTheme'

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
  className,
  ...otherProps
}: DropdownSelectProps) => {
  return (
    <div className="w-full relative">
      <SelectHeadless as={Fragment} value={selected} {...otherProps}>
        {({ focus, hover }) => (
          <select
            className={cx(
              'border px-2.5 appearance-none',
              formTheme[theme].wrapper,
              formTheme[theme].input,
              baseInputStyle,
              iSizes[themeSize],
              focus && 'bg-brand-primary-100',
              hover && 'shadow',
              className
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
          'absolute top-0 font-sm',
          symbolPadding[themeSize],
          afterSymbolPosition[themeSize]
        )}
      >
        <Icon icon="chevron-down" mode="mini" />
      </span>
    </div>
  )
}

export default SelectRaw
