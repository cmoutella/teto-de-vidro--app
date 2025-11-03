'use client'
import { useState } from 'react'

import { usePathname } from 'next/navigation'

import { MenuItemNested } from '../item/MenuItemNested'
import { MenuItemSingle } from '../item/MenuItemSingle'
import type {
  MenuItemNested as ItemNested,
  MenuItemSingle as ItemSingle,
  Menu,
  MenuItem
} from '../menu.types'

interface MenuDesktopProps {
  menu: Menu
}

export function MenuDesktop({ menu }: MenuDesktopProps) {
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const pathname = usePathname()

  const toggle = (name: string) => {
    setOpen((prev) => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const isNested = (item: MenuItem) =>
    !!(item as ItemNested).items && Array.isArray((item as ItemNested).items)

  return (
    <div className="row-span-10 w-full space-y-1.5">
      {menu.map((item: MenuItem) => {
        const key = item.name
        if (isNested(item)) {
          return (
            <MenuItemNested
              key={key}
              item={item as ItemNested}
              toggle={() => toggle(key)}
              isOpen={open[key]}
              currPath={pathname}
            />
          )
        }

        return <MenuItemSingle key={key} currPath={pathname} item={item as ItemSingle} />
      })}
    </div>
  )
}
