import cx from 'classnames'

import Button from '../base/Button'

interface EmptyStateProps {
  description: string
  action: {
    label: string
    do: () => void
  }
}

export default function EmptyState({ action, description }: EmptyStateProps) {
  return (
    <div
      className={cx('w-full flex flex-col justify-center items-center gap-4 gap-y-5', {
        'py-3 px-4': true,
        'py-4 px-4': false
      })}
    >
      <p className="text-xl text-brand-primary-600 font-medium">{description}</p>
      {/*  imagem aqui */}
      {action && (
        <Button
          label={action.label}
          size="large"
          className={cx('bg-brand-primary-700 text-white hover:bg-brand-primary-800')}
          onClick={action.do}
        />
      )}
    </div>
  )
}
