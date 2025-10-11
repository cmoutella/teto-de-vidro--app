import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

import type { Option } from '@raw/Select'
import SelectRaw from '@raw/Select'
import FieldWrapper from '@raw/wrappers/Field'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import { isSameDay } from 'date-fns'
import { addDays } from 'date-fns/addDays'

interface InputFullDateProps {
  label?: string
  labelStyle?: string
  description?: string
  theme?: FormTheme
  themeSize?: FormSizes
  onChange: (_d: string) => void
  value?: string
}

const monthOptions: Option[] = [
  { label: 'Janeiro', value: '0' },
  { label: 'Fevereiro', value: '1' },
  { label: 'Março', value: '2' },
  { label: 'Abril', value: '3' },
  { label: 'Maio', value: '4' },
  { label: 'Junho', value: '5' },
  { label: 'Julho', value: '6' },
  { label: 'Agosto', value: '7' },
  { label: 'Setembro', value: '8' },
  { label: 'Outubro', value: '9' },
  { label: 'Novembro', value: '10' },
  { label: 'Dezembro', value: '11' }
]

const generateYearOptions = (): Option[] => {
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 100 // Define o intervalo de 100 anos no passado
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i)

  return years.map((year) => ({
    label: year.toString(),
    value: year.toString()
  }))
}

const generateDayOptions = (month: number, year: number): Option[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString()
  }))
}

const InputFullDate = ({
  label,
  labelStyle,
  description,
  value,
  theme = 'light',
  themeSize = 'md',
  onChange
}: InputFullDateProps) => {
  const initialDate = value ? new Date(value) : addDays(new Date(), 1)

  const [year, setYear] = useState<string | undefined>(
    initialDate.getFullYear().toString() ?? undefined
  )
  const [month, setMonth] = useState<string | undefined>(
    initialDate.getMonth().toString() ?? undefined
  )
  const [day, setDay] = useState<string | undefined>(initialDate.getDate().toString() ?? undefined)

  const [dayOptions, setDayOptions] = useState<Option[]>(
    generateDayOptions(initialDate.getMonth(), initialDate.getFullYear())
  )
  const yearOptions = generateYearOptions()

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const val = e.target.value

    setDay(val)
  }

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const val = e.target.value

    setMonth(val)
  }

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const val = e.target.value

    setYear(val)
  }

  useEffect(() => {
    if (month && year) {
      setDayOptions(generateDayOptions(Number(month), Number(year)))
    }
  }, [month, year])

  useEffect(() => {
    if (!year || !month || !day) {
      return
    }

    const date = new Date(Number(year), Number(month), Number(day))

    if (isSameDay(date, initialDate)) {
      return
    }

    onChange(date.toISOString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, day])

  return (
    <FieldWrapper
      label={label}
      labelStyle={labelStyle}
      description={description}
      theme={theme}
      themeSize={themeSize}
    >
      <span className="flex gap-2 w-full">
        <SelectRaw
          name="day"
          theme={theme}
          themeSize={themeSize}
          options={dayOptions}
          selected={day}
          onChange={handleDayChange}
        />
        <SelectRaw
          name="month"
          theme={theme}
          themeSize={themeSize}
          options={monthOptions}
          selected={month}
          onChange={handleMonthChange}
        />
        <SelectRaw
          name="year"
          theme={theme}
          themeSize={themeSize}
          options={yearOptions}
          selected={year}
          onChange={handleYearChange}
        />
      </span>
    </FieldWrapper>
  )
}

export default InputFullDate
