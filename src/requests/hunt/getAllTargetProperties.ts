import type { SuccessResponse } from '@/types/apiPatterns'
import type { TargetPropertyInterface } from '@/types/targetProperty'

type GetAllTargetPropertiesfromHuntRequest = (
  _huntId: string,
  _page: number,
  _perPage: number
) => Promise<TargetPropertyInterface[] | undefined>

export const getAllTargetPropertiesfromHunt: GetAllTargetPropertiesfromHuntRequest = async (
  huntId,
  page,
  perPage
) => {
  const baseUrl = 'http://localhost:3000'

  if (!baseUrl) return undefined

  try {
    const res = await fetch(`${baseUrl}/api/target-property/get/by-hunt`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ huntId, page, perPage })
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<TargetPropertyInterface[]>

    return data
  } catch (_err) {
    // TODO: toast
    return undefined
  }
}
