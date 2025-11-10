import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/hunt'

type GetHuntByIdRequest = (
  _huntId: string,
  _options?: { userToken?: string; appToken?: string }
) => Promise<InterfaceHunt | undefined>

export const getHuntById: GetHuntByIdRequest = async (huntId, options) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const res = await fetch(`${baseUrl}/api/hunt/get/${huntId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.userToken ? { Authorization: `Bearer ${options.userToken}` } : {}),
        ...(options?.appToken ? { 'x-api-key': options.appToken } : {})
      }
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<InterfaceHunt>

    return data
  } catch (_err) {
    return undefined
  }
}
