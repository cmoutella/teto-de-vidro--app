import Button from '@ui/base/Button'
import cx from 'classnames'

interface SubmitButtonProps {
  isDisabled: boolean
  label: string
  fullWidth?: boolean
  noWrap?: boolean
}

function SubmitButton({ isDisabled, label, fullWidth = false, noWrap = false }: SubmitButtonProps) {
  return (
    <Button
      label={label}
      className={cx(
        'text-white',
        {
          'hover:bg-brand-primary-800 bg-brand-primary-700': !isDisabled,
          'bg-brand-gray-100 disabled:bg-brand-gray-100': isDisabled
        },
        {
          'whitespace-nowrap': noWrap,
          'min-w-36 w-2/6 max-w-56': !noWrap
        }
      )}
      type="submit"
      size="xxlarge"
      disabled={isDisabled}
      fullWidth={fullWidth}
    />
  )
}

export default SubmitButton
