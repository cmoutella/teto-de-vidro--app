'use client'
import { useEffect, useMemo, useState } from 'react'

import DashboardCard from '@ui/DashboardCard'
import cx from 'classnames'
import { useRouter } from 'next/navigation'

import movingTruckImg from '@/assets/images/moving-truck.png'
import approvedPropertyImg from '@/assets/images/property-approved.png'
import { getAllTargetPropertiesfromHunt } from '@/requests/client/targetProperty/getAllTargetProperties'
import type { CONTRACT_TYPE, InterfaceHunt } from '@/types/hunt'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import Button from '@/ui/components/base/Button'
import EmptyState from '@/ui/components/EmptyState'
import { lastUpdateMessage } from '@/utils/string/formatLastUpdateMessage'

interface NextMoveDashboardProps {
  hunts: InterfaceHunt[]
}

const NextMoveDashboard = ({ hunts }: NextMoveDashboardProps) => {
  const [properties, setProperties] = useState<TargetPropertyInterface[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const currentHunt = useMemo(() => hunts[0] ?? undefined, [hunts])

  const router = useRouter()

  useEffect(() => {
    if (currentHunt) {
      fetchPropertiesData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHunt])

  // Não tem hunts
  if (!currentHunt) {
    return (
      <DashboardCard>
        <EmptyState
          description="Comece a organizar a sua próxima mudança"
          image={{ src: movingTruckImg, alt: 'Um caminhão de mudanças com algumas caixas' }}
          action={{
            label: 'Começar agora!',
            do: () => router.push('/hunt/criar')
          }}
        />
      </DashboardCard>
    )
  }

  if (loading) {
    return (
      <DashboardCard>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <div className="w-full rounded-md p-3 pb-5 sm:px-4 bg-brand-primary-100 border border-brand-primary-300 animate-pulse">
            <div className="w-3/4 md:w-2/3 h-4 rounded-sm bg-brand-primary-300 opacity-70"></div>
          </div>
          <div
            className="w-full rounded-md p-3 pb-5 sm:px-4  bg-brand-primary-100 border border-brand-primary-300 animate-pulse"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="w-3/4 md:w-2/3 h-4 rounded-sm bg-brand-primary-300 opacity-70"></div>
          </div>
          <div
            className="w-full rounded-md p-3 pb-5 sm:px-4 bg-brand-primary-100 border border-brand-primary-300 animate-pulse"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="w-3/4 md:w-2/3 h-4 rounded-sm bg-brand-primary-300 opacity-70"></div>
          </div>
        </div>
      </DashboardCard>
    )
  }

  // Tem hunt mas não tem targets
  if (properties.length <= 0) {
    return (
      <DashboardCard>
        <EmptyState
          description="Já está de olho em algum imóvel? Traga sua organização pra cá!"
          image={{ src: approvedPropertyImg, alt: 'Uma casa agradável com um símbolo de aprovado' }}
          action={{
            label: 'Começar agora!',
            do: () => router.push(`hunt/${hunts[0].id}`)
          }}
        />
      </DashboardCard>
    )
  }

  async function fetchPropertiesData() {
    setLoading(true)

    const data = await getAllTargetPropertiesfromHunt(currentHunt!.id, 1, 6)

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
      {hunts[0].title && (
        <h2 className="text-xl font-medium text-brand-primary-900 mb-3"># {hunts[0].title}</h2>
      )}
      <div className="w-full flex flex-col gap-0.5">
        {properties.map((property) => (
          <div key={property.id} className="w-full">
            <Property target={property} huntType={(currentHunt as InterfaceHunt).type} />
          </div>
        ))}
      </div>
      <Button
        label="Ver tudo"
        className={cx('bg-brand-primary-600 hover:bg-brand-primary-700 text-white mt-4')}
        onClick={() => router.push(`hunt/${hunts[0].id}`)}
        size="large"
      />
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
