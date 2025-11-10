'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { deleteTargetProperty } from '@/requests/client/targetProperty/delete'
import { getAllTargetPropertiesfromHunt } from '@/requests/client/targetProperty/getAllTargetProperties'
import { getUserPermissionsRequest } from '@/requests/client/user/getUserPermissionsRequest'
import { getHuntById } from '@/requests/server/hunt/getById'
import { getHuntParticipants } from '@/requests/server/hunt/getHuntParticipants'
import type { HuntParticipant, HuntPermissions, InterfaceHunt } from '@/types/hunt'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import { DEFAULT_HUNT_LIST_PER_PAGE } from '@/ui/pages/hunt/consts/perPage'

type PageConfig = {
  current: number
  total: number
  perPage: number
  setPage: (_p: number) => void
  setPerPage: (_p: number) => void
  nextPage: () => void
  prevPage: () => void
  firstPage: () => void
  lastPage: () => void
  isFirstPage: boolean
  isLastPage: boolean
}

interface HuntContext {
  update: (_h?: InterfaceHunt) => void
  hunt?: InterfaceHunt
  participants: HuntParticipant[]
  participantsLoading: boolean
  page: PageConfig
  properties: TargetPropertyInterface[]
  propertiesLoading: boolean
  fetchProperties: () => void
  removeTargetProperty: (_t: string) => Promise<boolean>
  permissions: HuntPermissions
  targetsLeft: number
}

const DEFAULT_VALUES: HuntContext = {
  update: () => {},
  page: {
    current: 1,
    total: 1,
    isFirstPage: true,
    isLastPage: false,
    perPage: DEFAULT_HUNT_LIST_PER_PAGE,
    setPage: (_p: number) => {},
    setPerPage: (_p: number) => {},
    nextPage: () => {},
    prevPage: () => {},
    firstPage: () => {},
    lastPage: () => {}
  },
  participants: [],
  participantsLoading: true,
  properties: [],
  propertiesLoading: true,
  fetchProperties: () => {},
  removeTargetProperty: async (_t: string) => {
    return false
  },
  permissions: {
    maxTargets: 0
  },
  targetsLeft: 0
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
  const [page, setPage] = useState<number>(DEFAULT_VALUES.page.current)
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_VALUES.page.total)
  const [perPage, setPerPage] = useState<number>(DEFAULT_VALUES.page.perPage)
  const [totalItems, setTotalItems] = useState<number>(0)

  const [hunt, setHunt] = useState<InterfaceHunt>(initialHuntData)

  const [participants, setParticipants] = useState<HuntParticipant[]>(DEFAULT_VALUES.participants)
  const [participantsLoading, setParticipantsLoading] = useState<boolean>(
    DEFAULT_VALUES.participantsLoading
  )

  const [properties, setProperties] = useState<TargetPropertyInterface[]>(DEFAULT_VALUES.properties)
  const [propertiesLoading, setPropertiesLoading] = useState<boolean>(
    DEFAULT_VALUES.propertiesLoading
  )
  const [permissions, setPermissions] = useState<HuntPermissions>(DEFAULT_VALUES.permissions)

  const targetAvailableLimit = useMemo(() => {
    return permissions.maxTargets - totalItems
  }, [permissions, totalItems])

  useEffect(() => {
    if (participants.length <= 0) {
      getParticipants()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (hunt) {
      getProperties()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hunt, page])

  async function updateHuntView(updated?: InterfaceHunt) {
    if (!updated) {
      const updatedHunt = await getHuntById(hunt.id)

      if (updatedHunt) {
        setHunt(updatedHunt)
      } else {
        toast.error('Não foi possível atualizar a hunt')
      }
    } else {
      setHunt(updated)
    }
  }

  async function getParticipants() {
    setParticipantsLoading(true)
    try {
      const participants = await getHuntParticipants(hunt.id)

      setParticipants(participants ?? [])
    } catch {
      setParticipants([])
    } finally {
      setParticipantsLoading(false)
    }
  }

  async function getPermissions() {
    const ownerPermissions = await getUserPermissionsRequest(initialHuntData.creatorId)

    if (!ownerPermissions) return

    setPermissions({ maxTargets: ownerPermissions.targetsPerHuntLimit })
  }

  async function getProperties() {
    setPropertiesLoading(true)
    const data = await getAllTargetPropertiesfromHunt((hunt as InterfaceHunt).id, page, perPage)

    if (!data) {
      toast.error('Não foi possível trazer o alvos da busca')
    }

    if (!data || data?.list.length <= 0) {
      setTotalPages(0)
      setTotalItems(0)
    } else {
      setProperties(data.list as TargetPropertyInterface[])
      setTotalPages(data.totalPages)
      setTotalItems(data.totalItems)
    }
    setPropertiesLoading(false)
  }

  async function removeTargetProperty(id: string) {
    const res = await deleteTargetProperty(id)

    if (res) {
      await getProperties()
    }

    return !!res
  }

  function handleNextPage() {
    setPage(page + 1)
  }
  function handlePrevPage() {
    setPage(page + 1)
  }

  const value: HuntContext = {
    update: updateHuntView,
    hunt: hunt,
    page: {
      current: page,
      total: totalPages,
      perPage: perPage,
      setPage: setPage,
      setPerPage: setPerPage,
      nextPage: handleNextPage,
      prevPage: handlePrevPage,
      firstPage: () => setPage(1),
      lastPage: () => setPage(totalPages),
      isFirstPage: page === 1,
      isLastPage: page === totalPages
    },
    properties,
    propertiesLoading,
    participants,
    participantsLoading,
    permissions,
    targetsLeft: targetAvailableLimit,
    fetchProperties: getProperties,
    removeTargetProperty
  }

  return <HuntContext.Provider value={value}>{children}</HuntContext.Provider>
}
