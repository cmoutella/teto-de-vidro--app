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
    )

    return { success: res.status === 200 }
  } catch (_err) {
    return undefined
  }
}
