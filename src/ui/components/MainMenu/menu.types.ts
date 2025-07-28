import type { AvailableIcon } from '../base/Icon'

export type SubmenuItem = {
  name: string
  path: string
}

export type MenuItemSingle = {
  name: string
  icon?: AvailableIcon
  path: string
}

export type MenuItemNested = {
  name: string
  icon?: AvailableIcon
  items?: SubmenuItem[]
}

export type MenuItem = MenuItemSingle | MenuItemNested

export type Menu = MenuItem[]
