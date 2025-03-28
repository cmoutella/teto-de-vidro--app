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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  try {
    const res = await fetch(
      `${baseUrl}/target-property/search/${huntId}?page=${page}&limit=${perPage}`,
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

    const { data } = res as SuccessResponse<TargetPropertyInterface[]>

    return data
  } catch (_err) {
    // TODO: toast
    return undefined
  }
}
