'use client'
import clsx from 'clsx'
import Link from 'next/link'

import Icon from '../../base/Icon'
import type { MenuItemNested as MenuItem } from '../menu.types'

interface MenuItemSingleProps {
  item: MenuItem
  toggle: () => void
  isOpen: boolean
}

export function MenuItemNested({ item, toggle, isOpen }: MenuItemSingleProps) {
  return (
    <div>
      <button
        onClick={() => toggle()}
        className={clsx(
          'w-full flex justify-between items-center px-3 py-1.5 rounded border-r border-b border-transparent',
          'hover:bg-brand-primary-200 hover:border-brand-primary-400 hover:rounded-none hover:rounded-br-lg'
        )}
      >
        <div className="flex items-center space-x-2">
          {item.icon && (
            <span>
              <Icon icon={item.icon} mode="mini" />
            </span>
          )}
          <span>{item.name}</span>
        </div>
        <span className="text-sm">
          {isOpen ? (
            <Icon icon="chevron-up" mode="mini" />
          ) : (
            <Icon icon="chevron-down" mode="mini" />
          )}
        </span>
      </button>
      {isOpen && (
        <ul className="pl-6 mt-1 space-y-1">
          {item.items!.map((sub) => (
            <li key={sub.name}>
              <Link
                href={sub.path}
                className={clsx('block px-3 py-1', {
                  'bg-brand-primary-300 font-medium hover:cursor-default rounded':
                    location.pathname === sub.path,
                  'hover:bg-brand-primary-200 border-r border-b border-transparent hover:border-brand-primary-400 hover:rounded-none hover:rounded-br-lg':
                    location.pathname !== sub.path
                })}
              >
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
