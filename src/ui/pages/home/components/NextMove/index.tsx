'use client'
import { useEffect, useState } from 'react'

import { getAllTargetPropertiesfromHunt } from '@requests/hunt/getAllTargetProperties'
import DashboardCard from '@ui/DashboardCard'
import { useRouter } from 'next/navigation'

import type { InterfaceHunt } from '@/types/app'
import { Loading } from '@/ui/components/base/Loading'
import EmptyState from '@/ui/components/EmptyState'

interface NextMoveDashboardProps {
  hunts: InterfaceHunt[]
}

const NextMoveDashboard = ({ hunts }: NextMoveDashboardProps) => {
  const [properties, setProperties] = useState<TargetPropertyInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (hunts && hunts.length >= 1) {
      fetchPropertiesData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!hunts || hunts.length <= 0) {
    return (
      <DashboardCard>
        <EmptyState
          description="Você ainda não está de olho em nenhum imóvel"
          action={{
            label: 'Começar agora!',
            do: () => router.push('/hunt/criar')
          }}
        />
      </DashboardCard>
    )
  }

  if (properties.length <= 0) {
    return (
      <DashboardCard>
        <EmptyState
          description="Inclua os imóveis que você gostou e torne essa busca mais fácil!"
          action={{
            label: 'Começar agora!',
            do: () => router.push(`hunt/${hunts[0].id}`)
          }}
        />
      </DashboardCard>
    )
  }

  async function fetchPropertiesData() {
    if (!hunts || hunts.length <= 0) return
    setLoading(true)

    const data = await getAllTargetPropertiesfromHunt(hunts[0].id, 1, 6)

    setProperties(data as TargetPropertyInterface[])
    setLoading(false)
  }

  return (
    <DashboardCard>
      {loading && <Loading />}
      {!loading && properties.map((property) => <div key={property.id}>{property.id}</div>)}
    </DashboardCard>
  )
}

export default NextMoveDashboard
