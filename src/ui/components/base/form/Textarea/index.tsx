import FieldWrapper from '@raw/wrappers/Field'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'

import type { TextAreaRawProps } from '../../_raw/Textarea'
import { TextAreaRaw } from '../../_raw/Textarea'

export interface TextAreaProps extends TextAreaRawProps {
  label?: string
  description?: string
  theme?: FormTheme
  themeSize?: FormSizes
}

const TextAreaInput = ({
  label,
  description,
  theme = 'light',
  themeSize = 'md',
  ...otherProps
}: TextAreaProps) => {
  return (
    <FieldWrapper label={label} description={description} theme={theme} themeSize={themeSize}>
      <TextAreaRaw theme={theme} themeSize={themeSize} {...otherProps} />
    </FieldWrapper>
  )
}

export default TextAreaInput
