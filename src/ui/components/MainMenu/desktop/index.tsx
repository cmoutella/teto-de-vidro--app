import { cookies } from 'next/headers'

import { appCookies } from '@/config/cookies'
import { authenticateApp } from '@/requests/server/app/authenticateApp'
import { getCurrentHunt } from '@/requests/server/hunt/getActiveHunt'
import type { AppAuthData } from '@/types/apiResponses'
import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

import type { Menu } from '../menu.types'
import { MenuDesktop } from './desktop'

export async function ServerMenuDesktop() {
  const userLoggedIn = await isUserAuthenticated()

  let appAuthToken

  const reqCookies = cookies()
  const appAuthCookie = reqCookies.get(appCookies.app)

  if (!appAuthCookie) {
    appAuthToken = await authenticateApp()
  }

  const appCookieData: AppAuthData = appAuthCookie ? JSON.parse(appAuthCookie.value) : appAuthToken

  const currentHunt = await getCurrentHunt({
    userToken: userLoggedIn?.token,
    appToken: appCookieData.token
  })

  const menuList: Menu = [
    {
      name: 'Início',
      path: '/',
      visible: true
    },
    {
      name: 'Histórico',
      visible: true,
      items: [
        {
          name: 'Atual',
          path: `/hunt/${currentHunt?.id}`,
          visible: !!currentHunt
        },
        {
          name: 'Todas',
          path: '/hunt/todas',
          visible: true
        }
      ]
    }
  ]

  return (
    <aside className="w-full h-full bg-brand-primary-100 border-r border-brand-primary-200 text-brand-primary-900 p-4 overflow-y-auto grid grid-cols-1 grid-rows-12">
      <MenuDesktop menu={menuList} />
    </aside>
  )
}
