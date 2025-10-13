'use client'
import { useState, type ChangeEvent } from 'react'

import Input from '@ui/base/form/inputs/Input'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'

import Icon from '@/ui/components/base/Icon'

interface UpdatePasswordWelcomeFormProps {
  values: { password: string; passwordConfirmation: string }
  handleChange: (_e: ChangeEvent) => void
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const UpdatePasswordWelcomeForm = ({ handleChange, values }: UpdatePasswordWelcomeFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState<boolean>(false)

  const EyeButtonPassword = () => {
    const style = 'text-brand-gray-600'
    const eye = passwordVisible ? (
      <Icon icon="eye-slash" className={style} />
    ) : (
      <Icon icon="eye" className={style} />
    )

    return (
      <span
        className="cursor-pointer text-slate-600 hover:text-slate-700 leading-none"
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {eye}
      </span>
    )
  }

  const EyeButtonPasswordConfirmation = () => {
    const style = 'text-brand-gray-600'
    const eye = passwordConfirmationVisible ? (
      <Icon icon="eye-slash" className={style} />
    ) : (
      <Icon icon="eye" className={style} />
    )

    return (
      <span
        className="cursor-pointer text-slate-600 hover:text-slate-700 leading-none"
        onClick={() => setPasswordConfirmationVisible(!passwordVisible)}
      >
        {eye}
      </span>
    )
  }

  return (
    <form className="w-full flex flex-col gap-3">
      <Input
        label="Nova senha"
        labelStyle="text-white md:text-brand-primary-600"
        name="password"
        type={passwordVisible ? 'text' : 'password'}
        iconButton={<EyeButtonPassword />}
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
        type={passwordConfirmationVisible ? 'text' : 'password'}
        iconButton={<EyeButtonPasswordConfirmation />}
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
