import type { FormSizes, FormTheme } from '../../../shared/formTheme'
import Input from '../../inputs/Input'

interface CEPFieldProps {
  size: FormSizes
  theme: FormTheme
  value: string
  onChange: (_v: string) => void
  onBlur?: (_e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
}

export function CEPField({ size, theme, value, onChange, onBlur, error }: CEPFieldProps) {
  async function handleCEPChange(e: React.ChangeEvent<HTMLInputElement>) {
    let postalCode = e.target.value.replace(/\D/g, '')

    if (postalCode.length > 5) {
      postalCode = postalCode.slice(0, 5) + '-' + postalCode.slice(5, 8)
    }

    onChange(postalCode.slice(0, 9)) // Limita a 9 caracteres
  }

  return (
    <Input
      label="CEP"
      name="postalCode"
      themeSize={size}
      theme={theme}
      placeholder="00000-000"
      value={value}
      onChange={handleCEPChange}
      onBlur={onBlur}
      error={error}
    />
  )
}
