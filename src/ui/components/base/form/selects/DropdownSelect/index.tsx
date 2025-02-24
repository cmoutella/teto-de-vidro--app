'use client'

import type { ChangeEvent } from 'react'
import { useState } from 'react'

import type { SelectProps as SelectHeadlessProps } from '@headlessui/react'
import type { Option } from '@raw/Select'
import SelectRaw from '@raw/Select'
import FieldWrapper from '@raw/wrappers/Field'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
export interface DropdownSelectProps extends SelectHeadlessProps {
  label?: string
  description?: string
  options: Option[]
  theme?: FormTheme
  themeSize?: FormSizes
}

const DropdownSelect = ({
  label,
  description,
  options,
  defaultValue,
  theme = 'light',
  themeSize = 'md',
  ...otherProps
}: DropdownSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    (defaultValue as string) ?? options[0].value
  )

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const val = e.target.value

    setSelectedValue(val)
  }

  return (
    <FieldWrapper label={label} description={description} theme={theme} themeSize={themeSize}>
      <SelectRaw
        value={selectedValue}
        onChange={handleChange}
        options={options}
        theme={theme}
        themeSize={themeSize}
        {...otherProps}
      />
    </FieldWrapper>
  )
}

export default DropdownSelect
