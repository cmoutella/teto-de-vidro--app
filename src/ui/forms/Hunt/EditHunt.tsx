'use client'
import { useEffect, useState } from 'react'

import { useSessionContext } from '@providers/AuthProvider'
import SubmitButton from '@ui/base/form/buttons/SubmitButton'
import Input from '@ui/base/form/inputs/Input'
import InputPartialDate from '@ui/base/form/inputs/InputPartialDate'
import DropdownSelect from '@ui/base/form/selects/DropdownSelect'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import { isToday, lastDayOfMonth } from 'date-fns'
import { addDays } from 'date-fns/addDays'
import { isFuture } from 'date-fns/isFuture'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { CreateHuntRequestProps } from '@/requests/client/hunt/create'
import { editHunt } from '@/requests/client/hunt/edit'
import type { InterfaceHunt } from '@/types/hunt'

interface EditHuntFormProps {
  onSuccess: (_h: InterfaceHunt) => void
  onFail: () => void
  currentData: InterfaceHunt
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const EditHuntForm = ({ onSuccess, onFail, currentData }: EditHuntFormProps) => {
  const [submitEnabled, setSubmitEnabled] = useState(false)

  const validationSchema = Yup.object({
    type: Yup.string().required(),
    movingExpected: Yup.string().test(
      'A expectativa de mudança deve ser uma data no futuro',
      (value) => {
        if (!value) {
          // Retorna verdadeiro para ignorar a validação quando o valor está ausente
          return true
        }

        const valueChanged = value !== currentData.movingExpected

        if (!valueChanged) return true

        const inputedDate = new Date(value)

        const validDate = isFuture(inputedDate) && !isToday(inputedDate)
        return validDate
      }
    )
  })

  const initMovingExpected = currentData.movingExpected
    ? lastDayOfMonth(new Date(currentData.movingExpected)).toISOString()
    : addDays(new Date(), 1).toISOString()

  const formik = useFormik({
    initialValues: {
      title: currentData.title ?? '',
      type: currentData.type,
      movingExpected: initMovingExpected,
      livingPeople: currentData.livingPeople ?? 1,
      livingPets: currentData.livingPets ?? 0,
      minBudget: currentData.minBudget ?? 0,
      maxBudget: currentData.maxBudget ?? 0
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: handleSubmit
  })

  const { user } = useSessionContext()

  useEffect(() => {
    const noMinimalInfo = formik.values.title === ''
    const actionInProgress = formik.isSubmitting || formik.isValidating

    const shouldEnable = !noMinimalInfo && formik.isValid && !actionInProgress

    setSubmitEnabled(shouldEnable)
  }, [formik])

  async function handleSubmit(values: Omit<CreateHuntRequestProps, 'creatorId'>) {
    if (!formik.isValid || !user) return

    const data: CreateHuntRequestProps = {
      creatorId: user.id,
      ...values
    }

    const res = await editHunt(currentData.id, data)

    if (!res) {
      onFail()
      return
    }

    onSuccess(res)
  }

  return (
    <div className="w-full flex justify-center flex-col items-center p-4 sm:px-14 sm:py-10 gap-3">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col sm:grid md:grid-cols-12 gap-x-4 gap-y-4 sm:gap-y-5"
      >
        <span className="sm:col-span-8">
          <Input
            label="Dê um título para esta mudança"
            description="Um nome para te ajudar a localizá-la depois"
            name="title"
            themeSize={formThemeSize}
            theme={themePallete}
            placeholder={`Mudança de ${new Date().getFullYear()}`}
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </span>
        <span className="sm:col-span-4">
          <DropdownSelect
            label="Tipo de busca"
            description="Apenas para aluguel? Compra?"
            name="type"
            options={[
              { value: 'buy', label: 'Compra' },
              { value: 'rent', label: 'Aluguel' },
              { value: 'either', label: 'Aluguel ou Compra' }
            ]}
            themeSize={formThemeSize}
            theme={themePallete}
            value={formik.values.type}
            onChange={formik.handleChange}
          />
        </span>
        <span className="sm:col-span-4">
          <InputPartialDate
            date={formik.values.movingExpected}
            label="Data da mudança?"
            themeSize={formThemeSize}
            theme={themePallete}
            onChange={(d: string) => formik.setFieldValue('movingExpected', d)}
          />
        </span>
        <span className="sm:col-span-4">
          <Input
            label="Quantos moradores?"
            name="livingPeople"
            type="number"
            themeSize={formThemeSize}
            theme={themePallete}
            value={formik.values.livingPeople}
            onChange={formik.handleChange}
          />
        </span>
        <span className="sm:col-span-4">
          <Input
            label="Quantos pets?"
            name="livingPets"
            type="number"
            themeSize={formThemeSize}
            theme={themePallete}
            value={formik.values.livingPets}
            onChange={formik.handleChange}
          />
        </span>
        <div className="row col-span-12">
          <div className="sm:grid sm:grid-cols-12 gap-x-4  gap-y-5">
            <span className="sm:col-span-4"></span>
            <span className="sm:col-span-4"></span>
            <div className="sm:col-span-4 cm:col-start-9 sm:col-end-13">
              <div className="flex flex-row gap-x-4 justify-end">
                <div className="grid grid-cols-2 w-full gap-x-4">
                  <span className="col-span-1">
                    <Input
                      label="Orçamento mínimo"
                      name="minBudget"
                      type="number"
                      themeSize={formThemeSize}
                      theme={themePallete}
                      value={formik.values.minBudget}
                      onChange={formik.handleChange}
                      fieldSymbol="R$"
                    />
                  </span>
                  <span className="col-span-1">
                    <Input
                      label="Orçamento máximo"
                      name="maxBudget"
                      type="number"
                      themeSize={formThemeSize}
                      theme={themePallete}
                      value={formik.values.maxBudget}
                      onChange={formik.handleChange}
                      fieldSymbol="R$"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 col-span-12 justify-center items-center pt-3 sm:pt-5">
          <SubmitButton isDisabled={!submitEnabled} label="Salvar alterações" />
        </div>
      </form>
    </div>
  )
}

export default EditHuntForm
