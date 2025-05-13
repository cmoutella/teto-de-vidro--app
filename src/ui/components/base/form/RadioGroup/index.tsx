import type { RawRadioGroupProps } from '../../_raw/RadioGroup'
import { RawRadioGroup } from '../../_raw/RadioGroup'
import FieldWrapper from '../../_raw/wrappers/Field'

interface RadioGroupProps extends RawRadioGroupProps {
  label: string
  description?: string
}

export function RadioGroup({
  name,
  label,
  description,
  options,
  direction,
  manyColumns,
  onChange
}: RadioGroupProps) {
  return (
    <FieldWrapper label={label} description={description}>
      <RawRadioGroup
        name={name}
        options={options}
        direction={direction}
        manyColumns={manyColumns}
        onChange={onChange}
      />
    </FieldWrapper>
  )
}
