import { appCookies } from '@/config/cookies'
import type { AuthData } from '@/types/apiResponses'

import { cookie } from './cookies'

function authStorage() {
  const cookies = cookie()

  const getToken: () => AuthData = () => {
    const app = cookies.client.get(appCookies.auth)

    if (app) {
      return JSON.parse(app)
    }

    return undefined
  }

  const setToken = (payload: AuthData) => {
    cookies.client.set(appCookies.auth, JSON.stringify(payload), new Date(payload.expireAt))
  }

  const clearToken = () => {
    cookies.client.remove(appCookies.auth)
  }

  const hasToken = () => {
    const appCookies = getToken()
    if (!appCookies) return false

    const app = appCookies.token

    return !!app
  }

  return {
    getToken,
    setToken,
    clearToken,
    hasToken
  }
}

export default authStorage
