import type { RawRadioGroupProps, RawRadioOption } from '../../_raw/RadioGroup'
import { RawRadioGroup } from '../../_raw/RadioGroup'
import FieldWrapper from '../../_raw/wrappers/Field'

interface RadioGroupProps extends RawRadioGroupProps {
  label: string
  description?: string
  current: RawRadioOption
}

export function RadioGroup({
  name,
  label,
  description,
  options,
  current,
  direction,
  manyColumns,
  onChange
}: RadioGroupProps) {
  return (
    <FieldWrapper label={label} description={description}>
      <RawRadioGroup
        name={name}
        options={options}
        current={current}
        direction={direction}
        manyColumns={manyColumns}
        onChange={onChange}
      />
    </FieldWrapper>
  )
}
