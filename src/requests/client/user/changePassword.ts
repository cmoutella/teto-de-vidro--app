import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceUser } from '@/types/user'

export type ChangePassword = {
  password: string
  passwordConfirmation: string
}

export type UpdatePasswordRequest = (
  _id: string,
  _data: ChangePassword
) => Promise<InterfaceUser | undefined>

export const changePassword: UpdatePasswordRequest = async (id, newData) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application API url not defined')

  try {
    const response = await fetch(`${baseUrl}/api/user/${id}/update/password`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })

    console.log('response', response)

    const user = await response.json()

    if (user.error) {
      throw Error('Não foi possivel completar atualizar suas credenciais')
    }

    const { data } = user as SuccessResponse<InterfaceUser>

    return data
  } catch (_err) {
    return undefined
  }
}
