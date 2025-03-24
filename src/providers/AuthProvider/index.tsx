'use client'
import { createContext, useContext, useMemo, useState } from 'react'

import { authLogin } from '@requests/auth/login'
import { useRouter } from 'next/navigation'

import { getUserFn, handleUserResponse } from '@/services/auth'
import storage from '@/services/storage'
import type { UserAuth } from '@/types/apiResponses'
import type { SessionUser } from '@/types/app'

interface SessionContext {
  user?: SessionUser
  isLogged: boolean
  authenticate: (_token: UserAuth) => void
  login: (_username: string, _password: string) => void
  logout: () => void
}

const DEFAULT_VALUES = {
  user: getUserFn(),
  isLogged: storage().hasToken(),
  login: (_u: string, _p: string) => {},
  logout: () => {},
  authenticate: () => {}
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
  const router = useRouter()

  const authStorage = storage()

  const login = async (email: string, password: string) => {
    const auth = await authLogin(email, password)

    if (!auth) return

    await handleUserResponse(auth).then((res) => {
      setUser(res)
      router.push('/')
    })
  }

  const logout = () => {
    setUser(undefined)
    authStorage.clearToken()
  }

  const authenticate = () => {
    if (user) return

    handleUserResponse()
      .then((user) => {
        setUser(user)
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

  // TODO: esse nao ta rolando, pq?
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isLogged = useMemo(() => user !== undefined && authStorage.hasToken(), [user])

  const value = {
    user,
    isLogged,
    login,
    logout,
    authenticate
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
