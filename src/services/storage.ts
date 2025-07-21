import { appCokies } from '@/config/cookies'
import type { AuthData } from '@/types/apiResponses'

import { cookie } from './cookies'

function authStorage() {
  const cookies = cookie()

  const getToken: () => AuthData = () => {
    const app = cookies.client.get(appCokies.auth)

    if (app) {
      return JSON.parse(app)
    }

    return undefined
  }

  const setToken = (payload: AuthData) => {
    cookies.client.set(appCokies.auth, JSON.stringify(payload), new Date(payload.expireAt))
  }

  const clearToken = () => {
    cookies.client.remove(appCokies.auth)
  }

  const hasToken = () => {
    const appCokies = getToken()
    if (!appCokies) return false

    const app = appCokies.token

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
