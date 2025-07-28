'use client'
import { useState } from 'react'

import { MenuItemNested } from './item/MenuItemNested'
import { MenuItemSingle } from './item/MenuItemSingle'
import { MENU_LIST } from './menu.config'
import type {
  MenuItemNested as ItemNested,
  MenuItemSingle as ItemSingle,
  MenuItem
} from './menu.types'

export function MenuDesktop() {
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const toggle = (name: string) => {
    setOpen((prev) => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const isNested = (item: MenuItem) =>
    !!(item as ItemNested).items && Array.isArray((item as ItemNested).items)

  return (
    <aside className="w-full h-full bg-brand-primary-100 border-r border-brand-primary-200 text-brand-primary-900 p-4 space-y-1.5 overflow-y-auto grid grid-cols-1 grid-rows-12">
      <div className="row-span-10 w-full">
        {MENU_LIST.map((item: MenuItem) => {
          const key = item.name
          if (isNested(item)) {
            return (
              <MenuItemNested
                key={key}
                item={item as ItemNested}
                toggle={() => toggle(key)}
                isOpen={open[key]}
              />
            )
          }

          return <MenuItemSingle key={key} item={item as ItemSingle} />
        })}
      </div>
    </aside>
  )
}
