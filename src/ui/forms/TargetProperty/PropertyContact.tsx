'use client'
import { useState } from 'react'

import { useSessionContext } from '@providers/AuthProvider'
import SubmitButton from '@ui/base/form/buttons/SubmitButton'
import Input from '@ui/base/form/inputs/Input'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { editTargetProperty } from '@/requests/targetProperty/edit'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import { Checkbox } from '@/ui/components/base/form/Checkbox'

interface PropertyContactFormProps {
  onSuccess: (_h: Partial<TargetPropertyInterface>) => void
  onFail: () => void
  currentData: Partial<TargetPropertyInterface>
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const PropertyContactForm = ({ onSuccess, onFail, currentData }: PropertyContactFormProps) => {
  const [hasRealState, setHasRealState] = useState<boolean>(true)

  const validationSchema = Yup.object({
    realState: Yup.string(),
    realStatePhoneNumber: Yup.string().min(15).max(15),
    contactName: Yup.string(),
    contactWhatzap: Yup.string().min(15).max(15)
  })

  const formik = useFormik({
    initialValues: {
      realState: currentData.realState ?? '',
      contactName: currentData.contactName ?? '',
      realStatePhoneNumber: currentData.realStatePhoneNumber ?? '',
      contactWhatzap: currentData.contactWhatzap ?? ''
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  const { user } = useSessionContext()

  async function handleSubmit(values: {
    realState: string
    realStatePhoneNumber: string
    contactName: string
    contactWhatzap: string
  }) {
    if (!formik.isValid || !user) return

    const res = await editTargetProperty(currentData.id as never, values)

    if (!res) {
      onFail()
      return
    }

    onSuccess(res)
  }

  const handleBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await formik.validateField(e.target.name)
  }

  return (
    <div className="w-full flex justify-center flex-col items-center p-2 pb-4 gap-3">
      <form onSubmit={formik.handleSubmit} className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5">
        <p className="text-2xl font-semibold text-brand-primary-800 col-span-12">
          Informações de contato
        </p>
        <span className="col-span-12 flex justify-start">
          <Checkbox
            label="Imobiliária"
            name="realState"
            checked={hasRealState}
            onChange={setHasRealState}
          />
        </span>

        {hasRealState && (
          <span className="col-span-6">
            <Input
              label="Imobiliária"
              name="realState"
              themeSize={formThemeSize}
              theme={themePallete}
              value={formik.values.realState}
              onChange={formik.handleChange}
              onBlur={handleBlur}
              siblingHeight={true}
              error={formik.errors.realState}
            />
          </span>
        )}
        {hasRealState && (
          <span className="col-span-6">
            <Input
              label="Telefone"
              name="realStatePhoneNumber"
              themeSize={formThemeSize}
              theme={themePallete}
              value={formik.values.realStatePhoneNumber}
              placeholder="(xx) xxxxx-xxxx"
              onChange={formik.handleChange}
              onBlur={handleBlur}
              description="Número da imobiliária com DDD"
              error={formik.errors.realStatePhoneNumber}
            />
          </span>
        )}

        <span className="col-span-6">
          <Input
            label="Contato"
            name="contactName"
            themeSize={formThemeSize}
            theme={themePallete}
            value={formik.values.contactName}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            description="Nome do corretor / proprietário"
            error={formik.errors.contactName}
          />
        </span>
        <span className="col-span-6">
          <Input
            label="Whatzap"
            name="contactWhatzap"
            themeSize={formThemeSize}
            theme={themePallete}
            value={formik.values.contactWhatzap}
            placeholder="(xx) xxxxx-xxxx"
            onChange={formik.handleChange}
            onBlur={handleBlur}
            description="Número do contato no whatzap"
            error={formik.errors.contactWhatzap}
          />
        </span>

        <div className="flex col-span-12 w-full justify-end items-center pt-5">
          <SubmitButton
            isDisabled={!formik.isValid || formik.isSubmitting}
            label="Salvar contato"
            fullWidth={true}
          />
        </div>
      </form>
    </div>
  )
}

export default PropertyContactForm
