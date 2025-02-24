import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/app'

type GetAllHuntsByUserRequest = (
  _userId: string,
  _page: number,
  _perPage: number
) => Promise<InterfaceHunt[] | undefined>

export const getAllHuntsByUser: GetAllHuntsByUserRequest = async (userId, page, perPage) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  try {
    const res = await fetch(`${baseUrl}/hunt/search/${userId}?page=${page}&limit=${perPage}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<InterfaceHunt[]>

    return data
  } catch (_err) {
    // TODO: toast
    return undefined
  }
}
