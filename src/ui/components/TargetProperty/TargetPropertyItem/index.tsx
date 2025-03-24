import cx from 'classnames'

interface TargetPropertyItemProps {
  target: TargetPropertyInterface
}

export default function TargetPropertyItem({ target }: TargetPropertyItemProps) {
  return (
    <div
      className={cx(
        'w-full',
        'border border-brand-primary-500 bg-brand-primary-300 rounded-lg px-3 py-2'
      )}
    >
      <h3>{target.nickname}</h3>
    </div>
  )
}
