import Button from '@ui/base/Button'
import cx from 'classnames'

interface SubmitButtonProps {
  isDisabled: boolean
  label: string
}

function SubmitButton({ isDisabled, label }: SubmitButtonProps) {
  return (
    <Button
      label={label}
      className={cx('min-w-36 w-1/6  text-white', {
        'hover:bg-brand-primary-800 bg-brand-primary-700': !isDisabled,
        'bg-brand-gray-500 disabled:bg-brand-gray-500': isDisabled
      })}
      type="submit"
      size="xxlarge"
      disabled={isDisabled}
    />
  )
}

export default SubmitButton
