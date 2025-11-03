import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/hunt'

type GetCurrentHuntRequest = (_options?: {
  userToken?: string
  appToken?: string
}) => Promise<InterfaceHunt | undefined>

export const getCurrentHunt: GetCurrentHuntRequest = async (options) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL
  if (!baseUrl) throw new Error('Application APP url not defined')

  console.log('EU FUI CHAMADO')

  try {
    const res = await fetch(`${baseUrl}/api/hunt/active`, {
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

    console.log('res', data)

    return data
  } catch (_err) {
    return undefined
  }
}
