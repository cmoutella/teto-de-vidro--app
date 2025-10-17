import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceUser } from '@/types/user'

export type UpdateUserRequest = (
  _id: string,
  _data: Partial<InterfaceUser>
) => Promise<InterfaceUser | undefined>

// TODO: wip

// autenticar app frontend e armazenar token

export const updateUserRequest: UpdateUserRequest = async (id, newData) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application API url not defined')

  try {
    const user = await fetch(`${baseUrl}/api/user/${id}/initial-setup`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
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
