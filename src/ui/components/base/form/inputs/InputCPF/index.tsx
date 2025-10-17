import type { ChangeEvent } from 'react'
import { useState } from 'react'

import type { InputProps } from '@headlessui/react'
import FieldWrapper from '@raw/wrappers/Field'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'

import { formatCPF } from '@/utils/string/format/formatCPF'

import InputRaw from '../../../_raw/Input'

interface InputCPFProps extends Omit<InputProps, 'onChange'> {
  label?: string
  labelStyle?: string
  description?: string
  theme?: FormTheme
  themeSize?: FormSizes
  onChange: (_cpf: string) => void
  value?: string
}

const InputCPF = ({
  label,
  labelStyle,
  description,
  theme = 'light',
  themeSize = 'md',
  onChange,
  value = '',
  ...props
}: InputCPFProps) => {
  const [cpf, setCPF] = useState<string>(formatCPF(value))

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Formata o CPF conforme o usuário digita
    const formattedCPF = formatCPF(inputValue)

    setCPF(formattedCPF)
    onChange(formattedCPF)
  }

  return (
    <FieldWrapper
      label={label}
      labelStyle={labelStyle}
      description={description}
      theme={theme}
      themeSize={themeSize}
    >
      <InputRaw
        type="text"
        name="cpf"
        value={cpf}
        onChange={handleChange}
        maxLength={14}
        theme={theme}
        themeSize={themeSize}
        {...props}
      />
    </FieldWrapper>
  )
}

export default InputCPF
