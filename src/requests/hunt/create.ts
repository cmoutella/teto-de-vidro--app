import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/app'

export type CreateHuntRequestProps = Omit<InterfaceHunt, 'id' | 'targets' | 'isActive'>

type CreateHuntRequest = (_bodyData: CreateHuntRequestProps) => Promise<InterfaceHunt | undefined>

export const createHunt: CreateHuntRequest = async (bodyData) => {
  const baseUrl = 'http://localhost:3000'

  if (!baseUrl) return undefined

  try {
    const res = await fetch(`${baseUrl}/api/hunt/create`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível criar agora, tente novamente mais tarde')
    }

    const { data } = res as SuccessResponse<InterfaceHunt>

    return data
  } catch (_err) {
    // TODO: toast
    return undefined
  }
}
