import clsx from 'clsx'
import Link from 'next/link'

import Icon from '../../base/Icon'
import { menuItemStyles } from '../menu.styles'
import type { MenuItemSingle } from '../menu.types'

interface MenuItemSingleProps {
  item: MenuItemSingle
  currPath: string
}

export function MenuItemSingle({ item, currPath }: MenuItemSingleProps) {
  return (
    <Link
      href={item.path}
      className={clsx(
        'flex items-center space-x-2 px-3 py-1.5',
        menuItemStyles(item.path, currPath),
        { hidden: !item.visible }
      )}
    >
      {item.icon && <Icon icon={item.icon} mode="mini" size="xs" />}
      <span>{item.name}</span>
    </Link>
  )
}
