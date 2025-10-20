import type { SuccessResponse } from '@/types/apiPatterns'
import type { TargetPropertyInterface } from '@/types/targetProperty'

type RemoveAmenityFromTargetRequest = (
  _targetId: Pick<TargetPropertyInterface, 'id'>,
  _amenityId: string
) => Promise<{ success: boolean } | undefined>

export const removeAmenityFromTarget: RemoveAmenityFromTargetRequest = async (
  targetId,
  amenityId
) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const res = await fetch(
      `${baseUrl}/api/target-property/${targetId}/amenity/remove?amenity=${amenityId}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<{ success: boolean }>

    return data
  } catch (_err) {
    return undefined
  }
}
