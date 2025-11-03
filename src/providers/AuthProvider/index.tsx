'use client'
import { createContext, useContext, useEffect, useState } from 'react'

import { authLogin } from '@/requests/client/auth/login'
import { authLogout } from '@/requests/client/auth/logout'
import { validateAuthentication } from '@/requests/client/auth/validateAuth'
import { getUserPermissionsRequest } from '@/requests/client/user/getUserPermissionsRequest'
import type { UserAuthData } from '@/types/apiResponses'
import type { SessionUser } from '@/types/user'

interface SessionContext {
  user?: SessionUser
  authenticate: (_token: UserAuthData) => void
  updatePermissions: () => Promise<void>
  login: (_username: string, _password: string) => void
  logout: () => Promise<void>
}

const DEFAULT_VALUES = {
  user: undefined,
  login: (_u: string, _p: string) => {},
  logout: async () => {},
  authenticate: () => {},
  updatePermissions: async () => {}
}

const SessionContext = createContext<SessionContext>(DEFAULT_VALUES)

export const useSessionContext = () => {
  const context = useContext(SessionContext)

  if (context === undefined) {
    throw new Error('Missing SessionContext on React three')
  }

  return context
}

export const SessionProvider = ({
  children,
  currUser
}: {
  children: React.ReactNode
  currUser?: SessionUser
}) => {
  const [user, setUser] = useState<SessionUser>(currUser)
  const [tryData, setTryData] = useState<boolean>(true)

  async function init() {
    await authenticate()
  }

  useEffect(() => {
    if (!user && tryData) {
      init()
      setTryData(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const login = async (email: string, password: string) => {
    const auth = await authLogin(email, password)

    if (!auth) return

    await validateAuthentication().then(async (res) => {
      setUser(res)
      window.location.reload()
    })
  }

  async function logout() {
    const exit = await authLogout()

    if (exit) {
      setUser(undefined)
      window.location.reload()
    }
  }

  const authenticate = () => {
    if (user) return

    validateAuthentication().then((res) => {
      if (!user) {
        setUser(res)
      }
    })
  }

  async function getPermissions(userId: string) {
    const permissions = await getUserPermissionsRequest(userId)

    if (!permissions) return

    return permissions
  }

  async function updatePermissions() {
    if (!user) return
    const permissions = await getPermissions(user.id)

    if (!permissions) return

    setUser({ ...user, permissions })
  }

  const value = {
    user,
    login,
    logout,
    authenticate,
    updatePermissions
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
