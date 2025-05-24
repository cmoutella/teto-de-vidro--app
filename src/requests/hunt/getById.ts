import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/app'

type GetHuntByIdRequest = (
  _huntId: string,
  _options?: { token?: string }
) => Promise<InterfaceHunt | undefined>

export const getHuntById: GetHuntByIdRequest = async (huntId, options) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) {
    throw new Error('A url base não foi definida')
  }

  try {
    const res = await fetch(`${baseUrl}/api/hunt/get`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {})
      },
      body: JSON.stringify({ id: huntId })
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
