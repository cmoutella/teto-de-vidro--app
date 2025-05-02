import cx from 'classnames'

export function BudgetDiff({ diff }: { diff: number }) {
  const baseStyles = 'text-xs font-medium absolute -top-2 -right-4 tracking-wider'

  if (diff > 0) {
    return <span className={cx('text-red-800', baseStyles)}>+{diff.toFixed(1)}%</span>
  }

  return <span className={cx('text-green-800', baseStyles)}>{diff.toFixed(1)}%</span>
}
