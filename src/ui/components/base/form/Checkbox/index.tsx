import { CheckboxRaw } from '../../_raw/Checkbox'

interface CheckboxProps {
  label: string
  name: string
  checked: boolean
  onChange: (_b: boolean) => void
}

export function Checkbox({ label, checked, name, onChange }: CheckboxProps) {
  return (
    <span className="flex items-center justify-center gap-2">
      <CheckboxRaw checked={checked} name={name} onChange={onChange} />
      <p className="capitalize font-normal text-sm text-brand-primary-700">{label}</p>
    </span>
  )
}
