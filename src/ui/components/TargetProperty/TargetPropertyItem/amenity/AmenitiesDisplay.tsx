import toast from 'react-hot-toast'

import cx from 'classnames'

import { useSessionContext } from '@/providers/AuthProvider'
import { useHuntContext } from '@/providers/HuntProvider'
import { useUIContext } from '@/providers/UIProvider'
import type { TargetAmenity } from '@/types/targetProperty'
import Button from '@/ui/components/base/Button'
import Icon from '@/ui/components/base/Icon'
import AddAmenityToTargetForm from '@/ui/forms/TargetProperty/AddAmenity'

import {
  AmenityPill,
  hoverLotAmenity,
  hoverOtherAmenity,
  hoverPropertyAmenity,
  lotAmenityBorderColor,
  otherAmenityBorderColor,
  propertyAmenityBorderColor
} from './AmenityPill'

interface AmenitiesDisplayProps {
  amenities: TargetAmenity[]
  targetId: string
}

export function AmenitiesDisplay({ amenities, targetId }: AmenitiesDisplayProps) {
  const { modal } = useUIContext()
  const { fetchProperties } = useHuntContext()

  const { user } = useSessionContext()

  function openAddAmenityModal() {
    function handleFail() {
      toast.error('Algo deu errado')
      modal.close()
    }

    function handleSuccess() {
      modal.close()
      toast.success('Informações atualizadas com sucesso!')

      fetchProperties()
    }

    modal.open(
      'medium',
      <AddAmenityToTargetForm
        user={user}
        onSuccess={handleSuccess}
        targetId={targetId as never}
        onFail={handleFail}
      />
    )
  }

  return (
    <div className="w-full">
      <div className="w-full mb-4 p-0.5 border-b-[2px] border-b-brand-primary-700 flex justify-between items-center">
        <p className="sm:text-xl font-medium">Facilidades</p>
        <Button
          label={<Icon icon="plus" mode="outline" size="2xs" />}
          size="xsmall"
          onlyIcon={true}
          className={cx(
            'text-brand-primary-600 hover:border-brand-primary-600 hover:bg-brand-primary-600 hover:text-white'
          )}
          onClick={() => openAddAmenityModal()}
        />
      </div>
      <div className="w-full flex gap-1.5 pb-2 justify-end items-center">
        <p className={`text-sm mr-2`}>Legenda:</p>
        <p
          className={`text-xs border border-1 rounded-lg px-1 py-0.5 ${propertyAmenityBorderColor} ${hoverPropertyAmenity}`}
        >
          Propriedade
        </p>
        <p
          className={`text-xs border border-1 rounded-lg px-1 py-0.5 ${lotAmenityBorderColor} ${hoverLotAmenity}`}
        >
          Condomínio
        </p>
        <p
          className={`text-xs border border-1 rounded-lg px-1 py-0.5 ${otherAmenityBorderColor} ${hoverOtherAmenity}`}
        >
          Sem classificação
        </p>
      </div>
      <div className="w-full flex flex-wrap gap-x-2 gap-y-3 sm:gap-y-2">
        {amenities &&
          amenities.length >= 1 &&
          amenities.map((amnt) => {
            return (
              <div key={amnt.identifier}>
                <AmenityPill amenity={amnt} targetId={targetId as never} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
