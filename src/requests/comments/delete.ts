import type { TargetPropertyInterface } from '@/types/targetProperty'

export type EditHuntRequestProps = Omit<TargetPropertyInterface, 'id' | 'targets'>

type DeleteCommentRequest = (_id: string) => Promise<boolean | undefined>

export const deleteComment: DeleteCommentRequest = async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) {
    throw new Error('A url base não foi definida')
  }

  try {
    const res: Response = await fetch(`${baseUrl}/api/comment/${id}/delete`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res || res.error) {
      throw Error('Não foi possível criar agora, tente novamente mais tarde')
    }

    return res.status === 200
  } catch (_err) {
    return undefined
  }
}
