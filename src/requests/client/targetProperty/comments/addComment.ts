import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceComment, TargetComment } from '@/types/comment'
import type { TargetPropertyInterface } from '@/types/targetProperty'

type AddCommentToTargetRequest = (
  _targetId: Pick<TargetPropertyInterface, 'id'>,
  _commentData: Omit<TargetComment, 'author'>
) => Promise<InterfaceComment | undefined>

export const addCommentToTarget: AddCommentToTargetRequest = async (targetId, commentData) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  const payload = {
    comment: {
      ...commentData
    } as TargetComment
  }

  try {
    const res = await fetch(`${baseUrl}/api/target-property/${targetId}/comment/add`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível encontrar a informação solicitada')
    }

    const { data } = res as SuccessResponse<InterfaceComment>

    return data
  } catch (_err) {
    return undefined
  }
}
