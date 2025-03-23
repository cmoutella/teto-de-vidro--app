import type { SuccessResponse } from '@/types/apiPatterns'

export type CreateTargetPropertyRequestProps = Partial<TargetPropertyInterface>

type CreateTargetPropertyRequest = (
  _bodyData: CreateTargetPropertyRequestProps
) => Promise<TargetPropertyInterface | undefined>

export const createTargetProperty: CreateTargetPropertyRequest = async (bodyData) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  try {
    const res = await fetch(`${baseUrl}/target-property`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    }).then((res) => res.json())

    console.log('res', res)

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
