import type { AvailableIcon } from '../base/Icon'

export type MenuItemSingle = {
  name: string
  icon?: AvailableIcon
  path: string
  visible: boolean
}

export type MenuItemNested = {
  name: string
  icon?: AvailableIcon
  items?: MenuItemSingle[]
  visible: boolean
}

export type MenuItem = MenuItemSingle | MenuItemNested

export type Menu = MenuItem[]
