import { useEffect, useState } from 'react'

import { Radio as HeadlessRadio, RadioGroup as HeadlessRadioGroup } from '@headlessui/react'

export type RawRadioOption = Record<string, unknown> & { id: string; label: string }

interface RawRadioGroupProps {
  options: RawRadioOption[]
  name: string
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

export function RawRadioGroup({ name, options, onChange }: RawRadioGroupProps) {
  const [selected, setSelected] = useState<RawRadioOption>(options[0])

  useEffect(() => {
    onChange(selected)
  }, [selected])

  return (
    <HeadlessRadioGroup
      value={selected}
      name={name}
      onChange={setSelected}
      className="flex items-center justify-start gap-2"
    >
      {options.map((opt) => (
        <HeadlessRadio
          key={opt.id}
          value={opt}
          className="group relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md transition focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white w-full hover:shadow-lg text-brand-primary-600 hover:text-brand-primary-700 font-medium"
        >
          <div className="w-full flex items-center justify-start gap-2">
            <Radio selected={opt.id === selected.id} />
            <p className="text-sm leading-none whitespace-nowrap">{opt.label}</p>
          </div>
        </HeadlessRadio>
      ))}
    </HeadlessRadioGroup>
  )
}
