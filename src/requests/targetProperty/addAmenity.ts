import type { SuccessResponse } from '@/types/apiPatterns'
import type { AmenityData, InterfaceUser } from '@/types/app'
import type { TargetAmenity, TargetPropertyInterface } from '@/types/targetProperty'

type RemoveAmenityFromTargetRequest = (
  _targetId: Pick<TargetPropertyInterface, 'id'>,
  _amenityData: AmenityData,
  _userId?: Pick<InterfaceUser, 'id'>
) => Promise<{ success: boolean } | undefined>

export const addAmenityToTarget: RemoveAmenityFromTargetRequest = async (
  targetId,
  amenityData,
  userId
) => {
  const baseUrl = 'http://localhost:3000'

  if (!baseUrl) return undefined

  const payload = {
    targetId: targetId,
    amenity: {
      ...amenityData,
      reportedBy: userId ? 'user' : 'ad',
      userId: userId
    } as TargetAmenity
  }

  try {
    const res = await fetch(`${baseUrl}/api/target-property/amenity/add`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<{ success: boolean }>

    return data
  } catch (_err) {
    return undefined
  }
}
