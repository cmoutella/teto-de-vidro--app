import { Radio as HeadlessRadio, RadioGroup as HeadlessRadioGroup } from '@headlessui/react'
import cx from 'classnames'

export type RawRadioOption = Record<string, unknown> & { id: string; label: string }

export interface RawRadioGroupProps {
  options: RawRadioOption[]
  current: RawRadioOption
  name: string
  direction?: 'vertical' | 'horizontal'
  manyColumns?: boolean
  onChange: (_val: RawRadioOption) => void
}

const Radio = ({ selected }: { selected: boolean }) => {
  return (
    <span className="flex items-center justify-center min-w-4 min-h-4 w-4 h-4 rounded-full bg-white border border-1.5 border-brand-primary-700">
      {selected && (
        <span className="flex min-w-2.5 min-h-2.5 w-2.5 h-2.5 rounded-full bg-brand-primary-500"></span>
      )}
    </span>
  )
}

export function RawRadioGroup({
  name,
  options,
  current,
  direction = 'horizontal',
  manyColumns,
  onChange
}: RawRadioGroupProps) {
  return (
    <HeadlessRadioGroup
      value={current}
      name={name}
      onChange={onChange}
      className={cx('gap-x-4 gap-y-2', {
        'flex flex-col items-start': direction === 'vertical' && !manyColumns,
        'flex flex-row items-center justify-start': direction === 'horizontal' && !manyColumns,
        'grid grid-cols-2': manyColumns
      })}
    >
      {options.map((opt) => (
        <HeadlessRadio
          key={opt.id}
          value={opt}
          className={cx(
            'group relative font-medium',
            'rounded-lg p-1 cursor-pointer',
            'flex justify-start items-center gap-2',
            { 'w-full': !manyColumns, 'col-span-1': manyColumns },
            'transition focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white',
            'hover:shadow-md text-brand-primary-600 hover:text-brand-primary-700 '
          )}
        >
          <Radio selected={opt.id === current.id} />
          <p className="text-sm leading-none whitespace-nowrap">{opt.label}</p>
        </HeadlessRadio>
      ))}
    </HeadlessRadioGroup>
  )
}
