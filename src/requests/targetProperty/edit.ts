import type { SuccessResponse } from '@/types/apiPatterns'
import type { TargetPropertyInterface } from '@/types/targetProperty'

export type EditHuntRequestProps = Omit<TargetPropertyInterface, 'id' | 'targets'>

type EditHuntRequest = (
  _id: string,
  _bodyData: EditHuntRequestProps
) => Promise<TargetPropertyInterface | undefined>

export const editTargetProperty: EditHuntRequest = async (id, bodyData) => {
  const baseUrl = 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/target-property/update`, {
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

    const { data } = res as SuccessResponse<TargetPropertyInterface>

    return data
  } catch (_err) {
    // TODO: toast
    return undefined
  }
}
