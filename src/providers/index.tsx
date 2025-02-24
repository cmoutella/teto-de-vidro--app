/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import { createContext, useContext } from 'react'

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

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AllContext.Provider value={{}}>
      <UIProvider>
        <SessionProvider>{children}</SessionProvider>
      </UIProvider>
    </AllContext.Provider>
  )
}
