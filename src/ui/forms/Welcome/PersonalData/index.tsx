'use client'
import type { ChangeEvent } from 'react'

import Input from '@ui/base/form/inputs/Input'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'

interface PersonalDataWelcomeFormProps {
  values: { birthDate: string; cpf: string }
  handleChange: (_e: ChangeEvent) => void
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const PersonalDataWelcomeForm = ({ handleChange, values }: PersonalDataWelcomeFormProps) => {
  return (
    <form className="w-full flex flex-col gap-2 md:gap-3">
      <Input
        label="Data de nascimento"
        labelStyle="text-white md:text-brand-primary-700"
        name="birthDate"
        themeSize={formThemeSize}
        theme={themePallete}
        placeholder={`01/01/1990`}
        value={values.birthDate}
        onChange={handleChange}
      />
      <Input
        label="CPF"
        labelStyle="text-white md:text-brand-primary-700"
        name="cpf"
        themeSize={formThemeSize}
        theme={themePallete}
        placeholder={`123.456.789-00`}
        value={values.cpf}
        onChange={handleChange}
      />
    </form>
  )
}

export default PersonalDataWelcomeForm
