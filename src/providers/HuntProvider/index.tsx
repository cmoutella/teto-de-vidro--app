'use client'
import { createContext, useContext, useState } from 'react'

import { getHuntById } from '@/requests/hunt/getById'
import type { InterfaceHunt } from '@/types/app'

interface HuntContext {
  update: () => void
  hunt?: InterfaceHunt
}

const DEFAULT_VALUES = {
  update: () => {}
}

const HuntContext = createContext<HuntContext>(DEFAULT_VALUES)

export const useHuntContext = () => {
  const context = useContext(HuntContext)

  if (context === undefined) {
    throw new Error('Missing HuntContext on React three')
  }

  return context
}

export const HuntProvider = ({
  initialHuntData,
  children
}: {
  initialHuntData: InterfaceHunt
  children: React.ReactNode
}) => {
  const [hunt, setHunt] = useState<InterfaceHunt>(initialHuntData)

  async function updateHuntView() {
    const updatedHunt = await getHuntById(hunt.id)

    if (updatedHunt) {
      setHunt(updatedHunt)
    }
  }

  // TODO: esse nao ta rolando, pq?
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const value = {
    update: updateHuntView,
    hunt: hunt
  }

  return <HuntContext.Provider value={value}>{children}</HuntContext.Provider>
}
