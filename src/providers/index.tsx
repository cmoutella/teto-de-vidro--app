'use client'
import { createContext, useContext } from 'react'

import type { SessionUser } from '@/types/user'

import { SessionProvider } from './AuthProvider'
import { UIProvider } from './UIProvider'

interface AllContext {}

const AllContext = createContext<AllContext>({})

export const useAllContext = () => {
  const context = useContext(AllContext)

  if (context === undefined) {
    throw new Error('Missing AllContext on React three')
  }

  return context
}

export const AllProviders = ({
  children,
  user
}: {
  children: React.ReactNode
  user?: SessionUser
}) => {
  return (
    <AllContext.Provider value={{}}>
      <UIProvider>
        <SessionProvider currUser={user}>{children}</SessionProvider>
      </UIProvider>
    </AllContext.Provider>
  )
}
