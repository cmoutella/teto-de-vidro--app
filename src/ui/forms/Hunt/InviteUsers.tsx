'use client'
import { useCallback, useEffect, useState } from 'react'

import SubmitButton from '@ui/base/form/buttons/SubmitButton'
import Input from '@ui/base/form/inputs/Input'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import type { FormikErrors } from 'formik'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { inviteUsers } from '@/requests/client/hunt/inviteUsers'
import type { InterfaceHunt } from '@/types/hunt'
import type { UserInvitationData } from '@/types/invitation'
import type { SessionUser } from '@/types/user'
import Button from '@/ui/components/base/Button'
import Icon from '@/ui/components/base/Icon'
import { formatEmailInput } from '@/utils/string/format/formatEmailInput'

interface InviteUserFormProps {
  onSuccess: (_h: InterfaceHunt) => void
  onFail: () => void
  huntId: string
  invitationLimit: number
  currentUser: SessionUser
}

const formThemeSize: FormSizes = 'md'
const themePallete: FormTheme = 'light'

const InviteUserForm = ({
  onSuccess,
  onFail,
  huntId,
  invitationLimit,
  currentUser
}: InviteUserFormProps) => {
  const [submitEnabled, setSubmitEnabled] = useState(false)

  const validationSchema = Yup.object({
    usersInvited: Yup.array().of(
      Yup.object({
        name: Yup.string().matches(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
        email: Yup.string().email('Email inválido')
      })
    )
  })

  const formik = useFormik({
    initialValues: {
      usersInvited: [{ name: '', email: '' }]
    },
    validateOnChange: true,
    validationSchema,
    onSubmit: handleSubmit
  })

  useEffect(() => {
    const actionInProgress = formik.isSubmitting || formik.isValidating

    const enable = formik.isValid && !actionInProgress
    setSubmitEnabled(enable)
  }, [formik])

  function addInvitationField() {
    formik.setFieldValue('usersInvited', [...formik.values.usersInvited, { name: '', email: '' }])
    // TODO: scroll to end
  }

  async function removeInvitationField(fieldIndex: number) {
    await formik.setFieldValue(
      'usersInvited',
      [...formik.values.usersInvited].splice(fieldIndex, 1)
    )
  }

  async function handleSubmit(values: { usersInvited: UserInvitationData[] }) {
    if (!formik.isValid || !currentUser) return

    const invitations = values.usersInvited.filter((invites) => {
      const nameFilled = !!invites.name && invites.name !== ''
      const emailFilld = !!invites.email && invites.email !== ''

      return nameFilled && emailFilld
    })

    const res = await inviteUsers(huntId, invitations)

    if (!res) {
      onFail()
      return
    }

    onSuccess(res)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    formik.setFieldValue(e.target.name, formatEmailInput(value))
  }

  const handleEmailError = useCallback(
    (fieldIndex: number) => {
      const invitationHasErros =
        formik.errors.usersInvited && formik.errors.usersInvited.length >= 1

      if (!invitationHasErros) return

      const error = invitationHasErros
        ? (
            formik.errors.usersInvited?.[fieldIndex] as FormikErrors<{
              name: string
              email: string
            }>
          )?.email
        : undefined

      return error
    },
    [formik.errors]
  )

  const handleNameError = useCallback(
    (fieldIndex: number) => {
      const invitationHasErros =
        formik.errors.usersInvited && formik.errors.usersInvited.length >= 1

      if (!invitationHasErros) return

      const error = invitationHasErros
        ? (
            formik.errors.usersInvited?.[fieldIndex] as FormikErrors<{
              name: string
              email: string
            }>
          )?.name
        : undefined

      return error
    },
    [formik.errors]
  )

  return (
    <div className="w-full flex justify-center flex-col items-center p-4 sm:px-14 sm:py-10 gap-4">
      <div className="flex flex-col gap-1 w-full">
        <h4 className="text-2xl text-brand-primary-800 font-bold text-start w-full">
          Convide quem vai morar com você
        </h4>
        <p className="text-brand-primary-600 text-left w-full">
          Insira abaixo o nome e e-mail de cada convidado
        </p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col sm:grid md:grid-cols-12 gap-x-4 gap-y-4 sm:gap-y-5"
      >
        <div className="row col-span-12 grid border-2 border-brand-primary-500 rounded-md p-4 gap-2 max-h-80 overflow-y-scroll">
          {formik.values.usersInvited.map((invitation, i) => {
            return (
              <div
                className="w-full flex gap-2 rounded-md bg-brand-primary-200 px-3 pt-2.5 pb-3"
                key={`invite-${i}`}
              >
                <span className="w-1/2">
                  <Input
                    label="Nome"
                    name={`usersInvited[${i}].name`}
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={invitation.name}
                    onChange={formik.handleChange}
                    error={handleNameError(i)}
                  />
                </span>
                <span className="w-1/2">
                  <Input
                    label="Email"
                    name={`usersInvited[${i}].email`}
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={invitation.email}
                    onChange={handleEmailChange}
                    error={handleEmailError(i)}
                  />
                </span>
                {formik.values.usersInvited.length >= 2 && (
                  <span className="self-end pb-4">
                    <Button
                      onlyIcon={true}
                      label={<Icon icon="trash" size="xs" />}
                      className="text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white flex justify-center"
                      onClick={() => removeInvitationField(i)}
                    />
                  </span>
                )}
              </div>
            )
          })}
          {invitationLimit - formik.values.usersInvited.length >= 1 && (
            <div className="w-full flex justify-end mt-3">
              <Button
                label="Incluir convidado"
                size="small"
                onClick={addInvitationField}
                className="bg-brand-primary-500 hover:bg-brand-primary-600 text-white"
              />
            </div>
          )}
        </div>

        <div className="flex col-span-12 justify-center pt-3 sm:pt-5">
          <SubmitButton isDisabled={!submitEnabled} label="Enviar convites" />
        </div>
      </form>
    </div>
  )
}

export default InviteUserForm
