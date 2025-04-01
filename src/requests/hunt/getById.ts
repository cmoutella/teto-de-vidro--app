import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/app'

type GetHuntByIdRequest = (_huntId: string) => Promise<InterfaceHunt | undefined>

export const getHuntById: GetHuntByIdRequest = async (huntId) => {
  const baseUrl = 'http://localhost:3000'

  if (!baseUrl) return undefined

  try {
    const res = await fetch(`${baseUrl}/api/hunt/get`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: huntId })
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<InterfaceHunt>

    return data
  } catch (_err) {
    // TODO: toast
    return undefined
  }
}
