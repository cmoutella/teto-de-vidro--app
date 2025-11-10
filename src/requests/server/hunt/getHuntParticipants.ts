import type { SuccessResponse } from '@/types/apiPatterns'
import type { HuntParticipants } from '@/types/hunt'

type GetHuntParticipantsRequest = (
  _huntId: string,
  _options?: { userToken?: string; appToken?: string }
) => Promise<HuntParticipants[] | undefined>

export const getHuntParticipants: GetHuntParticipantsRequest = async (huntId, options) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const request = fetch(`${baseUrl}/api/hunt/get/${huntId}/participants`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.userToken ? { Authorization: `Bearer ${options.userToken}` } : {}),
        ...(options?.appToken ? { 'x-api-key': options.appToken } : {})
      }
    })

    const res = await request.then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<HuntParticipants[]>

    console.log('participants', data)

    return data
  } catch (_err) {
    return undefined
  }
}
