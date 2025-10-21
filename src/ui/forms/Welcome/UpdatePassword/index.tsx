'use client'
import { useMemo, useState, type ChangeEvent } from 'react'

import Input from '@ui/base/form/inputs/Input'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'

import Icon from '@/ui/components/base/Icon'

interface UpdatePasswordWelcomeFormProps {
  values: { password: string; passwordConfirmation: string }
  handleChange: (_e: ChangeEvent) => void
  passwordErrors: string[]
  confirmationErrors: string[]
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const UpdatePasswordWelcomeForm = ({
  handleChange,
  values,
  passwordErrors = [],
  confirmationErrors = []
}: UpdatePasswordWelcomeFormProps) => {
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

  const pErrors = useMemo(
    () => passwordErrors.filter((item) => item !== 'Nova senha obrigatória'),
    [passwordErrors]
  )
  const cErrors = useMemo(
    () => confirmationErrors.filter((item) => item !== 'Necessário confirmar a senha'),
    [confirmationErrors]
  )

  return (
    <form className="w-full flex flex-col gap-3">
      <div className="w-full">
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
        {pErrors.length >= 1 && (
          <div className="w-full">
            {pErrors.map((pError, i) => {
              return (
                <p
                  key={`password-error-${i}`}
                  className="w-full text-xs text-red-300 md:text-red-500"
                >
                  {pError}
                </p>
              )
            })}
          </div>
        )}
      </div>
      <div className="w-full">
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
        {cErrors.length >= 1 && (
          <div className="w-full">
            {cErrors.map((cError, i) => {
              return (
                <p
                  key={`password-error-${i}`}
                  className="w-full text-xs text-red-300 md:text-red-500"
                >
                  {cError}
                </p>
              )
            })}
          </div>
        )}
      </div>
    </form>
  )
}

export default UpdatePasswordWelcomeForm
