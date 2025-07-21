import type { PaginatedData, SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceComment } from '@/types/comment'
import type { TargetPropertyInterface } from '@/types/targetProperty'

type GetTargetCommentsRequest = (
  _targetId: Pick<TargetPropertyInterface, 'id'>,
  _page?: number,
  _limit?: number
) => Promise<PaginatedData<InterfaceComment> | undefined>

export const getTargetComments: GetTargetCommentsRequest = async (
  targetId,
  page = 1,
  limit = 6
) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  const fetchUrl = new URL(`${baseUrl}/api/target-property/${targetId}/comment/get`)
  fetchUrl.searchParams.set('page', String(page))
  fetchUrl.searchParams.set('limit', String(limit))

  try {
    const res = await fetch(fetchUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())

    if (res.error) {
      throw new Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<PaginatedData<InterfaceComment>>

    return data
  } catch (_err) {
    return undefined
  }
}
