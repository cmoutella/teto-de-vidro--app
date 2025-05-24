import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceComment } from '@/types/comment'

export type EditCommentRequestProps = Partial<
  Omit<InterfaceComment, 'id' | 'validation' | 'author' | 'target' | 'updatedAt' | 'createdAt'>
>

type EditTargetRequest = (
  _id: string,
  _comment?: EditCommentRequestProps
) => Promise<InterfaceComment | undefined>

export const editComment: EditTargetRequest = async (id, commentData) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) {
    throw new Error('A url base não foi definida')
  }

  try {
    const res = await fetch(`${baseUrl}/api/comment/${id}/update`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    }).then((res) => res.json())

    if (!res || res.error) {
      throw Error('Não foi possível editar o comentário')
    }
    const { data } = res as SuccessResponse<InterfaceComment>

    return data
  } catch (_err) {
    return undefined
  }
}
