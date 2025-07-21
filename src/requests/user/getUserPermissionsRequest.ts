import type { SuccessResponse } from '@/types/apiPatterns'
import type { UserPermissions } from '@/types/app'

type GetUserPermissionsRequest = (
  _id: string,
  _options?: { token?: string }
) => Promise<UserPermissions | undefined>

export const getUserPermissionsRequest: GetUserPermissionsRequest = async (id, options) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const res = await fetch(`${baseUrl}/api/user/${id}/permissions`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {})
      }
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<UserPermissions>

    return data
  } catch (_err) {
    return undefined
  }
}
