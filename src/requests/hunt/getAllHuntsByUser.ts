import type { PaginatedData, SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/app'

type GetAllHuntsByUserRequest = (
  _userId: string,
  _page: number,
  _perPage: number,
  _options?: { token?: string }
) => Promise<PaginatedData<InterfaceHunt> | undefined>

export const getAllHuntsByUser: GetAllHuntsByUserRequest = async (
  userId,
  page,
  perPage,
  options
) => {
  const baseUrl = 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/hunt/get/by-user`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {})
      },
      body: JSON.stringify({ userId, page, perPage })
    }).then((res) => res.json())

    if (res.error) {
      throw new Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<PaginatedData<InterfaceHunt>>

    return data
  } catch (err) {
    if (err instanceof Error) {
      console.log({ error: err.message })
    } else {
      console.log({ error: `Erro desconhecido: ${err}` }, { status: 500 })
    }
    return undefined
  }
}
