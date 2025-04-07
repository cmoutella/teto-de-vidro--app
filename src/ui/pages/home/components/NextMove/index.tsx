'use client'
import { useEffect, useState } from 'react'

import DashboardCard from '@ui/DashboardCard'
import cx from 'classnames'
import { useRouter } from 'next/navigation'

import { getAllTargetPropertiesfromHunt } from '@/requests/targetProperty/getAllTargetProperties'
import type { CONTRACT_TYPE, InterfaceHunt } from '@/types/app'
import type { TargetPropertyInterface } from '@/types/targetProperty'
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
  const [currentHunt, setCurrentHunt] = useState<InterfaceHunt | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (!currentHunt && hunts.length >= 1) {
      setCurrentHunt(hunts[0])
    }

    if (currentHunt) {
      fetchPropertiesData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHunt])

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
    if (!currentHunt) return
    setLoading(true)

    const data = await getAllTargetPropertiesfromHunt(currentHunt.id, 1, 6)

    if (!data) {
      setLoading(false)
      return
    }

    setProperties(data.list as TargetPropertyInterface[])
    setLoading(false)
  }

  // Tem hunt e tem target
  return (
    <DashboardCard>
      {loading && <Loading />}
      {!loading && hunts[0].title && (
        <h2 className="text-xl font-medium text-brand-primary-900 mb-3"># {hunts[0].title}</h2>
      )}
      <div className="w-full flex flex-col gap-0.5">
        {!loading &&
          properties.map((property) => (
            <div key={property.id} className="w-full">
              <Property target={property} huntType={(currentHunt as InterfaceHunt).type} />
            </div>
          ))}
      </div>
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

function Property({
  target,
  huntType
}: {
  target: TargetPropertyInterface
  huntType: CONTRACT_TYPE
}) {
  return (
    <div
      className={cx(
        'w-full grid grid-cols-12 gap-4 sm:gap-2',
        'border border-brand-primary-300 bg-brand-primary-100 rounded-lg px-3 py-2.5 text-brand-primary-800'
      )}
    >
      <span className="col-span-12 md:col-span-4 flex items-center">
        <h3 className="font-medium leading-none">{target.nickname}</h3>
      </span>
      {huntType !== 'buy' && (
        <span className="col-span-12 md:col-span-2 flex items-center">
          <p className="leading-none text-sm">
            <b>Total:</b> R$ {target.rentPrice}
          </p>
        </span>
      )}
      {huntType !== 'rent' && (
        <span className="col-span-12 md:col-span-2 flex items-center">
          <p className="leading-none text-sm">
            <b>Total:</b> R$ {target.rentPrice}
          </p>
        </span>
      )}
      <span className="col-span-12 md:col-span-4 flex items-center">
        <p className="leading-none text-xs md:text-sm">
          {target.neighborhood}/{target.city}
        </p>
      </span>
      <span className="col-span-12 flex items-center justify-end">
        <p className="text-xs text-right">
          Última atualização {lastUpdateMessage(target.updatedAt)}
        </p>
      </span>
    </div>
  )
}

export default NextMoveDashboard
