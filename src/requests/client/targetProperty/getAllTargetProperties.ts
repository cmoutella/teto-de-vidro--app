import type { PaginatedData, SuccessResponse } from '@/types/apiPatterns'
import type { TargetPropertyInterface } from '@/types/targetProperty'

type GetAllTargetPropertiesFromHuntRequest = (
  _huntId: string,
  _page: number,
  _perPage: number
) => Promise<PaginatedData<TargetPropertyInterface> | undefined>

export const getAllTargetPropertiesfromHunt: GetAllTargetPropertiesFromHuntRequest = async (
  huntId,
  page,
  perPage = 6
) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const res = await fetch(
      `${baseUrl}/api/target-property/get/by-hunt/?hunt=${huntId}&page=${page}&limit=${perPage}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<PaginatedData<TargetPropertyInterface>>

    return data
  } catch (_err) {
    return undefined
  }
}
