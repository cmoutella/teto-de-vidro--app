import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import c from 'classnames'
import { differenceInYears, isFuture } from 'date-fns'
import { useFormik } from 'formik'
import { redirect } from 'next/navigation'
import * as Yup from 'yup'

import { initialUserUpdateRequest } from '@/requests/client/user/initialUpdateUser'
import type { InterfaceUser } from '@/types/user'
import Button from '@/ui/components/base/Button'
import PersonalDataWelcomeForm from '@/ui/forms/Welcome/PersonalData'
import { normalizeCpf } from '@/utils/string/normalize/normalizeCPF'
import { isValidCPF } from '@/utils/validate/cpf'

interface FormSlideLayoutProps {
  user: { name: string; id: string }
  onNext: () => void
}

export function PersonalDataForm({ user, onNext }: FormSlideLayoutProps) {
  const [personalDataValid, setPersonalDataValid] = useState<boolean>(false)

  const personalDataValidationSchema = Yup.object({
    birthDate: Yup.string()
      .required()
      .test(
        'Data de nascimento inválida',
        'Data de nascimento não pode estar no futuro.',
        (value) => {
          const inputedDate = new Date(value)

          const validDate = !isFuture(inputedDate)

          return validDate
        }
      )
      .test('Idade mínima', 'É preciso ter pelo menos 16 anos.', (value) => {
        const inputedDate = new Date(value)

        const validDate = differenceInYears(new Date(), inputedDate) >= 16
        return validDate
      }),
    cpf: Yup.string()
      .required()
      .test('CPF inválido', (value) => {
        const validDoc = isValidCPF(value)

        return validDoc
      })
  })

  const personalDataFormik = useFormik({
    initialValues: {
      birthDate: '',
      cpf: ''
    },
    validationSchema: personalDataValidationSchema,
    onSubmit: handlePersonalDataSubmit
  })

  function onPersonalDataFail() {
    toast.error('Houve um erro no servidor. Tente acessar seu convite novamente mais tarde.')

    setTimeout(() => redirect('/'), 3000)
  }

  async function handlePersonalDataSubmit(values: { cpf: string; birthDate: string }) {
    if (!personalDataFormik.isValid || !user) return

    const normalizedCPF = normalizeCpf(values.cpf)

    if (!normalizedCPF) return

    const data: Partial<InterfaceUser> = {
      cpf: normalizedCPF,
      birthDate: new Date(values.birthDate).toISOString()
    }

    const res = await initialUserUpdateRequest(user.id, data)

    if (!res) {
      onPersonalDataFail()
      return
    }

    onNext()
  }

  useEffect(() => {
    personalDataFormik.validateForm().then((errors) => {
      personalDataFormik.setErrors(errors)
      setPersonalDataValid(
        !errors.birthDate &&
          !errors.cpf &&
          personalDataFormik.values.birthDate !== '' &&
          personalDataFormik.values.cpf !== ''
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalDataFormik.values])

  return (
    <div className="w-full h-full bg-brand-primary-600 flex justify-center items-center pt-10 pb-5">
      <div className="w-full h-full md:max-w-[800px] lg:max-w-[1000px] md:max-h-[600px] md:bg-white md:rounded-3xl flex flex-col justify-between md:justify-center items-center">
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-center h-full w-full">
          <div className="md:px-4 md:py-8 md:ml-4 md:w-1/2 text-white md:text-brand-gray-800 mb-6 px-4">
            <h1 className="text-xl lg:text-2xl flex flex-col text-center mb-6 md:mb-10 font-semibold tracking-wide text-white md:text-brand-primary-700">
              {`Estamos quase lá, ${user.name}`}
            </h1>
            <p className="text-sm lg:text-base text-center mb-6">
              Para garantir a confiança nas informações que disponibilizamos e a segurança dos
              imóveis, condomínios e seus moradores, queremos confirmar algumas informações suas.
            </p>
            <p className="text-sm lg:text-base text-center">
              Estes dados serão armazenadas criptografados de forma segura e somente serão usados
              para assegurar a identidade vinculada a sua conta.
            </p>
          </div>
          <div className="md:h-auto w-full md:w-1/2 px-3 py-4 md:px-8 md:py-8 bg-brand-primary-600 md:bg-white rounded-t-2xl text-white md:text-brand-gray-900 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-between items-center gap-6 md:gap-14 w-full max-w-[330px] md:max-w-[400px] md:h-full">
              <div className="w-full">
                <PersonalDataWelcomeForm
                  values={personalDataFormik.values}
                  handleDateChange={(d: string) => personalDataFormik.setFieldValue('birthDate', d)}
                  handleCPFChange={(d: string) => personalDataFormik.setFieldValue('cpf', d)}
                />
              </div>
              <div className="hidden md:flex flex-col-reverse md:flex-row gap-2 md:gap-3 w-full">
                <Button
                  label="Continuar"
                  onClick={personalDataFormik.handleSubmit as never}
                  size="large"
                  className={c(
                    'bg-highlight-brand text-brand-primary-900 font-medium w-full py-3',
                    {
                      'disabled:bg-brand-gray-100 md:disabled:bg-brand-gray-100': !personalDataValid
                    }
                  )}
                  disabled={!personalDataValid}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:hidden flex-col-reverse md:flex-row gap-2 md:gap-3 w-full max-w-[330px] md:max-w-[400px] justify-self-end">
          <Button
            label="Continuar"
            onClick={personalDataFormik.handleSubmit as never}
            size="large"
            className={c('bg-highlight-brand text-brand-primary-900 font-medium w-full py-3', {
              'disabled:bg-brand-gray-100 md:disabled:bg-brand-gray-100': !personalDataValid
            })}
            disabled={!personalDataValid}
          />
        </div>
      </div>
    </div>
  )
}
