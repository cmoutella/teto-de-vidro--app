import clsx from 'clsx'

export const hoverStyles = clsx(
  'hover:bg-brand-primary-200 border-r border-b border-transparent hover:border-brand-primary-400 hover:rounded-none hover:rounded-br-lg'
)

export const selectedStyles = clsx('bg-brand-primary-300 font-medium hover:cursor-default rounded')

export function menuItemStyles(path: string, pathname: string) {
  return clsx(
    'flex items-center space-x-2 px-3 py-1.5',
    pathname === path && selectedStyles,
    pathname !== path && hoverStyles
  )
}
