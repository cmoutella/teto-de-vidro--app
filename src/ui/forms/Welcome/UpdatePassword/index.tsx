'use client'
import type { ChangeEvent } from 'react'

import Input from '@ui/base/form/inputs/Input'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'

interface UpdatePasswordWelcomeFormProps {
  values: { password: string; passwordConfirmation: string }
  handleChange: (_e: ChangeEvent) => void
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const UpdatePasswordWelcomeForm = ({ handleChange, values }: UpdatePasswordWelcomeFormProps) => {
  return (
    <form className="w-full flex flex-col gap-3">
      <Input
        label="Nova senha"
        labelStyle="text-white md:text-brand-primary-600"
        name="password"
        themeSize={formThemeSize}
        theme={themePallete}
        placeholder={`Informe uma senha`}
        value={values.password}
        onChange={handleChange}
      />
      <Input
        label="Confirme a nova senha"
        labelStyle="text-white md:text-brand-primary-600"
        name="passwordConfirmation"
        themeSize={formThemeSize}
        theme={themePallete}
        placeholder={`Repita a senha`}
        value={values.passwordConfirmation}
        onChange={handleChange}
      />
    </form>
  )
}

export default UpdatePasswordWelcomeForm
