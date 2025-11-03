'use client'
import clsx from 'clsx'
import Link from 'next/link'

import Icon from '../../base/Icon'
import { hoverStyles, menuItemStyles } from '../menu.styles'
import type { MenuItemNested as MenuItem } from '../menu.types'

interface MenuItemSingleProps {
  item: MenuItem
  toggle: () => void
  isOpen: boolean
  currPath: string
}

export function MenuItemNested({ item, toggle, isOpen, currPath }: MenuItemSingleProps) {
  return (
    <div>
      <button
        onClick={() => toggle()}
        className={clsx(
          'w-full flex justify-between items-center px-3 py-1.5 rounded',
          hoverStyles,
          { hidden: !item.visible }
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
        <ul className="pl-4 mt-1 space-y-1">
          {item.items!.map((sub) => (
            <li key={sub.name}>
              <Link
                href={sub.path}
                className={clsx('block px-3 py-1', menuItemStyles(sub.path, currPath), {
                  hidden: !sub.visible
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
