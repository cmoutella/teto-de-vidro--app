'use client'

import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'

import InputCPF from '@/ui/components/base/form/inputs/InputCPF'
import InputFullDate from '@/ui/components/base/form/inputs/InputFullDate'

interface PersonalDataWelcomeFormProps {
  values: { birthDate: string; cpf: string }
  handleCPFChange: (_d: string) => void
  handleDateChange: (_d: string) => void
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const PersonalDataWelcomeForm = ({
  handleCPFChange,
  handleDateChange,
  values
}: PersonalDataWelcomeFormProps) => {
  return (
    <form className="w-full flex flex-col gap-2 md:gap-3">
      <InputFullDate
        label="Data de nascimento"
        labelStyle="text-white md:text-brand-primary-700"
        themeSize={formThemeSize}
        theme={themePallete}
        value={values.birthDate}
        onChange={handleDateChange}
      />
      <InputCPF
        label="CPF"
        labelStyle="text-white md:text-brand-primary-700"
        themeSize={formThemeSize}
        theme={themePallete}
        placeholder={`123.456.789-00`}
        value={values.cpf}
        onChange={handleCPFChange}
      />
    </form>
  )
}

export default PersonalDataWelcomeForm
