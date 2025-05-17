import { useState } from 'react'
import toast from 'react-hot-toast'

import cx from 'classnames'

import { useHuntContext } from '@/providers/HuntProvider'
import { useUIContext } from '@/providers/UIProvider'
import { removeAmenityFromTarget } from '@/requests/targetProperty/removeAmenity'
import type { TargetAmenity, TargetPropertyInterface } from '@/types/targetProperty'
import DeleteConfirmation from '@/ui/forms/DeleteConfirmation'

import Icon from '../../../base/Icon'

interface AmenityPillProps {
  amenity: TargetAmenity
  targetId: Pick<TargetPropertyInterface, 'id'>
}

/**
 * # AMENITIES COLOR SCHEME
 */
export const lotAmenityColor = 'bg-indigo-400'
export const propertyAmenityColor = 'bg-purple-400'
export const otherAmenityColor = 'bg-sky-400'

export const lotAmenityBorderColor = 'border-indigo-400'
export const propertyAmenityBorderColor = 'border-purple-400'
export const otherAmenityBorderColor = 'border-sky-400'

export const hoverLotAmenity = `hover:bg-indigo-400 hover:text-white hover:text-sm`
export const hoverPropertyAmenity = `hover:bg-purple-400 hover:text-white hover:text-sm`
export const hoverOtherAmenity = `hover:bg-sky-400 hover:text-white hover:text-sm`

export function AmenityPill({ amenity, targetId }: AmenityPillProps) {
  const [showIcon, setShowIcon] = useState(false)

  const { modal } = useUIContext()
  const { fetchProperties } = useHuntContext()

  function openDeleteConfirmation() {
    setShowIcon(false)

    function handleFail() {
      toast.error('Algo deu errado')
      modal.close()
    }

    function handleSuccess() {
      modal.close()

      fetchProperties()
    }

    async function confirm() {
      await removeAmenityFromTarget(targetId as never, amenity.identifier)
    }

    modal.open(
      'small',
      <DeleteConfirmation confirm={confirm} close={handleSuccess} onFail={handleFail} />
    )
  }

  return (
    <div
      key={amenity.identifier}
      className={cx('rounded-md px-2 py-1 text-white flex gap-1 transition', {
        [lotAmenityColor]: amenity.amenityOf === 'lot',
        [propertyAmenityColor]: amenity.amenityOf === 'property',
        [otherAmenityColor]: amenity.amenityOf !== 'property' && amenity.amenityOf !== 'lot'
      })}
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      <p className="text-sm font-medium">{amenity.label ?? amenity.identifier}</p>
      {showIcon && (
        <Icon icon="x" size="xs" onClick={openDeleteConfirmation} className="cursor-pointer" />
      )}
    </div>
  )
}
