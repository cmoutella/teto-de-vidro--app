import type { CheckboxProps } from '@headlessui/react'
import { Checkbox as CheckboxHeadless } from '@headlessui/react'
import cx from 'classnames'

import Icon from '../../Icon'

export function CheckboxRaw({
  name,
  checked,
  onChange,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxHeadless
      name={name}
      onChange={onChange}
      checked={checked}
      className={cx(
        className,
        'h-4 w-4 rounded-sm relative',
        'border border-2',
        { 'cursor-pointer': !disabled, 'cursor-not-allowed': disabled },
        {
          'border-brand-primary-400': !disabled,
          'border-brand-gray-200': disabled
        },
        {
          'bg-white': !disabled && !checked,
          'bg-brand-primary-400': !disabled && checked,
          'bg-brand-gray-100': disabled
        }
      )}
      {...props}
    >
      {checked && (
        <Icon
          icon="check"
          className="text-white w-2 h-2 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[47%]"
          mode="micro"
        />
      )}
    </CheckboxHeadless>
  )
}
