import type { PaginatedData, SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/hunt'

type GetAllHuntsByUserRequest = (
  _userId: string,
  _page: number,
  _perPage: number,
  _options?: { userToken?: string; appToken?: string }
) => Promise<PaginatedData<InterfaceHunt> | undefined>

export const getAllHuntsByUser: GetAllHuntsByUserRequest = async (
  userId,
  page,
  perPage,
  options
) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const request = fetch(`${baseUrl}/api/hunt/get/by-user`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.userToken ? { Authorization: `Bearer ${options.userToken}` } : {}),
        ...(options?.appToken ? { 'x-api-key': options.appToken } : {})
      },
      body: JSON.stringify({ userId, page, perPage })
    })

    const res = await request.then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<PaginatedData<InterfaceHunt>>

    return data
  } catch (_err) {
    return undefined
  }
}
