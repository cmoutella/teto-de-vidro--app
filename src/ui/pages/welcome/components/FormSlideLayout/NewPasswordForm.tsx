import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import c from 'classnames'
import { useFormik } from 'formik'
import { redirect } from 'next/navigation'
import * as Yup from 'yup'

import type { ChangePassword } from '@/requests/client/user/changePassword'
import { changePassword } from '@/requests/client/user/changePassword'
import Button from '@/ui/components/base/Button'
import OptimizedImage from '@/ui/components/base/image'
import UpdatePasswordWelcomeForm from '@/ui/forms/Welcome/UpdatePassword'

import lockIllustration from '../../assets/slide-new-password.png'

interface FormSlideLayoutProps {
  user: { name: string; id: string }
  onNext: (_password: string) => void
}

export function NewPasswordForm({ user, onNext }: FormSlideLayoutProps) {
  const [newPasswordValid, setNewPasswordValid] = useState<boolean>(false)
  const [passwordRulesErrors, setPasswordRulesErrors] = useState<string[]>([])

  const updatePasswordValidationSchema = Yup.object({
    password: Yup.string()
      .required('Nova senha obrigatória')
      .test('Regras da senha', 'Senha fraca', (value) => {
        const ruleBreaks: string[] = []

        // maiusculas
        if (!RegExp(/[A-Z]/).test(value)) {
          ruleBreaks.push('Pelo menos uma letra maiúscula')
        }

        // minusculas
        if (!RegExp(/[a-z]/).test(value)) {
          ruleBreaks.push('Pelo menos uma letra minúscula')
        }

        // numeros
        if (!RegExp(/\d/).test(value)) {
          ruleBreaks.push('Pelo menos um número')
        }

        // caracter especial
        if (!RegExp(/[@$!%*?&]/).test(value)) {
          ruleBreaks.push('Pelo menos um caracter especial (@, $, !, %, *, ?, &)')
        }

        if (value.length < 8) {
          ruleBreaks.push('Pelo menos 8 caracteres')
        }

        setPasswordRulesErrors(ruleBreaks)
        return ruleBreaks.length <= 0
      }),
    passwordConfirmation: Yup.string()
      .required('Necessário confirmar a senha')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais.')
  })

  const updatePasswordFormik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: updatePasswordValidationSchema,
    onSubmit: handleUpdatePasswordSubmit
  })

  function onUpdatePasswordFail() {
    toast.error('Houve um erro no servidor. Tente acessar seu convite novamente mais tarde.')

    setTimeout(() => redirect('/'), 3000)
  }

  function onUpdatePasswordSuccess() {
    onNext(updatePasswordFormik.values.password)
  }

  async function handleUpdatePasswordSubmit(values: ChangePassword) {
    if (!updatePasswordFormik.isValid || !user) return

    const data: ChangePassword = {
      ...values
    }

    const res = await changePassword(user.id, data)

    if (!res) {
      onUpdatePasswordFail()
      return
    }

    onUpdatePasswordSuccess()
  }

  useEffect(() => {
    updatePasswordFormik.validateForm().then((errors) => {
      updatePasswordFormik.setErrors(errors)
      setNewPasswordValid(
        !errors.password &&
          !errors.passwordConfirmation &&
          updatePasswordFormik.values.password !== '' &&
          updatePasswordFormik.values.passwordConfirmation !== ''
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePasswordFormik.values])

  return (
    <div className="w-full h-full bg-brand-primary-600 flex justify-center items-center pt-10 pb-5 px-2">
      <div className="w-full h-full md:max-w-[800px] lg:max-w-[1000px] md:max-h-[600px] md:bg-white md:rounded-3xl flex flex-col justify-between md:justify-center items-center">
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-center h-full w-full">
          <div className="md:px-4 md:py-8 md:ml-4 md:w-1/2 text-white md:text-brand-gray-800 mb-2 md:mb-6 max-h-[60%] md:h-full md:mt-32 px-4">
            <h1 className="text-xl lg:text-2xl flex flex-col text-center mb-6 md:mb-10 font-semibold tracking-wide text-white md:text-brand-primary-700">
              Agora para concluir
            </h1>
            <p className="text-sm lg:text-base text-center">
              Crie uma senha segura para proteger o acesso à sua conta
            </p>
            <div className="w-full max-h-[40%] flex flex-wrap justify-center mt-4 md:mt-6">
              <OptimizedImage
                className="hidden md:block max-w-[330px] md:max-w-full rounded-full md:rounded-none"
                images={{
                  desktop: {
                    src: lockIllustration,
                    width: 330
                  }
                }}
                alt="Um cadeado estilizado"
                priority={true}
              />
            </div>
          </div>
          <div className="md:h-auto w-full md:w-1/2 px-3 py-4 md:px-8 md:py-8 bg-brand-primary-600 md:bg-white rounded-t-2xl text-white md:text-brand-gray-900 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-between items-center gap-6 md:gap-14 w-full max-w-[330px] md:max-w-[400px] md:h-full">
              <div className="w-full">
                <UpdatePasswordWelcomeForm
                  values={updatePasswordFormik.values}
                  handleChange={updatePasswordFormik.handleChange}
                  passwordErrors={passwordRulesErrors}
                  confirmationErrors={
                    updatePasswordFormik.errors.passwordConfirmation
                      ? [updatePasswordFormik.errors.passwordConfirmation]
                      : []
                  }
                />
              </div>
              <div className="hidden md:flex flex-col-reverse md:flex-row gap-2 md:gap-3 w-full">
                <Button
                  label="Continuar"
                  onClick={updatePasswordFormik.handleSubmit as never}
                  size="large"
                  className={c(
                    'bg-highlight-brand text-brand-primary-900 font-medium w-full py-3',
                    {
                      'disabled:bg-brand-gray-100 md:disabled:bg-brand-gray-100': !newPasswordValid
                    }
                  )}
                  disabled={!newPasswordValid}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:hidden flex-col-reverse md:flex-row gap-2 md:gap-3 w-full max-w-[330px] md:max-w-[400px] justify-self-end">
          <Button
            label="Continuar"
            onClick={updatePasswordFormik.handleSubmit as never}
            size="large"
            className={c('bg-highlight-brand text-brand-primary-900 font-medium w-full py-3', {
              'disabled:bg-brand-gray-100 md:disabled:bg-brand-gray-100': !newPasswordValid
            })}
            disabled={!newPasswordValid}
          />
        </div>
      </div>
    </div>
  )
}
