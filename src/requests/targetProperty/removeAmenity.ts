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

  if (!baseUrl) {
    throw new Error('A url base não foi definida')
  }

  try {
    const res = await fetch(`${baseUrl}/api/target-property/amenity/remove`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ targetId, amenityId })
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
