import type { ReactNode } from 'react'

import { formatMoneyValue } from '@/utils/string/formatMoney'

import type { FormSizes, FormTheme } from '../../../shared/formTheme'
import Input from '../../inputs/Input'

interface MoneyFieldProps {
  label: string
  name: string
  description?: string
  siblingHeight?: boolean
  theme: FormTheme
  size: FormSizes
  placeholder: string
  value: number
  onChange: (_v: number) => void
  currencySymbol: string | ReactNode
}

export function MoneyField({
  label,
  name,
  description,
  theme,
  size,
  siblingHeight,
  placeholder,
  value,
  currencySymbol,
  onChange
}: MoneyFieldProps) {
  async function handleMoneyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const moneyValue = Number(e.target.value.replace(/\D/g, ''))

    onChange(moneyValue)
  }

  return (
    <Input
      label={label}
      description={description}
      name={name}
      type="text"
      themeSize={size}
      theme={theme}
      placeholder={placeholder}
      value={formatMoneyValue(value.toString())}
      onChange={handleMoneyChange}
      fieldSymbol={currencySymbol}
      siblingHeight={siblingHeight}
    />
  )
}
