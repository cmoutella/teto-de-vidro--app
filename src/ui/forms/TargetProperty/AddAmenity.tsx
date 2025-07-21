'use client'

import type { ChangeEvent } from 'react'

import { useSessionContext } from '@providers/AuthProvider'
import SubmitButton from '@ui/base/form/buttons/SubmitButton'
import Input from '@ui/base/form/inputs/Input'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { addAmenityToTarget } from '@/requests/targetProperty/addAmenity'
import type { AmenityData } from '@/types/hunt'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import type { RawRadioOption } from '@/ui/components/base/_raw/RadioGroup'
import { RadioGroup } from '@/ui/components/base/form/RadioGroup'

interface AddAmenityToTargetProps {
  onSuccess: (_h: Partial<TargetPropertyInterface>) => void
  onFail: () => void
  targetId: Pick<TargetPropertyInterface, 'id'>
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const AddAmenityToTargetForm = ({ onSuccess, onFail, targetId }: AddAmenityToTargetProps) => {
  const validationSchema = Yup.object({
    label: Yup.string().required('Título é obrigatório')
  })

  const formik = useFormik({
    initialValues: {
      identifier: '',
      label: '',
      amenityOf: 'property',
      newAmenityTopic: ''
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  const { user } = useSessionContext()

  async function handleSubmit(values: AmenityData & { newAmenityTopic: string }) {
    if (!formik.isValid || !user) return

    const res = await addAmenityToTarget(targetId, values, user.id as never)

    if (!res) {
      onFail()
      return
    }

    onSuccess(res)
  }

  const handleBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await formik.validateField(e.target.name)
  }

  const onLabelChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    await formik.setFieldValue('label', value)
    await formik.setFieldValue('identifier', value.trim().toLowerCase().replace(' ', '_'))
  }

  const onRelativeToChange = async (val: RawRadioOption) => {
    await formik.setFieldValue('amenityOf', val.value)
  }

  return (
    <div className="w-full flex justify-center flex-col items-center p-2 pb-4 gap-3">
      <form onSubmit={formik.handleSubmit} className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5">
        <p className="text-2xl font-semibold text-brand-primary-800 col-span-12">
          Inclua a facilidade
        </p>

        <span className="col-span-12">
          <RadioGroup
            label="Está relacionado a:"
            name="amenityOf"
            onChange={onRelativeToChange}
            options={[
              { id: 'property', label: 'Imóvel', value: 'property' },
              { id: 'lot', label: 'Condomínio', value: 'lot' },
              { id: 'outro', label: 'Outro tema', value: undefined }
            ]}
          />
        </span>
        {!formik.values.amenityOf && (
          <span className="col-span-12">
            <Input
              label="Qual outro tema?"
              name="newAmenityTopic"
              themeSize={formThemeSize}
              theme={themePallete}
              value={formik.values.newAmenityTopic}
              onChange={formik.handleChange}
              onBlur={handleBlur}
              error={formik.errors.newAmenityTopic}
            />
          </span>
        )}
        <span className="col-span-12">
          <Input
            label="Título"
            name="label"
            themeSize={formThemeSize}
            theme={themePallete}
            value={formik.values.label}
            onChange={onLabelChange}
            onBlur={handleBlur}
            description="Dê um nome explicativo curto"
            error={formik.errors.label}
          />
        </span>

        <div className="flex col-span-12 w-full justify-end items-center pt-5">
          <SubmitButton
            isDisabled={!formik.isValid || formik.isSubmitting}
            label="Incluir"
            fullWidth={true}
          />
        </div>
      </form>
    </div>
  )
}

export default AddAmenityToTargetForm
