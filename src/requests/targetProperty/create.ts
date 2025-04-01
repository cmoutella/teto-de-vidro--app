import type { SuccessResponse } from '@/types/apiPatterns'
import type { TargetPropertyInterface } from '@/types/targetProperty'

export type CreateTargetPropertyRequestProps = Partial<TargetPropertyInterface>

type CreateTargetPropertyRequest = (
  _bodyData: CreateTargetPropertyRequestProps
) => Promise<TargetPropertyInterface | undefined>

export const createTargetProperty: CreateTargetPropertyRequest = async (bodyData) => {
  const baseUrl = 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/target-property/create`, {
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

    const { data } = res as SuccessResponse<TargetPropertyInterface>

    return data
  } catch (_err) {
    // TODO: toast
    return undefined
  }
}
