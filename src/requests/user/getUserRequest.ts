import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceUser } from '@/types/app'

type GetUserRequest = (_id: string, _token: string) => Promise<InterfaceUser | undefined>

export const getUserRequest: GetUserRequest = async (id, token) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  const loginUrl = `${baseUrl}/users/${id}`

  try {
    const user = await fetch(loginUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((res) => res.json())

    if (user.error) {
      throw Error('Não foi possivel completar atualizar suas credenciais')
    }

    const { data } = user as SuccessResponse<InterfaceUser>

    return data
  } catch (_err) {
    return undefined
  }
}
