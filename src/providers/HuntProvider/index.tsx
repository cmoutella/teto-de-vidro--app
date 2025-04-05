'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { getAllTargetPropertiesfromHunt } from '@/requests/hunt/getAllTargetProperties'
import { getHuntById } from '@/requests/hunt/getById'
import { deleteTargetProperty } from '@/requests/targetProperty/delete'
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
  removeTargetProperty: (_t: string) => void
}

const DEFAULT_VALUES = {
  update: () => {},
  page: 1,
  setPage: (_p: number) => {},
  perPage: DEFAULT_HUNT_LIST_PER_PAGE,
  setPerPage: (_p: number) => {},
  totalPages: 1,
  properties: [],
  fetchProperties: () => {},
  removeTargetProperty: (_t: string) => {}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hunt])

  async function updateHuntView(updated?: InterfaceHunt) {
    if (!updated) {
      const updatedHunt = await getHuntById(hunt.id)

      if (updatedHunt) {
        toast.success('Hunt atualizada com sucesso!')
        setHunt(updatedHunt)
      } else {
        toast.error('Não foi possível atualizar a hunt')
      }
    } else {
      toast.success('Hunt atualizada com sucesso!')
      setHunt(updated)
    }
  }

  async function getProperties() {
    const data = await getAllTargetPropertiesfromHunt((hunt as InterfaceHunt).id, page, perPage)

    if (!data) {
      toast.error('Não foi possível trazer o alvos da busca')
    }
    if (!data || data?.length <= 0) {
      setTotalPages(0)
    }

    setProperties(data as TargetPropertyInterface[])
  }

  async function removeTargetProperty(id: string) {
    const res = await deleteTargetProperty(id)

    if (res) {
      toast.success('Alvo removido com sucesso!')
      await getProperties()
    } else {
      toast.error('Não foi possível remover o alvo')
    }
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
    fetchProperties: getProperties,
    removeTargetProperty
  }

  return <HuntContext.Provider value={value}>{children}</HuntContext.Provider>
}
