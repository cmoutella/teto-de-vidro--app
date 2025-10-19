import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/hunt'

export type EditHuntRequestProps = Omit<InterfaceHunt, 'id' | 'targets'>

type EditHuntRequest = (
  _id: string,
  _bodyData: EditHuntRequestProps
) => Promise<InterfaceHunt | undefined>

export const editHunt: EditHuntRequest = async (id, bodyData) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const res = await fetch(`${baseUrl}/api/hunt/update`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, data: bodyData })
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível criar agora, tente novamente mais tarde')
    }

    const { data } = res as SuccessResponse<InterfaceHunt>

    return data
  } catch (_err) {
    return undefined
  }
}
