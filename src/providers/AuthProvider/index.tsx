'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import { authLogin } from '@/requests/client/auth/login'
import { validateAuthentication } from '@/requests/client/auth/validateAuth'
import { getUserPermissionsRequest } from '@/requests/client/user/getUserPermissionsRequest'
import { getUserFn } from '@/services/auth'
import storage from '@/services/storage'
import type { AuthData } from '@/types/apiResponses'
import type { SessionUser } from '@/types/user'

interface SessionContext {
  user?: SessionUser
  isLogged: boolean
  authenticate: (_token: AuthData) => void
  updatePermissions: () => Promise<void>
  login: (_username: string, _password: string) => void
  logout: () => void
}

const DEFAULT_VALUES = {
  user: getUserFn(),
  isLogged: storage().hasToken(),
  login: (_u: string, _p: string) => {},
  logout: () => {},
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

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SessionUser>(DEFAULT_VALUES.user)
  const [tryData, setTryData] = useState<boolean>(true)

  const router = useRouter()

  const authStorage = storage()

  async function init() {
    await authenticate()
  }

  useEffect(() => {
    if (!user && tryData) {
      init()
    }
    setTryData(false)
  }, [user, tryData])

  const login = async (email: string, password: string) => {
    const auth = await authLogin(email, password)

    if (!auth) return

    await validateAuthentication().then(async () => {
      const permissions = await getPermissions(auth.user.id)
      const data = { ...user, permissions } as SessionUser

      setUser(data)
      window.location.reload()
    })
  }

  const logout = () => {
    setUser(undefined)
    authStorage.clearToken()
    router.push('/')
  }

  const authenticate = () => {
    if (user) return

    validateAuthentication()
      .then((res) => {
        if (!user) {
          setUser(res)
        }
      })
      .catch((_err) => {
        // showToast({
        //   type: "error",
        //   message: "Não foi possivel realizar o login tente mais tarde",
        // });
        setTimeout(() => {
          router.push('/login')
        }, 3000)
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

  // TODO: esse nao ta rolando, pq?
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isLogged = useMemo(() => user !== undefined && authStorage.hasToken(), [user])

  const value = {
    user,
    isLogged,
    login,
    logout,
    authenticate,
    updatePermissions
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
