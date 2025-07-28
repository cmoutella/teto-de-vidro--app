import type { Menu } from './menu.types'

export const MENU_LIST: Menu = [
  {
    name: 'Início',
    path: '/'
  },
  {
    name: 'Histórico',
    items: [
      {
        name: 'Todas',
        path: '/hunt/todas'
      }
    ]
  }
]
