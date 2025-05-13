'use client'
import { useSessionContext } from '@providers/AuthProvider'
import SubmitButton from '@ui/base/form/buttons/SubmitButton'
import Input from '@ui/base/form/inputs/Input'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import { isToday } from 'date-fns'
import { isFuture } from 'date-fns/isFuture'
import { isValid } from 'date-fns/isValid'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { TargetPropertyInterface } from '@/types/targetProperty'
import { formatStringDate, formatTime } from '@/utils/string/formatDate'

interface ScheduledVisitFormProps {
  onSuccess: (_h: Partial<TargetPropertyInterface>) => void
  onFail: () => void
  submit: (_d: Partial<TargetPropertyInterface>) => Promise<unknown>
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const ScheduledVisitForm = ({ onSuccess, onFail, submit }: ScheduledVisitFormProps) => {
  const validationSchema = Yup.object({
    date: Yup.string()
      .required('Campo obrigatório')
      .max(10, 'Ops, tem algo errado nessa data')
      .min(8, 'Insira a data no formato indicado')
      .test({
        name: 'Formato de data inválido',
        test: (dateString) => {
          const [day, month, year] = dateString.split('/')

          const invalidDay = !Number(day) || Number(day) < 1 || Number(day) > 31
          const invalidMonth = !Number(month) || Number(month) < 0 || Number(month) > 11
          const invalidYear = !Number(year)

          if (!day || !month || !year || invalidDay || invalidMonth || invalidYear) {
            return false
          } else {
            return true
          }
        },
        message: 'Data inválida'
      })
      .test({
        name: 'Data no passado',
        test: (dateString) => {
          const [day, month, year] = dateString.split('/')

          if (!day || !month || !year) return false

          const inputDate = new Date(Number(year), Number(month) - 1, Number(day))

          const isValidDate = isValid(inputDate) && (isToday(inputDate) || isFuture(inputDate))
          return isValidDate
        },
        message: 'Essa data já passou'
      }),
    time: Yup.string()
      .required('Campo obrigatório')
      .max(5, 'Ops, tem algo errado com essa hora')
      .min(5, 'Insira a hora no formato indicado')
      .test({
        name: 'Formato de hora inválido',
        test: (timeString) => {
          const [hour, minutes] = timeString.split(':')

          const invalidHour = !Number(hour) || Number(hour) < 0 || Number(hour) > 23
          const invalidMinutes =
            (minutes !== '00' && !Number(minutes)) || Number(minutes) < 0 || Number(minutes) > 59

          if (hour === '' || minutes === '' || invalidHour || invalidMinutes) {
            return false
          }

          return true
        },
        message: 'Horário inválido'
      })
      .test({
        name: 'Horário no passado',
        test: (timeString) => {
          const [hour, minutes] = timeString.split(':')

          if (!hour || !minutes) {
            return false
          }

          if (formik.values.date) {
            const [day, month, year] = formik.values.date.split('/') as string[]

            if (!!day && !!month && !!year) {
              const scheduledTime = new Date(
                Number(year),
                Number(month) - 1,
                Number(day),
                Number(hour),
                Number(minutes)
              )

              const isValidDateTime: boolean = isValid(scheduledTime) && isFuture(scheduledTime)

              return isValidDateTime
            }
          }

          return true
        },
        message: 'Esse horário já passou'
      })
  })

  const formik = useFormik({
    initialValues: {
      date: '',
      time: ''
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  const { user } = useSessionContext()

  async function handleSubmit(values: { date: string; time: string }) {
    if (!formik.isValid || !user) return

    const { date, time } = values

    const [day, month, year] = date.split('/')
    const [hour, minutes] = time.split(':')
    const dateTime = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minutes)
    )
    const dateString = dateTime.toISOString()

    const data = {
      visitDate: dateString,
      isActive: true
    }

    const res = await submit(data)

    if (!res) {
      onFail()
      return
    }

    onSuccess(res)
  }

  const handleBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await formik.validateField(e.target.name)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringDate = formatStringDate(e.target.value)

    formik.setFieldValue(e.target.name, stringDate)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringDate = formatTime(e.target.value)

    formik.setFieldValue(e.target.name, stringDate)
  }

  return (
    <div className="w-full flex justify-center flex-col items-center p-2 pb-4 gap-3">
      <form onSubmit={formik.handleSubmit} className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5">
        <span className="col-span-12">
          <Input
            label="Quando será a visita?"
            name="date"
            themeSize={formThemeSize}
            theme={themePallete}
            value={formik.values.date}
            placeholder="01/01/2025"
            onChange={handleDateChange}
            onBlur={handleBlur}
            description="Insira a data no formato DD/MM/AAAA"
            error={formik.errors.date}
          />
        </span>
        <span className="col-span-12">
          <Input
            label="Horário agendado"
            name="time"
            themeSize={formThemeSize}
            theme={themePallete}
            value={formik.values.time}
            placeholder="13:00"
            onChange={handleTimeChange}
            onBlur={handleBlur}
            description="Insira a hora no formato HH:MM"
            error={formik.errors.time}
          />
        </span>

        <div className="flex flex-col gap-2 col-span-12 justify-center items-center pt-5">
          <SubmitButton isDisabled={!formik.isValid || formik.isSubmitting} label="Salvar visita" />
        </div>
      </form>
    </div>
  )
}

export default ScheduledVisitForm
