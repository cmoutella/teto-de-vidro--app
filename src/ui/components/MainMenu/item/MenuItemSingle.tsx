'use client'
import clsx from 'clsx'
import Link from 'next/link'

import Icon from '../../base/Icon'
import type { MenuItemSingle } from '../menu.types'

interface MenuItemSingleProps {
  item: MenuItemSingle
}

export function MenuItemSingle({ item }: MenuItemSingleProps) {
  return (
    <Link
      href={item.path}
      className={clsx('flex items-center space-x-2 px-3 py-1.5', {
        'bg-brand-primary-300 font-medium hover:cursor-default rounded':
          location.pathname === item.path,
        'hover:bg-brand-primary-200 border-r border-b border-transparent hover:border-brand-primary-400 hover:rounded-none hover:rounded-br-lg':
          location.pathname !== item.path
      })}
    >
      {item.icon && <Icon icon={item.icon} mode="mini" size="xs" />}
      <span>{item.name}</span>
    </Link>
  )
}
