import type { RawRadioOption } from '../../_raw/RadioGroup'
import { RawRadioGroup } from '../../_raw/RadioGroup'
import FieldWrapper from '../../_raw/wrappers/Field'

interface RadioGroupProps {
  name: string
  label: string
  description?: string
  options: RawRadioOption[]
  onChange: (_val: RawRadioOption) => void
}

export function RadioGroup({ name, label, description, options, onChange }: RadioGroupProps) {
  return (
    <FieldWrapper label={label} description={description}>
      <RawRadioGroup name={name} options={options} onChange={onChange} />
    </FieldWrapper>
  )
}
