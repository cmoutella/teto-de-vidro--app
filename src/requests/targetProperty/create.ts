import type { SuccessResponse } from '@/types/apiPatterns'
import type { TargetPropertyInterface } from '@/types/targetProperty'

export type CreateTargetPropertyRequestProps = Partial<TargetPropertyInterface>

type CreateTargetPropertyRequest = (_bodyData: CreateTargetPropertyRequestProps) => Promise<
  | {
      data: TargetPropertyInterface | undefined
      code: 'SUCCESS' | 'ALREADY_EXISTS' | 'DUPLICITY_WARNING'
      relative?: 'byLot' | 'byStreet'
    }
  | undefined
>

export const createTargetProperty: CreateTargetPropertyRequest = async (bodyData) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) {
    throw new Error('A url base não foi definida')
  }

  try {
    const res = await fetch(`${baseUrl}/api/target-property/create`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    }).then((res) => res.json())

    if (res.error === 'ALREADY_EXISTS') {
      return { data: undefined, code: res.error }
    } else if (!!res.error && res.error.includes('DUPLICITY_WARNING')) {
      const warning = res.error.split(':')

      return { data: undefined, code: 'DUPLICITY_WARNING', relative: warning[1].trim() }
    } else if (
      !!res.error &&
      res.error !== 'ALREADY_EXISTS' &&
      !res.error.includes('DUPLICITY_WARNING')
    ) {
      throw Error('Não foi possível criar agora, tente novamente mais tarde')
    }

    const { data } = res as SuccessResponse<TargetPropertyInterface>

    return { data: data, code: 'SUCCESS' }
  } catch (_err) {
    return undefined
  }
}
