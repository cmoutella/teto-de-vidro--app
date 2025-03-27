'use client'
import { createContext, useContext, useEffect, useState } from 'react'

import { getAllTargetPropertiesfromHunt } from '@/requests/hunt/getAllTargetProperties'
import { getHuntById } from '@/requests/hunt/getById'
import type { InterfaceHunt } from '@/types/app'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import { DEFAULT_HUNT_LIST_PER_PAGE } from '@/ui/pages/hunt/consts/perPage'

interface HuntContext {
  update: (_h?: InterfaceHunt) => void
  hunt?: InterfaceHunt
  page: number
  setPage: (_p: number) => void
  perPage: number
  setPerPage: (_p: number) => void
  totalPages: number
  properties: TargetPropertyInterface[]
  fetchProperties: () => void
}

const DEFAULT_VALUES = {
  update: () => {},
  page: 1,
  setPage: (_p: number) => {},
  perPage: DEFAULT_HUNT_LIST_PER_PAGE,
  setPerPage: (_p: number) => {},
  totalPages: 1,
  properties: [],
  fetchProperties: () => {}
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
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [perPage, setPerPage] = useState<number>(DEFAULT_HUNT_LIST_PER_PAGE)
  const [properties, setProperties] = useState<TargetPropertyInterface[]>([])

  const [hunt, setHunt] = useState<InterfaceHunt>(initialHuntData)

  useEffect(() => {
    if (hunt) {
      getProperties()
    }
  }, [hunt])

  async function updateHuntView(updated?: InterfaceHunt) {
    if (!updated) {
      const updatedHunt = await getHuntById(hunt.id)

      if (updatedHunt) {
        setHunt(updatedHunt)
      }
    } else {
      setHunt(updated)
    }
  }

  async function getProperties() {
    const data = await getAllTargetPropertiesfromHunt((hunt as InterfaceHunt).id, page, perPage)

    if (!data || data.length <= 0) {
      // TODO: tooltip de feedback
      setTotalPages(0)
    }

    setProperties(data as TargetPropertyInterface[])
  }

  const value = {
    update: updateHuntView,
    hunt: hunt,
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
    properties,
    fetchProperties: getProperties
  }

  return <HuntContext.Provider value={value}>{children}</HuntContext.Provider>
}
