import type { SuccessResponse } from '@/types/apiPatterns'
import type { CommentOnUpdateTarget } from '@/types/comment'
import type { TargetPropertyInterface } from '@/types/targetProperty'

export type EditTargetRequestProps = Partial<Omit<TargetPropertyInterface, 'id' | 'targets'>>

type EditTargetRequest = (
  _id: string,
  _targetData: EditTargetRequestProps,
  _comment?: CommentOnUpdateTarget
) => Promise<
  | {
      data: TargetPropertyInterface | undefined
      code: 'SUCCESS' | 'ALREADY_EXISTS' | 'DUPLICITY_WARNING'
      relative?: 'byLot' | 'byStreet'
    }
  | undefined
>

export const editTargetProperty: EditTargetRequest = async (id, targetData, commentData) => {
  const baseUrl = 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/target-property/update`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, data: { target: targetData, comment: commentData ?? undefined } })
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
