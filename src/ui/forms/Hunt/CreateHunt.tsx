'use client'
import { useSessionContext } from '@providers/AuthProvider'
import SubmitButton from '@ui/base/form/buttons/SubmitButton'
import Input from '@ui/base/form/inputs/Input'
import InputPartialDate from '@ui/base/form/inputs/InputPartialDate'
import DropdownSelect from '@ui/base/form/selects/DropdownSelect'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import { addDays, isToday } from 'date-fns'
import { isFuture } from 'date-fns/isFuture'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { CreateHuntRequestProps } from '@/requests/client/hunt/create'
import { createHunt } from '@/requests/client/hunt/create'

interface CreateHuntFormProps {
  onSuccess: (_id: string) => void
  onFail: () => void
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const CreateHuntForm = ({ onSuccess, onFail }: CreateHuntFormProps) => {
  const validationSchema = Yup.object({
    type: Yup.string().required(),
    movingExpected: Yup.string().test(
      'A expectativa de mudança deve ser uma data no futuro',
      (value) => {
        if (!value) {
          // Retorna verdadeiro para ignorar a validação quando o valor está ausente
          return true
        }

        const inputedDate = new Date(value)

        const validDate = isFuture(inputedDate) && !isToday(inputedDate)
        return validDate
      }
    )
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      type: 'either',
      movingExpected: addDays(new Date(), 1).toISOString(),
      livingPeople: 1,
      livingPets: 0,
      minBudget: 0,
      maxBudget: 0
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: handleSubmit
  })

  const { user } = useSessionContext()

  async function handleSubmit(values: Omit<CreateHuntRequestProps, 'creatorId' | 'huntUsers'>) {
    if (!formik.isValid || !user) return

    const data: CreateHuntRequestProps = {
      creatorId: user.id,
      ...values
    }

    const res = await createHunt(data)

    if (!res) {
      onFail()
      return
    }

    onSuccess(res?.id)
  }

  return (
    <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
      <form onSubmit={formik.handleSubmit} className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5">
        <span className="col-span-8">
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
        <span className="col-span-4">
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
        <span className="col-span-4">
          <InputPartialDate
            date={formik.values.movingExpected}
            label="Data da mudança?"
            themeSize={formThemeSize}
            theme={themePallete}
            onChange={(d: string) => formik.setFieldValue('movingExpected', d)}
          />
        </span>
        <span className="col-span-4">
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
        <span className="col-span-4">
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
          <div className="grid grid-cols-12 gap-x-4  gap-y-5">
            <span className="col-span-4"></span>
            <span className="col-span-4"></span>
            <div className="col-span-4 col-start-9 col-end-13">
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

        <div className="flex flex-col gap-2 col-span-12 justify-center items-center pt-5">
          <span className="text-brand-gray-700 text-xs pb-2">Você pode alterar depois</span>
          <SubmitButton isDisabled={!formik.isValid || formik.isSubmitting} label="Criar" />
        </div>
      </form>
    </div>
  )
}

export default CreateHuntForm
