import type { SuccessResponse } from '@/types/apiPatterns'
import type { TargetComment } from '@/types/comment'
import type { TargetPropertyInterface } from '@/types/targetProperty'

export type UpdateTargetRequestProps = Partial<Omit<TargetPropertyInterface, 'id' | 'targets'>>

export type UpdateTargetResponse = {
  data: Partial<TargetPropertyInterface> | undefined
  code: 'SUCCESS' | 'ALREADY_EXISTS' | 'DUPLICITY_WARNING'
  relative?: 'byLot' | 'byStreet'
}

type UpdateTargetRequest = (
  _id: string,
  _targetData: UpdateTargetRequestProps,
  _comment?: TargetComment
) => Promise<UpdateTargetResponse | undefined>

export const updateTargetProperty: UpdateTargetRequest = async (id, targetData, commentData) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const res = await fetch(`${baseUrl}/api/target-property/${id}/update`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: { target: targetData, comment: commentData ?? undefined } })
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
