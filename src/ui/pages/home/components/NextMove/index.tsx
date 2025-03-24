'use client'
import { useEffect, useState } from 'react'

import { getAllTargetPropertiesfromHunt } from '@requests/hunt/getAllTargetProperties'
import DashboardCard from '@ui/DashboardCard'
import cx from 'classnames'
import { useRouter } from 'next/navigation'

import type { InterfaceHunt } from '@/types/app'
import Button from '@/ui/components/base/Button'
import { Loading } from '@/ui/components/base/Loading'
import EmptyState from '@/ui/components/EmptyState'
import { lastUpdateMessage } from '@/utils/string/lastUpdateMessage'

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

  // Não tem hunts
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

  // Tem hunt mas não tem targets
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

  // Tem hunt e tem target
  return (
    <DashboardCard>
      {loading && <Loading />}
      {!loading && hunts[0].title && (
        <h2 className="text-xl font-medium text-brand-primary-900 mb-3"># {hunts[0].title}</h2>
      )}
      {!loading &&
        properties.map((property) => (
          <div key={property.id} className="w-full">
            <Property target={property} />
          </div>
        ))}
      {!loading && (
        <Button
          label="Ver todos"
          className={cx('bg-brand-primary-600 hover:bg-brand-primary-700 text-white mt-4')}
          onClick={() => router.push(`hunt/${hunts[0].id}`)}
          size="large"
        />
      )}
    </DashboardCard>
  )
}

function Property({ target }: { target: TargetPropertyInterface }) {
  return (
    <div
      className={cx(
        'w-full grid grid-cols-12',
        'border border-brand-primary-300 bg-brand-primary-100 rounded-lg px-3 py-2.5 text-brand-primary-800'
      )}
    >
      <span className="col-span-4 flex items-center">
        <h3 className="font-medium leading-none">{target.nickname}</h3>
      </span>
      <span className="col-span-2 flex items-center">
        <p className="leading-none text-sm">Total: R$ {target.price}</p>
      </span>
      <span className="col-span-4 flex items-center">
        <p className="leading-none text-sm">
          {target.neighborhood}/{target.city}
        </p>
      </span>
      <span className="col-span-2 flex items-center">
        <p className="text-xs">Última atualização {lastUpdateMessage(target.updatedAt)}</p>
      </span>
    </div>
  )
}

export default NextMoveDashboard
